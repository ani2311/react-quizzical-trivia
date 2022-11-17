// import {useState} from 'react';

export default function Trivia(props) {

    const options = props.trivia.options.map(option => 
        <button className={`option-btn ${option.selected?'selected':''}`} 
                onClick={() => props.selectOption(props.trivia.questionId, option.id)}>
                    {option.answer}</button>)
    return (
        <section className="trivia">
            <h3 className="question">{props.trivia.question}</h3>
            <div>{options}</div>
        </section>
    )
}