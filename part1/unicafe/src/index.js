import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({title}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total, average, positive, feedback}) => {
  if (!feedback) {
    return (
      <>
        <div>No feedback given</div>
      </>
    )
  }
  return(
    <>
      <Header title='Stats' />
      <table>
        <Statistic text='good' value={good} />
        <Statistic text='neutral' value={neutral} />
        <Statistic text='bad' value={bad} />
        <Statistic text='all' value={total} />
        <Statistic text='average' value={average} />
        <Statistic text='positive' value={positive + "%"} />
      </table>
    </>
  )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedback, setFeedback] = useState(false)
  
  const total = good + bad + neutral

  const averageCalc = (good, bad, total) => {
    let average = (good - bad) / total
    if (Number.isNaN(average)) {
    average = 0
    }
    return average
  }
  const average = averageCalc(good, bad, total)

  const positiveCalc = (good, total) => {
    let positive = (good * 100) / total
    if (Number.isNaN(positive)) {
    positive = 0
    }
    return positive
  }

  const positive = positiveCalc(good, total)
  
  const goodClick = () => {
    setGood(good => good + 1)
    setFeedback(true)
  }
  const neutralClick = () => {
    setNeutral(neutral => neutral + 1)
    setFeedback(true)
  }
  const badClick = () => {
    setBad(bad => bad + 1)
    setFeedback(true)
  }
  const statsProps = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: average,
    positive: positive,
    feedback: feedback
  }

  return (
    <div>
      <Header title='Give feedback' />
      <Button text='good' handleClick={goodClick} />
      <Button text='neutral' handleClick={neutralClick} />
      <Button text='bad' handleClick={badClick} />
      <Statistics {...statsProps} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
  )