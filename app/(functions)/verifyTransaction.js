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

        console.log("here it is: ", await res.json());

        if (res.ok) return { isVerified: true, message: "Your order has been placed and verified successfully" };
    } catch (error) {
        return { isVerified: false, message: "Couldn't place the order. Please try again" };
    }
};