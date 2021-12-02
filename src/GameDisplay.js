import "./styles.scss";
import QuestionDisplay from "./QuestionDisplay";
import { useState, useEffect } from "react";
import firebase from "./firebase";

function GameDisplay(props) {
  const {
    userName,
    userQuestions,
    userCorrectNumber,
    userAnsweredNumber,
    continueGame,
    currentQuestionOrder,
    setCurrentQuestionOrder,
    answeredCorrect,
    setAnswerCorrect,
    userNumberChoice,
    setUserNumberChoice
  } = props;

  //made changes from "" to {}, added currentQuestionIndex and totalQuestions
  const [currentQuestion, SetCurrentQuestion] = useState({});
  //const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    if (continueGame) {
      setUserNumberChoice(userQuestions.length);
      if (userAnsweredNumber !== 0) {
        setAnswerCorrect(userCorrectNumber);
        setCurrentQuestionOrder(userAnsweredNumber);
      }
    }
  }, [
    continueGame,
    userCorrectNumber,
    userAnsweredNumber,
    setAnswerCorrect,
    setCurrentQuestionOrder,
    setUserNumberChoice,
    userQuestions
  ]);

  useEffect(() => {
    SetCurrentQuestion(userQuestions[currentQuestionOrder]);
    console.log(currentQuestion);
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
    <div className="gameDisplay">
      <>
        {/*<h1>DisplayPage</h1>*/}
        {/* show Question Display if the current question is less than
        the amount of user questions otherwise, show GameResult */}
        {currentQuestionOrder < userQuestions.length ? (
          <QuestionDisplay
            currentQuestion={currentQuestion}
            answeredCorrect={answeredCorrect}
            setAnswerCorrect={setAnswerCorrect}
            currentQuestionOrder={currentQuestionOrder}
            setCurrentQuestionOrder={setCurrentQuestionOrder}
            userNumberChoice={userNumberChoice}
          />
        ) : null}
      </>
    </div>
  );
}

export default GameDisplay;
