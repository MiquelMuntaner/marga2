import React, { useEffect, useState, useRef } from 'react'
import { PageLayout } from '../../components/PageLayout'
import { MainContainer, HeaderContainer, FalseInputContainer, OrganicaContainer, InorganicaContainer } from './styles'
import { useNavigate } from 'react-router'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { Navbar } from '../../components/Navbar'
import { useInView } from 'react-intersection-observer'
import { Footer } from '../../components/Footer'
import {ReactTyped} from 'react-typed'


const images = [
    { src: "./assets/etanoat-de-butil.png", duration: 2920 },
    { src: "./assets/benze.png", duration: 3000 },
    { src: "./assets/acid-octanoic.png", duration: 3880 }, 
];

const compostos = [
    ["Nitrat de cobalt(III)", "Oxisal", "120,9381"],
    ["NaCl", "Sal binària", "058,4428"],
    ["Dihidrogenfosfat de calci", "Sal àcida", "137,0652"],
]


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

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentInorganicaIndex, setCurrentInorganicaIndex] = useState(0)
    const [fade, setFade] = useState(false);
    const [inorganicaFade, setInorganicaFade] = useState(false)
    let animationHasStarted = false
    let inorganicaHasStarted = false

    const switchImage = () => {
        if (animationHasStarted) {
            setFade(true); // Start fade-out
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(false); // Start fade-in
            }, 500); // This timeout matches the CSS fade duration
        } else {
            animationHasStarted = true
            setFade(false)
        }
    };

    useEffect(() => {
        setFade(true)
            setInorganicaFade(true)
    }, [])


    const switchInorganica = () => {
        if (inorganicaHasStarted) {
            setInorganicaFade(true); // Start fade-out
            setTimeout(() => {
                setCurrentInorganicaIndex((prevIndex) => (prevIndex + 1) % compostos.length);
                setInorganicaFade(false); // Start fade-in
            }, 500); // This timeout matches the CSS fade duration
        } else {
            inorganicaHasStarted = true
            setInorganicaFade(false)
        }
    }

    return (
        <PageLayout setDarkMode={setDarkMode}>
            <MainContainer>
                    <HeaderContainer>
                        <h1>La formulació humanitzada,<br></br> <b><ReactTyped
                                    strings={[
                                        "Nocions.cat"
                                    ]}
                                    startDelay={0}
                                    typeSpeed={100}
                                /></b></h1>
                        <h2>La primera plataforma en català que automatitza tot el procés de formulació química.</h2>
                        <div>
                            <button type='button' onClick={onInorganicaClick} ><span>Formulació</span> Inorgànica</button>
                            <button type='button' onClick={onOrganicaClick}><span>Formulació</span> Orgànica</button>
                        </div>
                    </HeaderContainer>
                    <OrganicaContainer>
                        <div>
                            <h2>Formulació orgànica</h2>
                            <p>Formula fàcilment qualsevol compost orgànic del temari de primer de batxillerat, genera imatges professionals per a exercicis i explora totes les opcions de personalització que s'adapten a les teves necessitats.</p>
                            <button type='button' onClick={onOrganicaClick}><span>Formulació</span> Orgànica</button>
                        </div>
                        <div>
                            <p>
                                <ReactTyped
                                    strings={[
                                        "Etanoat de butil",
                                        "Benzè",
                                        "Àcid octanoic",
                                    ]}
                                    startDelay={0}
                                    typeSpeed={100}
                                    backDelay={1400}
                                    backSpeed={60}
                                    fadeOutDelay={0}
                                    onStringTyped={() => switchImage()}
                                    loop
                                />
                            </p>
                            <img src={images[currentImageIndex].src} className={fade ? "fade" : ""}></img>
                            <img className='blankImage' src='./assets/blank.png'></img>
                        </div>     
                    </OrganicaContainer>
                    <InorganicaContainer>
                        <div>
                            <p>
                                <ReactTyped
                                    strings={[
                                        "Co(NO₃)₃",
                                        "Clorur de sodi",
                                        "Ca(H₂PO₄)₂",
                                    ]}
                                    startDelay={0}
                                    typeSpeed={100}
                                    backDelay={1400}
                                    backSpeed={60}
                                    fadeOutDelay={0}
                                    onStringTyped={() => switchInorganica()}
                                    loop
                                />
                            </p>
                            <div>
                                <p>Resultat: <span className={inorganicaFade ? "inorganicaFade" : ""}>{compostos[currentInorganicaIndex][0]}</span></p>
                                <p>Tipus: <span className={inorganicaFade ? "inorganicaFade" : ""}>{compostos[currentInorganicaIndex][1]}</span></p>
                                <p>Massa molar: <span className={inorganicaFade ? "inorganicaFade" : ""}>{compostos[currentInorganicaIndex][2]}</span></p>
                            </div>
                        </div>
                        <div>
                            <h2>
                                Formulació inorgànica
                            </h2>
                            <p>Formula compostos inorgànics de manera totalment automàtica o obté la seva composició a partir del nom formulat, tot mentre reps instruccions detallades del procés per aprendre'n de manera efectiva.</p>
                            <button type='button' onClick={onInorganicaClick} ><span>Formulació</span> Inorgànica</button>
                        </div>
                    </InorganicaContainer>
                    {/*<FalseInputContainer>
                        <div></div>
                        <div>
                            <p
                                ref={organicaRef}
                                className={`${inView ? 'visible' : ''}`}
                            >Etanoat de butil</p>
                        </div>
                        <img src='./assets/etanoat-de-butil.png'></img>
                    </FalseInputContainer>*/}

            </MainContainer>
        </PageLayout>
    )
}