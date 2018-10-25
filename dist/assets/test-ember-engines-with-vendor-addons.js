"use strict";



define('test-ember-engines-with-vendor-addons/app', ['exports', 'test-ember-engines-with-vendor-addons/resolver', 'ember-load-initializers', 'test-ember-engines-with-vendor-addons/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('test-ember-engines-with-vendor-addons/components/lazy-mount/component', ['exports', 'ember-lazy-mount/components/lazy-mount/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/components/link-to-external', ['exports', 'ember-engines/components/link-to-external-component'], function (exports, _linkToExternalComponent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkToExternalComponent.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/config/asset-manifest', ['exports', 'require', 'test-ember-engines-with-vendor-addons/config/environment'], function (exports, _require2, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const modulePrefix = _environment.default.modulePrefix;
  const metaName = `${modulePrefix}/config/asset-manifest`;
  const nodeName = `${modulePrefix}/config/node-asset-manifest`;

  let config = {};

  try {
    // If we have a Node version of the asset manifest, use that for FastBoot and
    // similar environments.
    if (_require2.default.has(nodeName)) {
      config = (0, _require2.default)(nodeName).default; // eslint-disable-line
    } else {
      const rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
      config = JSON.parse(unescape(rawConfig));
    }
  } catch (err) {
    throw new Error('Failed to load asset manifest. For browser environments, verify the meta tag with name "' + metaName + '" is present. For non-browser environments, verify that you included the node-asset-manifest module.');
  }

  exports.default = config;
});
define('test-ember-engines-with-vendor-addons/helpers/app-version', ['exports', 'test-ember-engines-with-vendor-addons/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  function appVersion(_, hash = {}) {
    const version = _environment.default.APP.version;
    // e.g. 1.0.0-alpha.1+4jds75hf

    // Allow use of 'hideSha' and 'hideVersion' For backwards compatibility
    let versionOnly = hash.versionOnly || hash.hideSha;
    let shaOnly = hash.shaOnly || hash.hideVersion;

    let match = null;

    if (versionOnly) {
      if (hash.showExtended) {
        match = version.match(_regexp.versionExtendedRegExp); // 1.0.0-alpha.1
      }
      // Fallback to just version
      if (!match) {
        match = version.match(_regexp.versionRegExp); // 1.0.0
      }
    }

    if (shaOnly) {
      match = version.match(_regexp.shaRegExp); // 4jds75hf
    }

    return match ? match[0] : version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('test-ember-engines-with-vendor-addons/helpers/cancel-all', ['exports', 'ember-concurrency/helpers/cancel-all'], function (exports, _cancelAll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _cancelAll.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/helpers/perform', ['exports', 'ember-concurrency/helpers/perform'], function (exports, _perform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _perform.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('test-ember-engines-with-vendor-addons/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('test-ember-engines-with-vendor-addons/helpers/task', ['exports', 'ember-concurrency/helpers/task'], function (exports, _task) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _task.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'test-ember-engines-with-vendor-addons/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('test-ember-engines-with-vendor-addons/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('test-ember-engines-with-vendor-addons/initializers/ember-concurrency', ['exports', 'ember-concurrency/initializers/ember-concurrency'], function (exports, _emberConcurrency) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberConcurrency.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('test-ember-engines-with-vendor-addons/initializers/engines', ['exports', 'ember-engines/initializers/engines'], function (exports, _engines) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _engines.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _engines.initialize;
    }
  });
});
define('test-ember-engines-with-vendor-addons/initializers/export-application-global', ['exports', 'test-ember-engines-with-vendor-addons/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define("test-ember-engines-with-vendor-addons/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('test-ember-engines-with-vendor-addons/instance-initializers/load-asset-manifest', ['exports', 'test-ember-engines-with-vendor-addons/config/asset-manifest'], function (exports, _assetManifest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;


  /**
   * Initializes the AssetLoader service with a generated asset-manifest.
   */
  function initialize(instance) {
    const service = instance.lookup('service:asset-loader');
    service.pushManifest(_assetManifest.default);
  }

  exports.default = {
    name: 'load-asset-manifest',
    initialize
  };
});
define('test-ember-engines-with-vendor-addons/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('test-ember-engines-with-vendor-addons/router', ['exports', 'test-ember-engines-with-vendor-addons/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.mount('souce-code-editor');
  });

  exports.default = Router;
});
define('test-ember-engines-with-vendor-addons/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/services/asset-loader', ['exports', 'ember-asset-loader/services/asset-loader'], function (exports, _assetLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _assetLoader.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/services/engine-loader', ['exports', 'ember-lazy-mount/services/engine-loader'], function (exports, _engineLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _engineLoader.default;
    }
  });
});
define('test-ember-engines-with-vendor-addons/source-code-editor/tests/addon.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | addon');

  QUnit.test('addon/engine.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/engine.js should pass ESLint\n\n');
  });

  QUnit.test('addon/resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/resolver.js should pass ESLint\n\n');
  });

  QUnit.test('addon/routes.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'addon/routes.js should pass ESLint\n\n');
  });
});
define("test-ember-engines-with-vendor-addons/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "tgaNRy3h", "block": "{\"symbols\":[\"engine\"],\"statements\":[[4,\"lazy-mount\",[\"source-code-editor\"],null,{\"statements\":[[4,\"if\",[[19,1,[\"isLoading\"]]],null,{\"statements\":[[0,\"    🕑 The engine is loading...\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[19,1,[\"error\"]]],null,{\"statements\":[[0,\"    😨 There was an error loading the engine:\\n    \"],[6,\"code\"],[7],[1,[19,1,[\"error\"]],false],[8],[0,\"\\n  \"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "test-ember-engines-with-vendor-addons/templates/application.hbs" } });
});


define('test-ember-engines-with-vendor-addons/config/environment', [], function() {
  var prefix = 'test-ember-engines-with-vendor-addons';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("test-ember-engines-with-vendor-addons/app")["default"].create({"name":"test-ember-engines-with-vendor-addons","version":"0.0.0+18d173af"});
}
//# sourceMappingURL=test-ember-engines-with-vendor-addons.map
