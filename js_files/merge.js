async function merge(ele, low, mid, high){

    if(stopSorting) return;

    const n1 = mid - low + 1;
    const n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitforme(delay);
        left[i] = ele[low+i].style.height;
    }

    for(let i = 0; i < n2; i++){
        await waitforme(delay);
        right[i] = ele[mid+1+i].style.height;
    }

    let i = 0;
    let j = 0;
    let k = low;

    while(i < n1 && j < n2 && !stopSorting){

        updateComparisons();

        if(parseInt(left[i]) <= parseInt(right[j])){
            ele[k].style.height = left[i];
            i++;
        }
        else{
            ele[k].style.height = right[j];
            j++;
        }

        updateSwaps();

        await waitforme(delay);

        k++;
    }

    while(i < n1){
        ele[k].style.height = left[i];
        updateSwaps();
        i++;
        k++;
    }

    while(j < n2){
        ele[k].style.height = right[j];
        updateSwaps();
        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){

    if(l >= r || stopSorting){
        return;
    }

    const m = l + Math.floor((r - l) / 2);

    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);

    await merge(ele, l, m, r);
}

const mergeSortbtn = document.querySelector(".mergeSort");

mergeSortbtn.addEventListener('click', async function(){

    stopSorting = false;
    pauseSorting = false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Merge Sort";

    resetCounters();

    let ele = document.querySelectorAll(".bar");

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await mergeSort(ele, 0, ele.length - 1);

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});