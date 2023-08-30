async function getData(id) {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`);
    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json();
}

const PostPage = async ({ params }) => {
    const id = params.id
    const post = await getData(id)
    return (
        <div className='h-screen flex justify-center items-center'>
            <h1>{id}</h1>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
        </div>
    )
}

export default PostPage