import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./cardview_delete.css";

const userid = 'fakeid';

const Cardview = () => {
  const { topic } = useParams();
  const [questionList, setQuestionList] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await fetch(`/api/notes/${userid}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestionList(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching question list:", error);
        setQuestionList([]); // Setting to an empty array on failure
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

  const handleSubmit = async () => {
    // Implement deletion logic here based on selectedIndices
    try {
      const response = await fetch("/api/delete-cards", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cards: selectedIndices.map((index) => questionList[index]) }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete cards");
      }

      // Remove the deleted cards from the questionList state
      setQuestionList((prevList) =>
        prevList.filter((item, index) => !selectedIndices.includes(index))
      );

      // Clear the selected indices
      setSelectedIndices([]);
      console.log("Selected Items deleted successfully");
    } catch (error) {
      console.error("Error deleting cards:", error);
      // Handle error
    }
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
