import { useContext } from "react";


import DriverLayout from "../../components/layout/DriverLayout";


import DriverRequestCard from "../../components/driver/DriverRequestCard";


import { RideContext } from "../../context/RideContext";


import "../../components/driver/driver.css";



const IncomingRequests = () => {



    const { requests } = useContext(RideContext);




    return (


        <DriverLayout>



            <div className="driver-header">


                <h1>
                    Passenger Requests
                </h1>


                <p>
                    Approve or reject passenger ride requests.
                </p>


            </div>






            <div className="driver-request-grid">



                {

                    requests && requests.length > 0 ?


                    requests.map((ride)=>(


                        <DriverRequestCard


                            key={ride.id}


                            {...ride}


                        />


                    ))



                    :



                    <div className="empty-state">


                        <h3>
                            No Requests Available
                        </h3>


                        <p>
                            New passenger requests will appear here.
                        </p>


                    </div>


                }




            </div>





        </DriverLayout>


    );


};



export default IncomingRequests;