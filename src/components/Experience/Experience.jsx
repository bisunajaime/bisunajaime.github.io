import React from 'react'
import { trackExpInteraction } from '../../analytics/helper'
import data from '../../data.json'
import { GA_TRACK_MY_EXP_CLICKED } from '../../state/actions'
import './Experience.css'

function Experiences() {
    return (
        <section className="experiences" id="experience">
            <div className="section__header">
                <small>WORK XP</small>
                <h2>My Work Experience</h2>
            </div>
            <div className="experiences__list">
                {data.experiences.map(exp => <Experience key={exp.name} exp={exp} /> )}
            </div>
        </section>
    )
}

const Experience = ({exp}) => {
    let {name, role, from, to, cover_img} = exp

    return <div className="experience">
        <div className="experience__image hover--shadow" onClick={() => trackExpInteraction(name, GA_TRACK_MY_EXP_CLICKED)}>
            <img src={process.env.PUBLIC_URL + cover_img} alt="cover_img"/>
        </div>
        <div className="experience__details">
            <h1>{name}</h1>
            <p className="department">{role}</p>
            <p className="year">{from} - {to}</p>
        </div>
    </div>
}

export default Experiences
