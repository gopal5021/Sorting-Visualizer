async function insertion(){

    const ele = document.querySelectorAll(".bar");

    ele[0].style.background = 'green';

    for(let i = 1; i < ele.length && !stopSorting; i++){

        let j = i - 1;
        let key = ele[i].style.height;

        ele[i].style.background = 'blue';

        await waitforme(delay);

        while(j >= 0 && !stopSorting){

            updateComparisons();

            if(parseInt(ele[j].style.height) > parseInt(key)){

                ele[j+1].style.height = ele[j].style.height;

                updateSwaps();

                j--;

                await waitforme(delay);
            }
            else{
                break;
            }
        }

        ele[j+1].style.height = key;

        ele[i].style.background = 'green';
    }
}

const inSortbtn = document.querySelector(".insertionSort");

inSortbtn.addEventListener('click', async function(){

    stopSorting = false;
    pauseSorting = false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Insertion Sort";

    resetCounters();

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await insertion();

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});