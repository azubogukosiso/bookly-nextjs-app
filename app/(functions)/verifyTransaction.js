import toast from 'react-hot-toast';

// VERIFY TRXN FUNCTION
export const verifyTransaction = async (reference) => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/order/post/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference })
        }, { cache: "no-store" });

        const { verification_data } = await res.json();
        console.log("here is the json: ", verification_data);

        if (verification_data) return "Your order has been placed and verified successfully";
    } catch (error) {
        // toast.error("Couldn't place the order. Please try again.", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        console.log("this is the error: ", error);
        return "Couldn't place the order. Please try again";
    }
};