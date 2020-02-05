# MetraTech Ericcson Single-Page-Application UI Baseline * Angular 1.x

## Development Technology Stack

- [Maven](https://maven.apache.org/)
- [Spring Boot](http://projects.spring.io/spring-boot/)
- [Node](http://nodejs.org/)
- [Express](http://expressjs.com/)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Sass](http://sass-lang.com/)
- [Chai](http://chaijs.com/)
- [Karma](https://karma-runner.github.io/)
- [Mocha](https://mochajs.org/)
- [Plato](https://github.com/es-analysis/plato/)
- [Sinon](http://sinonjs.org/)
- [Bardjs](https://github.com/wardbell/bardjs/)
- [Angular-Mocks](https://github.com/angular/bower-angular-mocks/)
- [lodash](https://lodash.com/)
- [Protractor](https://angular.github.io/protractor/#/)

## Client Technology Stack

- [Angular 1.x](https://angularjs.org/)
- [Angular UI Router](https://angular-ui.github.io/ui-router/)
- [Bootstrap 3.x](http://getbootstrap.com/)
- [Font Awesome](http://fontawesome.io/)
- [Toastr](https://codeseven.github.io/toastr/)
- [lodash](https://lodash.com/)

## Prerequisites

1. Install [Node.js](http://nodejs.org)

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon protractor
    ```
    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

3. Update the local Selenium Server with

    ```bash
    webdriver-manager update
    ```
    
## Running

### Linting
 - Run code analysis using `gulp vet`. This runs jshint, jscs, and plato.

### Unit Tests
 - Run the unit tests using `gulp test` (via karma, mocha, sinon).

### Running e2e Tests
 - From within 3 command windows/terminals.
 - Run Selenium Server using `webdriver-manager start`
 - Run the project with either `gulp serve-dev` or `gulp serve-build`
 - Run the end-2-end tests using `protractor e2e.config.js`
 
### Running in dev mode
 - Run the project with `gulp serve-dev`

 - opens it in a browser and updates the browser with any files changes.

### Building the project
 - Build the optimized project using `gulp build`
 - This create the optimized code for the project and puts it in the build folder

### Running the optimized code
 - Run the optimize project from the build folder with `gulp serve-build`

### Running within Spring Boot
 - Build the optimized project using `gulp build`
 - Run Spring Boot using `mvn spring-boot:run`
 
## Exploring
MetraTech Ericcson SPA UI Angular baseline project

### Structure
The structure also contains a gulpfile.js, a server folder.

	/src
		/client
			/app
			/content

### Installing Packages
If you notice missing packages, run these again:

 - `npm install`
 - `bower install`

### The Modules
The app has 3 feature modules and depends on a series of external modules and custom but cross-app modules

```
app --> [
        app.layout --> [
            app.core
        ],
        app.blocks,
		app.core --> [
			ngAnimate,
			ngSanitize,
			ui.router,
			blocks.exception,
			blocks.logger,
			blocks.router
		]
    ]
```

#### core Module
Core modules are ones that are shared throughout the entire application and may be customized for the specific application. Example might be common data services.

This is an aggregator of modules that the application will need. The `core` module takes the blocks, common, and Angular sub-modules as dependencies.

#### blocks Modules
Block modules are reusable blocks of code that can be used across projects simply by including them as dependencies.

##### blocks.logger Module
The `blocks.logger` module handles logging across the Angular app.

##### blocks.exception Module
The `blocks.exception` module handles exceptions across the Angular app.

It depends on the `blocks.logger` module, because the implementation logs the exceptions.

##### blocks.router Module
The `blocks.router` module contains a routing helper module that assists in adding routes to the $routeProvider.

## Gulp Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Testing

- `gulp serve-specs`

    Serves and browses to the spec runner html page and runs the unit tests in it. Injects any changes on the fly and re runs the tests. Quick and easy view of tests as an alternative to terminal via `gulp test`.

- `gulp test`

    Runs all unit tests using karma runner, mocha, chai and sinon with phantomjs. Depends on vet task, for code analysis.

- `gulp test --startServers`

    Runs all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

- `gulp autotest`

    Runs a watch to run all unit tests.

- `gulp autotest --startServers`

    Runs a watch to run all unit tests and midway tests. Cranks up a second node process to run a server for the midway tests to hit a web api.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-fonts`

    Remove all fonts from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp fonts`

    Copy all fonts from source to the build folder

- `gulp images`

    Copy all images from source to the build folder

### Styles

- `gulp compile-sass`

    Compile sass files to CSS, add vendor prefixes, and copy to the build folder

### Bower Files

- `gulp wiredep`

    Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles sass to css in a temp folder.

- `gulp serve-dev --nosync`

    Serves the development code without launching the browser.

- `gulp serve-dev --debug`

    Launch debugger with node-inspector.

- `gulp serve-dev --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Building Production Code

- `gulp optimize`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp optimize` to build the production code to the build folder.
    
- `mvn package`

    Creates jar file using assets from the build folder.
    
### Serving Production Code

- TBD

### Bumping Versions

- `gulp bump`

    Bump the minor version using semver.
    --type=patch // default
    --type=minor
    --type=major
    --type=pre
    --ver=1.2.3 // specific version
