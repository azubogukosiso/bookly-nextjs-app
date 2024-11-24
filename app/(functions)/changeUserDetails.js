import toast from 'react-hot-toast';

export const changeUserDetails = async (e, userDetail, detailType, user_id, setLoadingState, userProfileRef, handleSessionEdit) => {
    e.preventDefault();

    setLoadingState(true);

    if (userProfileRef.current) userProfileRef.current.focus();

    if (!userDetail) {
        toast.error("Fill the required fields!", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        return;
    } else if (detailType === "password") {
        if (!userDetail.oldPassword || !userDetail.newPassword) {
            toast.error("Fill the required fields!", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
            return;
        }
    }

    const bodyContent = {
        [detailType]: userDetail,
        user_id
    };

    try {
        const res = await fetch("/api/user/put", {
            method: "PUT",
            body: JSON.stringify(bodyContent),
            "content-type": "application/json"
        }, { cache: "no-store" });

        const json = await res.json();

        if (res.ok) {
            setLoadingState(false);
            toast.success(json.message, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });

            handleSessionEdit();
        } else {
            setLoadingState(false);
            toast.error(json.message, { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
        }
    } catch (err) {
        toast.error("Error updating user details. Please try again", { duration: 5000, style: { background: '#2563eb', color: '#fff', padding: '20px', fontFamily: 'Inter' } });
    }
}
