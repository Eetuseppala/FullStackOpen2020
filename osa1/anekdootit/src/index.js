import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css';

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  useEffect(() => {
    setMostVoted(FindMostVoted({votes}))
  }, [votes] )

  const handleVoting = () => {
    const newVotes = [...votes]
    newVotes[selected] +=1
    setVotes(newVotes)
  }

  const handleSelectingAnecdote = (props) => {
    let value = Math.floor(Math.random() * anecdotes.length)

    while (value === selected) {
      value = Math.floor(Math.random() * anecdotes.length)
    }
    return(
      value
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>

      <button onClick = {handleVoting}>
        Vote
      </button>

      <button onClick = {()=>setSelected(handleSelectingAnecdote)}>
        Next anecdote
      </button>

      <MostVotes anecdotes = {anecdotes} selected = {selected} votes = {votes} mostVoted = {mostVoted}/>

    </div>
  )
}

const FindMostVoted = (props) => {
  const votes = props.votes
  let max = votes[0]
  let maxIndex = 0

  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > max) {
        maxIndex = i
        max = votes[i]
    }
  }
    return maxIndex 
}

const MostVotes = (props) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{props.anecdotes[props.mostVoted]}</p>
      <p>Votes: {props.votes[props.mostVoted]}</p>
    </>
  )
}

const anecdotes = [
  
'If it hurts, do it more often',
  
'Adding manpower to a late software project makes it later!',
    
'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    
'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    
'Premature optimization is the root of all evil.',
    
'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
