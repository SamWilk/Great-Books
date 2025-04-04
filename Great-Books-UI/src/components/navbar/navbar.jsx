import { useEffect } from "react";
import { checkAuth, logout } from "../../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import CustomButton from "../customButton/customButton";

const SendToLogin = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/login");
  };

  return <CustomButton OnClick={handleRedirect} buttonTitle={"Login"} />;
};

const SendToSignUp = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/signup");
  };

  return <CustomButton OnClick={handleRedirect} buttonTitle={"Sign Up"} />;
};

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return <CustomButton OnClick={handleLogout}>Log out</CustomButton>;
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoginPage = useLocation().pathname == "/login" ? true : false;

  useEffect(() => {
    dispatch(checkAuth()); // Check if user is authenticated
  }, [dispatch]);

  if (authStatus === "loading") return <p>Checking authentication...</p>;

  return (
    <>
      <div className="navBar">
        Navbar
        <div>
          {isAuthenticated ? <div>Hello, {authUser.UserName}</div> : <></>}
        </div>
        <div className="ButtonBar">
          <CustomButton
            OnClick={() => {
              navigate("/");
            }}
            buttonTitle={"Home"}
          />

          <CustomButton
            OnClick={() => {
              navigate("/search");
            }}
            buttonTitle={"Search"}
          />

          <CustomButton
            OnClick={() => {
              navigate("/about");
            }}
            buttonTitle={"About"}
          />

          {isAuthenticated ? (
            <Logout />
          ) : isLoginPage ? (
            <SendToSignUp />
          ) : (
            <SendToLogin />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
