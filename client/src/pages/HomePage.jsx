import React from 'react';
import Navbar from '../components/Navbar';
import homePage_Image from '../images/homePageBackground.jpg';  // Ensure correct file path
// import favicon from ""

function HomePage() {
    return (
        <>
            {/* Navbar at the Top */}
            <div style={{ position: 'relative', zIndex: 10, width: '100%'}}>
                <Navbar title1='SmartSpend' Background="#64605cff"/>
            </div>
            
            {/* Full-Screen Background */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '60px' // Adjust based on Navbar height
            }}>
                {/* Background Image */}
                <img 
                    src={homePage_Image} 
                    alt="Background" 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -1 // Keeps the image behind everything
                    }} 
                />

                {/* Centered Content */}
                <div style={{
                    position: 'relative',
                    color: 'white',
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                    fontSize: '2rem',
                    textAlign: 'center'
                }}>
                    <h1>Hello This is HomePage</h1>
                </div>
            </div>
        </>
    );
}

export default HomePage;
