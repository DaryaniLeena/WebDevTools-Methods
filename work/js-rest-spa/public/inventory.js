"use strict";

(function iife() {
    const errMsgs = {
        'duplicate': 'That name already exists',
        'network-error': 'There was a problem connecting to the network, try again',
    };
    const status = document.querySelector('.status');
    const login=document.querySelector('#inventory-app .login-box')
    const inputUserName=document.querySelector('#inventory-app .input-username');
    const loginButton=document.querySelector('#inventory-app .login-button');
    const inventory= document.querySelector('#inventory-app .inventory-box');
    const item= document.querySelector('#inventory-app .item-class');
    
    disableLoginButtonIfNoInput();
    // loginUser();
    
  
    // addAbilityToIncreaseItems();
    // addAbilityToDecreaseItems();
    // render(items);
    function renderPage(){
        const html =
            `
            <div class="header-component">
                <h3>INVENTORY</h3>
            </div>
            <div class="main-component">
                <div>
                    Add Item:
                    <input class="input-item">
                    <button class="add-button">Add</button>
                </div>
                <ul class="item"></ul>
            </div>
            `;
       
        inventory.innerHTML=html;
    };
    // const inputItem=document.querySelector('#inventory-app .input-item');
    // const addButton=document.querySelector('#inventory-app .add-button');
    // const item=document.querySelector('#inventory-app .item');
    function updateStatus( message ) {
        status.innerText = message;
      }
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
        document.querySelector('#inventory-app .add-button').disabled=!document.querySelector('#inventory-app .item').value;
    };

    function disableLoginButtonIfNoInput(){
        inputUserName.addEventListener('input',()=>{
            loginButton.disabled=!inputUserName.value;
        });
    }

    loginButton.addEventListener('click', () => {
        const name = inputUserName.value;
        if(name) {
          fetch(`/session/${name}`, {
            method: 'POST',
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( convertError)
          .then( items => {
            inputUserName.value = '';
            login.style.display = 'none';
            renderPage();
            render(items);
            disableButtonIfNoInput();
            addAbilityToAddItems();
            addAbilityToDeleteItems();
            updateStatus('');
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error);
          });
        }
      });

      function convertError(response) {
        if(response.ok) {
          return response.json();
        }
        return response.json()
        .then( err => Promise.reject(err) );
      }
    

    function disableButtonIfNoInput(){
      document.querySelector('#inventory-app .input-item').addEventListener('input',()=>{
        document.querySelector('#inventory-app .add-button').disabled=!document.querySelector('#inventory-app .input-item').value;
        });
    }

    function addAbilityToAddItems(){
      document.querySelector('#inventory-app .add-button').addEventListener('click', () => {
      const name = document.querySelector('#inventory-app .input-item').value;
      if(name) {
        fetch(`/items/${name}`, {
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError)
        .then( items => {
          document.querySelector('#inventory-app .input-item').value = '';
          render(items);
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
        });
      }
    });
        // addButton.addEventListener('click', (e)=>{
        
        //     const newItem={
        //         name:inputItem.value,
        //         value:0,
        //     }
        //     items.push(newItem);
        //     inputItem.value='';
        //     render(items);
        // });
    }

    // function addAbilityToIncreaseItems(){
    //     item.addEventListener('click',(e)=>{
    //         if(!e.target.classList.contains('plus')) {
    //             return;
    //         }
    //         const index=e.target.dataset.index;
    //         items[index].value=items[index].value+1;
    //         render(items);
    //     });
    // }

    // function addAbilityToDecreaseItems(){
    //     item.addEventListener('click',(e)=>{
    //         if(!e.target.classList.contains('minus')) {
    //             return;
    //         }
    //         const index=e.target.dataset.index;
    //         items[index].value=items[index].value-1;
    //         render(items);
    //     });
    // }

    function addAbilityToDeleteItems(){
        item.addEventListener('click',(e)=>{
          if(e.target.classList.contains('delete') ) {
            //     return;
            // }
            // const index=e.target.dataset.index;
            // items.splice(index,1);
            // render(items);
            const name = e.target.dataset.name;
            fetch(`/items/${name}`, {
              method: 'DELETE',
            })
            .catch( () => Promise.reject( { error: 'network-error' }) )
            .then( convertError )
            .then( items => {
              render(items);
              updateStatus('');
            })
            .catch( err => {
              updateStatus(errMsgs[err.error] || err.error);
            });
            
        }
      });
    }

    // const status= document.querySelector('.status');
    // fetch('/people/')
    // .then(response=>{
    //     if(response.ok){
    //         return response.json();

    //     }
    //     return response.json().then(err=> Promise.reject(err));
    // })
    // .then(people=>{
    //     const names= people.map(
    //         name=>`<li>${name}</li>`

    //     ).join('')
    //     document.querySelector('.example').innerHTML=names;
    // })
    // .catch(err=> status.innerText=err.error);

})();
