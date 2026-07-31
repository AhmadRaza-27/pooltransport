import {
    UserRound,
    CarFront,
    ArrowRight
} from "lucide-react";


import { useNavigate } from "react-router-dom";


import "./RoleSelection.css";



const RoleSelection = () => {


    const navigate = useNavigate();



    const selectRole = (role) => {


        localStorage.setItem(
            "selectedRole",
            role
        );



        if(role === "seeker"){

            navigate("/dashboard");

        }


        if(role === "driver"){

            navigate("/driver");

        }


    };





    return (


        <div className="role-page">


            <div className="role-container">



                <div className="role-header">


                    <h1>
                        Choose Workspace
                    </h1>


                    <p>
                        Select your operating mode for Pool Ops.
                    </p>


                </div>






                <div className="role-grid">





                    <button

                        className="role-card"

                        onClick={()=>selectRole("seeker")}

                    >



                        <div className="role-icon seeker-icon">

                            <UserRound size={42}/>

                        </div>



                        <h2>
                            Passenger
                        </h2>



                        <p>

                            Find available rides,
                            request seats,
                            manage trips and payments.

                        </p>



                        <div className="role-action">

                            Enter Passenger Dashboard

                            <ArrowRight size={18}/>

                        </div>



                    </button>









                    <button

                        className="role-card"

                        onClick={()=>selectRole("driver")}

                    >



                        <div className="role-icon driver-icon">

                            <CarFront size={42}/>

                        </div>



                        <h2>
                            Driver
                        </h2>



                        <p>

                            Manage your vehicle,
                            approve passengers,
                            and control your rides.

                        </p>



                        <div className="role-action">

                            Enter Driver Dashboard

                            <ArrowRight size={18}/>

                        </div>



                    </button>





                </div>



            </div>



        </div>


    );


};


export default RoleSelection;