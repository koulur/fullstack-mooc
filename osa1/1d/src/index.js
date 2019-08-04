import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistics = ({ good, neutral, bad}) => {
    return (
        <div>
        <h2> Statistics </h2>
        {'good ' + good} 
        <br/>
        {'neutral ' + neutral}
        <br/>
        {'bad ' + bad}
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
        console.log('good clicked', good)
    }

    const neutralClick = () => {
        setNeutral(neutral + 1)
        console.log('neutral clicked', neutral)
    }

    const badClick = () => {
        setBad(bad + 1)
        console.log('bad clicked', bad)
    }
    
    return (
        <div>
        <h2>Give feedback</h2>
        <Button handleClick={goodClick} text={'good'} />
        <Button handleClick={neutralClick} text={'neutral'} />
        <Button handleClick={badClick} text={'bad'} />
        <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))