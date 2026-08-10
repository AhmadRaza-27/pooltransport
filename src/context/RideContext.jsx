import {
    createContext,
    useState
} from "react";


export const RideContext = createContext();




const RideProvider = ({children}) => {



const [requests,setRequests] = useState([]);



const [activeRide,setActiveRide] = useState(null);






// CHECK DUPLICATE REQUEST

const isRequested = (ride)=>{


    return requests.some((item)=>

        item.vehicle === ride.vehicle

        &&

        item.driver === ride.driver

    );


};









// PASSENGER SEND REQUEST

const addRequest = (ride)=>{


    if(isRequested(ride)){

        return false;

    }




    const newRequest={


        id:Date.now(),


        passenger:"Current User",


        vehicle:ride.vehicle,


        driver:ride.driver,


        pickup:ride.pickup,


        destination:ride.destination,


        time:ride.time,


        price:ride.price,


        status:"Pending"


    };






    setRequests(prev=>[

        ...prev,

        newRequest

    ]);



    return true;


};









// DRIVER APPROVE REQUEST + START RIDE

const approveRequest = (id)=>{



    const ride = requests.find(

        (item)=>item.id === id

    );




    if(!ride){

        return;

    }







    setRequests(prev=>


        prev.map((item)=>


            item.id === id

            ?


            {


                ...item,


                status:"Approved"


            }


            :


            item


        )


    );







    startRide(ride);



};









// DRIVER REJECT REQUEST

const rejectRequest = (id)=>{


    setRequests(prev=>


        prev.map((item)=>


            item.id === id


            ?


            {


                ...item,


                status:"Rejected"


            }


            :


            item


        )


    );


};









// PASSENGER CANCEL REQUEST

const cancelRequest = (id)=>{


    setRequests(prev=>


        prev.filter(

            (item)=>item.id !== id

        )


    );


};









// CREATE ACTIVE RIDE

const startRide = (ride)=>{


    setActiveRide({


        ...ride,


        rideStatus:"Started"


    });



};









// COMPLETE RIDE

const completeRide = ()=>{


    setActiveRide(null);


};









return(


<RideContext.Provider


value={{


    requests,


    addRequest,


    isRequested,


    approveRequest,


    rejectRequest,


    cancelRequest,


    activeRide,


    startRide,


    completeRide


}}


>


{children}



</RideContext.Provider>



);


};





export default RideProvider;