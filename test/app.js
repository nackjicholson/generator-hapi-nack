'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-hapi-nack:app', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'my-test-service',
        githubUsername: 'test',
        description: 'test'
      })
      .toPromise();
  });

  it('generates expected files', function () {
    assert.file([
      '.dockerignore',
      '.gitignore',
      '.travis.yml',
      'server.js',
      'lib/loadPlugins.js',
      'lib/foo.js',
      'test/foo.test.js',
      'deploy.sh',
      'Dockerfile',
      'package.json',
      'README.md'
    ]);
  });
});
