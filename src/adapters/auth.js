import axios from "axios";

export default async function Login(address, setConnecting, setError) {

    try {
        const response = await axios.post(`//${address}/auth/connect`, {});
        console.log(response.data);
        sessionStorage.setItem("apiAddress", address);
        setConnecting(false);
        return true;
    } catch (error) {
        console.log(error);
        if (error.response.data) {
            setError(error.response.data);
        } else {
            setError(error.message);
        }
        setConnecting(false);
        return false;
    }
}