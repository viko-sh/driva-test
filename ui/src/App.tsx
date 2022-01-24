import React, { useState } from 'react';
import { OpenQuestion } from './OpenQuestion';
import { PickListQuestion } from './PickListQuestion';

const App: React.FC = () => {
  const questions = require('./data.json')

  const [answers, setAnswer] = useState({})
  const [validationErrors, setValidationErrors] = useState({})
  const [page, setPage] = useState(1)
  let maxPage = 0
  
  questions.forEach((row:any)=>{
    maxPage = maxPage < row.page ? row.page : maxPage
  })

  const onAnswerChanged = (questionId: number, questionValue: string, validation: string)=>{
    setValidationErrors({...validationErrors, [questionId]: !questionValue.match(new RegExp(validation))})
    setAnswer({...answers, [questionId]: questionValue})
  }

  const submit = async (data: any)=>{
    try {
      const header = new Headers()
      header.append("Content-Type", "application/json");
      const result = await fetch("http://localhost:8080", 
      {  
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
      })
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const goNextPage = async ()=>{
    if(page < maxPage){
      setPage(page + 1);
    }else{
      await submit(answers)
    }
  }

  const goPreviousPage = ()=>{
    if(page > 1){
      setPage(page - 1);
    }
  }

  const style = () => {
    return {
      margin: 'auto',
      width: '400px',
      paddingTop: '80px'
    }
  }

  const tableStyle = () => {
    return {
      width: '100%'
    }
  }

  const buttonStyle = () => {
    return {
      width: '130px',
      height: '40px',
      margin: '20px'
    }
  }

  return <div style={style()}>
    <form>
      <table style={tableStyle()}>
        {
          questions.filter((row:any)=>row.page === page).map((row: any)=>{
            if(row.type === 'text'){
              return <tr><OpenQuestion question={row} answers={answers} changeHandler={onAnswerChanged} validationErrors={validationErrors}/></tr>
            }
            if(row.type === 'option'){
              return <tr><PickListQuestion question={row} answers={answers} changeHandler={onAnswerChanged}/></tr>
            }
            return <div></div>
          })
        }
      </table>
    </form>
    <button style={buttonStyle()} onClick={()=>{goPreviousPage()}}>Previous</button>
    <button style={buttonStyle()} className="right-aligh-button" onClick={async ()=>goNextPage()}>Next</button>
  </div>;
};

export default App;
