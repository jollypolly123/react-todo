# react-todo for WaffleHacks

This web app provides the ability to connect to WaffleHack's Todo List API to keep track of tasks, their details, and completion.\
It provides the following features:

- [x] List all todos on main page
- [x] Get details of a single todo, including title, description, date/time due, and completion status
- [x] Create a todo
- [x] Refresh the list of todos on the main page
- [x] Toggle completion status of todos from the main page
- [x] Edit a single todo, including title, description, date/time due, and completion status
- [x] Delete a single todo from the main page
- [x] Filter the list of todos by completion status
- [x] Filter the list of todos by title

## Functionality

### Listing Todos

On the main page, users can see the complete list of todos fetched from the server

### Detail View

Upon clicking the name section of a single todo, a modal opens that displays the todo's details

### Create Todo

At the top of the table, users can enter data into the form to create a todo. After clicking "Add task," the list is automatically re-rendered and the todo appears below.

### Editing Todos

To edit a todo, users can choose a specific todo from the list and click the "Edit" button under the Actions column. This brings up a modal that includes the todo's details and inputs that the user can modify. After making changes, the user can click "Save" to save their changes, or "Cancel" to discard changes.

### Deleting Todos

To delete a todo, users click the "Delete" button on the right side. This will open up a modal, where the user agrees again to delete it.

### Filtering Todos

If users need to find a specific todo, they have the option of clicking the tabs in the navbar to filter by completion status, or type in the search bar to search by title.

## Process and Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).\
Navigate to the project directory and run:

### `npm install`

Installs the necessary packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
