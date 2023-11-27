import axios from "axios";

export const register = (data: { name: string, email: string, password: string }) => {
    return axios.post(`/register`, data);
}

export const login = (data: { email: string, password: string }) => {
    return axios.post(`/login`, data);
}

export const logout = () => {
    return axios.post(`/logout`);
}

export const fetchArticles = (params?: {
    page: number,
    per_page: number,
    q: string,
    from: Date|string,
    to: Date|string,
    category_id: number|string,
    source_id: number|string,
    author_id: number|string
}) => {
    const searchParams = new URLSearchParams(params as never);
    return axios.get(`/articles?${searchParams.toString()}`);
}

export const fetchArticle = (id: number) => {
    return axios.get(`/articles/${id}`);
}

export const fetchMyFeed = (params: { page: number, per_page: number }) => {
    const searchParams = new URLSearchParams(params as never);
    return axios.get(`/feed?${searchParams.toString()}`);
}

export const fetchSources = () => {
    return axios.get(`/sources`);
}

export const fetchAuthors = () => {
    return axios.get(`/authors`);
}

export const fetchCategories = () => {
    return axios.get(`/categories`);
}

export const favorite = (params: { related_id: number, related_type: string }) => {
    return axios.post(`/favorites`, params);
}
