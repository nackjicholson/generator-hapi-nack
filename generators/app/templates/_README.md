# <%= projectName %>

> <%= description %>

## Deploy Service

Put this repo on a machine with docker installed, it will run a container `sh deploy.sh 1-0-0`

### NPM Scripts

**Linting with Eslint**

Configured by default to use the "xo-space" learn more [here](https://github.com/sindresorhus/xo)

`$ npm run lint`

Will lint your code anytime a file changes in the `lib` and `test` directory.

**Tests with mocha**

`$ npm test`

Runs a test of your code using mocha. Tests can be written using es2015 as well.

`$ npm run cov`

Produces an istanbul coverage report in the `coverage/` directory.

**Dev Mode**

`$ npm run tdd`

Run a file watcher to run the tests anytime a file in `lib` or `test` is changed.

`$ npm run tdd:lint`

Run a file watcher which performs linting, code style checks, and tests anytime you save a file.

**Start the server**

`$ npm start`  
`$ npm run start:dev`
