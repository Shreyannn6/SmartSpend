import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import homePage_image from "../../images/homePage_Image.jpg";
import Signin from "../../components/Signin";
import Signup from "../../components/Signup";

function Login_Register() {
    const location = useLocation(); //returns current URL path  
    const [isRegister, setIsRegister] = useState(false); //initial state of isRegister is false which means initially it is not in "/register" path

    useEffect(() => { //Runs everytime the location.pathname changes
        setIsRegister(location.pathname === "/register"); //setIsRegister checks if location.pathname and passes True or False accordingly,
    }, [location.pathname]);

    return (
        <>
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
                    src={homePage_image} 
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
                    {isRegister ? <Signup /> : <Signin />} {/*If setIsRegister updates seRegister value to True, "Signup" is called otherwise "Signin" is called*/}
                </div>
            </div>
        </>
    );
}

export default Login_Register;
