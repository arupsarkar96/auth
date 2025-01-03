
export interface User {
    id: number;
    display_name: string;
    username: string;
    password: string;
    phone: string;
    photo: string;  // Assuming photo can be null
    about: string;  // Assuming about can be null
    verified: boolean;
    visibility: boolean;
    is_private: boolean
}

export interface LoginResponse {
    status: number,
    data: LoginError | LoginSuccess
}

interface LoginSuccess {
    auth_code: string
}

interface LoginError {
    message: string,
    error: string
}