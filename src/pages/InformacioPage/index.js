import React from 'react'
import { PageLayout } from '../../components/PageLayout'
import { InfoContainer } from './styles'

const VERSIONS = [
    {
        "version": "0.0.1",
        "date": "04/09/2024",
        "info": ["Després de quasi un any de desenvolupament primera beta pública de Nocions. El fet de no ser una versió estable implica que pot tenir una gran varietat d'errors que corregirem amb la màxima brevetat possible."]
    }
]

export const InformacioPage = ({ setDarkMode }) => {
    return (
        <PageLayout setDarkMode={setDarkMode}>
            <InfoContainer>
                <h2>Sobre el projecte</h2>
                <p>Nocions és una plataforma que neix amb l'objectiu d'agilitzar el procés d'aprenentatge de la formulació química dins el batxillerat. No es garanteix la precisió del resultat ni es recomana l'ús d'aquest programa dins un ambient universitari o professional. No conté intel·ligència artificial ni està proveït de cap base de dades que contingui tots els composts, sinó que dur a terme la formulació de forma algorítmica.</p>
                <p>Aquest projecte és un treball tècnic desenvolupat a l'IES Felanitx entre els cursos 23-24 i 24-25.</p>
                <p><b>Tutor del treball de recerca:</b> Toni Salvà Tomàs</p>
                <p><b>Autor:</b> Miquel Muntaner Barceló</p>
                <h2>Registre de versions</h2>
                {VERSIONS.map(function (content, i) {
                    return (
                        <>
                            <h3>{content.version} - {content.date}</h3>
                            <ul>{content.info.map(function (contentInfo, i) {
                                return <li>{contentInfo}</li>
                            })}</ul>
                            <hr />
                        </>
                    )
                })}
            </InfoContainer>

        </PageLayout>
    )
}
