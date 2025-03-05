const getDataFromAPI  = require('./getDataFromAPI');
const getStats = require('./getStats');

describe('getStats', () => {
    it('Должно высчитывать статистику ингридиентов корректно', async () => {
        const mockData = {
            recipes: [
                {
                    id: 1,
                    name: 'Pasta',
                    ingredients: ['pasta', 'tomato', 'cheese'],
                    instructions: [],
                    prepTimeMinutes: 10,
                    cookTimeMinutes: 20,
                    servings: 4,
                    difficulty: 'easy',
                    cuisine: 'Italian',
                    caloriesPerServing: 500,
                    tags: ['dinner', 'vegetarian'],
                    userId: 1,
                    image: 'pasta.jpg',
                    rating: 4.5,
                    reviewCount: 100,
                    mealType: ['main course']
                },
                {
                    id: 2,
                    name: 'Salad',
                    ingredients: ['lettuce', 'tomato', 'cheese'],
                    instructions: [],
                    prepTimeMinutes: 5,
                    cookTimeMinutes: 0,
                    servings: 2,
                    difficulty: 'easy',
                    cuisine: 'American',
                    caloriesPerServing: 200,
                    tags: ['lunch', 'healthy'],
                    userId: 2,
                    image: 'salad.jpg',
                    rating: 4.0,
                    reviewCount: 50,
                    mealType: ['side dish']
                }
            ],
            total: 2,
            skip: 0,
            limit: 10
        };

        const getDataFromAPISpy = jest.spyOn(require('./getDataFromAPI'), 'getDataFromAPI');
        getDataFromAPISpy.mockResolvedValue(mockData);

        const result = await getStats();

        expect(result).toEqual({
            pasta: 1,
            tomato: 2,
            cheese: 2,
            lettuce: 1
        });

        getDataFromAPISpy.mockRestore();
    });
});
