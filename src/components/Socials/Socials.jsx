import React from 'react'
import { trackSocialSiteInteraction } from '../../analytics/helper'
import { GA_TRACK_MY_SOCIAL_CLICK } from '../../state/actions'
import './Socials.css'
import { GitHub, LinkedIn, Twitter } from '@mui/icons-material'

function Socials() {

    return (
        <section className="socials">
            <a onClick={() => trackSocialSiteInteraction("linkedin", GA_TRACK_MY_SOCIAL_CLICK)} rel="noreferrer" href="https://linkedin.com/in/jose-jaime-bisuna" target="_blank"><LinkedIn htmlColor="black" fontSize="large" /></a>
            <a onClick={() => trackSocialSiteInteraction("github", GA_TRACK_MY_SOCIAL_CLICK)} rel="noreferrer" href="https://github.com/bisunajaime" target="_blank"><GitHub htmlColor="black" fontSize="large" /></a>
            <a onClick={() => trackSocialSiteInteraction("twitter", GA_TRACK_MY_SOCIAL_CLICK)} rel="noreferrer" href="https://twitter.com/" target="_blank"><Twitter htmlColor="black" fontSize="large" /></a>
        </section>
    )
}

export default Socials
