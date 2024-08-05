import React from 'react'

const WhatToDoTodayQuestionPrimitive = ({ questionObject, activeQuestion, setQuestionsToAsk, handleNextClick }) => {

    const addOption = (option) => {
        // setQuestionsToAsk(prevState => {
        //     const updatedQuestions = [...prevState];
        //     updatedQuestions.forEach((question, index) => {
        //         if (index === activeQuestion) {
        //             if (!question.answer.includes(option)) {
        //                 question.answer.push(option); // Push the selected option to the answer array
        //             }
        //         }
        //     });
        //     return updatedQuestions;
        // });

        setQuestionsToAsk(prevState => {
            const updatedQuestions = [...prevState];
            updatedQuestions.forEach((question, index) => {
                if (index === activeQuestion) {
                    question.answer = option; // Push the selected option to the answer array
                }
            });
            return updatedQuestions;
        });
    }
    const removeOption = (option) => {
        setQuestionsToAsk(prevState => {
            const updatedQuestions = prevState.map(question => {
                if (question === questionObject) {
                    question.answer = question.answer.filter(item => item !== option);
                }
                return question;
            });
            return updatedQuestions;
        });
    };
    const handleOptionClick = (option) => {
        if (questionObject.answer.includes(option)) {
            removeOption(option); // If present, remove it
        } else {
            addOption(option); // If not present, add it
        }
    }

    return (
        <>
            <div className="text-center flex flex-col gap-2">
                <p className='font-semibold'>{questionObject.question}</p>
            </div>
            <div className="">
                {questionObject.options.map((option) =>
                    <div
                        onClick={() => handleOptionClick(option)}
                        className={`cursor-pointer ${questionObject.answer.includes(option) ? 'bg-gradient-to-r from-gradientColor2 to-gradientColor1' : 'bg-white'} my-2 rounded-lg p-[1px]`} key={option}
                    >
                        <div className={` py-2.5 rounded-lg ${questionObject.answer.includes(option) ? 'text-white' : ' bg-white border border-black'}`}>
                            {option}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WhatToDoTodayQuestionPrimitive