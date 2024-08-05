'use client';
import React, { useState } from 'react'
import WhatToDoTodayQuestionPrimitive from './WhatToDoTodayQuestionPrimitive'

const WhatToDoToday = ({ setButtonClicked, hushh_button_user_tkn, setUserAuthenticated, questions, setButtonFlowCompleted }) => {
  const [questionsToAsk, setQuestionsToAsk] = useState(questions)
  const [activeQuestion, setActiveQuestion] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')
  const [responseMessage2, setResponseMessage2] = useState('')
  console.log(questionsToAsk[activeQuestion].answer)
  const handleNextClick = async () => {
    if (questions.length - activeQuestion > 1) {
      setActiveQuestion(activeQuestion + 1)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const hushh_button_user_tkn = localStorage.getItem('hushh_button_user_tkn')
    if (hushh_button_user_tkn) {
      console.log(questionsToAsk)
      const postData = new URLSearchParams({
        'email': hushh_button_user_tkn,
        'brand': 'Hushh',
        'card[0][question]': questionsToAsk[0].question,
        'card[0][answer]': questionsToAsk[0].answer,
        'card[1][question]': questionsToAsk[1].question,
        'card[1][answer]': questionsToAsk[1].answer,
        'card[2][question]': questionsToAsk[2].question,
        'card[2][answer]': questionsToAsk[2].answer,
      })
      console.log(postData)
      const res = await fetch('https://hushhdevenv.hushh.ai/user/v1/create-user-shopping-Card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: postData
      })

      const response = await res.json()
      console.log(response)

      if (response.status === 1) {
        setResponseMessage('Thank you for sharing your data! we will personalize your experience based on your answers')
        setResponseMessage2('we will personalize your experience based on your responses')
        setTimeout(() => {
          setButtonClicked(false)
          setButtonFlowCompleted(true)
        }, 3000)
      }

    }
  }

  const handleBackClick = () => {
    setActiveQuestion(activeQuestion - 1)
  }

  return (
    <>
      {responseMessage === '' ?
        <div className='max-w-96 px-5 py-5 flex flex-col gap-4 text-center'>
          <WhatToDoTodayQuestionPrimitive
            questionObject={questionsToAsk[activeQuestion]}
            activeQuestion={activeQuestion}
            setQuestionsToAsk={setQuestionsToAsk}
            handleNextClick={handleNextClick}
          />
          {
            questionsToAsk[activeQuestion].answer.length !== 0 &&
            <div className="flex gap-4 px-5 items-center justify-center">
              {activeQuestion !== 0 && <button onClick={handleBackClick} className='py-2.5 px-8 bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white rounded-lg'>Back</button>}
              {
                questions.length - activeQuestion === 1 ?
                  <button onClick={submitHandler} className='py-2.5 px-8 bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white rounded-lg'>Save</button>
                  :
                  <button onClick={handleNextClick} className='py-2.5 px-8 bg-gradient-to-r from-gradientColor1 to-gradientColor2 text-white rounded-lg'>Next</button>
              }
            </div>
          }
        </div>
        :
        <div className="max-w-96 px-5 py-5 text-center flex flex-col gap-5">
          <p className='font-bold text-lg'>{responseMessage}</p>
          <p>{responseMessage2}</p>
        </div>
      }
    </>
  )
}

export default WhatToDoToday