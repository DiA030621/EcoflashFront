import React, {useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtnLink
} from './NavbarElements';
import { AiFillHome } from "react-icons/ai";
import { HiOutlineUsers } from "react-icons/hi";
import { FaRegTrashCan } from "react-icons/fa6";



const Navbar = (props) => {
    const [isopen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsOpen(!isopen);
    };

    const logOut = () => {
      props.onLogout();
    };

    return (
      <Nav>
        <NavLink to='/home'>
          <img src={require('../../ecoflash_logo.jpg')} style={{ width: '85px', height: 'auto' }} alt='Logo' />
        </NavLink>
        <Bars onClick={toggleMenu} />
        <NavMenu isopen={isopen}>
          <NavLink to='/home'><AiFillHome /> Home
          </NavLink>
          <NavLink to='/paradas'><FaRegTrashCan /> Contenedores
          </NavLink>
          <NavLink to='/usuario'><HiOutlineUsers /> Usuario
          </NavLink>
          <NavBtnLink onClick={logOut}>Cerrar sesión</NavBtnLink>
        </NavMenu>
      </Nav>
    );
  };

export default Navbar;