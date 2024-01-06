import React, { useState } from 'react'
import axios from "axios"
import "./regi.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { errorMessage, successMessage } from '../../toast/toast'
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userInfo = { username: username, password: password, email: email }
            const response = await axios.post("http://localhost:5000/register", userInfo)
            if (response.data.status === 1) {
                successMessage(response.data.response)
                navigate("/")
                return
            }
            errorMessage(response.data.response)

            return
        } catch (error) {
            errorMessage(error.message)

            return
        }

    }
    return (
        <div className='main'>
            <section className='sub'>
                <div className='head'>Register Here</div>
                <div className='inputs'>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button className='regiButton' type='submit' onClick={handleSubmit}>Register</button>
                <p>Already have an account? <Link className='link' to="/">Login Now</Link></p>

            </section>
            <ToastContainer />
        </div>
    )
}

export default Register