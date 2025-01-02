import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_ATLAS_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        hashedPassword: {
            type: String,
            default: null
        },
        isGoogleAccount: {
            type: Boolean,
            default: false
        },
        shippingAddress: {
            type: String,
            default: null
        },
        role: {
            type: String,
            default: "customer"
        },
        orders: {
            type: Array,
            default: []
        },
        favBooks: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;