import type { AxiosResponse } from "axios"
import axiosInstance from "../axiosInstance"
import type { GiphyResponse } from "./types/giphyTypes"

const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export const getGifsList = (query?: string, offset: number | string = 0): Promise<AxiosResponse<GiphyResponse>> => {
    if (query) {
        return axiosInstance.get(`/gifs/search?api_key=${apiKey}&q=${query}&limit=25&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`)
    }

    return axiosInstance.get(`/gifs/trending?api_key=${apiKey}&limit=25&offset=${offset}&rating=g&bundle=messaging_non_clips`)
}