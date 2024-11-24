import toast from 'react-hot-toast';

// PLACE ORDER FUNCTION
export const placeOrder = async (email, amount, firstName, lastName) => {
    console.log("here are the params: ", email, amount);

    try {
        const res = await fetch("/api/order/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, amount })
        }, { cache: "no-store" });

        const { transaction_data } = await res.json();

        window.location.href = transaction_data.data.authorization_url;
    } catch (error) {
        toast.error("Couldn't place the order. Please try again.", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
};