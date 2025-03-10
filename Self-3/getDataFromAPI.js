async function getDataFromAPI() {
    const url = 'https://dummyjson.com/recipes';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}


module.exports.getDataFromAPI = getDataFromAPI;