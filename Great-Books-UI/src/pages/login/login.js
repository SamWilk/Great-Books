import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../auth/authSlice";
import getURLConfig from "../../../config/urlConfig";

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (username, password) => {
    const urlObj = getURLConfig();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${urlObj.APIUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserName: username,
          Password: password,
          Email: "",
        }),
      });
      if (!response.ok) {
        setError("Failed to login. Please try again.");
      }

      const data = await response.json();

      if (data.accessToken) {
        dispatch(
          login({
            user: { UserName: data.User.UserName, Email: data.User.Email },
            token: data.accessToken,
          })
        );
      } else {
        throw new Error("Invalid response or missing access token");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error };
};

export default useLogin;
