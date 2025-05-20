// wordData.js

const categories = ['Name', 'Place', 'Animal', 'Thing'];
const wordsPerCategory = 5;

function getWordsForCategory(category) {
    switch (category) {
        case 'Name':
            return ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fiona'];
        case 'Place':
            return ['London', 'Paris', 'Tokyo', 'Sydney', 'Rome', 'Berlin'];
        case 'Animal':
            return ['Cat', 'Dog', 'Elephant', 'Lion', 'Tiger', 'Zebra'];
        case 'Thing':
            return ['Table', 'Chair', 'Book', 'Pen', 'Computer', 'Phone'];
        default:
            return [];
    }
}

export { getWordsForCategory, categories, wordsPerCategory };
