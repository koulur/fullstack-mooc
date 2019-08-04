import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>
                {text}
            </td>
            <td>
                {value} 
            </td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad}) => {
    const all = good + neutral + bad
    const average = (good - bad)/all
    const percentagePositive = 100 * good/all
    if (good === 0 & bad === 0 & neutral === 0) {
        return (
        <div>
            <h2>Statistics</h2>
            No feedback given!
        </div>
        )
    }
    return (
        <div>
        <h2> Statistics </h2>
        <table>
        <tbody>
        <Statistic text='good' value={good}/> 
        <Statistic text='neutral' value={neutral}/>
        <Statistic text='bad' value={bad}/> 
        <Statistic text='all' value={all}/> 
        <Statistic text='average' value={average}/> 
        <Statistic text='positive' value={percentagePositive+'%'}/> 
        </tbody>
        </table>
        </div>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => {
        setGood(good + 1)
        console.log('good clicked', good + 1)
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