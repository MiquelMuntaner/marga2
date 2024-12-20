import React, { useEffect, useState, useRef } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { MainContainer, HeaderContainer, FalseInputContainer, OrganicaContainer } from './styles'
import { useNavigate } from 'react-router'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Navbar } from '../../components/Navbar'
import { useInView } from 'react-intersection-observer'
import { Footer } from '../../components/Footer'


export const IniciPage = ({ setDarkMode }) => {
    const navigate = useNavigate()
    const [isVisibleOrganica, setIsVisibleOrganica] = useState(false)
    const [organicaRef, inView] = useInView({ threshold: 0.5 })

    const onInorganicaClick = () => {
        navigate("/inorganica")
    }

    const onOrganicaClick = () => {
        navigate("/organica")
    }

    return (
        <MainContainer>
            <Parallax pages={3} style={{ top: '0', left: '0' }}>

                <ParallaxLayer offset={0} speed={0.1}>
                    <HeaderContainer>
                        <h1>La formulació humanitzada, <b>Nocions.cat</b></h1>
                        <h2>La primera plataforma en català que automatitza tot el procés de formulació química.</h2>
                        <div>
                            <button type='button' onClick={onInorganicaClick} ><span>Formulació</span> Inorgànica</button>
                            <button type='button' onClick={onOrganicaClick}><span>Formulació</span> Orgànica</button>
                        </div>
                    </HeaderContainer>
                </ParallaxLayer>
                <ParallaxLayer offset={0} factor={0.3} speed={0}>
                    <Navbar setDarkMode={setDarkMode} style={{ position: "realtive", zIndex: '1000' }} />
                </ParallaxLayer>

                <ParallaxLayer offset={0.8} speed={0.000000005}>
                    <OrganicaContainer>
                        <img src='./assets/etanoat-de-butil.png'  className={`${inView ? 'visible' : ''}`}></img>
                    </OrganicaContainer>
                </ParallaxLayer>
                <ParallaxLayer offset={0.9} speed={0.5}>
                    <FalseInputContainer>
                            <h2>Orgànica</h2>
                        <div>
                            <p
                                ref={organicaRef}
                                className={`${inView ? 'visible' : ''}`}
                            >Etanoat de butil</p>
                        </div>
                    </FalseInputContainer>
                </ParallaxLayer>
                <ParallaxLayer factor={0.2} offset={2.8} speed={0}>
                    <Footer />
                </ParallaxLayer>
            </Parallax>
        </MainContainer>
    )
}