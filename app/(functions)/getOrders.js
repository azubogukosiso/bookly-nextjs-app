export const getOrders = async () => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/order/get`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        console.log("Couldn't get the profiles: ", error);
    }
}