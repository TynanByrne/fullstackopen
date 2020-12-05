# Full Stack Open 2020

## Introduction

This repository contains all of my submissions for [Full Stack Open 2020](https://fullstackopen.com/en), an online course offered by the University of Helsinki.

Touted as a 'deep dive into modern web development', this course aims to take those with general programming knowledge and skill and equip them with the latest and greatest methods in web development. Using these methods, we focus on building single page applications with ReactJS with REST APIs built with NodeJS (though GraphQL is taught as well).

The course consists of 11 parts, each with their own exercises to be completed. These exercises require 'perserverance and the ability for independent problem solving and information seeking', which I would say is definitely true!

## Course contents
* [Part 0 - Fundamentals of Web apps](https://fullstackopen.com/en/part0)
* [Part 1 - Introduction to React](https://fullstackopen.com/en/part1)
* [Part 2 - Communicating with server](https://fullstackopen.com/en/part2)
* [Part 3 - Programming a server with NodeJS and Express](https://fullstackopen.com/en/part3)
* [Part 4 - Testing Express servers, user administration](https://fullstackopen.com/en/part4)
* [Part 5 - Testing React apps](https://fullstackopen.com/en/part5)
* [Part 6 - State management with Redux](https://fullstackopen.com/en/part6)
* [Part 7 - React router, custom hooks, styling app with CSS and webpack](https://fullstackopen.com/en/part7)
* [Part 8 - GraphQL](https://fullstackopen.com/en/part8)
* [Part 9 - TypeScript](https://fullstackopen.com/en/part9)
* [Part 10 - React Native](https://fullstackopen.com/en/part10)

The repository for Part 10, React Native can be found [here](https://github.com/TynanByrne/FullStackOpen-ReactNative)

## Skills taught

This course is very dense and teaches a lot of skills. In fact, it acknowledges that those who take it will end up with the dreaded 'JavaScript fatigue'. The reward for their efforts is a skillset that consists of:

### JavaScript skills

In depth knowledge of JavaScript is not a prerequisite. Instead, it is to be learned alongside everything else as the course progresses. The course covers the basics (variables, arrays, objects, functions) first, and points users to the [Mozilla JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript) in order to learn more.

From there, more and more modern JavaScript is taught. This includes: destructuring, arrow functions, promises, async/await, spread syntax, and array methods such as Array.map() and Array.filter().

### React

React is the main library used to create the front end. This starts with components, props, component state and event handlers. React is then built on with a variety of new technologies and techniques. These include hooks (and custom hooks), debugging, adding styling, as well as more influential technologies.

### API consumption

Axios is the main library used to consume REST APIs. This is taught in tandem with promises.

### NodeJS

The course teaches full-stack JavaScript, meaning Node is used for the back-end. Express is taught as the go-to framework, and everything is built on top of these two. Postman/Visual Studio Code REST client is taught to be used to build out and test how your server is behaving. Other aspects such as middleware are also touched upon.

### MongoDB

MongoDB is the database of choice. We used Mongoose in order to set up a connection with our remote database (in MongoDB Atlas) and configure it to work with our server. Topics taught include references across collections, population, general CRUD usage and creating Mongoose schemas.

### Testing

Testing is taught for both the backend and the whole application. Jest is used for testing the Express server, and Cypress is used for E2E testing.

### Authentication

As full-stack applications, most of the applications built during the course require some sort of user authentication. This is done through JSON Web Tokens, bcrypt password encryption and also local storage to persist the authentication.

### Redux

Moving away from useState() hooks for basic state management, Redux is taught as a more organised way to manage state. Redux thunk is added to make asynchronous actions easy.

### React router


In order to make a more functional single page application that actually appears to have different pages, React router is taught. This is when the applications start feeling more complete!

### UI Libraries

CSS-in-JS is taught initially, but later on UI Libraries such as React-Bootstrap and Material UI are touched upon for quick, consistent UI components. I like Material UI, personally.

### GraphQL

Though the course mainly uses REST APIs, GraphQL gets its own section. This part teaches how to get a GraphQL server running with Apollo Server, how to make queries and mutations and resolve them, and how to integrate this with both React and Express/MongoDB. More complicated topics in this section are relying on the cache for state management and updating it, and using Apollo's WebSocket based solution for subscriptions within GraphQL to relay information to multiple systems at once.


### TypeScript

After honing our JavaScript skills throughout, we learn TypeScript in the penultimate section. The course teaches why TypeScript can be beneficial, and adds typing to both the front-end and back-end.

### React Native

A final section on React Native is offered as a way of using all the skills we've learned throughout the course to create a hybrid mobile application

### Best practices

As well as general skills, the course teaches various best practices. These include how to structure a file tree, using ESLint for consistent code, using npm scripts to automate certain things and (perhaps most importantly) how to use the power of console.log()!

### Refactoring

The step by step approach naturally lends itself to many refactors taking place over the duration of the course. Also there are multiple times where code is revisited and refactored, including a complete refactor from component state management to a Redux state management system.

## My thoughts

I believe this course is fantastic, and I will be recommending it to many people. I feel like I have completely levelled up my knowledge of JavaScript, web development and programming as a whole. I plan on putting the vast majority of what I've learned into the next personal project I build!