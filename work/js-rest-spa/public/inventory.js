"use strict";
(function iife() {

  const errMsgs = {
    'duplicate': 'Status: That name already exists',
    'network-error': 'Status: There was a problem connecting to the network, try again',
    'bad-request': 'Status: Quantity cannnot be a string',
    'missing-quantity': 'Status: Quantity cannot be empty',
    'missing-item': 'Status: No such item Available',
    'missing-name': 'Status: Name cannot be empty'
  };

  const status = document.querySelector('.status');
  const inputItem = document.querySelector('#inventory-app .input-item');
  const inputQuantity = document.querySelector('#inventory-app .input-quantity');
  const addButton = document.querySelector('#inventory-app .add-button');
  const item = document.querySelector('#inventory-app .item');

  loading();
  disableButtonIfNoInput();

  function updateStatus(message) {
    status.innerText = message;
  }
  
  function render(items) {
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
    item.innerHTML = html;
    addButton.disabled = !item.value;
  };

  function loading() {
    const html = `
      <li>
         LOADING ...........
      </li>
      `;
    item.innerHTML = html;
  };

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  function disableButtonIfNoInput() {
    inputItem.addEventListener('input', () => {
      addButton.disabled =! inputItem.value;
    });
  }

  addButton.addEventListener('click', () => {
    const name = inputItem.value;
    let quantity = inputQuantity.value;
    if(quantity === ""){
      quantity = 0;
    }
    if(name) {
      fetch(`/items/${name}/${quantity}`, {
        method: 'POST',
      })
      .catch( () => Promise.reject( { error: 'network-error' }) )
      .then( convertError)
      .then( items => {
        resetAddItemField();
        render(items);
        updateStatus('');
      })
      .catch( err => {
        resetAddItemField();
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });
  
  item.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete') ) {
      const itemid = e.target.dataset.itemid;
      fetch(`/items/${itemid}`, {
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
  
  item.addEventListener('click', (e) => {
    if(e.target.classList.contains('update') ) {
      const index = e.target.dataset.index;
      const itemid = e.target.dataset.itemid;
      let quantity = (document.querySelectorAll('#inventory-app .count')[index]).innerText;
      if(quantity === ""){
        quantity = 0;
      }
      fetch(`/items/${itemid}/${quantity}`, {
        method: 'PATCH',
      })
      .catch( () => Promise.reject({ error: 'network-error' }) )
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

  fetch('/items/', {
  method: 'GET',
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
  
  function resetAddItemField(){
    inputItem.value = '';
    inputQuantity.value = '';
    addButton.disabled = true;
  }

})();
