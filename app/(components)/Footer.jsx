const Footer = () => {
    return (
        <footer className="footer p-10 rounded-md bg-blue-600 font-[family-name:var(--font-inter)] text-white">
            <aside>
                <h1 className="font-[family-name:var(--font-pacifico)]">Bookly</h1>
                <p className="mt-5">Your trusted collection of Best Sellers</p>
            </aside>
            <nav>
                <h6 className="footer-title">Menu</h6>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Trending</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Recent Additions</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Most Purchased</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Genres</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">About us</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Contact</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Site Map</a>
            </nav>
            <nav>
                <h6 className="footer-title">Social Media</h6>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Facebook</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Instagram</a>
                <a className="link no-underline hover:bg-black/10 px-4 py-2 rounded-lg transition-all">Threads</a>
            </nav>
        </footer>
    )
}

export default Footer