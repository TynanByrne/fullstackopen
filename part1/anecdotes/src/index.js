
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.name}</button>
    </>
  )
}

const Header = ({header}) => {
  return(
   <>
    <h1>{header}</h1>
  </> 
  )
}

const Top = (props) => {
    if (props.noVotes) {
      return (
        <div>Nothing has been voted for yet.</div>
      )
    }
    return (
     <>
      <div>{props.currentTop}</div>
      <div>Has {props.topVotes} votes</div>
     </>
    )
  }

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [noVotes, setNoVotes] = useState(true)
  const [votes, setVotes] = useState({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
      })

  const randomGen = () => {
    let newNum;
    do {
      newNum = Math.floor(Math.random() * anecdotes.length)
    } while (selected === newNum)
    setSelected(newNum)
  }

  const vote = () => {
    setNoVotes(false)
    const copy = {...votes}
    copy[selected] += 1
    setVotes(copy)
  }

  const topAnecdote = (votes) => {
    let votesArray = [];
    for (let i = 0; i < anecdotes.length; i++) {
      votesArray.push(votes[i])
    }
    let max = Math.max(...votesArray)
    let maxIndex // The index in the array where the votes are the highest
    for (let i = 0; i < anecdotes.length; i++) {
      if (votesArray[i] === max) {
        maxIndex = i
      }
    }
    return maxIndex
  }
  
  const currentTop = anecdotes[topAnecdote(votes)]
  const topVotes = votes[topAnecdote(votes)]
  
  return (
    <div>
      <Header header="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <Button handleClick={vote} name="vote" />
      <Button handleClick={randomGen} name="next anecdote" />
      <Header header="Anecdote with the most votes" />
      <Top noVotes={noVotes} currentTop={currentTop} topVotes={topVotes} />
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)