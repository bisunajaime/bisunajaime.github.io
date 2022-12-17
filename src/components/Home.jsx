import React from 'react'
import About from './About/About'
import Contact from './Contact/Contact'
import Demo from './Demo/Demo'
import Events from './Events/Events'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Organizations from './Organizations/Organizations'
import Experiences from './Experience/Experience'
import Projects from './Projects/Projects'
import Stack from './Stack/Stack'
import './Home.css'
import { useStateValue } from '../state/AppDataProvider'

function Home() {
    
    const [{nightMode}, dispatcher] = useStateValue()

    return (
        <section className={`home ${nightMode ? 'night' : 'light'}`} id="home">
            <Header />
            <About />
            <Projects />
            <Demo />
            <Stack />
            <Experiences />
            <Events eventType="hosted" />
            <Events eventType="attended" />
            <Organizations />
            <Contact />
            <Footer />
        </section>
    )
}

export default Home
