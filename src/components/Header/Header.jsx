import React, { useEffect, useState } from 'react'
import { trackNavigationInteraction } from '../../analytics/helper'
import { GA_TRACK_NAVIGATION_CLICK, SET_CURRENT_TAB, SET_THEME } from '../../state/actions'
import { useStateValue } from '../../state/AppDataProvider'
import { TABS } from '../../state/reducer'
import './Header.css'
// import { BrightnessHigh, BrightnessLow } from '@mui/icons-material'

function Header() {
    const [{ currentTab, nightMode }, dispatcher] = useStateValue()
    const [didScroll, setDidScroll] = useState(false)
    const tabKeys = Object.keys(TABS)

    useEffect(() => {
        window.addEventListener('scroll', e => {
            if (window.pageYOffset >= 100) {
                setDidScroll(true)
            } else {
                setDidScroll(false)
            }
        })
    }, [])

    const updateTab = tab => {
        trackNavigationInteraction(tab, GA_TRACK_NAVIGATION_CLICK)
        dispatcher({
            type: SET_CURRENT_TAB,
            payload: tab
        })
    }

    const updateTheme = () => {
        dispatcher({
            type: SET_THEME
        })
    }

    return (
        <section className={`header ${didScroll ? 'shadow' : ''} ${nightMode ? 'night' : 'light'}`}>
            <div className="header__logo">
                {/* <div className="themecontrol" onClick={updateTheme} style={{ cursor: 'pointer' }} >
                    {nightMode ? <BrightnessLow /> : <BrightnessHigh />}
                </div> */}
                <span><span className="accent--text">Jaime</span> Bisuña</span>
            </div>
            <div className="header__links">
                {tabKeys.map(tab => (<a key={tab} onClick={() => updateTab(tab)} href={`#${TABS[tab].toLowerCase()}`} className={`${currentTab === TABS[tab] ? 'active' : ''}`}>{TABS[tab]}</a>))}
            </div>
        </section>
    )
}

export default Header
