'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
    const {data:session} = useSession();
    const route = useRouter();

    if(session?.user?.role !== "lister") {
        route.push("/denied")
    }

	return <div><h1>
        Dashboard</h1>
        <h1>{session?.user?.name}</h1>
        <h1>{session?.user?.role}</h1>
        <h1>{session?.user?.email}</h1>
        <button onClick={() => signOut()}>Sign Out</button></div>;
};

export default Dashboard;
