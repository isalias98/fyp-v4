'use client';

import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Register = () => {
	const router = useRouter()
	const [data, setData] = useState({ name: '', email: '', password: '', role: '', category: '', phoneNumber: '' });
	const signUp = async (e) => {
		e.preventDefault();
		axios
			.post('/api/register', data)
			.then(() => toast.success('User has been registered!'))
			.catch(() => toast.error('Something went Wrong'))
			.finally(router.push("/login"))
	};
	return (
		<div className="hero min-h-screen bg-base-200 pt-20">
			<div className="hero-content mx-auto">
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<h1 className="text-2xl font-bold mb-2">Sign Up</h1>
						<form onSubmit={signUp}>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Your Name</span>
								</label>
								<input
									type="text"
									placeholder="full name"
									value={data.name}
									onChange={(e) => setData({ ...data, name: e.target.value })}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">email</span>
								</label>
								<input
									type="email"
									placeholder="email"
									value={data.email}
									onChange={(e) => setData({ ...data, email: e.target.value })}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">phone number</span>
								</label>
								<input
									type="text"
									placeholder="your phone number"
									value={data.phoneNumber}
									onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text">Password</span>
								</label>
								<input
									type="password"
									placeholder="password"
									value={data.password}
									onChange={(e) => setData({ ...data, password: e.target.value })}
									className="input input-bordered"
								/>
								<div className="form-control">
									<label className="label">
										<span className="label-text">Are you:</span>
									</label>
									<label className="label cursor-pointer">
										<span className="label-text">Job Lister</span>
										<input
											type="radio"
											name="role"
											value="lister"
											onChange={(e) => setData({ ...data, role: e.target.value })}
											className="radio checked:bg-red-500"
											checked={data.role === 'lister'}
										/>
									</label>
								</div>
								<div className="form-control">
									<label className="label cursor-pointer">
										<span className="label-text">Freelancer</span>
										<input
											type="radio"
											name="role"
											value="freelancer"
											onChange={(e) => setData({ ...data, role: e.target.value })}
											className="radio checked:bg-blue-500"
											checked={data.role === 'freelancer'}
										/>
									</label>
									{data.role === 'freelancer' ? (
										<select
											value={data.category}
											onChange={(e) => setData({ ...data, category: e.target.value })}
											className="select select-primary w-full max-w-xs"
										>
											<option className="disabled selected">Your specialty</option>
											<option>Entertainment</option>
											<option>Education</option>
											<option>Maintenance</option>
											<option>Agriculture</option>
										</select>
									) : (
										''
									)}
								</div>
							</div>
							<div className="form-control mt-6">
								<button className="btn btn-primary">Sign me up !</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
