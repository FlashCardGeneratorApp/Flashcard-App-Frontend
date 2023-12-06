import React, { useEffect, useState } from "react";
import "./quiz.css";
const Quiz = () => {
  const temp_question_list = [
    {
      Question: "What dynasty did Qin Shi Huang Found?",
      Options: ["Qing Dynasty", "Han Dynasty", "Song Dynasty", "Zhou Dynasty"],
      Answer: "Han Dynasty",
    },
    {
      Question: "Who orchestrated the Long March?",
      Options: ["Bo Gu", "Mao Ze Dong", "Chiang Kai Shek", "Zhou Enlai"],
      Answer: "Chiang Kai Shek",
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
        var userID = localStorage.getItem("user-id")
        const response = await fetch(`https://flashcard-webapp.azurewebsites.net/notes/${userID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const shuffledData = shuffleArray(data.questions);

      const shuffledQuestions = shuffledData.map((question) => ({
        ...question,
        options: shuffleArray(question.Options),
      }));

      setQuestionList(shuffledQuestions);
      setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question list:", error);
        const shuffledQuestions = temp_question_list.map((question) => ({
          ...question,
          Options: shuffleArray(question.Options),
        }));
  
        setQuestionList(shuffledQuestions);
        setIsLoading(false);
      }
    };
    fetchQuestionList();
  }, []);
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const handleOptionClick = async (optionIndex) => {
    if (selectedOption === null) {
      setSelectedOption(optionIndex);
      const currentQuestion = questionList[currentQuestionIndex];
      const isCorrect = currentQuestion.Options[optionIndex] === currentQuestion.Answer;
      setIsAnswerCorrect(isCorrect);
      console.log({ question: currentQuestion, selectedOption: optionIndex, isCorrect });
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
    const shuffledData = shuffleArray(data.questions);

      const shuffledQuestions = shuffledData.map((question) => ({
        ...question,
        options: shuffleArray(question.Options),
      }));

    setQuestionList(shuffledQuestions);
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
          {questionList.length > 0 ? (
            <div className="card">
              <h3>{currentQuestion.Question}</h3>
              <ul className="options-list">
                {currentQuestion.Options.map((option, optionIndex) => (
                  <li
                    key={optionIndex}
                    className={
                      selectedOption !== null
                        ? currentQuestion.Options[selectedOption] === currentQuestion.Answer && option === currentQuestion.Answer
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
          ) : (
            <div>
              <p>No questions available. Please add some questions.</p>
            </div>
          )}
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