import './App.css'
import questions from './QuizQuestion'
import FinalScore from './FinalScore'
import { useState } from 'react'
function App() {
  const [Quizquestions] = useState(questions)
  // keeping track of scores
  const [scores, setScores] = useState(0)
  // guestion
  const [questionIndex, setquestionIndex] = useState(0)
  // result
  const [showResult, setShowResult] = useState(false)
  // track user answers
  const [userAnswer, setUserAnswer] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  // track if answer is correct
  const [isCorrect, setIsCorrect] = useState(null)
  const currentQuestion = Quizquestions[questionIndex]
  // update scores 
  const updateScores = (selected) => {
    setSelectedAnswer(selected)
    // - 1 because option are array
    // count scores by 10 if correct
    const correct =  selected === currentQuestion.answer - 1
    setIsCorrect(correct)
    if(correct) {
      setScores(preScores => preScores + 10)
    }
    setUserAnswer(preAnswers => [
      ...preAnswers, {
        category: currentQuestion.category,
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[selected],
        correctAnswer: currentQuestion.options[currentQuestion.answer - 1]

      }
    ])
    // get to next question after 1 seconds
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
      <span>Test Your Web3 Knowledge</span>
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
        <div key={index} className={`choice-container ${selectedAnswer === index ? (isCorrect ? "correct" : "incorrect") : ""}`}
          onClick={() => selectedAnswer === null ? updateScores(index) : null}>
          <p className="choice-prefix">{prefix[index]}</p>
          <p className="choice-text">{choices}</p>
        </div>
      ))}
      </> : 
      <FinalScore 
        scores={scores} 
        setquestionIndex={setquestionIndex} 
        setScores={setScores} 
        setShowResult={setShowResult}
        setUserAnswer={setUserAnswer}
        userAnswer={userAnswer}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
      />}
    </section>
  )
}

export default App
