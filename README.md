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
If you need files built by webpack to the "build" directory:
```
yarn build
```
For backend changes or any changes that require testing backend code (i.e. using the engine, sending emails, etc.), run:
```
yarn build
node server
```
then check out localhost:9000.

### Linting
We use ESLint with the extends: "react-app" setting. Ensure that all code is compliant before creating a pull request.

### Authors

* **Nathaniel Corley** - *Full-stack design* - [nscorley](https://github.com/nscorley)

### License
This project is licensed under the MIT License.
