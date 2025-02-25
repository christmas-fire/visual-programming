function getFields(objs, field) {
    const result = [];
    for (let i = 0; i < objs.length; i++) {
        result.push(objs[i][field]);
    }
    return result;
}

module.exports = getFields;