# Authentication with Node and React

An experiment developing authentication with Node server and React UI.


## Getting started

1. Navigate to 'server' folder in your terminal
2. Install dependencies: `npm install`
3. Run MongoDB from the server folder: `mongod`
4. From another terminal in the same path, run the server: `npm run dev`
5. Server should start running on port 3090
6. Navigate to 'client' folder in another terminal
7. Install dependencies: `npm install`
8. Run the client: `npm run start`
9. Open the client app: 'http://localhost:3000/'

You can now test the functionality by signing up with a user and accessing
Feature page. Normally this route `/feature` cannot be accessed unless the user
has signed up or signed in.