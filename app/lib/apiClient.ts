const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

class ApiClient {
    private baseurl: string;
    constructor(){
        this.baseurl = API_BASE_URL;
    }

    async request(endpoint: string, options: RequestInit = {}){
        const url = `${this.baseurl}${endpoint}`
        const config: RequestInit = {
            headers: {
                "Content-type": "application/json",
                ...options.headers,
            },
            credentials: "include",
            ...options,
        }
        const response = await fetch(url,config);

        if(response.status === 401){
            return null;
        }
        if(!response.ok){   
            try {
                const error = await response.json().catch(()=> ({error: "Network Error"}));
            }catch (err) {
                console.error("ApiClient.ts Error: ", err);
                const message =
                typeof err === "object" && err !== null && "error" in err ? String((err as { error: unknown }).error): "Request failed!";
                throw new Error(message);
            }
        }
    }
    //Auth methods
    async register(userData: unknown){
        return this.request("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
        })
    }
    async login(email: string, password: string){
        return this.request("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({email,password})
        })
    }
    async logout(){
        return this.request("/api/auth/logout", {
            method: "POST",
        })
    }
    async getCurrentUser(){
        return this.request("/api/auth/me")
    }
    //User methods
    async getUsers(){
        return this.request("/api/user")
    }
    //Admin methods
    async updateUserRole(userId:string , role:string){
        return this.request(`/api/user/${userId}/role`,{
            method: "PATCH",
            body: JSON.stringify({role})
        });
    }
    async assignUserToTeam(userId:string , teamId:string){
        return this.request(`/api/user/${userId}/team`,{
            method: "PATCH",
            body: JSON.stringify({teamId})
        });
    }
}

export const apiClient = new ApiClient();