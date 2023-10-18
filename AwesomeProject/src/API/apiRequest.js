import axios from "axios";

const baseUrl = "http://localhost:4000";

export const createStudent = async (user) => {
    try {
        await axios.post(`${baseUrl}/add `, user);
        console.log('User created successfully');
    } catch (error) {
        console.log(error)
    }
}
