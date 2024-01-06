import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { errorMessage, successMessage } from '../../toast/toast'
import axios from "axios"
import { RiH1 } from 'react-icons/ri'
import "./profile.css"
import UpdateBlog from '../Update/UpdateBlog'
import { useNavigate } from "react-router-dom"
import image from "../../6589a7040d97674d36683be3.jpg"


const Profile = () => {
    const [blogs, setBlogs] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [updateCard, setUpdateCard] = useState(null)

    const navigate = useNavigate()
    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:5000/getMyblogs", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = JSON.parse(response.data.response)
            setBlogs(data)
        } catch (error) {
            errorMessage(error.message)
        }

    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete("http://localhost:5000/delete",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    data:
                        { id: id }
                })
            if (response.data.status === 1) {
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

    const handleUpdate = (blog) => {
        navigate("/updateBlog", { state: { blogData: blog } });
    }

    useEffect(() => {
        fetchPosts()
    }, [blogs])

    return (
        <div className='mainProf'>
            <Navbar />
            <section className='myProf'>
                <h1>My Blog Insights </h1>
            </section>
            <section className='myContent'>
                {blogs === [] ? (<h1>No Blogs found</h1>) : (
                    blogs?.map((blog, i) => (
                        <div className='blog'>
                            <img src={image} alt="img" className='img' />
                            <section className='cnt'>
                                <h2 className='title'>{blog?.title}</h2>
                                <p className='desc'>{blog?.description}</p>
                                <div className='buttons'>
                                    <button className='updateButton' onClick={() => { handleUpdate(blog) }}>Update</button>
                                    <button className='deleteButton' onClick={() => { handleDelete(blog._id) }}>Delete</button>
                                </div>
                            </section>

                        </div>
                    ))
                )
                }
            </section>
        </div>
    )
}

export default Profile