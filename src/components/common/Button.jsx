import "./Button.css";
const Button = ({ 
    children, 
    type="button",
    loading=false,
    onClick
}) => {
    return (
        <button
            className="primary-btn"
            type={type}
            onClick={onClick}
            disabled={loading}
        >
            {
                loading 
                ? "Please wait..."
                : children
            }
        </button>
    );

};
export default Button;