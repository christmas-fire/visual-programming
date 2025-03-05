const getDataFromAPI = require('./getDataFromAPI');

async function getStats() {
    try {
        const data = await getDataFromAPI.getDataFromAPI();
        const recipes = data.recipes || [];
        const stats = {};

        recipes.forEach(recipe => {
            const ingredients = recipe.ingredients || [];
            ingredients.forEach(ingredient => {
                if (stats[ingredient]) {
                    stats[ingredient]++;
                } else {
                    stats[ingredient] = 1;
                }
            });
        });

        return stats;
    } catch (error) {
        console.error('Error calculating stats:', error);
        throw error;
    }
}


module.exports = getStats;