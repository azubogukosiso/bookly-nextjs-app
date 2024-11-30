export const getOrders = async (customerId) => {
    if (customerId) {
        try {
            const res = await fetch(`${process.env.URL_ORIGIN}/api/order/get/customer?id=${customerId}`, { cache: "no-store" });
            return res.json();
        } catch (error) {
            console.log("Couldn't get orders: ", error);
        }
    } else {
        try {
            const res = await fetch(`${process.env.URL_ORIGIN}/api/order/get`, { cache: "no-store" });
            return res.json();
        } catch (error) {
            console.log("Couldn't get the orders: ", error);
        }
    }
}