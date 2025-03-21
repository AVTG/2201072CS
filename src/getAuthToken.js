import axios from "axios" ;

const AUTH_URL = "http://20.244.56.144/test/auth";

const AUTH_PAYLOAD = {
    companyName: "goMart",
    clientID: "db6f8e6b-d832-4853-b724-d1ae0c7b16ef",
    clientSecret: "jwZFtnHKVquYZxTt",
    ownerName: "Anubhav Vijayvargeeya",
    ownerEmail: "anubhav.2201072cs@iiitbh.ac.in",
    rollNo: "2201072CS"
};

let accessToken = null;
let tokenExpiresAt = 0;

 async function fetchAuthToken() {
    try {
        const response = await axios.post(AUTH_URL, AUTH_PAYLOAD);
        accessToken = response.data.access_token;
        tokenExpiresAt = Date.now() + response.data.expires_in * 1000; 
        return accessToken;
    } catch (error) {
        console.error("Failed to fetch token:", error.message);
        throw new Error("Authentication Failed");
    }
}

export default async function getAuthToken() {
    if (!accessToken || Date.now() >= tokenExpiresAt) {
        return await fetchAuthToken();
    }
    return accessToken;
}

