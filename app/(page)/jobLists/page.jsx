import PostList from "@/app/components/PostList";


async function getData() {
    const res = await fetch("http://localhost:3000/api/posts", { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json();
}
async function getUser() {
    const res = await fetch("http://localhost:3000/api/users", { cache: 'no-store' });

    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json();
}

const jobLists = async () => {
    const posts = await getData()
    const user = await getUser()

    return (
        <div className="pt-20 pl-4">
            <h1 className="text-4xl">Avaiable Jobs</h1>

            <PostList posts={posts} user={user} />
        </div>
    )
}

export default jobLists