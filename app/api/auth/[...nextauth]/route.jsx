import NextAuth from 'next-auth/next';
import prisma from '../../../libs/prismadb';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'Gay Smith' },
				password: { label: 'Password', type: 'password' },
				username: { label: 'Username', type: 'text', placeholder: 'Gay Smither' },
				role: { label: 'Role', type: 'options', placeholder: 'Does this work' },
				categories: { label: 'categories', type: 'options', placeholder: 'Does this work' }
			},
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					throw new Error('Please enter an email and password');
				}
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})
				if (!user || !user?.hashedPassword) {
					throw new Error('User not found')
				}
				const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
				if (!passwordMatch) {
					throw new Error('Incorrect Password')
				}
				return user;
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.role = user.role
			if (user) token.category = user.category
			if (user) token.phoneNumber = user.phoneNumber
			return token
		},
		async session({ session, token }) {
			if (session?.user) session.user.role = token.role
			if (session?.user) session.user.category = token.category
			if (session?.user) session.user.phoneNumber = token.phoneNumber
			return session
		}
	},
	secret: process.env.SECRET,
	session: {
		strategy: 'jwt'
	},
	debug: process.env.NODE_ENV === 'development'
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
