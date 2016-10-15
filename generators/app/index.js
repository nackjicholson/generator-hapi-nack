'use strict';
const chalk = require('chalk');
const camelCase = require('lodash.camelcase');
const kebabCase = require('lodash.kebabcase');
const yeoman = require('yeoman-generator');
const superb = require('superb');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('hapi-nack') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What would you like to call this project?',
        default: this.appname.replace(/\s/g, '-'),
        filter: kebabCase
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your service',
        default: `My ${superb()} service.`
      },
      {
        name: 'organizationName',
        message: 'What is the GitHub username or organization name?',
        validate(val) {
          return val.length > 0 ? true : 'You have to provide a github username or organization';
        }
      },
      {
        name: 'containerNamespace',
        message: 'Please provide a container namespace. (e.g. your dockerhub name)',
        validate(val) {
          return val.length > 0 ? true : 'You have to provide a container namespace';
        }
      }
    ];

    return this.prompt(prompts)
      .then(function (props) {
        props.name = this.user.git.name();
        props.email = this.user.git.email();
        props.serviceId = camelCase(props.projectName);
        // To access props later use this.props.someAnswer;
        this.props = props;
      }.bind(this));
  },
  writing: {
    serviceFiles() {
      // Prevent templating of ecmascript6 {} deconstruction syntax as template vars.
      const interpolate = /<%=([\s\S]+?)%>/g;

      this.template('_package.json', 'package.json', this.props);
      this.template('_README.md', 'README.md', this.props);
      this.template('_deploy.sh', 'deploy.sh', this.props);
      this.template('_Dockerfile', 'Dockerfile', this.props);
      this.template('_server.js', 'server.js', this.props, {interpolate});
      this.template('lib/_loadPlugins.js', 'lib/loadPlugins.js', this.props, {interpolate});
      this.copy('lib/foo.js', 'lib/foo.js');
    },
    testFiles() {
      this.directory('test', 'test');
    },
    configFiles() {
      this.copy('dockerignore', '.dockerignore');
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
    }
  },
  install() {
    this.installDependencies();
  }
});
