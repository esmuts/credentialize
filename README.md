# Credentialize

Credentialize is a full-stack web app (server & backend) that provides credential management functionality for a large fictional media company (Cool-Tech) with multiple users, units and divisions. The tech stack is MongoDB (database), Node.js/Express (backend) and React (frontend).

## Contents

- Running Credentialize
- Usage
- Credits

## Running Credentialize

You can run Credentialize on your own maching by following these steps:

- Clone the repository to your local system.
- Open a command line prompt and navigate to the directory to which you downloaded the repository. **If the ".env" file is not present in the "./server" directory, create one, and add the following two lines to it, before saving:**

> ATLAS_URI=mongodb+srv://admin:admin@credentialize.8qsoz02.mongodb.net/cool-tech?retryWrites=true&w=majority

> 
> PORT=3001

- Navigate from the root directory to "/server".
- Download and install npm, if it's not already on your system: [https://nodejs.org/en/download/]().
- Type 'npm install' and wait fot the process to finish.
- Type 'npm start'.
- The application should open in your default browser, at 'http://localhost:3000'.

## Usage

Using the app is fairly self-explanatory. Navigation has been designed to be intuitive and follow the flow of user interaction with the app, rather than programmatic.

A home screen prompts the user to login or sign up. Signing up takes the user to a page where they can enter their details, including which unit and division they belong to. A record for the user will be created on the database.

Logging in takes the user to a welcome page, from where they can select a unit/division to view a list of login credentials for. Users can add new credentials and, if their role is manager or admin, they can update existing credentials.

Admin users can also access a list of users from the welcome screen. User permissions can be updated by adding or removing divisions.

Users can logout at any point by clicking on the "Logout" button at the bottom of the screen. Clicking on the page header ("Credentialize") will take users to the Welcome page, if they are logged in, or to the Home page, if they are logged out (or if their session has expired).

## Credits

This app was built as my final capstone project for a full-stack web development course at [https://www.hyperiondev.com](). Please feel free to let me know if you have any comments or suggestions.