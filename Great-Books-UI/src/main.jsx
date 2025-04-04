import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/navbar/navbar.jsx";
import Login from "./pages/login/login.jsx";
import About from "./pages/about/about.jsx";
import Signup from "./pages/signup/signup.jsx";
import Search from "./pages/search/search.jsx";
import Book from "./pages/book/book.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </Router>
    </Provider>
  </StrictMode>
);
