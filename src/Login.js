import React, { useState } from 'react';
import Modal from 'react-modal';
import './Login.css';

const LoginModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    // Add your login logic here
    // e.g., sending the data to a server, handling authentication, etc.
  };

  return (
    <div>
      <button onClick={openModal} className="fancy">
        <span className="text">Login</span>
        <span className="top-key"></span>
        <span className="bottom-key-1"></span>
        <span className="bottom-key-2"></span>
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Login Modal">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={closeModal} className="fancy">
            <span className="text">Close</span>
            <span className="top-key"></span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
          <button type="submit" className="fancy">
            <span className="text">Submit</span>
            <span className="top-key"></span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default LoginModal;
