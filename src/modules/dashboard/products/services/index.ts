const {VITE_API_URL} = import.meta.env

export const getProducts = async () => {
    const response = await fetch(`${VITE_API_URL}/products`);
    return await response.json();
}