define.alias("ember-ace/components/ember-ace-completion-tooltip", "source-code-editor/components/ember-ace-completion-tooltip");
define.alias("ember-ace/components/ember-ace", "source-code-editor/components/ember-ace");
define("source-code-editor/config/environment", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var config;

  try {
    var metaName = 'source-code-editor/config/environment';
    var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
    config = JSON.parse(unescape(rawConfig));
  } catch (err) {
    throw new Error('Could not read config from meta tag with name "' + metaName + '" due to error: ' + err);
  }

  var _default = config;
  _exports.default = _default;
});
define("source-code-editor/engine", ["exports", "ember-engines/engine", "ember-load-initializers", "source-code-editor/resolver", "source-code-editor/config/environment"], function (_exports, _engine, _emberLoadInitializers, _resolver, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  const {
    modulePrefix
  } = _environment.default;

  const Eng = _engine.default.extend({
    modulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(Eng, modulePrefix);
  var _default = Eng;
  _exports.default = _default;
});
define("source-code-editor/resolver", ["exports", "ember-resolver"], function (_exports, _emberResolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = _emberResolver.default;
  _exports.default = _default;
});
define("source-code-editor/templates/application", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = Ember.HTMLBars.template({ "id": "l852b5gP", "block": "{\"symbols\":[],\"statements\":[[6,\"style\"],[7],[0,\"\\n  body { font-family: sans-serif; }\\n  code { background: #dedede; }\\n\"],[8],[0,\"\\n\\n\"],[6,\"h1\"],[7],[0,\"Hello World from the Engine\"],[8],[0,\"\\n\\n\"],[6,\"h3\"],[7],[0,\"About\"],[8],[0,\"\\n\"],[6,\"p\"],[7],[0,\"This example demonstrates a possible issue with ember-engines or the asset pipeline.\"],[8],[0,\"\\n\\n\"],[6,\"h3\"],[7],[0,\"What has been done?\"],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[0,\"Fresh ember ~3.0.0 project that uses ember engines and ember-lazy-mount to mount an inrepo engine called 'source-code-editor'. The engine is set to \"],[6,\"code\"],[7],[0,\"lazyLoad: true\"],[8],[0,\" and the loading is successful if you can see the ember-ace source-code-editor at the bottom of the page. ember-ace has been added to the dependencies in the inrepo engine.\"],[8],[0,\"\\n\\n\"],[6,\"h3\"],[7],[0,\"Expected behaviour\"],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[0,\"\\n  All ember-ace related javascript code is added to dist/engines-dist/source-code-editor/assets/engine-vendor.js. The huge javascript files can be lazily loaded when users demand the functionality.\\n\"],[8],[0,\"\\n\\n\"],[6,\"h3\"],[7],[0,\"Actual behaviour\"],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[0,\"\\n  \"],[6,\"ul\"],[7],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      The ace.js related javascript files are added to \"],[6,\"em\"],[7],[0,\"dist/vendor.js\"],[8],[0,\" (size increase from 2.9M to 3.6M)\\n    \"],[8],[0,\"\\n    \"],[6,\"li\"],[7],[0,\"\\n      The ember-ace related javascript code is added to \"],[6,\"em\"],[7],[0,\"dist/engines-dist/source-code-editor/assets/engine-vendor.js\"],[8],[0,\" (size increase from 39B to 11K)\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[6,\"hr\"],[7],[8],[0,\"\\n\\n\"],[1,[25,\"ember-ace\",null,[[\"lines\",\"value\",\"update\"],[10,[20,[\"value\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "source-code-editor/templates/application.hbs" } });
});//# sourceMappingURL=engine.map
