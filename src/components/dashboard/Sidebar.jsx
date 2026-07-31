import {
    Home,
    Search,
    ClipboardList,
    MapPin,
    CreditCard,
    User
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";


const Sidebar = () => {


    const menuItems = [

        {
            name:"Dashboard",
            path:"/dashboard",
            icon:<Home size={20}/>
        },


        {
            name:"Find Ride",
            path:"/rides",
            icon:<Search size={20}/>
        },


        {
            name:"My Requests",
            path:"/requests",
            icon:<ClipboardList size={20}/>
        },


        {
            name:"Active Ride",
            path:"/active-ride",
            icon:<MapPin size={20}/>
        },


        {
            name:"Payments",
            path:"/payments",
            icon:<CreditCard size={20}/>
        },


        {
            name:"Profile",
            path:"/profile",
            icon:<User size={20}/>
        }

    ];



    return (

        <aside className="sidebar">


            {/* LOGO */}

            <div className="sidebar-logo">


                <img

                    src="/images/logo.png"

                    alt="Pool Ops"

                />


                <div>

                    <h2>
                        POOL OPS
                    </h2>


                    <span>
                        Passenger Portal
                    </span>

                </div>


            </div>





            {/* MENU */}


            <nav className="sidebar-menu">


                {
                    menuItems.map((item)=>(


                        <NavLink

                            key={item.name}

                            to={item.path}

                            className={({isActive}) =>
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





            {/* FOOTER */}

            <div className="sidebar-footer">


                <p>
                    © 2026 Pool Ops
                </p>


            </div>



        </aside>

    );

};


export default Sidebar;