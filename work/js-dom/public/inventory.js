"use strict";
(function iife() {

    const items=[{
        "name":"pasta",
        "value":2,
        
    },{
        "name":"green tea",
        "value":0,
    }];

    const inputItem=document.querySelector('#inventory-app .input-item');
    const addButton=document.querySelector('#inventory-app .add-button');
    const item=document.querySelector('#inventory-app .item');

    disableButtonIfNoInput();
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
                    <button class="minus" data-index="${index}" ${items.value === 0 ? "disabled" : ""}>-</button>
                    <span class="count">${items.value}</span>
                    <button class="plus" data-index="${index}">+</button>
                </span>
            </li>
            `;
        }).join('');
        item.innerHTML=html;
        addButton.disabled=!inputItem.value;
    };

    function disableButtonIfNoInput(){
        inputItem.addEventListener('input',()=>{
            addButton.disabled=!inputItem.value;
        });
    }

    function addAbilityToAddItems(){
        addButton.addEventListener('click', (e)=>{
            const newItem={
                name:inputItem.value,
                value:0,
            }
            items.push(newItem);
            inputItem.value='';
            render(items);
        });
    }

    function addAbilityToIncreaseItems(){
        item.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('plus')) {
                return;
            }
            const index=e.target.dataset.index;
            items[index].value=items[index].value+1;
            render(items);
        });
    }

    function addAbilityToDecreaseItems(){
        item.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('minus')) {
                return;
            }
            const index=e.target.dataset.index;
            items[index].value=items[index].value-1;
            render(items);
        });
    }

    function addAbilityToDeleteItems(){
        item.addEventListener('click',(e)=>{
            if(!e.target.classList.contains('delete')) {
                return;
            }
            const index=e.target.dataset.index;
            items.splice(index,1);
            render(items);
        });
    }

})();
