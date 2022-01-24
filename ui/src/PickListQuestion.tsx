import React from 'react';

const labelStyle = ()=>{
  return {
    margin: '5px',
    display: 'block'
  }
}

const selectStyle = ()=>{
  return {
    margin: '5px',
    height: '30px',
    borderRadius: '5px',
    display: 'block',
    width: '101%'
  }
}

export const PickListQuestion  = ({question, answers, changeHandler}: {question: any, answers:any, changeHandler:any}) => {
  const answer = answers[question.id]
  return <div>
      <label style={labelStyle()}>{question.label}</label>
      <select style={selectStyle()} value={answer} onChange={evt=>changeHandler(question.id, evt.target.value, question.validation)}>
            {question.restrictedValue.map((row:any)=><option value={row}>{row}</option>)}
          </select>
  </div>;
};