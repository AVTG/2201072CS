import getAuthToken from "./getAuthToken.js";
import axios from "axios"

const API_ENDPOINTS = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand"
};

export default async function fetchNumbers(numberId) {
    try {
        const token = await getAuthToken();
        const response = await axios.get(API_ENDPOINTS[numberId], {
            timeout: 500,
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.numbers || [];
    } catch (error) {
        console.error("Error fetching numbers:", error.message);
        return [];
    }
}

