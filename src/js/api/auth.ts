import fetcher from "../util/APIUtil";

export interface LoggedUser {
    id: number;
    name: string;
    avatar: string;
}

export interface Unit {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    tokenType: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    name: string;
}

export interface PasswordUpdateRequest {
    oldPassword: string;
    newPassword: string;
}

export const login = async (request: LoginRequest): Promise<LoginResponse> => fetcher.post("/auth/login", request);

export const verify = async (id: string): Promise<void> => fetcher.get("/auth/verify", {id});

export const signup = async (request: SignUpRequest): Promise<void> => fetcher.post("/auth/signup", request);

export const updatePassword = async (request: PasswordUpdateRequest): Promise<void> =>
    fetcher.post("/auth/updatePassword", request)