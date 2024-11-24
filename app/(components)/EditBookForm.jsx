"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import toast from 'react-hot-toast';
import { blobToBase64 } from "@/app/(functions)/blobToBase64";

const EditBookForm = ({ book, session }) => {

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price);
  const [category, setCategory] = useState(book.category);
  const [description, setDescription] = useState(book.description);
  const [previewImg, setPreviewImg] = useState(book.image);
  const [imageFile, setImageFile] = useState(book.image);

  const inputRef = useRef();

  // DETECT IMAGE CHANGE AND DISPLAY IMAGE FOR PREVIEW
  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]))
      setImageFile(await blobToBase64(e.target.files[0]));
    } else {
      setPreviewImg("");
      setImageFile("");
    }
  }

  // SUBMIT UPDATED BOOK DETAILS FUNCTION
  const editBook = async (e) => {
    e.preventDefault();

    const bookData = {
      id: book._id, title, author, price, category, description, imageFile
    }

    try {
      const response = await fetch("/api/book/put/details", {
        method: "PUT",
        body: JSON.stringify({ bookData }),
      }, { cache: "no-store" });

      const json = await response.json();

      if (json) toast.success(json.message, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    } catch (error) {
      toast.error(error, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
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
      <h3 className="mt-10 mb-5">Edit a book</h3>

      <form onSubmit={editBook}>
        <div className="flex justify-between mb-10">
          <div className="w-[47%]">
            <label htmlFor="title">Title</label> <br />
            <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's title here" />
          </div>

          <div className="w-[47%]">
            <label htmlFor="author">Author</label> <br />
            <input type="text" name="author" id="author" value={author} onChange={e => setAuthor(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's author here" />
          </div>
        </div>

        <div className="flex justify-between mb-10">
          <div className="w-[47%]">
            <label htmlFor="price">Price</label> <br />
            <input name="price" type="text" id="price" value={price} onChange={e => setPrice(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's price here" />
          </div>

          <div className="w-[47%]">
            <label htmlFor="category">Category</label> <br />
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

        <div className="flex justify-between mb-10">
          <div className="w-[47%]">
            <label htmlFor="description">Description</label> <br />
            <textarea name="description" type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="border-2 border-gray-400 focus:!outline-none p-2 rounded-lg w-full" placeholder="Enter the book's description here" rows="10"></textarea>
          </div>

          <div className="w-[47%]">
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

        <button type="submit" className="w-full p-4 text-white transition-all bg-blue-600 btn active:scale-90">Edit Book</button>
      </form>
    </div>
  )
}

export default EditBookForm
