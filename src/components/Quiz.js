import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = (props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(props.questions[0]);
  const [currAnswer, setCurrAnswer] = useState(props.answers[0]);
  const [currOptions, setCurrOptions] = useState(props.options[0]);

  const [attempted, setAttempted] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);

  const navigate = useNavigate();

  const handleSelect = (event) => {
    const val = event.target.textContent;
    const option = event.target;
    const selectedOptions = document.getElementsByClassName("option");
    for (const selectedOption of selectedOptions) {
      selectedOption.style.background = "white";
    }
    option.style.background = "orange";

    if (val === currOptions[currAnswer]) {
      console.log("correct");
      console.log(currQuestion);
      setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
      props.setScore(props.score + 1);
      console.log(props.score);
    } else {
      console.log("Incorrect");
      console.log(currQuestion);
      setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    }
  };

  const handleNext = () => {
    const options = document.getElementsByClassName("option");
    for (const option of options) {
      option.style.backgroundColor = 'white';
    }

    if (currIndex < props.questions.length - 1) {
      setCurrIndex((prevIndex) => prevIndex + 1);
      setCurrAnswer(props.answers[currIndex + 1]);
      setCurrQuestion(props.questions[currIndex + 1]);
      setCurrOptions(props.options[currIndex + 1]);

      // Update Quiz History for the current question
      updateHistory(currQuestion, currOptions, currOptions[currAnswer]);
    } else {
      console.log(attempted);
      console.log(isCorrect);
      console.log(props.userId);
      const userid = localStorage.getItem("userId");

      const postData = async () => {
        const url = "http://127.0.0.1:8000/api/questionhistorycreate/";

        const newQuestionHistory = {
          user: userid,
          domain: props.category,
          difficulty_level: props.difficultyLevel,
          score: props.score,
          attempted_questions: attempted.map((q_text, index) => ({
            q_text,
            is_correct: isCorrect[index],
          })),
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestionHistory),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log("New Question History created:", responseData);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };

      // Call the postData function
      postData();

      navigate('/quizend')
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    console.log(currAnswer, currQuestion, currIndex, currOptions);
  }, [currAnswer, currQuestion, currIndex, currOptions]);

  const updateHistory = (question, options, userAnswer) => {
    // Check if the question is already in the attempted array
    const isQuestionAlreadyAttempted = attempted.includes(question);
  
    if (!isQuestionAlreadyAttempted) {
      console.log("Updating Quiz History:", question, options, userAnswer);
      setAttempted((prevAttempted) => [...prevAttempted, question]);
  
      if (userAnswer === options[props.answers[currIndex]]) {
        setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
        props.setScore(props.score + 1);
      } else {
        setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
      }
    } else {
      console.log("Question already attempted:", question);
    }
  };
  

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>
      <div className="question-container">
        <p className="question">{currQuestion}</p>
        <div className="centered-container">
          <div className="options-container">
            <div className="option-pair">
              <div className="option" data-answer="1" onClick={handleSelect}>
                {currOptions[0]}
              </div>
              <div className="option" data-answer="2" onClick={handleSelect}>
                {currOptions[1]}
              </div>
            </div>
            <div className="option-pair">
              <div className="option" data-answer="3" onClick={handleSelect}>
                {currOptions[2]}
              </div>
              <div className="option" data-answer="4" onClick={handleSelect}>
                {currOptions[3]}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="next-button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Quiz;
