function orderBy(arr, properties) {
    if (!Array.isArray(arr)) {
        throw new Error('Первый аргумент должен быть массивом');
    }

    const result = arr.slice();

    for (const item of result) {
        if (typeof item !== 'object' || item === null) {
            throw new Error('Все элементы в массиве должны быть объектами');
        }

        for (const prop of properties) {
            if (!(prop in item)) {
                throw new Error(`Свойство "${prop}" отсутствует в одном из объектов`);
            }
        }
    }

    return result.sort((a, b) => {
        for (const prop of properties) {
            if (a[prop] < b[prop]) {
                return -1;
            } else if (a[prop] > b[prop]) {
                return 1;
            }
        }
        return 0;
    });
}

module.exports = orderBy;