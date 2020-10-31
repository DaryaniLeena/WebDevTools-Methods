"use strict";

(function iife() {
    const errMsgs = {
      'duplicate': 'That name already exists',
      'network-error': 'There was a problem connecting to the network, try again',
    };
    const status = document.querySelector('.status');
    const login= document.querySelector('#inventory-app .login-box')
    const inputUserName= document.querySelector('#inventory-app .input-username');
    const loginButton= document.querySelector('#inventory-app .login-button');
    const inventory= document.querySelector('#inventory-app .inventory-box');
    const itemList= document.querySelector('#inventory-app .item-class');
    const logoutButton= document.querySelector('#inventory-app #logout-button');

    disableLoginButtonIfNoInput();
    // addAbilityToAddItems();
    // addAbilityToDeleteItems();
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
                    <input class="input-item" placeholder="Enter item" >
                    <input class="input-quantity" placeholder="Enter quantity">
                    <button class="add-button">Add</button>
                </div>
                <ul class="item"></ul>
            </div>
            `;
       
        inventory.innerHTML=html;
    };
  
    function updateStatus( message ) {
        status.innerText = message;
    }
    // getUserList: function(chat) {
    //   return `<ul class="users">` +
    //     Object.values(chat.users).filter( user => user.active).map( user => `
    //     <li>
    //       <div class="user">
    //         <span class="username">${user.username}</span>
    //       </div>
    //     </li>
    //   `).join('') +
    //   `</ul>`;
    // },
    
    function render(items){
        const html = Object.keys(items).map((item,index) => {
            return `
            <li>
                <button class="delete" data-itemid="${item}">X</button>
                <span data-itemid="${item}">${items[item].name}</span>
                <span class="counter">
                    <span class="count" contenteditable="true">${items[item].value}</span>
                    <button class="update" data-itemid="${item}" data-index="${index}">Update</button>
                </span>
            </li>
            `;
        }).join('');
        itemList.innerHTML=html;
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
            inventory.style.display = 'block';
            itemList.style.display = 'block';
            logoutButton.style.display = 'block';
            renderPage();
            render(items);
            disableButtonIfNoInput();
            addAbilityToAddItems();
            addAbilityToDeleteItems();
            enablelogout();
            addAbilityToUpdateCount();
            updateStatus(`logged in user is ${name}`);
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
      let quantity=document.querySelector('#inventory-app .input-quantity').value;
      if(quantity === ""){
        quantity=0;
      }
      if(name) {
        fetch(`/items/${name}/${quantity}`, {
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError)
        .then( items => {
          document.querySelector('#inventory-app .input-item').value = '';
          document.querySelector('#inventory-app .input-quantity').value = '';
          render(items);
          updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
          document.querySelector('#inventory-app .input-item').value = '';
          document.querySelector('#inventory-app .input-quantity').value = '';
        });
      }
    });
    }

    function addAbilityToDeleteItems(){
      itemList.addEventListener('click',(e)=>{
        if(e.target.classList.contains('delete') ) {
            const index = e.target.dataset.itemid;
            fetch(`/items/${index}`, {
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

    function enablelogout(){
      logoutButton.addEventListener('click', () => {
        fetch(`/session`, {
          method: 'POST',
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then( ()=> {
        login.style.display = 'block';
        inventory.style.display = 'none';
        itemList.style.display = 'none';
        logoutButton.style.display = 'none';
        updateStatus('');
        })
        .catch( err => {
          updateStatus(errMsgs[err.error] || err.error);
        });
      });
    }

    function addAbilityToUpdateCount(){
      itemList.addEventListener('click',(e)=>{
        if(e.target.classList.contains('update') ) {
          const index=e.target.dataset.index;
          const itemid=e.target.dataset.itemid;
          const quantity=(document.querySelectorAll('#inventory-app .count')[index]).innerText;
            fetch(`/items/${itemid}/${quantity}`, {
              method: 'PATCH',
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


})();
