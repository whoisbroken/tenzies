import React from "react"
import Confetti from "react-confetti"
import { nanoid } from "nanoid"

import Die from "./components/Die.js"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    function allNewDice() {
        const diceArr = []
        for (let i = 0; i < 10; i++) {
            let randNum = Math.ceil(Math.random() * 6);
            let die = {
                value: randNum,
                isHeld: false,
                id: nanoid()
            }
            diceArr.push(die);
        }
        console.log(diceArr);
        return diceArr;
    }

    function rollDice() {
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
            return;
        }
        setDice(prevDice => prevDice.map(die => {
            return die.isHeld ? die : {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }
        }));
    }

    function holdDice(id) {
        setDice(prevDice => 
            prevDice.map(die => {
                return {...die,
                isHeld: die.id===id ? !die.isHeld : die.isHeld}
            }
            )
        )
    }

    React.useEffect(() => {
        let win = true;
        let numToWin = dice[0].value;
        dice.forEach(die => {
            if (!die.isHeld) {
                win = false;
            }
            if (die.value !== numToWin) {
                win = false
            }
        })
        if (win) {
            setTenzies(true)
        }
    }, [dice])

    return (
        <main>
            {tenzies && <Confetti />}
            <h2 className="title">Tenzies</h2>
            <p>Roll until all dice are the same. Click each die to freeze 
                it at its current value between rolls.</p>
            <div className="dice-container">
                {dice.map(die => {
                    return <Die key={die.id} 
                    value={die.value} 
                    isHeld={die.isHeld}
                    holdDice={() => holdDice(die.id)}
                    />
                })}
            </div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}
