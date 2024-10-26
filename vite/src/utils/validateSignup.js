export const validateSignUp = async (user, email, password, confirm) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).+$/;

    if (!user || !email || !password || !confirm) {
        return {
            valid: false,
            message: "Please complete all fields"
        };
    }
    if (!emailRegex.test(email)) {
        return {
            valid: false,
            message: "Please provide a valid email"
        };
    }
    if (!passRegex.test(password)) {
        return { valid: false,
            message: "Password requirements not met"
        };
    }
    if (password.length < 6 || password.length > 15) {
        return { valid: false,
            message: "Password length must be between 6 and 15 characters"
        };
    }
    if (password !== confirm) {
        return {
            valid: false,
            message: "Passwords do not match"
        };
    }
    return {
        valid: true,
        message: ""
    };
};