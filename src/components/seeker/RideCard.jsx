import {
    MapPin,
    Clock,
    Users,
    IndianRupee,
    User,
    CheckCircle
} from "lucide-react";


import { useContext, useState } from "react";


import { RideContext } from "../../context/RideContext";


import "./seeker.css";



const RideCard = ({

    vehicle,
    driver,
    pickup,
    destination,
    time,
    seats,
    price

}) => {



const {

    addRequest,
    isRequested

} = useContext(RideContext);





const [showPopup,setShowPopup] = useState(false);






const alreadyRequested = isRequested({

    vehicle,

    driver

});








const handleRequest = ()=>{


    if(alreadyRequested){

        return;

    }



    const success = addRequest({

        vehicle,

        driver,

        pickup,

        destination,

        time,

        price


    });





    if(success){


        setShowPopup(true);


    }



};







return (


<>


<div className="ride-card">





<div className="ride-card-top">


<h3>

{vehicle}

</h3>




<span>

AVAILABLE

</span>



</div>








<div className="ride-details">



<p>

<User size={18}/>

{driver}

</p>




<p>

<MapPin size={18}/>

{pickup} → {destination}

</p>




<p>

<Clock size={18}/>

{time}

</p>





<p>

<Users size={18}/>

{seats} Seats Available

</p>





<p>

<IndianRupee size={18}/>

{price} per ride

</p>



</div>








<button


className="request-btn"


onClick={handleRequest}


disabled={alreadyRequested}


>



{

alreadyRequested

?

"Already Requested"

:

"Request Seat"

}



</button>







</div>








{

showPopup &&



<div className="success-overlay">



<div className="success-popup">



<CheckCircle size={50}/>




<h2>

Request Sent

</h2>




<p>

Your ride request has been sent successfully.

</p>





<button


onClick={()=>setShowPopup(false)}


>

OK

</button>





</div>



</div>



}



</>


);


};



export default RideCard;