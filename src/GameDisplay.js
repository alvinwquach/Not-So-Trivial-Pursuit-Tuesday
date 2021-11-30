import "./styles.scss";
import QuestionDisplay from "./QuestionDisplay";
import { useState, useEffect } from "react";
import firebase from "./firebase";

function GameDisplay(props) {
  const {
    userName,
    userQuestions,
    userCorrectNumber,
    userAnsweredNumber
  } = props;
  const [currentQuestion, SetCurrentQuestion] = useState("");
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(0);
  const [answeredCorrect, setAnswerCorrect] = useState(0);

  useEffect(() => {
    SetCurrentQuestion(userQuestions[currentQuestionOrder]);
    console.log(currentQuestion);
    console.log("userCorrectNumber" + userCorrectNumber);
    console.log("userAnsweredNumber" + userAnsweredNumber);
  }, [
    userQuestions,
    currentQuestion,
    SetCurrentQuestion,
    currentQuestionOrder
  ]);
  //GameDisplay.js
  useEffect(() => {
    const dbRef = firebase.database().ref(userName);
    dbRef.set({
      correctNumber: answeredCorrect,
      answeredNumber: currentQuestionOrder,
      questions: userQuestions
    });
  }, [userName, userQuestions, answeredCorrect, currentQuestionOrder]);

  return (
    <>
      <h1>DisplayPage</h1>
      {
        <QuestionDisplay
          currentQuestion={currentQuestion}
          answeredCorrect={answeredCorrect}
          setAnswerCorrect={setAnswerCorrect}
          currentQuestionOrder={currentQuestionOrder}
          setCurrentQuestionOrder={setCurrentQuestionOrder}
        />
      }
    </>
  );
}

export default GameDisplay;
