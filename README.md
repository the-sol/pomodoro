# Pomodoro Project

<img src="https://user-images.githubusercontent.com/69774407/119630519-b11e2480-be17-11eb-8f89-f1179db1948e.png" width="100" height="100">

The Pomodoro technique is a time management method. This technique helps in managing working time as it divides it into specific periods, each period  called pomodoro, where the length of the pomodoro is 25 minutes, and after every 25 minutes there is a  5-minute break, and if four pomodoro cycles are completed, there will be a 15-minute break.

## Features of this site:

- It contains a 25-minute timer (pomodoro period).
- Contains a pause button to timer.
- When the timer ends, five minutes are displayed with the start button.(short break).
- When the short break finishes (5 min) Will come back to (pomodoro period).

## How to run it?

**requires [Node.js](https://nodejs.org/en/download/)** LTS Version: 14.17.0 to run.

```
git clone https://github.com/the-sol/pomodoro.git
cd pomodoro
npm install
npm start
```

## Folder structure

```
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── component
    │   ├── StartButton
    │   │   ├── ButtonLgic.js
    │   │   ├── index.jsx
    │   │   └── style.css
    │   └── Timer
    │       ├── TimerLogic.js
    │       ├── index.jsx
    │       └── style.css
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── reportWebVitals.js
    └── setupTests.js
```

## Contributions

We welcome and appreciate contributions of all kind to this repository. Please read the [contribution guide](CONTRIBUTING.md) for more details.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
