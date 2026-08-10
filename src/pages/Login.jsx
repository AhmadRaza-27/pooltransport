import { useState } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/layout/AuthLayout";

import Input from "../components/common/Input";
import Button from "../components/common/Button";
import PasswordInput from "../components/auth/PasswordInput";


const Login = () => {


    const navigate = useNavigate();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");

    const [loading,setLoading] = useState(false);



    const handleLogin = (e)=>{

        e.preventDefault();


        setError("");



        // Validation

        if(!email){

            setError("Email address is required");

            return;

        }



        if(!password){

            setError("Password is required");

            return;

        }



        if(!email.includes("@")){

            setError("Enter a valid email address");

            return;

        }



        setLoading(true);



        // Temporary authentication simulation

        setTimeout(()=>{


            setLoading(false);


            console.log({

                email,

                password

            });


            // Later replaced with API call

            navigate("/choose-role");


        },1500);


    };



return (

<AuthLayout

title="Welcome Back"

subtitle="Access your transport operations portal."

>


<form onSubmit={handleLogin}>


<Input

icon={<Mail size={20}/>}

type="email"

placeholder="Enter your email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

/>



<PasswordInput

placeholder="Enter your password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

/>




{
error &&

<div className="form-error">

{error}

</div>

}


<div className="login-options">


<label>

<input

type="checkbox"

/>

Remember me

</label>



<a href="#">

Forgot Password?

</a>


</div>



<div className="signin-wrapper">


<Button

type="submit"

loading={loading}

>

Sign In

</Button>


</div>



<div className="register-link">


<p>

New to Pool Ops?


<Link to="/register">

Create account

</Link>


</p>


</div>
</form>


</AuthLayout>

);


};


export default Login;