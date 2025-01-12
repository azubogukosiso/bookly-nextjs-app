import toast from 'react-hot-toast';

export const confirmOrder = async (orderId) => {
    try {
        const res = await fetch(`/api/order/patch?orderId=${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isConfirmed: true })
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            toast.success(json.data, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

        // REFRESH PAGE TO DISPLAY UPDATED ORDER DETAILS
        window.location.reload();
    } catch (error) {
        toast.error("Couldn't confirm the order. Please check your internet connection and try again", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
}