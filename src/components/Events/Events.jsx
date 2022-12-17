import React from 'react'
import { trackEventInteraction } from '../../analytics/helper'
import data from '../../data.json'
import { GA_TRACK_MY_EVENT_CLICKED } from '../../state/actions'
import './Events.css'

function Events({eventType = "hosted"}) {
    return (
        <section className="events" id="events">
            <div className="section__header">
                <small>SOME OF THE</small>
                <h2>Events I {eventType === "hosted" ? "Hosted" : "Attended"}</h2>
            </div>
            <div className="events__list">
                {
                    eventType === "hosted" ? data.events.hosted.map(event => (<Event key={event.name} event={event} />)) : data.events.attended.map(event => (<Event key={event.name} event={event} />))
                }
                
            </div>
        </section>
    )
}

const Event = ({event}) => {
    let {name, cover_img, description} = event

    return <div className="event" onClick={() => trackEventInteraction(name, GA_TRACK_MY_EVENT_CLICKED)} >
        <div className="event__image hover--shadow">
            <img src={process.env.PUBLIC_URL + cover_img} alt=""/>
        </div>
        <div className="event__details">
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    </div>
}

export default Events
