import {
    MapPin,
    Clock,
    CheckCircle,
    XCircle,
    Hourglass,
    Trash2
} from "lucide-react";


import { useContext } from "react";


import { RideContext } from "../../context/RideContext";


import "./seeker.css";




const RideRequestCard = ({

    id,
    vehicle,
    pickup,
    destination,
    time,
    status

}) => {



const {

    cancelRequest

} = useContext(RideContext);







const statusIcon = {


    Pending:
    <Hourglass size={18}/>,


    Approved:
    <CheckCircle size={18}/>,


    Rejected:
    <XCircle size={18}/>


};







return (


<div className="request-card">






<div className="request-header">



<h3>

{vehicle}

</h3>




<div className={`status ${status.toLowerCase()}`}>

{statusIcon[status]}

{status}

</div>




</div>








<div className="request-details">



<p>

<MapPin size={18}/>

{pickup} → {destination}

</p>




<p>

<Clock size={18}/>

{time}

</p>



</div>









<div className="timeline">



<div className="timeline-item completed">

Request Sent

</div>





<div

className={

status === "Approved"

?

"timeline-item completed"

:

"timeline-item"

}

>


Driver Approval


</div>








<div

className={

status === "Approved"

?

"timeline-item completed"

:

"timeline-item"

}

>


Pickup Confirmation


</div>






</div>









{

status === "Pending" &&


<button


className="cancel-request-btn"


onClick={()=>cancelRequest(id)}


>


<Trash2 size={16}/>

Cancel Request


</button>



}








{

status === "Approved" &&


<div className="approved-message">


Driver accepted your request.

Waiting for pickup confirmation.


</div>


}







</div>


);


};



export default RideRequestCard;