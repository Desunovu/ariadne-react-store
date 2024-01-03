/**
 * Функция prepareValuesForProductUpdate() готовит обновленные значения из объекта со значениями формы, оставляя только те свойства,
 * которые потребуются для выполнения мутации
 *
 * @param {Object} values - Объект со значениями из формы
 * @param selectedCategoryIds
 * @param selectedCharacteristicIds
 * @param {Object} product - Объект, с которым нужно сравнивать значения
 * @returns {Object} - Новый объект, содержащий только нужные для запроса параметры
 */
export function prepareValuesForProductUpdate(values, selectedCategoryIds, selectedCharacteristicIds, product) {
    const result = {};
    const currentCategories = product.categories.map((category) => category.id)
    const addCategoriesById = selectedCategoryIds.filter((category) => !currentCategories.includes(category));
    const removeCategoriesById = currentCategories.filter((category) => !selectedCategoryIds.includes(category));
    const addCharacteristicByIds = [];
    const removeCharacteristicByIds = [];

    values.addCategoriesById = addCategoriesById;
    values.removeCategoriesById = removeCategoriesById;
    values.addCharacteristicByIds = addCharacteristicByIds;
    values.removeCharacteristicByIds = removeCharacteristicByIds;

    // Уберем из запроса пустые массивы, значения false и неизменившиеся параметры
    for (const key in values) {
        const value = values[key];
        if ( // Случаи пропуска
            (key !== "id" && value === product[key]) || // поле не изменилось (кроме id)
            value === false || // значение поля false
            (value.length === 0 && typeof value === "object") // значение поля - пустой массив
        ) {
            continue;
        }

        result[key] = value;
    }
    return result;
}
