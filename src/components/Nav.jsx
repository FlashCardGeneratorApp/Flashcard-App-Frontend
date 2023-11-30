import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Cardview from "./cardview";
import Login from "./Login";
import Quiz from "./quiz";
import CardviewDelete from "./cardview_delete";
import "./Nav.css";
const NotFound = () => <h2>404 Not Found</h2>;

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/.auth/me");

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(!!data.clientPrincipal);
        }
      } catch (error) {
        console.error("Error fetching authentication information:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div>
      <nav
        style={{
          backgroundColor: "lightblue",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "flex-start",
            padding: "1%",
            width: "30%",
          }}
        >
          <li style={{ padding: "1%", marginLeft: "10%" }}>
            <Link to="/" className="fancy">
              <span className="text">Home</span>
              <span className="top-key" />
              <span className="bottom-key-1" />
              <span className="bottom-key-2" />
            </Link>
          </li>
          <li style={{ padding: "1%" }}>
            <Link to="/about" className="fancy">
              <span className="text">About</span>
              <span className="top-key" />
              <span className="bottom-key-1" />
              <span className="bottom-key-2" />
            </Link>
          </li>
          {isLoggedIn && (
            <li style={{ padding: "1%" }}>
              <Link to="/quiz" className="fancy">
                <span className="text">Quiz</span>
                <span className="top-key" />
                <span className="bottom-key-1" />
                <span className="bottom-key-2" />
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li style={{ padding: "1%" }}>
              <Link to="/cardview_delete" className="fancy">
                <span className="text">Cards</span>
                <span className="top-key" />
                <span className="bottom-key-1" />
                <span className="bottom-key-2" />
              </Link>
            </li>
          )}
        </ul>
        {isLoggedIn && (
          <h2
            style={{
              padding: "1%",
              width: "30%",
              textAlign: "center",
              paddingLeft: "8%", // Apply padding-left only when isLoggedIn is true
            }}
          >
            FlashCard App
          </h2>
        )}

        {!isLoggedIn && (
          <h2
            style={{
              padding: "1%",
              width: "30%",
              textAlign: "center",
              // No paddingLeft when isLoggedIn is false
            }}
          >
            FlashCard App
          </h2>
        )}
        <ul
          style={{
            listStyleType: "none",
            display: "flex",
            justifyContent: "flex-end",
            padding: "1%",
            width: "30%",
          }}
        >
          <li style={{ padding: "1%", marginRight: "10%" }}>
            <Login className="fancy">
              <span className="text">Login</span>
              <span className="top-key" />
              <span className="bottom-key-1" />
              <span className="bottom-key-2" />
            </Login>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cardview/:topic" element={<Cardview />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cardview_delete" element={<CardviewDelete />}/>
      </Routes>
    </div>
  );
};

export default Nav;
