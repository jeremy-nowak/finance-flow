import React from 'react';
import ButtonAdd from './ButtonAdd';


const Footer = () => {
    return (
        <footer className='lg:hidden sticky bottom-0 h-[10%]'>
            <div className="flex justify-evenly bg-opacity-25 bg-white p-3">
                <button><img src='/home.svg' alt="home" /></button>
                <ButtonAdd/>
                <button><img src='transfert.svg' alt="transfert" /></button>
            </div>
        </footer>
    );
};

export default Footer;
