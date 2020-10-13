# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
A static asset is a resource that remains the same for each and every request like images, CSS files. It is generally faster to cache, process, and deliver whereas Dynamic content refers to web content that changes based on the behavior, preferences, and interests of the user. It is mostly generated at the moment a user requests a page based on the data you have about the user and on the access time.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
If the path is built starting from the system root, it is called absolute file path whereas if the path is built starting from the current location, it is called relative file path.
Example
Absolute Paths:
http://www.xyz.com
http://www.xyz.com/images/image.png

Relative Paths
index.html
/images/image.png

The web server document root is where you put all the files your website needs to function i.e. publicly accessible base folder of a website.

## Q: What is the difference between server-side and client-side JS?
Server-side JS runs on a web server. When an end-user requests a web page dynamically, the webserver runs the server-side javascript to generate the dynamic HTML pages. The generated HTML is then sent back to the client browser whereas Client-side JS runs on a web browser of the user's machine. It works on the front end and visible among the users. As it runs on the user's machine, it reduces the server load. It is generally used to manipulate HTML and CSS tags in the front end.

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
1. `var` declares a variable within the scope of the current function whereas `let` and `const` are block-scoped.
2. `var` gives undefined if the initial value is hoisted whereas `let` and `const` variable gives reference error.
3. `var` can be redeclared whereas `let` and `const` variables cannot.
4. `var` and `let` variable can be updated whereas `const` variables cannot be updated.
5. `var` should only be used if we are targeting older JS engines. `const` should be used if the value of the variables does not need to be reassigned and `let` should be used if we need to reassign the value of the variable.

## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
4 ways to create inheritance in JS are:
1. Constructor Function : lets you use the new keyword on a function call. Here property name prototype will be used and it will be assigned to the prototype of the new object. So the new object will not get a property name prototype, it will get the actual prototype.

2. Object.create : in this Obhject.create() gives you new object without using new key word. All it does is when we call Object.create it gives us a new Objct with whatever we passed in the prototype.

3. ES6 classes : In this we define a class, define a constructor, also we define our methods. There is no mention of the function keyword while defining methods. We simply use this class using a new keyword and we can also use the method. This approach is more like a classic object-oriented way of defining the class, constructor, and methods.

4. Brute Force Prototype Assignment :In this we explicitly define a prototype for an object (telling it that your prototype is now this other object) using Object.setPrototypeOf() method.

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
const Cat = function(name) {
this.name = name;
};
Cat.prototype.purr = function() {
console.log(`${this.name} says 'Purr'`);
};
const maru = new Cat('Maru');
maru.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
const snake = {
hiss: function() {
console.log(`${this.name} says 'hiss'`);
}
};
const cobra = Object.create(snake);
cobra.name = 'cobra';
cobra.hiss();

## Q: Explain what a callback is, and give an example.
A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

function square(value) {
  alert(value * value);
}

function takeInput(callback) {
  var value = prompt('Please enter a number.');
  callback(value);
}

takeInput(square);

In above example square is a callback. 

## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `explicitly binded`, then `this` will not have the intended implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
"You shouldn't name your classes after what they look like" means In CSS the classes should be named for what they identify or what they are, and not for the effect or the way they look like. For example, if a class is named after its particular appearance example "red" for the text with font color red and if in future the text needs to be displayed as green, then the class name "red" with font-color green will be totally absurd. So, it's better to name a class based on the function block of code does.

An example of a well-named class can be “selected-names" for the selected elements within a list.
An example of a poorly named class can be “red” for elements with red font-color.