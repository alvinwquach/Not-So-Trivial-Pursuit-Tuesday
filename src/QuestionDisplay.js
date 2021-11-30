import "./styles.scss";
import { useState, useEffect } from "react";
import firebase from "./firebase";

function QuestionDisplay(props) {
  const {
    currentQuestion,
    currentQuestionOrder,
    setCurrentQuestionOrder
  } = props;

  const [randomIndexAnswers, setRandomIndexAnswers] = useState([]);
  const [randomAnswers, setRandomAnswers] = useState([]);

  function shuffle(array) {
    var random = array.map(Math.random);
    array.sort(function (a, b) {
      return random[a] - random[b];
    });
  }

  useEffect(() => {
    console.log("AC2 Current Question");
    console.log(currentQuestion);
    
    const rightAnswer = currentQuestion.correct_answer;
    const wrongAnswers = currentQuestion.incorrect_answers;
    console.log(rightAnswer);
    console.log(wrongAnswers);
    if (wrongAnswers !== undefined) {
    const answers = [...wrongAnswers, rightAnswer];
    console.log(answers);

    // const shuffleAnswers = shuffle(answers);
    const shuffleAnswers = answers.sort();

    console.log("after" + shuffleAnswers);
    setRandomAnswers(shuffleAnswers);
    }
    // const answers = [ ...wrongAnswers, rightAnswer ];

    // const answers = rightAnswer.push(wrongAnswers);
    // answers.sort(() => 0.5 - Math.random());

    // const pairs = [];

    // // as we need at least players to form a pair
    // while (answers.length >= 4) {
    //   const pair = [answers.pop(), answers.pop(), answers.pop(), answers.pop()];

    //   // Current pair
    //   console.log("Single pair", pair);

    //   // Save current pair
    //   pairs.push(pair);
    // }

    // All pairs
    // console.log("All pairs", pairs);

    // if (currentQuestion.type === "multiple") {
    //   if (wrongAnswers !== undefined) {
    //     const allAnswers = wrongAnswers.map((x) => x);
    //     allAnswers.push(rightAnswer);
    //     console.log(allAnswers);
    //     shuffle(allAnswers);
    //     setRandomIndexAnswers(allAnswers);
    //   }
    // }
  }, [currentQuestion]);

  // useEffect(() => {
  //   console.log("random" + randomIndexAnswers);
  // }, [randomIndexAnswers]);
  //allAnswers
  //  .sort(
  //    (correct_answer, incorrect_answers) =>
  //      correct_answer - incorrect_answers.random()
  //  )
  //  .map((x) => x.answer);
  //
  //  function shuffleArray(array){
  //    for (let i = array.length - 1; i > 0; i--) {
  //        const j = Math.floor(Math.random() * (i + 1));
  //        [array[i], array[j]] = [array[j], array[i]];
  //    }
  //    return array;
  // }
  let htmlstring = "<strong> Hello </strong>";

  const ClickAnAnswerAndGoToNextQuestion = () => {
    setCurrentQuestionOrder(currentQuestionOrder + 1);
  };

  return (
    <>
      {/* {currentQuestion.type === "multiple" ? (
        <div>
          <p>{currentQuestion.question}</p>
        </div>
      ) : null} */}
      {currentQuestion.type === "multiple" ? (
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
          ></div>
          {randomAnswers.map((answer, index) => (
            <button key={index}>{answer}</button>
          ))}
          <button onClick={ClickAnAnswerAndGoToNextQuestion}>Next</button>
        </div>
      ) : currentQuestion.type === "boolean" ? (
        <div>
          <p>{currentQuestion.question}</p>
          <button>{currentQuestion.correct_answer}</button>
          <button>{currentQuestion.incorrect_answers}</button>
          <button onClick={ClickAnAnswerAndGoToNextQuestion}>Next</button>
        </div>
      ) : null}
    </>
  );
}

export default QuestionDisplay;

//want state as high up as needed, handleClick on option, save state,
//save button to read the state and write it to firebase, array of objects of all the questions
//setQuestionNumber + 1 useState(0)
// get everything from firebase, set it into a state somewhere, from that state you can
// access it, depending on if you need to save things inividually
// state variable for question number for what question user is currently on
// if can push in with props, don't need to be updated no need to save
// map choices into buttons
// map possible answers into buttons or divs (buttons more semantically correct)
// if want to look different, maybe give them different components, want them to look different, still use classes
// true false two really big boxes
// multiple choice, 4 rectangles
// no dedicated component to handle each one, array of multiple cohices that doesn't care if you have 2 or 4 choices