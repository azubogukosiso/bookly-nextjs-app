import toast from 'react-hot-toast';

// ADD TO CART FUNCTION
export const addToCart = (book, booksInCart, dispatch) => {
    let bookAlreadyInCart = false;

    if (booksInCart.length >= 1) {
        for (let i = 0; i < booksInCart.length; i++) {
            if (booksInCart[i]._id === book._id) {
                bookAlreadyInCart = true;
                toast.success("Already in cart!", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px' }, className: "font-[family-name:var(--font-inter)]" });
                break;
            }
        }
    }

    if (!bookAlreadyInCart) {
        book.qty = 1;
        dispatch({ type: 'ADD_TO_CART', payload: book });
        toast.success("Added to cart!", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px' }, className: "font-[family-name:var(--font-inter)]" });
    }
};