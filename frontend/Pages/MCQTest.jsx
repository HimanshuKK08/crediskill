import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const MCQTest = () => {
  const location = useLocation();
  const { questions, testId, skillName } = location.state;
  
  // State management
  // const [questions] = useState(dummyQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(null);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;


  const navigate = useNavigate();
  // Handle option selection
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  // Handle next/submit button
  const handleNext = () => {
    // Save current answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion._id]: selectedOption
    };
    setAnswers(updatedAnswers);

    if (isLastQuestion) {
      // Submit test
      submitTest(updatedAnswers);
    } else {
      // Move to next question
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    }
  };

  // Submit test to backend
  const submitTest = (finalAnswers) => {
    // Simulate API call with dummy score
    // setTimeout(() => {
    //   const dummyScore = Math.floor(Math.random() * 5) + 6; // Random score 6-10
    //   setScore(dummyScore);
    //   setIsCompleted(true);
    // }, 500);

    // Actual API call (commented out)
    fetch('/api/test/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId: testId,
        answers: finalAnswers,
        skillName,
        totalQuestions
      })
    })
    .then(res => res.json())
    .then(data => {
      setScore(data.score);
      setIsCompleted(true);
    });
    console.log(score);
    
  };

  // Restart test
  const handleExit = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setIsCompleted(false);
    setScore(null);

    navigate('/dashboard');
  };

  // Result screen
  if (isCompleted) {
    const percentage = ((score / totalQuestions) * 100).toFixed(2);
    return (
      <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
            <p className="text-gray-600">Here's how you performed</p>
          </div>

          <div className="mb-8">
            <div className="text-6xl font-bold text-gray-900 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className="text-lg text-gray-600">
              {percentage}% Score
            </div>
          </div>

          <button
            onClick={handleExit}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Test screen
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Skill Assessment Test</h1>
          <p className="text-gray-600">Answer all questions to complete the test</p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedOption === index
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedOption === index
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === index && (
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span className={`${
                    selectedOption === index ? 'text-gray-900 font-medium' : 'text-gray-700'
                  }`}>
                    {option}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`py-3 px-8 rounded-lg font-medium transition-all ${
              selectedOption === null
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLastQuestion ? 'Submit Test' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQTest;