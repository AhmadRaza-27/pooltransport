import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";



import Login from "../pages/Login";
import Register from "../pages/Register";

import RoleSelection from "../pages/RoleSelection";



// SEEKER

import SeekerDashboard from "../pages/seeker/SeekerDashboard";
import AvailableRides from "../pages/seeker/AvailableRides";
import MyRequests from "../pages/seeker/MyRequests";



// DRIVER

import DriverDashboard from "../pages/driver/DriverDashboard";
import IncomingRequests from "../pages/driver/IncomingRequests";


import SeekerActiveRide from "../pages/seeker/ActiveRide";
import DriverActiveRide from "../pages/driver/ActiveRide";


function AppRoutes(){



return(


<Routes>



{/* DEFAULT */}


<Route

path="/"

element={<Navigate to="/login"/>}

/>




{/* AUTH */}


<Route

path="/login"

element={<Login/>}

/>



<Route

path="/register"

element={<Register/>}

/>



<Route

path="/choose-role"

element={<RoleSelection/>}

/>






{/* =================
    PASSENGER
================= */}



<Route

path="/dashboard"

element={<SeekerDashboard/>}

/>



<Route

path="/rides"

element={<AvailableRides/>}

/>



<Route

path="/requests"

element={<MyRequests/>}

/>





<Route

path="/active-ride"

element={
<h1>
Active Ride Coming Soon
</h1>
}

/>



<Route

path="/payments"

element={
<h1>
Payments Coming Soon
</h1>
}

/>



<Route

path="/profile"

element={
<h1>
Profile Coming Soon
</h1>
}

/>







{/* =================
    DRIVER
================= */}



<Route

path="/driver"

element={<DriverDashboard/>}

/>



<Route

path="/driver/requests"

element={<IncomingRequests/>}

/>





{/* FALLBACK */}


<Route

path="*"

element={<Navigate to="/choose-role"/>}

/>

<Route

path="/active-ride"

element={<SeekerActiveRide/>}

/>



<Route

path="/driver/active-ride"

element={<DriverActiveRide/>}

/>

</Routes>


);


}



export default AppRoutes;