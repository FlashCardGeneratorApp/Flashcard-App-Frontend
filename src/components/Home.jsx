import React, { useState, useEffect } from 'react'; // Import useState from React
import "./Home.css";

import { useNavigate } from 'react-router-dom';



const Home = () => {
  // State to store the entered topic
  const [topic, setTopic] = useState('');
  // React Router hook for navigation
  const navigate = useNavigate(); // Change from useHistory to useNavigate


  // Function to handle input change
  const handleInputChange = (event) => {
    setTopic(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // TODO: Perform backend processes with the entered topic
    // For now, let's just redirect to the Cardview page with the topic as a parameter
    navigate(`/cardview/${topic}`); // Change from history.push to navigate
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("/.auth/me");

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(!!data.clientPrincipal);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching authentication information:", error);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {isLoggedIn ? (
        <p style={{ margin: 'auto', width: '50%', textAlign: 'center' }}>
          <div class="input-wrapper">
          <input style={{ width: '100%', height: '40px', color: 'black' }} 
                type="text" placeholder="Enter a topic you would like to learn..." 
                name="text" 
                class="input" 
                value={topic} 
                onChange={handleInputChange}/>
          </div>
          
          <button class="button-container" 
          type="submit"
            style={{
            }}
            onClick={handleSubmit}>
  <span class="circle circle1"></span>
  <span class="circle circle2"></span>
  <span class="circle circle3"></span>
  <span class="circle circle4"></span>
  <span class="circle circle5"></span>
  <span class="text">Submit</span>
</button>


        </p>
      ) : (
        <div>
          Welcome to FlashLearn! Please login to start generating flashcards.
        </div>
      )}
    </div>
  );
};

export default Home;