/**
 * Функция filterValues() фильтрует объект со значениями формы, оставляя только те свойства,
 * которые потребуются для выполнения мутации (без неизмененных, пустых, ложных свойств)
 *
 * @param {Object} values - Объект со значениями из формы
 * @param {Object} obj - Объект, с которым нужно сравнивать значения
 * @returns {Object} - Новый объект, содержащий только нужные для запроса cвойства
 */
export function filterValuesForUpdate(values, obj, integerKeys) {
    const result = {};
    for (const key in values) {
        const value = values[key];
        if ( // Случаи пропуска
            (key !== "id" && value === obj[key]) || // поле не изменилось (кроме id)
            value === false || // значение поля false
            (value.length === 0 && typeof value === "object") // значение поля - пустой массив
        ) {
            continue;
        }

        result[key] = value;
    }
    return result;
}
