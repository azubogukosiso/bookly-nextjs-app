"use client";

import Placeholder from "@/public/images/placeholder.png";
import Image from "next/image";
import { useCartContext } from "@/app/hooks/useCartContext";
import { useState } from "react";
import { addToCart } from '@/app/(functions)/addToCart';
import { addToFavourites } from "@/app/(functions)/addToFavourites";
import { deleteBook } from "@/app/(functions)/deleteBook";
import Link from "next/link";
import getSymbolFromCurrency from 'currency-symbol-map';

const BookDetailDisplay = ({ book, session }) => {
    const [isLoadingAddToFavourites, setIsLoadingAddToFavourites] = useState(false);
    const [isLoadingDeleteBook, setIsLoadingDeleteBook] = useState(false);

    const { booksInCart, dispatch } = useCartContext();

    const isDetailsDisplayPage = true;

    return (
        <div className="min-h-screen hero mt-14 lg:mt-0">
            <div className="flex-col w-full hero-content lg:flex-row">
                <div className="text-center lg:text-left lg:w-[50%] lg:ml-5">
                    <h1 className="text-3xl font-bold">{book.title} - <i className="font-normal">by {book.author}</i> </h1>
                    <h3>{getSymbolFromCurrency("NGN")}{book.price}</h3>
                    <p className="my-4">
                        {!book.description ?
                            "--"
                            : book.description}
                    </p>
                    <span className="inline-block px-3 py-1 mb-5 text-white bg-blue-600 rounded-full">{book.category}</span>
                    {
                        session ?
                            session.user.role === "customer" ?
                                <div className="flex flex-col lg:flex-row">
                                    <button className="inline-flex items-center justify-center p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95" onClick={() => addToCart(book, booksInCart, dispatch)}>
                                        Add to Cart
                                        <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z" /></svg>
                                    </button>
                                    <button disabled={isLoadingAddToFavourites} className={`inline-flex items-center justify-center mt-3 lg:mt-0 lg:ml-3 p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95  ${isLoadingAddToFavourites && "opacity-75 cursor-not-allowed"}`} onClick={() => addToFavourites(book, session.user.id, setIsLoadingAddToFavourites)}>
                                        {
                                            isLoadingAddToFavourites ?
                                                <>
                                                    <svg aria-hidden="true" className="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    Adding to Favourites...
                                                </>
                                                :
                                                <>
                                                    Add to Favourites
                                                    <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2674L8.70231 13.5717L7.75383 18.3451L12.0006 15.968Z" /></svg>
                                                </>
                                        }
                                    </button>
                                </div>
                                :
                                <div className="flex flex-col lg:flex-row">
                                    <Link href={`/admin/edit?id=${book._id}`} className="inline-flex items-center justify-center p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95">
                                        Edit Book
                                        <svg viewBox="0 0 24 24" width="23" height="23" fill="currentColor" className="ml-2" xmlns="http://www.w3.org/2000/svg"><path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z" /></svg>
                                    </Link>
                                    <button disabled={isLoadingDeleteBook} className={`inline-flex items-center justify-center mt-3 lg:mt-0 lg:ml-3 p-3 text-white transition-all bg-blue-600 rounded-lg active:scale-95  ${isLoadingDeleteBook && "opacity-75 cursor-not-allowed"}`} onClick={() => deleteBook(book._id, setIsLoadingDeleteBook, isDetailsDisplayPage)}>
                                        {
                                            isLoadingDeleteBook ?
                                                <>
                                                    <svg aria-hidden="true" className="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    Deleting Book...
                                                </>
                                                :
                                                <>Delete Book
                                                    <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM13.4142 13.9997L15.182 15.7675L13.7678 17.1817L12 15.4139L10.2322 17.1817L8.81802 15.7675L10.5858 13.9997L8.81802 12.232L10.2322 10.8178L12 12.5855L13.7678 10.8178L15.182 12.232L13.4142 13.9997ZM9 4V6H15V4H9Z" /></svg>
                                                </>
                                        }
                                    </button>
                                </div>
                            :
                            <p>
                                <Link href="/signin" className="underline underline-offset-2">Sign in</Link> for more features 😉
                            </p>
                    }
                </div>
                <div className="w-full lg:w-[30%] h-[50vh] p-1 border-2 border-gray-300 rounded-xl">
                    <figure className="relative w-full h-full overflow-hidden rounded-lg">
                        <Image src={!book.image ? Placeholder : book.image} alt="" className="object-cover w-full border" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" loading="lazy" />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export default BookDetailDisplay;