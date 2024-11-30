import toast from 'react-hot-toast';

// PLACE ORDER FUNCTION
export const placeOrder = async (orderDetails) => {
    console.log(orderDetails);

    if (!shippingAddress.orderDetails) {

    }

    // try {
    //     const res = await fetch("/api/order/post", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(orderDetails)
    //     }, { cache: "no-store" });

    //     const { transaction_data } = await res.json();

    //     window.location.href = transaction_data.data.authorization_url;
    // } catch (error) {
    //     toast.error("Couldn't place the order. Please try again.", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    // }
};