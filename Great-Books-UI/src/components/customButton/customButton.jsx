import "./customButton.css";

const CustomButton = ({ children, OnClick, type }) => {
  return (
    <button type={type} className="customButton" onClick={OnClick}>
      {children}
    </button>
  );
};

export default CustomButton;
