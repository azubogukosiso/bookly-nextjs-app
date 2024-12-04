import toast from 'react-hot-toast';

export const orderInTransit = async (orderId) => {
    console.log("the order id: ", orderId);

    try {
        const res = await fetch(`/api/order/patch?orderId=${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inTransit: true })
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            console.log("Here is the response: ", json);
            toast.success(json.data, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

        // REFRESH PAGE TO DISPLAY UPDATED ORDER DETAILS
        window.location.reload();
    } catch (error) {
        toast.error("Couldn't mark the order as in transit. Please check your internet connection and try again", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
}