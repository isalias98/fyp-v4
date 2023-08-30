import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import myUser from '@/app/actions/getUser';

export const POST = async (request) => {
    const currentUser = await myUser();
    try {
        const body = await request.json();
        const {title, description, category, userId} = body;

        if(!title && !description && !userId){
            return NextResponse.json({error: "Invalid Data"}, {status:422});
        }
        const user = await prisma.user.findFirst({where: {id:userId}})
        if (!user) {
            return NextResponse.json({error: "Invalid User"}, {status:500});
        }

        const newPost = await prisma.post.create({
            data: {
                title,
                description,
                category,
                author:currentUser.name ,
                userId:currentUser.id
            }
        })
        return NextResponse.json(newPost);
    } catch (error) {
        return NextResponse.json({message: "POST Error lmao", error}, {status: 500})
    }
}
export const GET = async () => {
    try {
        const posts = await prisma.post.findMany()
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({message: "GET Error lmao", error}, {status: 500})
    }
}