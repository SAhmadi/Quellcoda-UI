# serverless-editor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Setup a Firebase Project
- Make sure to run `npm run build` inside the frontend project (should build it to `dist` folder in root directory)
- Create Firebase account and create a project: https://firebase.google.com/
- `npm install -g firebase-tools`
- `firebase login`
- `firebase init` and select `Hosting` with **Spacebar** and press enter
- `Use an existing project` (Enter)
- Select your previously created project
- What do you want to use as your public directory? `dist` (typ in dist)
- Configure as a single-page app (rewrite all urls to /index.html)? `N`
- File dist/index.html already exists. Overwrite? `N`

# Deploy Firebase Project
- `firebase deploy`