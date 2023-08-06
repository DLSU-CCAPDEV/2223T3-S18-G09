# 2223T3-S18-G09
Project Group 9 Repository (Dolon, Fetalvero, Gabini, Tumalad)

- This web application is an implementation of a Restaurant Review Web App. 

<!-- Insert the details of the project implementation next time -->

<!-- Insert the content info of the files next time -->

## Contents:
- [controllers](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/controllers) - This folder contains files which defines callback functions for client requests.
- [helpers](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/helpers) - This folder contains the helper functions that are used to implement some of the functionality.
- [models](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/models) - This folder contains files for database modeling and access.
- [public](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/public) - This folder contains static assets such as css, js, and image files.
- [routes](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/routes) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [views](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/tree/main/views) - This folder contains all hbs files to be rendered when requested from the server.
- [index.js](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/blob/main/index.js) - The main entry point of the web application.

## Using the Deployed Web Application
- To use the deployed web application click this link: https://s18-g9-palatable.onrender.com

## Steps to set-up the project
1. Clone the repository either by downloading the contents of the repository [here](https://github.com/DLSU-CCAPDEV/2223T3-S18-G09/archive/refs/heads/main.zip), or using the command below (Note: git should be installed in your system for this to work).
```
    git clone https://github.com/DLSU-CCAPDEV/2223T3-S18-G09
```
2. Open Command Prompt
3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.
4. Run the command `npm install` to initialize and install all necessary modules used in the project.
5. Before running the server we run the command `node add_data.js` to initialize the demo content of the database. The data includes the ff:
```
    7 user accounts - 2 visitor account(non-owner users), 5 owner accounts(each account associated to one establishment)
    5 establishments - Jus and Jerry's, Burger King, Jollibee, BonChon, 24 Chicken
    5 reviews - 1 review on each establishment
    3 owner responses
```
6. We may now run our server. To do this, we run the command `node index.js`.
7. Let's test our web application. Go to the link below to access the web application:
```
http://localhost:3000/
```
8. You can try one of the accounts below or create your own account by signing up.

## Dummy accounts
```
OWNER ACCOUNTS:
username: kenshinfetalvero
password: 123
Note: Owner of Jollibee

username: briangabini
password: 123
Note: Owner of Jus and Jerry's

username: shawnetumalad
password: 123
Note: Owner of Burger King

username: johndolon
password: 123
Note: Owner of 24 Chicken

username: jmdolon
password: 123
Note: Owner of BonChon

NON-OWNER ACCOUNTS:
username: randomuser1
password: 123

username: randomuser2
password: 123
```
