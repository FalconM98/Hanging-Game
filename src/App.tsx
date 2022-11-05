import {letters} from './helpers/letters';
import {HangImage} from "./components/HangImage";
import {useEffect, useState} from "react";
import './App.css';
import {getRamdonWord} from "./helpers/getRamdonWord";

function App() {
    //Variables
    const [word,setWord] = useState(getRamdonWord());
    const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
    const [attempts, setAttempts] = useState(0);
    const [lose, setLose] = useState(false);
    const [won,setWon] = useState(false);

    //Hooks
    useEffect(() => {
        //Determinar si perdio
        if (attempts >= 9) {
            setLose(true);
        }
    }, [attempts])

    //Determinar si la persona gano
    useEffect(() => {
        //console.log(hiddenWord);
        const currentHiddenWord = hiddenWord.split(' ').join('');
        if(currentHiddenWord === word){
            setWon(true);
        }
        console.log(currentHiddenWord);
    },[hiddenWord])

    const checkLetter = (letter: string) => {
        if(lose) return;
        if(won) return;

        if (!word.includes(letter)) {
            setAttempts(Math.min(attempts + 1, 9));
            return;
        }

        const hiddenWordArray = hiddenWord.split(' ');

        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                hiddenWordArray[i] = letter;
            }
        }

        setHiddenWord(hiddenWordArray.join(' '));
    }

    const newGame = () => {
        const newWord = getRamdonWord();
        setWord(newWord);
        setHiddenWord('_ '.repeat(newWord.length));
        setAttempts(0);
        setWon(false);
        setLose(false);
    }

    return (
        <div className="App">
            {/* Imagenes del Ahorcado */}
            <HangImage imageNumber={attempts}/>

            {/* Palabra oculta */}
            <h3>{hiddenWord}</h3>

            {/* Contador de Intentos */}
            <h3>Intentos: {attempts}</h3>

            {/* Mensaje si Perdio */}
            {
                (lose) ? <h2>Perdio: {word}</h2> : ' '
            }

            {/* Mensaje si ganó */}
            {
                (won) ? <h2>Has ganado </h2>: ' '
            }

            {/* Botones de Letras */}
            {
                letters.map((letter: string) => (
                    <button key={letter} onClick={() => checkLetter(letter)}>
                        {letter}
                    </button>
                ))
            }

            <br/>
            <br/>
            <button id="buttonNewGame" onClick={newGame}>Nuevo Juego</button>
        </div>
    )
}

export default App;
