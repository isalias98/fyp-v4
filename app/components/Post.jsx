
const Post = ({ post }) => {
    return (
        <div key={post.id} className="p-4 lg:w-1/3 ">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-black mb-1">{post.category}</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{post.title}</h1>
                <p className="leading-relaxed mb-3 text-gray-900">{post.description}</p>
                <p className="leading-relaxed mb-3 text-gray-900">{post.author}</p>
            </div>
        </div>
    )
}

export default Post