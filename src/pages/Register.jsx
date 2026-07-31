import {useState} from "react";

import {
User,
Mail,
Phone,
Building2
} from "lucide-react";

import {
Link
} from "react-router-dom";


import AuthLayout from "../components/layout/AuthLayout";

import Input from "../components/common/Input";

import Button from "../components/common/Button";

import PasswordInput from "../components/auth/PasswordInput";

import PasswordStrength from "../components/auth/PasswordStrength";


const Register =()=>{


const [formData,setFormData]=useState({

name:"",
email:"",
phone:"",
organization:"",
password:"",
confirmPassword:""

});


const [error,setError]=useState("");

const [loading,setLoading]=useState(false);



const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};



const handleRegister=(e)=>{

e.preventDefault();


setError("");



if(!formData.name)
return setError("Full name is required");



if(!formData.organization)
return setError("Organization name is required");



if(!formData.phone)
return setError("Phone number is required");



if(formData.password !== formData.confirmPassword)

return setError("Passwords do not match");



setLoading(true);



setTimeout(()=>{


console.log(formData);


setLoading(false);


},1500);


};




return(

<AuthLayout

title="Create Account"

subtitle="Register your organization on Pool Ops."

>


<form onSubmit={handleRegister}>


<Input

icon={<User size={20}/>}

name="name"

placeholder="Full Name"

value={formData.name}

onChange={handleChange}

/>



<Input

icon={<Building2 size={20}/>}

name="organization"

placeholder="Organization Name"

value={formData.organization}

onChange={handleChange}

/>



<Input

icon={<Mail size={20}/>}

name="email"

type="email"

placeholder="Work Email"

value={formData.email}

onChange={handleChange}

/>



<Input

icon={<Phone size={20}/>}

name="phone"

placeholder="Phone Number"

value={formData.phone}

onChange={handleChange}

/>



<PasswordInput

placeholder="Create Password"

value={formData.password}

onChange={(e)=>

setFormData({

...formData,

password:e.target.value

})

}

/>



<PasswordStrength password={formData.password}/>




<PasswordInput

placeholder="Confirm Password"

value={formData.confirmPassword}

onChange={(e)=>

setFormData({

...formData,

confirmPassword:e.target.value

})

}

/>



{
error &&

<div className="form-error">

{error}

</div>

}




<div className="terms">

<label>

<input type="checkbox"/>

<span>

I agree to Terms & Conditions

</span>

</label>

</div>




<Button

type="submit"

loading={loading}

>

Create Account

</Button>




<div className="register-link">


<p>

Already have an account?

<Link to="/login">

Login

</Link>

</p>


</div>


</form>


</AuthLayout>


);


};


export default Register;