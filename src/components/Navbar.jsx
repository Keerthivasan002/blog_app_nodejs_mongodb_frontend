import React from 'react'
import "./nav.css"
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from 'react-router-dom';
import { errorMessage, successMessage } from '../toast/toast';
const Navbar = () => {

    const username = localStorage.getItem('username')

    const handleLogout = async (e)=>{
        try {
            localStorage.removeItem("token")
            await successMessage("Logged out successfully")

            return
        } catch (error) {
            await errorMessage(error.message)
        }
    }

    return (
        <div className='mainNav'>
            <section className='subNav'>
                <Link to="/home"><h1>Poshika's Blog Site</h1></Link>
                <div className='navs'>
                    <NavLink to="/createBlog"><p className='avatar'>Create New  Blog</p></NavLink>
                    <NavLink to="/profile"><p className='avatar'>My Account</p></NavLink>
                    <NavLink to="/"><RiLogoutCircleRLine className='logout' onClick={handleLogout} /></NavLink>
                </div>
            </section>
        </div>
    )
}

export default Navbar