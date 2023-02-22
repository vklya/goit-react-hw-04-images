import axios from "axios";

const instance = axios.create({
    baseURL: 'https://pixabay.com/api',
    params: {
        key: '32131047-140602d0b818ac999ff04a7d8',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
    }
})

export const fetchImages = async (q, page = 1) => {
    const { data } = await instance.get("/", {
        params: {
            q,
            page,
        }
    });
    
    return data;
}