import {
    MapPin,
    Clock,
    User,
    Check,
    X
} from "lucide-react";


import {useContext} from "react";


import {RideContext} from "../../context/RideContext";


import "./driver.css";




const DriverRequestCard = ({

    id,
    passenger,
    pickup,
    destination,
    time,
    status

})=>{



const {

    approveRequest,

    rejectRequest

}=useContext(RideContext);






return(



<div className="driver-request-card">





<div className="request-top">


<h3>

{passenger || "Passenger"}

</h3>



<span

className={`request-status ${status?.toLowerCase()}`}

>

{status}

</span>



</div>









<div className="request-info">



<p>

<User size={17}/>

Passenger Request

</p>





<p>

<MapPin size={17}/>

{pickup} → {destination}

</p>





<p>

<Clock size={17}/>

{time}

</p>



</div>









{

status === "Pending"

&&



<div className="request-actions">





<button

className="approve-btn"

onClick={()=>approveRequest(id)}

>


<Check size={18}/>

Accept


</button>







<button

className="reject-btn"

onClick={()=>rejectRequest(id)}

>


<X size={18}/>

Reject


</button>





</div>



}







{

status === "Approved"

&&


<div className="approved-message">

Ride Started

</div>


}





</div>



);



};



export default DriverRequestCard;