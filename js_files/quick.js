async function partitionLomuto(ele, l, r){

    let i = l - 1;

    ele[r].style.background = 'red';

    for(let j = l; j <= r-1 && !stopSorting; j++){

        ele[j].style.background = 'yellow';

        await waitforme(delay);

        updateComparisons();

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){

            i++;

            swap(ele[i], ele[j]);

            await waitforme(delay);
        }

        ele[j].style.background = 'cyan';
    }

    i++;

    await waitforme(delay);

    swap(ele[i], ele[r]);

    ele[r].style.background = 'cyan';
    ele[i].style.background = 'green';

    return i;
}

async function quickSort(ele, l, r){

    if(l < r && !stopSorting){

        let pivot_index = await partitionLomuto(ele, l, r);

        await quickSort(ele, l, pivot_index - 1);

        await quickSort(ele, pivot_index + 1, r);
    }
}

const quickSortbtn = document.querySelector(".quickSort");

quickSortbtn.addEventListener('click', async function(){

    stopSorting = false;
    pauseSorting = false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Quick Sort";

    resetCounters();

    let ele = document.querySelectorAll(".bar");

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await quickSort(ele, 0, ele.length - 1);

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});