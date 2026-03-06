async function bubble(){

    const ele = document.querySelectorAll(".bar");

    for(let i=0;i<ele.length-1 && !stopSorting;i++){

        for(let j=0;j<ele.length-i-1 && !stopSorting;j++){

            ele[j].style.background='blue';
            ele[j+1].style.background='blue';

            updateComparisons();

            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){

                await waitforme(delay);

                swap(ele[j],ele[j+1]);
            }

            ele[j].style.background='cyan';
            ele[j+1].style.background='cyan';
        }

        ele[ele.length-1-i].style.background='green';
    }

    if(!stopSorting)
        ele[0].style.background='green';
}

const bubSortbtn = document.querySelector(".bubbleSort");

bubSortbtn.addEventListener('click',async function(){

    stopSorting=false;
    pauseSorting=false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Bubble Sort";

    resetCounters();

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await bubble();

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});