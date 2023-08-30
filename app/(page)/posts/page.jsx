import React from 'react'
import AddPost from '@/app/components/AddPost'
import myUser from '@/app/actions/getUser'
import getCurrUsersPosts from '@/app/actions/getCurrUsersPosts'
import PostEdDe from '@/app/components/PostEdDe'
const PostList = async () => {
    const currentUser = await myUser();
    const posts = await getCurrUsersPosts();
    return (
        <div className="container px-5 pt-20 mx-auto">
            <h1>Your Job Posts </h1>
            <AddPost />
            <div className='flex flex-wrap m-4'>

                {
                    posts.map((post) => (
                        <PostEdDe key={post.id} currentUser={currentUser} post={post} />
                    ))
                }
            </div>
        </div>
    )
}

export default PostList