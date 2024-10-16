import axios from 'axios';
import { useEffect, useState } from 'react';

import generateInputData from './helpers/generate_input_data';
import { NeighborhoodType } from './neighborhood';

/**
 * This function takes data generated by `generateInputData` and sends it to the backend for processing.
 * Then, it outputs the processed results together with a loading indicator.
 * isLoading must be true the whole time until the data is returned from the backend.
 */
function useData(): { neighborhoods: NeighborhoodType[], isLoading: boolean } {
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // The function should send the generated data to the backend in a POST request
    // with inputData passed as `matrix` parameter in JSON payload.

    useEffect(() => {
        const inputData = generateInputData();

        const fetchNeighborhoods = async () => {
            const { data } = await axios.post('http://localhost:5001/',
                { matrix: inputData },
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            setNeighborhoods(data);
            setIsLoading(false);
        };

        fetchNeighborhoods();
    }, [setNeighborhoods]);

    return { neighborhoods, isLoading };
}

export default useData;