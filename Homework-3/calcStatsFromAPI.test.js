const calcStatsFromAPI = require('./calcStatsFromAPI');
const loadData = require('./loadData');

test('Функция вызывается один раз', async () => {  
    const result = jest.spyOn(loadData, "loadData");
    result.mockImplementation(() => 'mock');
    expect(loadData.loadData()).toEqual('mock')

    expect(result).toHaveBeenCalledTimes(1);
});

test('Результат соответствует ожидаемому', async () => {
    const spy = jest.spyOn(loadData, 'loadData');
    spy.mockResolvedValue([
        {
            breed: 'Turkish Van',
            country: 'developed in the United Kingdom (founding stock from Turkey)',
            origin: 'Natural',
            coat: 'Semi-long',
            pattern: 'Van',
        },
        {
            breed: 'York Chocolate',
            country: 'United States (New York)',
            origin: 'Natural',
            coat: 'Long',
            pattern: 'Solid',
        },
    ]);

    const result = await calcStatsFromAPI.calcStatsFromAPI();
    expect(result).toEqual({
        'developed in the United Kingdom (founding stock from Turkey)': 1,
        'United States (New York)': 1,
    });
});