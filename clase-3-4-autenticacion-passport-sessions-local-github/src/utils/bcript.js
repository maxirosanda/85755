import bcrypt from "bcrypt";

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const isValidPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};