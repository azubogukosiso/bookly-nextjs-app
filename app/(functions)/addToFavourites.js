import toast from 'react-hot-toast';

// ADD TO FAVOURITES FUNCTION
export const addToFavourites = async (book, user_id, setIsLoadingAddToFavourites) => {
    setIsLoadingAddToFavourites(true);

    try {
        const res = await fetch("/api/book/post/favourites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ book, user_id })
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            setIsLoadingAddToFavourites(false);
            toast.success(json.data, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

    } catch (error) {
        toast.error("Couldn't add the book to favourites", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
};