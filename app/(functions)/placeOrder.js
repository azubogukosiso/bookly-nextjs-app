import toast from 'react-hot-toast';

// PLACE ORDER FUNCTION
export const placeOrder = async (orderDetails) => {

    orderDetails.setIsLoadingOrder(true);

    if (orderDetails.shippingAddress === "" || !orderDetails.shippingAddress) {
        orderDetails.setIsLoadingOrder(false);
        toast.error("Please provide a shipping address before placing an order", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        return;
    }

    try {
        const res = await fetch("/api/order/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderDetails)
        }, { cache: "no-store" });

        const { transaction_data } = await res.json();

        window.location.href = transaction_data.data.authorization_url;

        localStorage.removeItem("bookly-cart");

    } catch (error) {
        orderDetails.setIsLoadingOrder(false);
        toast.error("Couldn't place the order. Please try again", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
};