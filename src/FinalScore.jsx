import React from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
function FinalScore({scores, setquestionIndex, setScores, setShowResult, userAnswer, setUserAnswer, setSelectedAnswer, setIsCorrect}) {
    const resetQuiz = () => {
        setquestionIndex(0);
        setScores(0);
        setShowResult(false);
        setUserAnswer([])
        setSelectedAnswer()
        setIsCorrect()
    }
    const {width, height} = useWindowSize()
    const totalQuestions = userAnswer.length
    const scorePercentage = totalQuestions > 0 ? (scores / (totalQuestions * 10)) * 100 : 0

    const shareResults = () => {
        const text = `I scored ${scores}/${userAnswer.length} (${scorePercentage}%) on the Web3 Quiz!`;
        
        if (navigator.share) {
          navigator.share({
            title: 'My Web3 Quiz Results',
            text: text,
            url: window.location.href,
          })
          .catch((error) => console.log('Error sharing:', error));
        } else {
          // Fallback for browsers that don't support the Web Share API
          navigator.clipboard.writeText(text + ' ' + window.location.href)
            .then(() => alert('Results copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
        }
      };
    // console.log(totalQuestions)
  return (
    <div className="Final-score">
        <Confetti gravity={0.1} width={width} height={height}  initialVelocityX={2} initialVelocityY={2} numberOfPieces={200} opacity={1} recycle={false} run  wind={0}/>
        <h2 className='final-score-title'>Quiz Completed!</h2>
        <p>Your final score: {scores}/{totalQuestions} ({scorePercentage}%)</p>
      <ul>
        <span>See correct answer</span>
        {userAnswer.map((item,index) => (
            <li key={index} className='review-item'>
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Question:</strong> {item.question}</p>
                <p><strong>Selected:</strong> {item.selectedAnswer}</p>
                <p><strong>Correct Answer:</strong> {item.correctAnswer}</p>
            </li>
        ))}
      </ul>
      <button onClick={resetQuiz}>
            Restart Quiz
          </button>
         <button onClick={shareResults}>Share Result</button>
          {/* <p>{currentQuestion}</p> */}

    </div>
  )
}

export default FinalScore
