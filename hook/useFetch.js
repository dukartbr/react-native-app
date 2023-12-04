import { useState, useEffect } from "react";
import axios from "axios";


export default function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: { ...query },
        headers: {
            'X-RapidAPI-Key': '6568ee9edbmsh0644457251a6d43p19b1bbjsncf1c083cc72d',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    async function fetchData() {
        setIsLoading(true)

        try {
            const res = await axios.request(options)
            setData(res.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert("There was an error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    function refetch() {
        setIsLoading(true);
        fetchData()
    }

    return {
        data,
        isLoading,
        error,
        refetch
    }

}
