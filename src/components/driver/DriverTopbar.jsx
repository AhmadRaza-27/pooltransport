import {

Bell

} from "lucide-react";


import "./DriverTopbar.css";



const DriverTopbar = () => {


    return (


        <header className="driver-topbar">


            <div>


                <h2>
                    Driver Dashboard
                </h2>


                <p>
                    Manage your rides efficiently
                </p>


            </div>





            <div className="driver-top-actions">


                <button className="notification-btn">


                    <Bell size={20}/>


                </button>




                <div className="driver-profile">


                    Driver


                </div>


            </div>




        </header>


    );


};


export default DriverTopbar;