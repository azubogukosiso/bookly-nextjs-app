import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const bookSchema = new Schema(
    {
        title: String,
        author: String,
        price: Number,
        category: String,
        description: String,
        pruchaseCount: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: null
        },
        reviews: {
            type: Array,
            default: null
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
export default Book;