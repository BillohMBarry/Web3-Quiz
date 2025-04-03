import './App.css'
import questions from './QuizQuestion'
import FinalScore from './FinalScore'
import { useState } from 'react'
function App() {
  // questions and answer imported from an extenal file ./QuizQuestion.js
  const [Quizquestions] = useState(questions)
  // keeping track of scores, 
  const [scores, setScores] = useState(0)
  // tracks the current question being displayed 
  const [questionIndex, setquestionIndex] = useState(0)
  // To toggle between quiz and final score 
  const [showResult, setShowResult] = useState(false)
  // stores all user answers for review  at the end 
  const [userAnswer, setUserAnswer] = useState([])
  // tracks the currently selected answer
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  // track if answer is correct 
  const [isCorrect, setIsCorrect] = useState(null)
 
  // retrieve the current question object from the Quizquestions array.
  // based on the current question index
  const currentQuestion = Quizquestions[questionIndex]
  /** 
   * UpdateScores function
   * This function handles the logic when a user selects an answer.
   * It sets the selected answer in state
   * increments by 10 for each correct answer 
   * Determines if the answer is correct 
   * Updates the scores state if the answer is correct
   * Records the user's answer details in the userAnswer array
   * Uses a setTimeout to automatically move to the next question after 1 second
   * Shows th final result when all questions are answered
   */
  const updateScores = (selected) => {
    setSelectedAnswer(selected)
    // - 1 because option are array
    const correct =  selected === currentQuestion.answer - 1
    setIsCorrect(correct)
    if(correct) {
      setScores(preScores => preScores + 10)
    }
    // updating the userAnswer state
    // this information is later used to display a review of the answer in the final results
    // category, question, selected answer, correct answer, selected prefix, correct prefix
    setUserAnswer(preAnswers => [
      ...preAnswers, {
        category: currentQuestion.category,
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[selected],
        correctAnswer: currentQuestion.options[currentQuestion.answer - 1],
        selectedPrefix: prefix[selected],
        correctPrefix: prefix[currentQuestion.answer - 1]
      }
    ])
    // get to next question after 1 seconds
    // also clear the states after each questions
    setTimeout(() => {
      if(questionIndex < Quizquestions.length - 1) {
        setquestionIndex(preQuestion => preQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setShowResult(!showResult)
        setSelectedAnswer(null)
        setIsCorrect(null)
      }
    }, 1000);
  }
  const prefix = ["A","B","C","D"]
  return (
    <section className="container">
      <h1 className="main-txt">Test Your Web3 Knowledge</h1>
      <div className="Head-Display">
        <div className="headup-item">
          <p>Question</p>
          <h1 className="Headup-main-text">
            {questionIndex + 1} / {Quizquestions.length}
          </h1>
        </div>
        <div className="headup-item">
          <p>Scores</p>
          <h1 className="Headup-main-text">
            {scores}
          </h1>
        </div>
      </div>
    {!showResult ?  <>
      <div className='titles'>
        <span className="category" >{currentQuestion.category}</span>
        <h2>{currentQuestion.question}</h2>
      </div>
      {currentQuestion.options.map((choices,index) => (
        // answer visually highlighted as correct (green) or incorrect (red)
        <div key={index} className={`choice-container ${selectedAnswer === index ? (isCorrect ? "correct" : "incorrect") : ""}`}
          onClick={() => selectedAnswer === null ? updateScores(index) : null}>
          <p className="choice-prefix">{prefix[index]}</p>
          <p className="choice-text">{choices}</p>
        </div>
      ))}
      </> : 
      // show the final score when all questions are answered
      <FinalScore 
        prefix={prefix}
        scores={scores} 
        setquestionIndex={setquestionIndex} 
        setScores={setScores} 
        setShowResult={setShowResult}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        choices={currentQuestion.options}
      />}
    </section>
  )
}

export default App
