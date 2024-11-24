export const checkPwdStrength = (password) => {
  if (password.length < 6) {
    return "Your password is too short. It must be up to 6 characters.";
  }

  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return "Your password must have a number.";
  }

  const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?\/]/.test(password);
  if (!hasSpecialChar) {
    return "Your password must have a special character.";
  }


  return true;
};
