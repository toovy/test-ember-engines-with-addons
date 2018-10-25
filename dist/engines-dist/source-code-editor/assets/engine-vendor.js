define('ember-ace/components/ember-ace-completion-tooltip', ['exports', 'ember-ace/templates/components/ember-ace-completion-tooltip'], function (exports, _emberAceCompletionTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _emberAceCompletionTooltip.default,
    tagName: ''
  });
});
define('ember-ace/components/ember-ace', ['exports', 'ember-ace/utils/completion-manager', 'ember-ace/templates/components/ember-ace', 'ember-ace'], function (exports, _completionManager, _emberAce, _emberAce2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _emberAce.default,

    mode: undefined,
    theme: undefined,
    useSoftTabs: true,
    tabSize: 2,
    useWrapMode: false,
    highlightActiveLine: true,
    showPrintMargin: true,
    printMarginColumn: 80,
    showInvisibles: false,
    readOnly: false,
    showLineNumbers: true,
    showGutter: true,

    maxLines: undefined,
    minLines: undefined,

    enableDefaultAutocompletion: false,
    enableLiveAutocompletion: undefined,
    enableBasicAutocompletion: Ember.computed('enableDefaultAutocompletion', 'suggestCompletions', function () {
      const enableDefault = this.get('enableDefaultAutocompletion');
      const suggestCompletions = this.get('suggestCompletions');
      if (enableDefault || suggestCompletions) {
        return HAS_LANGUAGE_TOOLS || emitLanguageToolsWarning();
      }
    }),

    lines: Ember.computed({
      set(key, value) {
        this.set('minLines', value);
        this.set('maxLines', value);
      }
    }),

    overlays: Ember.computed(() => []),

    markers: Ember.computed('overlays.[]', function () {
      const overlays = this.get('overlays') || [];
      return overlays.map(overlay => ({
        class: `ember-ace-${overlay.type} ${overlay.class || ''}`,
        range: overlay.range,
        inFront: overlay.hasOwnProperty('inFront') ? overlay.inFront : true
      }));
    }),

    annotations: Ember.computed('overlays.[]', function () {
      const overlays = this.get('overlays') || [];
      return overlays.map(overlay => ({
        type: overlay.type,
        text: overlay.text,
        row: overlay.range.start.row
      }));
    }),

    init() {
      this._super(...arguments);
      this._silenceUpdates = false;
    },

    didInsertElement() {
      this._super();
      this._instantiateEditor();
    },

    willDestroyElement() {
      this._super();
      this._destroyEditor();
    },

    didReceiveAttrs() {
      this._super();
      this._syncAceProperties();
    },

    _instantiateEditor() {
      const editor = this.editor = _emberAce2.default.edit(this.element.querySelector('[data-ember-ace]'));

      this._syncAceProperties();

      // Avoid a deprecation warning from Ace
      editor.$blockScrolling = Infinity;
      editor.completers = this._buildCompleters(editor);

      const originalSetValue = editor.setValue;
      editor.setValue = (...args) => {
        const update = this.get('update');

        // Ace implements document.setValue by first removing and then inserting,
        // so silence regular updates here, and instead call update directly
        this._withUpdatesSilenced(() => {
          originalSetValue.call(editor, ...args);
        });

        if (update && !this._silenceUpdates) {
          Ember.run(() => update(editor.session.getValue()));
        }
      };

      editor.getSession().on('change', (event, session) => {
        const update = this.get('update');

        if (update && !this._silenceUpdates) {
          Ember.run(() => update(session.getValue()));
        }
      });

      if (this.get('ready')) {
        this.get('ready')(editor);
      }
    },

    _syncAceProperties() {
      if (!this.editor) return;

      const oldValues = this.getWithDefault('_previousAceValues', {});
      const newValues = this.getProperties(ACE_PROPERTIES);

      this.set('_previousAceValues', newValues);

      // Don't trigger the update action as a result of value syncing
      this._withUpdatesSilenced(() => {
        Object.keys(newValues).forEach(key => {
          if (oldValues[key] !== newValues[key]) {
            this._syncAceProperty(key, newValues[key]);
          }
        });
      });

      // Render within this run loop, for consistency with Ember's normal component rendering flow
      Ember.run.scheduleOnce('render', this, () => this.editor.renderer.updateFull(true));
    },

    _syncAceProperty(key, value) {
      const handler = ACE_HANDLERS[key];
      const { editor } = this;

      if (handler === 'editor') {
        editor.setOption(key, value);
      } else if (handler === 'session') {
        editor.session.setOption(key, value);
      } else if (handler === 'renderer') {
        editor.renderer.setOption(key, value);
      } else if (typeof handler === 'function') {
        handler.call(this, editor, value);
      }
    },

    _withUpdatesSilenced(callback) {
      const previous = this._silenceUpdates;
      try {
        this._silenceUpdates = true;
        callback();
      } finally {
        this._silenceUpdates = previous;
      }
    },

    _buildCompleters(editor) {
      const includeDefaults = this.get('enableDefaultAutocompletion');
      const completers = includeDefaults && editor.completers || [];
      return [this._buildCompletionManager(), ...completers];
    },

    _buildCompletionManager() {
      const suggestCompletions = (...params) => Ember.run(() => Ember.tryInvoke(this, 'suggestCompletions', params));
      const renderCompletionTooltip = suggestion => {
        Ember.run(() => this.set('suggestionToRender', suggestion));
        const rendered = this.element.querySelector('[data-rendered-suggestion]');
        const html = rendered ? rendered.innerHTML.trim() : null;
        Ember.run(() => this.set('suggestionToRender', null));
        return html;
      };

      return new _completionManager.default({ suggestCompletions, renderCompletionTooltip });
    },

    _destroyEditor() {
      if (this.editor) {
        const { completer } = this.editor;
        if (completer) {
          // autocomplete options may have been initialized without a popup ever rendering
          if (completer.popup) {
            completer.popup.container.remove();
            completer.popup.destroy();
          }
          completer.detach();
        }

        this.editor.destroy();
        this.editor = null;
      }
    }
  });


  const ACE_HANDLERS = Object.freeze({
    theme: 'editor',
    highlightActiveLine: 'editor',
    showInvisibles: 'editor',
    showPrintMargin: 'editor',
    printMarginColumn: 'editor',
    readOnly: 'editor',
    minLines: 'editor',
    maxLines: 'editor',
    showLineNumbers: 'editor',

    enableBasicAutocompletion: 'editor',
    enableLiveAutocompletion: 'editor',

    tabSize: 'session',
    useSoftTabs: 'session',

    showGutter: 'renderer',

    markers(editor, newValue) {
      (this._markerIds || []).forEach(id => editor.session.removeMarker(id));

      if (!newValue) return;

      this._markerIds = newValue.map(({ range, class: className, type = 'text', inFront = true }) => {
        return editor.session.addMarker(range, className, type, inFront);
      });
    },

    annotations(editor, newValue) {
      Ember.run.schedule('render', this, () => editor.session.setAnnotations(newValue));
    },

    useWrapMode(editor, newValue) {
      editor.session.setUseWrapMode(newValue);
    },

    mode(editor, newValue) {
      editor.session.setMode(newValue);
    },

    value(editor, newValue) {
      if (editor.getValue() !== newValue) {
        editor.setValue(newValue, -1);
      }
    }
  });

  const ACE_PROPERTIES = Object.freeze(Object.keys(ACE_HANDLERS));
  const HAS_LANGUAGE_TOOLS = !!_emberAce2.default.require('ace/ext/language_tools');

  function emitLanguageToolsWarning() {
    (true && Ember.warn("You've defined a `suggestCompletions` action, but the `language_tools` extension isn't present. " + "To use autocomplete, you must have `exts: ['language_tools']` in your ember-ace build config.", false, { id: 'ember-ace.missing-language-tools' }));
  }
});
define('ember-ace/index', ['exports', 'ember-ace/worker-manifest'], function (exports, _workerManifest) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TextHighlightRules = exports.TextMode = exports.Range = exports.Tokenizer = undefined;
  exports.default = ace;
  const Tokenizer = exports.Tokenizer = ace.require('ace/tokenizer').Tokenizer;
  const Range = exports.Range = ace.require('ace/range').Range;

  const TextMode = exports.TextMode = ace.require('ace/mode/text').Mode;
  const TextHighlightRules = exports.TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules;

  const config = ace.require('ace/config');
  Object.keys(_workerManifest.default).forEach(key => {
    config.setModuleUrl(key, _workerManifest.default[key]);
  });
});
define("ember-ace/templates/components/ember-ace-completion-tooltip", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = Ember.HTMLBars.template({ "id": "cXc19eID", "block": "{\"symbols\":[\"&default\"],\"statements\":[[4,\"if\",[[20,[\"suggestion\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"data-rendered-suggestion\",\"\"],[7],[11,1,[[20,[\"suggestion\"]]]],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-ace/templates/components/ember-ace-completion-tooltip.hbs" } });
});
define("ember-ace/templates/components/ember-ace", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = Ember.HTMLBars.template({ "id": "91+Tj4ZX", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"pre\"],[9,\"data-ember-ace\",\"\"],[10,\"class\",[18,\"editorClass\"],null],[7],[8],[0,\"\\n\\n\"],[11,1,[[25,\"hash\",null,[[\"completion-tooltip\"],[[25,\"component\",[\"ember-ace-completion-tooltip\"],[[\"suggestion\"],[[20,[\"suggestionToRender\"]]]]]]]]]],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "ember-ace/templates/components/ember-ace.hbs" } });
});
define('ember-ace/utils/completion-manager', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  /**
   * Supports Ace's interface for supplying completion information.
   *
   * @private
   * @class CompletionManager
   */
  class CompletionManager {
    constructor({ suggestCompletions, renderCompletionTooltip }) {
      this._suggestCompletions = suggestCompletions;
      this._renderCompletionTooltip = renderCompletionTooltip;
    }

    // Called by Ace when
    getCompletions(editor, session, position, prefix, callback) {
      const suggestCompletions = this._suggestCompletions;
      if (!suggestCompletions) return callback(null, []);

      let promise;
      try {
        promise = Ember.run(() => suggestCompletions(editor, session, position, prefix));
      } catch (error) {
        promise = Ember.RSVP.reject(error);
      }

      Ember.RSVP.resolve(promise).then(results => callback(null, results)).catch(error => callback(error));
    }

    getDocTooltip(result) {
      result.docHTML = this._renderCompletionTooltip.call(null, result);
    }
  }
  exports.default = CompletionManager;
});
define("ember-ace/worker-manifest", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {};
});//# sourceMappingURL=engine-vendor.map
