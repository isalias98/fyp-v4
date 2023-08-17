"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const Profile = () => {
    const route = useRouter()
    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            route.push('/')
        }
    }
    )

    return (
        <div class="p-4 lg:pt-20 md:pt-20">
            <div class="mb-4 text-center opacity-90">
                <a href="#" class="relative block">
                    <img alt="profil" src="/profile.pic.png" class="mx-auto object-cover rounded-full h-40 w-40 bg-gray-500 " />
                </a>
            </div>
            <div class="text-center flex-col justify-center">
                <h1 class="text-4xl font-bold">
                    {session?.user?.name}
                </h1>
                <h1 class="text-2xl font-light text-gray-500 dark:text-gray-200">
                    I am a {session?.user?.role}
                </h1>
            </div>
        </div>

    )
}

export default Profile