import axios from 'axios';

// get workshop by id
export const getWorkshopById = async (accessToken, workshopId) => {
    try {
        const response = await axios.get(`/routes/workshops/getWorkshop/${workshopId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return {data: response.data, error: null};
    } catch (error) {
        return {data: null, error};
    }
}
