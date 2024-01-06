import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { errorMessage, successMessage } from '../../toast/toast'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { useLocation } from 'react-router-dom';


const UpdateBlog = (props) => {
    const location = useLocation();
    const blogData = location.state.blogData;
    console.log(blogData);

    const [title, setTitle] = useState(blogData.title)
    const [description, setDescription] = useState(blogData.description)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userInfo = { id: blogData._id, title: title, description: description }
            console.log(userInfo);
            const token = localStorage.getItem("token")
            const response = await axios.post("http://localhost:5000/update", userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }
            )
            if (response.data.status === 1) {
                successMessage(response.data.response)
                navigate("/profile")
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
            <Navbar />
            <section className='sub'>
                <div className='head'>Update Blog</div>
                <div className='inputs'>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <textarea cols="30" rows="10" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </div>
                <button type='submit' className='regiButton' onClick={handleSubmit}>Update Blog</button>
            </section>
        </div>
    )
}

export default UpdateBlog