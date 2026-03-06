async function selection(){

    const ele = document.querySelectorAll(".bar");

    for(let i = 0; i < ele.length && !stopSorting; i++){

        let min_index = i;

        ele[i].style.background = 'blue';

        for(let j = i+1; j < ele.length && !stopSorting; j++){

            ele[j].style.background = 'red';

            await waitforme(delay);

            updateComparisons();

            if(parseInt(ele[j].style.height) < parseInt(ele[min_index].style.height)){

                if(min_index !== i)
                    ele[min_index].style.background = 'cyan';

                min_index = j;
            }
            else{
                ele[j].style.background = 'cyan';
            }
        }

        await waitforme(delay);

        swap(ele[min_index], ele[i]);

        ele[min_index].style.background = 'cyan';
        ele[i].style.background = 'green';
    }
}

const selectionSortbtn = document.querySelector(".selectionSort");

selectionSortbtn.addEventListener('click', async function(){

    stopSorting = false;
    pauseSorting = false;

    document.getElementById("algoName").innerText =
    "Current Algorithm: Selection Sort";

    resetCounters();

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();

    await selection();

    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
});