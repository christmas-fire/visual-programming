const orderBy = require('./orderBy');

test('Должен сортировать по имени и возрасту', () => {
    const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 },
        { name: 'Alice', age: 20 }
    ];
    const sortedData = orderBy(data, ['name', 'age']);
    expect(sortedData).toEqual([
        { name: 'Alice', age: 20 },
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 }
    ]);
});

test('Все элементы в массиве должны быть объектами', () => {
    const data = [
        { name: 'Alice', age: 30 },
        'Bob',
        { name: 'Charlie', age: 25 }
    ];
    expect(() => orderBy(data, ['name', 'age'])).toThrow('Все элементы в массиве должны быть объектами');
});

test('Во всех элементах присутствуют свойства, по которым выполняется сортировка', () => {
    const data = [
        { name: 'Alice', age: 30 },
        { name: 'Bob' },
        { name: 'Charlie', age: 25 }
    ];
    expect(() => orderBy(data, ['name', 'age'])).toThrow('Свойство "age" отсутствует в одном из объектов');
});