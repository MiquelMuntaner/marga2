import React, { useEffect, useRef, useState } from 'react'
import { ClueDiv, ExerciseContainer, QuestionDiv } from './styles'
import { exercises } from '../../data'
import confetti from 'canvas-confetti'

export const InorganicaExercisePage = ({ setShowModal, inorganicaConfig, correctQuestions, setCorrectQuestions, wrongQuestions, setWrongQuestions }) => {
    const [configArray, setConfigArray] = useState([])
    const [question, setQuestion] = useState("Pentaclorur de fòsfor")
    const [answer, setAnswer] = useState("PCl5")
    const [firstQuestion, setFirstQuestion] = useState(true)
    const [allQuestions, setAllQuestions] = useState({
        "oxids": [],
        "hidrurs": [],
        "salsBinaries": [],
        "combinacionsNoMetalls": [],
        "hidroxids": [],
        "oxoacids": [],
        "oxosals": [],
        "salsAcides": [],
        "salsHidratades": [],
    })
    const inputRef = useRef()
    const [category, setCategory] = useState("")
    const [clue, setClue] = useState("")

    const newQuestionGenerator = () => {
        setClue("")
        if (firstQuestion === false) {
            let currentAnswer = inputRef.current.value
            if (currentAnswer === answer) {
                setCorrectQuestions([...correctQuestions, question])
                confetti()
            } else {
                setWrongQuestions([...wrongQuestions, question])
            }
        }

        let category = configArray[Math.floor(Math.random() * configArray.length)]
        setCategory(category)
        let tempQuestion = ""
        let i = 0
        do {
            tempQuestion = Object.keys(exercises[category])[Math.floor(Math.random() * Object.keys(exercises[category]).length)]
            i++
        } while (allQuestions[category].includes(tempQuestion) === true && i < exercises[category].length)
        setQuestion(tempQuestion)
        setAnswer(exercises[category][tempQuestion])
        let tempAllQuestions = allQuestions
        tempAllQuestions[category].push(tempQuestion)
        setAllQuestions(tempAllQuestions)
        setFirstQuestion(false)
    }

    useEffect(() => {
        let tempArray = []
        for (let key in inorganicaConfig) {
            if (inorganicaConfig[key] === true) {
                tempArray = configArray
                configArray.push(key)
                setConfigArray(tempArray)
            }
        }

        newQuestionGenerator()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        newQuestionGenerator()
    }

    const handleFinishClick = (e) => {
        setShowModal(true)
    }

    const handleClueClick = (e) => {
        setClue(category)
    }

    return (
        <ExerciseContainer>
            <ClueDiv>
                <img src="./assets/bombilla.svg" alt="" onClick={handleClueClick} />
                <p>{clue}</p>
            </ClueDiv>
            <p>Puntuació: {correctQuestions.length - (wrongQuestions.length * 0.5)}</p>
            <p>Pregunta: {correctQuestions.length + wrongQuestions.length}</p>
            <QuestionDiv>
                <p>{question}</p>
                <form onSubmit={handleSubmit}>
                    <input type='text' ref={inputRef} />
                    <button type="submit">Continua</button>
                </form>
            </QuestionDiv>
            <button onClick={handleFinishClick}>Acabar la sessió</button>
        </ExerciseContainer>
    )
}
