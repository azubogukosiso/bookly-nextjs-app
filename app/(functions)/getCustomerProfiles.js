export const getCustomerProfiles = async () => {
    try {
        const res = await fetch(`${process.env.URL_ORIGIN}/api/user/get`, { cache: "no-store" });
        return res.json();
    } catch (error) {
        console.log("Couldn't get the profiles: ", error);
    }
}