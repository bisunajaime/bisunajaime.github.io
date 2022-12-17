import React from 'react'
import './Stack.css'
import data from '../../data.json'

function Stack() {
    const keys = Object.keys(data.techstacks)

    return (
        <section className="stack" id='techstack'>
            <div className="section__header">
                <small>I USE THESE</small>
                <h2>Techstack and Tools</h2>
            </div>
            <div className="stack__stacks">
                {keys.map(stack => <StackItem key={stack} stack={stack} />)}
            </div>
        </section>
    )
}

const StackItem = ({ stack }) => {
    let { stacks, emoji } = data.techstacks[stack]

    if (stack === "ui") {
        stack = "UI/UX"
    }

    return <div className="techstack hover--shadow card--border">
        {/* <div className="image">
            <img src={cover_img} alt=""/>
        </div> */}
        <div className="stack__header">
            <span>{emoji}</span>
            <h1>{stack.toUpperCase()}</h1>
        </div>
        <div className="stacks">
            <span>{stacks.join(", ")}</span>
        </div>
    </div>
}

export default Stack
