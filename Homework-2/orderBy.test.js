const orderBy = require('./orderBy');

test('Должен сортировать по имени и возрасту', () => {
    const data = [
        { name: 'Александр', age: 19 },
        { name: 'Настя', age: 8 },
        { name: 'Лера', age: 19 }
    ];
    const sortedData = orderBy(data, ['name', 'age']);
    expect(sortedData).toEqual([
        { name: 'Александр', age: 19 },
        { name: 'Лера', age: 19 },
        { name: 'Настя', age: 8 }
    ]);
});

test('Все элементы в массиве должны быть объектами', () => {
    const data = [
        { name: 'Наталья', age: 47 },
        'Роман',
        { name: 'Настя', age: 8 }
    ];
    expect(() => orderBy(data, ['name', 'age'])).toThrow('Все элементы в массиве должны быть объектами');
});

test('Во всех элементах присутствуют свойства, по которым выполняется сортировка', () => {
    const data = [
        { name: 'Александр', age: 19 },
        { name: 'Роман' },
        { name: 'Михаил', age: 30 }
    ];
    expect(() => orderBy(data, ['name', 'age'])).toThrow('Свойство "age" отсутствует в одном из объектов');
});