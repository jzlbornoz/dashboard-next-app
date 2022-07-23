import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (endpoint) => {
    const [data, setData] = useState([]);

    async function fetchData(params) {
        const response = await axios.get(endpoint);
        setData(response.data);
    }

    useEffect(() => {
        try {
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }, []);

    return data;
};

export default useFetch;
