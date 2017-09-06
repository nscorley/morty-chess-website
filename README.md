# morty-chess-website
Informational website for the MortyChess engine.

### Getting Started
Clone the project, then install the dependencies.
```
yarn install
```
To get the front-end server up and running:
```
yarn start
```
It's now running on localhost:3000, but only the front-end code will work.

For whenever the full-functionality needs to be tested i.e. (i.e. using the engine, sending emails, etc.), run:
```
yarn build
node server
```
then check out localhost:9000.

If you need files built by webpack to the "build" directory:
```
yarn build
```

### Linting
We use ESLint with the extends: "react-app" setting. Ensure that all code is compliant before creating a pull request.

### Authors

* **Nathaniel Corley** - *Full-stack website design, engine programming* - [nscorley](https://github.com/nscorley)
* **Stiven Deleur** - *engine programming* - [deleurapps](https://github.com/DeleurApps)

### License
This project is licensed under the MIT License.
