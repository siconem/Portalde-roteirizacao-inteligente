import axios from "axios"

const api = axios.create({
    baseURL: 'https://mydatamap.com.br',  //'http://localhost:8080'   https://mydatamap.com.br
    withCredentials: true
}) 

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status
        const code = error?.response?.data?.error
        if(status === 401 && (code === "credenciais-inválidas")) {
            localStorage.removeItem("MF_USER_TOKEN")
            localStorage.removeItem("MF_USER_NOME")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default api  
