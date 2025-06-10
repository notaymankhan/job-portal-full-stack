


const validApiKeys = ['SKOObgO5kkRR25WiwmAZIq06VuCGIYzS', 'gTyNKzVSoJhriDYGv9MVpBHIlGQMUhyZ']; // Replace with your actual keys

export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Expecting API key in the `x-api-key` header

    if (!apiKey || !validApiKeys.includes(apiKey)) {
        return res.status(403).json({ success: false, message: 'Forbidden: Invalid API Key' });
    }

    next(); // API key is valid, proceed to the next middleware or route handler
};


