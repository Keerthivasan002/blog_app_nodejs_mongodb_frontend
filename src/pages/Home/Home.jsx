import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { errorMessage } from '../../toast/toast';
import "./home.css"
import Navbar from '../../components/Navbar';
import { useNavigate } from "react-router-dom"
import image from "../../6589a7040d97674d36683be3.jpg"

const Home = () => {

    const [blogs, setBlogs] = useState([])


    const navigate = useNavigate()

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get("http://localhost:5000/getblogs", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.status === 1) {
                const data = JSON.parse(response.data.response)
                setBlogs(data)

                return
            }
            errorMessage(response.data.response)
        } catch (error) {
            errorMessage(error.message)
        }

    };


    const handleView = async (blogId) => {
        navigate("/viewBlog", { state: { blogData: blogId } })
    }

    useEffect(() => {
        fetchPosts()
    }, [blogs])


    return (
        <div className='mainHome'>
            <Navbar />
            <section className='homeContent'>
                {blogs?.map((blog, i) => (
                    <div className='blog'>
                        <img src={image} alt="img" className='img' />
                        <section className='cnt'>
                            <h2 className='title'>{blog?.title}</h2>
                            <p className='desc'>{blog?.description}</p>
                            <button className='viewButton' onClick={() => handleView(blog._id)}>View Full Blog</button>
                        </section>
                    </div>
                ))}

            </section>
        </div>
    )
}

export default Home