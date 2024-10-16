import React, { useEffect, useState } from 'react';
import { RiMenuLine, RiCloseLine } from 'react-icons/ri';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const navLinks = document.getElementById('nav-links');
        if (isMenuOpen) {
            navLinks.classList.add('open');
        } else {
            navLinks.classList.remove('open');
        }
    }, [isMenuOpen]);

    return (
        <header className="naver" >
            <nav>
                <ul className={`nav__links ${isMenuOpen ? 'open' : ''}`} id="nav-links">
                    <li><a href="#home">HOME</a></li>
                    <li><a href="#about">ABOUT US</a></li>
                    <li><a href="#service">SERVICES</a></li>
                    <li className="nav__logo">
                        <a href="#">
                            <img src="https://ik.imagekit.io/apm2002/Photos/logo-brown.png?updatedAt=1723875061250" alt="logo" />
                        </a>
                    </li>
                    <li><a href="#Gallery">GALLERY</a></li>
                    <li><a href="#blog">BLOG</a></li>
                    <li><a href="#contact">CONTACT US</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
