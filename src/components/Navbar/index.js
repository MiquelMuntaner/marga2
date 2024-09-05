import React, { useEffect, useRef, useState } from 'react'
import { NavbarContainer, ToggleDarkMode } from './styles'
import { NavLink } from 'react-router-dom'

export const Navbar = ({ setDarkMode }) => {
    const checkboxRef = useRef()

    const handleCheckboxChange = (e) => {
        setDarkMode(checkboxRef.current.checked)
    }

    return (
        <NavbarContainer>
            <div>
                <img src="./assets/logo.png" alt="" />
            </div>
            <ul>
                <li>
                    <NavLink activeClassName="active" to="/inorganica">
                        Inorgànica
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/organica">
                        Orgànica
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/informacio">
                        Informació
                    </NavLink>
                </li>
                {/*<li>
                    <NavLink activeClassName="active" to="/exercicis">
                        Exercicis
                    </NavLink>
                </li>*/}
                {/*<li>
                    <ToggleDarkMode
                        className='light_theme'
                        type='checkbox'
                        ref={checkboxRef}
                        onChange={handleCheckboxChange}
                        defaultChecked={true}
                    ></ToggleDarkMode>
                </li>*/}
            </ul>
        </NavbarContainer>
    )
}