import {

    Home,
    Car,
    ClipboardList,
    MapPin,
    Users,
    Wallet,
    User

} from "lucide-react";


import { NavLink } from "react-router-dom";


import "./DriverSidebar.css";



const DriverSidebar = () => {


    const menuItems = [


        {
            name:"Dashboard",
            path:"/driver",
            icon:<Home size={20}/>
        },


        {
            name:"My Vehicle",
            path:"/driver/vehicle",
            icon:<Car size={20}/>
        },


        {
         name:"Active Ride",
        path:"/driver/active-ride",
        icon:<MapPin size={20}/>
        },


        {
            name:"Active Ride",
            path:"/driver/active",
            icon:<MapPin size={20}/>
        },


        {
            name:"Passengers",
            path:"/driver/passengers",
            icon:<Users size={20}/>
        },


        {
            name:"Earnings",
            path:"/driver/earnings",
            icon:<Wallet size={20}/>
        },


        {
            name:"Profile",
            path:"/driver/profile",
            icon:<User size={20}/>
        }


    ];




    return (


        <aside className="driver-sidebar">



            <div className="driver-sidebar-logo">


                <img

                    src="/images/logo.png"

                    alt="Pool Ops"

                />



                <div>


                    <h2>
                        POOL OPS
                    </h2>


                    <span>
                        Driver Portal
                    </span>


                </div>


            </div>





            <nav className="driver-menu">


            {

                menuItems.map((item)=>(


                    <NavLink

                        key={item.name}

                        to={item.path}

                        className={({isActive})=>

                            isActive
                            ?
                            "active"
                            :
                            ""

                        }

                    >


                        {item.icon}


                        <span>
                            {item.name}
                        </span>


                    </NavLink>


                ))

            }


            </nav>





            <div className="driver-sidebar-footer">

                © 2026 Pool Ops

            </div>



        </aside>


    );


};


export default DriverSidebar;