exports.handler = async (event, context) => {
    const AUTH = process.env.ADMIN_AUTH_CREDENTIALS;

    const { password } = JSON.parse(event.body || "{}");

    if (password === AUTH) {
        return {
            statusCode: 200,
            body: JSON.stringify({ token: "granted" })
        };
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ error: "Unauthorized" })
    };
};
