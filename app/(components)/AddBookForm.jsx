"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toast from 'react-hot-toast';

const AddBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [previewImg, setPreviewImg] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [isLoadingCreateBook, setIsLoadingCreateBook] = useState(false);

    const inputRef = useRef();

    // CONVERT TO BASE 64
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // DETECT IMAGE CHANGE AND DISPLAY IMAGE FOR PREVIEW
    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPreviewImg(URL.createObjectURL(e.target.files[0]))
            setImageFile(await convertBase64(e.target.files[0]));
        } else {
            setPreviewImg("");
            setImageFile("");
        }
    }


    // SUBMIT BOOK DETAILS FUNCTION
    const submitBook = async (e) => {

        e.preventDefault();

        setIsLoadingCreateBook(true);

        const bookData = {
            title, author, price, category, description, imageFile
        }

        try {
            const response = await fetch("/api/book/post/new", {
                method: "POST",
                body: JSON.stringify({ bookData }),
            }, { cache: "no-store" });

            const json = await response.json();

            console.log(response, json);

            if (json) {
                // toast.success(json.message, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });

                setIsLoadingCreateBook(false);

                // setTitle("");
                // setAuthor("");
                // setPrice("");
                // setCategory("");
                // setDescription("");
                // setPreviewImg("");
                // setImageFile("");
            }
        } catch (error) {
            // toast.error(error, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
            setIsLoadingCreateBook(false);
        }
    }

    useEffect(() => {
        return () => {
            // CLEANUP TO AVOID MEMORY LEAKS
            if (previewImg) {
                URL.revokeObjectURL(previewImg);
            }
        };
    }, [previewImg]);

    const handleClick = () => {
        inputRef.current.click();
    }

    return (
        <div className="mb-10">
            <h3 className="m-3">Add a new book</h3>

            <form onSubmit={submitBook}>
                <div className="flex flex-col justify-between mb-0 lg:flex-row lg:mb-10">
                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="title">Title</label> <br />
                        <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's title here" />
                    </div>

                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="author">Author</label> <br />
                        <input type="text" name="author" id="author" value={author} onChange={e => setAuthor(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's author here" />
                    </div>
                </div>

                <div className="flex flex-col justify-between mb-0 lg:flex-row lg:mb-10">
                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="price">Price</label> <br />
                        <input name="price" type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's price here" />
                    </div>

                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="category">Category</label> <br />
                        {/* <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's category here" /> */}
                        <select name='category' onChange={e => setCategory(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" value={category}>
                            <option value=''>Click to select a category</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Humour">Humour</option>
                            <option value="Romance">Romance</option>
                            <option value="Horror">Horror</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Biography">Biography</option>
                            <option value="Autobiography">Autobiography</option>
                            <option value="Motivational">Motivational</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col justify-between mb-0 lg:flex-row lg:mb-10">
                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="description">Description</label> <br />
                        <textarea name="description" type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's description here" rows="10"></textarea>
                    </div>

                    <div className="w-full lg:w-[47%] mb-5 lg:mb-0">
                        <label htmlFor="book-cover">Book Cover</label> <br />
                        <input name="book-cover" type="file" id="book-cover" className="hidden w-full border-2 border-gray-400 rounded-lg" ref={inputRef} multiple accept=".jpg, .jpeg, .png" onChange={handleImageChange} />
                        <div className="p-1 border-2 border-gray-400 cursor-pointer rounded-xl" onClick={handleClick}>
                            {
                                previewImg ?
                                    <figure className="relative h-[40vh] overflow-hidden">
                                        <Image alt="" src={previewImg} style={{ objectFit: "cover" }} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="rounded-lg" />
                                    </figure>
                                    :
                                    <span className="flex items-center justify-center transition-all rounded-lg hover:bg-gray-300 h-[40vh]">
                                        Click to select an image
                                        <svg viewBox="0 0 24 24" width="23" height="23" className="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" /></svg>
                                    </span>
                            }
                        </div>
                    </div>
                </div>

                <button type="submit" className={`rounded-lg w-full p-3 text-white transition-all bg-blue-600 active:scale-90 ${isLoadingCreateBook && "opacity-75 cursor-not-allowed"}`} disabled={isLoadingCreateBook}>{isLoadingCreateBook ?
                    <span className='flex items-center justify-center text-center'>
                        <svg aria-hidden="true" className="w-3 h-3 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        Creating Book...
                    </span> : "Create Book"}</button>
            </form>
        </div>
    )
}

export default AddBookForm
