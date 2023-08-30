"use client"

import { useState } from 'react'
import Modal from './Modal';
import axios from 'axios'
import { useRouter } from 'next/navigation';


const AddPost = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false)
    const [inputs, setInputs] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/posts', inputs).then((res) => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setInputs({})
            setModalOpen(false)
            router.refresh();
        })
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(prevState => ({ ...prevState, [name]: value }))
    }

    return (
        <div className='btn mt-4'>
            <button onClick={() => setModalOpen(true)} >Add new Post</button>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <form className='w-full' onSubmit={handleSubmit}>
                    <h1 className='text-2xl pb-3'>Add New Post</h1>
                    <input type="text" placeholder='Title' name='title' value={inputs.title || ""} onChange={handleChange} className='mb-2 w-full p-2 text-black' />
                    <input type="text" placeholder='Description' name='description' value={inputs.description || ""} onChange={handleChange} className='w-full p-2 text-black' />
                    <select
                        value={inputs.category}
                        onChange={(e) => setInputs({ ...inputs, category: e.target.value })}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option className="disabled selected">Job Category</option>
                        <option>Entertainment</option>
                        <option>Education</option>
                        <option>Maintenance</option>
                        <option>Agriculture</option>
                    </select>
                    <button type='submit' className='bg-blue-700 text-white px-5 py-2'>Submit</button>
                </form>
            </Modal>
        </div>
    )
}

export default AddPost