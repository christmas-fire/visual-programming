const calcStatsFromAPI = require('./calcStatsFromAPI');
const loadData = require('./loadData');

jest.mock('./loadData', () => jest.fn().mockResolvedValue([
    {
        breed: 'Turkish Van',
        country: 'developed in the United Kingdom (founding stock from Turkey)',
        origin: 'Natural',
        coat: 'Semi-long',
        pattern: 'Van'
    },
    {
        breed: 'York Chocolate',
        country: 'United States (New York)',
        origin: 'Natural',
        coat: 'Long',
        pattern: 'Solid'
    }
]));

test('Загружает данные и возвращает корректный результат | вызывается 1 раз', async () => {
    const result = await calcStatsFromAPI();

    expect(loadData).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
        'developed in the United Kingdom (founding stock from Turkey)': 1,
        'United States (New York)': 1
    });
});
