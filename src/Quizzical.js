import { useEffect, useState } from "react"
import Trivia from './Trivia';
import { nanoid } from "nanoid";
import he from 'he';

export default function Quizzical() {
    const triviaApi = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    const [trivias, setTrivia] = useState([])
    function suffle(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    function checkAnswer() {

    }

    useEffect(() => {
        fetch(triviaApi)
            .then(response => response.json())
            .then(data => {
                setTrivia(() => {
                    const trivias = []
                    for(let i=0;i < data.results.length;i++) {
                        let item = data.results[i];
                        let incorrect_answers = item.incorrect_answers.map(ans => {
                            return {
                                id: nanoid(),
                                correct: false,
                                answer: he.decode(ans),
                                selected: false
                            }
                        })
                        let suffledOptions = suffle(
                            [...incorrect_answers, 
                                {
                                    id: nanoid(),
                                    correct: true,
                                    answer: he.decode(item.correct_answer),
                                    selected: false,
                                }
                            ]
                        )

                        trivias.push({
                            questionId: i,
                            question: he.decode(item.question),
                            options: suffledOptions
                        })
                    }
                    return trivias
                })
            })
    }, [])

    function selectOption(answerId, optionId) {
        setTrivia(prevTrivas => 
            prevTrivas.map(trivia => {
                return {
                    ...trivia,
                    options: trivia.options.map(option => {
                        return option.id === optionId? {
                            ...option,
                            selected: true
                        }:option
                    })
                }
            })
        )
    }
    const triviaList = trivias.map(trivia => 
        <Trivia key={trivia.questionId} 
                trivia={trivia} 
                selectOption={selectOption} 
                />
    )
    return (
        <main className="container">
            <section className="quizzical">
                {triviaList}
            </section>
            <section>
                <div className="check-result"></div>
                <button onClick={checkAnswer} className="check-ans-btn">Check answers</button>
            </section>
        </main>
    )
}