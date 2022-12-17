import React from 'react'
import Socials from '../Socials/Socials'
import './Contact.css'

function Contact() {
    return (
        <section className="contact">
            <div className="section__header">
                <small>CONTACT</small>
                <h2>Let's Get In Touch</h2>
                <Socials />
            </div>
            <div className="contact__form">
                <form action="mailto:bisunajaime@gmail.com">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" autoComplete="off" name="subject" placeholder="Subject line here" id="subject" />
                    <label htmlFor="body">Message</label>
                    <textarea placeholder="Type your message here" name="body" id="body" cols="30" rows="10">

                    </textarea>
                    <button>Send</button>
                </form>
            </div>
        </section>
    )
}

export default Contact
