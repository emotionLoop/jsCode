# jsCode.org

[![Build Status](https://img.shields.io/travis/emotionLoop/jsCode.svg?style=flat)](http://travis-ci.org/emotionLoop/jsCode)
[![Coverage Status](https://img.shields.io/coveralls/emotionLoop/jsCode.svg?style=flat)](https://coveralls.io/r/emotionLoop/jsCode)
[![Code Climate](https://img.shields.io/codeclimate/github/emotionLoop/jsCode.svg?style=flat)](https://codeclimate.com/github/emotionLoop/jsCode)
[![jsCode.org - JavaScript Coding Guidelines](https://img.shields.io/badge/jscode-bruno-blue.svg?style=flat)](http://jscode.org/bruno)

jsCode allows you to generate and share your own JavaScript coding guidelines.

# This is no longer maintained. The code is kept here for historical reasons. **

Please refer to https://github.com/rwaldron/idiomatic.js and http://eslint.org/ for good guides.

--

## Pre-requisites
You need node.js, redis, and mongo.

## Install

```bash
# install dev dependencies
npm install -d

# install gulp cli
npm install -g gulp

# build bower/less files
gulp postinstall
```


## Configuration

Configuration (e.g. database and logging setting per environment) is stored in "boot/config.js".


## Usage

### Development

Default:

```bash
node app
```

Debugging:

```bash
DEBUG=* node app
```

#### Gulp tasks:

```bash
# Run 'bower', 'less', and 'jshint' tasks
gulp postinstall

# Runs 'build'
gulp

# Run jshint to check syntax of JavaScript files
gulp jshint

# Runs 'clean', 'bower', 'less', 'copy', 'imagemin', 'usemin-css', 'usemin-js', and 'usemin-jade'
gulp build

# Runs 'watch-noreload', and starts a livereload server to automatically refresh your browser when changes are done
gulp watch

# Watches changes to public assets (images, fonts, less/css, js, and jade files) and runs appropriate tasks ('imagemin', 'less'/'usemin-css', 'usemin-js', 'usemin-jade') to parse them
gulp watch-noreload

# Run less to create CSS files
gulp less

# Optimizes and copies images to 'assets/dist/img'
gulp imagemin

# Adds versions to JS files, copying them later to 'assets/dist/js'
gulp usemin-js

# Adds versions to CSS files, optimizes and parses images and CSS files as well, copying them later to 'assets/dist'
gulp usemin-css

# Adds versions to assets in JADE files, optimizes and parses assets, copying them later to 'assets/dist'
gulp usemin-jade

# Cleans 'assets/dist' and 'bower_components' directories
gulp clean

# Copies some static files (favicon, robots.txt, etc) to 'assets/dist'
gulp copy
```

## Tests

```bash
npm test
```


## License

MIT.

If you find value in this, [please consider donating a dollar](https://medium.com/@BrunoBernardino/if-i-ve-helped-you-consider-donating-86952f22e3b4).
