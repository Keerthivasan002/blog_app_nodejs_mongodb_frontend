import React, { useState } from 'react'
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { errorMessage, successMessage } from '../../toast/toast'


const Login = () => {
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userInfo = { password: password, email: email }
            const response = await axios.post("http://localhost:5000/login", userInfo)
            if (response.data.status === 1) {
                localStorage.setItem("token", response.data.accessToken)
                localStorage.setItem("username", response.data.username)
                navigate("/home")
                successMessage(response.data.response)

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
                <div className='head'>Login Now</div>
                <div className='inputs'>
                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type='submit' className='regiButton' onClick={handleSubmit}>Login</button>
                <p>New to blogs? <Link className='link' to="/register">Register Now</Link></p>

            </section>
            <ToastContainer />
        </div>
    )
}

export default Login