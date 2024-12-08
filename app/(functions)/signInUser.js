import { signIn } from 'next-auth/react';

export const signInUser = async (e, signInDetails) => {

    e.preventDefault();

    signInDetails.setIsLoading(true);

    signInDetails.setEmailErrMsg('');
    signInDetails.setPasswordErrMsg('');

    const res = await signIn('credentials', { ...signInDetails.data, redirect: false });
    if (res?.error) {
        signInDetails.setIsLoading(false);
        const errorRes = await JSON.parse(res.error);
        if (errorRes.email) signInDetails.setEmailErrMsg(errorRes.email);
        if (errorRes.password) signInDetails.setPasswordErrMsg(errorRes.password);
    } else if (res?.ok) {
        if (signInDetails.data.isCustomer) {
            window.location.href = "/";
        } else {
            window.location.href = "/admin";
        }
        signInDetails.setIsLoading(false);
    }
}