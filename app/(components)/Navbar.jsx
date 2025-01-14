"use client"

import ShoppingCart from "@/app/(components)/ShoppingCart";
import UserProfile from "@/app/(components)/UserProfile";
import Link from "next/link";

const Navbar = ({ session }) => {
	return (
		<nav className="navbar p-5 rounded-md bg-blue-600 text-white z-40 font-[family-name:var(--font-inter)]">
			{/* ################## MENU FOR MOBILES ################## */}
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-5 h-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16" />
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 p-2 shadow-lg text-black h-96 overflow-y-scroll overflow-x-hidden flex-nowrap">
						{
							session?.user.role === "admin" ?
								<>
									<li><Link href="/admin/customers" className="py-3">All Customers</Link></li>
									<li><Link href="/admin/orders" className="py-3">All Orders</Link></li>
									<li><Link href="/books" className="py-3">All Books</Link></li>
								</>
								:
								<>
									<li><Link href="/books?type=recent" className="py-3">Recent Additions</Link></li>
									<li><Link href="/books?type=most-purchased" className="py-3">Most Purchased</Link></li>
								</>
						}
						<li>
							<Link href="#" className="py-3">Categories</Link>
							<ul className="p-2 text-black">
								<li><Link className="py-3" href="/books?category=adventure">Adventure</Link></li>
								<li><Link className="py-3" href="/books?category=humour">Humour</Link></li>
								<li><Link className="py-3" href="/books?category=romance">Romance</Link></li>
								<li><Link className="py-3" href="/books?category=horror">Horror</Link></li>
								<li><Link className="py-3" href="/books?category=mystery">Mystery</Link></li>
								<li><Link className="py-3" href="/books?category=biography">Biography</Link></li>
								<li><Link className="py-3" href="/books?category=autobiography">Autobiography</Link></li>
								<li><Link className="py-3" href="/books?category=motivational">Motivational</Link></li>
							</ul>
						</li>
						{
							session ?
								session?.user.role === "customer" &&
								<>
									<li><Link className="py-3" href="/books/favourites">Your Favourites</Link></li>
									<li><Link className="py-3" href="/orders">Your Orders</Link></li>
								</>
								:
								<>
									<li><Link className="py-3" href="/signin">Sign In</Link></li>
									<li><Link className="py-3 text-white bg-blue-600" href="/signup">Sign Up</Link></li>
								</>
						}
					</ul>
				</div>
				{/* ################## LOGO ################## */}
				<Link href={session?.user.role === "admin" ? "/admin" : "/"} className="btn btn-ghost text-xl font-[family-name:var(--font-pacifico)]">Bookly</Link>
			</div>

			{/* ################## MENU FOR DESKTOPS ################## */}
			<div className="hidden navbar-center lg:flex">
				<ul className="items-center px-1 menu menu-horizontal">
					{
						session?.user.role === "admin" ?
							<>
								<li><Link href="/admin/customers">All Customers</Link></li>
								<li><Link href="/admin/orders">All Orders</Link></li>
								<li><Link href="/books">All Books</Link></li>
							</>
							:
							<>
								<li><Link href="/books?type=recent">Recent Additions</Link></li>
								<li><Link href="/books?type=most-purchased">Most Purchased</Link></li>
							</>
					}
					<li>
						<details>
							<summary>Categories</summary>
							<ul className="p-2 text-black w-[200px]">
								<li><Link href="/books?category=adventure">Adventure</Link></li>
								<li><Link href="/books?category=humour">Humour</Link></li>
								<li><Link href="/books?category=romance">Romance</Link></li>
								<li><Link href="/books?category=horror">Horror</Link></li>
								<li><Link href="/books?category=mystery">Mystery</Link></li>
								<li><Link href="/books?category=biography">Biography</Link></li>
								<li><Link href="/books?category=autobiography">Autobiography</Link></li>
								<li><Link href="/books?category=motivational">Motivational</Link></li>
							</ul>
						</details>
					</li>
					{
						session ?
							session?.user.role === "customer" &&
							<>
								<li><Link className="py-3" href="/books/favourites">Your Favourites</Link></li>
								<li><Link className="py-3" href="/orders">Your Orders</Link></li>
							</>
							:
							<>
								<li><Link className="py-3" href="/signin">Sign In</Link></li>
								<li><Link className="py-3 text-blue-600 bg-white" href="/signup">Sign Up</Link></li>
							</>
					}
				</ul>
			</div>
			{
				session ?
					// ################## NAVBAR END ITEMS ##################
					<div className="bg-white gap-4 navbar-end">
						<ShoppingCart session={session} />

						{/* ################## USER PROFILE ################## */}
						<UserProfile session={session} />
					</div>
					:
					<div className="navbar-end"></div>
			}
		</nav>
	)
}

export default Navbar