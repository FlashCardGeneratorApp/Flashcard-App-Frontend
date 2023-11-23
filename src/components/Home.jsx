import React, { useState } from 'react'; // Import useState from React

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <p style={{ margin: 'auto', width: '50%', textAlign: 'center' }}>
        {/* Input field for the user to enter a topic */}
        <input
          style={{ width: '100%', height: '40px' }}
          placeholder="Enter a topic you would like to learn..."
          value={topic}
          onChange={handleInputChange}
        />
        {/* Button to submit the form */}
        <button
          type="submit"
          style={{
            width: '100%',
            height: '40px',
            backgroundColor: 'lightblue',
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </p>
    </div>
  );
};

export default Home;
