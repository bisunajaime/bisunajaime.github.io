import React, { } from 'react'
import { useStateValue } from '../../state/AppDataProvider'
import { Swiper, SwiperSlide } from 'swiper/react'
import './Demo.css'
import 'swiper/swiper.min.css';


function Demo() {

    const [{ currentProject }, dispatcher] = useStateValue()

    if (currentProject === null) {
        return <div></div>
    }

    let {
        name,
        description,
        stack,
        is_desktop,
        color
    } = currentProject



    return (
        <section className="demo" id="demo">
            <div className="section__header">
                <small>DEMO</small>
                <h2>{name}</h2>
            </div>
            <Swiper
                className="demo__images"
                centeredSlides
                grabCursor
                zoom
                loop={true}
                keyboard={{ enabled: true }}
                autoHeight
                // lazy
                breakpoints={{
                    300: {
                        slidesPerColumn: 1,
                        spaceBetween: 10,
                    },
                    500: {
                        slidesPerView: is_desktop ? 1 : 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: is_desktop ? 1 : 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: is_desktop ? 2 : 4,
                        spaceBetween: 10,
                    },
                    1500: {
                        slidesPerView: is_desktop ? 2 : 5,
                        spaceBetween: 10
                    }
                }}
            >
                {currentProject.sample_ui.map(img =>
                    <SwiperSlide key={img} className="img"><img src={process.env.PUBLIC_URL + img} alt="img" /></SwiperSlide>
                )}
            </Swiper>
            <div className="demo__about hover--shadow-inverted" style={{ border: `1px solid ${color}`, boxShadow: `-8px 6px 0 ${color}` }}>
                <small>ABOUT THE PROJECT</small>
                <div className="line--small" style={{ background: color }}></div>
                <h1>{name}</h1>
                {/* stack */}
                <div className="stacks">
                    {stack.map(e => <span key={(name + "_" + e).toLowerCase()} style={{ color: color, border: `1px solid ${color}` }}>{e}</span>)}
                </div>
                <p>{description}</p>
                {/* link */}
            </div>
        </section>
    )
}

export default Demo
