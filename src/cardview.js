import React, { useEffect, useState } from "react";
import './cardview.css'
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

const Cardview = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await fetch("/api/question");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestionList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question list:", error);
        setQuestionList(Question_List); // Setting default data on failure
        setIsLoading(false);
      }
    };

    fetchQuestionList();
  }, []);

  const handleClick = (index) => {
    console.log("Clicked on card with index:", index);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">
      {questionList.map((item, index) => (
        <div key={index} className="card" onClick={() => handleClick(index)}>
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
  );
};

export default Cardview;
