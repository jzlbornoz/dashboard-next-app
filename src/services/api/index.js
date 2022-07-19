const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const endPoints = {
    auth: {
        login: `${API}/api/${VERSION}/auth/login`,
        profile: `${API}/api/${VERSION}/auth/profile`,
    },
    products: {
        getProduct: (id) => `${API}/api/{VERSION/products/${id}/`,
        getProducts: (limit, offset) => `${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
        addProducts: `${API}/api/${VERSION}/products`,
        updateProducts: (id) => `${API}/api/${VERSION}/products/${id}/`,
        deleteProducts: (id) => `${API}/api/${VERSION}/products/${id}/`,
    },
    users: {
        getUsers: `${API}/api/${VERSION}/users?limit=10`,
        getUserAvailable: `${API}/api/${VERSION}/users/is-available`
    },
    files: {
        addImage: `${API}/api/${VERSION}/files/upload`
    }
}
export default endPoints;