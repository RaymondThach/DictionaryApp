//Used bubble sort to sort Learning List by alphabetical order and numberically, both A-Z and Z-A order, 1-9 and 9-1
//isSwapped to prevent full iteration of the array when elements already sorted
const SortBy = (arr: Array<{id: number, word: string}>, mode: string, field: keyof {id: number, word: string}) => {
    const len = arr.length;
    for (let i = 0; i < len; i++){
        let isSwapped = false;
        for (let j = 0; j < len - 1; j++){
            if (mode === 'A-Z' || mode === '1-9') {
                if (arr[j][field] > arr[j+1][field]){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            }
            else { //Z-A, 9-1
                if (arr[j][field] < arr[j+1][field]){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            }
        }
        if (isSwapped === false){
            break;
        }
    }
    return arr;
};

export default SortBy;