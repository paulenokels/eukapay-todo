## How to start the application

### Using Docker
1. Pull the image 
    ``` bash
     docker pull paulenokels/eukapay-todos:latest
    ```
2. run 
    ```bash 
    docker run -p 3000:3000 paulenokels/eukapay-todos:latest
    ```
3. Visit http://localhost:3000 to see the app.

### Using NPM
1. Clone this repository

2. Install yarn if you dont have
```bash
npm install --global yarn
```

3. Install required packages
```bash
yarn install
```

4. Start the application
```bash
    yarn dev
```
4. Visit http://localhost:3000 to see the app.

## Testing
```bash
yarn test
```

## Directory structure
The main app directory structure is arranged like this:
```bash
src
    |---components
    |---pages
    |---interfaces
    |---services
    |---styles
    |---context
    |---utils
```

### Components folder
this folder contains global shared/reusable components, such as layout (wrappers, navigation), form components, buttons, etc
```bash
components
    |---Footer
    |---Header
    |---Layout
    |---TodoItems
```

### pages folder
NextJS enforce having all routes in a folder named pages, this allows for file system based router. 
```bash
pages
    |---api
    |---edit
    |---_app.tsx_
    |---index.tsx
```


### interfaces folder
This folder contains type interfaces that can be shared between the server and the client
```bash
interfaces
    |---todoItem.type.ts
```

### The services folder
contains APIs that connects the application with the outside world. Any form of API call or websocket interaction which needs to happen, to share data with an external service or client, is saved here.
```bash
services
    |---todoService.ts
```
### The styles folder
This folder stores all CSS shared across the App.
styles
```bash
    |---_constants.scss
    |---global.scss
```

### context folder
The contexts folder is a bare minimum folder only containing the state which has to be shared across these components. Each page can have several nested contexts, with each context only passing the data forward in a downward direction.  This structure will look like this:
```bash
contexts
    |---todo
        |---todo-context.tsx 
```

### The utils folder
Stores Utilities, helpers, constants, and the like
```bash
utils
    |---constants.ts
    |---notify.ts
```
