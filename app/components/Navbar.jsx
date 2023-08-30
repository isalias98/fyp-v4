'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { BiLogIn } from 'react-icons/bi';

const Navbar = () => {
	const { data: session } = useSession();
	return (
		<div>

			<div className="navbar bg-base-100 shadow-lg z-10 fixed shadow-base-200 hidden md:flex lg:flex">
				<div className="flex-1">
					<Link href={"/"}>
						<Image src="/logo-no-bg.svg" width={150} height={150} alt="logo"></Image>
					</Link>
				</div>
				<div className="flex-none gap-2">
					{!session ? (
						<Link href="/login" className="btn">
							Login
						</Link>
					) : (
						<div className="dropdown dropdown-end mr-4">
							<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
								<div className="w-10 rounded-full bg-slate-400">
									<Image width={50} height={50} alt="avatar" src="/profile.pic.png" />
								</div>
							</label>
							<ul
								tabIndex={0}
								className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<Link href={"/profile"}>
										Profile
									</Link>
								</li>
								{
									session?.user?.role === "lister" ? (
										<li>
											<Link href={"/posts"}>
												My Postings
											</Link>
										</li>
									) : ""
								}

								<li>
									<a onClick={() => signOut()}>Logout</a>
								</li>
							</ul>
						</div>
					)}
				</div>
			</div>
			<div className="btm-nav md:hidden fixed lg:hidden justify-center outline outline-2 outline-blue-700">
				<Link href={"/"}>
					<Image src={"/logo.png"} width={50} height={50} alt="logo" />
				</Link>
				{!session ? (
					<Link href="/login" className="text-4xl">
						<BiLogIn />
					</Link>
				) : (
					<div className="dropdown dropdown-top dropdown-left">
						<label tabIndex={0} className="btn btn-ghost mt-2 ml-8 btn-circle avatar">
							<div className="rounded-full bg-slate-400">
								<Image width={50} height={50} alt="avatar" src="/profile.pic.png" />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="z-[1] shadow menu menu-sm dropdown-content bg-blue-800 rounded-lg"
						>
							<li>
								<Link href={"/profile"}>
									Profile
								</Link>
							</li>
							{
								session?.user?.role === "lister" ? (
									<li>
										<Link href={"/posts"}>
											Dashboard
										</Link>
									</li>
								) : ""
							}

							<li>
								<a onClick={() => signOut()}>Logout</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>

	);
};

export default Navbar;
