"use client"
import Modal from './Modal'
import { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PostEdDe = ({ post, user }) => {
    const router = useRouter()
    const [modalOpenEdit, setModalOpenEdit] = useState(false);
    const [modalOpenDelete, setModalOpenDelete] = useState(false)
    const [postToEdit, setPostToEdit] = useState(post);


    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/api/posts/${post.id}`, postToEdit).then((res) => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setModalOpenEdit(false)
            router.refresh();
        })

    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostToEdit(prevState => ({ ...prevState, [name]: value }))
    }

    const handleDeletePost = (id) => {
        axios.delete(`/api/posts/${id}`).then((res) => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setModalOpenEdit(false)
            router.refresh();
        })
    }

    return (
        <div key={post.id} className="p-4 lg:w-1/3 ">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1">{post.category}</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{post.title}</h1>
                <p className="leading-relaxed mb-3 text-gray-900">{post.description}</p>
                <p className="leading-relaxed mb-3 text-gray-900">{post.author}</p>
                <div className='text-center gap-2 mt-2 leading-none flex justify-end absolute bottom-0 left-0 w-full py-4"'>
                    <button className='btn btn-accent' onClick={() => setModalOpenEdit(true)}>Edit</button>
                    <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                        <form className='w-full' onSubmit={handleEditSubmit}>
                            <h1 className='text-2xl pb-3'>Edit Post</h1>
                            <input type="text" placeholder='Title' name='title' value={postToEdit.title || ""} onChange={handleChange} className='mb-2 w-full p-2 text-black' />
                            <input type="text" placeholder='Description' name='description' value={postToEdit.description || ""} onChange={handleChange} className='mb-2 w-full p-2 text-black' />
                            <button type='submit' className='btn btn-success'>Submit</button>
                        </form>
                    </Modal>
                    <button className='btn btn-error' onClick={() => setModalOpenDelete(true)}>Delete</button>
                    <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                        <h1>Are you sure you want to delete this?</h1>

                        <div className='flex gap-4 mt-4'>
                            <button className='btn btn-primary' onClick={() => handleDeletePost(post.id)}>YES</button>
                            <button className='btn btn-error' onClick={() => setModalOpenDelete(false)}>NO</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default PostEdDe