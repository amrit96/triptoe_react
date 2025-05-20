import bcrypt from 'bcryptjs';

const getPasswordHash = async (password) => {
        const saltRounds = 10;
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
};

export {
    getPasswordHash
}