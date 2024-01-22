import React from 'react'
import { NavbarContainer } from './styles'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <NavbarContainer>
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
                    <NavLink activeClassName="active" to="/exercicis">
                        Exercicis
                    </NavLink>
                </li>
            </ul>
        </NavbarContainer>
    )
}