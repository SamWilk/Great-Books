import "./customButton.css";

const CustomButton = ({ children, OnClick, type, buttonTitle }) => {
  return (
    <button type={type} className="customButton" onClick={OnClick}>
      {children}
      {buttonTitle}
    </button>
  );
};

export default CustomButton;
