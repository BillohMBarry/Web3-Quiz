import {useState} from "react"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
function FinalScore({scores, setquestionIndex, setScores, setShowResult, userAnswer, setUserAnswer}) {
    const [showAnswer, setShowAnswer] = useState(true)
    // reset the quiz state to its initial state
    const resetQuiz = () => {
        setquestionIndex(0);
        setScores(0);
        setShowResult(false);
        setUserAnswer([])
    }
    // toggles the visibility of the answer
    const Answer = () => {
        setShowAnswer(preAns => !preAns)
    }
    const {width, height} = useWindowSize()
  return (
    <section className="Final-score">
        {/* confetti animation to create a celebratory effect */}
        <Confetti gravity={0.1} width={width} height={height}  initialVelocityX={2} initialVelocityY={2} numberOfPieces={200} opacity={1} recycle={false} run  wind={0}/>
        <h2 className='final-score-title'>Quiz Completed!</h2>
        {/* scores display */}
        <h3>Your final score: {scores}</h3>
        <div className="buttons">
            {/* buttons to restart the quiz and toggle the visibility of the answer */}
            <button onClick={resetQuiz} className='btn'>Restart Quiz</button>
            <button className='btn' onClick={Answer}>{showAnswer ? "showAnswer" : "Hide"}</button>
        </div>
        {/* answer review section
            mapping to dynamically generate a review of each question,answers with correct answers and selected answers
        */}
     {!showAnswer && userAnswer.map((item,index) => (
        <section key={index} className='review-item'>
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Question:</strong> {index + 1} {item.question}</p>
            <p><strong>Selected:</strong> <span className='prefix'> {item.selectedPrefix}</span>/ {item.selectedAnswer}</p>
            <p><strong>Correct Answer:</strong> <span className='prefix'> {item.correctPrefix}</span>/  {item.correctAnswer}</p>
        </section>
     ))}
      
       
    </section>
  )
}

export default FinalScore
