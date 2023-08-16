import bcrypt from 'bcrypt';
import prisma from '../../libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const body = await request.json();
	const { name, email, password, role, categories } = body;

	if (!name || !email || !password || !role) {
		return new NextResponse('Missing Fields', { status: 400 });
	}

	const exist = await prisma.user.findUnique({
		where: {
			email
		}
	});

	if (exist) {
		throw new Error('Email already exist');
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword,
			role,
			categories
		}
	});
	return NextResponse.json(user);
}
