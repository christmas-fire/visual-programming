const getFields = require('./getFields');

test('Должен возвращать массив значений поля', () => {
    const objects = [
        { product: 'Яблоко', type: 'Фрукты' },
        { product: 'Арбуз', type: 'Ягоды' },
        { product: 'Морковь', type: 'Овощи' }
    ];
    const products = getFields(objects, 'product');
    expect(products).toEqual(['Яблоко', 'Арбуз', 'Морковь']);
});
