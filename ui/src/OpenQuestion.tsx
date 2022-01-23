import React from 'react';

const labelStyle = ()=>{
  return {
    margin: '20px',
    width: '100px'
  }
}

const inputStyle = ()=>{
  return {
    margin: '10px',
    width: '200px',
    height: '30px',
    borderRadius: '5px'
  }
}

export const OpenQuestion  = ({question, answers, changeHandler, validationErrors}: {question: any, answers:any, changeHandler: any, validationErrors: any}) => {
    const hideErrorMsg = validationErrors[question.id] === undefined || validationErrors[question.id] === false
    const answer = answers[question.id]
  return <div>
      <label style={labelStyle()}>{question.label}</label>
      <input style={inputStyle()} type='Text' value={answer} onChange={evt=>changeHandler(question.id, evt.target.value, question.validation)} placeholder={question.placeholder}></input>
      <p hidden={hideErrorMsg}>{question.validationError}</p>
  </div>
};
