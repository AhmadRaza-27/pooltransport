import DriverSidebar from "../driver/DriverSidebar";
import DriverTopbar from "../driver/DriverTopbar";

import "./DriverLayout.css";


const DriverLayout = ({children}) => {


return (

<div className="driver-layout">


    <DriverSidebar />


    <div className="driver-main">


        <DriverTopbar />


        <main className="driver-content">

            {children}

        </main>


    </div>


</div>

);


};


export default DriverLayout;