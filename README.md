# react-todo for WaffleHacks

This single page application provides the ability to connect to WaffleHack's Todo List API to keep track of tasks, their details, and completion.\
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

Scroll down for a more detailed explanation of the features/design decisions and how to run the application.

## Functionality

### Listing Todos

On the main page, users can see the complete list of todos fetched from the server. This is organized in a table format using Bootstrap for organization. Each row includes the title and completion status, the info that is returned from the API.

### Detail View

Upon clicking the name section of a single todo, a modal opens that displays the todo's details. It includes all the info of the individual todo that is fetched, including title, description, completion, and due date if provided. The info is split into the title, body, and footer sections to balance out the modal.

### Create Todo

At the top of the table, users can enter data into the form to create a todo. After clicking "Add task," the list is automatically re-rendered and the todo appears below. This is above the table so it is easily accessible and doesn't require extra navigation for the user.

### Editing Todos

To edit a todo, users can choose a specific todo from the list and click the "Edit" button under the Actions column. This brings up a modal that includes the todo's details and inputs that the user can modify. After making changes, the user can click "Save" to save their changes, or "Cancel" to discard changes. The whole process requires just two button clicks and keeps the user on the same page so it's relatively simple.

### Deleting Todos

To delete a todo, users click the "Delete" button on the right side. This will open up a modal, where the user agrees again to delete it. This is a precaution so the user doesn't accidentally hit the delete button and irreversibly remove a todo.

### Filtering Todos

If users need to find a specific todo, they have the option of clicking the tabs in the navbar to filter by completion status, or type in the search bar to search by title. The filter by completion helps the user in deciding when to delete their todos or check progress. Filtering by title allows them to find a specific task and pull up its details.

### Refreshing Todos

To refresh the todo list and ensure changes were reflected, users can click the refresh icon in the navbar. This was partly placed here just so I could piggyback off of the navbar styling, and partly because all the navigation functionality is already there, so users can reliably go to the top left to control the screen.

## Getting Started

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
