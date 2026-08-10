import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import RideCard from "../../components/seeker/RideCard";

import "../../components/seeker/seeker.css";



const AvailableRides = () => {



const [search,setSearch] = useState("");





const rides=[


{
id:1,
vehicle:"Toyota Coaster",
driver:"Ahmed Khan",
pickup:"City Center",
destination:"Industrial Area",
time:"08:30 AM",
seats:4,
price:50
},



{
id:2,
vehicle:"Hyundai H1",
driver:"Ali Raza",
pickup:"North Avenue",
destination:"Tech Park",
time:"09:00 AM",
seats:2,
price:40
},



{
id:3,
vehicle:"Suzuki APV",
driver:"Usman Tariq",
pickup:"Main Boulevard",
destination:"Business District",
time:"09:30 AM",
seats:5,
price:60
}


];






const filteredRides = rides.filter((ride)=>{


const keyword = search.toLowerCase();



return (

ride.pickup.toLowerCase().includes(keyword)

||

ride.destination.toLowerCase().includes(keyword)

||

ride.vehicle.toLowerCase().includes(keyword)

||

ride.driver.toLowerCase().includes(keyword)

);


});






return(


<DashboardLayout>



<div className="seeker-header">


<h1>
Available Rides
</h1>


<p>
Select a vehicle and request your seat.
</p>


</div>





<div className="ride-filter">


<input


value={search}


onChange={(e)=>setSearch(e.target.value)}


placeholder="Search pickup, destination or vehicle"



/>




</div>






<div className="rides-grid">


{


filteredRides.length > 0 ?



filteredRides.map((ride)=>(


<RideCard

key={ride.id}

{...ride}

/>


))



:



<h3 className="no-rides">

No rides found

</h3>



}



</div>





</DashboardLayout>


);


};



export default AvailableRides;