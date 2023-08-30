import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export const GET = async(req) => {
    try {
        const users = await prisma.user.findMany(
            {include:{post:true, _count:true} });
        return NextResponse.json({users}, {status:200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status:500})
    }
};