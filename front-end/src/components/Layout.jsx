import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './Navbar'
import { Container } from 'react-bootstrap'

function Layout() {
    return (
        <>

            <NavBar />
            <Container>
                <Outlet />
            </Container>

        </>
    )
}

export default Layout