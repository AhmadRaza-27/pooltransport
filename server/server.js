const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

let dbPool;

async function getDbPool() {
    if (!dbPool) {
        dbPool = await sql.connect(dbConfig);
        await initTables(dbPool);
    }
    return dbPool;
}

// Automatically create necessary database tables if they don't exist
async function initTables(pool) {
    await pool.request().query(`
        IF OBJECT_ID('dbo.users', 'U') IS NULL
        CREATE TABLE dbo.users (
            id INT IDENTITY(1,1) PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            organization_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone_number VARCHAR(50) NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            created_at DATETIME DEFAULT GETDATE()
        );

        IF OBJECT_ID('dbo.drivers', 'U') IS NULL
        CREATE TABLE dbo.drivers (
            driver_id NVARCHAR(255) PRIMARY KEY,
            full_name NVARCHAR(255),
            email NVARCHAR(255),
            phone NVARCHAR(50),
            license_number NVARCHAR(100),
            experience NVARCHAR(50)
        );

        IF OBJECT_ID('dbo.driver_vehicles', 'U') IS NULL
        CREATE TABLE dbo.driver_vehicles (
            driver_id NVARCHAR(255) PRIMARY KEY,
            make NVARCHAR(255),
            model NVARCHAR(255),
            plate NVARCHAR(255),
            color NVARCHAR(255),
            capacity INT
        );

        IF OBJECT_ID('dbo.driver_earnings', 'U') IS NULL
        CREATE TABLE dbo.driver_earnings (
            driver_id NVARCHAR(255) PRIMARY KEY,
            total_earnings DECIMAL(18,2) DEFAULT 0
        );

        IF OBJECT_ID('dbo.rides', 'U') IS NULL
        CREATE TABLE dbo.rides (
            id INT IDENTITY(1,1) PRIMARY KEY,
            vehicle NVARCHAR(255),
            driver NVARCHAR(255),
            pickup NVARCHAR(255),
            destination NVARCHAR(255),
            time NVARCHAR(50),
            price NVARCHAR(50),
            seats INT,
            date NVARCHAR(50)
        );

        IF OBJECT_ID('dbo.ride_requests', 'U') IS NULL
        CREATE TABLE dbo.ride_requests (
            id INT IDENTITY(1,1) PRIMARY KEY,
            rideId INT,
            passengerId NVARCHAR(255),
            passengerName NVARCHAR(255),
            status NVARCHAR(50),
            timestamp NVARCHAR(100)
        );

        IF OBJECT_ID('dbo.active_rides', 'U') IS NULL
        CREATE TABLE dbo.active_rides (
            id INT IDENTITY(1,1) PRIMARY KEY,
            rideId INT,
            passengerId NVARCHAR(255),
            passengerName NVARCHAR(255),
            vehicle NVARCHAR(255),
            driver NVARCHAR(255),
            pickup NVARCHAR(255),
            destination NVARCHAR(255),
            time NVARCHAR(50),
            price NVARCHAR(50),
            rideStatus NVARCHAR(100),
            checkedIn BIT DEFAULT 0,
            checkInConfirmedByDriver BIT DEFAULT 0,
            checkedOut BIT DEFAULT 0,
            checkOutConfirmedByDriver BIT DEFAULT 0,
            timestamp NVARCHAR(100)
        );
    `);
}

// Health check
app.get('/health', (req, res) => {
    res.json({ ok: true, message: 'Backend is running' });
});

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/register', async (req, res) => {
    const { full_name, organization_name, email, phone_number, password } = req.body;

    if (!full_name || !organization_name || !email || !phone_number || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const pool = await getDbPool();
        await pool.request()
            .input('full_name', sql.VarChar, full_name)
            .input('organization_name', sql.VarChar, organization_name)
            .input('email', sql.VarChar, email)
            .input('phone_number', sql.VarChar, phone_number)
            .input('password_hash', sql.VarChar, password)
            .query(`
                INSERT INTO dbo.users (full_name, organization_name, email, phone_number, password_hash, created_at)
                VALUES (@full_name, @organization_name, @email, @phone_number, @password_hash, GETDATE())
            `);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('SQL INSERT ERROR DETAILS:', err);
        res.status(500).json({ error: err.message || 'Registration failed. Email might already be registered.' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM dbo.users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = result.recordset[0];

        if (user.password_hash !== password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (err) {
        console.error('SQL LOGIN ERROR DETAILS:', err);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// --- DRIVER PROFILE ROUTES ---
app.post('/api/drivers/:id/profile', async (req, res) => {
    const driverId = req.params.id;
    const { fullName, email, phone, licenseNumber, experience } = req.body;
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .input('fullName', sql.NVarChar, fullName)
            .input('email', sql.NVarChar, email)
            .input('phone', sql.NVarChar, phone)
            .input('licenseNumber', sql.NVarChar, licenseNumber)
            .input('experience', sql.NVarChar, experience)
            .query(`
                MERGE dbo.drivers AS target
                USING (SELECT @driverId AS driver_id, @fullName AS full_name, @email AS email, @phone AS phone, @licenseNumber AS license_number, @experience AS experience) AS src
                ON (target.driver_id = src.driver_id)
                WHEN MATCHED THEN
                    UPDATE SET full_name = src.full_name, email = src.email, phone = src.phone, license_number = src.license_number, experience = src.experience
                WHEN NOT MATCHED THEN
                    INSERT (driver_id, full_name, email, phone, license_number, experience) VALUES (src.driver_id, src.full_name, src.email, src.phone, src.license_number, src.experience);
            `);
        res.json({ driverId, fullName, email, phone, licenseNumber, experience });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/drivers/:id/profile', async (req, res) => {
    const driverId = req.params.id;
    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .query('SELECT driver_id as id, full_name as fullName, email, phone, license_number as licenseNumber, experience FROM dbo.drivers WHERE driver_id = @driverId');
        if (result.recordset.length > 0) return res.json(result.recordset[0]);
        res.status(404).json({ error: 'Driver profile not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DRIVER EARNINGS ROUTES ---
app.get('/api/drivers/:id/earnings', async (req, res) => {
    const driverId = req.params.id;
    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .query('SELECT total_earnings FROM dbo.driver_earnings WHERE driver_id = @driverId');
        if (result.recordset.length > 0) {
            return res.json({ earnings: result.recordset[0].total_earnings });
        }
        res.json({ earnings: 0 });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/drivers/:id/earnings', async (req, res) => {
    const driverId = req.params.id;
    const { amount } = req.body;
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .input('amount', sql.Decimal(18,2), amount)
            .query(`
                MERGE dbo.driver_earnings AS target
                USING (SELECT @driverId AS driver_id, @amount AS amount) AS src
                ON (target.driver_id = src.driver_id)
                WHEN MATCHED THEN
                    UPDATE SET total_earnings = target.total_earnings + src.amount
                WHEN NOT MATCHED THEN
                    INSERT (driver_id, total_earnings) VALUES (src.driver_id, src.amount);
            `);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- DRIVER VEHICLE ROUTES ---
app.post('/api/drivers/:id/vehicle', async (req, res) => {
    const driverId = req.params.id;
    const { make, model, plate, color, capacity } = req.body;
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .input('make', sql.NVarChar, make)
            .input('model', sql.NVarChar, model)
            .input('plate', sql.NVarChar, plate)
            .input('color', sql.NVarChar, color)
            .input('capacity', sql.Int, parseInt(capacity || 0, 10))
            .query(`
                MERGE dbo.driver_vehicles AS target
                USING (SELECT @driverId AS driver_id, @make AS make, @model AS model, @plate AS plate, @color AS color, @capacity AS capacity) AS src
                ON (target.driver_id = src.driver_id)
                WHEN MATCHED THEN
                    UPDATE SET make = src.make, model = src.model, plate = src.plate, color = src.color, capacity = src.capacity
                WHEN NOT MATCHED THEN
                    INSERT (driver_id, make, model, plate, color, capacity) VALUES (src.driver_id, src.make, src.model, src.plate, src.color, src.capacity);
            `);
        res.json({ driverId, make, model, plate, color, capacity });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/drivers/:id/vehicle', async (req, res) => {
    const driverId = req.params.id;
    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('driverId', sql.NVarChar, driverId)
            .query('SELECT driver_id as driverId, make, model, plate, color, capacity FROM dbo.driver_vehicles WHERE driver_id = @driverId');
        if (result.recordset.length > 0) {
            return res.json(result.recordset[0]);
        }
        res.status(404).json({ error: 'Vehicle not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RIDES ROUTES ---
app.get('/api/rides', async (req, res) => {
    try {
        const pool = await getDbPool();
        const result = await pool.request().query('SELECT * FROM dbo.rides ORDER BY id DESC');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/rides', async (req, res) => {
    const { vehicle, driver, pickup, destination, time, price, seats } = req.body;
    if (!vehicle || !driver || !pickup || !destination || !time || !seats) {
        return res.status(400).json({ error: 'Missing ride fields' });
    }
    const formattedPrice = price ? `Rs ${price}` : 'Rs 0';
    const rideDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const parsedSeats = parseInt(seats, 10);

    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('vehicle', sql.NVarChar, vehicle)
            .input('driver', sql.NVarChar, driver)
            .input('pickup', sql.NVarChar, pickup)
            .input('destination', sql.NVarChar, destination)
            .input('time', sql.NVarChar, time)
            .input('price', sql.NVarChar, formattedPrice)
            .input('seats', sql.Int, parsedSeats)
            .input('date', sql.NVarChar, rideDate)
            .query(`
                INSERT INTO dbo.rides (vehicle, driver, pickup, destination, time, price, seats, date)
                OUTPUT INSERTED.*
                VALUES (@vehicle, @driver, @pickup, @destination, @time, @price, @seats, @date)
            `);
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/rides/:id', async (req, res) => {
    const rideId = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request().input('rideId', sql.Int, rideId).query('DELETE FROM dbo.rides WHERE id = @rideId');
        await pool.request().input('rideId', sql.Int, rideId).query('DELETE FROM dbo.ride_requests WHERE rideId = @rideId');
        await pool.request().input('rideId', sql.Int, rideId).query('DELETE FROM dbo.active_rides WHERE rideId = @rideId');
        res.json({ message: 'Ride deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RIDE REQUESTS & WORKFLOW ROUTES ---
app.post('/api/rides/:id/requests', async (req, res) => {
    const rideId = parseInt(req.params.id, 10);
    const { passengerId, passengerName } = req.body;
    const nowStr = new Date().toLocaleString();

    try {
        const pool = await getDbPool();
        const request = await pool.request()
            .input('rideId', sql.Int, rideId)
            .input('passengerId', sql.NVarChar, passengerId)
            .input('passengerName', sql.NVarChar, passengerName)
            .input('status', sql.NVarChar, 'Pending')
            .input('timestamp', sql.NVarChar, nowStr)
            .query(`
                INSERT INTO dbo.ride_requests (rideId, passengerId, passengerName, status, timestamp)
                OUTPUT INSERTED.*
                VALUES (@rideId, @passengerId, @passengerName, @status, @timestamp)
            `);
        res.status(201).json(request.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/rides/:id/requests', async (req, res) => {
    const rideId = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        const result = await pool.request()
            .input('rideId', sql.Int, rideId)
            .query('SELECT * FROM dbo.ride_requests WHERE rideId = @rideId');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/requests/:id/approve', async (req, res) => {
    const reqId = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        
        const reqResult = await pool.request().input('reqId', sql.Int, reqId).query('SELECT * FROM dbo.ride_requests WHERE id = @reqId');
        if (reqResult.recordset.length === 0) return res.status(404).json({ error: 'Request not found' });
        const reqItem = reqResult.recordset[0];

        const rideResult = await pool.request().input('rideId', sql.Int, reqItem.rideId).query('SELECT * FROM dbo.rides WHERE id = @rideId');
        if (rideResult.recordset.length === 0) return res.status(404).json({ error: 'Ride not found' });
        let ride = rideResult.recordset[0];

        if (ride.seats <= 0) return res.status(400).json({ error: 'No seats available' });

        await pool.request().input('rideId', sql.Int, ride.id).query('UPDATE dbo.rides SET seats = seats - 1 WHERE id = @rideId');
        await pool.request().input('reqId', sql.Int, reqId).query("UPDATE dbo.ride_requests SET status = 'Approved' WHERE id = @reqId");

        ride.seats -= 1;
        reqItem.status = 'Approved';

        const nowStr = new Date().toLocaleString();
        const activeResult = await pool.request()
            .input('rideId', sql.Int, ride.id)
            .input('passengerId', sql.NVarChar, reqItem.passengerId)
            .input('passengerName', sql.NVarChar, reqItem.passengerName)
            .input('vehicle', sql.NVarChar, ride.vehicle)
            .input('driver', sql.NVarChar, ride.driver)
            .input('pickup', sql.NVarChar, ride.pickup)
            .input('destination', sql.NVarChar, ride.destination)
            .input('time', sql.NVarChar, ride.time)
            .input('price', sql.NVarChar, ride.price)
            .input('rideStatus', sql.NVarChar, 'Started')
            .input('timestamp', sql.NVarChar, nowStr)
            .query(`
                INSERT INTO dbo.active_rides (rideId, passengerId, passengerName, vehicle, driver, pickup, destination, time, price, rideStatus, timestamp)
                OUTPUT INSERTED.*
                VALUES (@rideId, @passengerId, @passengerName, @vehicle, @driver, @pickup, @destination, @time, @price, @rideStatus, @timestamp)
            `);

        res.json({ request: reqItem, ride, activeRide: activeResult.recordset[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/requests/:id/reject', async (req, res) => {
    const reqId = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request().input('reqId', sql.Int, reqId).query("UPDATE dbo.ride_requests SET status = 'Rejected' WHERE id = @reqId");
        res.json({ status: 'Rejected' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/requests/:id/cancel', async (req, res) => {
    const reqId = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request().input('reqId', sql.Int, reqId).query("UPDATE dbo.ride_requests SET status = 'Cancelled' WHERE id = @reqId");
        res.json({ status: 'Cancelled' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ACTIVE RIDES & CHECK-IN / CHECK-OUT ROUTES ---
app.get('/api/active-rides', async (req, res) => {
    try {
        const pool = await getDbPool();
        const result = await pool.request().query('SELECT * FROM dbo.active_rides');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/active-rides/:id/check-in', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('id', sql.Int, id)
            .query("UPDATE dbo.active_rides SET checkedIn = 1, rideStatus = 'Check-in Requested (Paid)' WHERE id = @id");
        res.json({ message: 'Check-in recorded' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/active-rides/:id/driver-check-in', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('id', sql.Int, id)
            .query("UPDATE dbo.active_rides SET checkInConfirmedByDriver = 1, rideStatus = 'Check-in Complete' WHERE id = @id");
        res.json({ message: 'Driver confirmed check-in' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/active-rides/:id/check-out', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        await pool.request()
            .input('id', sql.Int, id)
            .query("UPDATE dbo.active_rides SET checkedOut = 1, rideStatus = 'Check-out Requested (Paid)' WHERE id = @id");
        res.json({ message: 'Check-out recorded' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/active-rides/:id/driver-check-out', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const pool = await getDbPool();
        
        const arResult = await pool.request().input('id', sql.Int, id).query('SELECT * FROM dbo.active_rides WHERE id = @id');
        if (arResult.recordset.length > 0) {
            const ar = arResult.recordset[0];
            await pool.request().input('rideId', sql.Int, ar.rideId).query('UPDATE dbo.rides SET seats = seats + 1 WHERE id = @rideId');
        }

        await pool.request().input('id', sql.Int, id).query('DELETE FROM dbo.active_rides WHERE id = @id');
        res.json({ message: 'Trip fully completed and checked out' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});