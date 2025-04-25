const axios = require ('axios')

const apiClient =axios.create({
    baseURL: process.env.BASE_URL,
    timeout : 5000,
    headers: {
        "Content-Type" : "application/json"
    },
});

module.exports = apiClient;
