export default function Start(props) {
    return (
        <main className="container">
            <h1>Quizzical</h1>
            <h2>A happy trivia quiz!</h2>
            <button className="start-btn" 
                    onClick={props.startHandler}>Start quiz</button>
        </main>
    )
}