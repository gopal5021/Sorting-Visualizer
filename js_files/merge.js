async function merge(ele, low, mid, high){

    if(stopSorting) return;

    const n1 = mid - low + 1;
    const n2 = high - mid;

    let left = new Array(n1);
    let right = new Array(n2);

    for(let i = 0; i < n1; i++){
        await waitforme(delay);
        ele[low+i].style.background='orange';
        left[i] = ele[low+i].style.height;
    }

    for(let i = 0; i < n2; i++){
        await waitforme(delay);
        ele[mid+1+i].style.background='yellow';
        right[i] = ele[mid+1+i].style.height;
    }

    let i=0,j=0,k=low;

    while(i<n1 && j<n2 && !stopSorting){

        await waitforme(delay);

        updateComparisons();

        if(parseInt(left[i]) <= parseInt(right[j])){

            ele[k].style.height = left[i];
            updateSwaps();

            i++;
        }
        else{

            ele[k].style.height = right[j];
            updateSwaps();

            j++;
        }

        k++;
    }

    while(i<n1){

        await waitforme(delay);

        ele[k].style.height = left[i];
        updateSwaps();

        i++;
        k++;
    }

    while(j<n2){

        await waitforme(delay);

        ele[k].style.height = right[j];
        updateSwaps();

        j++;
        k++;
    }
}

async function mergeSort(ele, l, r){

    if(stopSorting) return;

    if(l>=r) return;

    const m = l + Math.floor((r-l)/2);

    await mergeSort(ele,l,m);
    await mergeSort(ele,m+1,r);

    await merge(ele,l,m,r);
}

const mergeSortbtn = document.querySelector(".mergeSort");

mergeSortbtn.addEventListener('click', async function(){

    stopSorting = false;
    pauseSorting = false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Merge Sort";

    resetCounters();

    let ele = document.querySelectorAll(".bar");
    setExpectedComparisons(ele.length * Math.log2(ele.length));

    setTotalOperations(ele.length * ele.length);

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await mergeSort(ele,0,ele.length-1);

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});