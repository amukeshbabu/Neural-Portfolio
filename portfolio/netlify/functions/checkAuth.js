exports.handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: false, error: "No input received" })
            };
        }

        const { password } = JSON.parse(event.body);
        const correctPassword = process.env.ADMIN_AUTH_CREDENTIALS;

        if (password === correctPassword) {
            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: true })
            };
        }

        return {
            statusCode: 401,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: false })
        };

    } catch (err) {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ success: false, error: "Server error" })
        };
    }
};
