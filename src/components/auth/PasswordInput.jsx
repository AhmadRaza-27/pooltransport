import {useState} from "react";
import {
    Eye,
    EyeOff,
    Lock
} from "lucide-react";
import "./PasswordInput.css";
const PasswordInput = ({
    placeholder="Password",
    value,
    onChange
})=>{
const [show,setShow]=useState(false);
return(
<div className="password-wrapper">
<Lock className="lock-icon"/>
<input
type={
show ? "text":"password"
}
placeholder={placeholder}
value={value}
onChange={onChange}
/>
<span
className="eye-icon"
onClick={()=>setShow(!show)}
>
{
show ?
<EyeOff size={20}/>
:
<Eye size={20}/>
}
</span>
</div>
)
}
export default PasswordInput;