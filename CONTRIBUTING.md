# Contributing

Here are some guidelines on contributing to this project.

## Project organisation

All your code should be written inside the `app` folder. There you will find four different folders:

* `src` to save all your application code;
* `spec` for the Jasmine written application specs;
* `config` for the configuration files (like RequireJS);
* `vendor` a place to put third-party libraries (that is where the bower packages will be installed).

As it makes the assumption that you are building a Single Page Application, you will find single `index.html`, `index.scss` and `index.js` files.

## Managing front-end dependencies

The front-end dependencies can be installed via [Bower](http://bower.io).

To install [Bourbon](http://bourbon.io) for example, which is a great SCSS mixing library, you can do:

```shell
bower install --save bourbon
```

Then you can import it in your application's scss (`index.scss` for example):

```scss
@import 'vendor/bower_components/bourbon/app/assets/stylesheets/bourbon';
```

For JavaScript libraries, like [jQuery](http://jquery.com), you can start with the same bower command:

```shell
bower install --save query
```

And latter, as we are using [RequireJS](http://requirejs.org), we must tell the application how to load jQuery.

Under the `app/config` folder there is a file called `require_config.js`. It is used to define [RequireJS configuration parameters](http://requirejs.org/docs/api.html#config).

Although it is a little different from a vanilla RequireJS configuration file, its complexity is to allow its load in the most diverse scenarios: like during a test execution by the [Karma Runner](http://karma-runner.github.io), during build time and during application execution in the browser.

To add the new jQuery dependency, simply add a new path entry, pointing to the locating of the `jquery.js` file.

```js
/**
  Actual RequireJS config.
  You need only to perform changes here.
 */
var config = {
  baseUrl: '',
  paths: {
    'jquery': 'vendor/bower_components/jquery/jquery'
  }
};
```

Since jquery is an AMD module, there is nothing left to configure, but if you are loading another library which doesn't have AMD support you will also need to add a [shim configuration](http://requirejs.org/docs/api.html#config-shim).

If jquery didn't come with AMD support, we would also need to add the shim entry for it:

```js
/**
  Actual RequireJS config.
  You need only to perform changes here.
 */
var config = {
  baseUrl: '',
  paths: {
    'jquery': 'vendor/bower_components/jquery/jquery'
  },
  shims: {
    exports: 'jquery'
  }
};
```

For more information on loading non-AMD modules, take a look at the [RequireJS documentation](http://requirejs.org/docs/api.html#config-shim).

## Development task

To start development in your shiny new application start up the grunt **dev** task.

```shell
grunt dev
```

It will start up a server with live-reload at [http://0.0.0.0:8000/](http://0.0.0.0:8000/). So once the [live-reload pluggin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei) is installed, any change in the code base will be automatically reflected in the browser.


## Build

Build will run the [RequireJS optimiser](http://requirejs.org/docs/optimization.html) and compile all the SCSS files. Execute it by:

```shell
grunt
```

The build will process the application code and assets and compile them under the `build` folder.

Once built, you should be able to distribute your app by the contents of the `build` folder.

## SCSS Bower dependencies support

Although SCSS does not support importing regular CSS files at the time, the support of loading Bower components CSS dependencies was implemented via a custom grunt task that copies all CSS files under the `bower_components` directory to SCSS extension.

The copy task gets executer as a bower `postinstall` script.

## Testing

Testing is very important in today's application development, so it must be easy and integrated in the development workflow to not be left behind.

The default task, which performs the build also executes the tests. But during development you can have the tests executing on any file change by using the **watch_spec** task.

```shell
grunt watch_spec
```

This will start the Karma runner and run all the specs located at the **spec** folder.

The tests are to be written using [Jasmine](http://jasmine.github.io/1.3/introduction.html).
