import { useEffect, useState } from "react"
import Trivia from './Trivia';
import { nanoid } from "nanoid";
import he from 'he';

export default function Quizzical() {
    const triviaApi = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
    const [trivias, setTrivia] = useState([])
    const [correctness, setCorrectness] = useState(0)
    const [checked, setChecked] = useState(false)

    function suffle(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    function checkAnswer() {
        let newTrivias = []
        let correctness = 0
        for(let i=0;i<trivias.length;i++) {
            let bingo = trivias[i].options.filter(option => option.selected && option.correct).length > 0
            newTrivias.push({...trivias[i], bingo: bingo})
            correctness += bingo?1:0
        }

        setTrivia(newTrivias)
        setCorrectness(correctness)
        setChecked(true)
    }

    function newQuizzical() {
        getNewTrivias()
        setChecked(false)
        setCorrectness(0)
    }

    function getNewTrivias() {
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
                                selected: false,
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
                            options: suffledOptions,
                            bingo: false
                        })
                    }
                    return trivias
                })
            })
    }

    function selectOption(questionId, optionId) {
        setTrivia(prevTrivias => 
            prevTrivias.map(trivia => {
                return trivia.questionId === questionId?{
                    ...trivia,
                    options: trivia.options.map(option => {
                        return option.id === optionId? {
                            ...option,
                            selected: !option.selected
                        }: {
                            ...option,
                            selected: false
                        }
                    })
                }:trivia
            })
        )
    }

    useEffect(getNewTrivias, [])

    const triviaList = trivias.map(trivia => 
        <Trivia key={trivia.questionId} 
                trivia={trivia} 
                selectOption={selectOption} 
                checked={checked}
                />
    )
    return (
        <main className="container">
            <section className="quizzical">
                {triviaList}
            </section>
            <section className="result">
                {checked && <div className="check-result">
                    You scored {correctness}/{trivias.length} correct answers.
                    </div>
                }
                <button onClick={checked?newQuizzical:checkAnswer} className="check-ans-btn">
                    {checked?"Play again":"Check answers"}</button>
            </section>
        </main>
    )
}