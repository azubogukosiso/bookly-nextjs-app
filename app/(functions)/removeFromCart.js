import toast from 'react-hot-toast';

export const removeFromCart = (book, bookCartRef, dispatch) => {
    if (bookCartRef.current) bookCartRef.current.focus();
    dispatch({ type: 'REMOVE_FROM_CART', payload: book });
    toast.error("Removed from cart!", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
};