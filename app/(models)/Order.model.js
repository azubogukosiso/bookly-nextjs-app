import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const orderSchema = new Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: String,
        totalAmount: Number,
        firstName: String,
        lastName: String,
        orderedBooks: {
            type: Array,
            default: null
        },
        dateOrdered: {
            type: Date,
            default: Date.now()
        },
        dateDelivered: {
            type: Date,
            default: null
        },
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