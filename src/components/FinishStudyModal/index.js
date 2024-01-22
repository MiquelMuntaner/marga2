import React from 'react'
import { ModalContainer } from './styles'

export const FinishStudyModal = ({ setShowModal, onModalClick }) => {
    const handleNoClick = () => {
        setShowModal(false)
    }

    return (
        <ModalContainer>
            <div>
                Estàs segur que vols acabar la sessió i veure els resultats?
                <div>
                    <button onClick={onModalClick}>Si</button>
                    <button onClick={handleNoClick}>No</button>
                </div>
            </div>
        </ModalContainer>
    )
}
