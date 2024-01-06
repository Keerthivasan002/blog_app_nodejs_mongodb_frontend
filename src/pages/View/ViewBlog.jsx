import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { errorMessage, successMessage } from '../../toast/toast';
import axios from "axios"
import Navbar from '../../components/Navbar';
import image from "../../6589a7040d97674d36683be3.jpg"
import "./view.css"

const ViewBlog = () => {

    const [blog, setBlog] = useState(null)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])


    const location = useLocation();
    const blogData = location.state.blogData;
    const navigate = useNavigate()

    const handleView = async () => {
        try {
            const token = localStorage.getItem("token")
            const blogId = { id: blogData }
            const response = await axios.post("http://localhost:5000/getone", blogId, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = JSON.parse(response.data.response)
            console.log(data);
            setBlog(data)
            setComments(data.comments)
        } catch (error) {
            errorMessage(error.message)
        }
    }

    const addComment = async () => {
        try {
            const token = localStorage.getItem("token")
            const commentInfo = { id: blog._id, comment: comment }
            const response = await axios.post("http://localhost:5000/addComment", commentInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })
            if (response.data.status === 1) {
                handleView();
                successMessage(response.data.response)

                return
            }
            errorMessage(response.data.response)
        } catch (error) {
            errorMessage(error.message)
        }
    }


    const handleDelete = async (id, blogId) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.delete("http://localhost:5000/deleteComment",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    data:
                        { id: id, blogId: blogId }
                })
            if (response.data.status === 1) {
                handleView();
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

    useEffect(() => {
        handleView();
    }, [])

    return (
        <div className='viewMain'>
            <Navbar />
            <section className='viewSub'>
                <img src={image} alt="img" srcset="" className='img' />
                <div className='viewContent'>
                    <h6>Posted By {blog?.username.toUpperCase()} on {blog?.createdAt.split("T")[0]} </h6>
                    <h1>{blog?.title}</h1>
                    <p className='viewPara'>{blog?.description}</p>
                </div>
            </section>
            <section className='commentSub'>
                <div className='addComment'>
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder='Add comments' />
                    <button onClick={addComment}>Add</button>
                </div>
                <div className='ViewComment'>
                    <h3>Total Comments (50)</h3>
                    <div className='comment'>
                        {comments.map((cmnt) => (
                            <div className='commentInfo'>
                                <div className='avatar'>
                                    <h3>R</h3>
                                </div>
                                <div className='content'>
                                    <p>{cmnt?.comment}</p>
                                    <div className='info'>
                                        <h6>Posted on {cmnt?.postedAt.split("T")[0]}</h6>
                                        <button className='commentDlt' onClick={() => handleDelete(cmnt._id, blog._id)}>delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ViewBlog