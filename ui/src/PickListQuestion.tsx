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

export const PickListQuestion  = ({question, answers, changeHandler}: {question: any, answers:any, changeHandler:any}) => {
  const answer = answers[question.id]
  return <div>
      <label style={labelStyle()}>{question.label}</label>
      <select style={inputStyle()} value={answer} onChange={evt=>changeHandler(question.id, evt.target.value, question.validation)}>
            {question.restrictedValue.map((row:any)=><option value={row}>{row}</option>)}
          </select>
  </div>;
};