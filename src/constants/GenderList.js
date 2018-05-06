import Selected from './SelectedConstant'
export function getGenderList() {
    let data = [
        {
            "id": 1,
            "title": "Man",
            [Selected.SELECTED]: false
        },
        {
            "id": 2,
            "title": "Woman",
            [Selected.SELECTED]: false
        },
        {
            "id": 3,
            "title": "Girl",
            [Selected.SELECTED]: false
        },
        {
            "id": 4,
            "title": "Boys",
            [Selected.SELECTED]: false
        },
        {
            "id": 5,
            "title": "Others",
            [Selected.SELECTED]: false
        }
    ];
    return data;
}