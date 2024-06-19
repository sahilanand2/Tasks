# Task Management Application

This is a project aimed at managing tasks with checklist items associated with users and an interactive image for task visualization.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Time Taken](#time-taken)

## Introduction

The project is designed to help users manage tasks and checklist items associated with different users. Additionally, tasks can be visualized and interacted with on a 2D image representation of a building or layout.

## Features

- **User Management:**
  - Navigate to the user page.
  - Enter a username and click the "Add User" button.
  - If the user exists, you will be navigated to the home page with the user's ID.
  - If the user does not exist, a new user will be created, and you will be navigated to the home page with the new user's ID.
- **Task Management:**
  - On the home page, you can create tasks with checklists.
  - Toggle checklist item completion status.
- **Interactive Image:**
  - Assign tasks to markers on a 2D image representation.
  - Clicking on markers shows task details and checklist items.

## Setup

To set up the application locally, follow these steps:

In the project directory, you can run:

### `npm install`

Installs all the necessary dependencies for the application.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Usage

- **Home Page:** Displays tasks associated with a selected user.
- **User Page:** Add new users.
- **Admin Page:** View all the users.
- **Task Form:** Add tasks with checklist items.
- **Task List:** View tasks and their checklist items.

## Technologies Used

- **React**
- **Redux (Toolkit)** 
- **Admin Page** 
- **React Router DOM** 
- **Material-UI** 

## Time Taken

- **Initial Setup, Installations and Project Structure:** 2 hours.
- **User Management and State Handling:** 2.5 hours.
- **Task Management Functionality:** 3 hours.
- **Interactive Image and Marker Integration:** 2 hours.
- **UI Design and Implementation:** 2.5 hours.
- **Total Time Taken:** 13 hours.