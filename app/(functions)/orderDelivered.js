import toast from 'react-hot-toast';

export const orderDelivered = async (orderId, setIsProcessing) => {

    setIsProcessing(true);

    try {
        const res = await fetch(`/api/order/patch?orderId=${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDelivered: true })
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            setIsProcessing(false);
            toast.success(json.data, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }

        // REFRESH PAGE TO DISPLAY UPDATED ORDER DETAILS
        window.location.reload();
    } catch (error) {
        setIsProcessing(false);
        toast.error("Couldn't mark the order as delivered. Please check your internet connection and try again", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
}