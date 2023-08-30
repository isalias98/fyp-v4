import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async (request, {params}) => {
    try {

        const {id} = params;

        const user = await prisma.user.findUnique({
            where:{
                id
            }
        });

        if(!user) {
            return NextResponse.json(
                {message: "Post not found", error},
                {status:404}
                )
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({message: "GET Error lmao", error}, {status: 500})
    }
}