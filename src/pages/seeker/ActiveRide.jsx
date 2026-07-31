import DashboardLayout from "../../components/layout/DashboardLayout";

import {useContext} from "react";

import {RideContext} from "../../context/RideContext";

import "../../components/seeker/seeker.css";



const ActiveRide =()=>{


const {
    activeRide
}=useContext(RideContext);




return(

<DashboardLayout>


<div className="seeker-header">

<h1>
Active Ride
</h1>

<p>
Track your current journey.
</p>

</div>



{

activeRide ?


<div className="ride-card">


<h2>
{activeRide.vehicle}
</h2>


<p>
Driver: {activeRide.driver}
</p>


<p>
{activeRide.pickup} → {activeRide.destination}
</p>


<p>
Status: {activeRide.rideStatus}
</p>



<button className="request-btn">

Confirm Pickup

</button>



</div>


:


<div className="empty-state">


<h3>
No Active Ride
</h3>


<p>
Your active ride will appear here.
</p>


</div>


}




</DashboardLayout>


);


};


export default ActiveRide;