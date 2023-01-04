import { useState } from "react";

const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const getRequest = (url, method="GET", body, headers) => {
        const response = fetch(url, )
    }
}