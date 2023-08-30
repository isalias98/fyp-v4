import prisma from '@/app/libs/prismadb'
import myUser from './getUser'


export default async function getCurrUsersPosts() {
    const user = await myUser();

    const posts = await prisma.post.findMany({
        where: {
            userId:user?.id
        },
        orderBy: {
            createdAt:'desc'
        }
    });


    const safeCourse = posts.map((post) => ({
        ...post,
        createdAt:post.createdAt.toDateString()
    }))

    return safeCourse

}