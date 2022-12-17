import React from 'react'
import { trackOrgInteraction } from '../../analytics/helper'
import data from '../../data.json'
import { GA_TRACK_MY_ORG_CLICKED } from '../../state/actions'
import './Organizations.css'

function Organizations() {
    return (
        <section className="organizations" id="organizations">
            <div className="section__header">
                <small>LEADERSHIP XP</small>
                <h2>My Organizations</h2>
            </div>
            <div className="organizations__list">
                {data.organizations.map(org => <Organization key={org.name} org={org} /> )}
            </div>
        </section>
    )
}

const Organization = ({org}) => {
    let {name, acronym, cover_img, department, year} = org

    return <div className="organization">
        <div className="organization__image hover--shadow" onClick={() => trackOrgInteraction(acronym, GA_TRACK_MY_ORG_CLICKED)}>
            <img src={process.env.PUBLIC_URL + cover_img} alt="cover_img"/>
        </div>
        <div className="organization__details">
            <h1>{acronym} | {name}</h1>
            <p className="department">{department}</p>
            <p className="year">{year}</p>
        </div>
    </div>
}

export default Organizations
