import "./Input.css";
const Input = ({
    icon,
    type="text",
    placeholder,
    value,
    name,
    onChange
})=>{
return (
<div className="input-wrapper">
{
icon &&
<span className="input-icon">
{icon}
</span>
}
<input
name={name}
type={type}
placeholder={placeholder}
value={value}
onChange={onChange}
/>
</div>
);
};
export default Input;