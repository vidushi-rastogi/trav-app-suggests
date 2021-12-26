# MERN-Stack Travel Suggestion Application
This project is developed using MERN stack, and application that is a minified version of Google map having very basic features of it.
To replicate map facility, the project is integrated with Mapbox library (all free!)

## Prerequisites
For this project you need to create an account in

1. [react-map-gl](https://visgl.github.io/react-map-gl/) an opend source library for Mapbox, visit Mapbox account page and create your *Account Token*.
2. [MongoDB atlas](https://cloud.mongodb.com/), this is to handle your server back end. Create a cluster and iniside a database for your proejct, save the *Connection url* for that cluster.

## Build Setup
##### Clone project
#
```
git clone https://github.com/vidushi-rastogi/trav-app-suggests.git
```

##### Add .env file
Create .env file in root direcrtory and the client sub-directory.
- Inside .env file of root directory create an environment variable named *MONGODB_CONNECTION_URL* and give the MongoDB Atlas connection url as it's value.
- Inside .env of client sub-directory create a variable named *REACT_APP_MAPBOX_TOKEN* and give the react-map-gl token as it's value.

##### Install Dependencies and then run setup
#
cd into the project folder

1. run following commands to start server
```
npm install
npm start
```
2. Open another terminal and cd into the client sub-directory and run the same commands as mentioned above to start client side.

This will start your app on `localhost:3000`

## Project Demo
This project is deployed using free hosting service *heroku*.
Project Link - https://travappsuggests.herokuapp.com/

## Reference Links
- [react-map-gl](https://visgl.github.io/react-map-gl/) - To learn about map library.
- [Mapbox account](https://account.mapbox.com/) - To create mapbox account
- [MongoDB Atlas](https://cloud.mongodb.com/) - To create DB cluster

## Reference Articles

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Licence
Copyright (c) 2021 Vidushi Rastogi







