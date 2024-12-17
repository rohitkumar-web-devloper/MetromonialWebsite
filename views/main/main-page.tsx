import { Container } from '@/layouts'
import React from 'react'
import BannerImage from '../../assets/banner.jpg'

const MainPage = () => {
    return (
        <div>
            <div>
                {/* <Image src={BannerImage} alt="banner_image" /> */}
                <div style={{
                    width: "100%",
                    paddingBottom: "auto",
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <img
                        src={BannerImage.src}
                        alt="Event"
                        style={{
                            width: "100%",
                            height: "100vh",
                            objectFit: "cover",
                            position: "static",
                        }}
                    />
                </div>
            </div>
            <Container>
                asas
            </Container>
        </div>
    )
}

export { MainPage }
