'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Login = () => {
	const session = useSession();
	const router = useRouter();
	const [data, setData] = useState({ email: '', password: '' });
	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/')
		}
	})
	const loginUser = async (e) => {
		e.preventDefault();
		signIn('credentials', {
			...data,
			redirect: false
		}).then((callback) => {
			if (callback?.error) {
				toast.error(callback.error)
			}
			if (callback?.ok && !callback?.error) {
				toast.success('Logged in Successfully')
			}
		});
	};
	return (
		<div className="container px-5 py-24 mx-auto flex justify-center items-center">
			<div className=" bg-base-200 rounded-lg p-8 flex flex-col lg:mt-10 md:mt-10 mt-0 relative z-10 shadow-md">
				<h2 className=" text-xl mb-1 font-medium title-font">Sign In</h2>
				<div className="relative mb-4">
					<label for="email" className="leading-7 text-sm text-gray-600">Email</label>
					<input
						type="text"
						placeholder="email"
						value={data.email}
						onChange={(e) => setData({ ...data, email: e.target.value })}
						className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
				</div>
				<div className="relative mb-4">
					<label for="email" className="leading-7 text-sm text-gray-600">Password</label>
					<input
						type="password"
						placeholder="password"
						value={data.password}
						onChange={(e) => setData({ ...data, password: e.target.value })}
						className="w-full rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
				</div>
				<button onClick={loginUser} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Log In</button>
				<div classNameName="">
					<label className="label">
						<a href="/register" className="label-text-alt link link-hover">
							Don&apos;t have an account yet? Sign up now!
						</a>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Login;
