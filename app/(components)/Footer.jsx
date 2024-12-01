import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer p-10 rounded-md bg-blue-600 font-[family-name:var(--font-inter)] text-white">
            <aside>
                <h1 className="font-[family-name:var(--font-pacifico)]">Bookly</h1>
                <p className="mt-5">Your trusted collection of Best Sellers</p>
            </aside>
            <nav>
                <h6 className="footer-title">Menu</h6>
                <Link href="/books" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">All Books</Link>
                <Link href="/books?type=recent" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Recent Additions</Link>
                <Link href="/books?type=most-purchased" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Most Purchased</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">About us</Link>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Contact</Link>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Site Map</Link>
            </nav>
            <nav>
                <h6 className="footer-title">Social Media</h6>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Facebook</Link>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Instagram</Link>
                <Link href="#" className="px-4 py-2 no-underline transition-all rounded-lg link hover:bg-black/10">Threads</Link>
            </nav>
        </footer>
    )
}

export default Footer