import DashboardLayout from "../../components/layout/DashboardLayout";


import RideRequestCard from "../../components/seeker/RideRequestCard";


import { useContext } from "react";


import { RideContext } from "../../context/RideContext";


import "../../components/seeker/seeker.css";





const MyRequests = () => {



const {

    requests

} = useContext(RideContext);







return (



<DashboardLayout>




<div className="seeker-header">


<h1>

My Ride Requests

</h1>



<p>

Track your requested rides and approvals.

</p>



</div>







<div className="requests-grid">





{

requests.length > 0 ?



requests.map((ride)=>(


<RideRequestCard


key={ride.id}


{...ride}


/>


))



:



<div className="empty-state">


<h3>

No Ride Requests

</h3>


<p>

Your requested rides will appear here.

</p>


</div>


}





</div>





</DashboardLayout>



);


};



export default MyRequests;