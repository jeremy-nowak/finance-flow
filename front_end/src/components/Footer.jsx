import React from 'react';
import ButtonAdd from './ButtonAdd';
import FormScreen from '../screens/FormScreen';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const Footer = () => {
    const { user, displayForm } = useContext(UserContext);

    return (
        
        <footer className='lg:hidden sticky bottom-0 h-[10%]'>
            {displayForm && <FormScreen />}
            <div className="flex justify-evenly  bg-[#181E5A] py-5">
                <button><img src='/home.svg' alt="home" /></button>
                <ButtonAdd/>
                <button><img src='transfert.svg' alt="transfert" /></button>
            </div>
        </footer>
    );
};

export default Footer;
