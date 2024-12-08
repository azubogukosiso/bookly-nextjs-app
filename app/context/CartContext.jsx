"use client";

import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

export const cartReducer = (state, action) => {
    switch (action.type) {
        case 'CREATE_CART':
            return { booksInCart: action.payload };
        case 'ADD_TO_CART':
            const booksInCart = [...state.booksInCart, action.payload];

            localStorage.setItem("bookly-cart", JSON.stringify(booksInCart));

            return {
                booksInCart
            };
        case 'REMOVE_FROM_CART':
            const updatedBooksInCart = state.booksInCart.filter(book => book._id !== action.payload._id);

            localStorage.setItem("bookly-cart", JSON.stringify(updatedBooksInCart));

            return {
                booksInCart: updatedBooksInCart
            };
        case 'INCREASE_QTY':
            const booksInCartInc = state.booksInCart.map(book => {
                if (book._id === action.payload._id) {
                    return { ...book, qty: book.qty + 1 }
                }
                return book;
            });

            localStorage.setItem("bookly-cart", JSON.stringify(booksInCartInc));

            return {
                booksInCart: booksInCartInc
            };
        case 'DECREASE_QTY':
            const booksInCartDec = state.booksInCart.map(book => {
                if (book._id === action.payload._id && book.qty !== 1) {
                    return { ...book, qty: book.qty - 1 }
                }
                return book;
            });

            localStorage.setItem("bookly-cart", JSON.stringify(booksInCartDec));

            return {
                booksInCart: booksInCartDec
            };
        default:
            return state;
    };
};

export const CartContextProvider = ({ children, session }) => {
    const [state, dispatch] = useReducer(cartReducer, {
        booksInCart: []
    });

    useEffect(() => {
        if (!session) {
            localStorage.removeItem("bookly-cart");
        } else {
            const booksInCartLocalStorage = JSON.parse(localStorage.getItem('bookly-cart'));

            if (booksInCartLocalStorage) {
                dispatch({ type: 'CREATE_CART', payload: booksInCartLocalStorage });
            } else {
                localStorage.setItem("bookly-cart", JSON.stringify([]));
            }
        }

    }, [session]);

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
