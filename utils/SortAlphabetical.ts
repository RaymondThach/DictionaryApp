//Used bubble sort to sort Learning List by alphabetical order, both ascending and descending order
//isSwapped to prevent full iteration of the array when elements already swapped
const SortAlphabetical = (arr: Array<{word: string}>, mode: string) => {
    const len = arr.length;
    for (let i = 0; i < len; i++){
        let isSwapped = false;
        for (let j = 0; j < len - 1; j++){
            if (mode === 'A-Z') {
                if (arr[j].word > arr[j+1].word){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            }
            else {
                if (arr[j].word < arr[j+1].word){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
            }
            if (isSwapped === true){
                break;
            }
        }
    }
    return arr;
};

export default SortAlphabetical;