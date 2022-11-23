const getAuthToken = req => {
    try {
        const token = req?.headers?.authorization?.split(" ")[1];
        return token;
    } catch (err) {
        return err.message;
    }
}
module.exports = getAuthToken;
