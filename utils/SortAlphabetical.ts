//Used bubble sort to sort Learning List by alphabetical order, both A-Z and Z-A order
//isSwapped to prevent full iteration of the array when elements already sorted
const SortAlphabetical = (arr: Array<{word: string}>, mode: string) => {
    const len = arr.length;
    console.log(len);
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
                if (isSwapped === false){
                    break;
                }
            }
            else { //Z-A
                if (arr[j].word < arr[j+1].word){
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    isSwapped = true;
                }
                if (isSwapped === false){
                    break;
                }
            }
        }
    }
    console.log(arr);
    return arr;
};

export default SortAlphabetical;