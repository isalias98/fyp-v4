"use client";
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';


export default function Home() {
	const { data: session } = useSession();
	return (
		<section className="body-font">
			<div className="container mx-auto flex px-5 lg:py-24 md:py-12 py-4 md:flex-row flex-col items-center">
				<div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
					<h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-white">WELCOME TO GIGGOOD
					</h1>

					<p className="mb-8 leading-relaxed">A place where freelancer can easily get their <span className='font-bold'>
						GIGS</span>  easily and a place where to easily list job that is needed to be done</p>
					<div className="flex justify-center">
						{
							!session ? (
								<Link className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" href="/register">Get Started Today!</Link>
							)
								: (
									<Link className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg" href="/jobLists">Explore Jobs</Link>
								)
						}
					</div>
				</div>
				<div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-20">
					<img className="object-cover object-center rounded" alt="hero" src="/collab.png" />
				</div>
			</div>
		</section>

	);
}
