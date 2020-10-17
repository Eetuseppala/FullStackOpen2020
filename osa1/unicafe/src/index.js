import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>Statistics:</h1>
        <p>No feedback given yet.</p>
      </div>
      )
  }

  return (
    <div>
      <h1>Statistics:</h1>
      <table className = 'centeredTable'>
        <tbody>
          <tr>
            <td><StatisticLine text="Good: "/></td>
            <td><StatisticLine value ={props.good}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Neutral: "/></td>
            <td><StatisticLine value ={props.neutral}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Bad: "/></td>
            <td><StatisticLine value ={props.bad}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="All: "/></td>
            <td><StatisticLine value ={props.all}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Average: "/></td>
            <td><StatisticLine value ={props.average}/></td>
          </tr>
          <tr>
            <td><StatisticLine text="Positive: "/></td>
            <td><StatisticLine value ={props.positivePercent} symbol="%"/></td>
          </tr>  
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return(
    <p>{props.text}{props.value}{props.symbol}</p>
  )
}

const Button = (props) => {
    return (
        <button className = {props.className} onClick={() => props.valueSetter(props.value + 1)}>
          {props.text}
        </button>
    )
}

const App = (props) => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercent = (good * 100) / all

  return (
    <div>
      <h1>Give feedback!</h1>

      <Button text = 'Good' className = 'goodButton' valueSetter = {setGood} value = {good}/>
      <Button text = 'Neutral' className = 'neutralButton' valueSetter = {setNeutral} value = {neutral}/>
      <Button text = 'Bad' className = 'badButton' valueSetter = {setBad} value = {bad}/>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePercent={positivePercent}/>
    </div>
  )
}

ReactDOM.render(<App />, 
document.getElementById('root')
)