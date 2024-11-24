import toast from 'react-hot-toast';

// REMOVE FROM FAVOURITES FUNCTION
export const removeFromFavourites = async (book, user_id, setIsLoadingRemoveFromFavourites) => {
    setIsLoadingRemoveFromFavourites(true);

    try {
        const res = await fetch("/api/book/put/favourites", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ book, user_id })
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            setIsLoadingRemoveFromFavourites(false);
            toast.success(json.data, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        } else {
            setIsLoadingRemoveFromFavourites(false);
            toast.error("Couldn't remove the book to favourites ", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

    } catch (error) {
        setIsLoadingRemoveFromFavourites(false);
        toast.error("Couldn't remove the book to favourites ", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
};