import "./seeker.css";


const QuickActionCard =({

icon,

title,

description

})=>{


return (

<div className="quick-card">


<div className="quick-icon">

{icon}

</div>



<h3>
{title}
</h3>


<p>
{description}
</p>



</div>

);


};


export default QuickActionCard;