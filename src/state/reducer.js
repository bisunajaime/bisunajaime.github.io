import { LOAD_MORE_PROJECTS, SET_CURRENT_TAB, SET_PROJECT_DEMO, SET_THEME, CLEAR_SELECTED_PROJECT, HIDE_OTHER_PROJECTS } from "./actions";
import data from '../data.json'

export const TABS = {
    ABOUT: "About",
    PROJECTS: "Projects",
    DEMO: "Demo",
    STACK: "Techstack",
    EXP: "Experience",
    EVENTS: "Events",
    ORGANIZATIONS: "Organizations"
}

export const initialState = {
    projectIndex: null,
    currentProject: null,
    nightMode: true,
    projectsList: data.projects.slice(0, 3),
    currentTab: TABS.ABOUT
}

export default (state, action) => {
    switch (action.type) {
        case CLEAR_SELECTED_PROJECT:
            return {
                ...state,
                currentProject: null,
                projectIndex: null
            }
        case SET_PROJECT_DEMO:
            return {
                ...state,
                projectIndex: action.payload.index,
                currentProject: data.projects[action.payload.index]
            }
        case SET_CURRENT_TAB:
            return {
                ...state,
                currentTab: TABS[action.payload]
            }
        case LOAD_MORE_PROJECTS:
            return {
                ...state,
                projectsList: state.projectsList.concat(data.projects.slice(3, data.projects.length))
            }
        case SET_THEME: 
            return {
                ...state,
                nightMode: !state.nightMode
            }
        case HIDE_OTHER_PROJECTS:
            return {
                ...state,
                projectsList: data.projects.slice(0,3)
            }
        default:
            return state
    }
}