import React, { useEffect, useState } from "react";
import "./quiz.css";
const userID = localStorage.getItem("user-id")
const Quiz = () => {
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await fetch(`http://flashcard-webapp.azurewebsites.net/notes/${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json().questions; // In the form of [{obj},{obj}]
        const questions = data.questions || [];
        setQuestionList(questions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question list:", error);
        setQuestionList(Question_List);
        setIsLoading(false);
      }
    };

    fetchQuestionList();
  }, []);

  const handleOptionClick = async (optionIndex) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      const currentQuestion = questionList[currentQuestionIndex];
      const isCorrect = optionIndex === currentQuestion.answer;
      setIsAnswerCorrect(isCorrect);
        console.log({question: currentQuestion, selectedOption: optionIndex, isCorrect})
      }
  };
  
  

  const handleNextQuestion = () => {
    // Move to the next question
    if (currentQuestionIndex < questionList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Clear selected option for the next question
      setIsAnswerCorrect(null); // Clear answer correctness indication
    } else {
      // End of questions
      setQuizCompleted(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
    setQuizCompleted(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questionList[currentQuestionIndex];

  return (
    <content>
      <h2>Quiz</h2>
      {quizCompleted ? (
        <div>
          <h3>Congratulations! You've completed the quiz!</h3>
          <div className="Button-Flex">
            <button onClick={handleRestartQuiz}>Restart Quiz</button>
          </div>
        </div>
      ) : (
        <div className="card-container">
          <div className="card">
            <h3>{currentQuestion.question}</h3>
            <ul className="options-list">
              {currentQuestion.options.map((option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={
                    selectedOption !== null
                      ? optionIndex === currentQuestion.answer
                        ? "correct-option"
                        : optionIndex === selectedOption
                        ? "incorrect-option"
                        : "option"
                      : "option"
                  }
                  onClick={() => handleOptionClick(optionIndex)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
          {selectedOption !== null && (
            <div className="Button-Flex">
              <button onClick={handleNextQuestion}>Next Question</button>
            </div>
          )}
        </div>
      )}
    </content>
  );
};

export default Quiz;
