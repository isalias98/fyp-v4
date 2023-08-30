import React from 'react'
import Post from './Post'

const PostList = async ({ posts }) => {

    return (
        <div className="container px-5 py-8 mx-auto">
            <div className='flex flex-wrap m-4'>

                {
                    posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default PostList