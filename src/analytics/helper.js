import ReactGA from 'react-ga'

export const trackProjectInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Projects',
        action: name + " " + action,
        value: 5,
    })
}

export const trackEventInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Events',
        action: name + " " + action,
        value: 3
    })
}

export const trackOrgInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Organization',
        action: name + " " + action,
        value: 3
    })
}

export const trackExpInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Experience',
        action: name + " " + action,
        value: 3
    })
}

export const trackSocialSiteInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Social',
        action: name + " " + action,
        value: 2
    })
}

export const trackResumeInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Resume',
        action: name + " " + action,
        value: 6
    })
}

export const trackNavigationInteraction = (name, action) => {
    ReactGA.event({
        label: name,
        category: 'Navigation',
        action: name + " " + action,
        value: 6
    })
}