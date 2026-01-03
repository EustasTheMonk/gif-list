import type { AxiosResponse } from "axios"
import axiosInstance from "../axiosInstance"
import type { SingleGiphyResponse } from "./types/giphyTypes"

const apiKey = import.meta.env.VITE_GIPHY_API_KEY

export const getGifById = async (id: string): Promise<AxiosResponse<SingleGiphyResponse>> => {
    return await axiosInstance.get(`/gifs/${id}?api_key=${apiKey}&rating=g`)
}