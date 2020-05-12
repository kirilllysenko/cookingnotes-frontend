import fetcher from "../util/APIUtil";
import {LoggedUser} from "./auth";

export interface ProfileResponse {
    id: string;
    name: string;
    avatar: string | null;
    cover: string | null;
    about: string | null;
    country: string | null;
    city: string | null;
    blogLink: string | null;
    twitterLink: string | null;
    instagramLink: string | null;
    facebookLink: string | null;
}

export const getProfile = async (id: number | string): Promise<ProfileResponse> => fetcher.get(`/user/${id}/common`);

export const editProfile = async (id: number | string, form: Omit<ProfileResponse, "id">): Promise<void> =>
    fetcher.put(`/user/${id}`, form);

export const me = async (): Promise<LoggedUser> => fetcher.get("/user/me");

export const deleteAccount = (id: number | string) => fetcher.delete(`/user/${id}`);

export const isLocal = (id: number | string): Promise<boolean> => fetcher.get(`/user/${id}/local`);
