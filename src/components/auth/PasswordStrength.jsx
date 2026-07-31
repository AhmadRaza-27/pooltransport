import "./PasswordStrength.css";


const PasswordStrength = ({password}) => {


const getStrength = () => {


    let score = 0;


    if(password.length >= 8)
        score++;


    if(/[A-Z]/.test(password))
        score++;


    if(/[0-9]/.test(password))
        score++;


    if(/[!@#$%^&*]/.test(password))
        score++;


    return score;

};



const strength = getStrength();



const strengthText = [

    "",

    "Weak",

    "Fair",

    "Good",

    "Strong"

];



return (

<div className="strength-box">


<div className="strength-bars">


{
[1,2,3,4].map((bar)=>(


<span

key={bar}

className={
bar <= strength
?
`active strength-${strength}`
:
""
}

/>


))

}

</div>



<p>

Password Strength:

<strong>

{strengthText[strength]}

</strong>


</p>


</div>

);


};


export default PasswordStrength;