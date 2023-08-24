import React from 'react'
import { trackResumeInteraction } from '../../analytics/helper'
import { GA_TRACK_RESUME_CLICK } from '../../state/actions'
import Socials from '../Socials/Socials'
import './About.css'

function About() {
    return (
        <section className="about" id="about">
            <div className="about__label">
                <span>MY PORTFOLIO</span>
            </div>
            <div className="about__myinfo">
                <span><span className="accent--text">Jaime</span> is a Software Developer</span>
                <span>based in Manila, PH</span>
            </div>
            <div className="about__quote">
                <p>Passionate in building mobile/web apps and believe that time is something that must not be wasted, but must be used wisely.</p>
            </div>
            <Socials />
            <div className="about__resume button--hover">
                <a onClick={() => trackResumeInteraction("resume", GA_TRACK_RESUME_CLICK)} rel="noreferrer" className="" href={process.env.PUBLIC_URL + "/files/ResumeJaimeBisuña.pdf"} target="_blank">My Resume</a>
            </div>
        </section>
    )
}

export default About
