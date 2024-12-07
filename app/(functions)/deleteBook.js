import toast from 'react-hot-toast';

// DELETE A BOOK
export const deleteBook = async (bookId, setIsLoadingDeleteBook) => {
    console.log("Delete");
    setIsLoadingDeleteBook(true);

    try {
        const res = await fetch(`/api/book/delete?id=${bookId}`, {
            method: "DELETE",
        });

        const json = await res.json();

        if (res.ok) {
            setIsLoadingDeleteBook(false);
            toast.success(json.message, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

    } catch (error) {
        console.log(error);
    }
};