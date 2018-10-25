### Getting started

This is an ember project. To run it:

- clone it
- cd into the project
- run `$ npm install`
- run `$ cd lib/source-code-editor/ && npm install && cd ../..`
- run `$ ember s`
- open http://localhost:4200
- the readme below outlines what the ember app does

### About

This example demonstrates a possible issue with ember-engines or the asset pipeline.

### What has been done?

Fresh ember ~3.0.0 project that uses ember engines and ember-lazy-mount to mount an inrepo engine called 'source-code-editor'. The engine is set to `lazyLoad: true` and the loading is successful if you can see the ember-ace source-code-editor at the bottom of the page. ember-ace has been added to the dependencies in the inrepo engine.

### Expected behaviour

All ember-ace related javascript code is added to dist/engines-dist/source-code-editor/assets/engine-vendor.js. The huge javascript files can be lazily loaded when users demand the functionality.

### Actual behaviour

*   The ace.js related javascript files are added to _dist/vendor.js_ (size increase from 2.9M to 3.6M)
*   The ember-ace related javascript code is added to _dist/engines-dist/source-code-editor/assets/engine-vendor.js_ (size increase from 39B to 11K)

* * *

# test-ember-engines-with-addons

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd test-ember-engines-with-vendor-addons`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
