import axios from "axios";
const API_URL = "http://localhost:8000";//  if deployed on a cloud server use: const API_URL = "https://your-backend.com"; (backend's live domain)

export const getStudents = async () => {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
};