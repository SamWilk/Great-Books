import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const authStatus = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <div>
        Bookish {isAuthenticated ? <>, for {authStatus.user.UserName}</> : null}
      </div>
    </>
  );
}

export default App;
