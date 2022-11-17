// import {useState} from 'react';

export default function Trivia(props) {

    const options = props.trivia.options.map(option => 
        <button className={`option-btn ${props.checked && option.correct?"correct":""} ${option.selected?"selected":""}`} 
                key={option.id}
                onClick={() => props.selectOption(props.trivia.questionId, option.id)}>
                    {option.answer}</button>
    )
    return (
        <section className={`trivia ${props.checked?"checked":""}`}>
            <h3 className="question">{props.trivia.question}</h3>
            <div>{options}</div>
        </section>
    )
}