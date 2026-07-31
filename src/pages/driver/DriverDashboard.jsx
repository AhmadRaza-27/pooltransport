import {
    Car,
    Users,
    ClipboardList,
    Wallet
} from "lucide-react";


import DriverLayout from "../../components/layout/DriverLayout";


import "../../components/driver/driver.css";



const DriverDashboard = ()=>{


return(

<DriverLayout>


<div className="driver-header">


<h1>
Good Morning, Driver
</h1>


<p>
Manage your vehicle, passengers and daily rides.
</p>


</div>





<div className="driver-stats">



<div className="driver-stat-card">

<Car size={30}/>

<h2>
Toyota Coaster
</h2>

<p>
Vehicle Assigned
</p>

</div>





<div className="driver-stat-card">

<ClipboardList size={30}/>

<h2>
12
</h2>

<p>
Pending Requests
</p>

</div>





<div className="driver-stat-card">

<Users size={30}/>

<h2>
8
</h2>

<p>
Passengers Today
</p>

</div>





<div className="driver-stat-card">

<Wallet size={30}/>

<h2>
₹850
</h2>

<p>
Today's Earnings
</p>

</div>




</div>






<div className="upcoming-ride-card">


<h2>
Upcoming Ride
</h2>


<div className="ride-info">


<p>
📍 Delhi
</p>


<p>
→
</p>


<p>
📍 Noida
</p>


</div>


<div className="ride-time">

8:30 AM • 5 Passengers

</div>


</div>





</DriverLayout>


);


};


export default DriverDashboard;