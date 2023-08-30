
async function getUser(id) {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("failed to fetch data")
    }
    return res.json();
}

const page = async ({ params }) => {
    const id = params.id
    const user = await getUser(id);



    return (
        <div className='h-screen flex flex-col justify-center items-center '>
            <h1>User's Name: {user.name}</h1>
            <h1>User's Email : {user.email}</h1>
            <h1>User's Role : {user.role}</h1>
            <h1>User's Category : {user.category}</h1>
            <h1>User's Phone number : {user.phoneNumber} </h1>

        </div>

    )
}

export default page