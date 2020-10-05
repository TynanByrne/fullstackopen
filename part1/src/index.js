import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>Hello, {props.name}. You are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app made by <a href="wwww.github.com/TynanByrne">Tynan</a>
    </div>
  )
}

const App = () => {
  const name = "Bob"
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Alice" age={23+4} />
      <Hello name={name} age={age}/>
      <Footer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
