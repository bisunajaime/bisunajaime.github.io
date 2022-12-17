import React from 'react'
import './Projects.css'
import data from '../../data.json'
import { useStateValue } from '../../state/AppDataProvider'
import { CLEAR_SELECTED_PROJECT, GA_TRACK_PROJECT_CLICK, GA_TRACK_PROJECT_LINK_CLICK, HIDE_OTHER_PROJECTS, LOAD_MORE_PROJECTS, SET_PROJECT_DEMO } from '../../state/actions'
import { trackProjectInteraction } from '../../analytics/helper'

function Projects() {
    const [{projectsList}, dispatcher] = useStateValue()

    const loadMore = () => {
        dispatcher({
            type: LOAD_MORE_PROJECTS,
        })
    }

    const hide = () => {
        dispatcher({
            type: HIDE_OTHER_PROJECTS
        })
    }

    return (
        <section className="projects" id="projects">
            <div className="section__header">
                <small>SOME OF MY</small>
                <h2>Personal Projects</h2>
            </div>
            <div className="projects__grid">
                {projectsList.filter(project => project.hasDemo !== false).map((project, index) => <Project key={project.name} index={index} project={project} />)}
            </div>
            {
                data.projects.length === projectsList.length ? <div className="projects__loadmore" onClick={hide}>
                    <button className="button button--hover">Hide</button>
                </div> : <div className="projects__loadmore">
                <button className="button button--hover" onClick={loadMore}>Load More</button>
            </div>
            }
        </section>
    )
}

const Project = ({index, project}) => {

    const [{projectsList}, dispatcher] = useStateValue()

    const setProject = async () => {
        dispatcher({
            type: CLEAR_SELECTED_PROJECT
        })
        trackProjectInteraction(projectsList[index].name, GA_TRACK_PROJECT_CLICK)
        setTimeout(() => {
            
            dispatcher({
                type: SET_PROJECT_DEMO,
                payload: {
                    index: index,
                }
            })
            document.getElementById('demo').scrollIntoView()
        }, 150);
    }

    return <div className="project">
        <a href="#demo" className="project__image" onClick={setProject}>
            <span>View Demo</span>
            <img src={process.env.PUBLIC_URL + project.cover_img} alt={project.name}/>
        </a>
        <div className="project__details">
            {/* <div className="stacks">
                {project.stack.map(e => (<span className="stack">{e}</span>))}
            </div> */}
            <h1>{project.name}</h1>
            <p>{project.short_description}</p>
            <div className="links">
                <a onClick={() => trackProjectInteraction(project.name, GA_TRACK_PROJECT_LINK_CLICK)} className="accent--text link" rel="noreferrer" target="_blank" href={project.demo_url}>Live Demo</a>
                <a onClick={() => trackProjectInteraction(project.name, GA_TRACK_PROJECT_LINK_CLICK)} className="accent--text link" rel="noreferrer" target="_blank" href={project.git_url}>Github</a>
                <a onClick={() => trackProjectInteraction(project.name, GA_TRACK_PROJECT_LINK_CLICK)} className="accent--text link" rel="noreferrer" target="_blank" href={project.demo_video}>Video Demo</a>
            </div>
        </div>
    </div>
}

export default Projects
