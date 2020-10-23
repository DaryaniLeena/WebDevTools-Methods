"use strict";
(function iife() {
let items=[{
    "name":"pasta",
    "value":2,
    
},{
    "name":"green tea",
    "value":0,
}];

const inputItem=document.querySelector('#inventory-app .input-item');
const addButton=document.querySelector('#inventory-app .add-button');
const item=document.querySelector('#inventory-app .item');
let disabled=false

disableButtonIfNoInput();
// disableMinusButtonWithZeroValue();
addAbilityToAddItems();
addAbilityToDeleteItems();
addAbilityToIncreaseItems();
addAbilityToDecreaseItems();
render(items);

function render(items){
    const html = items.map((items,index) =>{
        return `
        <li>
            <button class="delete" data-index="${index}">X</button>
            <span data-index="${index}">${items.name}</span>
            <span class="counter">
                <button class="minus" data-index="${index}" disabled="${items.value==0?"true":"false"}">-</button>
                <span class="count">${items.value}</span>
                <button class="plus" data-index="${index}">+</button>
            </span>
        </li>
        `;
    }).join('');

    item.innerHTML= html;
    addButton.disabled=!inputItem.value;
};

function addAbilityToAddItems(){
    addButton.addEventListener('click', (e)=>{
        const newItem={
            name:inputItem.value,
            value:0,
            diableMinus:true
        }
        items.push(newItem);
        inputItem.value='';
        render(items);
    })
}

function disableButtonIfNoInput(){
    inputItem.addEventListener('input',()=>{
        addButton.disabled=!inputItem.value;
    });
}
function addAbilityToIncreaseItems(){
    item.addEventListener('click',(e)=>{
        if(!e.target.classList.contains('plus')) {
            return;
          }
        const index=e.target.dataset.index;
        items[index].value=items[index].value+1;
        //not working
        if(items[index].value>0){
                document.querySelector('.minus').disabled=false;
        }
        //
        render(items);
    })
}
function addAbilityToDecreaseItems(){
    item.addEventListener('click',(e)=>{
        if(!e.target.classList.contains('minus')) {
            return;
          }
        const index=e.target.dataset.index;
        items[index].value=items[index].value-1;
        //not working
        if(items[index].value==0){
            document.querySelector('.minus').disabled=true;
        }
        //
        render(items);
    })
}
function addAbilityToDeleteItems(){
    item.addEventListener('click',(e)=>{
        if(!e.target.classList.contains('delete')) {
            return;
        }
        const index=e.target.dataset.index;
        items.splice(index,1);
        render(items);
    })
}
// function disableMinusButtonWithZeroValue(){
//     items.forEach(element,index => {
//         let ele=document.querySelector('.minus .${index}')
//         if(element.value==0){
//            ele.disabled=true;
//         }else{
//             ele.disabled=false;
//         }
//     });
// }


       
    

})();
