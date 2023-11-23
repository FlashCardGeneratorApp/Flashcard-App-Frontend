import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Login.css";
import { useNavigate, redirect } from "react-router-dom";

const LoginModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Change from useHistory to useNavigate
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
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  async function Logout() {
    redirect("/.auth/Logout"); // Change from history.push to navigate
  }
  
  async function getUserInfo() {
    try {
      const response = await fetch("/.auth/me");
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error("No profile could be found");
      return undefined;
    }
  }
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={Logout} className="fancy">
          <span className="text">Logout</span>
          <span className="top-key"></span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      ) : null}
      {!isLoggedIn && (
        <button onClick={openModal} className="fancy">
          <span className="text">Login</span>
          <span className="top-key"></span>
          <span className="bottom-key-1"></span>
          <span className="bottom-key-2"></span>
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
      >
        <form action="" class="form">
          <p>
            Welcome,<span>sign in to continue</span>
          </p>
          <a class="oauthButton btn-google" href="/.auth/login/google">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M2 2h8v8H2z" fill="#F25022"></path>
              <path d="M12 2h8v8h-8z" fill="#7FBA00"></path>
              <path d="M2 12h8v8H2z" fill="#00A4EF"></path>
              <path d="M12 12h8v8h-8z" fill="#FFB900"></path>
            </svg>
            Continue with Microsoft
          </a>
          <a class="oauthButton btn-github" href="/.auth/login/github">
            <svg class="icon" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
            Continue with Github
          </a>
        </form>
      </Modal>
    </div>
  );
  
};

export default LoginModal;



