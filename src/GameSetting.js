import "./styles.scss";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import axios from "axios";

function GameSetting(props) {
  const {
    userName,
    SetUserName,
    questionSettingAlready,
    setQuestionSettingAlready,
    setUserQuestions,
    setUserCorrectNumber,
    setUserAnsweredNumber,
    continueGame,
    setContinueGame
  } = props;

  const [userNameAlready, setUserNameAlready] = useState(false);
  const [userDifficultyChoice, setUserDifficultyChoice] = useState(
    "placeholder"
  );
  const [userCategoryChoice, setUserCategoryChoice] = useState("placeholder");
  const [userTypeChoice, setUserTypeChoice] = useState("placeholder");
  const [existingUser, setExistingUser] = useState(false);
  const [questionsAndAnswersFromApi, setQuestionsAndAnswersFromApi] = useState(
    ""
  );

  const userNameUpload = (userName, questionArray) => {
    const dbRef = firebase.database().ref(userName);
    dbRef.set({
      correctNumber: 0,
      answeredNumber: 0,
      questions: questionArray
    });
  };

  const ContinueGameClick = () => {
    setContinueGame(true);
    setQuestionSettingAlready(true);
  };

  const ExistingUserClick = () => {
    setExistingUser(false);
  };

  useEffect(() => {
    if (questionsAndAnswersFromApi !== "") {
      userNameUpload(userName, questionsAndAnswersFromApi);
    }
  }, [userName, questionsAndAnswersFromApi]);

  // Dropdown
  const handleUserDifficultyChoice = (e) => {
    setUserDifficultyChoice(e.target.value);
  };

  const handleUserCategoryChoice = (e) => {
    setUserCategoryChoice(e.target.value);
  };

  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value);
  };

  //User Name Input
  const UserNameInput = (event) => {
    SetUserName(event.target.value);
  };

  const formSubmission = (event) => {
    event.preventDefault();
  };

  const UserNameSubmission = () => {
    if (userName === "") {
      alert(`Please enter your user name!`);
    } else {
      setUserNameAlready(true);
      console.log(userName);
    }
  };

  const QuestionSettingSubmission = () => {
    if (
      userCategoryChoice === "placeholder" ||
      userTypeChoice === "placeholder" ||
      userDifficultyChoice === "placeholder"
    ) {
      alert(`Please select category, type and difficulty for your questions!`);
    } else {
      setQuestionSettingAlready(true);
    }
  };
  //Check existing user name or create a new one
  useEffect(() => {
    if (userNameAlready) {
      const dbRef = firebase.database().ref();
      dbRef.on("value", (response) => {
        const data = response.val();
        const dataConvertToArray = Object.keys(data);
        if (String(dataConvertToArray).indexOf(userName) !== -1) {
          setExistingUser(true);
          if (continueGame) {
            // Pass existing data to GameDisplay.js
            console.log(data);
            console.log(data[userName]);
            setUserQuestions(data[userName].questions);
            setUserCorrectNumber(data[userName].correctNumber);
            setUserAnsweredNumber(data[userName].answeredNumber);
          }
        }
      });
    }
  }, [
    userName,
    continueGame,
    userNameAlready,
    setUserQuestions,
    setUserCorrectNumber,
    setUserAnsweredNumber
  ]);

  useEffect(() => {
    if (questionSettingAlready && !existingUser) {
      const triviaGameUrl = `https://opentdb.com/api.php?amount=11&category=${userCategoryChoice}&difficulty=${userDifficultyChoice}&type=${userTypeChoice}`;
      axios({
        url: triviaGameUrl,
        method: "GET",
        responseType: "json"
      }).then((response) => {
        if (questionsAndAnswersFromApi === "") {
          setQuestionsAndAnswersFromApi(response.data.results);
        }
        if (!existingUser) {
          setUserQuestions(questionsAndAnswersFromApi);
        }
      });
      console.log(questionsAndAnswersFromApi);
      console.log(userTypeChoice);
      console.log(userDifficultyChoice);
      console.log(userCategoryChoice);
    }
  }, [
    questionSettingAlready,
    questionsAndAnswersFromApi,
    userTypeChoice,
    userDifficultyChoice,
    userCategoryChoice,
    setQuestionsAndAnswersFromApi,
    existingUser,
    setUserQuestions
  ]);

  return (
    <>
      <section>
        {!userNameAlready ? (
          <form onSubmit={formSubmission}>
            <label htmlFor="userNameInput">
              Please enter your user name here:
            </label>
            <input id="userNameInput" type="text" onChange={UserNameInput} />
            <button onClick={UserNameSubmission}>Submit!</button>
          </form>
        ) : null}
        {questionsAndAnswersFromApi ? null : questionSettingAlready ? null : userNameAlready &&
          existingUser ? (
          <div>
            <button onClick={ContinueGameClick}>Continue your game?</button>
            <button onClick={ExistingUserClick}>Start a new game!</button>
          </div>
        ) : null}
        {questionSettingAlready ? null : !existingUser && userNameAlready ? (
          <form onSubmit={formSubmission}>
            {/* # of questions selected */}
            <select
              id="amountOfQuestionsSelection"
              name="amountOfQuestionsSelection"
              // value={userQuestionAmountChoice}
              //   onChange={handleUserQuestionAmountChoice}
            >
              <option value="placeholder" disabled>
                Choose your number of questions:
              </option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            {/* Category selection */}
            <select
              id="categorySelection"
              name="categorySelection"
              value={userCategoryChoice}
              onChange={handleUserCategoryChoice}
            >
              <option value="placeholder" disabled>
                Choose your category:
              </option>
              <option value="21">Sport</option>
              <option value="9">General Knowledge</option>
              <option value="17">Science&Nature</option>
              <option value="12">Music</option>
              <option value="14">Television</option>
              <option value="15">Video Games</option>
              <option value="23">History</option>
            </select>
            {/* Type selection */}
            <select
              id="typeSelection"
              name="typeSelection"
              value={userTypeChoice}
              onChange={handleUserTypeChoice}
            >
              <option value="placeholder" disabled>
                Choose your type:
              </option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True/False</option>
            </select>
            {/* Difficulty selection */}
            <select
              id="difficulty"
              name="difficulty"
              value={userDifficultyChoice}
              onChange={handleUserDifficultyChoice}
            >
              <option value="placeholder" disabled>
                Select difficulty:
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <button onClick={QuestionSettingSubmission}>
              Questions Generating!
            </button>
          </form>
        ) : null}
      </section>
    </>
  );
}

export default GameSetting;
