import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./cardview_delete.css";

const userID = localStorage.getItem("user-id")
const Cardview = () => {
  const { topic } = useParams();
  const Question_List = [
    {
      _id: "656fa34f78e98dcbf5e04bbd",
      Question: "What dynasty did Qin Shi Huang Found?",
      Options: ["Qing Dynasty", "Han Dynasty", "Song Dynasty", "Zhou Dynasty"],
      Answer: 1,
    },
    {
      __staticRouterHydrationDataid: 2,
      Question: "Who orchestrated the Long March?",
      Options: ["Bo Gu", "Mao Ze Dong", "Chiang Kai Shek", "Zhou Enlai"],
      Answer: 2,
    },
  ];
  const [questionList, setQuestionList] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await fetch(`https://flashcard-webapp.azurewebsites.net/notes/${userID}`); // Change to Django endpoint for AI Generation
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestionList(data.questions);
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

  const handleDelete = () => {
    const selectedItems = selectedIndices.map(index => questionList[index]._id);
    console.log("Selected Items:", selectedItems);
  
    fetch(`https://flashcard-webapp.azurewebsites.net/notes`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({question_id: selectedItems }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Questions deleted successfully");
        window.location.href = "/";
      })
      .catch(error => {
        console.error("Error deleting questions:", error);
      });
  };
  



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <content>
      <div className="card-container">
        {questionList.map((item, index) => (
          <div
            key={index}
            className={selectedIndices.includes(index) ? "card clicked" : "card"}
            onClick={() => handleClick(index)}
          >
            <h3>{item.Question}</h3>
            <ul className="options-list">
              {item.Options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={
                    optionIndex === item.Answer ? "answer-option option" : "option"
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
        <button className='delete-button' onClick={handleDelete}>Delete</button>
      </div>
    </content>
  );
};

export default Cardview;
