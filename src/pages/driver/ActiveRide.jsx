import { useContext } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { RideContext } from "../../context/RideContext";

import "../../components/driver/driver.css";



const ActiveRide = ()=>{


const {

    activeRide,
    completeRide

}=useContext(RideContext);





return(

<DashboardLayout>


<div className="driver-header">


<h1>
Active Ride
</h1>


<p>
Manage your current passenger trip.
</p>


</div>





{

!activeRide ?


<div className="empty-state">

<h2>
No Active Ride
</h2>

<p>
Accept a passenger request to start a ride.
</p>

</div>



:


<div className="driver-request-card">



<h2>

{activeRide.vehicle}

</h2>




<p>

Passenger:

{activeRide.passenger}

</p>



<p>

Pickup:

{activeRide.pickup}

</p>



<p>

Destination:

{activeRide.destination}

</p>



<p>

Time:

{activeRide.time}

</p>




<span className="request-status approved">

Started

</span>





<button

className="approve-btn"

onClick={completeRide}

>

Complete Ride

</button>




</div>



}



</DashboardLayout>


);


};


export default ActiveRide;