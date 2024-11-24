import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const orderSchema = new Schema(
    {
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        quantity: Number,
        isConfirmed: {
            type: Boolean,
            default: false,
        },
        inTransit: {
            type: Boolean,
            default: false,
        },
        isDelivered: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;