import {
    Bell,
    UserCircle
} from "lucide-react";

import "./Topbar.css";


const Topbar = () => {


return (

<header className="topbar">


<div className="topbar-title">

<h2>
Passenger Portal
</h2>

<p>
Manage your daily transportation
</p>

</div>



<div className="topbar-actions">


<button className="notification">

<Bell size={20}/>

</button>



<div className="profile">

<UserCircle size={32}/>


<div>

<h4>
Seeker
</h4>

<span>
Passenger
</span>

</div>


</div>


</div>


</header>

);


};


export default Topbar;