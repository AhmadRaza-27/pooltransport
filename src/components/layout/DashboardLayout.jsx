import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

import "./DashboardLayout.css";


const DashboardLayout = ({children}) => {


    return (

        <div className="dashboard-layout">


            <Sidebar />



            <div className="dashboard-main">


                <Topbar />



                <main className="dashboard-content">

                    {children}

                </main>



            </div>



        </div>

    );

};


export default DashboardLayout;