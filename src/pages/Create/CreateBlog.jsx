import React, { useState } from 'react'
import axios from "axios"
import { errorMessage, successMessage } from '../../toast/toast'
import { useNavigate } from "react-router-dom"
import Navbar from '../../components/Navbar';


const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()


    const convertToBase = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result);
            const extension = e.target.files[0].name.split(".")[1]
            const imageData = { data: reader.result, extension: extension }
            setImage(imageData)
        }
        reader.onerror = error => {
            console.log('error', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const userInfo = { title: title, description: description, image: image }
            const token = localStorage.getItem("token")
            const response = await axios.post("http://localhost:5000/create", userInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.status === 1) {
                successMessage(response.data.response)
                navigate("/Home")
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
            <Navbar/>
            <section className='sub'>
                <div className='head'>Post New Blog</div>
                <div className='inputs'>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                    <textarea  cols="30" rows="10"  placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                    <input type="file" onChange={convertToBase} />
                </div>
                <button type='submit' className='regiButton' onClick={handleSubmit}>Create Blog</button>
            </section>
        </div>
    )
}

export default CreateBlog