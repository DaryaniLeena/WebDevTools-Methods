# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

This means the resource is a thing like a student or an employee, it is not the interaction or an action like addStudent or updateEmployee.

Example: if there is a URL /addStudent/, this does not represent a resource rather it should use a noun and can be written as /student/. In the same way, if there is a URL for getting employee data /getEmployeeById/, this is a bad example of a URL. Rather it can be written as /employee/{id} i.e., id can be part of the query parameter.

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  

This code will not return the username because calling fetch() will return a promise and we have to wait for the promise to resolve by passing a handler inside the then() method of the promise. That handler receives the return value of the fetch promise. If the request is successful, now we can use the return value to show the username in the console.

Correct Approach would be :

const username = fetch('/username');
  username.then(response => response.json())
  .then(user => console.log(user))

This will return a user name.

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

Storing state in DOM means storing the state in HTML. That is using the HTML visual output to check and perform multiple operations. For example to show and hide logout/login button. If you read a button text and if it shows login you change it to logout, and if it shows logout you change it to login. This is a very poor approach and may add complexity to your code after performing a few operations. Rather we should store state in a variables/object and then use these variables to modify the state. This approach is a clean and better way of storing the state.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

Single-page applications consist of just one single page and it loads all the content on just one single page rather than navigating the user to different pages whereas In Multi-page application every change requests rendering a new page from the server in the browser.

SPA is fast as compared to MPA as most resources are only loaded once throughout the lifespan of the application. Only data is transmitted back and forth. MPA can sometimes affect the user experience due to the complexity.

SPA is less secure compared to traditional multi-page apps because of its cross-site scripting.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Progressive Enhancement ensures that basic content and functionality should be accessible to all web browsers. It is taking a non-client-side JS web app and augmenting it with JS. This approach makes applications accessible on all the devices and browsers (which may not support client-side JS). It is also great for ensuring that the server is secure.

SPA that uses Progressive Enhancement can work as a multipage application if there is no JS support in the browser. Here request goes to the backend and gets the new page with a response. And if there is support for JS then JS turns off the submission, a request is sent as a background call and this replaces the part of the HTML page which requires the change. So there is no full page reload.

SPA that doesn't use Progressive Enhancement may not work for the browser without JS support.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.

Dynamic content refers to web content that changes based on the behavior, preferences, and interests of the user. It is mostly generated at the moment a user requests a page based on the data you have about the user and on the access time. And the response is usually HTML. Whereas REST service returns the response data (in form of JSON, a plain text as well as XML) which can be used to manipulate HTML.
Also, REST can return HTML content and in that way, it acts similar to the dynamic asset.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

The information which should not be stored in cookies is the sensitive information that should be remained secure like the passwords, someone's home address, Social security number, credit card details, etc.
The reason is if anyone gets access to this (and even worse if the cookie is stored in plain text without encryption), they can use such sensitive information to do worse. For example, they can use the same username and password to access more websites.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
It is important to separate the function that fetches data from what we do with the data because this approach helps to reuse the code wherever it is required. If two functions need to call the same service, writing a fetch function inside each of them will increase lines of code and affect code readability and make code look more complex. So, separating the fetch data function from the rest of the code makes it more reusable.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)

try/catch works very well when you have fully synchronous code, but asynchronous operations make it useless because no errors will be caught. i.e., the function will begin its course while the outer stack runs through and gets to the last line without any errors. If an error occurs at some point in the future inside an asynchronous function – nothing will be caught.

When we use Promises, we’ve lost our error handling. We don’t need to do anything special here to propagate error because we return a promise and there’s built-in support for error flow.


## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

Separation of concerns a front end as well as server-side issue. It is used in all programming languages. It is a design principle for separating a code into distinct sections such that each section addresses a separate concern.

Example 1: Before the emergence of CSS, HTML was responsible to perform both duties of defining semantics and style. But now CSS is used for the definition of content presentation style and HTML is used for the organization of webpage content. So, this is one example of separation of concern.

Another example is :

file:inventory.js

//code to delete an item
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


with separation of concern, we can write it as:

file: inventory.js

item.addEventListener('click', (e) => {
    if(e.target.classList.contains('delete') ) {
      const itemid = e.target.dataset.itemid;
      deleteItem(itemid)
      .then( items => {
        render(items);
        updateStatus('');
      })
      .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
      });
    }
  });

So, in the above code, we decoupled service call and the HTML modification by writing a different method for fetch operation which is written in a different file and then exported to the main file.

file: services.js

  export const deleteItem = (itemId) => {
  return fetch("/item/${itemId}", {
    method: "DELETE",
  })
    .catch(() => {
      return Promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((err) => Promise.reject(err));
    });
};


