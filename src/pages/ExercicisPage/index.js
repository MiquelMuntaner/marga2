import React, { useState } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { FinishScreenContainer, InorganicaFormContainer, SelectStudySessionDiv } from './styles'
import { SelectStudyButton } from '../../components/SelectStudyButton'
import { InorganicaExercisePage } from '../../components/InorganicaExercisePage'
import { FinishStudyModal } from '../../components/FinishStudyModal'

export const ExercicisPage = ({ setDarkMode }) => {
    const [screen, setScreen] = useState(1)
    const [showModal, setShowModal] = useState(false)
    const [correctQuestions, setCorrectQuestions] = useState([])
    const [wrongQuestions, setWrongQuestions] = useState([])
    const [inorganicaConfig, setInorganicaConfig] = useState({
        "oxids": true,
        "hidrurs": true,
        "salsBinaries": true,
        "combinacionsNoMetalls": true,
        "hidroxids": true,
        "oxoacids": true,
        "oxosals": true,
        "salsAcides": true,
        "salsHidratades": true
    })

    const onClickInorganica = () => {
        console.log("Inorganica")
        setScreen(2)
    }

    const onClickOrganica = () => {
        console.log("organica")
    }

    const onClickLesDues = () => {
        console.log("les dues")
    }

    const onInorganicaSubmit = (e) => {
        e.preventDefault()
        setScreen(3)
    }

    const onCheckedChange = (e) => {
        let newInorganicaConfig = inorganicaConfig
        newInorganicaConfig[e.target.id] = e.target.checked
        setInorganicaConfig(newInorganicaConfig)
    }

    const onModalClick = () => {
        setScreen(4)
        setShowModal(false)
    }

    return (
        <PageLayout setDarkMode={setDarkMode}>
            {showModal ? <FinishStudyModal setShowModal={setShowModal} onModalClick={onModalClick} /> : ""}
            {screen === 1 ?
                <SelectStudySessionDiv>
                    <p>Què desitges estudiar?</p>
                    <div>
                        <SelectStudyButton onClick={onClickInorganica}>Inorgànica</SelectStudyButton>
                        <SelectStudyButton onClick={onClickOrganica}>Orgànica</SelectStudyButton>
                        <SelectStudyButton onClick={onClickLesDues}>Les dues</SelectStudyButton>
                    </div>
                </SelectStudySessionDiv> : ""
            }
            {screen === 2 ?
                <InorganicaFormContainer>
                    <p>Personalitza la teva sessió d'estudi</p>
                    <div>
                        <form onSubmit={onInorganicaSubmit}>
                            <div>
                                <label htmlFor="oxids">Oxids</label>
                                <input type="checkbox" name="" id="oxids" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="hidrurs">Hidrurs</label>
                                <input type="checkbox" name="" id="hidrurs" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="salsBinaries">Sals binàries</label>
                                <input type="checkbox" name="" id="salsBinaries" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="combinacionsNoMetalls">Combinacions entre no-metalls</label>
                                <input type="checkbox" name="" id="combinacionsNoMetalls" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="hidroxids">Hidròxids</label>
                                <input type="checkbox" name="" id="hidroxids" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="oxoacids">Oxoàcids</label>
                                <input type="checkbox" name="" id="oxoacids" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="oxosals">Oxosals</label>
                                <input type="checkbox" name="" id="oxosals" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="salsAcides">Sals àcides</label>
                                <input type="checkbox" name="" id="salsAcides" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <div>
                                <label htmlFor="salsHidratades">Sals hidratades</label>
                                <input type="checkbox" name="" id="salsHidratades" defaultChecked onChange={onCheckedChange} />
                            </div>
                            <button type="submit">Comença la sessió</button>
                        </form>
                    </div>
                </InorganicaFormContainer> : ""
            }
            {screen == 3 ? <InorganicaExercisePage
                setShowModal={setShowModal}
                inorganicaConfig={inorganicaConfig}
                correctQuestions={correctQuestions}
                setCorrectQuestions={setCorrectQuestions}
                wrongQuestions={wrongQuestions}
                setWrongQuestions={setWrongQuestions}
            /> : ""}
            {screen == 4 ?
                <FinishScreenContainer>
                    <p>Puntuació final: {correctQuestions.length - (wrongQuestions.length * 0.5)}</p>
                    <p>Nombre d'errrades: {wrongQuestions.length}</p>
                    <p>Nombre de preguntes realitzades: {correctQuestions.length + wrongQuestions.length}</p>
                </FinishScreenContainer> : ""
            }
        </PageLayout>
    )
}
