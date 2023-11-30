import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./cardview.css";
const userID = localStorage.getItem("user-id")
const Cardview = () => {
  const { topic } = useParams();
  const Question_List = [
    {
      question: "What dynasty did Qin Shi Huang Found?",
      options: ["Qing Dynasty", "Han Dynasty", "Song Dynasty", "Zhou Dynasty"],
      answer: 1,
    },
    {
      question: "Who orchestrated the Long March?",
      options: ["Bo Gu", "Mao Ze Dong", "Chiang Kai Shek", "Zhou Enlai"],
      answer: 2,
    },
  ];
  const [questionList, setQuestionList] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await fetch(`http://flashcard-webapp.azurewebsites.net/notes/generate/${topic}`); // Change to Django endpoint for AI Generation
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestionList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question list:", error);
        setQuestionList(Question_List); // Setting default data on failure, remove when endpoint exists
        setIsLoading(false);
      }
    };

    fetchQuestionList();
  }, []);

  const handleClick = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter((i) => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const handleClear = () => {
    setSelectedIndices([]);
  };

  const handleSubmit = () => {
    const selectedItems = selectedIndices.map(index => questionList[index]);
    console.log("Selected Items:", selectedItems);
    fetch(`http://flashcard-webapp.azurewebsites.net/notes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: userID, questions: selectedItems }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        window.location.href = "/"
      })
      .catch(error => {
        console.error("Error submitting questions:", error);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <content>
      <h2>Topic: {topic}</h2>
    <div className="card-container">
      {questionList.map((item, index) => (
        <div
          key={index}
          className={selectedIndices.includes(index) ? "card clicked" : "card"}
          onClick={() => handleClick(index)}
        >
          <h3>{item.question}</h3>
          <ul className="options-list">
            {item.options.map((option, optionIndex) => (
              <li
                key={optionIndex}
                className={
                  optionIndex === item.answer ? "answer-option" : "option"
                }
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="Button-Flex">
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    </content>
  );
};

export default Cardview;
