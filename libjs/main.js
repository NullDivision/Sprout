System.registerDynamic("npm:fbjs@0.2.1/lib/invariant.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    "use strict";
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if ("production" !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error('Invariant Violation: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-tap-event-plugin@1.0.0/src/defaultClickRejectionStrategy.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(lastTouchEvent, clickTimestamp) {
    if (lastTouchEvent && (clickTimestamp - lastTouchEvent) < 750) {
      return true;
    }
  };
  return module.exports;
});

System.registerDynamic("npm:react-tap-event-plugin@1.0.0/src/TouchEventUtils.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TouchEventUtils = {extractSingleTouch: function(nativeEvent) {
      var touches = nativeEvent.touches;
      var changedTouches = nativeEvent.changedTouches;
      var hasTouches = touches && touches.length > 0;
      var hasChangedTouches = changedTouches && changedTouches.length > 0;
      return !hasTouches && hasChangedTouches ? changedTouches[0] : hasTouches ? touches[0] : nativeEvent;
    }};
  module.exports = TouchEventUtils;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.2.1/lib/keyOf.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyOf = function(oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };
  module.exports = keyOf;
  return module.exports;
});

System.registerDynamic("npm:react-tap-event-plugin@1.0.0/src/TapEventPlugin.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPluginUtils.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:react@15.2.1/lib/SyntheticUIEvent.js", "npm:react-tap-event-plugin@1.0.0/src/TouchEventUtils.js", "npm:react@15.2.1/lib/ViewportMetrics.js", "npm:fbjs@0.2.1/lib/keyOf.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
  var EventPluginUtils = $__require('npm:react@15.2.1/lib/EventPluginUtils.js');
  var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
  var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
  var TouchEventUtils = $__require('npm:react-tap-event-plugin@1.0.0/src/TouchEventUtils.js');
  var ViewportMetrics = $__require('npm:react@15.2.1/lib/ViewportMetrics.js');
  var keyOf = $__require('npm:fbjs@0.2.1/lib/keyOf.js');
  var topLevelTypes = EventConstants.topLevelTypes;
  var isStartish = EventPluginUtils.isStartish;
  var isEndish = EventPluginUtils.isEndish;
  var isTouch = function(topLevelType) {
    var touchTypes = [topLevelTypes.topTouchCancel, topLevelTypes.topTouchEnd, topLevelTypes.topTouchStart, topLevelTypes.topTouchMove];
    return touchTypes.indexOf(topLevelType) >= 0;
  };
  var tapMoveThreshold = 10;
  var ignoreMouseThreshold = 750;
  var startCoords = {
    x: null,
    y: null
  };
  var lastTouchEvent = null;
  var Axis = {
    x: {
      page: 'pageX',
      client: 'clientX',
      envScroll: 'currentPageScrollLeft'
    },
    y: {
      page: 'pageY',
      client: 'clientY',
      envScroll: 'currentPageScrollTop'
    }
  };
  function getAxisCoordOfEvent(axis, nativeEvent) {
    var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
    if (singleTouch) {
      return singleTouch[axis.page];
    }
    return axis.page in nativeEvent ? nativeEvent[axis.page] : nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
  }
  function getDistance(coords, nativeEvent) {
    var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
    var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
    return Math.pow(Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2), 0.5);
  }
  var touchEvents = [topLevelTypes.topTouchStart, topLevelTypes.topTouchCancel, topLevelTypes.topTouchEnd, topLevelTypes.topTouchMove];
  var dependencies = [topLevelTypes.topMouseDown, topLevelTypes.topMouseMove, topLevelTypes.topMouseUp].concat(touchEvents);
  var eventTypes = {touchTap: {
      phasedRegistrationNames: {
        bubbled: keyOf({onTouchTap: null}),
        captured: keyOf({onTouchTapCapture: null})
      },
      dependencies: dependencies
    }};
  var now = (function() {
    if (Date.now) {
      return Date.now;
    } else {
      return function() {
        return +new Date;
      };
    }
  })();
  function createTapEventPlugin(shouldRejectClick) {
    return {
      tapMoveThreshold: tapMoveThreshold,
      ignoreMouseThreshold: ignoreMouseThreshold,
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        if (isTouch(topLevelType)) {
          lastTouchEvent = now();
        } else {
          if (shouldRejectClick(lastTouchEvent, now())) {
            return null;
          }
        }
        if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
          return null;
        }
        var event = null;
        var distance = getDistance(startCoords, nativeEvent);
        if (isEndish(topLevelType) && distance < tapMoveThreshold) {
          event = SyntheticUIEvent.getPooled(eventTypes.touchTap, targetInst, nativeEvent, nativeEventTarget);
        }
        if (isStartish(topLevelType)) {
          startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
          startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
        } else if (isEndish(topLevelType)) {
          startCoords.x = 0;
          startCoords.y = 0;
        }
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      }
    };
  }
  module.exports = createTapEventPlugin;
  return module.exports;
});

System.registerDynamic("npm:react-tap-event-plugin@1.0.0/src/injectTapEventPlugin.js", ["npm:fbjs@0.2.1/lib/invariant.js", "npm:react-tap-event-plugin@1.0.0/src/defaultClickRejectionStrategy.js", "npm:react@15.2.1/lib/EventPluginHub.js", "npm:react-tap-event-plugin@1.0.0/src/TapEventPlugin.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    var invariant = $__require('npm:fbjs@0.2.1/lib/invariant.js');
    var defaultClickRejectionStrategy = $__require('npm:react-tap-event-plugin@1.0.0/src/defaultClickRejectionStrategy.js');
    var alreadyInjected = false;
    module.exports = function injectTapEventPlugin(strategyOverrides) {
      strategyOverrides = strategyOverrides || {};
      var shouldRejectClick = strategyOverrides.shouldRejectClick || defaultClickRejectionStrategy;
      if ("production" !== 'production') {
        invariant(!alreadyInjected, 'injectTapEventPlugin(): Can only be called once per application lifecycle.\n\n\
It is recommended to call injectTapEventPlugin() just before you call \
ReactDOM.render(). If you are using an external library which calls injectTapEventPlugin() \
itself, please contact the maintainer as it shouldn\'t be called in library code and \
should be injected by the application.');
      }
      alreadyInjected = true;
      $__require('npm:react@15.2.1/lib/EventPluginHub.js').injection.injectEventPluginsByName({'TapEventPlugin': $__require('npm:react-tap-event-plugin@1.0.0/src/TapEventPlugin.js')(shouldRejectClick)});
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-tap-event-plugin@1.0.0.js", ["npm:react-tap-event-plugin@1.0.0/src/injectTapEventPlugin.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react-tap-event-plugin@1.0.0/src/injectTapEventPlugin.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/events.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    once: function once(el, type, callback) {
      var typeArray = type ? type.split(' ') : [];
      var recursiveFunction = function recursiveFunction(event) {
        event.target.removeEventListener(event.type, recursiveFunction);
        return callback(event);
      };
      for (var i = typeArray.length - 1; i >= 0; i--) {
        this.on(el, typeArray[i], recursiveFunction);
      }
    },
    on: function on(el, type, callback) {
      if (el.addEventListener) {
        el.addEventListener(type, callback);
      } else {
        el.attachEvent('on' + type, function() {
          callback.call(el);
        });
      }
    },
    off: function off(el, type, callback) {
      if (el.removeEventListener) {
        el.removeEventListener(type, callback);
      } else {
        el.detachEvent('on' + type, callback);
      }
    },
    isKeyboard: function isKeyboard(event) {
      return ['keydown', 'keypress', 'keyup'].indexOf(event.type) !== -1;
    }
  };
  return module.exports;
});

System.registerDynamic("npm:keycode@2.1.2/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports = module.exports = function(searchInput) {
    if (searchInput && 'object' === typeof searchInput) {
      var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode;
      if (hasKeyCode)
        searchInput = hasKeyCode;
    }
    if ('number' === typeof searchInput)
      return names[searchInput];
    var search = String(searchInput);
    var foundNamedKey = codes[search.toLowerCase()];
    if (foundNamedKey)
      return foundNamedKey;
    var foundNamedKey = aliases[search.toLowerCase()];
    if (foundNamedKey)
      return foundNamedKey;
    if (search.length === 1)
      return search.charCodeAt(0);
    return undefined;
  };
  var codes = exports.code = exports.codes = {
    'backspace': 8,
    'tab': 9,
    'enter': 13,
    'shift': 16,
    'ctrl': 17,
    'alt': 18,
    'pause/break': 19,
    'caps lock': 20,
    'esc': 27,
    'space': 32,
    'page up': 33,
    'page down': 34,
    'end': 35,
    'home': 36,
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'insert': 45,
    'delete': 46,
    'command': 91,
    'left command': 91,
    'right command': 93,
    'numpad *': 106,
    'numpad +': 107,
    'numpad -': 109,
    'numpad .': 110,
    'numpad /': 111,
    'num lock': 144,
    'scroll lock': 145,
    'my computer': 182,
    'my calculator': 183,
    ';': 186,
    '=': 187,
    ',': 188,
    '-': 189,
    '.': 190,
    '/': 191,
    '`': 192,
    '[': 219,
    '\\': 220,
    ']': 221,
    "'": 222
  };
  var aliases = exports.aliases = {
    'windows': 91,
    '⇧': 16,
    '⌥': 18,
    '⌃': 17,
    '⌘': 91,
    'ctl': 17,
    'control': 17,
    'option': 18,
    'pause': 19,
    'break': 19,
    'caps': 20,
    'return': 13,
    'escape': 27,
    'spc': 32,
    'pgup': 33,
    'pgdn': 34,
    'ins': 45,
    'del': 46,
    'cmd': 91
  };
  for (i = 97; i < 123; i++)
    codes[String.fromCharCode(i)] = i - 32;
  for (var i = 48; i < 58; i++)
    codes[i - 48] = i;
  for (i = 1; i < 13; i++)
    codes['f' + i] = i + 111;
  for (i = 0; i < 10; i++)
    codes['numpad ' + i] = i + 96;
  var names = exports.names = exports.title = {};
  for (i in codes)
    names[codes[i]] = i;
  for (var alias in aliases) {
    codes[alias] = aliases[alias];
  }
  return module.exports;
});

System.registerDynamic("npm:keycode@2.1.2.js", ["npm:keycode@2.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:keycode@2.1.2/index.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/ScaleInChild.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:react-dom@15.2.1.js", "npm:material-ui@0.15.2/utils/autoPrefix.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = $__require('npm:react-dom@15.2.1.js');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _autoPrefix = $__require('npm:material-ui@0.15.2/utils/autoPrefix.js');
  var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var ScaleInChild = function(_Component) {
    _inherits(ScaleInChild, _Component);
    function ScaleInChild() {
      _classCallCheck(this, ScaleInChild);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(ScaleInChild).apply(this, arguments));
    }
    _createClass(ScaleInChild, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
      }
    }, {
      key: 'componentWillAppear',
      value: function componentWillAppear(callback) {
        this.initializeAnimation(callback);
      }
    }, {
      key: 'componentWillEnter',
      value: function componentWillEnter(callback) {
        this.initializeAnimation(callback);
      }
    }, {
      key: 'componentDidAppear',
      value: function componentDidAppear() {
        this.animate();
      }
    }, {
      key: 'componentDidEnter',
      value: function componentDidEnter() {
        this.animate();
      }
    }, {
      key: 'componentWillLeave',
      value: function componentWillLeave(callback) {
        var style = _reactDom2.default.findDOMNode(this).style;
        style.opacity = '0';
        _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.minScale + ')');
        this.leaveTimer = setTimeout(callback, 450);
      }
    }, {
      key: 'animate',
      value: function animate() {
        var style = _reactDom2.default.findDOMNode(this).style;
        style.opacity = '1';
        _autoPrefix2.default.set(style, 'transform', 'scale(' + this.props.maxScale + ')');
      }
    }, {
      key: 'initializeAnimation',
      value: function initializeAnimation(callback) {
        var style = _reactDom2.default.findDOMNode(this).style;
        style.opacity = '0';
        _autoPrefix2.default.set(style, 'transform', 'scale(0)');
        this.enterTimer = setTimeout(callback, this.props.enterDelay);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var enterDelay = _props.enterDelay;
        var maxScale = _props.maxScale;
        var minScale = _props.minScale;
        var style = _props.style;
        var other = _objectWithoutProperties(_props, ['children', 'enterDelay', 'maxScale', 'minScale', 'style']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var mergedRootStyles = (0, _simpleAssign2.default)({}, {
          position: 'absolute',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
          transition: _transitions2.default.easeOut(null, ['transform', 'opacity'])
        }, style);
        return _react2.default.createElement('div', _extends({}, other, {style: prepareStyles(mergedRootStyles)}), children);
      }
    }]);
    return ScaleInChild;
  }(_react.Component);
  ScaleInChild.propTypes = {
    children: _react.PropTypes.node,
    enterDelay: _react.PropTypes.number,
    maxScale: _react.PropTypes.number,
    minScale: _react.PropTypes.number,
    style: _react.PropTypes.object
  };
  ScaleInChild.defaultProps = {
    enterDelay: 0,
    maxScale: 1,
    minScale: 0
  };
  ScaleInChild.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = ScaleInChild;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/ScaleIn.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:react-addons-transition-group@15.2.1.js", "npm:material-ui@0.15.2/internal/ScaleInChild.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactAddonsTransitionGroup = $__require('npm:react-addons-transition-group@15.2.1.js');
  var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);
  var _ScaleInChild = $__require('npm:material-ui@0.15.2/internal/ScaleInChild.js');
  var _ScaleInChild2 = _interopRequireDefault(_ScaleInChild);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var ScaleIn = function(_Component) {
    _inherits(ScaleIn, _Component);
    function ScaleIn() {
      _classCallCheck(this, ScaleIn);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(ScaleIn).apply(this, arguments));
    }
    _createClass(ScaleIn, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var childStyle = _props.childStyle;
        var enterDelay = _props.enterDelay;
        var maxScale = _props.maxScale;
        var minScale = _props.minScale;
        var style = _props.style;
        var other = _objectWithoutProperties(_props, ['children', 'childStyle', 'enterDelay', 'maxScale', 'minScale', 'style']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var mergedRootStyles = (0, _simpleAssign2.default)({}, {
          position: 'relative',
          overflow: 'hidden',
          height: '100%'
        }, style);
        var newChildren = _react2.default.Children.map(children, function(child) {
          return _react2.default.createElement(_ScaleInChild2.default, {
            key: child.key,
            enterDelay: enterDelay,
            maxScale: maxScale,
            minScale: minScale,
            style: childStyle
          }, child);
        });
        return _react2.default.createElement(_reactAddonsTransitionGroup2.default, _extends({}, other, {
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }), newChildren);
      }
    }]);
    return ScaleIn;
  }(_react.Component);
  ScaleIn.propTypes = {
    childStyle: _react.PropTypes.object,
    children: _react.PropTypes.node,
    enterDelay: _react.PropTypes.number,
    maxScale: _react.PropTypes.number,
    minScale: _react.PropTypes.number,
    style: _react.PropTypes.object
  };
  ScaleIn.defaultProps = {enterDelay: 0};
  ScaleIn.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = ScaleIn;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/FocusRipple.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:react-dom@15.2.1.js", "npm:recompose@0.20.2/shallowEqual.js", "npm:material-ui@0.15.2/utils/autoPrefix.js", "npm:material-ui@0.15.2/styles/transitions.js", "npm:material-ui@0.15.2/internal/ScaleIn.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = $__require('npm:react-dom@15.2.1.js');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _shallowEqual = $__require('npm:recompose@0.20.2/shallowEqual.js');
  var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
  var _autoPrefix = $__require('npm:material-ui@0.15.2/utils/autoPrefix.js');
  var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _ScaleIn = $__require('npm:material-ui@0.15.2/internal/ScaleIn.js');
  var _ScaleIn2 = _interopRequireDefault(_ScaleIn);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var pulsateDuration = 750;
  var FocusRipple = function(_Component) {
    _inherits(FocusRipple, _Component);
    function FocusRipple() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, FocusRipple);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FocusRipple)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.pulsate = function() {
        var innerCircle = _reactDom2.default.findDOMNode(_this.refs.innerCircle);
        if (!innerCircle)
          return;
        var startScale = 'scale(1)';
        var endScale = 'scale(0.85)';
        var currentScale = innerCircle.style.transform || startScale;
        var nextScale = currentScale === startScale ? endScale : startScale;
        _autoPrefix2.default.set(innerCircle.style, 'transform', nextScale);
        _this.timeout = setTimeout(_this.pulsate, pulsateDuration);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(FocusRipple, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.show) {
          this.setRippleSize();
          this.pulsate();
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _shallowEqual2.default)(this.props, nextProps) || !(0, _shallowEqual2.default)(this.state, nextState);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.props.show) {
          this.setRippleSize();
          this.pulsate();
        } else {
          if (this.timeout)
            clearTimeout(this.timeout);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.timeout);
      }
    }, {
      key: 'getRippleElement',
      value: function getRippleElement(props) {
        var color = props.color;
        var innerStyle = props.innerStyle;
        var opacity = props.opacity;
        var _context$muiTheme = this.context.muiTheme;
        var prepareStyles = _context$muiTheme.prepareStyles;
        var ripple = _context$muiTheme.ripple;
        var innerStyles = (0, _simpleAssign2.default)({
          position: 'absolute',
          height: '100%',
          width: '100%',
          borderRadius: '50%',
          opacity: opacity ? opacity : 0.16,
          backgroundColor: color || ripple.color,
          transition: _transitions2.default.easeOut(pulsateDuration + 'ms', 'transform', null, _transitions2.default.easeInOutFunction)
        }, innerStyle);
        return _react2.default.createElement('div', {
          ref: 'innerCircle',
          style: prepareStyles((0, _simpleAssign2.default)({}, innerStyles))
        });
      }
    }, {
      key: 'setRippleSize',
      value: function setRippleSize() {
        var el = _reactDom2.default.findDOMNode(this.refs.innerCircle);
        var height = el.offsetHeight;
        var width = el.offsetWidth;
        var size = Math.max(height, width);
        var oldTop = 0;
        if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
          oldTop = parseInt(el.style.top);
        }
        el.style.height = size + 'px';
        el.style.top = height / 2 - size / 2 + oldTop + 'px';
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var show = _props.show;
        var style = _props.style;
        var mergedRootStyles = (0, _simpleAssign2.default)({
          height: '100%',
          width: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }, style);
        var ripple = show ? this.getRippleElement(this.props) : null;
        return _react2.default.createElement(_ScaleIn2.default, {
          maxScale: 0.85,
          style: mergedRootStyles
        }, ripple);
      }
    }]);
    return FocusRipple;
  }(_react.Component);
  FocusRipple.propTypes = {
    color: _react.PropTypes.string,
    innerStyle: _react.PropTypes.object,
    opacity: _react.PropTypes.number,
    show: _react.PropTypes.bool,
    style: _react.PropTypes.object
  };
  FocusRipple.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = FocusRipple;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactTransitionChildMapping.js", ["npm:react@15.2.1/lib/flattenChildren.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var flattenChildren = $__require('npm:react@15.2.1/lib/flattenChildren.js');
    var ReactTransitionChildMapping = {
      getChildMapping: function(children, selfDebugID) {
        if (!children) {
          return children;
        }
        if ("production" !== 'production') {
          return flattenChildren(children, selfDebugID);
        }
        return flattenChildren(children);
      },
      mergeChildMappings: function(prev, next) {
        prev = prev || {};
        next = next || {};
        function getValueForKey(key) {
          if (next.hasOwnProperty(key)) {
            return next[key];
          } else {
            return prev[key];
          }
        }
        var nextKeysPending = {};
        var pendingKeys = [];
        for (var prevKey in prev) {
          if (next.hasOwnProperty(prevKey)) {
            if (pendingKeys.length) {
              nextKeysPending[prevKey] = pendingKeys;
              pendingKeys = [];
            }
          } else {
            pendingKeys.push(prevKey);
          }
        }
        var i;
        var childMapping = {};
        for (var nextKey in next) {
          if (nextKeysPending.hasOwnProperty(nextKey)) {
            for (i = 0; i < nextKeysPending[nextKey].length; i++) {
              var pendingNextKey = nextKeysPending[nextKey][i];
              childMapping[nextKeysPending[nextKey][i]] = getValueForKey(pendingNextKey);
            }
          }
          childMapping[nextKey] = getValueForKey(nextKey);
        }
        for (i = 0; i < pendingKeys.length; i++) {
          childMapping[pendingKeys[i]] = getValueForKey(pendingKeys[i]);
        }
        return childMapping;
      }
    };
    module.exports = ReactTransitionChildMapping;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactTransitionGroup.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/React.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/ReactTransitionChildMapping.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var React = $__require('npm:react@15.2.1/lib/React.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var ReactTransitionChildMapping = $__require('npm:react@15.2.1/lib/ReactTransitionChildMapping.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var ReactTransitionGroup = React.createClass({
      displayName: 'ReactTransitionGroup',
      propTypes: {
        component: React.PropTypes.any,
        childFactory: React.PropTypes.func
      },
      getDefaultProps: function() {
        return {
          component: 'span',
          childFactory: emptyFunction.thatReturnsArgument
        };
      },
      getInitialState: function() {
        return {children: ReactTransitionChildMapping.getChildMapping(this.props.children)};
      },
      componentWillMount: function() {
        this.currentlyTransitioningKeys = {};
        this.keysToEnter = [];
        this.keysToLeave = [];
      },
      componentDidMount: function() {
        var initialChildMapping = this.state.children;
        for (var key in initialChildMapping) {
          if (initialChildMapping[key]) {
            this.performAppear(key);
          }
        }
      },
      componentWillReceiveProps: function(nextProps) {
        var nextChildMapping;
        if ("production" !== 'production') {
          nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children, ReactInstanceMap.get(this)._debugID);
        } else {
          nextChildMapping = ReactTransitionChildMapping.getChildMapping(nextProps.children);
        }
        var prevChildMapping = this.state.children;
        this.setState({children: ReactTransitionChildMapping.mergeChildMappings(prevChildMapping, nextChildMapping)});
        var key;
        for (key in nextChildMapping) {
          var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
          if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
            this.keysToEnter.push(key);
          }
        }
        for (key in prevChildMapping) {
          var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
          if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
            this.keysToLeave.push(key);
          }
        }
      },
      componentDidUpdate: function() {
        var keysToEnter = this.keysToEnter;
        this.keysToEnter = [];
        keysToEnter.forEach(this.performEnter);
        var keysToLeave = this.keysToLeave;
        this.keysToLeave = [];
        keysToLeave.forEach(this.performLeave);
      },
      performAppear: function(key) {
        this.currentlyTransitioningKeys[key] = true;
        var component = this.refs[key];
        if (component.componentWillAppear) {
          component.componentWillAppear(this._handleDoneAppearing.bind(this, key));
        } else {
          this._handleDoneAppearing(key);
        }
      },
      _handleDoneAppearing: function(key) {
        var component = this.refs[key];
        if (component.componentDidAppear) {
          component.componentDidAppear();
        }
        delete this.currentlyTransitioningKeys[key];
        var currentChildMapping;
        if ("production" !== 'production') {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children, ReactInstanceMap.get(this)._debugID);
        } else {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
        }
        if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
          this.performLeave(key);
        }
      },
      performEnter: function(key) {
        this.currentlyTransitioningKeys[key] = true;
        var component = this.refs[key];
        if (component.componentWillEnter) {
          component.componentWillEnter(this._handleDoneEntering.bind(this, key));
        } else {
          this._handleDoneEntering(key);
        }
      },
      _handleDoneEntering: function(key) {
        var component = this.refs[key];
        if (component.componentDidEnter) {
          component.componentDidEnter();
        }
        delete this.currentlyTransitioningKeys[key];
        var currentChildMapping;
        if ("production" !== 'production') {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children, ReactInstanceMap.get(this)._debugID);
        } else {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
        }
        if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
          this.performLeave(key);
        }
      },
      performLeave: function(key) {
        this.currentlyTransitioningKeys[key] = true;
        var component = this.refs[key];
        if (component.componentWillLeave) {
          component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
        } else {
          this._handleDoneLeaving(key);
        }
      },
      _handleDoneLeaving: function(key) {
        var component = this.refs[key];
        if (component.componentDidLeave) {
          component.componentDidLeave();
        }
        delete this.currentlyTransitioningKeys[key];
        var currentChildMapping;
        if ("production" !== 'production') {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children, ReactInstanceMap.get(this)._debugID);
        } else {
          currentChildMapping = ReactTransitionChildMapping.getChildMapping(this.props.children);
        }
        if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
          this.performEnter(key);
        } else {
          this.setState(function(state) {
            var newChildren = _assign({}, state.children);
            delete newChildren[key];
            return {children: newChildren};
          });
        }
      },
      render: function() {
        var childrenToRender = [];
        for (var key in this.state.children) {
          var child = this.state.children[key];
          if (child) {
            childrenToRender.push(React.cloneElement(this.props.childFactory(child), {
              ref: key,
              key: key
            }));
          }
        }
        var props = _assign({}, this.props);
        delete props.transitionLeave;
        delete props.transitionName;
        delete props.transitionAppear;
        delete props.transitionEnter;
        delete props.childFactory;
        delete props.transitionLeaveTimeout;
        delete props.transitionEnterTimeout;
        delete props.transitionAppearTimeout;
        delete props.component;
        return React.createElement(this.props.component, props, childrenToRender);
      }
    });
    module.exports = ReactTransitionGroup;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-addons-transition-group@15.2.1/index.js", ["npm:react@15.2.1/lib/ReactTransitionGroup.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react@15.2.1/lib/ReactTransitionGroup.js');
  return module.exports;
});

System.registerDynamic("npm:react-addons-transition-group@15.2.1.js", ["npm:react-addons-transition-group@15.2.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react-addons-transition-group@15.2.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/dom.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    isDescendant: function isDescendant(parent, child) {
      var node = child.parentNode;
      while (node !== null) {
        if (node === parent)
          return true;
        node = node.parentNode;
      }
      return false;
    },
    offset: function offset(el) {
      var rect = el.getBoundingClientRect();
      return {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      };
    }
  };
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/FallbackCompositionState.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/getTextContentAccessor.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _assign = $__require('npm:object-assign@4.1.0.js');
  var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
  var getTextContentAccessor = $__require('npm:react@15.2.1/lib/getTextContentAccessor.js');
  function FallbackCompositionState(root) {
    this._root = root;
    this._startText = this.getText();
    this._fallbackText = null;
  }
  _assign(FallbackCompositionState.prototype, {
    destructor: function() {
      this._root = null;
      this._startText = null;
      this._fallbackText = null;
    },
    getText: function() {
      if ('value' in this._root) {
        return this._root.value;
      }
      return this._root[getTextContentAccessor()];
    },
    getData: function() {
      if (this._fallbackText) {
        return this._fallbackText;
      }
      var start;
      var startValue = this._startText;
      var startLength = startValue.length;
      var end;
      var endValue = this.getText();
      var endLength = endValue.length;
      for (start = 0; start < startLength; start++) {
        if (startValue[start] !== endValue[start]) {
          break;
        }
      }
      var minEnd = startLength - start;
      for (end = 1; end <= minEnd; end++) {
        if (startValue[startLength - end] !== endValue[endLength - end]) {
          break;
        }
      }
      var sliceTail = end > 1 ? 1 - end : undefined;
      this._fallbackText = endValue.slice(start, sliceTail);
      return this._fallbackText;
    }
  });
  PooledClass.addPoolingTo(FallbackCompositionState);
  module.exports = FallbackCompositionState;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticCompositionEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var CompositionEventInterface = {data: null};
  function SyntheticCompositionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticCompositionEvent, CompositionEventInterface);
  module.exports = SyntheticCompositionEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticInputEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var InputEventInterface = {data: null};
  function SyntheticInputEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticInputEvent, InputEventInterface);
  module.exports = SyntheticInputEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/BeforeInputEventPlugin.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/FallbackCompositionState.js", "npm:react@15.2.1/lib/SyntheticCompositionEvent.js", "npm:react@15.2.1/lib/SyntheticInputEvent.js", "npm:fbjs@0.8.3/lib/keyOf.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var FallbackCompositionState = $__require('npm:react@15.2.1/lib/FallbackCompositionState.js');
  var SyntheticCompositionEvent = $__require('npm:react@15.2.1/lib/SyntheticCompositionEvent.js');
  var SyntheticInputEvent = $__require('npm:react@15.2.1/lib/SyntheticInputEvent.js');
  var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
  var END_KEYCODES = [9, 13, 27, 32];
  var START_KEYCODE = 229;
  var canUseCompositionEvent = ExecutionEnvironment.canUseDOM && 'CompositionEvent' in window;
  var documentMode = null;
  if (ExecutionEnvironment.canUseDOM && 'documentMode' in document) {
    documentMode = document.documentMode;
  }
  var canUseTextInputEvent = ExecutionEnvironment.canUseDOM && 'TextEvent' in window && !documentMode && !isPresto();
  var useFallbackCompositionData = ExecutionEnvironment.canUseDOM && (!canUseCompositionEvent || documentMode && documentMode > 8 && documentMode <= 11);
  function isPresto() {
    var opera = window.opera;
    return typeof opera === 'object' && typeof opera.version === 'function' && parseInt(opera.version(), 10) <= 12;
  }
  var SPACEBAR_CODE = 32;
  var SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE);
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: keyOf({onBeforeInput: null}),
        captured: keyOf({onBeforeInputCapture: null})
      },
      dependencies: [topLevelTypes.topCompositionEnd, topLevelTypes.topKeyPress, topLevelTypes.topTextInput, topLevelTypes.topPaste]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionEnd: null}),
        captured: keyOf({onCompositionEndCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionEnd, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionStart: null}),
        captured: keyOf({onCompositionStartCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionStart, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: keyOf({onCompositionUpdate: null}),
        captured: keyOf({onCompositionUpdateCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topCompositionUpdate, topLevelTypes.topKeyDown, topLevelTypes.topKeyPress, topLevelTypes.topKeyUp, topLevelTypes.topMouseDown]
    }
  };
  var hasSpaceKeypress = false;
  function isKeypressCommand(nativeEvent) {
    return (nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) && !(nativeEvent.ctrlKey && nativeEvent.altKey);
  }
  function getCompositionEventType(topLevelType) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionStart:
        return eventTypes.compositionStart;
      case topLevelTypes.topCompositionEnd:
        return eventTypes.compositionEnd;
      case topLevelTypes.topCompositionUpdate:
        return eventTypes.compositionUpdate;
    }
  }
  function isFallbackCompositionStart(topLevelType, nativeEvent) {
    return topLevelType === topLevelTypes.topKeyDown && nativeEvent.keyCode === START_KEYCODE;
  }
  function isFallbackCompositionEnd(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topKeyUp:
        return END_KEYCODES.indexOf(nativeEvent.keyCode) !== -1;
      case topLevelTypes.topKeyDown:
        return nativeEvent.keyCode !== START_KEYCODE;
      case topLevelTypes.topKeyPress:
      case topLevelTypes.topMouseDown:
      case topLevelTypes.topBlur:
        return true;
      default:
        return false;
    }
  }
  function getDataFromCustomEvent(nativeEvent) {
    var detail = nativeEvent.detail;
    if (typeof detail === 'object' && 'data' in detail) {
      return detail.data;
    }
    return null;
  }
  var currentComposition = null;
  function extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var eventType;
    var fallbackData;
    if (canUseCompositionEvent) {
      eventType = getCompositionEventType(topLevelType);
    } else if (!currentComposition) {
      if (isFallbackCompositionStart(topLevelType, nativeEvent)) {
        eventType = eventTypes.compositionStart;
      }
    } else if (isFallbackCompositionEnd(topLevelType, nativeEvent)) {
      eventType = eventTypes.compositionEnd;
    }
    if (!eventType) {
      return null;
    }
    if (useFallbackCompositionData) {
      if (!currentComposition && eventType === eventTypes.compositionStart) {
        currentComposition = FallbackCompositionState.getPooled(nativeEventTarget);
      } else if (eventType === eventTypes.compositionEnd) {
        if (currentComposition) {
          fallbackData = currentComposition.getData();
        }
      }
    }
    var event = SyntheticCompositionEvent.getPooled(eventType, targetInst, nativeEvent, nativeEventTarget);
    if (fallbackData) {
      event.data = fallbackData;
    } else {
      var customData = getDataFromCustomEvent(nativeEvent);
      if (customData !== null) {
        event.data = customData;
      }
    }
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  function getNativeBeforeInputChars(topLevelType, nativeEvent) {
    switch (topLevelType) {
      case topLevelTypes.topCompositionEnd:
        return getDataFromCustomEvent(nativeEvent);
      case topLevelTypes.topKeyPress:
        var which = nativeEvent.which;
        if (which !== SPACEBAR_CODE) {
          return null;
        }
        hasSpaceKeypress = true;
        return SPACEBAR_CHAR;
      case topLevelTypes.topTextInput:
        var chars = nativeEvent.data;
        if (chars === SPACEBAR_CHAR && hasSpaceKeypress) {
          return null;
        }
        return chars;
      default:
        return null;
    }
  }
  function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
    if (currentComposition) {
      if (topLevelType === topLevelTypes.topCompositionEnd || isFallbackCompositionEnd(topLevelType, nativeEvent)) {
        var chars = currentComposition.getData();
        FallbackCompositionState.release(currentComposition);
        currentComposition = null;
        return chars;
      }
      return null;
    }
    switch (topLevelType) {
      case topLevelTypes.topPaste:
        return null;
      case topLevelTypes.topKeyPress:
        if (nativeEvent.which && !isKeypressCommand(nativeEvent)) {
          return String.fromCharCode(nativeEvent.which);
        }
        return null;
      case topLevelTypes.topCompositionEnd:
        return useFallbackCompositionData ? null : nativeEvent.data;
      default:
        return null;
    }
  }
  function extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var chars;
    if (canUseTextInputEvent) {
      chars = getNativeBeforeInputChars(topLevelType, nativeEvent);
    } else {
      chars = getFallbackBeforeInputChars(topLevelType, nativeEvent);
    }
    if (!chars) {
      return null;
    }
    var event = SyntheticInputEvent.getPooled(eventTypes.beforeInput, targetInst, nativeEvent, nativeEventTarget);
    event.data = chars;
    EventPropagators.accumulateTwoPhaseDispatches(event);
    return event;
  }
  var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      return [extractCompositionEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget), extractBeforeInputEvent(topLevelType, targetInst, nativeEvent, nativeEventTarget)];
    }
  };
  module.exports = BeforeInputEventPlugin;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ChangeEventPlugin.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPluginHub.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:react@15.2.1/lib/SyntheticEvent.js", "npm:react@15.2.1/lib/getEventTarget.js", "npm:react@15.2.1/lib/isEventSupported.js", "npm:react@15.2.1/lib/isTextInputElement.js", "npm:fbjs@0.8.3/lib/keyOf.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@15.2.1/lib/EventPluginHub.js');
    var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
    var getEventTarget = $__require('npm:react@15.2.1/lib/getEventTarget.js');
    var isEventSupported = $__require('npm:react@15.2.1/lib/isEventSupported.js');
    var isTextInputElement = $__require('npm:react@15.2.1/lib/isTextInputElement.js');
    var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {change: {
        phasedRegistrationNames: {
          bubbled: keyOf({onChange: null}),
          captured: keyOf({onChangeCapture: null})
        },
        dependencies: [topLevelTypes.topBlur, topLevelTypes.topChange, topLevelTypes.topClick, topLevelTypes.topFocus, topLevelTypes.topInput, topLevelTypes.topKeyDown, topLevelTypes.topKeyUp, topLevelTypes.topSelectionChange]
      }};
    var activeElement = null;
    var activeElementInst = null;
    var activeElementValue = null;
    var activeElementValueProp = null;
    function shouldUseChangeEvent(elem) {
      var nodeName = elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName === 'select' || nodeName === 'input' && elem.type === 'file';
    }
    var doesChangeEventBubble = false;
    if (ExecutionEnvironment.canUseDOM) {
      doesChangeEventBubble = isEventSupported('change') && (!('documentMode' in document) || document.documentMode > 8);
    }
    function manualDispatchChangeEvent(nativeEvent) {
      var event = SyntheticEvent.getPooled(eventTypes.change, activeElementInst, nativeEvent, getEventTarget(nativeEvent));
      EventPropagators.accumulateTwoPhaseDispatches(event);
      ReactUpdates.batchedUpdates(runEventInBatch, event);
    }
    function runEventInBatch(event) {
      EventPluginHub.enqueueEvents(event);
      EventPluginHub.processEventQueue(false);
    }
    function startWatchingForChangeEventIE8(target, targetInst) {
      activeElement = target;
      activeElementInst = targetInst;
      activeElement.attachEvent('onchange', manualDispatchChangeEvent);
    }
    function stopWatchingForChangeEventIE8() {
      if (!activeElement) {
        return;
      }
      activeElement.detachEvent('onchange', manualDispatchChangeEvent);
      activeElement = null;
      activeElementInst = null;
    }
    function getTargetInstForChangeEvent(topLevelType, targetInst) {
      if (topLevelType === topLevelTypes.topChange) {
        return targetInst;
      }
    }
    function handleEventsForChangeEventIE8(topLevelType, target, targetInst) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForChangeEventIE8();
        startWatchingForChangeEventIE8(target, targetInst);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForChangeEventIE8();
      }
    }
    var isInputEventSupported = false;
    if (ExecutionEnvironment.canUseDOM) {
      isInputEventSupported = isEventSupported('input') && (!('documentMode' in document) || document.documentMode > 11);
    }
    var newValueProp = {
      get: function() {
        return activeElementValueProp.get.call(this);
      },
      set: function(val) {
        activeElementValue = '' + val;
        activeElementValueProp.set.call(this, val);
      }
    };
    function startWatchingForValueChange(target, targetInst) {
      activeElement = target;
      activeElementInst = targetInst;
      activeElementValue = target.value;
      activeElementValueProp = Object.getOwnPropertyDescriptor(target.constructor.prototype, 'value');
      Object.defineProperty(activeElement, 'value', newValueProp);
      if (activeElement.attachEvent) {
        activeElement.attachEvent('onpropertychange', handlePropertyChange);
      } else {
        activeElement.addEventListener('propertychange', handlePropertyChange, false);
      }
    }
    function stopWatchingForValueChange() {
      if (!activeElement) {
        return;
      }
      delete activeElement.value;
      if (activeElement.detachEvent) {
        activeElement.detachEvent('onpropertychange', handlePropertyChange);
      } else {
        activeElement.removeEventListener('propertychange', handlePropertyChange, false);
      }
      activeElement = null;
      activeElementInst = null;
      activeElementValue = null;
      activeElementValueProp = null;
    }
    function handlePropertyChange(nativeEvent) {
      if (nativeEvent.propertyName !== 'value') {
        return;
      }
      var value = nativeEvent.srcElement.value;
      if (value === activeElementValue) {
        return;
      }
      activeElementValue = value;
      manualDispatchChangeEvent(nativeEvent);
    }
    function getTargetInstForInputEvent(topLevelType, targetInst) {
      if (topLevelType === topLevelTypes.topInput) {
        return targetInst;
      }
    }
    function handleEventsForInputEventIE(topLevelType, target, targetInst) {
      if (topLevelType === topLevelTypes.topFocus) {
        stopWatchingForValueChange();
        startWatchingForValueChange(target, targetInst);
      } else if (topLevelType === topLevelTypes.topBlur) {
        stopWatchingForValueChange();
      }
    }
    function getTargetInstForInputEventIE(topLevelType, targetInst) {
      if (topLevelType === topLevelTypes.topSelectionChange || topLevelType === topLevelTypes.topKeyUp || topLevelType === topLevelTypes.topKeyDown) {
        if (activeElement && activeElement.value !== activeElementValue) {
          activeElementValue = activeElement.value;
          return activeElementInst;
        }
      }
    }
    function shouldUseClickEvent(elem) {
      return elem.nodeName && elem.nodeName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio');
    }
    function getTargetInstForClickEvent(topLevelType, targetInst) {
      if (topLevelType === topLevelTypes.topClick) {
        return targetInst;
      }
    }
    var ChangeEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;
        var getTargetInstFunc,
            handleEventFunc;
        if (shouldUseChangeEvent(targetNode)) {
          if (doesChangeEventBubble) {
            getTargetInstFunc = getTargetInstForChangeEvent;
          } else {
            handleEventFunc = handleEventsForChangeEventIE8;
          }
        } else if (isTextInputElement(targetNode)) {
          if (isInputEventSupported) {
            getTargetInstFunc = getTargetInstForInputEvent;
          } else {
            getTargetInstFunc = getTargetInstForInputEventIE;
            handleEventFunc = handleEventsForInputEventIE;
          }
        } else if (shouldUseClickEvent(targetNode)) {
          getTargetInstFunc = getTargetInstForClickEvent;
        }
        if (getTargetInstFunc) {
          var inst = getTargetInstFunc(topLevelType, targetInst);
          if (inst) {
            var event = SyntheticEvent.getPooled(eventTypes.change, inst, nativeEvent, nativeEventTarget);
            event.type = 'change';
            EventPropagators.accumulateTwoPhaseDispatches(event);
            return event;
          }
        }
        if (handleEventFunc) {
          handleEventFunc(topLevelType, targetNode, targetInst);
        }
      }
    };
    module.exports = ChangeEventPlugin;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DefaultEventPluginOrder.js", ["npm:fbjs@0.8.3/lib/keyOf.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
  var DefaultEventPluginOrder = [keyOf({ResponderEventPlugin: null}), keyOf({SimpleEventPlugin: null}), keyOf({TapEventPlugin: null}), keyOf({EnterLeaveEventPlugin: null}), keyOf({ChangeEventPlugin: null}), keyOf({SelectEventPlugin: null}), keyOf({BeforeInputEventPlugin: null})];
  module.exports = DefaultEventPluginOrder;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EnterLeaveEventPlugin.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/SyntheticMouseEvent.js", "npm:fbjs@0.8.3/lib/keyOf.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
  var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
  var SyntheticMouseEvent = $__require('npm:react@15.2.1/lib/SyntheticMouseEvent.js');
  var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
  var topLevelTypes = EventConstants.topLevelTypes;
  var eventTypes = {
    mouseEnter: {
      registrationName: keyOf({onMouseEnter: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    },
    mouseLeave: {
      registrationName: keyOf({onMouseLeave: null}),
      dependencies: [topLevelTypes.topMouseOut, topLevelTypes.topMouseOver]
    }
  };
  var EnterLeaveEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      if (topLevelType === topLevelTypes.topMouseOver && (nativeEvent.relatedTarget || nativeEvent.fromElement)) {
        return null;
      }
      if (topLevelType !== topLevelTypes.topMouseOut && topLevelType !== topLevelTypes.topMouseOver) {
        return null;
      }
      var win;
      if (nativeEventTarget.window === nativeEventTarget) {
        win = nativeEventTarget;
      } else {
        var doc = nativeEventTarget.ownerDocument;
        if (doc) {
          win = doc.defaultView || doc.parentWindow;
        } else {
          win = window;
        }
      }
      var from;
      var to;
      if (topLevelType === topLevelTypes.topMouseOut) {
        from = targetInst;
        var related = nativeEvent.relatedTarget || nativeEvent.toElement;
        to = related ? ReactDOMComponentTree.getClosestInstanceFromNode(related) : null;
      } else {
        from = null;
        to = targetInst;
      }
      if (from === to) {
        return null;
      }
      var fromNode = from == null ? win : ReactDOMComponentTree.getNodeFromInstance(from);
      var toNode = to == null ? win : ReactDOMComponentTree.getNodeFromInstance(to);
      var leave = SyntheticMouseEvent.getPooled(eventTypes.mouseLeave, from, nativeEvent, nativeEventTarget);
      leave.type = 'mouseleave';
      leave.target = fromNode;
      leave.relatedTarget = toNode;
      var enter = SyntheticMouseEvent.getPooled(eventTypes.mouseEnter, to, nativeEvent, nativeEventTarget);
      enter.type = 'mouseenter';
      enter.target = toNode;
      enter.relatedTarget = fromNode;
      EventPropagators.accumulateEnterLeaveDispatches(leave, enter, from, to);
      return [leave, enter];
    }
  };
  module.exports = EnterLeaveEventPlugin;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/HTMLDOMPropertyConfig.js", ["npm:react@15.2.1/lib/DOMProperty.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
  var MUST_USE_PROPERTY = DOMProperty.injection.MUST_USE_PROPERTY;
  var HAS_BOOLEAN_VALUE = DOMProperty.injection.HAS_BOOLEAN_VALUE;
  var HAS_NUMERIC_VALUE = DOMProperty.injection.HAS_NUMERIC_VALUE;
  var HAS_POSITIVE_NUMERIC_VALUE = DOMProperty.injection.HAS_POSITIVE_NUMERIC_VALUE;
  var HAS_OVERLOADED_BOOLEAN_VALUE = DOMProperty.injection.HAS_OVERLOADED_BOOLEAN_VALUE;
  var HTMLDOMPropertyConfig = {
    isCustomAttribute: RegExp.prototype.test.bind(new RegExp('^(data|aria)-[' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$')),
    Properties: {
      accept: 0,
      acceptCharset: 0,
      accessKey: 0,
      action: 0,
      allowFullScreen: HAS_BOOLEAN_VALUE,
      allowTransparency: 0,
      alt: 0,
      async: HAS_BOOLEAN_VALUE,
      autoComplete: 0,
      autoPlay: HAS_BOOLEAN_VALUE,
      capture: HAS_BOOLEAN_VALUE,
      cellPadding: 0,
      cellSpacing: 0,
      charSet: 0,
      challenge: 0,
      checked: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      cite: 0,
      classID: 0,
      className: 0,
      cols: HAS_POSITIVE_NUMERIC_VALUE,
      colSpan: 0,
      content: 0,
      contentEditable: 0,
      contextMenu: 0,
      controls: HAS_BOOLEAN_VALUE,
      coords: 0,
      crossOrigin: 0,
      data: 0,
      dateTime: 0,
      'default': HAS_BOOLEAN_VALUE,
      defer: HAS_BOOLEAN_VALUE,
      dir: 0,
      disabled: HAS_BOOLEAN_VALUE,
      download: HAS_OVERLOADED_BOOLEAN_VALUE,
      draggable: 0,
      encType: 0,
      form: 0,
      formAction: 0,
      formEncType: 0,
      formMethod: 0,
      formNoValidate: HAS_BOOLEAN_VALUE,
      formTarget: 0,
      frameBorder: 0,
      headers: 0,
      height: 0,
      hidden: HAS_BOOLEAN_VALUE,
      high: 0,
      href: 0,
      hrefLang: 0,
      htmlFor: 0,
      httpEquiv: 0,
      icon: 0,
      id: 0,
      inputMode: 0,
      integrity: 0,
      is: 0,
      keyParams: 0,
      keyType: 0,
      kind: 0,
      label: 0,
      lang: 0,
      list: 0,
      loop: HAS_BOOLEAN_VALUE,
      low: 0,
      manifest: 0,
      marginHeight: 0,
      marginWidth: 0,
      max: 0,
      maxLength: 0,
      media: 0,
      mediaGroup: 0,
      method: 0,
      min: 0,
      minLength: 0,
      multiple: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      muted: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      name: 0,
      nonce: 0,
      noValidate: HAS_BOOLEAN_VALUE,
      open: HAS_BOOLEAN_VALUE,
      optimum: 0,
      pattern: 0,
      placeholder: 0,
      poster: 0,
      preload: 0,
      profile: 0,
      radioGroup: 0,
      readOnly: HAS_BOOLEAN_VALUE,
      rel: 0,
      required: HAS_BOOLEAN_VALUE,
      reversed: HAS_BOOLEAN_VALUE,
      role: 0,
      rows: HAS_POSITIVE_NUMERIC_VALUE,
      rowSpan: HAS_NUMERIC_VALUE,
      sandbox: 0,
      scope: 0,
      scoped: HAS_BOOLEAN_VALUE,
      scrolling: 0,
      seamless: HAS_BOOLEAN_VALUE,
      selected: MUST_USE_PROPERTY | HAS_BOOLEAN_VALUE,
      shape: 0,
      size: HAS_POSITIVE_NUMERIC_VALUE,
      sizes: 0,
      span: HAS_POSITIVE_NUMERIC_VALUE,
      spellCheck: 0,
      src: 0,
      srcDoc: 0,
      srcLang: 0,
      srcSet: 0,
      start: HAS_NUMERIC_VALUE,
      step: 0,
      style: 0,
      summary: 0,
      tabIndex: 0,
      target: 0,
      title: 0,
      type: 0,
      useMap: 0,
      value: 0,
      width: 0,
      wmode: 0,
      wrap: 0,
      about: 0,
      datatype: 0,
      inlist: 0,
      prefix: 0,
      property: 0,
      resource: 0,
      'typeof': 0,
      vocab: 0,
      autoCapitalize: 0,
      autoCorrect: 0,
      autoSave: 0,
      color: 0,
      itemProp: 0,
      itemScope: HAS_BOOLEAN_VALUE,
      itemType: 0,
      itemID: 0,
      itemRef: 0,
      results: 0,
      security: 0,
      unselectable: 0
    },
    DOMAttributeNames: {
      acceptCharset: 'accept-charset',
      className: 'class',
      htmlFor: 'for',
      httpEquiv: 'http-equiv'
    },
    DOMPropertyNames: {}
  };
  module.exports = HTMLDOMPropertyConfig;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/AutoFocusUtils.js", ["npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:fbjs@0.8.3/lib/focusNode.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
  var focusNode = $__require('npm:fbjs@0.8.3/lib/focusNode.js');
  var AutoFocusUtils = {focusDOMComponent: function() {
      focusNode(ReactDOMComponentTree.getNodeFromInstance(this));
    }};
  module.exports = AutoFocusUtils;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/camelize.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _hyphenPattern = /-(.)/g;
  function camelize(string) {
    return string.replace(_hyphenPattern, function(_, character) {
      return character.toUpperCase();
    });
  }
  module.exports = camelize;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/camelizeStyleName.js", ["npm:fbjs@0.8.3/lib/camelize.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var camelize = $__require('npm:fbjs@0.8.3/lib/camelize.js');
  var msPattern = /^-ms-/;
  function camelizeStyleName(string) {
    return camelize(string.replace(msPattern, 'ms-'));
  }
  module.exports = camelizeStyleName;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/CSSProperty.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridColumn: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
  };
  function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
  }
  var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
  Object.keys(isUnitlessNumber).forEach(function(prop) {
    prefixes.forEach(function(prefix) {
      isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
    });
  });
  var shorthandPropertyExpansions = {
    background: {
      backgroundAttachment: true,
      backgroundColor: true,
      backgroundImage: true,
      backgroundPositionX: true,
      backgroundPositionY: true,
      backgroundRepeat: true
    },
    backgroundPosition: {
      backgroundPositionX: true,
      backgroundPositionY: true
    },
    border: {
      borderWidth: true,
      borderStyle: true,
      borderColor: true
    },
    borderBottom: {
      borderBottomWidth: true,
      borderBottomStyle: true,
      borderBottomColor: true
    },
    borderLeft: {
      borderLeftWidth: true,
      borderLeftStyle: true,
      borderLeftColor: true
    },
    borderRight: {
      borderRightWidth: true,
      borderRightStyle: true,
      borderRightColor: true
    },
    borderTop: {
      borderTopWidth: true,
      borderTopStyle: true,
      borderTopColor: true
    },
    font: {
      fontStyle: true,
      fontVariant: true,
      fontWeight: true,
      fontSize: true,
      lineHeight: true,
      fontFamily: true
    },
    outline: {
      outlineWidth: true,
      outlineStyle: true,
      outlineColor: true
    }
  };
  var CSSProperty = {
    isUnitlessNumber: isUnitlessNumber,
    shorthandPropertyExpansions: shorthandPropertyExpansions
  };
  module.exports = CSSProperty;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/dangerousStyleValue.js", ["npm:react@15.2.1/lib/CSSProperty.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var CSSProperty = $__require('npm:react@15.2.1/lib/CSSProperty.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var isUnitlessNumber = CSSProperty.isUnitlessNumber;
    var styleWarnings = {};
    function dangerousStyleValue(name, value, component) {
      var isEmpty = value == null || typeof value === 'boolean' || value === '';
      if (isEmpty) {
        return '';
      }
      var isNonNumeric = isNaN(value);
      if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
        return '' + value;
      }
      if (typeof value === 'string') {
        if ("production" !== 'production') {
          if (component && value !== '0') {
            var owner = component._currentElement._owner;
            var ownerName = owner ? owner.getName() : null;
            if (ownerName && !styleWarnings[ownerName]) {
              styleWarnings[ownerName] = {};
            }
            var warned = false;
            if (ownerName) {
              var warnings = styleWarnings[ownerName];
              warned = warnings[name];
              if (!warned) {
                warnings[name] = true;
              }
            }
            if (!warned) {
              "production" !== 'production' ? warning(false, 'a `%s` tag (owner: `%s`) was passed a numeric string value ' + 'for CSS property `%s` (value: `%s`) which will be treated ' + 'as a unitless number in a future version of React.', component._currentElement.type, ownerName || 'unknown', name, value) : void 0;
            }
          }
        }
        value = value.trim();
      }
      return value + 'px';
    }
    module.exports = dangerousStyleValue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/hyphenate.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _uppercasePattern = /([A-Z])/g;
  function hyphenate(string) {
    return string.replace(_uppercasePattern, '-$1').toLowerCase();
  }
  module.exports = hyphenate;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/hyphenateStyleName.js", ["npm:fbjs@0.8.3/lib/hyphenate.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hyphenate = $__require('npm:fbjs@0.8.3/lib/hyphenate.js');
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return hyphenate(string).replace(msPattern, '-ms-');
  }
  module.exports = hyphenateStyleName;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/memoizeStringOnly.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function memoizeStringOnly(callback) {
    var cache = {};
    return function(string) {
      if (!cache.hasOwnProperty(string)) {
        cache[string] = callback.call(this, string);
      }
      return cache[string];
    };
  }
  module.exports = memoizeStringOnly;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/CSSPropertyOperations.js", ["npm:react@15.2.1/lib/CSSProperty.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:fbjs@0.8.3/lib/camelizeStyleName.js", "npm:react@15.2.1/lib/dangerousStyleValue.js", "npm:fbjs@0.8.3/lib/hyphenateStyleName.js", "npm:fbjs@0.8.3/lib/memoizeStringOnly.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var CSSProperty = $__require('npm:react@15.2.1/lib/CSSProperty.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var camelizeStyleName = $__require('npm:fbjs@0.8.3/lib/camelizeStyleName.js');
    var dangerousStyleValue = $__require('npm:react@15.2.1/lib/dangerousStyleValue.js');
    var hyphenateStyleName = $__require('npm:fbjs@0.8.3/lib/hyphenateStyleName.js');
    var memoizeStringOnly = $__require('npm:fbjs@0.8.3/lib/memoizeStringOnly.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var processStyleName = memoizeStringOnly(function(styleName) {
      return hyphenateStyleName(styleName);
    });
    var hasShorthandPropertyBug = false;
    var styleFloatAccessor = 'cssFloat';
    if (ExecutionEnvironment.canUseDOM) {
      var tempStyle = document.createElement('div').style;
      try {
        tempStyle.font = '';
      } catch (e) {
        hasShorthandPropertyBug = true;
      }
      if (document.documentElement.style.cssFloat === undefined) {
        styleFloatAccessor = 'styleFloat';
      }
    }
    if ("production" !== 'production') {
      var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;
      var badStyleValueWithSemicolonPattern = /;\s*$/;
      var warnedStyleNames = {};
      var warnedStyleValues = {};
      var warnedForNaNValue = false;
      var warnHyphenatedStyleName = function(name, owner) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }
        warnedStyleNames[name] = true;
        "production" !== 'production' ? warning(false, 'Unsupported style property %s. Did you mean %s?%s', name, camelizeStyleName(name), checkRenderMessage(owner)) : void 0;
      };
      var warnBadVendoredStyleName = function(name, owner) {
        if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
          return;
        }
        warnedStyleNames[name] = true;
        "production" !== 'production' ? warning(false, 'Unsupported vendor-prefixed style property %s. Did you mean %s?%s', name, name.charAt(0).toUpperCase() + name.slice(1), checkRenderMessage(owner)) : void 0;
      };
      var warnStyleValueWithSemicolon = function(name, value, owner) {
        if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
          return;
        }
        warnedStyleValues[value] = true;
        "production" !== 'production' ? warning(false, 'Style property values shouldn\'t contain a semicolon.%s ' + 'Try "%s: %s" instead.', checkRenderMessage(owner), name, value.replace(badStyleValueWithSemicolonPattern, '')) : void 0;
      };
      var warnStyleValueIsNaN = function(name, value, owner) {
        if (warnedForNaNValue) {
          return;
        }
        warnedForNaNValue = true;
        "production" !== 'production' ? warning(false, '`NaN` is an invalid value for the `%s` css style property.%s', name, checkRenderMessage(owner)) : void 0;
      };
      var checkRenderMessage = function(owner) {
        if (owner) {
          var name = owner.getName();
          if (name) {
            return ' Check the render method of `' + name + '`.';
          }
        }
        return '';
      };
      var warnValidStyle = function(name, value, component) {
        var owner;
        if (component) {
          owner = component._currentElement._owner;
        }
        if (name.indexOf('-') > -1) {
          warnHyphenatedStyleName(name, owner);
        } else if (badVendoredStyleNamePattern.test(name)) {
          warnBadVendoredStyleName(name, owner);
        } else if (badStyleValueWithSemicolonPattern.test(value)) {
          warnStyleValueWithSemicolon(name, value, owner);
        }
        if (typeof value === 'number' && isNaN(value)) {
          warnStyleValueIsNaN(name, value, owner);
        }
      };
    }
    var CSSPropertyOperations = {
      createMarkupForStyles: function(styles, component) {
        var serialized = '';
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          var styleValue = styles[styleName];
          if ("production" !== 'production') {
            warnValidStyle(styleName, styleValue, component);
          }
          if (styleValue != null) {
            serialized += processStyleName(styleName) + ':';
            serialized += dangerousStyleValue(styleName, styleValue, component) + ';';
          }
        }
        return serialized || null;
      },
      setValueForStyles: function(node, styles, component) {
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onHostOperation(component._debugID, 'update styles', styles);
        }
        var style = node.style;
        for (var styleName in styles) {
          if (!styles.hasOwnProperty(styleName)) {
            continue;
          }
          if ("production" !== 'production') {
            warnValidStyle(styleName, styles[styleName], component);
          }
          var styleValue = dangerousStyleValue(styleName, styles[styleName], component);
          if (styleName === 'float' || styleName === 'cssFloat') {
            styleName = styleFloatAccessor;
          }
          if (styleValue) {
            style[styleName] = styleValue;
          } else {
            var expansion = hasShorthandPropertyBug && CSSProperty.shorthandPropertyExpansions[styleName];
            if (expansion) {
              for (var individualStyleName in expansion) {
                style[individualStyleName] = '';
              }
            } else {
              style[styleName] = '';
            }
          }
        }
      }
    };
    module.exports = CSSPropertyOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMIDOperations.js", ["npm:react@15.2.1/lib/DOMChildrenOperations.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var DOMChildrenOperations = $__require('npm:react@15.2.1/lib/DOMChildrenOperations.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDOMIDOperations = {dangerouslyProcessChildrenUpdates: function(parentInst, updates) {
        var node = ReactDOMComponentTree.getNodeFromInstance(parentInst);
        DOMChildrenOperations.processUpdates(node, updates);
      }};
    module.exports = ReactDOMIDOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js", ["npm:react@15.2.1/lib/DOMChildrenOperations.js", "npm:react@15.2.1/lib/ReactDOMIDOperations.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var DOMChildrenOperations = $__require('npm:react@15.2.1/lib/DOMChildrenOperations.js');
    var ReactDOMIDOperations = $__require('npm:react@15.2.1/lib/ReactDOMIDOperations.js');
    var ReactComponentBrowserEnvironment = {
      processChildrenUpdates: ReactDOMIDOperations.dangerouslyProcessChildrenUpdates,
      replaceNodeWithMarkup: DOMChildrenOperations.dangerouslyReplaceNodeWithMarkup,
      unmountIDFromEnvironment: function(rootNodeID) {}
    };
    module.exports = ReactComponentBrowserEnvironment;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMButton.js", ["npm:react@15.2.1/lib/DisabledInputUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DisabledInputUtils = $__require('npm:react@15.2.1/lib/DisabledInputUtils.js');
  var ReactDOMButton = {getHostProps: DisabledInputUtils.getHostProps};
  module.exports = ReactDOMButton;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMNullInputValuePropDevtool.js", ["npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnValueNull = false;
    function handleElement(debugID, element) {
      if (element == null) {
        return;
      }
      if (element.type !== 'input' && element.type !== 'textarea' && element.type !== 'select') {
        return;
      }
      if (element.props != null && element.props.value === null && !didWarnValueNull) {
        "production" !== 'production' ? warning(false, '`value` prop on `%s` should not be null. ' + 'Consider using the empty string to clear the component or `undefined` ' + 'for uncontrolled components.%s', element.type, ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
        didWarnValueNull = true;
      }
    }
    var ReactDOMUnknownPropertyDevtool = {
      onBeforeMountComponent: function(debugID, element) {
        handleElement(debugID, element);
      },
      onBeforeUpdateComponent: function(debugID, element) {
        handleElement(debugID, element);
      }
    };
    module.exports = ReactDOMUnknownPropertyDevtool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMUnknownPropertyDevtool.js", ["npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/EventPluginRegistry.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
    var EventPluginRegistry = $__require('npm:react@15.2.1/lib/EventPluginRegistry.js');
    var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    if ("production" !== 'production') {
      var reactProps = {
        children: true,
        dangerouslySetInnerHTML: true,
        key: true,
        ref: true,
        autoFocus: true,
        defaultValue: true,
        valueLink: true,
        defaultChecked: true,
        checkedLink: true,
        innerHTML: true,
        suppressContentEditableWarning: true,
        onFocusIn: true,
        onFocusOut: true
      };
      var warnedProperties = {};
      var validateProperty = function(tagName, name, debugID) {
        if (DOMProperty.properties.hasOwnProperty(name) || DOMProperty.isCustomAttribute(name)) {
          return true;
        }
        if (reactProps.hasOwnProperty(name) && reactProps[name] || warnedProperties.hasOwnProperty(name) && warnedProperties[name]) {
          return true;
        }
        if (EventPluginRegistry.registrationNameModules.hasOwnProperty(name)) {
          return true;
        }
        warnedProperties[name] = true;
        var lowerCasedName = name.toLowerCase();
        var standardName = DOMProperty.isCustomAttribute(lowerCasedName) ? lowerCasedName : DOMProperty.getPossibleStandardName.hasOwnProperty(lowerCasedName) ? DOMProperty.getPossibleStandardName[lowerCasedName] : null;
        var registrationName = EventPluginRegistry.possibleRegistrationNames.hasOwnProperty(lowerCasedName) ? EventPluginRegistry.possibleRegistrationNames[lowerCasedName] : null;
        if (standardName != null) {
          "production" !== 'production' ? warning(standardName == null, 'Unknown DOM property %s. Did you mean %s?%s', name, standardName, ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
          return true;
        } else if (registrationName != null) {
          "production" !== 'production' ? warning(registrationName == null, 'Unknown event handler property %s. Did you mean `%s`?%s', name, registrationName, ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
          return true;
        } else {
          return false;
        }
      };
    }
    var warnUnknownProperties = function(debugID, element) {
      var unknownProps = [];
      for (var key in element.props) {
        var isValid = validateProperty(element.type, key, debugID);
        if (!isValid) {
          unknownProps.push(key);
        }
      }
      var unknownPropString = unknownProps.map(function(prop) {
        return '`' + prop + '`';
      }).join(', ');
      if (unknownProps.length === 1) {
        "production" !== 'production' ? warning(false, 'Unknown prop %s on <%s> tag. Remove this prop from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
      } else if (unknownProps.length > 1) {
        "production" !== 'production' ? warning(false, 'Unknown props %s on <%s> tag. Remove these props from the element. ' + 'For details, see https://fb.me/react-unknown-prop%s', unknownPropString, element.type, ReactComponentTreeDevtool.getStackAddendumByID(debugID)) : void 0;
      }
    };
    function handleElement(debugID, element) {
      if (element == null || typeof element.type !== 'string') {
        return;
      }
      if (element.type.indexOf('-') >= 0 || element.props.is) {
        return;
      }
      warnUnknownProperties(debugID, element);
    }
    var ReactDOMUnknownPropertyDevtool = {
      onBeforeMountComponent: function(debugID, element) {
        handleElement(debugID, element);
      },
      onBeforeUpdateComponent: function(debugID, element) {
        handleElement(debugID, element);
      }
    };
    module.exports = ReactDOMUnknownPropertyDevtool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMDebugTool.js", ["npm:react@15.2.1/lib/ReactDOMNullInputValuePropDevtool.js", "npm:react@15.2.1/lib/ReactDOMUnknownPropertyDevtool.js", "npm:react@15.2.1/lib/ReactDebugTool.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactDOMNullInputValuePropDevtool = $__require('npm:react@15.2.1/lib/ReactDOMNullInputValuePropDevtool.js');
    var ReactDOMUnknownPropertyDevtool = $__require('npm:react@15.2.1/lib/ReactDOMUnknownPropertyDevtool.js');
    var ReactDebugTool = $__require('npm:react@15.2.1/lib/ReactDebugTool.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var eventHandlers = [];
    var handlerDoesThrowForEvent = {};
    function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
      eventHandlers.forEach(function(handler) {
        try {
          if (handler[handlerFunctionName]) {
            handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
          }
        } catch (e) {
          "production" !== 'production' ? warning(handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e + '\n' + e.stack) : void 0;
          handlerDoesThrowForEvent[handlerFunctionName] = true;
        }
      });
    }
    var ReactDOMDebugTool = {
      addDevtool: function(devtool) {
        ReactDebugTool.addDevtool(devtool);
        eventHandlers.push(devtool);
      },
      removeDevtool: function(devtool) {
        ReactDebugTool.removeDevtool(devtool);
        for (var i = 0; i < eventHandlers.length; i++) {
          if (eventHandlers[i] === devtool) {
            eventHandlers.splice(i, 1);
            i--;
          }
        }
      },
      onCreateMarkupForProperty: function(name, value) {
        emitEvent('onCreateMarkupForProperty', name, value);
      },
      onSetValueForProperty: function(node, name, value) {
        emitEvent('onSetValueForProperty', node, name, value);
      },
      onDeleteValueForProperty: function(node, name) {
        emitEvent('onDeleteValueForProperty', node, name);
      },
      onTestEvent: function() {
        emitEvent('onTestEvent');
      }
    };
    ReactDOMDebugTool.addDevtool(ReactDOMUnknownPropertyDevtool);
    ReactDOMDebugTool.addDevtool(ReactDOMNullInputValuePropDevtool);
    module.exports = ReactDOMDebugTool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMInstrumentation.js", ["npm:react@15.2.1/lib/ReactDOMDebugTool.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var debugTool = null;
    if ("production" !== 'production') {
      var ReactDOMDebugTool = $__require('npm:react@15.2.1/lib/ReactDOMDebugTool.js');
      debugTool = ReactDOMDebugTool;
    }
    module.exports = {debugTool: debugTool};
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/quoteAttributeValueForBrowser.js", ["npm:react@15.2.1/lib/escapeTextContentForBrowser.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var escapeTextContentForBrowser = $__require('npm:react@15.2.1/lib/escapeTextContentForBrowser.js');
  function quoteAttributeValueForBrowser(value) {
    return '"' + escapeTextContentForBrowser(value) + '"';
  }
  module.exports = quoteAttributeValueForBrowser;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DOMPropertyOperations.js", ["npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDOMInstrumentation.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/quoteAttributeValueForBrowser.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDOMInstrumentation = $__require('npm:react@15.2.1/lib/ReactDOMInstrumentation.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var quoteAttributeValueForBrowser = $__require('npm:react@15.2.1/lib/quoteAttributeValueForBrowser.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var VALID_ATTRIBUTE_NAME_REGEX = new RegExp('^[' + DOMProperty.ATTRIBUTE_NAME_START_CHAR + '][' + DOMProperty.ATTRIBUTE_NAME_CHAR + ']*$');
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (validatedAttributeNameCache.hasOwnProperty(attributeName)) {
        return true;
      }
      if (illegalAttributeNameCache.hasOwnProperty(attributeName)) {
        return false;
      }
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName)) {
        validatedAttributeNameCache[attributeName] = true;
        return true;
      }
      illegalAttributeNameCache[attributeName] = true;
      "production" !== 'production' ? warning(false, 'Invalid attribute name: `%s`', attributeName) : void 0;
      return false;
    }
    function shouldIgnoreValue(propertyInfo, value) {
      return value == null || propertyInfo.hasBooleanValue && !value || propertyInfo.hasNumericValue && isNaN(value) || propertyInfo.hasPositiveNumericValue && value < 1 || propertyInfo.hasOverloadedBooleanValue && value === false;
    }
    var DOMPropertyOperations = {
      createMarkupForID: function(id) {
        return DOMProperty.ID_ATTRIBUTE_NAME + '=' + quoteAttributeValueForBrowser(id);
      },
      setAttributeForID: function(node, id) {
        node.setAttribute(DOMProperty.ID_ATTRIBUTE_NAME, id);
      },
      createMarkupForRoot: function() {
        return DOMProperty.ROOT_ATTRIBUTE_NAME + '=""';
      },
      setAttributeForRoot: function(node) {
        node.setAttribute(DOMProperty.ROOT_ATTRIBUTE_NAME, '');
      },
      createMarkupForProperty: function(name, value) {
        if ("production" !== 'production') {
          ReactDOMInstrumentation.debugTool.onCreateMarkupForProperty(name, value);
        }
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          if (shouldIgnoreValue(propertyInfo, value)) {
            return '';
          }
          var attributeName = propertyInfo.attributeName;
          if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
            return attributeName + '=""';
          }
          return attributeName + '=' + quoteAttributeValueForBrowser(value);
        } else if (DOMProperty.isCustomAttribute(name)) {
          if (value == null) {
            return '';
          }
          return name + '=' + quoteAttributeValueForBrowser(value);
        }
        return null;
      },
      createMarkupForCustomAttribute: function(name, value) {
        if (!isAttributeNameSafe(name) || value == null) {
          return '';
        }
        return name + '=' + quoteAttributeValueForBrowser(value);
      },
      setValueForProperty: function(node, name, value) {
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          var mutationMethod = propertyInfo.mutationMethod;
          if (mutationMethod) {
            mutationMethod(node, value);
          } else if (shouldIgnoreValue(propertyInfo, value)) {
            this.deleteValueForProperty(node, name);
            return;
          } else if (propertyInfo.mustUseProperty) {
            node[propertyInfo.propertyName] = value;
          } else {
            var attributeName = propertyInfo.attributeName;
            var namespace = propertyInfo.attributeNamespace;
            if (namespace) {
              node.setAttributeNS(namespace, attributeName, '' + value);
            } else if (propertyInfo.hasBooleanValue || propertyInfo.hasOverloadedBooleanValue && value === true) {
              node.setAttribute(attributeName, '');
            } else {
              node.setAttribute(attributeName, '' + value);
            }
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          DOMPropertyOperations.setValueForAttribute(node, name, value);
          return;
        }
        if ("production" !== 'production') {
          ReactDOMInstrumentation.debugTool.onSetValueForProperty(node, name, value);
          var payload = {};
          payload[name] = value;
          ReactInstrumentation.debugTool.onHostOperation(ReactDOMComponentTree.getInstanceFromNode(node)._debugID, 'update attribute', payload);
        }
      },
      setValueForAttribute: function(node, name, value) {
        if (!isAttributeNameSafe(name)) {
          return;
        }
        if (value == null) {
          node.removeAttribute(name);
        } else {
          node.setAttribute(name, '' + value);
        }
        if ("production" !== 'production') {
          var payload = {};
          payload[name] = value;
          ReactInstrumentation.debugTool.onHostOperation(ReactDOMComponentTree.getInstanceFromNode(node)._debugID, 'update attribute', payload);
        }
      },
      deleteValueForAttribute: function(node, name) {
        node.removeAttribute(name);
        if ("production" !== 'production') {
          ReactDOMInstrumentation.debugTool.onDeleteValueForProperty(node, name);
          ReactInstrumentation.debugTool.onHostOperation(ReactDOMComponentTree.getInstanceFromNode(node)._debugID, 'remove attribute', name);
        }
      },
      deleteValueForProperty: function(node, name) {
        var propertyInfo = DOMProperty.properties.hasOwnProperty(name) ? DOMProperty.properties[name] : null;
        if (propertyInfo) {
          var mutationMethod = propertyInfo.mutationMethod;
          if (mutationMethod) {
            mutationMethod(node, undefined);
          } else if (propertyInfo.mustUseProperty) {
            var propName = propertyInfo.propertyName;
            if (propertyInfo.hasBooleanValue) {
              node[propName] = false;
            } else {
              node[propName] = '';
            }
          } else {
            node.removeAttribute(propertyInfo.attributeName);
          }
        } else if (DOMProperty.isCustomAttribute(name)) {
          node.removeAttribute(name);
        }
        if ("production" !== 'production') {
          ReactDOMInstrumentation.debugTool.onDeleteValueForProperty(node, name);
          ReactInstrumentation.debugTool.onHostOperation(ReactDOMComponentTree.getInstanceFromNode(node)._debugID, 'remove attribute', name);
        }
      }
    };
    module.exports = DOMPropertyOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMInput.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/DisabledInputUtils.js", "npm:react@15.2.1/lib/DOMPropertyOperations.js", "npm:react@15.2.1/lib/LinkedValueUtils.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var DisabledInputUtils = $__require('npm:react@15.2.1/lib/DisabledInputUtils.js');
    var DOMPropertyOperations = $__require('npm:react@15.2.1/lib/DOMPropertyOperations.js');
    var LinkedValueUtils = $__require('npm:react@15.2.1/lib/LinkedValueUtils.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnValueLink = false;
    var didWarnCheckedLink = false;
    var didWarnValueDefaultValue = false;
    var didWarnCheckedDefaultChecked = false;
    var didWarnControlledToUncontrolled = false;
    var didWarnUncontrolledToControlled = false;
    function forceUpdateIfMounted() {
      if (this._rootNodeID) {
        ReactDOMInput.updateWrapper(this);
      }
    }
    function isControlled(props) {
      var usesChecked = props.type === 'checkbox' || props.type === 'radio';
      return usesChecked ? props.checked !== undefined : props.value !== undefined;
    }
    var ReactDOMInput = {
      getHostProps: function(inst, props) {
        var value = LinkedValueUtils.getValue(props);
        var checked = LinkedValueUtils.getChecked(props);
        var hostProps = _assign({type: undefined}, DisabledInputUtils.getHostProps(inst, props), {
          defaultChecked: undefined,
          defaultValue: undefined,
          value: value != null ? value : inst._wrapperState.initialValue,
          checked: checked != null ? checked : inst._wrapperState.initialChecked,
          onChange: inst._wrapperState.onChange
        });
        return hostProps;
      },
      mountWrapper: function(inst, props) {
        if ("production" !== 'production') {
          LinkedValueUtils.checkPropTypes('input', props, inst._currentElement._owner);
          var owner = inst._currentElement._owner;
          if (props.valueLink !== undefined && !didWarnValueLink) {
            "production" !== 'production' ? warning(false, '`valueLink` prop on `input` is deprecated; set `value` and `onChange` instead.') : void 0;
            didWarnValueLink = true;
          }
          if (props.checkedLink !== undefined && !didWarnCheckedLink) {
            "production" !== 'production' ? warning(false, '`checkedLink` prop on `input` is deprecated; set `value` and `onChange` instead.') : void 0;
            didWarnCheckedLink = true;
          }
          if (props.checked !== undefined && props.defaultChecked !== undefined && !didWarnCheckedDefaultChecked) {
            "production" !== 'production' ? warning(false, '%s contains an input of type %s with both checked and defaultChecked props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the checked prop, or the defaultChecked prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
            didWarnCheckedDefaultChecked = true;
          }
          if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
            "production" !== 'production' ? warning(false, '%s contains an input of type %s with both value and defaultValue props. ' + 'Input elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled input ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
            didWarnValueDefaultValue = true;
          }
        }
        var defaultValue = props.defaultValue;
        inst._wrapperState = {
          initialChecked: props.checked != null ? props.checked : props.defaultChecked,
          initialValue: props.value != null ? props.value : defaultValue,
          listeners: null,
          onChange: _handleChange.bind(inst)
        };
        if ("production" !== 'production') {
          inst._wrapperState.controlled = isControlled(props);
        }
      },
      updateWrapper: function(inst) {
        var props = inst._currentElement.props;
        if ("production" !== 'production') {
          var controlled = isControlled(props);
          var owner = inst._currentElement._owner;
          if (!inst._wrapperState.controlled && controlled && !didWarnUncontrolledToControlled) {
            "production" !== 'production' ? warning(false, '%s is changing an uncontrolled input of type %s to be controlled. ' + 'Input elements should not switch from uncontrolled to controlled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
            didWarnUncontrolledToControlled = true;
          }
          if (inst._wrapperState.controlled && !controlled && !didWarnControlledToUncontrolled) {
            "production" !== 'production' ? warning(false, '%s is changing a controlled input of type %s to be uncontrolled. ' + 'Input elements should not switch from controlled to uncontrolled (or vice versa). ' + 'Decide between using a controlled or uncontrolled input ' + 'element for the lifetime of the component. More info: https://fb.me/react-controlled-components', owner && owner.getName() || 'A component', props.type) : void 0;
            didWarnControlledToUncontrolled = true;
          }
        }
        var checked = props.checked;
        if (checked != null) {
          DOMPropertyOperations.setValueForProperty(ReactDOMComponentTree.getNodeFromInstance(inst), 'checked', checked || false);
        }
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          var newValue = '' + value;
          if (newValue !== node.value) {
            node.value = newValue;
          }
        } else {
          if (props.value == null && props.defaultValue != null) {
            node.defaultValue = '' + props.defaultValue;
          }
          if (props.checked == null && props.defaultChecked != null) {
            node.defaultChecked = !!props.defaultChecked;
          }
        }
      },
      postMountWrapper: function(inst) {
        var props = inst._currentElement.props;
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        if (props.type !== 'submit' && props.type !== 'reset') {
          node.value = node.value;
        }
        var name = node.name;
        if (name !== '') {
          node.name = '';
        }
        node.defaultChecked = !node.defaultChecked;
        node.defaultChecked = !node.defaultChecked;
        if (name !== '') {
          node.name = name;
        }
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      ReactUpdates.asap(forceUpdateIfMounted, this);
      var name = props.name;
      if (props.type === 'radio' && name != null) {
        var rootNode = ReactDOMComponentTree.getNodeFromInstance(this);
        var queryRoot = rootNode;
        while (queryRoot.parentNode) {
          queryRoot = queryRoot.parentNode;
        }
        var group = queryRoot.querySelectorAll('input[name=' + JSON.stringify('' + name) + '][type="radio"]');
        for (var i = 0; i < group.length; i++) {
          var otherNode = group[i];
          if (otherNode === rootNode || otherNode.form !== rootNode.form) {
            continue;
          }
          var otherInstance = ReactDOMComponentTree.getInstanceFromNode(otherNode);
          !otherInstance ? "production" !== 'production' ? invariant(false, 'ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.') : _prodInvariant('90') : void 0;
          ReactUpdates.asap(forceUpdateIfMounted, otherInstance);
        }
      }
      return returnValue;
    }
    module.exports = ReactDOMInput;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMOption.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactChildren.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDOMSelect.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactChildren = $__require('npm:react@15.2.1/lib/ReactChildren.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDOMSelect = $__require('npm:react@15.2.1/lib/ReactDOMSelect.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnInvalidOptionChildren = false;
    function flattenChildren(children) {
      var content = '';
      ReactChildren.forEach(children, function(child) {
        if (child == null) {
          return;
        }
        if (typeof child === 'string' || typeof child === 'number') {
          content += child;
        } else if (!didWarnInvalidOptionChildren) {
          didWarnInvalidOptionChildren = true;
          "production" !== 'production' ? warning(false, 'Only strings and numbers are supported as <option> children.') : void 0;
        }
      });
      return content;
    }
    var ReactDOMOption = {
      mountWrapper: function(inst, props, hostParent) {
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(props.selected == null, 'Use the `defaultValue` or `value` props on <select> instead of ' + 'setting `selected` on <option>.') : void 0;
        }
        var selectValue = null;
        if (hostParent != null) {
          var selectParent = hostParent;
          if (selectParent._tag === 'optgroup') {
            selectParent = selectParent._hostParent;
          }
          if (selectParent != null && selectParent._tag === 'select') {
            selectValue = ReactDOMSelect.getSelectValueContext(selectParent);
          }
        }
        var selected = null;
        if (selectValue != null) {
          var value;
          if (props.value != null) {
            value = props.value + '';
          } else {
            value = flattenChildren(props.children);
          }
          selected = false;
          if (Array.isArray(selectValue)) {
            for (var i = 0; i < selectValue.length; i++) {
              if ('' + selectValue[i] === value) {
                selected = true;
                break;
              }
            }
          } else {
            selected = '' + selectValue === value;
          }
        }
        inst._wrapperState = {selected: selected};
      },
      postMountWrapper: function(inst) {
        var props = inst._currentElement.props;
        if (props.value != null) {
          var node = ReactDOMComponentTree.getNodeFromInstance(inst);
          node.setAttribute('value', props.value);
        }
      },
      getHostProps: function(inst, props) {
        var hostProps = _assign({
          selected: undefined,
          children: undefined
        }, props);
        if (inst._wrapperState.selected != null) {
          hostProps.selected = inst._wrapperState.selected;
        }
        var content = flattenChildren(props.children);
        if (content) {
          hostProps.children = content;
        }
        return hostProps;
      }
    };
    module.exports = ReactDOMOption;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMSelect.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/DisabledInputUtils.js", "npm:react@15.2.1/lib/LinkedValueUtils.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var DisabledInputUtils = $__require('npm:react@15.2.1/lib/DisabledInputUtils.js');
    var LinkedValueUtils = $__require('npm:react@15.2.1/lib/LinkedValueUtils.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnValueLink = false;
    var didWarnValueDefaultValue = false;
    function updateOptionsIfPendingUpdateAndMounted() {
      if (this._rootNodeID && this._wrapperState.pendingUpdate) {
        this._wrapperState.pendingUpdate = false;
        var props = this._currentElement.props;
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          updateOptions(this, Boolean(props.multiple), value);
        }
      }
    }
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var valuePropNames = ['value', 'defaultValue'];
    function checkSelectPropTypes(inst, props) {
      var owner = inst._currentElement._owner;
      LinkedValueUtils.checkPropTypes('select', props, owner);
      if (props.valueLink !== undefined && !didWarnValueLink) {
        "production" !== 'production' ? warning(false, '`valueLink` prop on `select` is deprecated; set `value` and `onChange` instead.') : void 0;
        didWarnValueLink = true;
      }
      for (var i = 0; i < valuePropNames.length; i++) {
        var propName = valuePropNames[i];
        if (props[propName] == null) {
          continue;
        }
        if (props.multiple) {
          "production" !== 'production' ? warning(Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be an array if ' + '`multiple` is true.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
        } else {
          "production" !== 'production' ? warning(!Array.isArray(props[propName]), 'The `%s` prop supplied to <select> must be a scalar ' + 'value if `multiple` is false.%s', propName, getDeclarationErrorAddendum(owner)) : void 0;
        }
      }
    }
    function updateOptions(inst, multiple, propValue) {
      var selectedValue,
          i;
      var options = ReactDOMComponentTree.getNodeFromInstance(inst).options;
      if (multiple) {
        selectedValue = {};
        for (i = 0; i < propValue.length; i++) {
          selectedValue['' + propValue[i]] = true;
        }
        for (i = 0; i < options.length; i++) {
          var selected = selectedValue.hasOwnProperty(options[i].value);
          if (options[i].selected !== selected) {
            options[i].selected = selected;
          }
        }
      } else {
        selectedValue = '' + propValue;
        for (i = 0; i < options.length; i++) {
          if (options[i].value === selectedValue) {
            options[i].selected = true;
            return;
          }
        }
        if (options.length) {
          options[0].selected = true;
        }
      }
    }
    var ReactDOMSelect = {
      getHostProps: function(inst, props) {
        return _assign({}, DisabledInputUtils.getHostProps(inst, props), {
          onChange: inst._wrapperState.onChange,
          value: undefined
        });
      },
      mountWrapper: function(inst, props) {
        if ("production" !== 'production') {
          checkSelectPropTypes(inst, props);
        }
        var value = LinkedValueUtils.getValue(props);
        inst._wrapperState = {
          pendingUpdate: false,
          initialValue: value != null ? value : props.defaultValue,
          listeners: null,
          onChange: _handleChange.bind(inst),
          wasMultiple: Boolean(props.multiple)
        };
        if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValueDefaultValue) {
          "production" !== 'production' ? warning(false, 'Select elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled select ' + 'element and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
          didWarnValueDefaultValue = true;
        }
      },
      getSelectValueContext: function(inst) {
        return inst._wrapperState.initialValue;
      },
      postUpdateWrapper: function(inst) {
        var props = inst._currentElement.props;
        inst._wrapperState.initialValue = undefined;
        var wasMultiple = inst._wrapperState.wasMultiple;
        inst._wrapperState.wasMultiple = Boolean(props.multiple);
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          inst._wrapperState.pendingUpdate = false;
          updateOptions(inst, Boolean(props.multiple), value);
        } else if (wasMultiple !== Boolean(props.multiple)) {
          if (props.defaultValue != null) {
            updateOptions(inst, Boolean(props.multiple), props.defaultValue);
          } else {
            updateOptions(inst, Boolean(props.multiple), props.multiple ? [] : '');
          }
        }
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      if (this._rootNodeID) {
        this._wrapperState.pendingUpdate = true;
      }
      ReactUpdates.asap(updateOptionsIfPendingUpdateAndMounted, this);
      return returnValue;
    }
    module.exports = ReactDOMSelect;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DisabledInputUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var disableableMouseListenerNames = {
    onClick: true,
    onDoubleClick: true,
    onMouseDown: true,
    onMouseMove: true,
    onMouseUp: true,
    onClickCapture: true,
    onDoubleClickCapture: true,
    onMouseDownCapture: true,
    onMouseMoveCapture: true,
    onMouseUpCapture: true
  };
  var DisabledInputUtils = {getHostProps: function(inst, props) {
      if (!props.disabled) {
        return props;
      }
      var hostProps = {};
      for (var key in props) {
        if (!disableableMouseListenerNames[key] && props.hasOwnProperty(key)) {
          hostProps[key] = props[key];
        }
      }
      return hostProps;
    }};
  module.exports = DisabledInputUtils;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/LinkedValueUtils.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactPropTypes.js", "npm:react@15.2.1/lib/ReactPropTypeLocations.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactPropTypes = $__require('npm:react@15.2.1/lib/ReactPropTypes.js');
    var ReactPropTypeLocations = $__require('npm:react@15.2.1/lib/ReactPropTypeLocations.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var hasReadOnlyValue = {
      'button': true,
      'checkbox': true,
      'image': true,
      'hidden': true,
      'radio': true,
      'reset': true,
      'submit': true
    };
    function _assertSingleLink(inputProps) {
      !(inputProps.checkedLink == null || inputProps.valueLink == null) ? "production" !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a valueLink. If you want to use checkedLink, you probably don\'t want to use valueLink and vice versa.') : _prodInvariant('87') : void 0;
    }
    function _assertValueLink(inputProps) {
      _assertSingleLink(inputProps);
      !(inputProps.value == null && inputProps.onChange == null) ? "production" !== 'production' ? invariant(false, 'Cannot provide a valueLink and a value or onChange event. If you want to use value or onChange, you probably don\'t want to use valueLink.') : _prodInvariant('88') : void 0;
    }
    function _assertCheckedLink(inputProps) {
      _assertSingleLink(inputProps);
      !(inputProps.checked == null && inputProps.onChange == null) ? "production" !== 'production' ? invariant(false, 'Cannot provide a checkedLink and a checked property or onChange event. If you want to use checked or onChange, you probably don\'t want to use checkedLink') : _prodInvariant('89') : void 0;
    }
    var propTypes = {
      value: function(props, propName, componentName) {
        if (!props[propName] || hasReadOnlyValue[props.type] || props.onChange || props.readOnly || props.disabled) {
          return null;
        }
        return new Error('You provided a `value` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultValue`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
      },
      checked: function(props, propName, componentName) {
        if (!props[propName] || props.onChange || props.readOnly || props.disabled) {
          return null;
        }
        return new Error('You provided a `checked` prop to a form field without an ' + '`onChange` handler. This will render a read-only field. If ' + 'the field should be mutable use `defaultChecked`. Otherwise, ' + 'set either `onChange` or `readOnly`.');
      },
      onChange: ReactPropTypes.func
    };
    var loggedTypeFailures = {};
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var LinkedValueUtils = {
      checkPropTypes: function(tagName, props, owner) {
        for (var propName in propTypes) {
          if (propTypes.hasOwnProperty(propName)) {
            var error = propTypes[propName](props, propName, tagName, ReactPropTypeLocations.prop);
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var addendum = getDeclarationErrorAddendum(owner);
            "production" !== 'production' ? warning(false, 'Failed form propType: %s%s', error.message, addendum) : void 0;
          }
        }
      },
      getValue: function(inputProps) {
        if (inputProps.valueLink) {
          _assertValueLink(inputProps);
          return inputProps.valueLink.value;
        }
        return inputProps.value;
      },
      getChecked: function(inputProps) {
        if (inputProps.checkedLink) {
          _assertCheckedLink(inputProps);
          return inputProps.checkedLink.value;
        }
        return inputProps.checked;
      },
      executeOnChange: function(inputProps, event) {
        if (inputProps.valueLink) {
          _assertValueLink(inputProps);
          return inputProps.valueLink.requestChange(event.target.value);
        } else if (inputProps.checkedLink) {
          _assertCheckedLink(inputProps);
          return inputProps.checkedLink.requestChange(event.target.checked);
        } else if (inputProps.onChange) {
          return inputProps.onChange.call(undefined, event);
        }
      }
    };
    module.exports = LinkedValueUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMTextarea.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/DisabledInputUtils.js", "npm:react@15.2.1/lib/LinkedValueUtils.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var DisabledInputUtils = $__require('npm:react@15.2.1/lib/DisabledInputUtils.js');
    var LinkedValueUtils = $__require('npm:react@15.2.1/lib/LinkedValueUtils.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnValueLink = false;
    var didWarnValDefaultVal = false;
    function forceUpdateIfMounted() {
      if (this._rootNodeID) {
        ReactDOMTextarea.updateWrapper(this);
      }
    }
    var ReactDOMTextarea = {
      getHostProps: function(inst, props) {
        !(props.dangerouslySetInnerHTML == null) ? "production" !== 'production' ? invariant(false, '`dangerouslySetInnerHTML` does not make sense on <textarea>.') : _prodInvariant('91') : void 0;
        var hostProps = _assign({}, DisabledInputUtils.getHostProps(inst, props), {
          value: undefined,
          defaultValue: undefined,
          children: '' + inst._wrapperState.initialValue,
          onChange: inst._wrapperState.onChange
        });
        return hostProps;
      },
      mountWrapper: function(inst, props) {
        if ("production" !== 'production') {
          LinkedValueUtils.checkPropTypes('textarea', props, inst._currentElement._owner);
          if (props.valueLink !== undefined && !didWarnValueLink) {
            "production" !== 'production' ? warning(false, '`valueLink` prop on `textarea` is deprecated; set `value` and `onChange` instead.') : void 0;
            didWarnValueLink = true;
          }
          if (props.value !== undefined && props.defaultValue !== undefined && !didWarnValDefaultVal) {
            "production" !== 'production' ? warning(false, 'Textarea elements must be either controlled or uncontrolled ' + '(specify either the value prop, or the defaultValue prop, but not ' + 'both). Decide between using a controlled or uncontrolled textarea ' + 'and remove one of these props. More info: ' + 'https://fb.me/react-controlled-components') : void 0;
            didWarnValDefaultVal = true;
          }
        }
        var value = LinkedValueUtils.getValue(props);
        var initialValue = value;
        if (value == null) {
          var defaultValue = props.defaultValue;
          var children = props.children;
          if (children != null) {
            if ("production" !== 'production') {
              "production" !== 'production' ? warning(false, 'Use the `defaultValue` or `value` props instead of setting ' + 'children on <textarea>.') : void 0;
            }
            !(defaultValue == null) ? "production" !== 'production' ? invariant(false, 'If you supply `defaultValue` on a <textarea>, do not pass children.') : _prodInvariant('92') : void 0;
            if (Array.isArray(children)) {
              !(children.length <= 1) ? "production" !== 'production' ? invariant(false, '<textarea> can only have at most one child.') : _prodInvariant('93') : void 0;
              children = children[0];
            }
            defaultValue = '' + children;
          }
          if (defaultValue == null) {
            defaultValue = '';
          }
          initialValue = defaultValue;
        }
        inst._wrapperState = {
          initialValue: '' + initialValue,
          listeners: null,
          onChange: _handleChange.bind(inst)
        };
      },
      updateWrapper: function(inst) {
        var props = inst._currentElement.props;
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        var value = LinkedValueUtils.getValue(props);
        if (value != null) {
          var newValue = '' + value;
          if (newValue !== node.value) {
            node.value = newValue;
          }
          if (props.defaultValue == null) {
            node.defaultValue = newValue;
          }
        }
        if (props.defaultValue != null) {
          node.defaultValue = props.defaultValue;
        }
      },
      postMountWrapper: function(inst) {
        var node = ReactDOMComponentTree.getNodeFromInstance(inst);
        node.value = node.textContent;
      }
    };
    function _handleChange(event) {
      var props = this._currentElement.props;
      var returnValue = LinkedValueUtils.executeOnChange(props, event);
      ReactUpdates.asap(forceUpdateIfMounted, this);
      return returnValue;
    }
    module.exports = ReactDOMTextarea;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactChildReconciler.js", ["npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/instantiateReactComponent.js", "npm:react@15.2.1/lib/KeyEscapeUtils.js", "npm:react@15.2.1/lib/shouldUpdateReactComponent.js", "npm:react@15.2.1/lib/traverseAllChildren.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var instantiateReactComponent = $__require('npm:react@15.2.1/lib/instantiateReactComponent.js');
    var KeyEscapeUtils = $__require('npm:react@15.2.1/lib/KeyEscapeUtils.js');
    var shouldUpdateReactComponent = $__require('npm:react@15.2.1/lib/shouldUpdateReactComponent.js');
    var traverseAllChildren = $__require('npm:react@15.2.1/lib/traverseAllChildren.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function instantiateChild(childInstances, child, name, selfDebugID) {
      var keyUnique = childInstances[name] === undefined;
      if ("production" !== 'production') {
        var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
        "production" !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeDevtool.getStackAddendumByID(selfDebugID)) : void 0;
      }
      if (child != null && keyUnique) {
        childInstances[name] = instantiateReactComponent(child, true);
      }
    }
    var ReactChildReconciler = {
      instantiateChildren: function(nestedChildNodes, transaction, context, selfDebugID) {
        if (nestedChildNodes == null) {
          return null;
        }
        var childInstances = {};
        if ("production" !== 'production') {
          traverseAllChildren(nestedChildNodes, function(childInsts, child, name) {
            return instantiateChild(childInsts, child, name, selfDebugID);
          }, childInstances);
        } else {
          traverseAllChildren(nestedChildNodes, instantiateChild, childInstances);
        }
        return childInstances;
      },
      updateChildren: function(prevChildren, nextChildren, removedNodes, transaction, context) {
        if (!nextChildren && !prevChildren) {
          return;
        }
        var name;
        var prevChild;
        for (name in nextChildren) {
          if (!nextChildren.hasOwnProperty(name)) {
            continue;
          }
          prevChild = prevChildren && prevChildren[name];
          var prevElement = prevChild && prevChild._currentElement;
          var nextElement = nextChildren[name];
          if (prevChild != null && shouldUpdateReactComponent(prevElement, nextElement)) {
            ReactReconciler.receiveComponent(prevChild, nextElement, transaction, context);
            nextChildren[name] = prevChild;
          } else {
            if (prevChild) {
              removedNodes[name] = ReactReconciler.getHostNode(prevChild);
              ReactReconciler.unmountComponent(prevChild, false);
            }
            var nextChildInstance = instantiateReactComponent(nextElement, true);
            nextChildren[name] = nextChildInstance;
          }
        }
        for (name in prevChildren) {
          if (prevChildren.hasOwnProperty(name) && !(nextChildren && nextChildren.hasOwnProperty(name))) {
            prevChild = prevChildren[name];
            removedNodes[name] = ReactReconciler.getHostNode(prevChild);
            ReactReconciler.unmountComponent(prevChild, false);
          }
        }
      },
      unmountChildren: function(renderedChildren, safely) {
        for (var name in renderedChildren) {
          if (renderedChildren.hasOwnProperty(name)) {
            var renderedChild = renderedChildren[name];
            ReactReconciler.unmountComponent(renderedChild, safely);
          }
        }
      }
    };
    module.exports = ReactChildReconciler;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/flattenChildren.js", ["npm:react@15.2.1/lib/KeyEscapeUtils.js", "npm:react@15.2.1/lib/traverseAllChildren.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var KeyEscapeUtils = $__require('npm:react@15.2.1/lib/KeyEscapeUtils.js');
    var traverseAllChildren = $__require('npm:react@15.2.1/lib/traverseAllChildren.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID) {
      if (traverseContext && typeof traverseContext === 'object') {
        var result = traverseContext;
        var keyUnique = result[name] === undefined;
        if ("production" !== 'production') {
          var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
          "production" !== 'production' ? warning(keyUnique, 'flattenChildren(...): Encountered two children with the same key, ' + '`%s`. Child keys must be unique; when two children share a key, only ' + 'the first child will be used.%s', KeyEscapeUtils.unescape(name), ReactComponentTreeDevtool.getStackAddendumByID(selfDebugID)) : void 0;
        }
        if (keyUnique && child != null) {
          result[name] = child;
        }
      }
    }
    function flattenChildren(children, selfDebugID) {
      if (children == null) {
        return children;
      }
      var result = {};
      if ("production" !== 'production') {
        traverseAllChildren(children, function(traverseContext, child, name) {
          return flattenSingleChildIntoContext(traverseContext, child, name, selfDebugID);
        }, result);
      } else {
        traverseAllChildren(children, flattenSingleChildIntoContext, result);
      }
      return result;
    }
    module.exports = flattenChildren;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactMultiChild.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactComponentEnvironment.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/ReactChildReconciler.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:react@15.2.1/lib/flattenChildren.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactComponentEnvironment = $__require('npm:react@15.2.1/lib/ReactComponentEnvironment.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactMultiChildUpdateTypes = $__require('npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var ReactChildReconciler = $__require('npm:react@15.2.1/lib/ReactChildReconciler.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var flattenChildren = $__require('npm:react@15.2.1/lib/flattenChildren.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function makeInsertMarkup(markup, afterNode, toIndex) {
      return {
        type: ReactMultiChildUpdateTypes.INSERT_MARKUP,
        content: markup,
        fromIndex: null,
        fromNode: null,
        toIndex: toIndex,
        afterNode: afterNode
      };
    }
    function makeMove(child, afterNode, toIndex) {
      return {
        type: ReactMultiChildUpdateTypes.MOVE_EXISTING,
        content: null,
        fromIndex: child._mountIndex,
        fromNode: ReactReconciler.getHostNode(child),
        toIndex: toIndex,
        afterNode: afterNode
      };
    }
    function makeRemove(child, node) {
      return {
        type: ReactMultiChildUpdateTypes.REMOVE_NODE,
        content: null,
        fromIndex: child._mountIndex,
        fromNode: node,
        toIndex: null,
        afterNode: null
      };
    }
    function makeSetMarkup(markup) {
      return {
        type: ReactMultiChildUpdateTypes.SET_MARKUP,
        content: markup,
        fromIndex: null,
        fromNode: null,
        toIndex: null,
        afterNode: null
      };
    }
    function makeTextContent(textContent) {
      return {
        type: ReactMultiChildUpdateTypes.TEXT_CONTENT,
        content: textContent,
        fromIndex: null,
        fromNode: null,
        toIndex: null,
        afterNode: null
      };
    }
    function enqueue(queue, update) {
      if (update) {
        queue = queue || [];
        queue.push(update);
      }
      return queue;
    }
    function processQueue(inst, updateQueue) {
      ReactComponentEnvironment.processChildrenUpdates(inst, updateQueue);
    }
    var setParentForInstrumentation = emptyFunction;
    var setChildrenForInstrumentation = emptyFunction;
    if ("production" !== 'production') {
      var getDebugID = function(inst) {
        if (!inst._debugID) {
          var internal;
          if (internal = ReactInstanceMap.get(inst)) {
            inst = internal;
          }
        }
        return inst._debugID;
      };
      setParentForInstrumentation = function(child) {
        if (child._debugID !== 0) {
          ReactInstrumentation.debugTool.onSetParent(child._debugID, getDebugID(this));
        }
      };
      setChildrenForInstrumentation = function(children) {
        var debugID = getDebugID(this);
        if (debugID !== 0) {
          ReactInstrumentation.debugTool.onSetChildren(debugID, children ? Object.keys(children).map(function(key) {
            return children[key]._debugID;
          }) : []);
        }
      };
    }
    var ReactMultiChild = {Mixin: {
        _reconcilerInstantiateChildren: function(nestedChildren, transaction, context) {
          if ("production" !== 'production') {
            if (this._currentElement) {
              try {
                ReactCurrentOwner.current = this._currentElement._owner;
                return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context, this._debugID);
              } finally {
                ReactCurrentOwner.current = null;
              }
            }
          }
          return ReactChildReconciler.instantiateChildren(nestedChildren, transaction, context);
        },
        _reconcilerUpdateChildren: function(prevChildren, nextNestedChildrenElements, removedNodes, transaction, context) {
          var nextChildren;
          if ("production" !== 'production') {
            if (this._currentElement) {
              try {
                ReactCurrentOwner.current = this._currentElement._owner;
                nextChildren = flattenChildren(nextNestedChildrenElements, this._debugID);
              } finally {
                ReactCurrentOwner.current = null;
              }
              ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
              return nextChildren;
            }
          }
          nextChildren = flattenChildren(nextNestedChildrenElements);
          ReactChildReconciler.updateChildren(prevChildren, nextChildren, removedNodes, transaction, context);
          return nextChildren;
        },
        mountChildren: function(nestedChildren, transaction, context) {
          var children = this._reconcilerInstantiateChildren(nestedChildren, transaction, context);
          this._renderedChildren = children;
          var mountImages = [];
          var index = 0;
          for (var name in children) {
            if (children.hasOwnProperty(name)) {
              var child = children[name];
              if ("production" !== 'production') {
                setParentForInstrumentation.call(this, child);
              }
              var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context);
              child._mountIndex = index++;
              mountImages.push(mountImage);
            }
          }
          if ("production" !== 'production') {
            setChildrenForInstrumentation.call(this, children);
          }
          return mountImages;
        },
        updateTextContent: function(nextContent) {
          var prevChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(prevChildren, false);
          for (var name in prevChildren) {
            if (prevChildren.hasOwnProperty(name)) {
              !false ? "production" !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
            }
          }
          var updates = [makeTextContent(nextContent)];
          processQueue(this, updates);
        },
        updateMarkup: function(nextMarkup) {
          var prevChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(prevChildren, false);
          for (var name in prevChildren) {
            if (prevChildren.hasOwnProperty(name)) {
              !false ? "production" !== 'production' ? invariant(false, 'updateTextContent called on non-empty component.') : _prodInvariant('118') : void 0;
            }
          }
          var updates = [makeSetMarkup(nextMarkup)];
          processQueue(this, updates);
        },
        updateChildren: function(nextNestedChildrenElements, transaction, context) {
          this._updateChildren(nextNestedChildrenElements, transaction, context);
        },
        _updateChildren: function(nextNestedChildrenElements, transaction, context) {
          var prevChildren = this._renderedChildren;
          var removedNodes = {};
          var nextChildren = this._reconcilerUpdateChildren(prevChildren, nextNestedChildrenElements, removedNodes, transaction, context);
          if (!nextChildren && !prevChildren) {
            return;
          }
          var updates = null;
          var name;
          var lastIndex = 0;
          var nextIndex = 0;
          var lastPlacedNode = null;
          for (name in nextChildren) {
            if (!nextChildren.hasOwnProperty(name)) {
              continue;
            }
            var prevChild = prevChildren && prevChildren[name];
            var nextChild = nextChildren[name];
            if (prevChild === nextChild) {
              updates = enqueue(updates, this.moveChild(prevChild, lastPlacedNode, nextIndex, lastIndex));
              lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              prevChild._mountIndex = nextIndex;
            } else {
              if (prevChild) {
                lastIndex = Math.max(prevChild._mountIndex, lastIndex);
              }
              updates = enqueue(updates, this._mountChildAtIndex(nextChild, lastPlacedNode, nextIndex, transaction, context));
            }
            nextIndex++;
            lastPlacedNode = ReactReconciler.getHostNode(nextChild);
          }
          for (name in removedNodes) {
            if (removedNodes.hasOwnProperty(name)) {
              updates = enqueue(updates, this._unmountChild(prevChildren[name], removedNodes[name]));
            }
          }
          if (updates) {
            processQueue(this, updates);
          }
          this._renderedChildren = nextChildren;
          if ("production" !== 'production') {
            setChildrenForInstrumentation.call(this, nextChildren);
          }
        },
        unmountChildren: function(safely) {
          var renderedChildren = this._renderedChildren;
          ReactChildReconciler.unmountChildren(renderedChildren, safely);
          this._renderedChildren = null;
        },
        moveChild: function(child, afterNode, toIndex, lastIndex) {
          if (child._mountIndex < lastIndex) {
            return makeMove(child, afterNode, toIndex);
          }
        },
        createChild: function(child, afterNode, mountImage) {
          return makeInsertMarkup(mountImage, afterNode, child._mountIndex);
        },
        removeChild: function(child, node) {
          return makeRemove(child, node);
        },
        _mountChildAtIndex: function(child, afterNode, index, transaction, context) {
          var mountImage = ReactReconciler.mountComponent(child, transaction, this, this._hostContainerInfo, context);
          child._mountIndex = index;
          return this.createChild(child, afterNode, mountImage);
        },
        _unmountChild: function(child, node) {
          var update = this.removeChild(child, node);
          child._mountIndex = null;
          return update;
        }
      }};
    module.exports = ReactMultiChild;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactServerUpdateQueue.js", ["npm:react@15.2.1/lib/ReactUpdateQueue.js", "npm:react@15.2.1/lib/Transaction.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var ReactUpdateQueue = $__require('npm:react@15.2.1/lib/ReactUpdateQueue.js');
    var Transaction = $__require('npm:react@15.2.1/lib/Transaction.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function warnNoop(publicInstance, callerName) {
      if ("production" !== 'production') {
        var constructor = publicInstance.constructor;
        "production" !== 'production' ? warning(false, '%s(...): Can only update a mounting component. ' + 'This usually means you called %s() outside componentWillMount() on the server. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
      }
    }
    var ReactServerUpdateQueue = function() {
      function ReactServerUpdateQueue(transaction) {
        _classCallCheck(this, ReactServerUpdateQueue);
        this.transaction = transaction;
      }
      ReactServerUpdateQueue.prototype.isMounted = function isMounted(publicInstance) {
        return false;
      };
      ReactServerUpdateQueue.prototype.enqueueCallback = function enqueueCallback(publicInstance, callback, callerName) {
        if (this.transaction.isInTransaction()) {
          ReactUpdateQueue.enqueueCallback(publicInstance, callback, callerName);
        }
      };
      ReactServerUpdateQueue.prototype.enqueueForceUpdate = function enqueueForceUpdate(publicInstance) {
        if (this.transaction.isInTransaction()) {
          ReactUpdateQueue.enqueueForceUpdate(publicInstance);
        } else {
          warnNoop(publicInstance, 'forceUpdate');
        }
      };
      ReactServerUpdateQueue.prototype.enqueueReplaceState = function enqueueReplaceState(publicInstance, completeState) {
        if (this.transaction.isInTransaction()) {
          ReactUpdateQueue.enqueueReplaceState(publicInstance, completeState);
        } else {
          warnNoop(publicInstance, 'replaceState');
        }
      };
      ReactServerUpdateQueue.prototype.enqueueSetState = function enqueueSetState(publicInstance, partialState) {
        if (this.transaction.isInTransaction()) {
          ReactUpdateQueue.enqueueSetState(publicInstance, partialState);
        } else {
          warnNoop(publicInstance, 'setState');
        }
      };
      return ReactServerUpdateQueue;
    }();
    module.exports = ReactServerUpdateQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactServerRenderingTransaction.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/Transaction.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactServerUpdateQueue.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var Transaction = $__require('npm:react@15.2.1/lib/Transaction.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactServerUpdateQueue = $__require('npm:react@15.2.1/lib/ReactServerUpdateQueue.js');
    var TRANSACTION_WRAPPERS = [];
    if ("production" !== 'production') {
      TRANSACTION_WRAPPERS.push({
        initialize: ReactInstrumentation.debugTool.onBeginFlush,
        close: ReactInstrumentation.debugTool.onEndFlush
      });
    }
    var noopCallbackQueue = {enqueue: function() {}};
    function ReactServerRenderingTransaction(renderToStaticMarkup) {
      this.reinitializeTransaction();
      this.renderToStaticMarkup = renderToStaticMarkup;
      this.useCreateElement = false;
      this.updateQueue = new ReactServerUpdateQueue(this);
    }
    var Mixin = {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
      getReactMountReady: function() {
        return noopCallbackQueue;
      },
      getUpdateQueue: function() {
        return this.updateQueue;
      },
      destructor: function() {},
      checkpoint: function() {},
      rollback: function() {}
    };
    _assign(ReactServerRenderingTransaction.prototype, Transaction.Mixin, Mixin);
    PooledClass.addPoolingTo(ReactServerRenderingTransaction);
    module.exports = ReactServerRenderingTransaction;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/AutoFocusUtils.js", "npm:react@15.2.1/lib/CSSPropertyOperations.js", "npm:react@15.2.1/lib/DOMLazyTree.js", "npm:react@15.2.1/lib/DOMNamespaces.js", "npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/DOMPropertyOperations.js", "npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPluginHub.js", "npm:react@15.2.1/lib/EventPluginRegistry.js", "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js", "npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js", "npm:react@15.2.1/lib/ReactDOMButton.js", "npm:react@15.2.1/lib/ReactDOMComponentFlags.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDOMInput.js", "npm:react@15.2.1/lib/ReactDOMOption.js", "npm:react@15.2.1/lib/ReactDOMSelect.js", "npm:react@15.2.1/lib/ReactDOMTextarea.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactMultiChild.js", "npm:react@15.2.1/lib/ReactServerRenderingTransaction.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:react@15.2.1/lib/escapeTextContentForBrowser.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:react@15.2.1/lib/isEventSupported.js", "npm:fbjs@0.8.3/lib/keyOf.js", "npm:fbjs@0.8.3/lib/shallowEqual.js", "npm:react@15.2.1/lib/validateDOMNesting.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var AutoFocusUtils = $__require('npm:react@15.2.1/lib/AutoFocusUtils.js');
    var CSSPropertyOperations = $__require('npm:react@15.2.1/lib/CSSPropertyOperations.js');
    var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
    var DOMNamespaces = $__require('npm:react@15.2.1/lib/DOMNamespaces.js');
    var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
    var DOMPropertyOperations = $__require('npm:react@15.2.1/lib/DOMPropertyOperations.js');
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@15.2.1/lib/EventPluginHub.js');
    var EventPluginRegistry = $__require('npm:react@15.2.1/lib/EventPluginRegistry.js');
    var ReactBrowserEventEmitter = $__require('npm:react@15.2.1/lib/ReactBrowserEventEmitter.js');
    var ReactComponentBrowserEnvironment = $__require('npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js');
    var ReactDOMButton = $__require('npm:react@15.2.1/lib/ReactDOMButton.js');
    var ReactDOMComponentFlags = $__require('npm:react@15.2.1/lib/ReactDOMComponentFlags.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDOMInput = $__require('npm:react@15.2.1/lib/ReactDOMInput.js');
    var ReactDOMOption = $__require('npm:react@15.2.1/lib/ReactDOMOption.js');
    var ReactDOMSelect = $__require('npm:react@15.2.1/lib/ReactDOMSelect.js');
    var ReactDOMTextarea = $__require('npm:react@15.2.1/lib/ReactDOMTextarea.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactMultiChild = $__require('npm:react@15.2.1/lib/ReactMultiChild.js');
    var ReactServerRenderingTransaction = $__require('npm:react@15.2.1/lib/ReactServerRenderingTransaction.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var escapeTextContentForBrowser = $__require('npm:react@15.2.1/lib/escapeTextContentForBrowser.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var isEventSupported = $__require('npm:react@15.2.1/lib/isEventSupported.js');
    var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
    var shallowEqual = $__require('npm:fbjs@0.8.3/lib/shallowEqual.js');
    var validateDOMNesting = $__require('npm:react@15.2.1/lib/validateDOMNesting.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var Flags = ReactDOMComponentFlags;
    var deleteListener = EventPluginHub.deleteListener;
    var getNode = ReactDOMComponentTree.getNodeFromInstance;
    var listenTo = ReactBrowserEventEmitter.listenTo;
    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    var CONTENT_TYPES = {
      'string': true,
      'number': true
    };
    var STYLE = keyOf({style: null});
    var HTML = keyOf({__html: null});
    var RESERVED_PROPS = {
      children: null,
      dangerouslySetInnerHTML: null,
      suppressContentEditableWarning: null
    };
    var DOC_FRAGMENT_TYPE = 11;
    function getDeclarationErrorAddendum(internalInstance) {
      if (internalInstance) {
        var owner = internalInstance._currentElement._owner || null;
        if (owner) {
          var name = owner.getName();
          if (name) {
            return ' This DOM node was rendered by `' + name + '`.';
          }
        }
      }
      return '';
    }
    function friendlyStringify(obj) {
      if (typeof obj === 'object') {
        if (Array.isArray(obj)) {
          return '[' + obj.map(friendlyStringify).join(', ') + ']';
        } else {
          var pairs = [];
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var keyEscaped = /^[a-z$_][\w$_]*$/i.test(key) ? key : JSON.stringify(key);
              pairs.push(keyEscaped + ': ' + friendlyStringify(obj[key]));
            }
          }
          return '{' + pairs.join(', ') + '}';
        }
      } else if (typeof obj === 'string') {
        return JSON.stringify(obj);
      } else if (typeof obj === 'function') {
        return '[function object]';
      }
      return String(obj);
    }
    var styleMutationWarning = {};
    function checkAndWarnForMutatedStyle(style1, style2, component) {
      if (style1 == null || style2 == null) {
        return;
      }
      if (shallowEqual(style1, style2)) {
        return;
      }
      var componentName = component._tag;
      var owner = component._currentElement._owner;
      var ownerName;
      if (owner) {
        ownerName = owner.getName();
      }
      var hash = ownerName + '|' + componentName;
      if (styleMutationWarning.hasOwnProperty(hash)) {
        return;
      }
      styleMutationWarning[hash] = true;
      "production" !== 'production' ? warning(false, '`%s` was passed a style object that has previously been mutated. ' + 'Mutating `style` is deprecated. Consider cloning it beforehand. Check ' + 'the `render` %s. Previous style: %s. Mutated style: %s.', componentName, owner ? 'of `' + ownerName + '`' : 'using <' + componentName + '>', friendlyStringify(style1), friendlyStringify(style2)) : void 0;
    }
    function assertValidProps(component, props) {
      if (!props) {
        return;
      }
      if (voidElementTags[component._tag]) {
        !(props.children == null && props.dangerouslySetInnerHTML == null) ? "production" !== 'production' ? invariant(false, '%s is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.%s', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : _prodInvariant('137', component._tag, component._currentElement._owner ? ' Check the render method of ' + component._currentElement._owner.getName() + '.' : '') : void 0;
      }
      if (props.dangerouslySetInnerHTML != null) {
        !(props.children == null) ? "production" !== 'production' ? invariant(false, 'Can only set one of `children` or `props.dangerouslySetInnerHTML`.') : _prodInvariant('60') : void 0;
        !(typeof props.dangerouslySetInnerHTML === 'object' && HTML in props.dangerouslySetInnerHTML) ? "production" !== 'production' ? invariant(false, '`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://fb.me/react-invariant-dangerously-set-inner-html for more information.') : _prodInvariant('61') : void 0;
      }
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(props.innerHTML == null, 'Directly setting property `innerHTML` is not permitted. ' + 'For more information, lookup documentation on `dangerouslySetInnerHTML`.') : void 0;
        "production" !== 'production' ? warning(props.suppressContentEditableWarning || !props.contentEditable || props.children == null, 'A component is `contentEditable` and contains `children` managed by ' + 'React. It is now your responsibility to guarantee that none of ' + 'those nodes are unexpectedly modified or duplicated. This is ' + 'probably not intentional.') : void 0;
        "production" !== 'production' ? warning(props.onFocusIn == null && props.onFocusOut == null, 'React uses onFocus and onBlur instead of onFocusIn and onFocusOut. ' + 'All React events are normalized to bubble, so onFocusIn and onFocusOut ' + 'are not needed/supported by React.') : void 0;
      }
      !(props.style == null || typeof props.style === 'object') ? "production" !== 'production' ? invariant(false, 'The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + \'em\'}} when using JSX.%s', getDeclarationErrorAddendum(component)) : _prodInvariant('62', getDeclarationErrorAddendum(component)) : void 0;
    }
    function enqueuePutListener(inst, registrationName, listener, transaction) {
      if (transaction instanceof ReactServerRenderingTransaction) {
        return;
      }
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(registrationName !== 'onScroll' || isEventSupported('scroll', true), 'This browser doesn\'t support the `onScroll` event') : void 0;
      }
      var containerInfo = inst._hostContainerInfo;
      var isDocumentFragment = containerInfo._node && containerInfo._node.nodeType === DOC_FRAGMENT_TYPE;
      var doc = isDocumentFragment ? containerInfo._node : containerInfo._ownerDocument;
      listenTo(registrationName, doc);
      transaction.getReactMountReady().enqueue(putListener, {
        inst: inst,
        registrationName: registrationName,
        listener: listener
      });
    }
    function putListener() {
      var listenerToPut = this;
      EventPluginHub.putListener(listenerToPut.inst, listenerToPut.registrationName, listenerToPut.listener);
    }
    function inputPostMount() {
      var inst = this;
      ReactDOMInput.postMountWrapper(inst);
    }
    function textareaPostMount() {
      var inst = this;
      ReactDOMTextarea.postMountWrapper(inst);
    }
    function optionPostMount() {
      var inst = this;
      ReactDOMOption.postMountWrapper(inst);
    }
    var setContentChildForInstrumentation = emptyFunction;
    if ("production" !== 'production') {
      setContentChildForInstrumentation = function(content) {
        var hasExistingContent = this._contentDebugID != null;
        var debugID = this._debugID;
        var contentDebugID = debugID + '#text';
        if (content == null) {
          if (hasExistingContent) {
            ReactInstrumentation.debugTool.onUnmountComponent(this._contentDebugID);
          }
          this._contentDebugID = null;
          return;
        }
        this._contentDebugID = contentDebugID;
        var text = '' + content;
        ReactInstrumentation.debugTool.onSetDisplayName(contentDebugID, '#text');
        ReactInstrumentation.debugTool.onSetParent(contentDebugID, debugID);
        ReactInstrumentation.debugTool.onSetText(contentDebugID, text);
        if (hasExistingContent) {
          ReactInstrumentation.debugTool.onBeforeUpdateComponent(contentDebugID, content);
          ReactInstrumentation.debugTool.onUpdateComponent(contentDebugID);
        } else {
          ReactInstrumentation.debugTool.onBeforeMountComponent(contentDebugID, content);
          ReactInstrumentation.debugTool.onMountComponent(contentDebugID);
          ReactInstrumentation.debugTool.onSetChildren(debugID, [contentDebugID]);
        }
      };
    }
    var mediaEvents = {
      topAbort: 'abort',
      topCanPlay: 'canplay',
      topCanPlayThrough: 'canplaythrough',
      topDurationChange: 'durationchange',
      topEmptied: 'emptied',
      topEncrypted: 'encrypted',
      topEnded: 'ended',
      topError: 'error',
      topLoadedData: 'loadeddata',
      topLoadedMetadata: 'loadedmetadata',
      topLoadStart: 'loadstart',
      topPause: 'pause',
      topPlay: 'play',
      topPlaying: 'playing',
      topProgress: 'progress',
      topRateChange: 'ratechange',
      topSeeked: 'seeked',
      topSeeking: 'seeking',
      topStalled: 'stalled',
      topSuspend: 'suspend',
      topTimeUpdate: 'timeupdate',
      topVolumeChange: 'volumechange',
      topWaiting: 'waiting'
    };
    function trapBubbledEventsLocal() {
      var inst = this;
      !inst._rootNodeID ? "production" !== 'production' ? invariant(false, 'Must be mounted to trap events') : _prodInvariant('63') : void 0;
      var node = getNode(inst);
      !node ? "production" !== 'production' ? invariant(false, 'trapBubbledEvent(...): Requires node to be rendered.') : _prodInvariant('64') : void 0;
      switch (inst._tag) {
        case 'iframe':
        case 'object':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
          break;
        case 'video':
        case 'audio':
          inst._wrapperState.listeners = [];
          for (var event in mediaEvents) {
            if (mediaEvents.hasOwnProperty(event)) {
              inst._wrapperState.listeners.push(ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes[event], mediaEvents[event], node));
            }
          }
          break;
        case 'source':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node)];
          break;
        case 'img':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topError, 'error', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topLoad, 'load', node)];
          break;
        case 'form':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topReset, 'reset', node), ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topSubmit, 'submit', node)];
          break;
        case 'input':
        case 'select':
        case 'textarea':
          inst._wrapperState.listeners = [ReactBrowserEventEmitter.trapBubbledEvent(EventConstants.topLevelTypes.topInvalid, 'invalid', node)];
          break;
      }
    }
    function postUpdateSelectWrapper() {
      ReactDOMSelect.postUpdateWrapper(this);
    }
    var omittedCloseTags = {
      'area': true,
      'base': true,
      'br': true,
      'col': true,
      'embed': true,
      'hr': true,
      'img': true,
      'input': true,
      'keygen': true,
      'link': true,
      'meta': true,
      'param': true,
      'source': true,
      'track': true,
      'wbr': true
    };
    var newlineEatingTags = {
      'listing': true,
      'pre': true,
      'textarea': true
    };
    var voidElementTags = _assign({'menuitem': true}, omittedCloseTags);
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = {};
    var hasOwnProperty = {}.hasOwnProperty;
    function validateDangerousTag(tag) {
      if (!hasOwnProperty.call(validatedTagCache, tag)) {
        !VALID_TAG_REGEX.test(tag) ? "production" !== 'production' ? invariant(false, 'Invalid tag: %s', tag) : _prodInvariant('65', tag) : void 0;
        validatedTagCache[tag] = true;
      }
    }
    function isCustomComponent(tagName, props) {
      return tagName.indexOf('-') >= 0 || props.is != null;
    }
    var globalIdCounter = 1;
    function ReactDOMComponent(element) {
      var tag = element.type;
      validateDangerousTag(tag);
      this._currentElement = element;
      this._tag = tag.toLowerCase();
      this._namespaceURI = null;
      this._renderedChildren = null;
      this._previousStyle = null;
      this._previousStyleCopy = null;
      this._hostNode = null;
      this._hostParent = null;
      this._rootNodeID = null;
      this._domID = null;
      this._hostContainerInfo = null;
      this._wrapperState = null;
      this._topLevelWrapper = null;
      this._flags = 0;
      if ("production" !== 'production') {
        this._ancestorInfo = null;
        setContentChildForInstrumentation.call(this, null);
      }
    }
    ReactDOMComponent.displayName = 'ReactDOMComponent';
    ReactDOMComponent.Mixin = {
      mountComponent: function(transaction, hostParent, hostContainerInfo, context) {
        this._rootNodeID = globalIdCounter++;
        this._domID = hostContainerInfo._idCounter++;
        this._hostParent = hostParent;
        this._hostContainerInfo = hostContainerInfo;
        var props = this._currentElement.props;
        switch (this._tag) {
          case 'audio':
          case 'form':
          case 'iframe':
          case 'img':
          case 'link':
          case 'object':
          case 'source':
          case 'video':
            this._wrapperState = {listeners: null};
            transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
            break;
          case 'button':
            props = ReactDOMButton.getHostProps(this, props, hostParent);
            break;
          case 'input':
            ReactDOMInput.mountWrapper(this, props, hostParent);
            props = ReactDOMInput.getHostProps(this, props);
            transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
            break;
          case 'option':
            ReactDOMOption.mountWrapper(this, props, hostParent);
            props = ReactDOMOption.getHostProps(this, props);
            break;
          case 'select':
            ReactDOMSelect.mountWrapper(this, props, hostParent);
            props = ReactDOMSelect.getHostProps(this, props);
            transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
            break;
          case 'textarea':
            ReactDOMTextarea.mountWrapper(this, props, hostParent);
            props = ReactDOMTextarea.getHostProps(this, props);
            transaction.getReactMountReady().enqueue(trapBubbledEventsLocal, this);
            break;
        }
        assertValidProps(this, props);
        var namespaceURI;
        var parentTag;
        if (hostParent != null) {
          namespaceURI = hostParent._namespaceURI;
          parentTag = hostParent._tag;
        } else if (hostContainerInfo._tag) {
          namespaceURI = hostContainerInfo._namespaceURI;
          parentTag = hostContainerInfo._tag;
        }
        if (namespaceURI == null || namespaceURI === DOMNamespaces.svg && parentTag === 'foreignobject') {
          namespaceURI = DOMNamespaces.html;
        }
        if (namespaceURI === DOMNamespaces.html) {
          if (this._tag === 'svg') {
            namespaceURI = DOMNamespaces.svg;
          } else if (this._tag === 'math') {
            namespaceURI = DOMNamespaces.mathml;
          }
        }
        this._namespaceURI = namespaceURI;
        if ("production" !== 'production') {
          var parentInfo;
          if (hostParent != null) {
            parentInfo = hostParent._ancestorInfo;
          } else if (hostContainerInfo._tag) {
            parentInfo = hostContainerInfo._ancestorInfo;
          }
          if (parentInfo) {
            validateDOMNesting(this._tag, this, parentInfo);
          }
          this._ancestorInfo = validateDOMNesting.updatedAncestorInfo(parentInfo, this._tag, this);
        }
        var mountImage;
        if (transaction.useCreateElement) {
          var ownerDocument = hostContainerInfo._ownerDocument;
          var el;
          if (namespaceURI === DOMNamespaces.html) {
            if (this._tag === 'script') {
              var div = ownerDocument.createElement('div');
              var type = this._currentElement.type;
              div.innerHTML = '<' + type + '></' + type + '>';
              el = div.removeChild(div.firstChild);
            } else if (props.is) {
              el = ownerDocument.createElement(this._currentElement.type, props.is);
            } else {
              el = ownerDocument.createElement(this._currentElement.type);
            }
          } else {
            el = ownerDocument.createElementNS(namespaceURI, this._currentElement.type);
          }
          ReactDOMComponentTree.precacheNode(this, el);
          this._flags |= Flags.hasCachedChildNodes;
          if (!this._hostParent) {
            DOMPropertyOperations.setAttributeForRoot(el);
          }
          this._updateDOMProperties(null, props, transaction);
          var lazyTree = DOMLazyTree(el);
          this._createInitialChildren(transaction, props, context, lazyTree);
          mountImage = lazyTree;
        } else {
          var tagOpen = this._createOpenTagMarkupAndPutListeners(transaction, props);
          var tagContent = this._createContentMarkup(transaction, props, context);
          if (!tagContent && omittedCloseTags[this._tag]) {
            mountImage = tagOpen + '/>';
          } else {
            mountImage = tagOpen + '>' + tagContent + '</' + this._currentElement.type + '>';
          }
        }
        switch (this._tag) {
          case 'input':
            transaction.getReactMountReady().enqueue(inputPostMount, this);
            if (props.autoFocus) {
              transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
            }
            break;
          case 'textarea':
            transaction.getReactMountReady().enqueue(textareaPostMount, this);
            if (props.autoFocus) {
              transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
            }
            break;
          case 'select':
            if (props.autoFocus) {
              transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
            }
            break;
          case 'button':
            if (props.autoFocus) {
              transaction.getReactMountReady().enqueue(AutoFocusUtils.focusDOMComponent, this);
            }
            break;
          case 'option':
            transaction.getReactMountReady().enqueue(optionPostMount, this);
            break;
        }
        return mountImage;
      },
      _createOpenTagMarkupAndPutListeners: function(transaction, props) {
        var ret = '<' + this._currentElement.type;
        for (var propKey in props) {
          if (!props.hasOwnProperty(propKey)) {
            continue;
          }
          var propValue = props[propKey];
          if (propValue == null) {
            continue;
          }
          if (registrationNameModules.hasOwnProperty(propKey)) {
            if (propValue) {
              enqueuePutListener(this, propKey, propValue, transaction);
            }
          } else {
            if (propKey === STYLE) {
              if (propValue) {
                if ("production" !== 'production') {
                  this._previousStyle = propValue;
                }
                propValue = this._previousStyleCopy = _assign({}, props.style);
              }
              propValue = CSSPropertyOperations.createMarkupForStyles(propValue, this);
            }
            var markup = null;
            if (this._tag != null && isCustomComponent(this._tag, props)) {
              if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
                markup = DOMPropertyOperations.createMarkupForCustomAttribute(propKey, propValue);
              }
            } else {
              markup = DOMPropertyOperations.createMarkupForProperty(propKey, propValue);
            }
            if (markup) {
              ret += ' ' + markup;
            }
          }
        }
        if (transaction.renderToStaticMarkup) {
          return ret;
        }
        if (!this._hostParent) {
          ret += ' ' + DOMPropertyOperations.createMarkupForRoot();
        }
        ret += ' ' + DOMPropertyOperations.createMarkupForID(this._domID);
        return ret;
      },
      _createContentMarkup: function(transaction, props, context) {
        var ret = '';
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            ret = innerHTML.__html;
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
          var childrenToUse = contentToUse != null ? null : props.children;
          if (contentToUse != null) {
            ret = escapeTextContentForBrowser(contentToUse);
            if ("production" !== 'production') {
              setContentChildForInstrumentation.call(this, contentToUse);
            }
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction, context);
            ret = mountImages.join('');
          }
        }
        if (newlineEatingTags[this._tag] && ret.charAt(0) === '\n') {
          return '\n' + ret;
        } else {
          return ret;
        }
      },
      _createInitialChildren: function(transaction, props, context, lazyTree) {
        var innerHTML = props.dangerouslySetInnerHTML;
        if (innerHTML != null) {
          if (innerHTML.__html != null) {
            DOMLazyTree.queueHTML(lazyTree, innerHTML.__html);
          }
        } else {
          var contentToUse = CONTENT_TYPES[typeof props.children] ? props.children : null;
          var childrenToUse = contentToUse != null ? null : props.children;
          if (contentToUse != null) {
            if ("production" !== 'production') {
              setContentChildForInstrumentation.call(this, contentToUse);
            }
            DOMLazyTree.queueText(lazyTree, contentToUse);
          } else if (childrenToUse != null) {
            var mountImages = this.mountChildren(childrenToUse, transaction, context);
            for (var i = 0; i < mountImages.length; i++) {
              DOMLazyTree.queueChild(lazyTree, mountImages[i]);
            }
          }
        }
      },
      receiveComponent: function(nextElement, transaction, context) {
        var prevElement = this._currentElement;
        this._currentElement = nextElement;
        this.updateComponent(transaction, prevElement, nextElement, context);
      },
      updateComponent: function(transaction, prevElement, nextElement, context) {
        var lastProps = prevElement.props;
        var nextProps = this._currentElement.props;
        switch (this._tag) {
          case 'button':
            lastProps = ReactDOMButton.getHostProps(this, lastProps);
            nextProps = ReactDOMButton.getHostProps(this, nextProps);
            break;
          case 'input':
            ReactDOMInput.updateWrapper(this);
            lastProps = ReactDOMInput.getHostProps(this, lastProps);
            nextProps = ReactDOMInput.getHostProps(this, nextProps);
            break;
          case 'option':
            lastProps = ReactDOMOption.getHostProps(this, lastProps);
            nextProps = ReactDOMOption.getHostProps(this, nextProps);
            break;
          case 'select':
            lastProps = ReactDOMSelect.getHostProps(this, lastProps);
            nextProps = ReactDOMSelect.getHostProps(this, nextProps);
            break;
          case 'textarea':
            ReactDOMTextarea.updateWrapper(this);
            lastProps = ReactDOMTextarea.getHostProps(this, lastProps);
            nextProps = ReactDOMTextarea.getHostProps(this, nextProps);
            break;
        }
        assertValidProps(this, nextProps);
        this._updateDOMProperties(lastProps, nextProps, transaction);
        this._updateDOMChildren(lastProps, nextProps, transaction, context);
        if (this._tag === 'select') {
          transaction.getReactMountReady().enqueue(postUpdateSelectWrapper, this);
        }
      },
      _updateDOMProperties: function(lastProps, nextProps, transaction) {
        var propKey;
        var styleName;
        var styleUpdates;
        for (propKey in lastProps) {
          if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] == null) {
            continue;
          }
          if (propKey === STYLE) {
            var lastStyle = this._previousStyleCopy;
            for (styleName in lastStyle) {
              if (lastStyle.hasOwnProperty(styleName)) {
                styleUpdates = styleUpdates || {};
                styleUpdates[styleName] = '';
              }
            }
            this._previousStyleCopy = null;
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            if (lastProps[propKey]) {
              deleteListener(this, propKey);
            }
          } else if (isCustomComponent(this._tag, lastProps)) {
            if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
              DOMPropertyOperations.deleteValueForAttribute(getNode(this), propKey);
            }
          } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            DOMPropertyOperations.deleteValueForProperty(getNode(this), propKey);
          }
        }
        for (propKey in nextProps) {
          var nextProp = nextProps[propKey];
          var lastProp = propKey === STYLE ? this._previousStyleCopy : lastProps != null ? lastProps[propKey] : undefined;
          if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
            continue;
          }
          if (propKey === STYLE) {
            if (nextProp) {
              if ("production" !== 'production') {
                checkAndWarnForMutatedStyle(this._previousStyleCopy, this._previousStyle, this);
                this._previousStyle = nextProp;
              }
              nextProp = this._previousStyleCopy = _assign({}, nextProp);
            } else {
              this._previousStyleCopy = null;
            }
            if (lastProp) {
              for (styleName in lastProp) {
                if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = '';
                }
              }
              for (styleName in nextProp) {
                if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
                  styleUpdates = styleUpdates || {};
                  styleUpdates[styleName] = nextProp[styleName];
                }
              }
            } else {
              styleUpdates = nextProp;
            }
          } else if (registrationNameModules.hasOwnProperty(propKey)) {
            if (nextProp) {
              enqueuePutListener(this, propKey, nextProp, transaction);
            } else if (lastProp) {
              deleteListener(this, propKey);
            }
          } else if (isCustomComponent(this._tag, nextProps)) {
            if (!RESERVED_PROPS.hasOwnProperty(propKey)) {
              DOMPropertyOperations.setValueForAttribute(getNode(this), propKey, nextProp);
            }
          } else if (DOMProperty.properties[propKey] || DOMProperty.isCustomAttribute(propKey)) {
            var node = getNode(this);
            if (nextProp != null) {
              DOMPropertyOperations.setValueForProperty(node, propKey, nextProp);
            } else {
              DOMPropertyOperations.deleteValueForProperty(node, propKey);
            }
          }
        }
        if (styleUpdates) {
          CSSPropertyOperations.setValueForStyles(getNode(this), styleUpdates, this);
        }
      },
      _updateDOMChildren: function(lastProps, nextProps, transaction, context) {
        var lastContent = CONTENT_TYPES[typeof lastProps.children] ? lastProps.children : null;
        var nextContent = CONTENT_TYPES[typeof nextProps.children] ? nextProps.children : null;
        var lastHtml = lastProps.dangerouslySetInnerHTML && lastProps.dangerouslySetInnerHTML.__html;
        var nextHtml = nextProps.dangerouslySetInnerHTML && nextProps.dangerouslySetInnerHTML.__html;
        var lastChildren = lastContent != null ? null : lastProps.children;
        var nextChildren = nextContent != null ? null : nextProps.children;
        var lastHasContentOrHtml = lastContent != null || lastHtml != null;
        var nextHasContentOrHtml = nextContent != null || nextHtml != null;
        if (lastChildren != null && nextChildren == null) {
          this.updateChildren(null, transaction, context);
        } else if (lastHasContentOrHtml && !nextHasContentOrHtml) {
          this.updateTextContent('');
          if ("production" !== 'production') {
            ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
          }
        }
        if (nextContent != null) {
          if (lastContent !== nextContent) {
            this.updateTextContent('' + nextContent);
            if ("production" !== 'production') {
              setContentChildForInstrumentation.call(this, nextContent);
            }
          }
        } else if (nextHtml != null) {
          if (lastHtml !== nextHtml) {
            this.updateMarkup('' + nextHtml);
          }
          if ("production" !== 'production') {
            ReactInstrumentation.debugTool.onSetChildren(this._debugID, []);
          }
        } else if (nextChildren != null) {
          if ("production" !== 'production') {
            setContentChildForInstrumentation.call(this, null);
          }
          this.updateChildren(nextChildren, transaction, context);
        }
      },
      getHostNode: function() {
        return getNode(this);
      },
      unmountComponent: function(safely) {
        switch (this._tag) {
          case 'audio':
          case 'form':
          case 'iframe':
          case 'img':
          case 'link':
          case 'object':
          case 'source':
          case 'video':
            var listeners = this._wrapperState.listeners;
            if (listeners) {
              for (var i = 0; i < listeners.length; i++) {
                listeners[i].remove();
              }
            }
            break;
          case 'html':
          case 'head':
          case 'body':
            !false ? "production" !== 'production' ? invariant(false, '<%s> tried to unmount. Because of cross-browser quirks it is impossible to unmount some top-level components (eg <html>, <head>, and <body>) reliably and efficiently. To fix this, have a single top-level component that never unmounts render these elements.', this._tag) : _prodInvariant('66', this._tag) : void 0;
            break;
        }
        this.unmountChildren(safely);
        ReactDOMComponentTree.uncacheNode(this);
        EventPluginHub.deleteAllListeners(this);
        ReactComponentBrowserEnvironment.unmountIDFromEnvironment(this._rootNodeID);
        this._rootNodeID = null;
        this._domID = null;
        this._wrapperState = null;
        if ("production" !== 'production') {
          setContentChildForInstrumentation.call(this, null);
        }
      },
      getPublicInstance: function() {
        return getNode(this);
      }
    };
    _assign(ReactDOMComponent.prototype, ReactDOMComponent.Mixin, ReactMultiChild.Mixin);
    module.exports = ReactDOMComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMEmptyComponent.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/DOMLazyTree.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _assign = $__require('npm:object-assign@4.1.0.js');
  var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
  var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
  var ReactDOMEmptyComponent = function(instantiate) {
    this._currentElement = null;
    this._hostNode = null;
    this._hostParent = null;
    this._hostContainerInfo = null;
    this._domID = null;
  };
  _assign(ReactDOMEmptyComponent.prototype, {
    mountComponent: function(transaction, hostParent, hostContainerInfo, context) {
      var domID = hostContainerInfo._idCounter++;
      this._domID = domID;
      this._hostParent = hostParent;
      this._hostContainerInfo = hostContainerInfo;
      var nodeValue = ' react-empty: ' + this._domID + ' ';
      if (transaction.useCreateElement) {
        var ownerDocument = hostContainerInfo._ownerDocument;
        var node = ownerDocument.createComment(nodeValue);
        ReactDOMComponentTree.precacheNode(this, node);
        return DOMLazyTree(node);
      } else {
        if (transaction.renderToStaticMarkup) {
          return '';
        }
        return '<!--' + nodeValue + '-->';
      }
    },
    receiveComponent: function() {},
    getHostNode: function() {
      return ReactDOMComponentTree.getNodeFromInstance(this);
    },
    unmountComponent: function() {
      ReactDOMComponentTree.uncacheNode(this);
    }
  });
  module.exports = ReactDOMEmptyComponent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMTreeTraversal.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function getLowestCommonAncestor(instA, instB) {
      !('_hostNode' in instA) ? "production" !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
      !('_hostNode' in instB) ? "production" !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
      var depthA = 0;
      for (var tempA = instA; tempA; tempA = tempA._hostParent) {
        depthA++;
      }
      var depthB = 0;
      for (var tempB = instB; tempB; tempB = tempB._hostParent) {
        depthB++;
      }
      while (depthA - depthB > 0) {
        instA = instA._hostParent;
        depthA--;
      }
      while (depthB - depthA > 0) {
        instB = instB._hostParent;
        depthB--;
      }
      var depth = depthA;
      while (depth--) {
        if (instA === instB) {
          return instA;
        }
        instA = instA._hostParent;
        instB = instB._hostParent;
      }
      return null;
    }
    function isAncestor(instA, instB) {
      !('_hostNode' in instA) ? "production" !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : _prodInvariant('35') : void 0;
      !('_hostNode' in instB) ? "production" !== 'production' ? invariant(false, 'isAncestor: Invalid argument.') : _prodInvariant('35') : void 0;
      while (instB) {
        if (instB === instA) {
          return true;
        }
        instB = instB._hostParent;
      }
      return false;
    }
    function getParentInstance(inst) {
      !('_hostNode' in inst) ? "production" !== 'production' ? invariant(false, 'getParentInstance: Invalid argument.') : _prodInvariant('36') : void 0;
      return inst._hostParent;
    }
    function traverseTwoPhase(inst, fn, arg) {
      var path = [];
      while (inst) {
        path.push(inst);
        inst = inst._hostParent;
      }
      var i;
      for (i = path.length; i-- > 0; ) {
        fn(path[i], false, arg);
      }
      for (i = 0; i < path.length; i++) {
        fn(path[i], true, arg);
      }
    }
    function traverseEnterLeave(from, to, fn, argFrom, argTo) {
      var common = from && to ? getLowestCommonAncestor(from, to) : null;
      var pathFrom = [];
      while (from && from !== common) {
        pathFrom.push(from);
        from = from._hostParent;
      }
      var pathTo = [];
      while (to && to !== common) {
        pathTo.push(to);
        to = to._hostParent;
      }
      var i;
      for (i = 0; i < pathFrom.length; i++) {
        fn(pathFrom[i], true, argFrom);
      }
      for (i = pathTo.length; i-- > 0; ) {
        fn(pathTo[i], false, argTo);
      }
    }
    module.exports = {
      isAncestor: isAncestor,
      getLowestCommonAncestor: getLowestCommonAncestor,
      getParentInstance: getParentInstance,
      traverseTwoPhase: traverseTwoPhase,
      traverseEnterLeave: traverseEnterLeave
    };
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/createArrayFromMixed.js", ["npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function toArray(obj) {
      var length = obj.length;
      !(!Array.isArray(obj) && (typeof obj === 'object' || typeof obj === 'function')) ? "production" !== 'production' ? invariant(false, 'toArray: Array-like object expected') : invariant(false) : void 0;
      !(typeof length === 'number') ? "production" !== 'production' ? invariant(false, 'toArray: Object needs a length property') : invariant(false) : void 0;
      !(length === 0 || length - 1 in obj) ? "production" !== 'production' ? invariant(false, 'toArray: Object should have keys for indices') : invariant(false) : void 0;
      !(typeof obj.callee !== 'function') ? "production" !== 'production' ? invariant(false, 'toArray: Object can\'t be `arguments`. Use rest params ' + '(function(...args) {}) or Array.from() instead.') : invariant(false) : void 0;
      if (obj.hasOwnProperty) {
        try {
          return Array.prototype.slice.call(obj);
        } catch (e) {}
      }
      var ret = Array(length);
      for (var ii = 0; ii < length; ii++) {
        ret[ii] = obj[ii];
      }
      return ret;
    }
    function hasArrayNature(obj) {
      return (!!obj && (typeof obj == 'object' || typeof obj == 'function') && 'length' in obj && !('setInterval' in obj) && typeof obj.nodeType != 'number' && (Array.isArray(obj) || 'callee' in obj || 'item' in obj));
    }
    function createArrayFromMixed(obj) {
      if (!hasArrayNature(obj)) {
        return [obj];
      } else if (Array.isArray(obj)) {
        return obj.slice();
      } else {
        return toArray(obj);
      }
    }
    module.exports = createArrayFromMixed;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/getMarkupWrap.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var shouldWrap = {};
    var selectWrap = [1, '<select multiple="true">', '</select>'];
    var tableWrap = [1, '<table>', '</table>'];
    var trWrap = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
    var svgWrap = [1, '<svg xmlns="http://www.w3.org/2000/svg">', '</svg>'];
    var markupWrap = {
      '*': [1, '?<div>', '</div>'],
      'area': [1, '<map>', '</map>'],
      'col': [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      'legend': [1, '<fieldset>', '</fieldset>'],
      'param': [1, '<object>', '</object>'],
      'tr': [2, '<table><tbody>', '</tbody></table>'],
      'optgroup': selectWrap,
      'option': selectWrap,
      'caption': tableWrap,
      'colgroup': tableWrap,
      'tbody': tableWrap,
      'tfoot': tableWrap,
      'thead': tableWrap,
      'td': trWrap,
      'th': trWrap
    };
    var svgElements = ['circle', 'clipPath', 'defs', 'ellipse', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'text', 'tspan'];
    svgElements.forEach(function(nodeName) {
      markupWrap[nodeName] = svgWrap;
      shouldWrap[nodeName] = true;
    });
    function getMarkupWrap(nodeName) {
      !!!dummyNode ? "production" !== 'production' ? invariant(false, 'Markup wrapping node not initialized') : invariant(false) : void 0;
      if (!markupWrap.hasOwnProperty(nodeName)) {
        nodeName = '*';
      }
      if (!shouldWrap.hasOwnProperty(nodeName)) {
        if (nodeName === '*') {
          dummyNode.innerHTML = '<link />';
        } else {
          dummyNode.innerHTML = '<' + nodeName + '></' + nodeName + '>';
        }
        shouldWrap[nodeName] = !dummyNode.firstChild;
      }
      return shouldWrap[nodeName] ? markupWrap[nodeName] : null;
    }
    module.exports = getMarkupWrap;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/createNodesFromMarkup.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:fbjs@0.8.3/lib/createArrayFromMixed.js", "npm:fbjs@0.8.3/lib/getMarkupWrap.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var createArrayFromMixed = $__require('npm:fbjs@0.8.3/lib/createArrayFromMixed.js');
    var getMarkupWrap = $__require('npm:fbjs@0.8.3/lib/getMarkupWrap.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var dummyNode = ExecutionEnvironment.canUseDOM ? document.createElement('div') : null;
    var nodeNamePattern = /^\s*<(\w+)/;
    function getNodeName(markup) {
      var nodeNameMatch = markup.match(nodeNamePattern);
      return nodeNameMatch && nodeNameMatch[1].toLowerCase();
    }
    function createNodesFromMarkup(markup, handleScript) {
      var node = dummyNode;
      !!!dummyNode ? "production" !== 'production' ? invariant(false, 'createNodesFromMarkup dummy not initialized') : invariant(false) : void 0;
      var nodeName = getNodeName(markup);
      var wrap = nodeName && getMarkupWrap(nodeName);
      if (wrap) {
        node.innerHTML = wrap[1] + markup + wrap[2];
        var wrapDepth = wrap[0];
        while (wrapDepth--) {
          node = node.lastChild;
        }
      } else {
        node.innerHTML = markup;
      }
      var scripts = node.getElementsByTagName('script');
      if (scripts.length) {
        !handleScript ? "production" !== 'production' ? invariant(false, 'createNodesFromMarkup(...): Unexpected <script> element rendered.') : invariant(false) : void 0;
        createArrayFromMixed(scripts).forEach(handleScript);
      }
      var nodes = Array.from(node.childNodes);
      while (node.lastChild) {
        node.removeChild(node.lastChild);
      }
      return nodes;
    }
    module.exports = createNodesFromMarkup;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/Danger.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/DOMLazyTree.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:fbjs@0.8.3/lib/createNodesFromMarkup.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var createNodesFromMarkup = $__require('npm:fbjs@0.8.3/lib/createNodesFromMarkup.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var Danger = {dangerouslyReplaceNodeWithMarkup: function(oldChild, markup) {
        !ExecutionEnvironment.canUseDOM ? "production" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot render markup in a worker thread. Make sure `window` and `document` are available globally before requiring React when unit testing or use ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('56') : void 0;
        !markup ? "production" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Missing markup.') : _prodInvariant('57') : void 0;
        !(oldChild.nodeName !== 'HTML') ? "production" !== 'production' ? invariant(false, 'dangerouslyReplaceNodeWithMarkup(...): Cannot replace markup of the <html> node. This is because browser quirks make this unreliable and/or slow. If you want to render to the root you must use server rendering. See ReactDOMServer.renderToString().') : _prodInvariant('58') : void 0;
        if (typeof markup === 'string') {
          var newChild = createNodesFromMarkup(markup, emptyFunction)[0];
          oldChild.parentNode.replaceChild(newChild, oldChild);
        } else {
          DOMLazyTree.replaceChildWithTree(oldChild, markup);
        }
      }};
    module.exports = Danger;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js", ["npm:fbjs@0.8.3/lib/keyMirror.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyMirror = $__require('npm:fbjs@0.8.3/lib/keyMirror.js');
  var ReactMultiChildUpdateTypes = keyMirror({
    INSERT_MARKUP: null,
    MOVE_EXISTING: null,
    REMOVE_NODE: null,
    SET_MARKUP: null,
    TEXT_CONTENT: null
  });
  module.exports = ReactMultiChildUpdateTypes;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DOMChildrenOperations.js", ["npm:react@15.2.1/lib/DOMLazyTree.js", "npm:react@15.2.1/lib/Danger.js", "npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js", "npm:react@15.2.1/lib/setInnerHTML.js", "npm:react@15.2.1/lib/setTextContent.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
    var Danger = $__require('npm:react@15.2.1/lib/Danger.js');
    var ReactMultiChildUpdateTypes = $__require('npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var createMicrosoftUnsafeLocalFunction = $__require('npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js');
    var setInnerHTML = $__require('npm:react@15.2.1/lib/setInnerHTML.js');
    var setTextContent = $__require('npm:react@15.2.1/lib/setTextContent.js');
    function getNodeAfter(parentNode, node) {
      if (Array.isArray(node)) {
        node = node[1];
      }
      return node ? node.nextSibling : parentNode.firstChild;
    }
    var insertChildAt = createMicrosoftUnsafeLocalFunction(function(parentNode, childNode, referenceNode) {
      parentNode.insertBefore(childNode, referenceNode);
    });
    function insertLazyTreeChildAt(parentNode, childTree, referenceNode) {
      DOMLazyTree.insertTreeBefore(parentNode, childTree, referenceNode);
    }
    function moveChild(parentNode, childNode, referenceNode) {
      if (Array.isArray(childNode)) {
        moveDelimitedText(parentNode, childNode[0], childNode[1], referenceNode);
      } else {
        insertChildAt(parentNode, childNode, referenceNode);
      }
    }
    function removeChild(parentNode, childNode) {
      if (Array.isArray(childNode)) {
        var closingComment = childNode[1];
        childNode = childNode[0];
        removeDelimitedText(parentNode, childNode, closingComment);
        parentNode.removeChild(closingComment);
      }
      parentNode.removeChild(childNode);
    }
    function moveDelimitedText(parentNode, openingComment, closingComment, referenceNode) {
      var node = openingComment;
      while (true) {
        var nextNode = node.nextSibling;
        insertChildAt(parentNode, node, referenceNode);
        if (node === closingComment) {
          break;
        }
        node = nextNode;
      }
    }
    function removeDelimitedText(parentNode, startNode, closingComment) {
      while (true) {
        var node = startNode.nextSibling;
        if (node === closingComment) {
          break;
        } else {
          parentNode.removeChild(node);
        }
      }
    }
    function replaceDelimitedText(openingComment, closingComment, stringText) {
      var parentNode = openingComment.parentNode;
      var nodeAfterComment = openingComment.nextSibling;
      if (nodeAfterComment === closingComment) {
        if (stringText) {
          insertChildAt(parentNode, document.createTextNode(stringText), nodeAfterComment);
        }
      } else {
        if (stringText) {
          setTextContent(nodeAfterComment, stringText);
          removeDelimitedText(parentNode, nodeAfterComment, closingComment);
        } else {
          removeDelimitedText(parentNode, openingComment, closingComment);
        }
      }
      if ("production" !== 'production') {
        ReactInstrumentation.debugTool.onHostOperation(ReactDOMComponentTree.getInstanceFromNode(openingComment)._debugID, 'replace text', stringText);
      }
    }
    var dangerouslyReplaceNodeWithMarkup = Danger.dangerouslyReplaceNodeWithMarkup;
    if ("production" !== 'production') {
      dangerouslyReplaceNodeWithMarkup = function(oldChild, markup, prevInstance) {
        Danger.dangerouslyReplaceNodeWithMarkup(oldChild, markup);
        if (prevInstance._debugID !== 0) {
          ReactInstrumentation.debugTool.onHostOperation(prevInstance._debugID, 'replace with', markup.toString());
        } else {
          var nextInstance = ReactDOMComponentTree.getInstanceFromNode(markup.node);
          if (nextInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onHostOperation(nextInstance._debugID, 'mount', markup.toString());
          }
        }
      };
    }
    var DOMChildrenOperations = {
      dangerouslyReplaceNodeWithMarkup: dangerouslyReplaceNodeWithMarkup,
      replaceDelimitedText: replaceDelimitedText,
      processUpdates: function(parentNode, updates) {
        if ("production" !== 'production') {
          var parentNodeDebugID = ReactDOMComponentTree.getInstanceFromNode(parentNode)._debugID;
        }
        for (var k = 0; k < updates.length; k++) {
          var update = updates[k];
          switch (update.type) {
            case ReactMultiChildUpdateTypes.INSERT_MARKUP:
              insertLazyTreeChildAt(parentNode, update.content, getNodeAfter(parentNode, update.afterNode));
              if ("production" !== 'production') {
                ReactInstrumentation.debugTool.onHostOperation(parentNodeDebugID, 'insert child', {
                  toIndex: update.toIndex,
                  content: update.content.toString()
                });
              }
              break;
            case ReactMultiChildUpdateTypes.MOVE_EXISTING:
              moveChild(parentNode, update.fromNode, getNodeAfter(parentNode, update.afterNode));
              if ("production" !== 'production') {
                ReactInstrumentation.debugTool.onHostOperation(parentNodeDebugID, 'move child', {
                  fromIndex: update.fromIndex,
                  toIndex: update.toIndex
                });
              }
              break;
            case ReactMultiChildUpdateTypes.SET_MARKUP:
              setInnerHTML(parentNode, update.content);
              if ("production" !== 'production') {
                ReactInstrumentation.debugTool.onHostOperation(parentNodeDebugID, 'replace children', update.content.toString());
              }
              break;
            case ReactMultiChildUpdateTypes.TEXT_CONTENT:
              setTextContent(parentNode, update.content);
              if ("production" !== 'production') {
                ReactInstrumentation.debugTool.onHostOperation(parentNodeDebugID, 'replace text', update.content.toString());
              }
              break;
            case ReactMultiChildUpdateTypes.REMOVE_NODE:
              removeChild(parentNode, update.fromNode);
              if ("production" !== 'production') {
                ReactInstrumentation.debugTool.onHostOperation(parentNodeDebugID, 'remove child', {fromIndex: update.fromIndex});
              }
              break;
          }
        }
      }
    };
    module.exports = DOMChildrenOperations;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMTextComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/DOMChildrenOperations.js", "npm:react@15.2.1/lib/DOMLazyTree.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/escapeTextContentForBrowser.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:react@15.2.1/lib/validateDOMNesting.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var DOMChildrenOperations = $__require('npm:react@15.2.1/lib/DOMChildrenOperations.js');
    var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var escapeTextContentForBrowser = $__require('npm:react@15.2.1/lib/escapeTextContentForBrowser.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var validateDOMNesting = $__require('npm:react@15.2.1/lib/validateDOMNesting.js');
    var ReactDOMTextComponent = function(text) {
      this._currentElement = text;
      this._stringText = '' + text;
      this._hostNode = null;
      this._hostParent = null;
      this._domID = null;
      this._mountIndex = 0;
      this._closingComment = null;
      this._commentNodes = null;
    };
    _assign(ReactDOMTextComponent.prototype, {
      mountComponent: function(transaction, hostParent, hostContainerInfo, context) {
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onSetText(this._debugID, this._stringText);
          var parentInfo;
          if (hostParent != null) {
            parentInfo = hostParent._ancestorInfo;
          } else if (hostContainerInfo != null) {
            parentInfo = hostContainerInfo._ancestorInfo;
          }
          if (parentInfo) {
            validateDOMNesting('#text', this, parentInfo);
          }
        }
        var domID = hostContainerInfo._idCounter++;
        var openingValue = ' react-text: ' + domID + ' ';
        var closingValue = ' /react-text ';
        this._domID = domID;
        this._hostParent = hostParent;
        if (transaction.useCreateElement) {
          var ownerDocument = hostContainerInfo._ownerDocument;
          var openingComment = ownerDocument.createComment(openingValue);
          var closingComment = ownerDocument.createComment(closingValue);
          var lazyTree = DOMLazyTree(ownerDocument.createDocumentFragment());
          DOMLazyTree.queueChild(lazyTree, DOMLazyTree(openingComment));
          if (this._stringText) {
            DOMLazyTree.queueChild(lazyTree, DOMLazyTree(ownerDocument.createTextNode(this._stringText)));
          }
          DOMLazyTree.queueChild(lazyTree, DOMLazyTree(closingComment));
          ReactDOMComponentTree.precacheNode(this, openingComment);
          this._closingComment = closingComment;
          return lazyTree;
        } else {
          var escapedText = escapeTextContentForBrowser(this._stringText);
          if (transaction.renderToStaticMarkup) {
            return escapedText;
          }
          return '<!--' + openingValue + '-->' + escapedText + '<!--' + closingValue + '-->';
        }
      },
      receiveComponent: function(nextText, transaction) {
        if (nextText !== this._currentElement) {
          this._currentElement = nextText;
          var nextStringText = '' + nextText;
          if (nextStringText !== this._stringText) {
            this._stringText = nextStringText;
            var commentNodes = this.getHostNode();
            DOMChildrenOperations.replaceDelimitedText(commentNodes[0], commentNodes[1], nextStringText);
            if ("production" !== 'production') {
              ReactInstrumentation.debugTool.onSetText(this._debugID, nextStringText);
            }
          }
        }
      },
      getHostNode: function() {
        var hostNode = this._commentNodes;
        if (hostNode) {
          return hostNode;
        }
        if (!this._closingComment) {
          var openingComment = ReactDOMComponentTree.getNodeFromInstance(this);
          var node = openingComment.nextSibling;
          while (true) {
            !(node != null) ? "production" !== 'production' ? invariant(false, 'Missing closing comment for text component %s', this._domID) : _prodInvariant('67', this._domID) : void 0;
            if (node.nodeType === 8 && node.nodeValue === ' /react-text ') {
              this._closingComment = node;
              break;
            }
            node = node.nextSibling;
          }
        }
        hostNode = [this._hostNode, this._closingComment];
        this._commentNodes = hostNode;
        return hostNode;
      },
      unmountComponent: function() {
        this._closingComment = null;
        this._commentNodes = null;
        ReactDOMComponentTree.uncacheNode(this);
      }
    });
    module.exports = ReactDOMTextComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDefaultBatchingStrategy.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:react@15.2.1/lib/Transaction.js", "npm:fbjs@0.8.3/lib/emptyFunction.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _assign = $__require('npm:object-assign@4.1.0.js');
  var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
  var Transaction = $__require('npm:react@15.2.1/lib/Transaction.js');
  var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
  var RESET_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: function() {
      ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    }
  };
  var FLUSH_BATCHED_UPDATES = {
    initialize: emptyFunction,
    close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
  };
  var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];
  function ReactDefaultBatchingStrategyTransaction() {
    this.reinitializeTransaction();
  }
  _assign(ReactDefaultBatchingStrategyTransaction.prototype, Transaction.Mixin, {getTransactionWrappers: function() {
      return TRANSACTION_WRAPPERS;
    }});
  var transaction = new ReactDefaultBatchingStrategyTransaction();
  var ReactDefaultBatchingStrategy = {
    isBatchingUpdates: false,
    batchedUpdates: function(callback, a, b, c, d, e) {
      var alreadyBatchingUpdates = ReactDefaultBatchingStrategy.isBatchingUpdates;
      ReactDefaultBatchingStrategy.isBatchingUpdates = true;
      if (alreadyBatchingUpdates) {
        callback(a, b, c, d, e);
      } else {
        transaction.perform(callback, null, a, b, c, d, e);
      }
    }
  };
  module.exports = ReactDefaultBatchingStrategy;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/getUnboundedScrollPosition.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getUnboundedScrollPosition(scrollable) {
    if (scrollable === window) {
      return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
      };
    }
    return {
      x: scrollable.scrollLeft,
      y: scrollable.scrollTop
    };
  }
  module.exports = getUnboundedScrollPosition;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactEventListener.js", ["npm:object-assign@4.1.0.js", "npm:fbjs@0.8.3/lib/EventListener.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:react@15.2.1/lib/getEventTarget.js", "npm:fbjs@0.8.3/lib/getUnboundedScrollPosition.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var EventListener = $__require('npm:fbjs@0.8.3/lib/EventListener.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var getEventTarget = $__require('npm:react@15.2.1/lib/getEventTarget.js');
    var getUnboundedScrollPosition = $__require('npm:fbjs@0.8.3/lib/getUnboundedScrollPosition.js');
    function findParent(inst) {
      while (inst._hostParent) {
        inst = inst._hostParent;
      }
      var rootNode = ReactDOMComponentTree.getNodeFromInstance(inst);
      var container = rootNode.parentNode;
      return ReactDOMComponentTree.getClosestInstanceFromNode(container);
    }
    function TopLevelCallbackBookKeeping(topLevelType, nativeEvent) {
      this.topLevelType = topLevelType;
      this.nativeEvent = nativeEvent;
      this.ancestors = [];
    }
    _assign(TopLevelCallbackBookKeeping.prototype, {destructor: function() {
        this.topLevelType = null;
        this.nativeEvent = null;
        this.ancestors.length = 0;
      }});
    PooledClass.addPoolingTo(TopLevelCallbackBookKeeping, PooledClass.twoArgumentPooler);
    function handleTopLevelImpl(bookKeeping) {
      var nativeEventTarget = getEventTarget(bookKeeping.nativeEvent);
      var targetInst = ReactDOMComponentTree.getClosestInstanceFromNode(nativeEventTarget);
      var ancestor = targetInst;
      do {
        bookKeeping.ancestors.push(ancestor);
        ancestor = ancestor && findParent(ancestor);
      } while (ancestor);
      for (var i = 0; i < bookKeeping.ancestors.length; i++) {
        targetInst = bookKeeping.ancestors[i];
        ReactEventListener._handleTopLevel(bookKeeping.topLevelType, targetInst, bookKeeping.nativeEvent, getEventTarget(bookKeeping.nativeEvent));
      }
    }
    function scrollValueMonitor(cb) {
      var scrollPosition = getUnboundedScrollPosition(window);
      cb(scrollPosition);
    }
    var ReactEventListener = {
      _enabled: true,
      _handleTopLevel: null,
      WINDOW_HANDLE: ExecutionEnvironment.canUseDOM ? window : null,
      setHandleTopLevel: function(handleTopLevel) {
        ReactEventListener._handleTopLevel = handleTopLevel;
      },
      setEnabled: function(enabled) {
        ReactEventListener._enabled = !!enabled;
      },
      isEnabled: function() {
        return ReactEventListener._enabled;
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.listen(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        var element = handle;
        if (!element) {
          return null;
        }
        return EventListener.capture(element, handlerBaseName, ReactEventListener.dispatchEvent.bind(null, topLevelType));
      },
      monitorScrollValue: function(refresh) {
        var callback = scrollValueMonitor.bind(null, refresh);
        EventListener.listen(window, 'scroll', callback);
      },
      dispatchEvent: function(topLevelType, nativeEvent) {
        if (!ReactEventListener._enabled) {
          return;
        }
        var bookKeeping = TopLevelCallbackBookKeeping.getPooled(topLevelType, nativeEvent);
        try {
          ReactUpdates.batchedUpdates(handleTopLevelImpl, bookKeeping);
        } finally {
          TopLevelCallbackBookKeeping.release(bookKeeping);
        }
      }
    };
    module.exports = ReactEventListener;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactInjection.js", ["npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/EventPluginHub.js", "npm:react@15.2.1/lib/EventPluginUtils.js", "npm:react@15.2.1/lib/ReactComponentEnvironment.js", "npm:react@15.2.1/lib/ReactClass.js", "npm:react@15.2.1/lib/ReactEmptyComponent.js", "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js", "npm:react@15.2.1/lib/ReactHostComponent.js", "npm:react@15.2.1/lib/ReactUpdates.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
  var EventPluginHub = $__require('npm:react@15.2.1/lib/EventPluginHub.js');
  var EventPluginUtils = $__require('npm:react@15.2.1/lib/EventPluginUtils.js');
  var ReactComponentEnvironment = $__require('npm:react@15.2.1/lib/ReactComponentEnvironment.js');
  var ReactClass = $__require('npm:react@15.2.1/lib/ReactClass.js');
  var ReactEmptyComponent = $__require('npm:react@15.2.1/lib/ReactEmptyComponent.js');
  var ReactBrowserEventEmitter = $__require('npm:react@15.2.1/lib/ReactBrowserEventEmitter.js');
  var ReactHostComponent = $__require('npm:react@15.2.1/lib/ReactHostComponent.js');
  var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
  var ReactInjection = {
    Component: ReactComponentEnvironment.injection,
    Class: ReactClass.injection,
    DOMProperty: DOMProperty.injection,
    EmptyComponent: ReactEmptyComponent.injection,
    EventPluginHub: EventPluginHub.injection,
    EventPluginUtils: EventPluginUtils.injection,
    EventEmitter: ReactBrowserEventEmitter.injection,
    HostComponent: ReactHostComponent.injection,
    Updates: ReactUpdates.injection
  };
  module.exports = ReactInjection;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactReconcileTransaction.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/CallbackQueue.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js", "npm:react@15.2.1/lib/ReactInputSelection.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/Transaction.js", "npm:react@15.2.1/lib/ReactUpdateQueue.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var CallbackQueue = $__require('npm:react@15.2.1/lib/CallbackQueue.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var ReactBrowserEventEmitter = $__require('npm:react@15.2.1/lib/ReactBrowserEventEmitter.js');
    var ReactInputSelection = $__require('npm:react@15.2.1/lib/ReactInputSelection.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var Transaction = $__require('npm:react@15.2.1/lib/Transaction.js');
    var ReactUpdateQueue = $__require('npm:react@15.2.1/lib/ReactUpdateQueue.js');
    var SELECTION_RESTORATION = {
      initialize: ReactInputSelection.getSelectionInformation,
      close: ReactInputSelection.restoreSelection
    };
    var EVENT_SUPPRESSION = {
      initialize: function() {
        var currentlyEnabled = ReactBrowserEventEmitter.isEnabled();
        ReactBrowserEventEmitter.setEnabled(false);
        return currentlyEnabled;
      },
      close: function(previouslyEnabled) {
        ReactBrowserEventEmitter.setEnabled(previouslyEnabled);
      }
    };
    var ON_DOM_READY_QUEUEING = {
      initialize: function() {
        this.reactMountReady.reset();
      },
      close: function() {
        this.reactMountReady.notifyAll();
      }
    };
    var TRANSACTION_WRAPPERS = [SELECTION_RESTORATION, EVENT_SUPPRESSION, ON_DOM_READY_QUEUEING];
    if ("production" !== 'production') {
      TRANSACTION_WRAPPERS.push({
        initialize: ReactInstrumentation.debugTool.onBeginFlush,
        close: ReactInstrumentation.debugTool.onEndFlush
      });
    }
    function ReactReconcileTransaction(useCreateElement) {
      this.reinitializeTransaction();
      this.renderToStaticMarkup = false;
      this.reactMountReady = CallbackQueue.getPooled(null);
      this.useCreateElement = useCreateElement;
    }
    var Mixin = {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
      getReactMountReady: function() {
        return this.reactMountReady;
      },
      getUpdateQueue: function() {
        return ReactUpdateQueue;
      },
      checkpoint: function() {
        return this.reactMountReady.checkpoint();
      },
      rollback: function(checkpoint) {
        this.reactMountReady.rollback(checkpoint);
      },
      destructor: function() {
        CallbackQueue.release(this.reactMountReady);
        this.reactMountReady = null;
      }
    };
    _assign(ReactReconcileTransaction.prototype, Transaction.Mixin, Mixin);
    PooledClass.addPoolingTo(ReactReconcileTransaction);
    module.exports = ReactReconcileTransaction;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SVGDOMPropertyConfig.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var NS = {
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace'
  };
  var ATTRS = {
    accentHeight: 'accent-height',
    accumulate: 0,
    additive: 0,
    alignmentBaseline: 'alignment-baseline',
    allowReorder: 'allowReorder',
    alphabetic: 0,
    amplitude: 0,
    arabicForm: 'arabic-form',
    ascent: 0,
    attributeName: 'attributeName',
    attributeType: 'attributeType',
    autoReverse: 'autoReverse',
    azimuth: 0,
    baseFrequency: 'baseFrequency',
    baseProfile: 'baseProfile',
    baselineShift: 'baseline-shift',
    bbox: 0,
    begin: 0,
    bias: 0,
    by: 0,
    calcMode: 'calcMode',
    capHeight: 'cap-height',
    clip: 0,
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    clipPathUnits: 'clipPathUnits',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    contentScriptType: 'contentScriptType',
    contentStyleType: 'contentStyleType',
    cursor: 0,
    cx: 0,
    cy: 0,
    d: 0,
    decelerate: 0,
    descent: 0,
    diffuseConstant: 'diffuseConstant',
    direction: 0,
    display: 0,
    divisor: 0,
    dominantBaseline: 'dominant-baseline',
    dur: 0,
    dx: 0,
    dy: 0,
    edgeMode: 'edgeMode',
    elevation: 0,
    enableBackground: 'enable-background',
    end: 0,
    exponent: 0,
    externalResourcesRequired: 'externalResourcesRequired',
    fill: 0,
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    filter: 0,
    filterRes: 'filterRes',
    filterUnits: 'filterUnits',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    focusable: 0,
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    format: 0,
    from: 0,
    fx: 0,
    fy: 0,
    g1: 0,
    g2: 0,
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    glyphRef: 'glyphRef',
    gradientTransform: 'gradientTransform',
    gradientUnits: 'gradientUnits',
    hanging: 0,
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    ideographic: 0,
    imageRendering: 'image-rendering',
    'in': 0,
    in2: 0,
    intercept: 0,
    k: 0,
    k1: 0,
    k2: 0,
    k3: 0,
    k4: 0,
    kernelMatrix: 'kernelMatrix',
    kernelUnitLength: 'kernelUnitLength',
    kerning: 0,
    keyPoints: 'keyPoints',
    keySplines: 'keySplines',
    keyTimes: 'keyTimes',
    lengthAdjust: 'lengthAdjust',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    limitingConeAngle: 'limitingConeAngle',
    local: 0,
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    markerHeight: 'markerHeight',
    markerUnits: 'markerUnits',
    markerWidth: 'markerWidth',
    mask: 0,
    maskContentUnits: 'maskContentUnits',
    maskUnits: 'maskUnits',
    mathematical: 0,
    mode: 0,
    numOctaves: 'numOctaves',
    offset: 0,
    opacity: 0,
    operator: 0,
    order: 0,
    orient: 0,
    orientation: 0,
    origin: 0,
    overflow: 0,
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pathLength: 'pathLength',
    patternContentUnits: 'patternContentUnits',
    patternTransform: 'patternTransform',
    patternUnits: 'patternUnits',
    pointerEvents: 'pointer-events',
    points: 0,
    pointsAtX: 'pointsAtX',
    pointsAtY: 'pointsAtY',
    pointsAtZ: 'pointsAtZ',
    preserveAlpha: 'preserveAlpha',
    preserveAspectRatio: 'preserveAspectRatio',
    primitiveUnits: 'primitiveUnits',
    r: 0,
    radius: 0,
    refX: 'refX',
    refY: 'refY',
    renderingIntent: 'rendering-intent',
    repeatCount: 'repeatCount',
    repeatDur: 'repeatDur',
    requiredExtensions: 'requiredExtensions',
    requiredFeatures: 'requiredFeatures',
    restart: 0,
    result: 0,
    rotate: 0,
    rx: 0,
    ry: 0,
    scale: 0,
    seed: 0,
    shapeRendering: 'shape-rendering',
    slope: 0,
    spacing: 0,
    specularConstant: 'specularConstant',
    specularExponent: 'specularExponent',
    speed: 0,
    spreadMethod: 'spreadMethod',
    startOffset: 'startOffset',
    stdDeviation: 'stdDeviation',
    stemh: 0,
    stemv: 0,
    stitchTiles: 'stitchTiles',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    string: 0,
    stroke: 0,
    strokeDasharray: 'stroke-dasharray',
    strokeDashoffset: 'stroke-dashoffset',
    strokeLinecap: 'stroke-linecap',
    strokeLinejoin: 'stroke-linejoin',
    strokeMiterlimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    surfaceScale: 'surfaceScale',
    systemLanguage: 'systemLanguage',
    tableValues: 'tableValues',
    targetX: 'targetX',
    targetY: 'targetY',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    textLength: 'textLength',
    to: 0,
    transform: 0,
    u1: 0,
    u2: 0,
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicode: 0,
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    values: 0,
    vectorEffect: 'vector-effect',
    version: 0,
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    viewBox: 'viewBox',
    viewTarget: 'viewTarget',
    visibility: 0,
    widths: 0,
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    x: 0,
    xHeight: 'x-height',
    x1: 0,
    x2: 0,
    xChannelSelector: 'xChannelSelector',
    xlinkActuate: 'xlink:actuate',
    xlinkArcrole: 'xlink:arcrole',
    xlinkHref: 'xlink:href',
    xlinkRole: 'xlink:role',
    xlinkShow: 'xlink:show',
    xlinkTitle: 'xlink:title',
    xlinkType: 'xlink:type',
    xmlBase: 'xml:base',
    xmlLang: 'xml:lang',
    xmlSpace: 'xml:space',
    y: 0,
    y1: 0,
    y2: 0,
    yChannelSelector: 'yChannelSelector',
    z: 0,
    zoomAndPan: 'zoomAndPan'
  };
  var SVGDOMPropertyConfig = {
    Properties: {},
    DOMAttributeNamespaces: {
      xlinkActuate: NS.xlink,
      xlinkArcrole: NS.xlink,
      xlinkHref: NS.xlink,
      xlinkRole: NS.xlink,
      xlinkShow: NS.xlink,
      xlinkTitle: NS.xlink,
      xlinkType: NS.xlink,
      xmlBase: NS.xml,
      xmlLang: NS.xml,
      xmlSpace: NS.xml
    },
    DOMAttributeNames: {}
  };
  Object.keys(ATTRS).forEach(function(key) {
    SVGDOMPropertyConfig.Properties[key] = 0;
    if (ATTRS[key]) {
      SVGDOMPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
    }
  });
  module.exports = SVGDOMPropertyConfig;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getNodeForCharacterOffset.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getLeafNode(node) {
    while (node && node.firstChild) {
      node = node.firstChild;
    }
    return node;
  }
  function getSiblingNode(node) {
    while (node) {
      if (node.nextSibling) {
        return node.nextSibling;
      }
      node = node.parentNode;
    }
  }
  function getNodeForCharacterOffset(root, offset) {
    var node = getLeafNode(root);
    var nodeStart = 0;
    var nodeEnd = 0;
    while (node) {
      if (node.nodeType === 3) {
        nodeEnd = nodeStart + node.textContent.length;
        if (nodeStart <= offset && nodeEnd >= offset) {
          return {
            node: node,
            offset: offset - nodeStart
          };
        }
        nodeStart = nodeEnd;
      }
      node = getLeafNode(getSiblingNode(node));
    }
  }
  module.exports = getNodeForCharacterOffset;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getTextContentAccessor.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var contentKey = null;
  function getTextContentAccessor() {
    if (!contentKey && ExecutionEnvironment.canUseDOM) {
      contentKey = 'textContent' in document.documentElement ? 'textContent' : 'innerText';
    }
    return contentKey;
  }
  module.exports = getTextContentAccessor;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMSelection.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/getNodeForCharacterOffset.js", "npm:react@15.2.1/lib/getTextContentAccessor.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var getNodeForCharacterOffset = $__require('npm:react@15.2.1/lib/getNodeForCharacterOffset.js');
  var getTextContentAccessor = $__require('npm:react@15.2.1/lib/getTextContentAccessor.js');
  function isCollapsed(anchorNode, anchorOffset, focusNode, focusOffset) {
    return anchorNode === focusNode && anchorOffset === focusOffset;
  }
  function getIEOffsets(node) {
    var selection = document.selection;
    var selectedRange = selection.createRange();
    var selectedLength = selectedRange.text.length;
    var fromStart = selectedRange.duplicate();
    fromStart.moveToElementText(node);
    fromStart.setEndPoint('EndToStart', selectedRange);
    var startOffset = fromStart.text.length;
    var endOffset = startOffset + selectedLength;
    return {
      start: startOffset,
      end: endOffset
    };
  }
  function getModernOffsets(node) {
    var selection = window.getSelection && window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return null;
    }
    var anchorNode = selection.anchorNode;
    var anchorOffset = selection.anchorOffset;
    var focusNode = selection.focusNode;
    var focusOffset = selection.focusOffset;
    var currentRange = selection.getRangeAt(0);
    try {
      currentRange.startContainer.nodeType;
      currentRange.endContainer.nodeType;
    } catch (e) {
      return null;
    }
    var isSelectionCollapsed = isCollapsed(selection.anchorNode, selection.anchorOffset, selection.focusNode, selection.focusOffset);
    var rangeLength = isSelectionCollapsed ? 0 : currentRange.toString().length;
    var tempRange = currentRange.cloneRange();
    tempRange.selectNodeContents(node);
    tempRange.setEnd(currentRange.startContainer, currentRange.startOffset);
    var isTempRangeCollapsed = isCollapsed(tempRange.startContainer, tempRange.startOffset, tempRange.endContainer, tempRange.endOffset);
    var start = isTempRangeCollapsed ? 0 : tempRange.toString().length;
    var end = start + rangeLength;
    var detectionRange = document.createRange();
    detectionRange.setStart(anchorNode, anchorOffset);
    detectionRange.setEnd(focusNode, focusOffset);
    var isBackward = detectionRange.collapsed;
    return {
      start: isBackward ? end : start,
      end: isBackward ? start : end
    };
  }
  function setIEOffsets(node, offsets) {
    var range = document.selection.createRange().duplicate();
    var start,
        end;
    if (offsets.end === undefined) {
      start = offsets.start;
      end = start;
    } else if (offsets.start > offsets.end) {
      start = offsets.end;
      end = offsets.start;
    } else {
      start = offsets.start;
      end = offsets.end;
    }
    range.moveToElementText(node);
    range.moveStart('character', start);
    range.setEndPoint('EndToStart', range);
    range.moveEnd('character', end - start);
    range.select();
  }
  function setModernOffsets(node, offsets) {
    if (!window.getSelection) {
      return;
    }
    var selection = window.getSelection();
    var length = node[getTextContentAccessor()].length;
    var start = Math.min(offsets.start, length);
    var end = offsets.end === undefined ? start : Math.min(offsets.end, length);
    if (!selection.extend && start > end) {
      var temp = end;
      end = start;
      start = temp;
    }
    var startMarker = getNodeForCharacterOffset(node, start);
    var endMarker = getNodeForCharacterOffset(node, end);
    if (startMarker && endMarker) {
      var range = document.createRange();
      range.setStart(startMarker.node, startMarker.offset);
      selection.removeAllRanges();
      if (start > end) {
        selection.addRange(range);
        selection.extend(endMarker.node, endMarker.offset);
      } else {
        range.setEnd(endMarker.node, endMarker.offset);
        selection.addRange(range);
      }
    }
  }
  var useIEOffsets = ExecutionEnvironment.canUseDOM && 'selection' in document && !('getSelection' in window);
  var ReactDOMSelection = {
    getOffsets: useIEOffsets ? getIEOffsets : getModernOffsets,
    setOffsets: useIEOffsets ? setIEOffsets : setModernOffsets
  };
  module.exports = ReactDOMSelection;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/isNode.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isNode(object) {
    return !!(object && (typeof Node === 'function' ? object instanceof Node : typeof object === 'object' && typeof object.nodeType === 'number' && typeof object.nodeName === 'string'));
  }
  module.exports = isNode;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/isTextNode.js", ["npm:fbjs@0.8.3/lib/isNode.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isNode = $__require('npm:fbjs@0.8.3/lib/isNode.js');
  function isTextNode(object) {
    return isNode(object) && object.nodeType == 3;
  }
  module.exports = isTextNode;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/containsNode.js", ["npm:fbjs@0.8.3/lib/isTextNode.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isTextNode = $__require('npm:fbjs@0.8.3/lib/isTextNode.js');
  function containsNode(outerNode, innerNode) {
    if (!outerNode || !innerNode) {
      return false;
    } else if (outerNode === innerNode) {
      return true;
    } else if (isTextNode(outerNode)) {
      return false;
    } else if (isTextNode(innerNode)) {
      return containsNode(outerNode, innerNode.parentNode);
    } else if ('contains' in outerNode) {
      return outerNode.contains(innerNode);
    } else if (outerNode.compareDocumentPosition) {
      return !!(outerNode.compareDocumentPosition(innerNode) & 16);
    } else {
      return false;
    }
  }
  module.exports = containsNode;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/focusNode.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function focusNode(node) {
    try {
      node.focus();
    } catch (e) {}
  }
  module.exports = focusNode;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactInputSelection.js", ["npm:react@15.2.1/lib/ReactDOMSelection.js", "npm:fbjs@0.8.3/lib/containsNode.js", "npm:fbjs@0.8.3/lib/focusNode.js", "npm:fbjs@0.8.3/lib/getActiveElement.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactDOMSelection = $__require('npm:react@15.2.1/lib/ReactDOMSelection.js');
  var containsNode = $__require('npm:fbjs@0.8.3/lib/containsNode.js');
  var focusNode = $__require('npm:fbjs@0.8.3/lib/focusNode.js');
  var getActiveElement = $__require('npm:fbjs@0.8.3/lib/getActiveElement.js');
  function isInDocument(node) {
    return containsNode(document.documentElement, node);
  }
  var ReactInputSelection = {
    hasSelectionCapabilities: function(elem) {
      var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
      return nodeName && (nodeName === 'input' && elem.type === 'text' || nodeName === 'textarea' || elem.contentEditable === 'true');
    },
    getSelectionInformation: function() {
      var focusedElem = getActiveElement();
      return {
        focusedElem: focusedElem,
        selectionRange: ReactInputSelection.hasSelectionCapabilities(focusedElem) ? ReactInputSelection.getSelection(focusedElem) : null
      };
    },
    restoreSelection: function(priorSelectionInformation) {
      var curFocusedElem = getActiveElement();
      var priorFocusedElem = priorSelectionInformation.focusedElem;
      var priorSelectionRange = priorSelectionInformation.selectionRange;
      if (curFocusedElem !== priorFocusedElem && isInDocument(priorFocusedElem)) {
        if (ReactInputSelection.hasSelectionCapabilities(priorFocusedElem)) {
          ReactInputSelection.setSelection(priorFocusedElem, priorSelectionRange);
        }
        focusNode(priorFocusedElem);
      }
    },
    getSelection: function(input) {
      var selection;
      if ('selectionStart' in input) {
        selection = {
          start: input.selectionStart,
          end: input.selectionEnd
        };
      } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
        var range = document.selection.createRange();
        if (range.parentElement() === input) {
          selection = {
            start: -range.moveStart('character', -input.value.length),
            end: -range.moveEnd('character', -input.value.length)
          };
        }
      } else {
        selection = ReactDOMSelection.getOffsets(input);
      }
      return selection || {
        start: 0,
        end: 0
      };
    },
    setSelection: function(input, offsets) {
      var start = offsets.start;
      var end = offsets.end;
      if (end === undefined) {
        end = start;
      }
      if ('selectionStart' in input) {
        input.selectionStart = start;
        input.selectionEnd = Math.min(end, input.value.length);
      } else if (document.selection && input.nodeName && input.nodeName.toLowerCase() === 'input') {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveStart('character', start);
        range.moveEnd('character', end - start);
        range.select();
      } else {
        ReactDOMSelection.setOffsets(input, offsets);
      }
    }
  };
  module.exports = ReactInputSelection;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/getActiveElement.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getActiveElement() {
    if (typeof document === 'undefined') {
      return null;
    }
    try {
      return document.activeElement || document.body;
    } catch (e) {
      return document.body;
    }
  }
  module.exports = getActiveElement;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/isTextInputElement.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var supportedInputTypes = {
    'color': true,
    'date': true,
    'datetime': true,
    'datetime-local': true,
    'email': true,
    'month': true,
    'number': true,
    'password': true,
    'range': true,
    'search': true,
    'tel': true,
    'text': true,
    'time': true,
    'url': true,
    'week': true
  };
  function isTextInputElement(elem) {
    var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
    if (nodeName === 'input') {
      return !!supportedInputTypes[elem.type];
    }
    if (nodeName === 'textarea') {
      return true;
    }
    return false;
  }
  module.exports = isTextInputElement;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SelectEventPlugin.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactInputSelection.js", "npm:react@15.2.1/lib/SyntheticEvent.js", "npm:fbjs@0.8.3/lib/getActiveElement.js", "npm:react@15.2.1/lib/isTextInputElement.js", "npm:fbjs@0.8.3/lib/keyOf.js", "npm:fbjs@0.8.3/lib/shallowEqual.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
  var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
  var ReactInputSelection = $__require('npm:react@15.2.1/lib/ReactInputSelection.js');
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var getActiveElement = $__require('npm:fbjs@0.8.3/lib/getActiveElement.js');
  var isTextInputElement = $__require('npm:react@15.2.1/lib/isTextInputElement.js');
  var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
  var shallowEqual = $__require('npm:fbjs@0.8.3/lib/shallowEqual.js');
  var topLevelTypes = EventConstants.topLevelTypes;
  var skipSelectionChangeEvent = ExecutionEnvironment.canUseDOM && 'documentMode' in document && document.documentMode <= 11;
  var eventTypes = {select: {
      phasedRegistrationNames: {
        bubbled: keyOf({onSelect: null}),
        captured: keyOf({onSelectCapture: null})
      },
      dependencies: [topLevelTypes.topBlur, topLevelTypes.topContextMenu, topLevelTypes.topFocus, topLevelTypes.topKeyDown, topLevelTypes.topMouseDown, topLevelTypes.topMouseUp, topLevelTypes.topSelectionChange]
    }};
  var activeElement = null;
  var activeElementInst = null;
  var lastSelection = null;
  var mouseDown = false;
  var hasListener = false;
  var ON_SELECT_KEY = keyOf({onSelect: null});
  function getSelection(node) {
    if ('selectionStart' in node && ReactInputSelection.hasSelectionCapabilities(node)) {
      return {
        start: node.selectionStart,
        end: node.selectionEnd
      };
    } else if (window.getSelection) {
      var selection = window.getSelection();
      return {
        anchorNode: selection.anchorNode,
        anchorOffset: selection.anchorOffset,
        focusNode: selection.focusNode,
        focusOffset: selection.focusOffset
      };
    } else if (document.selection) {
      var range = document.selection.createRange();
      return {
        parentElement: range.parentElement(),
        text: range.text,
        top: range.boundingTop,
        left: range.boundingLeft
      };
    }
  }
  function constructSelectEvent(nativeEvent, nativeEventTarget) {
    if (mouseDown || activeElement == null || activeElement !== getActiveElement()) {
      return null;
    }
    var currentSelection = getSelection(activeElement);
    if (!lastSelection || !shallowEqual(lastSelection, currentSelection)) {
      lastSelection = currentSelection;
      var syntheticEvent = SyntheticEvent.getPooled(eventTypes.select, activeElementInst, nativeEvent, nativeEventTarget);
      syntheticEvent.type = 'select';
      syntheticEvent.target = activeElement;
      EventPropagators.accumulateTwoPhaseDispatches(syntheticEvent);
      return syntheticEvent;
    }
    return null;
  }
  var SelectEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      if (!hasListener) {
        return null;
      }
      var targetNode = targetInst ? ReactDOMComponentTree.getNodeFromInstance(targetInst) : window;
      switch (topLevelType) {
        case topLevelTypes.topFocus:
          if (isTextInputElement(targetNode) || targetNode.contentEditable === 'true') {
            activeElement = targetNode;
            activeElementInst = targetInst;
            lastSelection = null;
          }
          break;
        case topLevelTypes.topBlur:
          activeElement = null;
          activeElementInst = null;
          lastSelection = null;
          break;
        case topLevelTypes.topMouseDown:
          mouseDown = true;
          break;
        case topLevelTypes.topContextMenu:
        case topLevelTypes.topMouseUp:
          mouseDown = false;
          return constructSelectEvent(nativeEvent, nativeEventTarget);
        case topLevelTypes.topSelectionChange:
          if (skipSelectionChangeEvent) {
            break;
          }
        case topLevelTypes.topKeyDown:
        case topLevelTypes.topKeyUp:
          return constructSelectEvent(nativeEvent, nativeEventTarget);
      }
      return null;
    },
    didPutListener: function(inst, registrationName, listener) {
      if (registrationName === ON_SELECT_KEY) {
        hasListener = true;
      }
    }
  };
  module.exports = SelectEventPlugin;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/EventListener.js", ["npm:fbjs@0.8.3/lib/emptyFunction.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var EventListener = {
      listen: function listen(target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, false);
          return {remove: function remove() {
              target.removeEventListener(eventType, callback, false);
            }};
        } else if (target.attachEvent) {
          target.attachEvent('on' + eventType, callback);
          return {remove: function remove() {
              target.detachEvent('on' + eventType, callback);
            }};
        }
      },
      capture: function capture(target, eventType, callback) {
        if (target.addEventListener) {
          target.addEventListener(eventType, callback, true);
          return {remove: function remove() {
              target.removeEventListener(eventType, callback, true);
            }};
        } else {
          if ("production" !== 'production') {
            console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
          }
          return {remove: emptyFunction};
        }
      },
      registerDefault: function registerDefault() {}
    };
    module.exports = EventListener;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EventPropagators.js", ["npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPluginHub.js", "npm:react@15.2.1/lib/EventPluginUtils.js", "npm:react@15.2.1/lib/accumulateInto.js", "npm:react@15.2.1/lib/forEachAccumulated.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var EventPluginHub = $__require('npm:react@15.2.1/lib/EventPluginHub.js');
    var EventPluginUtils = $__require('npm:react@15.2.1/lib/EventPluginUtils.js');
    var accumulateInto = $__require('npm:react@15.2.1/lib/accumulateInto.js');
    var forEachAccumulated = $__require('npm:react@15.2.1/lib/forEachAccumulated.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var PropagationPhases = EventConstants.PropagationPhases;
    var getListener = EventPluginHub.getListener;
    function listenerAtPhase(inst, event, propagationPhase) {
      var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
      return getListener(inst, registrationName);
    }
    function accumulateDirectionalDispatches(inst, upwards, event) {
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(inst, 'Dispatching inst must not be null') : void 0;
      }
      var phase = upwards ? PropagationPhases.bubbled : PropagationPhases.captured;
      var listener = listenerAtPhase(inst, event, phase);
      if (listener) {
        event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
        event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
      }
    }
    function accumulateTwoPhaseDispatchesSingle(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        EventPluginUtils.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
      if (event && event.dispatchConfig.phasedRegistrationNames) {
        var targetInst = event._targetInst;
        var parentInst = targetInst ? EventPluginUtils.getParentInstance(targetInst) : null;
        EventPluginUtils.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
      }
    }
    function accumulateDispatches(inst, ignoredDirection, event) {
      if (event && event.dispatchConfig.registrationName) {
        var registrationName = event.dispatchConfig.registrationName;
        var listener = getListener(inst, registrationName);
        if (listener) {
          event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
          event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
        }
      }
    }
    function accumulateDirectDispatchesSingle(event) {
      if (event && event.dispatchConfig.registrationName) {
        accumulateDispatches(event._targetInst, null, event);
      }
    }
    function accumulateTwoPhaseDispatches(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
    }
    function accumulateTwoPhaseDispatchesSkipTarget(events) {
      forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
    }
    function accumulateEnterLeaveDispatches(leave, enter, from, to) {
      EventPluginUtils.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
    }
    function accumulateDirectDispatches(events) {
      forEachAccumulated(events, accumulateDirectDispatchesSingle);
    }
    var EventPropagators = {
      accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
      accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
      accumulateDirectDispatches: accumulateDirectDispatches,
      accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
    };
    module.exports = EventPropagators;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticAnimationEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var AnimationEventInterface = {
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  };
  function SyntheticAnimationEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticAnimationEvent, AnimationEventInterface);
  module.exports = SyntheticAnimationEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticClipboardEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var ClipboardEventInterface = {clipboardData: function(event) {
      return 'clipboardData' in event ? event.clipboardData : window.clipboardData;
    }};
  function SyntheticClipboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticClipboardEvent, ClipboardEventInterface);
  module.exports = SyntheticClipboardEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticFocusEvent.js", ["npm:react@15.2.1/lib/SyntheticUIEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
  var FocusEventInterface = {relatedTarget: null};
  function SyntheticFocusEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticFocusEvent, FocusEventInterface);
  module.exports = SyntheticFocusEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getEventKey.js", ["npm:react@15.2.1/lib/getEventCharCode.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getEventCharCode = $__require('npm:react@15.2.1/lib/getEventCharCode.js');
  var normalizeKey = {
    'Esc': 'Escape',
    'Spacebar': ' ',
    'Left': 'ArrowLeft',
    'Up': 'ArrowUp',
    'Right': 'ArrowRight',
    'Down': 'ArrowDown',
    'Del': 'Delete',
    'Win': 'OS',
    'Menu': 'ContextMenu',
    'Apps': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'MozPrintableKey': 'Unidentified'
  };
  var translateToKey = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    38: 'ArrowUp',
    39: 'ArrowRight',
    40: 'ArrowDown',
    45: 'Insert',
    46: 'Delete',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    144: 'NumLock',
    145: 'ScrollLock',
    224: 'Meta'
  };
  function getEventKey(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if (key !== 'Unidentified') {
        return key;
      }
    }
    if (nativeEvent.type === 'keypress') {
      var charCode = getEventCharCode(nativeEvent);
      return charCode === 13 ? 'Enter' : String.fromCharCode(charCode);
    }
    if (nativeEvent.type === 'keydown' || nativeEvent.type === 'keyup') {
      return translateToKey[nativeEvent.keyCode] || 'Unidentified';
    }
    return '';
  }
  module.exports = getEventKey;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticKeyboardEvent.js", ["npm:react@15.2.1/lib/SyntheticUIEvent.js", "npm:react@15.2.1/lib/getEventCharCode.js", "npm:react@15.2.1/lib/getEventKey.js", "npm:react@15.2.1/lib/getEventModifierState.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
  var getEventCharCode = $__require('npm:react@15.2.1/lib/getEventCharCode.js');
  var getEventKey = $__require('npm:react@15.2.1/lib/getEventKey.js');
  var getEventModifierState = $__require('npm:react@15.2.1/lib/getEventModifierState.js');
  var KeyboardEventInterface = {
    key: getEventKey,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      return 0;
    },
    keyCode: function(event) {
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    },
    which: function(event) {
      if (event.type === 'keypress') {
        return getEventCharCode(event);
      }
      if (event.type === 'keydown' || event.type === 'keyup') {
        return event.keyCode;
      }
      return 0;
    }
  };
  function SyntheticKeyboardEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticKeyboardEvent, KeyboardEventInterface);
  module.exports = SyntheticKeyboardEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticDragEvent.js", ["npm:react@15.2.1/lib/SyntheticMouseEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticMouseEvent = $__require('npm:react@15.2.1/lib/SyntheticMouseEvent.js');
  var DragEventInterface = {dataTransfer: null};
  function SyntheticDragEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticMouseEvent.augmentClass(SyntheticDragEvent, DragEventInterface);
  module.exports = SyntheticDragEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticTouchEvent.js", ["npm:react@15.2.1/lib/SyntheticUIEvent.js", "npm:react@15.2.1/lib/getEventModifierState.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
  var getEventModifierState = $__require('npm:react@15.2.1/lib/getEventModifierState.js');
  var TouchEventInterface = {
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  };
  function SyntheticTouchEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticTouchEvent, TouchEventInterface);
  module.exports = SyntheticTouchEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticTransitionEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var TransitionEventInterface = {
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  };
  function SyntheticTransitionEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticTransitionEvent, TransitionEventInterface);
  module.exports = SyntheticTransitionEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticEvent.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var didWarnForAddedNewProperty = false;
    var isProxySupported = typeof Proxy === 'function';
    var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];
    var EventInterface = {
      type: null,
      target: null,
      currentTarget: emptyFunction.thatReturnsNull,
      eventPhase: null,
      bubbles: null,
      cancelable: null,
      timeStamp: function(event) {
        return event.timeStamp || Date.now();
      },
      defaultPrevented: null,
      isTrusted: null
    };
    function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
      if ("production" !== 'production') {
        delete this.nativeEvent;
        delete this.preventDefault;
        delete this.stopPropagation;
      }
      this.dispatchConfig = dispatchConfig;
      this._targetInst = targetInst;
      this.nativeEvent = nativeEvent;
      var Interface = this.constructor.Interface;
      for (var propName in Interface) {
        if (!Interface.hasOwnProperty(propName)) {
          continue;
        }
        if ("production" !== 'production') {
          delete this[propName];
        }
        var normalize = Interface[propName];
        if (normalize) {
          this[propName] = normalize(nativeEvent);
        } else {
          if (propName === 'target') {
            this.target = nativeEventTarget;
          } else {
            this[propName] = nativeEvent[propName];
          }
        }
      }
      var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
      if (defaultPrevented) {
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      } else {
        this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
      }
      this.isPropagationStopped = emptyFunction.thatReturnsFalse;
      return this;
    }
    _assign(SyntheticEvent.prototype, {
      preventDefault: function() {
        this.defaultPrevented = true;
        var event = this.nativeEvent;
        if (!event) {
          return;
        }
        if (event.preventDefault) {
          event.preventDefault();
        } else {
          event.returnValue = false;
        }
        this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
      },
      stopPropagation: function() {
        var event = this.nativeEvent;
        if (!event) {
          return;
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
        this.isPropagationStopped = emptyFunction.thatReturnsTrue;
      },
      persist: function() {
        this.isPersistent = emptyFunction.thatReturnsTrue;
      },
      isPersistent: emptyFunction.thatReturnsFalse,
      destructor: function() {
        var Interface = this.constructor.Interface;
        for (var propName in Interface) {
          if ("production" !== 'production') {
            Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
          } else {
            this[propName] = null;
          }
        }
        for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
          this[shouldBeReleasedProperties[i]] = null;
        }
        if ("production" !== 'production') {
          Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
          Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
          Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
        }
      }
    });
    SyntheticEvent.Interface = EventInterface;
    if ("production" !== 'production') {
      if (isProxySupported) {
        SyntheticEvent = new Proxy(SyntheticEvent, {
          construct: function(target, args) {
            return this.apply(target, Object.create(target.prototype), args);
          },
          apply: function(constructor, that, args) {
            return new Proxy(constructor.apply(that, args), {set: function(target, prop, value) {
                if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
                  "production" !== 'production' ? warning(didWarnForAddedNewProperty || target.isPersistent(), 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re adding a new property in the synthetic event object. ' + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
                  didWarnForAddedNewProperty = true;
                }
                target[prop] = value;
                return true;
              }});
          }
        });
      }
    }
    SyntheticEvent.augmentClass = function(Class, Interface) {
      var Super = this;
      var E = function() {};
      E.prototype = Super.prototype;
      var prototype = new E();
      _assign(prototype, Class.prototype);
      Class.prototype = prototype;
      Class.prototype.constructor = Class;
      Class.Interface = _assign({}, Super.Interface, Interface);
      Class.augmentClass = Super.augmentClass;
      PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
    };
    PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);
    module.exports = SyntheticEvent;
    function getPooledWarningPropertyDefinition(propName, getVal) {
      var isFunction = typeof getVal === 'function';
      return {
        configurable: true,
        set: set,
        get: get
      };
      function set(val) {
        var action = isFunction ? 'setting the method' : 'setting the property';
        warn(action, 'This is effectively a no-op');
        return val;
      }
      function get() {
        var action = isFunction ? 'accessing the method' : 'accessing the property';
        var result = isFunction ? 'This is a no-op function' : 'This is set to null';
        warn(action, result);
        return getVal;
      }
      function warn(action, result) {
        var warningCondition = false;
        "production" !== 'production' ? warning(warningCondition, 'This synthetic event is reused for performance reasons. If you\'re seeing this, ' + 'you\'re %s `%s` on a released/nullified synthetic event. %s. ' + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
      }
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getEventTarget.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getEventTarget(nativeEvent) {
    var target = nativeEvent.target || nativeEvent.srcElement || window;
    if (target.correspondingUseElement) {
      target = target.correspondingUseElement;
    }
    return target.nodeType === 3 ? target.parentNode : target;
  }
  module.exports = getEventTarget;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticUIEvent.js", ["npm:react@15.2.1/lib/SyntheticEvent.js", "npm:react@15.2.1/lib/getEventTarget.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
  var getEventTarget = $__require('npm:react@15.2.1/lib/getEventTarget.js');
  var UIEventInterface = {
    view: function(event) {
      if (event.view) {
        return event.view;
      }
      var target = getEventTarget(event);
      if (target.window === target) {
        return target;
      }
      var doc = target.ownerDocument;
      if (doc) {
        return doc.defaultView || doc.parentWindow;
      } else {
        return window;
      }
    },
    detail: function(event) {
      return event.detail || 0;
    }
  };
  function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);
  module.exports = SyntheticUIEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getEventModifierState.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var modifierKeyToProp = {
    'Alt': 'altKey',
    'Control': 'ctrlKey',
    'Meta': 'metaKey',
    'Shift': 'shiftKey'
  };
  function modifierStateGetter(keyArg) {
    var syntheticEvent = this;
    var nativeEvent = syntheticEvent.nativeEvent;
    if (nativeEvent.getModifierState) {
      return nativeEvent.getModifierState(keyArg);
    }
    var keyProp = modifierKeyToProp[keyArg];
    return keyProp ? !!nativeEvent[keyProp] : false;
  }
  function getEventModifierState(nativeEvent) {
    return modifierStateGetter;
  }
  module.exports = getEventModifierState;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticMouseEvent.js", ["npm:react@15.2.1/lib/SyntheticUIEvent.js", "npm:react@15.2.1/lib/ViewportMetrics.js", "npm:react@15.2.1/lib/getEventModifierState.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
  var ViewportMetrics = $__require('npm:react@15.2.1/lib/ViewportMetrics.js');
  var getEventModifierState = $__require('npm:react@15.2.1/lib/getEventModifierState.js');
  var MouseEventInterface = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: function(event) {
      var button = event.button;
      if ('which' in event) {
        return button;
      }
      return button === 2 ? 2 : button === 4 ? 1 : 0;
    },
    buttons: null,
    relatedTarget: function(event) {
      return event.relatedTarget || (event.fromElement === event.srcElement ? event.toElement : event.fromElement);
    },
    pageX: function(event) {
      return 'pageX' in event ? event.pageX : event.clientX + ViewportMetrics.currentScrollLeft;
    },
    pageY: function(event) {
      return 'pageY' in event ? event.pageY : event.clientY + ViewportMetrics.currentScrollTop;
    }
  };
  function SyntheticMouseEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticUIEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticUIEvent.augmentClass(SyntheticMouseEvent, MouseEventInterface);
  module.exports = SyntheticMouseEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SyntheticWheelEvent.js", ["npm:react@15.2.1/lib/SyntheticMouseEvent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var SyntheticMouseEvent = $__require('npm:react@15.2.1/lib/SyntheticMouseEvent.js');
  var WheelEventInterface = {
    deltaX: function(event) {
      return 'deltaX' in event ? event.deltaX : 'wheelDeltaX' in event ? -event.wheelDeltaX : 0;
    },
    deltaY: function(event) {
      return 'deltaY' in event ? event.deltaY : 'wheelDeltaY' in event ? -event.wheelDeltaY : 'wheelDelta' in event ? -event.wheelDelta : 0;
    },
    deltaZ: null,
    deltaMode: null
  };
  function SyntheticWheelEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
    return SyntheticMouseEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
  }
  SyntheticMouseEvent.augmentClass(SyntheticWheelEvent, WheelEventInterface);
  module.exports = SyntheticWheelEvent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getEventCharCode.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getEventCharCode(nativeEvent) {
    var charCode;
    var keyCode = nativeEvent.keyCode;
    if ('charCode' in nativeEvent) {
      charCode = nativeEvent.charCode;
      if (charCode === 0 && keyCode === 13) {
        charCode = 13;
      }
    } else {
      charCode = keyCode;
    }
    if (charCode >= 32 || charCode === 13) {
      return charCode;
    }
    return 0;
  }
  module.exports = getEventCharCode;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/SimpleEventPlugin.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/EventConstants.js", "npm:fbjs@0.8.3/lib/EventListener.js", "npm:react@15.2.1/lib/EventPropagators.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/SyntheticAnimationEvent.js", "npm:react@15.2.1/lib/SyntheticClipboardEvent.js", "npm:react@15.2.1/lib/SyntheticEvent.js", "npm:react@15.2.1/lib/SyntheticFocusEvent.js", "npm:react@15.2.1/lib/SyntheticKeyboardEvent.js", "npm:react@15.2.1/lib/SyntheticMouseEvent.js", "npm:react@15.2.1/lib/SyntheticDragEvent.js", "npm:react@15.2.1/lib/SyntheticTouchEvent.js", "npm:react@15.2.1/lib/SyntheticTransitionEvent.js", "npm:react@15.2.1/lib/SyntheticUIEvent.js", "npm:react@15.2.1/lib/SyntheticWheelEvent.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:react@15.2.1/lib/getEventCharCode.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/keyOf.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var EventListener = $__require('npm:fbjs@0.8.3/lib/EventListener.js');
    var EventPropagators = $__require('npm:react@15.2.1/lib/EventPropagators.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var SyntheticAnimationEvent = $__require('npm:react@15.2.1/lib/SyntheticAnimationEvent.js');
    var SyntheticClipboardEvent = $__require('npm:react@15.2.1/lib/SyntheticClipboardEvent.js');
    var SyntheticEvent = $__require('npm:react@15.2.1/lib/SyntheticEvent.js');
    var SyntheticFocusEvent = $__require('npm:react@15.2.1/lib/SyntheticFocusEvent.js');
    var SyntheticKeyboardEvent = $__require('npm:react@15.2.1/lib/SyntheticKeyboardEvent.js');
    var SyntheticMouseEvent = $__require('npm:react@15.2.1/lib/SyntheticMouseEvent.js');
    var SyntheticDragEvent = $__require('npm:react@15.2.1/lib/SyntheticDragEvent.js');
    var SyntheticTouchEvent = $__require('npm:react@15.2.1/lib/SyntheticTouchEvent.js');
    var SyntheticTransitionEvent = $__require('npm:react@15.2.1/lib/SyntheticTransitionEvent.js');
    var SyntheticUIEvent = $__require('npm:react@15.2.1/lib/SyntheticUIEvent.js');
    var SyntheticWheelEvent = $__require('npm:react@15.2.1/lib/SyntheticWheelEvent.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var getEventCharCode = $__require('npm:react@15.2.1/lib/getEventCharCode.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
    var topLevelTypes = EventConstants.topLevelTypes;
    var eventTypes = {
      abort: {phasedRegistrationNames: {
          bubbled: keyOf({onAbort: true}),
          captured: keyOf({onAbortCapture: true})
        }},
      animationEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onAnimationEnd: true}),
          captured: keyOf({onAnimationEndCapture: true})
        }},
      animationIteration: {phasedRegistrationNames: {
          bubbled: keyOf({onAnimationIteration: true}),
          captured: keyOf({onAnimationIterationCapture: true})
        }},
      animationStart: {phasedRegistrationNames: {
          bubbled: keyOf({onAnimationStart: true}),
          captured: keyOf({onAnimationStartCapture: true})
        }},
      blur: {phasedRegistrationNames: {
          bubbled: keyOf({onBlur: true}),
          captured: keyOf({onBlurCapture: true})
        }},
      canPlay: {phasedRegistrationNames: {
          bubbled: keyOf({onCanPlay: true}),
          captured: keyOf({onCanPlayCapture: true})
        }},
      canPlayThrough: {phasedRegistrationNames: {
          bubbled: keyOf({onCanPlayThrough: true}),
          captured: keyOf({onCanPlayThroughCapture: true})
        }},
      click: {phasedRegistrationNames: {
          bubbled: keyOf({onClick: true}),
          captured: keyOf({onClickCapture: true})
        }},
      contextMenu: {phasedRegistrationNames: {
          bubbled: keyOf({onContextMenu: true}),
          captured: keyOf({onContextMenuCapture: true})
        }},
      copy: {phasedRegistrationNames: {
          bubbled: keyOf({onCopy: true}),
          captured: keyOf({onCopyCapture: true})
        }},
      cut: {phasedRegistrationNames: {
          bubbled: keyOf({onCut: true}),
          captured: keyOf({onCutCapture: true})
        }},
      doubleClick: {phasedRegistrationNames: {
          bubbled: keyOf({onDoubleClick: true}),
          captured: keyOf({onDoubleClickCapture: true})
        }},
      drag: {phasedRegistrationNames: {
          bubbled: keyOf({onDrag: true}),
          captured: keyOf({onDragCapture: true})
        }},
      dragEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnd: true}),
          captured: keyOf({onDragEndCapture: true})
        }},
      dragEnter: {phasedRegistrationNames: {
          bubbled: keyOf({onDragEnter: true}),
          captured: keyOf({onDragEnterCapture: true})
        }},
      dragExit: {phasedRegistrationNames: {
          bubbled: keyOf({onDragExit: true}),
          captured: keyOf({onDragExitCapture: true})
        }},
      dragLeave: {phasedRegistrationNames: {
          bubbled: keyOf({onDragLeave: true}),
          captured: keyOf({onDragLeaveCapture: true})
        }},
      dragOver: {phasedRegistrationNames: {
          bubbled: keyOf({onDragOver: true}),
          captured: keyOf({onDragOverCapture: true})
        }},
      dragStart: {phasedRegistrationNames: {
          bubbled: keyOf({onDragStart: true}),
          captured: keyOf({onDragStartCapture: true})
        }},
      drop: {phasedRegistrationNames: {
          bubbled: keyOf({onDrop: true}),
          captured: keyOf({onDropCapture: true})
        }},
      durationChange: {phasedRegistrationNames: {
          bubbled: keyOf({onDurationChange: true}),
          captured: keyOf({onDurationChangeCapture: true})
        }},
      emptied: {phasedRegistrationNames: {
          bubbled: keyOf({onEmptied: true}),
          captured: keyOf({onEmptiedCapture: true})
        }},
      encrypted: {phasedRegistrationNames: {
          bubbled: keyOf({onEncrypted: true}),
          captured: keyOf({onEncryptedCapture: true})
        }},
      ended: {phasedRegistrationNames: {
          bubbled: keyOf({onEnded: true}),
          captured: keyOf({onEndedCapture: true})
        }},
      error: {phasedRegistrationNames: {
          bubbled: keyOf({onError: true}),
          captured: keyOf({onErrorCapture: true})
        }},
      focus: {phasedRegistrationNames: {
          bubbled: keyOf({onFocus: true}),
          captured: keyOf({onFocusCapture: true})
        }},
      input: {phasedRegistrationNames: {
          bubbled: keyOf({onInput: true}),
          captured: keyOf({onInputCapture: true})
        }},
      invalid: {phasedRegistrationNames: {
          bubbled: keyOf({onInvalid: true}),
          captured: keyOf({onInvalidCapture: true})
        }},
      keyDown: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyDown: true}),
          captured: keyOf({onKeyDownCapture: true})
        }},
      keyPress: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyPress: true}),
          captured: keyOf({onKeyPressCapture: true})
        }},
      keyUp: {phasedRegistrationNames: {
          bubbled: keyOf({onKeyUp: true}),
          captured: keyOf({onKeyUpCapture: true})
        }},
      load: {phasedRegistrationNames: {
          bubbled: keyOf({onLoad: true}),
          captured: keyOf({onLoadCapture: true})
        }},
      loadedData: {phasedRegistrationNames: {
          bubbled: keyOf({onLoadedData: true}),
          captured: keyOf({onLoadedDataCapture: true})
        }},
      loadedMetadata: {phasedRegistrationNames: {
          bubbled: keyOf({onLoadedMetadata: true}),
          captured: keyOf({onLoadedMetadataCapture: true})
        }},
      loadStart: {phasedRegistrationNames: {
          bubbled: keyOf({onLoadStart: true}),
          captured: keyOf({onLoadStartCapture: true})
        }},
      mouseDown: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseDown: true}),
          captured: keyOf({onMouseDownCapture: true})
        }},
      mouseMove: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseMove: true}),
          captured: keyOf({onMouseMoveCapture: true})
        }},
      mouseOut: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOut: true}),
          captured: keyOf({onMouseOutCapture: true})
        }},
      mouseOver: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseOver: true}),
          captured: keyOf({onMouseOverCapture: true})
        }},
      mouseUp: {phasedRegistrationNames: {
          bubbled: keyOf({onMouseUp: true}),
          captured: keyOf({onMouseUpCapture: true})
        }},
      paste: {phasedRegistrationNames: {
          bubbled: keyOf({onPaste: true}),
          captured: keyOf({onPasteCapture: true})
        }},
      pause: {phasedRegistrationNames: {
          bubbled: keyOf({onPause: true}),
          captured: keyOf({onPauseCapture: true})
        }},
      play: {phasedRegistrationNames: {
          bubbled: keyOf({onPlay: true}),
          captured: keyOf({onPlayCapture: true})
        }},
      playing: {phasedRegistrationNames: {
          bubbled: keyOf({onPlaying: true}),
          captured: keyOf({onPlayingCapture: true})
        }},
      progress: {phasedRegistrationNames: {
          bubbled: keyOf({onProgress: true}),
          captured: keyOf({onProgressCapture: true})
        }},
      rateChange: {phasedRegistrationNames: {
          bubbled: keyOf({onRateChange: true}),
          captured: keyOf({onRateChangeCapture: true})
        }},
      reset: {phasedRegistrationNames: {
          bubbled: keyOf({onReset: true}),
          captured: keyOf({onResetCapture: true})
        }},
      scroll: {phasedRegistrationNames: {
          bubbled: keyOf({onScroll: true}),
          captured: keyOf({onScrollCapture: true})
        }},
      seeked: {phasedRegistrationNames: {
          bubbled: keyOf({onSeeked: true}),
          captured: keyOf({onSeekedCapture: true})
        }},
      seeking: {phasedRegistrationNames: {
          bubbled: keyOf({onSeeking: true}),
          captured: keyOf({onSeekingCapture: true})
        }},
      stalled: {phasedRegistrationNames: {
          bubbled: keyOf({onStalled: true}),
          captured: keyOf({onStalledCapture: true})
        }},
      submit: {phasedRegistrationNames: {
          bubbled: keyOf({onSubmit: true}),
          captured: keyOf({onSubmitCapture: true})
        }},
      suspend: {phasedRegistrationNames: {
          bubbled: keyOf({onSuspend: true}),
          captured: keyOf({onSuspendCapture: true})
        }},
      timeUpdate: {phasedRegistrationNames: {
          bubbled: keyOf({onTimeUpdate: true}),
          captured: keyOf({onTimeUpdateCapture: true})
        }},
      touchCancel: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchCancel: true}),
          captured: keyOf({onTouchCancelCapture: true})
        }},
      touchEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchEnd: true}),
          captured: keyOf({onTouchEndCapture: true})
        }},
      touchMove: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchMove: true}),
          captured: keyOf({onTouchMoveCapture: true})
        }},
      touchStart: {phasedRegistrationNames: {
          bubbled: keyOf({onTouchStart: true}),
          captured: keyOf({onTouchStartCapture: true})
        }},
      transitionEnd: {phasedRegistrationNames: {
          bubbled: keyOf({onTransitionEnd: true}),
          captured: keyOf({onTransitionEndCapture: true})
        }},
      volumeChange: {phasedRegistrationNames: {
          bubbled: keyOf({onVolumeChange: true}),
          captured: keyOf({onVolumeChangeCapture: true})
        }},
      waiting: {phasedRegistrationNames: {
          bubbled: keyOf({onWaiting: true}),
          captured: keyOf({onWaitingCapture: true})
        }},
      wheel: {phasedRegistrationNames: {
          bubbled: keyOf({onWheel: true}),
          captured: keyOf({onWheelCapture: true})
        }}
    };
    var topLevelEventsToDispatchConfig = {
      topAbort: eventTypes.abort,
      topAnimationEnd: eventTypes.animationEnd,
      topAnimationIteration: eventTypes.animationIteration,
      topAnimationStart: eventTypes.animationStart,
      topBlur: eventTypes.blur,
      topCanPlay: eventTypes.canPlay,
      topCanPlayThrough: eventTypes.canPlayThrough,
      topClick: eventTypes.click,
      topContextMenu: eventTypes.contextMenu,
      topCopy: eventTypes.copy,
      topCut: eventTypes.cut,
      topDoubleClick: eventTypes.doubleClick,
      topDrag: eventTypes.drag,
      topDragEnd: eventTypes.dragEnd,
      topDragEnter: eventTypes.dragEnter,
      topDragExit: eventTypes.dragExit,
      topDragLeave: eventTypes.dragLeave,
      topDragOver: eventTypes.dragOver,
      topDragStart: eventTypes.dragStart,
      topDrop: eventTypes.drop,
      topDurationChange: eventTypes.durationChange,
      topEmptied: eventTypes.emptied,
      topEncrypted: eventTypes.encrypted,
      topEnded: eventTypes.ended,
      topError: eventTypes.error,
      topFocus: eventTypes.focus,
      topInput: eventTypes.input,
      topInvalid: eventTypes.invalid,
      topKeyDown: eventTypes.keyDown,
      topKeyPress: eventTypes.keyPress,
      topKeyUp: eventTypes.keyUp,
      topLoad: eventTypes.load,
      topLoadedData: eventTypes.loadedData,
      topLoadedMetadata: eventTypes.loadedMetadata,
      topLoadStart: eventTypes.loadStart,
      topMouseDown: eventTypes.mouseDown,
      topMouseMove: eventTypes.mouseMove,
      topMouseOut: eventTypes.mouseOut,
      topMouseOver: eventTypes.mouseOver,
      topMouseUp: eventTypes.mouseUp,
      topPaste: eventTypes.paste,
      topPause: eventTypes.pause,
      topPlay: eventTypes.play,
      topPlaying: eventTypes.playing,
      topProgress: eventTypes.progress,
      topRateChange: eventTypes.rateChange,
      topReset: eventTypes.reset,
      topScroll: eventTypes.scroll,
      topSeeked: eventTypes.seeked,
      topSeeking: eventTypes.seeking,
      topStalled: eventTypes.stalled,
      topSubmit: eventTypes.submit,
      topSuspend: eventTypes.suspend,
      topTimeUpdate: eventTypes.timeUpdate,
      topTouchCancel: eventTypes.touchCancel,
      topTouchEnd: eventTypes.touchEnd,
      topTouchMove: eventTypes.touchMove,
      topTouchStart: eventTypes.touchStart,
      topTransitionEnd: eventTypes.transitionEnd,
      topVolumeChange: eventTypes.volumeChange,
      topWaiting: eventTypes.waiting,
      topWheel: eventTypes.wheel
    };
    for (var type in topLevelEventsToDispatchConfig) {
      topLevelEventsToDispatchConfig[type].dependencies = [type];
    }
    var ON_CLICK_KEY = keyOf({onClick: null});
    var onClickListeners = {};
    var SimpleEventPlugin = {
      eventTypes: eventTypes,
      extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
        if (!dispatchConfig) {
          return null;
        }
        var EventConstructor;
        switch (topLevelType) {
          case topLevelTypes.topAbort:
          case topLevelTypes.topCanPlay:
          case topLevelTypes.topCanPlayThrough:
          case topLevelTypes.topDurationChange:
          case topLevelTypes.topEmptied:
          case topLevelTypes.topEncrypted:
          case topLevelTypes.topEnded:
          case topLevelTypes.topError:
          case topLevelTypes.topInput:
          case topLevelTypes.topInvalid:
          case topLevelTypes.topLoad:
          case topLevelTypes.topLoadedData:
          case topLevelTypes.topLoadedMetadata:
          case topLevelTypes.topLoadStart:
          case topLevelTypes.topPause:
          case topLevelTypes.topPlay:
          case topLevelTypes.topPlaying:
          case topLevelTypes.topProgress:
          case topLevelTypes.topRateChange:
          case topLevelTypes.topReset:
          case topLevelTypes.topSeeked:
          case topLevelTypes.topSeeking:
          case topLevelTypes.topStalled:
          case topLevelTypes.topSubmit:
          case topLevelTypes.topSuspend:
          case topLevelTypes.topTimeUpdate:
          case topLevelTypes.topVolumeChange:
          case topLevelTypes.topWaiting:
            EventConstructor = SyntheticEvent;
            break;
          case topLevelTypes.topKeyPress:
            if (getEventCharCode(nativeEvent) === 0) {
              return null;
            }
          case topLevelTypes.topKeyDown:
          case topLevelTypes.topKeyUp:
            EventConstructor = SyntheticKeyboardEvent;
            break;
          case topLevelTypes.topBlur:
          case topLevelTypes.topFocus:
            EventConstructor = SyntheticFocusEvent;
            break;
          case topLevelTypes.topClick:
            if (nativeEvent.button === 2) {
              return null;
            }
          case topLevelTypes.topContextMenu:
          case topLevelTypes.topDoubleClick:
          case topLevelTypes.topMouseDown:
          case topLevelTypes.topMouseMove:
          case topLevelTypes.topMouseOut:
          case topLevelTypes.topMouseOver:
          case topLevelTypes.topMouseUp:
            EventConstructor = SyntheticMouseEvent;
            break;
          case topLevelTypes.topDrag:
          case topLevelTypes.topDragEnd:
          case topLevelTypes.topDragEnter:
          case topLevelTypes.topDragExit:
          case topLevelTypes.topDragLeave:
          case topLevelTypes.topDragOver:
          case topLevelTypes.topDragStart:
          case topLevelTypes.topDrop:
            EventConstructor = SyntheticDragEvent;
            break;
          case topLevelTypes.topTouchCancel:
          case topLevelTypes.topTouchEnd:
          case topLevelTypes.topTouchMove:
          case topLevelTypes.topTouchStart:
            EventConstructor = SyntheticTouchEvent;
            break;
          case topLevelTypes.topAnimationEnd:
          case topLevelTypes.topAnimationIteration:
          case topLevelTypes.topAnimationStart:
            EventConstructor = SyntheticAnimationEvent;
            break;
          case topLevelTypes.topTransitionEnd:
            EventConstructor = SyntheticTransitionEvent;
            break;
          case topLevelTypes.topScroll:
            EventConstructor = SyntheticUIEvent;
            break;
          case topLevelTypes.topWheel:
            EventConstructor = SyntheticWheelEvent;
            break;
          case topLevelTypes.topCopy:
          case topLevelTypes.topCut:
          case topLevelTypes.topPaste:
            EventConstructor = SyntheticClipboardEvent;
            break;
        }
        !EventConstructor ? "production" !== 'production' ? invariant(false, 'SimpleEventPlugin: Unhandled event type, `%s`.', topLevelType) : _prodInvariant('86', topLevelType) : void 0;
        var event = EventConstructor.getPooled(dispatchConfig, targetInst, nativeEvent, nativeEventTarget);
        EventPropagators.accumulateTwoPhaseDispatches(event);
        return event;
      },
      didPutListener: function(inst, registrationName, listener) {
        if (registrationName === ON_CLICK_KEY) {
          var id = inst._rootNodeID;
          var node = ReactDOMComponentTree.getNodeFromInstance(inst);
          if (!onClickListeners[id]) {
            onClickListeners[id] = EventListener.listen(node, 'click', emptyFunction);
          }
        }
      },
      willDeleteListener: function(inst, registrationName) {
        if (registrationName === ON_CLICK_KEY) {
          var id = inst._rootNodeID;
          onClickListeners[id].remove();
          delete onClickListeners[id];
        }
      }
    };
    module.exports = SimpleEventPlugin;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDefaultInjection.js", ["npm:react@15.2.1/lib/BeforeInputEventPlugin.js", "npm:react@15.2.1/lib/ChangeEventPlugin.js", "npm:react@15.2.1/lib/DefaultEventPluginOrder.js", "npm:react@15.2.1/lib/EnterLeaveEventPlugin.js", "npm:react@15.2.1/lib/HTMLDOMPropertyConfig.js", "npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js", "npm:react@15.2.1/lib/ReactDOMComponent.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDOMEmptyComponent.js", "npm:react@15.2.1/lib/ReactDOMTreeTraversal.js", "npm:react@15.2.1/lib/ReactDOMTextComponent.js", "npm:react@15.2.1/lib/ReactDefaultBatchingStrategy.js", "npm:react@15.2.1/lib/ReactEventListener.js", "npm:react@15.2.1/lib/ReactInjection.js", "npm:react@15.2.1/lib/ReactReconcileTransaction.js", "npm:react@15.2.1/lib/SVGDOMPropertyConfig.js", "npm:react@15.2.1/lib/SelectEventPlugin.js", "npm:react@15.2.1/lib/SimpleEventPlugin.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var BeforeInputEventPlugin = $__require('npm:react@15.2.1/lib/BeforeInputEventPlugin.js');
  var ChangeEventPlugin = $__require('npm:react@15.2.1/lib/ChangeEventPlugin.js');
  var DefaultEventPluginOrder = $__require('npm:react@15.2.1/lib/DefaultEventPluginOrder.js');
  var EnterLeaveEventPlugin = $__require('npm:react@15.2.1/lib/EnterLeaveEventPlugin.js');
  var HTMLDOMPropertyConfig = $__require('npm:react@15.2.1/lib/HTMLDOMPropertyConfig.js');
  var ReactComponentBrowserEnvironment = $__require('npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js');
  var ReactDOMComponent = $__require('npm:react@15.2.1/lib/ReactDOMComponent.js');
  var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
  var ReactDOMEmptyComponent = $__require('npm:react@15.2.1/lib/ReactDOMEmptyComponent.js');
  var ReactDOMTreeTraversal = $__require('npm:react@15.2.1/lib/ReactDOMTreeTraversal.js');
  var ReactDOMTextComponent = $__require('npm:react@15.2.1/lib/ReactDOMTextComponent.js');
  var ReactDefaultBatchingStrategy = $__require('npm:react@15.2.1/lib/ReactDefaultBatchingStrategy.js');
  var ReactEventListener = $__require('npm:react@15.2.1/lib/ReactEventListener.js');
  var ReactInjection = $__require('npm:react@15.2.1/lib/ReactInjection.js');
  var ReactReconcileTransaction = $__require('npm:react@15.2.1/lib/ReactReconcileTransaction.js');
  var SVGDOMPropertyConfig = $__require('npm:react@15.2.1/lib/SVGDOMPropertyConfig.js');
  var SelectEventPlugin = $__require('npm:react@15.2.1/lib/SelectEventPlugin.js');
  var SimpleEventPlugin = $__require('npm:react@15.2.1/lib/SimpleEventPlugin.js');
  var alreadyInjected = false;
  function inject() {
    if (alreadyInjected) {
      return;
    }
    alreadyInjected = true;
    ReactInjection.EventEmitter.injectReactEventListener(ReactEventListener);
    ReactInjection.EventPluginHub.injectEventPluginOrder(DefaultEventPluginOrder);
    ReactInjection.EventPluginUtils.injectComponentTree(ReactDOMComponentTree);
    ReactInjection.EventPluginUtils.injectTreeTraversal(ReactDOMTreeTraversal);
    ReactInjection.EventPluginHub.injectEventPluginsByName({
      SimpleEventPlugin: SimpleEventPlugin,
      EnterLeaveEventPlugin: EnterLeaveEventPlugin,
      ChangeEventPlugin: ChangeEventPlugin,
      SelectEventPlugin: SelectEventPlugin,
      BeforeInputEventPlugin: BeforeInputEventPlugin
    });
    ReactInjection.HostComponent.injectGenericComponentClass(ReactDOMComponent);
    ReactInjection.HostComponent.injectTextComponentClass(ReactDOMTextComponent);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(HTMLDOMPropertyConfig);
    ReactInjection.DOMProperty.injectDOMPropertyConfig(SVGDOMPropertyConfig);
    ReactInjection.EmptyComponent.injectEmptyComponentFactory(function(instantiate) {
      return new ReactDOMEmptyComponent(instantiate);
    });
    ReactInjection.Updates.injectReconcileTransaction(ReactReconcileTransaction);
    ReactInjection.Updates.injectBatchingStrategy(ReactDefaultBatchingStrategy);
    ReactInjection.Component.injectEnvironment(ReactComponentBrowserEnvironment);
  }
  module.exports = {inject: inject};
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/findDOMNode.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/getHostComponentFromComposite.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var getHostComponentFromComposite = $__require('npm:react@15.2.1/lib/getHostComponentFromComposite.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function findDOMNode(componentOrElement) {
      if ("production" !== 'production') {
        var owner = ReactCurrentOwner.current;
        if (owner !== null) {
          "production" !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing findDOMNode inside its render(). ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
          owner._warnedAboutRefsInRender = true;
        }
      }
      if (componentOrElement == null) {
        return null;
      }
      if (componentOrElement.nodeType === 1) {
        return componentOrElement;
      }
      var inst = ReactInstanceMap.get(componentOrElement);
      if (inst) {
        inst = getHostComponentFromComposite(inst);
        return inst ? ReactDOMComponentTree.getNodeFromInstance(inst) : null;
      }
      if (typeof componentOrElement.render === 'function') {
        !false ? "production" !== 'production' ? invariant(false, 'findDOMNode was called on an unmounted component.') : _prodInvariant('44') : void 0;
      } else {
        !false ? "production" !== 'production' ? invariant(false, 'Element appears to be neither ReactComponent nor DOMNode (keys: %s)', Object.keys(componentOrElement)) : _prodInvariant('45', Object.keys(componentOrElement)) : void 0;
      }
    }
    module.exports = findDOMNode;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getHostComponentFromComposite.js", ["npm:react@15.2.1/lib/ReactNodeTypes.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactNodeTypes = $__require('npm:react@15.2.1/lib/ReactNodeTypes.js');
  function getHostComponentFromComposite(inst) {
    var type;
    while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
      inst = inst._renderedComponent;
    }
    if (type === ReactNodeTypes.HOST) {
      return inst._renderedComponent;
    } else if (type === ReactNodeTypes.EMPTY) {
      return null;
    }
  }
  module.exports = getHostComponentFromComposite;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/escapeTextContentForBrowser.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var matchHtmlRegExp = /["'&<>]/;
  function escapeHtml(string) {
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
      return str;
    }
    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          escape = '&quot;';
          break;
        case 38:
          escape = '&amp;';
          break;
        case 39:
          escape = '&#x27;';
          break;
        case 60:
          escape = '&lt;';
          break;
        case 62:
          escape = '&gt;';
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html += str.substring(lastIndex, index);
      }
      lastIndex = index + 1;
      html += escape;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
  }
  function escapeTextContentForBrowser(text) {
    if (typeof text === 'boolean' || typeof text === 'number') {
      return '' + text;
    }
    return escapeHtml(text);
  }
  module.exports = escapeTextContentForBrowser;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/setTextContent.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/escapeTextContentForBrowser.js", "npm:react@15.2.1/lib/setInnerHTML.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var escapeTextContentForBrowser = $__require('npm:react@15.2.1/lib/escapeTextContentForBrowser.js');
  var setInnerHTML = $__require('npm:react@15.2.1/lib/setInnerHTML.js');
  var setTextContent = function(node, text) {
    if (text) {
      var firstChild = node.firstChild;
      if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
        firstChild.nodeValue = text;
        return;
      }
    }
    node.textContent = text;
  };
  if (ExecutionEnvironment.canUseDOM) {
    if (!('textContent' in document.documentElement)) {
      setTextContent = function(node, text) {
        setInnerHTML(node, escapeTextContentForBrowser(text));
      };
    }
  }
  module.exports = setTextContent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DOMLazyTree.js", ["npm:react@15.2.1/lib/DOMNamespaces.js", "npm:react@15.2.1/lib/setInnerHTML.js", "npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js", "npm:react@15.2.1/lib/setTextContent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DOMNamespaces = $__require('npm:react@15.2.1/lib/DOMNamespaces.js');
  var setInnerHTML = $__require('npm:react@15.2.1/lib/setInnerHTML.js');
  var createMicrosoftUnsafeLocalFunction = $__require('npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js');
  var setTextContent = $__require('npm:react@15.2.1/lib/setTextContent.js');
  var ELEMENT_NODE_TYPE = 1;
  var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
  var enableLazy = typeof document !== 'undefined' && typeof document.documentMode === 'number' || typeof navigator !== 'undefined' && typeof navigator.userAgent === 'string' && /\bEdge\/\d/.test(navigator.userAgent);
  function insertTreeChildren(tree) {
    if (!enableLazy) {
      return;
    }
    var node = tree.node;
    var children = tree.children;
    if (children.length) {
      for (var i = 0; i < children.length; i++) {
        insertTreeBefore(node, children[i], null);
      }
    } else if (tree.html != null) {
      setInnerHTML(node, tree.html);
    } else if (tree.text != null) {
      setTextContent(node, tree.text);
    }
  }
  var insertTreeBefore = createMicrosoftUnsafeLocalFunction(function(parentNode, tree, referenceNode) {
    if (tree.node.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE || tree.node.nodeType === ELEMENT_NODE_TYPE && tree.node.nodeName.toLowerCase() === 'object' && (tree.node.namespaceURI == null || tree.node.namespaceURI === DOMNamespaces.html)) {
      insertTreeChildren(tree);
      parentNode.insertBefore(tree.node, referenceNode);
    } else {
      parentNode.insertBefore(tree.node, referenceNode);
      insertTreeChildren(tree);
    }
  });
  function replaceChildWithTree(oldNode, newTree) {
    oldNode.parentNode.replaceChild(newTree.node, oldNode);
    insertTreeChildren(newTree);
  }
  function queueChild(parentTree, childTree) {
    if (enableLazy) {
      parentTree.children.push(childTree);
    } else {
      parentTree.node.appendChild(childTree.node);
    }
  }
  function queueHTML(tree, html) {
    if (enableLazy) {
      tree.html = html;
    } else {
      setInnerHTML(tree.node, html);
    }
  }
  function queueText(tree, text) {
    if (enableLazy) {
      tree.text = text;
    } else {
      setTextContent(tree.node, text);
    }
  }
  function toString() {
    return this.node.nodeName;
  }
  function DOMLazyTree(node) {
    return {
      node: node,
      children: [],
      html: null,
      text: null,
      toString: toString
    };
  }
  DOMLazyTree.insertTreeBefore = insertTreeBefore;
  DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
  DOMLazyTree.queueChild = queueChild;
  DOMLazyTree.queueHTML = queueHTML;
  DOMLazyTree.queueText = queueText;
  module.exports = DOMLazyTree;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EventPluginRegistry.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var EventPluginOrder = null;
    var namesToPlugins = {};
    function recomputePluginOrdering() {
      if (!EventPluginOrder) {
        return;
      }
      for (var pluginName in namesToPlugins) {
        var PluginModule = namesToPlugins[pluginName];
        var pluginIndex = EventPluginOrder.indexOf(pluginName);
        !(pluginIndex > -1) ? "production" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : _prodInvariant('96', pluginName) : void 0;
        if (EventPluginRegistry.plugins[pluginIndex]) {
          continue;
        }
        !PluginModule.extractEvents ? "production" !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : _prodInvariant('97', pluginName) : void 0;
        EventPluginRegistry.plugins[pluginIndex] = PluginModule;
        var publishedEvents = PluginModule.eventTypes;
        for (var eventName in publishedEvents) {
          !publishEventForPlugin(publishedEvents[eventName], PluginModule, eventName) ? "production" !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : _prodInvariant('98', eventName, pluginName) : void 0;
        }
      }
    }
    function publishEventForPlugin(dispatchConfig, PluginModule, eventName) {
      !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? "production" !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : _prodInvariant('99', eventName) : void 0;
      EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
      if (phasedRegistrationNames) {
        for (var phaseName in phasedRegistrationNames) {
          if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
            var phasedRegistrationName = phasedRegistrationNames[phaseName];
            publishRegistrationName(phasedRegistrationName, PluginModule, eventName);
          }
        }
        return true;
      } else if (dispatchConfig.registrationName) {
        publishRegistrationName(dispatchConfig.registrationName, PluginModule, eventName);
        return true;
      }
      return false;
    }
    function publishRegistrationName(registrationName, PluginModule, eventName) {
      !!EventPluginRegistry.registrationNameModules[registrationName] ? "production" !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : _prodInvariant('100', registrationName) : void 0;
      EventPluginRegistry.registrationNameModules[registrationName] = PluginModule;
      EventPluginRegistry.registrationNameDependencies[registrationName] = PluginModule.eventTypes[eventName].dependencies;
      if ("production" !== 'production') {
        var lowerCasedName = registrationName.toLowerCase();
        EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;
        if (registrationName === 'onDoubleClick') {
          EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
        }
      }
    }
    var EventPluginRegistry = {
      plugins: [],
      eventNameDispatchConfigs: {},
      registrationNameModules: {},
      registrationNameDependencies: {},
      possibleRegistrationNames: "production" !== 'production' ? {} : null,
      injectEventPluginOrder: function(InjectedEventPluginOrder) {
        !!EventPluginOrder ? "production" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : _prodInvariant('101') : void 0;
        EventPluginOrder = Array.prototype.slice.call(InjectedEventPluginOrder);
        recomputePluginOrdering();
      },
      injectEventPluginsByName: function(injectedNamesToPlugins) {
        var isOrderingDirty = false;
        for (var pluginName in injectedNamesToPlugins) {
          if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
            continue;
          }
          var PluginModule = injectedNamesToPlugins[pluginName];
          if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== PluginModule) {
            !!namesToPlugins[pluginName] ? "production" !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : _prodInvariant('102', pluginName) : void 0;
            namesToPlugins[pluginName] = PluginModule;
            isOrderingDirty = true;
          }
        }
        if (isOrderingDirty) {
          recomputePluginOrdering();
        }
      },
      getPluginModuleForEvent: function(event) {
        var dispatchConfig = event.dispatchConfig;
        if (dispatchConfig.registrationName) {
          return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
        }
        for (var phase in dispatchConfig.phasedRegistrationNames) {
          if (!dispatchConfig.phasedRegistrationNames.hasOwnProperty(phase)) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[dispatchConfig.phasedRegistrationNames[phase]];
          if (PluginModule) {
            return PluginModule;
          }
        }
        return null;
      },
      _resetEventPlugins: function() {
        EventPluginOrder = null;
        for (var pluginName in namesToPlugins) {
          if (namesToPlugins.hasOwnProperty(pluginName)) {
            delete namesToPlugins[pluginName];
          }
        }
        EventPluginRegistry.plugins.length = 0;
        var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
        for (var eventName in eventNameDispatchConfigs) {
          if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
            delete eventNameDispatchConfigs[eventName];
          }
        }
        var registrationNameModules = EventPluginRegistry.registrationNameModules;
        for (var registrationName in registrationNameModules) {
          if (registrationNameModules.hasOwnProperty(registrationName)) {
            delete registrationNameModules[registrationName];
          }
        }
        if ("production" !== 'production') {
          var possibleRegistrationNames = EventPluginRegistry.possibleRegistrationNames;
          for (var lowerCasedName in possibleRegistrationNames) {
            if (possibleRegistrationNames.hasOwnProperty(lowerCasedName)) {
              delete possibleRegistrationNames[lowerCasedName];
            }
          }
        }
      }
    };
    module.exports = EventPluginRegistry;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EventConstants.js", ["npm:fbjs@0.8.3/lib/keyMirror.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyMirror = $__require('npm:fbjs@0.8.3/lib/keyMirror.js');
  var PropagationPhases = keyMirror({
    bubbled: null,
    captured: null
  });
  var topLevelTypes = keyMirror({
    topAbort: null,
    topAnimationEnd: null,
    topAnimationIteration: null,
    topAnimationStart: null,
    topBlur: null,
    topCanPlay: null,
    topCanPlayThrough: null,
    topChange: null,
    topClick: null,
    topCompositionEnd: null,
    topCompositionStart: null,
    topCompositionUpdate: null,
    topContextMenu: null,
    topCopy: null,
    topCut: null,
    topDoubleClick: null,
    topDrag: null,
    topDragEnd: null,
    topDragEnter: null,
    topDragExit: null,
    topDragLeave: null,
    topDragOver: null,
    topDragStart: null,
    topDrop: null,
    topDurationChange: null,
    topEmptied: null,
    topEncrypted: null,
    topEnded: null,
    topError: null,
    topFocus: null,
    topInput: null,
    topInvalid: null,
    topKeyDown: null,
    topKeyPress: null,
    topKeyUp: null,
    topLoad: null,
    topLoadedData: null,
    topLoadedMetadata: null,
    topLoadStart: null,
    topMouseDown: null,
    topMouseMove: null,
    topMouseOut: null,
    topMouseOver: null,
    topMouseUp: null,
    topPaste: null,
    topPause: null,
    topPlay: null,
    topPlaying: null,
    topProgress: null,
    topRateChange: null,
    topReset: null,
    topScroll: null,
    topSeeked: null,
    topSeeking: null,
    topSelectionChange: null,
    topStalled: null,
    topSubmit: null,
    topSuspend: null,
    topTextInput: null,
    topTimeUpdate: null,
    topTouchCancel: null,
    topTouchEnd: null,
    topTouchMove: null,
    topTouchStart: null,
    topTransitionEnd: null,
    topVolumeChange: null,
    topWaiting: null,
    topWheel: null
  });
  var EventConstants = {
    topLevelTypes: topLevelTypes,
    PropagationPhases: PropagationPhases
  };
  module.exports = EventConstants;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EventPluginUtils.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/ReactErrorUtils.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var ReactErrorUtils = $__require('npm:react@15.2.1/lib/ReactErrorUtils.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var ComponentTree;
    var TreeTraversal;
    var injection = {
      injectComponentTree: function(Injected) {
        ComponentTree = Injected;
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
        }
      },
      injectTreeTraversal: function(Injected) {
        TreeTraversal = Injected;
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(Injected && Injected.isAncestor && Injected.getLowestCommonAncestor, 'EventPluginUtils.injection.injectTreeTraversal(...): Injected ' + 'module is missing isAncestor or getLowestCommonAncestor.') : void 0;
        }
      }
    };
    var topLevelTypes = EventConstants.topLevelTypes;
    function isEndish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseUp || topLevelType === topLevelTypes.topTouchEnd || topLevelType === topLevelTypes.topTouchCancel;
    }
    function isMoveish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseMove || topLevelType === topLevelTypes.topTouchMove;
    }
    function isStartish(topLevelType) {
      return topLevelType === topLevelTypes.topMouseDown || topLevelType === topLevelTypes.topTouchStart;
    }
    var validateEventDispatches;
    if ("production" !== 'production') {
      validateEventDispatches = function(event) {
        var dispatchListeners = event._dispatchListeners;
        var dispatchInstances = event._dispatchInstances;
        var listenersIsArr = Array.isArray(dispatchListeners);
        var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;
        var instancesIsArr = Array.isArray(dispatchInstances);
        var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;
        "production" !== 'production' ? warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : void 0;
      };
    }
    function executeDispatch(event, simulated, listener, inst) {
      var type = event.type || 'unknown-event';
      event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
      if (simulated) {
        ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event);
      } else {
        ReactErrorUtils.invokeGuardedCallback(type, listener, event);
      }
      event.currentTarget = null;
    }
    function executeDispatchesInOrder(event, simulated) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchInstances = event._dispatchInstances;
      if ("production" !== 'production') {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
        }
      } else if (dispatchListeners) {
        executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
      }
      event._dispatchListeners = null;
      event._dispatchInstances = null;
    }
    function executeDispatchesInOrderStopAtTrueImpl(event) {
      var dispatchListeners = event._dispatchListeners;
      var dispatchInstances = event._dispatchInstances;
      if ("production" !== 'production') {
        validateEventDispatches(event);
      }
      if (Array.isArray(dispatchListeners)) {
        for (var i = 0; i < dispatchListeners.length; i++) {
          if (event.isPropagationStopped()) {
            break;
          }
          if (dispatchListeners[i](event, dispatchInstances[i])) {
            return dispatchInstances[i];
          }
        }
      } else if (dispatchListeners) {
        if (dispatchListeners(event, dispatchInstances)) {
          return dispatchInstances;
        }
      }
      return null;
    }
    function executeDispatchesInOrderStopAtTrue(event) {
      var ret = executeDispatchesInOrderStopAtTrueImpl(event);
      event._dispatchInstances = null;
      event._dispatchListeners = null;
      return ret;
    }
    function executeDirectDispatch(event) {
      if ("production" !== 'production') {
        validateEventDispatches(event);
      }
      var dispatchListener = event._dispatchListeners;
      var dispatchInstance = event._dispatchInstances;
      !!Array.isArray(dispatchListener) ? "production" !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : _prodInvariant('103') : void 0;
      event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
      var res = dispatchListener ? dispatchListener(event) : null;
      event.currentTarget = null;
      event._dispatchListeners = null;
      event._dispatchInstances = null;
      return res;
    }
    function hasDispatches(event) {
      return !!event._dispatchListeners;
    }
    var EventPluginUtils = {
      isEndish: isEndish,
      isMoveish: isMoveish,
      isStartish: isStartish,
      executeDirectDispatch: executeDirectDispatch,
      executeDispatchesInOrder: executeDispatchesInOrder,
      executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
      hasDispatches: hasDispatches,
      getInstanceFromNode: function(node) {
        return ComponentTree.getInstanceFromNode(node);
      },
      getNodeFromInstance: function(node) {
        return ComponentTree.getNodeFromInstance(node);
      },
      isAncestor: function(a, b) {
        return TreeTraversal.isAncestor(a, b);
      },
      getLowestCommonAncestor: function(a, b) {
        return TreeTraversal.getLowestCommonAncestor(a, b);
      },
      getParentInstance: function(inst) {
        return TreeTraversal.getParentInstance(inst);
      },
      traverseTwoPhase: function(target, fn, arg) {
        return TreeTraversal.traverseTwoPhase(target, fn, arg);
      },
      traverseEnterLeave: function(from, to, fn, argFrom, argTo) {
        return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
      },
      injection: injection
    };
    module.exports = EventPluginUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/accumulateInto.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function accumulateInto(current, next) {
      !(next != null) ? "production" !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : _prodInvariant('30') : void 0;
      if (current == null) {
        return next;
      }
      if (Array.isArray(current)) {
        if (Array.isArray(next)) {
          current.push.apply(current, next);
          return current;
        }
        current.push(next);
        return current;
      }
      if (Array.isArray(next)) {
        return [current].concat(next);
      }
      return [current, next];
    }
    module.exports = accumulateInto;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/forEachAccumulated.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function forEachAccumulated(arr, cb, scope) {
    if (Array.isArray(arr)) {
      arr.forEach(cb, scope);
    } else if (arr) {
      cb.call(scope, arr);
    }
  }
  module.exports = forEachAccumulated;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/EventPluginHub.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/EventPluginRegistry.js", "npm:react@15.2.1/lib/EventPluginUtils.js", "npm:react@15.2.1/lib/ReactErrorUtils.js", "npm:react@15.2.1/lib/accumulateInto.js", "npm:react@15.2.1/lib/forEachAccumulated.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var EventPluginRegistry = $__require('npm:react@15.2.1/lib/EventPluginRegistry.js');
    var EventPluginUtils = $__require('npm:react@15.2.1/lib/EventPluginUtils.js');
    var ReactErrorUtils = $__require('npm:react@15.2.1/lib/ReactErrorUtils.js');
    var accumulateInto = $__require('npm:react@15.2.1/lib/accumulateInto.js');
    var forEachAccumulated = $__require('npm:react@15.2.1/lib/forEachAccumulated.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var listenerBank = {};
    var eventQueue = null;
    var executeDispatchesAndRelease = function(event, simulated) {
      if (event) {
        EventPluginUtils.executeDispatchesInOrder(event, simulated);
        if (!event.isPersistent()) {
          event.constructor.release(event);
        }
      }
    };
    var executeDispatchesAndReleaseSimulated = function(e) {
      return executeDispatchesAndRelease(e, true);
    };
    var executeDispatchesAndReleaseTopLevel = function(e) {
      return executeDispatchesAndRelease(e, false);
    };
    var EventPluginHub = {
      injection: {
        injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,
        injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName
      },
      putListener: function(inst, registrationName, listener) {
        !(typeof listener === 'function') ? "production" !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : _prodInvariant('94', registrationName, typeof listener) : void 0;
        var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
        bankForRegistrationName[inst._rootNodeID] = listener;
        var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
        if (PluginModule && PluginModule.didPutListener) {
          PluginModule.didPutListener(inst, registrationName, listener);
        }
      },
      getListener: function(inst, registrationName) {
        var bankForRegistrationName = listenerBank[registrationName];
        return bankForRegistrationName && bankForRegistrationName[inst._rootNodeID];
      },
      deleteListener: function(inst, registrationName) {
        var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
        if (PluginModule && PluginModule.willDeleteListener) {
          PluginModule.willDeleteListener(inst, registrationName);
        }
        var bankForRegistrationName = listenerBank[registrationName];
        if (bankForRegistrationName) {
          delete bankForRegistrationName[inst._rootNodeID];
        }
      },
      deleteAllListeners: function(inst) {
        for (var registrationName in listenerBank) {
          if (!listenerBank.hasOwnProperty(registrationName)) {
            continue;
          }
          if (!listenerBank[registrationName][inst._rootNodeID]) {
            continue;
          }
          var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
          if (PluginModule && PluginModule.willDeleteListener) {
            PluginModule.willDeleteListener(inst, registrationName);
          }
          delete listenerBank[registrationName][inst._rootNodeID];
        }
      },
      extractEvents: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
        var events;
        var plugins = EventPluginRegistry.plugins;
        for (var i = 0; i < plugins.length; i++) {
          var possiblePlugin = plugins[i];
          if (possiblePlugin) {
            var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
            if (extractedEvents) {
              events = accumulateInto(events, extractedEvents);
            }
          }
        }
        return events;
      },
      enqueueEvents: function(events) {
        if (events) {
          eventQueue = accumulateInto(eventQueue, events);
        }
      },
      processEventQueue: function(simulated) {
        var processingEventQueue = eventQueue;
        eventQueue = null;
        if (simulated) {
          forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
        } else {
          forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
        }
        !!eventQueue ? "production" !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : _prodInvariant('95') : void 0;
        ReactErrorUtils.rethrowCaughtError();
      },
      __purge: function() {
        listenerBank = {};
      },
      __getListenerBank: function() {
        return listenerBank;
      }
    };
    module.exports = EventPluginHub;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactEventEmitterMixin.js", ["npm:react@15.2.1/lib/EventPluginHub.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EventPluginHub = $__require('npm:react@15.2.1/lib/EventPluginHub.js');
  function runEventQueueInBatch(events) {
    EventPluginHub.enqueueEvents(events);
    EventPluginHub.processEventQueue(false);
  }
  var ReactEventEmitterMixin = {handleTopLevel: function(topLevelType, targetInst, nativeEvent, nativeEventTarget) {
      var events = EventPluginHub.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
      runEventQueueInBatch(events);
    }};
  module.exports = ReactEventEmitterMixin;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ViewportMetrics.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ViewportMetrics = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    refreshScrollValues: function(scrollPosition) {
      ViewportMetrics.currentScrollLeft = scrollPosition.x;
      ViewportMetrics.currentScrollTop = scrollPosition.y;
    }
  };
  module.exports = ViewportMetrics;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getVendorPrefixedEventName.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  function makePrefixMap(styleProp, eventName) {
    var prefixes = {};
    prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
    prefixes['Webkit' + styleProp] = 'webkit' + eventName;
    prefixes['Moz' + styleProp] = 'moz' + eventName;
    prefixes['ms' + styleProp] = 'MS' + eventName;
    prefixes['O' + styleProp] = 'o' + eventName.toLowerCase();
    return prefixes;
  }
  var vendorPrefixes = {
    animationend: makePrefixMap('Animation', 'AnimationEnd'),
    animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
    animationstart: makePrefixMap('Animation', 'AnimationStart'),
    transitionend: makePrefixMap('Transition', 'TransitionEnd')
  };
  var prefixedEventNames = {};
  var style = {};
  if (ExecutionEnvironment.canUseDOM) {
    style = document.createElement('div').style;
    if (!('AnimationEvent' in window)) {
      delete vendorPrefixes.animationend.animation;
      delete vendorPrefixes.animationiteration.animation;
      delete vendorPrefixes.animationstart.animation;
    }
    if (!('TransitionEvent' in window)) {
      delete vendorPrefixes.transitionend.transition;
    }
  }
  function getVendorPrefixedEventName(eventName) {
    if (prefixedEventNames[eventName]) {
      return prefixedEventNames[eventName];
    } else if (!vendorPrefixes[eventName]) {
      return eventName;
    }
    var prefixMap = vendorPrefixes[eventName];
    for (var styleProp in prefixMap) {
      if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
        return prefixedEventNames[eventName] = prefixMap[styleProp];
      }
    }
    return '';
  }
  module.exports = getVendorPrefixedEventName;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/isEventSupported.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var useHasFeature;
  if (ExecutionEnvironment.canUseDOM) {
    useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature('', '') !== true;
  }
  function isEventSupported(eventNameSuffix, capture) {
    if (!ExecutionEnvironment.canUseDOM || capture && !('addEventListener' in document)) {
      return false;
    }
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in document;
    if (!isSupported) {
      var element = document.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }
    if (!isSupported && useHasFeature && eventNameSuffix === 'wheel') {
      isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
    }
    return isSupported;
  }
  module.exports = isEventSupported;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactBrowserEventEmitter.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/EventConstants.js", "npm:react@15.2.1/lib/EventPluginRegistry.js", "npm:react@15.2.1/lib/ReactEventEmitterMixin.js", "npm:react@15.2.1/lib/ViewportMetrics.js", "npm:react@15.2.1/lib/getVendorPrefixedEventName.js", "npm:react@15.2.1/lib/isEventSupported.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var EventConstants = $__require('npm:react@15.2.1/lib/EventConstants.js');
    var EventPluginRegistry = $__require('npm:react@15.2.1/lib/EventPluginRegistry.js');
    var ReactEventEmitterMixin = $__require('npm:react@15.2.1/lib/ReactEventEmitterMixin.js');
    var ViewportMetrics = $__require('npm:react@15.2.1/lib/ViewportMetrics.js');
    var getVendorPrefixedEventName = $__require('npm:react@15.2.1/lib/getVendorPrefixedEventName.js');
    var isEventSupported = $__require('npm:react@15.2.1/lib/isEventSupported.js');
    var hasEventPageXY;
    var alreadyListeningTo = {};
    var isMonitoringScrollValue = false;
    var reactTopListenersCounter = 0;
    var topEventMapping = {
      topAbort: 'abort',
      topAnimationEnd: getVendorPrefixedEventName('animationend') || 'animationend',
      topAnimationIteration: getVendorPrefixedEventName('animationiteration') || 'animationiteration',
      topAnimationStart: getVendorPrefixedEventName('animationstart') || 'animationstart',
      topBlur: 'blur',
      topCanPlay: 'canplay',
      topCanPlayThrough: 'canplaythrough',
      topChange: 'change',
      topClick: 'click',
      topCompositionEnd: 'compositionend',
      topCompositionStart: 'compositionstart',
      topCompositionUpdate: 'compositionupdate',
      topContextMenu: 'contextmenu',
      topCopy: 'copy',
      topCut: 'cut',
      topDoubleClick: 'dblclick',
      topDrag: 'drag',
      topDragEnd: 'dragend',
      topDragEnter: 'dragenter',
      topDragExit: 'dragexit',
      topDragLeave: 'dragleave',
      topDragOver: 'dragover',
      topDragStart: 'dragstart',
      topDrop: 'drop',
      topDurationChange: 'durationchange',
      topEmptied: 'emptied',
      topEncrypted: 'encrypted',
      topEnded: 'ended',
      topError: 'error',
      topFocus: 'focus',
      topInput: 'input',
      topKeyDown: 'keydown',
      topKeyPress: 'keypress',
      topKeyUp: 'keyup',
      topLoadedData: 'loadeddata',
      topLoadedMetadata: 'loadedmetadata',
      topLoadStart: 'loadstart',
      topMouseDown: 'mousedown',
      topMouseMove: 'mousemove',
      topMouseOut: 'mouseout',
      topMouseOver: 'mouseover',
      topMouseUp: 'mouseup',
      topPaste: 'paste',
      topPause: 'pause',
      topPlay: 'play',
      topPlaying: 'playing',
      topProgress: 'progress',
      topRateChange: 'ratechange',
      topScroll: 'scroll',
      topSeeked: 'seeked',
      topSeeking: 'seeking',
      topSelectionChange: 'selectionchange',
      topStalled: 'stalled',
      topSuspend: 'suspend',
      topTextInput: 'textInput',
      topTimeUpdate: 'timeupdate',
      topTouchCancel: 'touchcancel',
      topTouchEnd: 'touchend',
      topTouchMove: 'touchmove',
      topTouchStart: 'touchstart',
      topTransitionEnd: getVendorPrefixedEventName('transitionend') || 'transitionend',
      topVolumeChange: 'volumechange',
      topWaiting: 'waiting',
      topWheel: 'wheel'
    };
    var topListenersIDKey = '_reactListenersID' + String(Math.random()).slice(2);
    function getListeningForDocument(mountAt) {
      if (!Object.prototype.hasOwnProperty.call(mountAt, topListenersIDKey)) {
        mountAt[topListenersIDKey] = reactTopListenersCounter++;
        alreadyListeningTo[mountAt[topListenersIDKey]] = {};
      }
      return alreadyListeningTo[mountAt[topListenersIDKey]];
    }
    var ReactBrowserEventEmitter = _assign({}, ReactEventEmitterMixin, {
      ReactEventListener: null,
      injection: {injectReactEventListener: function(ReactEventListener) {
          ReactEventListener.setHandleTopLevel(ReactBrowserEventEmitter.handleTopLevel);
          ReactBrowserEventEmitter.ReactEventListener = ReactEventListener;
        }},
      setEnabled: function(enabled) {
        if (ReactBrowserEventEmitter.ReactEventListener) {
          ReactBrowserEventEmitter.ReactEventListener.setEnabled(enabled);
        }
      },
      isEnabled: function() {
        return !!(ReactBrowserEventEmitter.ReactEventListener && ReactBrowserEventEmitter.ReactEventListener.isEnabled());
      },
      listenTo: function(registrationName, contentDocumentHandle) {
        var mountAt = contentDocumentHandle;
        var isListening = getListeningForDocument(mountAt);
        var dependencies = EventPluginRegistry.registrationNameDependencies[registrationName];
        var topLevelTypes = EventConstants.topLevelTypes;
        for (var i = 0; i < dependencies.length; i++) {
          var dependency = dependencies[i];
          if (!(isListening.hasOwnProperty(dependency) && isListening[dependency])) {
            if (dependency === topLevelTypes.topWheel) {
              if (isEventSupported('wheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'wheel', mountAt);
              } else if (isEventSupported('mousewheel')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'mousewheel', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topWheel, 'DOMMouseScroll', mountAt);
              }
            } else if (dependency === topLevelTypes.topScroll) {
              if (isEventSupported('scroll', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topScroll, 'scroll', mountAt);
              } else {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topScroll, 'scroll', ReactBrowserEventEmitter.ReactEventListener.WINDOW_HANDLE);
              }
            } else if (dependency === topLevelTypes.topFocus || dependency === topLevelTypes.topBlur) {
              if (isEventSupported('focus', true)) {
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topFocus, 'focus', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelTypes.topBlur, 'blur', mountAt);
              } else if (isEventSupported('focusin')) {
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topFocus, 'focusin', mountAt);
                ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelTypes.topBlur, 'focusout', mountAt);
              }
              isListening[topLevelTypes.topBlur] = true;
              isListening[topLevelTypes.topFocus] = true;
            } else if (topEventMapping.hasOwnProperty(dependency)) {
              ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(dependency, topEventMapping[dependency], mountAt);
            }
            isListening[dependency] = true;
          }
        }
      },
      trapBubbledEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapBubbledEvent(topLevelType, handlerBaseName, handle);
      },
      trapCapturedEvent: function(topLevelType, handlerBaseName, handle) {
        return ReactBrowserEventEmitter.ReactEventListener.trapCapturedEvent(topLevelType, handlerBaseName, handle);
      },
      ensureScrollValueMonitoring: function() {
        if (hasEventPageXY === undefined) {
          hasEventPageXY = document.createEvent && 'pageX' in document.createEvent('MouseEvent');
        }
        if (!hasEventPageXY && !isMonitoringScrollValue) {
          var refresh = ViewportMetrics.refreshScrollValues;
          ReactBrowserEventEmitter.ReactEventListener.monitorScrollValue(refresh);
          isMonitoringScrollValue = true;
        }
      }
    });
    module.exports = ReactBrowserEventEmitter;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DOMProperty.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function checkMask(value, bitmask) {
      return (value & bitmask) === bitmask;
    }
    var DOMPropertyInjection = {
      MUST_USE_PROPERTY: 0x1,
      HAS_BOOLEAN_VALUE: 0x4,
      HAS_NUMERIC_VALUE: 0x8,
      HAS_POSITIVE_NUMERIC_VALUE: 0x10 | 0x8,
      HAS_OVERLOADED_BOOLEAN_VALUE: 0x20,
      injectDOMPropertyConfig: function(domPropertyConfig) {
        var Injection = DOMPropertyInjection;
        var Properties = domPropertyConfig.Properties || {};
        var DOMAttributeNamespaces = domPropertyConfig.DOMAttributeNamespaces || {};
        var DOMAttributeNames = domPropertyConfig.DOMAttributeNames || {};
        var DOMPropertyNames = domPropertyConfig.DOMPropertyNames || {};
        var DOMMutationMethods = domPropertyConfig.DOMMutationMethods || {};
        if (domPropertyConfig.isCustomAttribute) {
          DOMProperty._isCustomAttributeFunctions.push(domPropertyConfig.isCustomAttribute);
        }
        for (var propName in Properties) {
          !!DOMProperty.properties.hasOwnProperty(propName) ? "production" !== 'production' ? invariant(false, 'injectDOMPropertyConfig(...): You\'re trying to inject DOM property \'%s\' which has already been injected. You may be accidentally injecting the same DOM property config twice, or you may be injecting two configs that have conflicting property names.', propName) : _prodInvariant('48', propName) : void 0;
          var lowerCased = propName.toLowerCase();
          var propConfig = Properties[propName];
          var propertyInfo = {
            attributeName: lowerCased,
            attributeNamespace: null,
            propertyName: propName,
            mutationMethod: null,
            mustUseProperty: checkMask(propConfig, Injection.MUST_USE_PROPERTY),
            hasBooleanValue: checkMask(propConfig, Injection.HAS_BOOLEAN_VALUE),
            hasNumericValue: checkMask(propConfig, Injection.HAS_NUMERIC_VALUE),
            hasPositiveNumericValue: checkMask(propConfig, Injection.HAS_POSITIVE_NUMERIC_VALUE),
            hasOverloadedBooleanValue: checkMask(propConfig, Injection.HAS_OVERLOADED_BOOLEAN_VALUE)
          };
          !(propertyInfo.hasBooleanValue + propertyInfo.hasNumericValue + propertyInfo.hasOverloadedBooleanValue <= 1) ? "production" !== 'production' ? invariant(false, 'DOMProperty: Value can be one of boolean, overloaded boolean, or numeric value, but not a combination: %s', propName) : _prodInvariant('50', propName) : void 0;
          if ("production" !== 'production') {
            DOMProperty.getPossibleStandardName[lowerCased] = propName;
          }
          if (DOMAttributeNames.hasOwnProperty(propName)) {
            var attributeName = DOMAttributeNames[propName];
            propertyInfo.attributeName = attributeName;
            if ("production" !== 'production') {
              DOMProperty.getPossibleStandardName[attributeName] = propName;
            }
          }
          if (DOMAttributeNamespaces.hasOwnProperty(propName)) {
            propertyInfo.attributeNamespace = DOMAttributeNamespaces[propName];
          }
          if (DOMPropertyNames.hasOwnProperty(propName)) {
            propertyInfo.propertyName = DOMPropertyNames[propName];
          }
          if (DOMMutationMethods.hasOwnProperty(propName)) {
            propertyInfo.mutationMethod = DOMMutationMethods[propName];
          }
          DOMProperty.properties[propName] = propertyInfo;
        }
      }
    };
    var ATTRIBUTE_NAME_START_CHAR = ':A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
    var DOMProperty = {
      ID_ATTRIBUTE_NAME: 'data-reactid',
      ROOT_ATTRIBUTE_NAME: 'data-reactroot',
      ATTRIBUTE_NAME_START_CHAR: ATTRIBUTE_NAME_START_CHAR,
      ATTRIBUTE_NAME_CHAR: ATTRIBUTE_NAME_START_CHAR + '\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040',
      properties: {},
      getPossibleStandardName: "production" !== 'production' ? {} : null,
      _isCustomAttributeFunctions: [],
      isCustomAttribute: function(attributeName) {
        for (var i = 0; i < DOMProperty._isCustomAttributeFunctions.length; i++) {
          var isCustomAttributeFn = DOMProperty._isCustomAttributeFunctions[i];
          if (isCustomAttributeFn(attributeName)) {
            return true;
          }
        }
        return false;
      },
      injection: DOMPropertyInjection
    };
    module.exports = DOMProperty;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMComponentFlags.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactDOMComponentFlags = {hasCachedChildNodes: 1 << 0};
  module.exports = ReactDOMComponentFlags;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMComponentTree.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/ReactDOMComponentFlags.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
    var ReactDOMComponentFlags = $__require('npm:react@15.2.1/lib/ReactDOMComponentFlags.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    var Flags = ReactDOMComponentFlags;
    var internalInstanceKey = '__reactInternalInstance$' + Math.random().toString(36).slice(2);
    function getRenderedHostOrTextFromComponent(component) {
      var rendered;
      while (rendered = component._renderedComponent) {
        component = rendered;
      }
      return component;
    }
    function precacheNode(inst, node) {
      var hostInst = getRenderedHostOrTextFromComponent(inst);
      hostInst._hostNode = node;
      node[internalInstanceKey] = hostInst;
    }
    function uncacheNode(inst) {
      var node = inst._hostNode;
      if (node) {
        delete node[internalInstanceKey];
        inst._hostNode = null;
      }
    }
    function precacheChildNodes(inst, node) {
      if (inst._flags & Flags.hasCachedChildNodes) {
        return;
      }
      var children = inst._renderedChildren;
      var childNode = node.firstChild;
      outer: for (var name in children) {
        if (!children.hasOwnProperty(name)) {
          continue;
        }
        var childInst = children[name];
        var childID = getRenderedHostOrTextFromComponent(childInst)._domID;
        if (childID == null) {
          continue;
        }
        for (; childNode !== null; childNode = childNode.nextSibling) {
          if (childNode.nodeType === 1 && childNode.getAttribute(ATTR_NAME) === String(childID) || childNode.nodeType === 8 && childNode.nodeValue === ' react-text: ' + childID + ' ' || childNode.nodeType === 8 && childNode.nodeValue === ' react-empty: ' + childID + ' ') {
            precacheNode(childInst, childNode);
            continue outer;
          }
        }
        !false ? "production" !== 'production' ? invariant(false, 'Unable to find element with ID %s.', childID) : _prodInvariant('32', childID) : void 0;
      }
      inst._flags |= Flags.hasCachedChildNodes;
    }
    function getClosestInstanceFromNode(node) {
      if (node[internalInstanceKey]) {
        return node[internalInstanceKey];
      }
      var parents = [];
      while (!node[internalInstanceKey]) {
        parents.push(node);
        if (node.parentNode) {
          node = node.parentNode;
        } else {
          return null;
        }
      }
      var closest;
      var inst;
      for (; node && (inst = node[internalInstanceKey]); node = parents.pop()) {
        closest = inst;
        if (parents.length) {
          precacheChildNodes(inst, node);
        }
      }
      return closest;
    }
    function getInstanceFromNode(node) {
      var inst = getClosestInstanceFromNode(node);
      if (inst != null && inst._hostNode === node) {
        return inst;
      } else {
        return null;
      }
    }
    function getNodeFromInstance(inst) {
      !(inst._hostNode !== undefined) ? "production" !== 'production' ? invariant(false, 'getNodeFromInstance: Invalid argument.') : _prodInvariant('33') : void 0;
      if (inst._hostNode) {
        return inst._hostNode;
      }
      var parents = [];
      while (!inst._hostNode) {
        parents.push(inst);
        !inst._hostParent ? "production" !== 'production' ? invariant(false, 'React DOM tree root should always have a node reference.') : _prodInvariant('34') : void 0;
        inst = inst._hostParent;
      }
      for (; parents.length; inst = parents.pop()) {
        precacheChildNodes(inst, inst._hostNode);
      }
      return inst._hostNode;
    }
    var ReactDOMComponentTree = {
      getClosestInstanceFromNode: getClosestInstanceFromNode,
      getInstanceFromNode: getInstanceFromNode,
      getNodeFromInstance: getNodeFromInstance,
      precacheChildNodes: precacheChildNodes,
      precacheNode: precacheNode,
      uncacheNode: uncacheNode
    };
    module.exports = ReactDOMComponentTree;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/validateDOMNesting.js", ["npm:object-assign@4.1.0.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var validateDOMNesting = emptyFunction;
    if ("production" !== 'production') {
      var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];
      var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template', 'foreignObject', 'desc', 'title'];
      var buttonScopeTags = inScopeTags.concat(['button']);
      var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];
      var emptyAncestorInfo = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      var updatedAncestorInfo = function(oldInfo, tag, instance) {
        var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
        var info = {
          tag: tag,
          instance: instance
        };
        if (inScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.aTagInScope = null;
          ancestorInfo.buttonTagInScope = null;
          ancestorInfo.nobrTagInScope = null;
        }
        if (buttonScopeTags.indexOf(tag) !== -1) {
          ancestorInfo.pTagInButtonScope = null;
        }
        if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
          ancestorInfo.listItemTagAutoclosing = null;
          ancestorInfo.dlItemTagAutoclosing = null;
        }
        ancestorInfo.current = info;
        if (tag === 'form') {
          ancestorInfo.formTag = info;
        }
        if (tag === 'a') {
          ancestorInfo.aTagInScope = info;
        }
        if (tag === 'button') {
          ancestorInfo.buttonTagInScope = info;
        }
        if (tag === 'nobr') {
          ancestorInfo.nobrTagInScope = info;
        }
        if (tag === 'p') {
          ancestorInfo.pTagInButtonScope = info;
        }
        if (tag === 'li') {
          ancestorInfo.listItemTagAutoclosing = info;
        }
        if (tag === 'dd' || tag === 'dt') {
          ancestorInfo.dlItemTagAutoclosing = info;
        }
        return ancestorInfo;
      };
      var isTagValidWithParent = function(tag, parentTag) {
        switch (parentTag) {
          case 'select':
            return tag === 'option' || tag === 'optgroup' || tag === '#text';
          case 'optgroup':
            return tag === 'option' || tag === '#text';
          case 'option':
            return tag === '#text';
          case 'tr':
            return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'tbody':
          case 'thead':
          case 'tfoot':
            return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'colgroup':
            return tag === 'col' || tag === 'template';
          case 'table':
            return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'head':
            return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';
          case 'html':
            return tag === 'head' || tag === 'body';
          case '#document':
            return tag === 'html';
        }
        switch (tag) {
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';
          case 'rp':
          case 'rt':
            return impliedEndTags.indexOf(parentTag) === -1;
          case 'body':
          case 'caption':
          case 'col':
          case 'colgroup':
          case 'frame':
          case 'head':
          case 'html':
          case 'tbody':
          case 'td':
          case 'tfoot':
          case 'th':
          case 'thead':
          case 'tr':
            return parentTag == null;
        }
        return true;
      };
      var findInvalidAncestorForTag = function(tag, ancestorInfo) {
        switch (tag) {
          case 'address':
          case 'article':
          case 'aside':
          case 'blockquote':
          case 'center':
          case 'details':
          case 'dialog':
          case 'dir':
          case 'div':
          case 'dl':
          case 'fieldset':
          case 'figcaption':
          case 'figure':
          case 'footer':
          case 'header':
          case 'hgroup':
          case 'main':
          case 'menu':
          case 'nav':
          case 'ol':
          case 'p':
          case 'section':
          case 'summary':
          case 'ul':
          case 'pre':
          case 'listing':
          case 'table':
          case 'hr':
          case 'xmp':
          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return ancestorInfo.pTagInButtonScope;
          case 'form':
            return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
          case 'li':
            return ancestorInfo.listItemTagAutoclosing;
          case 'dd':
          case 'dt':
            return ancestorInfo.dlItemTagAutoclosing;
          case 'button':
            return ancestorInfo.buttonTagInScope;
          case 'a':
            return ancestorInfo.aTagInScope;
          case 'nobr':
            return ancestorInfo.nobrTagInScope;
        }
        return null;
      };
      var findOwnerStack = function(instance) {
        if (!instance) {
          return [];
        }
        var stack = [];
        do {
          stack.push(instance);
        } while (instance = instance._currentElement._owner);
        stack.reverse();
        return stack;
      };
      var didWarn = {};
      validateDOMNesting = function(childTag, childInstance, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.current;
        var parentTag = parentInfo && parentInfo.tag;
        var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
        var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
        var problematic = invalidParent || invalidAncestor;
        if (problematic) {
          var ancestorTag = problematic.tag;
          var ancestorInstance = problematic.instance;
          var childOwner = childInstance && childInstance._currentElement._owner;
          var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;
          var childOwners = findOwnerStack(childOwner);
          var ancestorOwners = findOwnerStack(ancestorOwner);
          var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
          var i;
          var deepestCommon = -1;
          for (i = 0; i < minStackLen; i++) {
            if (childOwners[i] === ancestorOwners[i]) {
              deepestCommon = i;
            } else {
              break;
            }
          }
          var UNKNOWN = '(unknown)';
          var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function(inst) {
            return inst.getName() || UNKNOWN;
          });
          var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function(inst) {
            return inst.getName() || UNKNOWN;
          });
          var ownerInfo = [].concat(deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag, invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');
          var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
          if (didWarn[warnKey]) {
            return;
          }
          didWarn[warnKey] = true;
          var tagDisplayName = childTag;
          if (childTag !== '#text') {
            tagDisplayName = '<' + childTag + '>';
          }
          if (invalidParent) {
            var info = '';
            if (ancestorTag === 'table' && childTag === 'tr') {
              info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
            }
            "production" !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>. ' + 'See %s.%s', tagDisplayName, ancestorTag, ownerInfo, info) : void 0;
          } else {
            "production" !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>. See %s.', tagDisplayName, ancestorTag, ownerInfo) : void 0;
          }
        }
      };
      validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;
      validateDOMNesting.isTagValidInContext = function(tag, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfo;
        var parentInfo = ancestorInfo.current;
        var parentTag = parentInfo && parentInfo.tag;
        return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
      };
    }
    module.exports = validateDOMNesting;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMContainerInfo.js", ["npm:react@15.2.1/lib/validateDOMNesting.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var validateDOMNesting = $__require('npm:react@15.2.1/lib/validateDOMNesting.js');
    var DOC_NODE_TYPE = 9;
    function ReactDOMContainerInfo(topLevelWrapper, node) {
      var info = {
        _topLevelWrapper: topLevelWrapper,
        _idCounter: 1,
        _ownerDocument: node ? node.nodeType === DOC_NODE_TYPE ? node : node.ownerDocument : null,
        _node: node,
        _tag: node ? node.nodeName.toLowerCase() : null,
        _namespaceURI: node ? node.namespaceURI : null
      };
      if ("production" !== 'production') {
        info._ancestorInfo = node ? validateDOMNesting.updatedAncestorInfo(null, info._tag, null) : null;
      }
      return info;
    }
    module.exports = ReactDOMContainerInfo;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMFeatureFlags.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactDOMFeatureFlags = {useCreateElement: true};
  module.exports = ReactDOMFeatureFlags;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/adler32.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MOD = 65521;
  function adler32(data) {
    var a = 1;
    var b = 0;
    var i = 0;
    var l = data.length;
    var m = l & ~0x3;
    while (i < m) {
      var n = Math.min(i + 4096, m);
      for (; i < n; i += 4) {
        b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
      }
      a %= MOD;
      b %= MOD;
    }
    for (; i < l; i++) {
      b += a += data.charCodeAt(i);
    }
    a %= MOD;
    b %= MOD;
    return a | b << 16;
  }
  module.exports = adler32;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactMarkupChecksum.js", ["npm:react@15.2.1/lib/adler32.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var adler32 = $__require('npm:react@15.2.1/lib/adler32.js');
  var TAG_END = /\/?>/;
  var COMMENT_START = /^<\!\-\-/;
  var ReactMarkupChecksum = {
    CHECKSUM_ATTR_NAME: 'data-react-checksum',
    addChecksumToMarkup: function(markup) {
      var checksum = adler32(markup);
      if (COMMENT_START.test(markup)) {
        return markup;
      } else {
        return markup.replace(TAG_END, ' ' + ReactMarkupChecksum.CHECKSUM_ATTR_NAME + '="' + checksum + '"$&');
      }
    },
    canReuseMarkup: function(markup, element) {
      var existingChecksum = element.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
      existingChecksum = existingChecksum && parseInt(existingChecksum, 10);
      var markupChecksum = adler32(markup);
      return markupChecksum === existingChecksum;
    }
  };
  module.exports = ReactMarkupChecksum;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactUpdateQueue.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function enqueueUpdate(internalInstance) {
      ReactUpdates.enqueueUpdate(internalInstance);
    }
    function formatUnexpectedArgument(arg) {
      var type = typeof arg;
      if (type !== 'object') {
        return type;
      }
      var displayName = arg.constructor && arg.constructor.name || type;
      var keys = Object.keys(arg);
      if (keys.length > 0 && keys.length < 20) {
        return displayName + ' (keys: ' + keys.join(', ') + ')';
      }
      return displayName;
    }
    function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
      var internalInstance = ReactInstanceMap.get(publicInstance);
      if (!internalInstance) {
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(!callerName, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor.displayName) : void 0;
        }
        return null;
      }
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(ReactCurrentOwner.current == null, '%s(...): Cannot update during an existing state transition (such as ' + 'within `render` or another component\'s constructor). Render methods ' + 'should be a pure function of props and state; constructor ' + 'side-effects are an anti-pattern, but can be moved to ' + '`componentWillMount`.', callerName) : void 0;
      }
      return internalInstance;
    }
    var ReactUpdateQueue = {
      isMounted: function(publicInstance) {
        if ("production" !== 'production') {
          var owner = ReactCurrentOwner.current;
          if (owner !== null) {
            "production" !== 'production' ? warning(owner._warnedAboutRefsInRender, '%s is accessing isMounted inside its render() function. ' + 'render() should be a pure function of props and state. It should ' + 'never access something that requires stale data from the previous ' + 'render, such as refs. Move this logic to componentDidMount and ' + 'componentDidUpdate instead.', owner.getName() || 'A component') : void 0;
            owner._warnedAboutRefsInRender = true;
          }
        }
        var internalInstance = ReactInstanceMap.get(publicInstance);
        if (internalInstance) {
          return !!internalInstance._renderedComponent;
        } else {
          return false;
        }
      },
      enqueueCallback: function(publicInstance, callback, callerName) {
        ReactUpdateQueue.validateCallback(callback, callerName);
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance);
        if (!internalInstance) {
          return null;
        }
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
        enqueueUpdate(internalInstance);
      },
      enqueueCallbackInternal: function(internalInstance, callback) {
        if (internalInstance._pendingCallbacks) {
          internalInstance._pendingCallbacks.push(callback);
        } else {
          internalInstance._pendingCallbacks = [callback];
        }
        enqueueUpdate(internalInstance);
      },
      enqueueForceUpdate: function(publicInstance) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'forceUpdate');
        if (!internalInstance) {
          return;
        }
        internalInstance._pendingForceUpdate = true;
        enqueueUpdate(internalInstance);
      },
      enqueueReplaceState: function(publicInstance, completeState) {
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'replaceState');
        if (!internalInstance) {
          return;
        }
        internalInstance._pendingStateQueue = [completeState];
        internalInstance._pendingReplaceState = true;
        enqueueUpdate(internalInstance);
      },
      enqueueSetState: function(publicInstance, partialState) {
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onSetState();
          "production" !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
        }
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
        if (!internalInstance) {
          return;
        }
        var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
        queue.push(partialState);
        enqueueUpdate(internalInstance);
      },
      enqueueElementInternal: function(internalInstance, nextElement, nextContext) {
        internalInstance._pendingElement = nextElement;
        internalInstance._context = nextContext;
        enqueueUpdate(internalInstance);
      },
      validateCallback: function(callback, callerName) {
        !(!callback || typeof callback === 'function') ? "production" !== 'production' ? invariant(false, '%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.', callerName, formatUnexpectedArgument(callback)) : _prodInvariant('122', callerName, formatUnexpectedArgument(callback)) : void 0;
      }
    };
    module.exports = ReactUpdateQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/CallbackQueue.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function CallbackQueue() {
      this._callbacks = null;
      this._contexts = null;
    }
    _assign(CallbackQueue.prototype, {
      enqueue: function(callback, context) {
        this._callbacks = this._callbacks || [];
        this._contexts = this._contexts || [];
        this._callbacks.push(callback);
        this._contexts.push(context);
      },
      notifyAll: function() {
        var callbacks = this._callbacks;
        var contexts = this._contexts;
        if (callbacks) {
          !(callbacks.length === contexts.length) ? "production" !== 'production' ? invariant(false, 'Mismatched list of contexts in callback queue') : _prodInvariant('24') : void 0;
          this._callbacks = null;
          this._contexts = null;
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i].call(contexts[i]);
          }
          callbacks.length = 0;
          contexts.length = 0;
        }
      },
      checkpoint: function() {
        return this._callbacks ? this._callbacks.length : 0;
      },
      rollback: function(len) {
        if (this._callbacks) {
          this._callbacks.length = len;
          this._contexts.length = len;
        }
      },
      reset: function() {
        this._callbacks = null;
        this._contexts = null;
      },
      destructor: function() {
        this.reset();
      }
    });
    PooledClass.addPoolingTo(CallbackQueue);
    module.exports = CallbackQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactFeatureFlags.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactFeatureFlags = {logTopLevelRenders: false};
  module.exports = ReactFeatureFlags;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/Transaction.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var Mixin = {
      reinitializeTransaction: function() {
        this.transactionWrappers = this.getTransactionWrappers();
        if (this.wrapperInitData) {
          this.wrapperInitData.length = 0;
        } else {
          this.wrapperInitData = [];
        }
        this._isInTransaction = false;
      },
      _isInTransaction: false,
      getTransactionWrappers: null,
      isInTransaction: function() {
        return !!this._isInTransaction;
      },
      perform: function(method, scope, a, b, c, d, e, f) {
        !!this.isInTransaction() ? "production" !== 'production' ? invariant(false, 'Transaction.perform(...): Cannot initialize a transaction when there is already an outstanding transaction.') : _prodInvariant('27') : void 0;
        var errorThrown;
        var ret;
        try {
          this._isInTransaction = true;
          errorThrown = true;
          this.initializeAll(0);
          ret = method.call(scope, a, b, c, d, e, f);
          errorThrown = false;
        } finally {
          try {
            if (errorThrown) {
              try {
                this.closeAll(0);
              } catch (err) {}
            } else {
              this.closeAll(0);
            }
          } finally {
            this._isInTransaction = false;
          }
        }
        return ret;
      },
      initializeAll: function(startIndex) {
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          try {
            this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
            this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
          } finally {
            if (this.wrapperInitData[i] === Transaction.OBSERVED_ERROR) {
              try {
                this.initializeAll(i + 1);
              } catch (err) {}
            }
          }
        }
      },
      closeAll: function(startIndex) {
        !this.isInTransaction() ? "production" !== 'production' ? invariant(false, 'Transaction.closeAll(): Cannot close transaction when none are open.') : _prodInvariant('28') : void 0;
        var transactionWrappers = this.transactionWrappers;
        for (var i = startIndex; i < transactionWrappers.length; i++) {
          var wrapper = transactionWrappers[i];
          var initData = this.wrapperInitData[i];
          var errorThrown;
          try {
            errorThrown = true;
            if (initData !== Transaction.OBSERVED_ERROR && wrapper.close) {
              wrapper.close.call(this, initData);
            }
            errorThrown = false;
          } finally {
            if (errorThrown) {
              try {
                this.closeAll(i + 1);
              } catch (e) {}
            }
          }
        }
        this.wrapperInitData.length = 0;
      }
    };
    var Transaction = {
      Mixin: Mixin,
      OBSERVED_ERROR: {}
    };
    module.exports = Transaction;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactUpdates.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/CallbackQueue.js", "npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/ReactFeatureFlags.js", "npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/Transaction.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var CallbackQueue = $__require('npm:react@15.2.1/lib/CallbackQueue.js');
    var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
    var ReactFeatureFlags = $__require('npm:react@15.2.1/lib/ReactFeatureFlags.js');
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var Transaction = $__require('npm:react@15.2.1/lib/Transaction.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var dirtyComponents = [];
    var updateBatchNumber = 0;
    var asapCallbackQueue = CallbackQueue.getPooled();
    var asapEnqueued = false;
    var batchingStrategy = null;
    function ensureInjected() {
      !(ReactUpdates.ReactReconcileTransaction && batchingStrategy) ? "production" !== 'production' ? invariant(false, 'ReactUpdates: must inject a reconcile transaction class and batching strategy') : _prodInvariant('123') : void 0;
    }
    var NESTED_UPDATES = {
      initialize: function() {
        this.dirtyComponentsLength = dirtyComponents.length;
      },
      close: function() {
        if (this.dirtyComponentsLength !== dirtyComponents.length) {
          dirtyComponents.splice(0, this.dirtyComponentsLength);
          flushBatchedUpdates();
        } else {
          dirtyComponents.length = 0;
        }
      }
    };
    var UPDATE_QUEUEING = {
      initialize: function() {
        this.callbackQueue.reset();
      },
      close: function() {
        this.callbackQueue.notifyAll();
      }
    };
    var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];
    function ReactUpdatesFlushTransaction() {
      this.reinitializeTransaction();
      this.dirtyComponentsLength = null;
      this.callbackQueue = CallbackQueue.getPooled();
      this.reconcileTransaction = ReactUpdates.ReactReconcileTransaction.getPooled(true);
    }
    _assign(ReactUpdatesFlushTransaction.prototype, Transaction.Mixin, {
      getTransactionWrappers: function() {
        return TRANSACTION_WRAPPERS;
      },
      destructor: function() {
        this.dirtyComponentsLength = null;
        CallbackQueue.release(this.callbackQueue);
        this.callbackQueue = null;
        ReactUpdates.ReactReconcileTransaction.release(this.reconcileTransaction);
        this.reconcileTransaction = null;
      },
      perform: function(method, scope, a) {
        return Transaction.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, method, scope, a);
      }
    });
    PooledClass.addPoolingTo(ReactUpdatesFlushTransaction);
    function batchedUpdates(callback, a, b, c, d, e) {
      ensureInjected();
      batchingStrategy.batchedUpdates(callback, a, b, c, d, e);
    }
    function mountOrderComparator(c1, c2) {
      return c1._mountOrder - c2._mountOrder;
    }
    function runBatchedUpdates(transaction) {
      var len = transaction.dirtyComponentsLength;
      !(len === dirtyComponents.length) ? "production" !== 'production' ? invariant(false, 'Expected flush transaction\'s stored dirty-components length (%s) to match dirty-components array length (%s).', len, dirtyComponents.length) : _prodInvariant('124', len, dirtyComponents.length) : void 0;
      dirtyComponents.sort(mountOrderComparator);
      updateBatchNumber++;
      for (var i = 0; i < len; i++) {
        var component = dirtyComponents[i];
        var callbacks = component._pendingCallbacks;
        component._pendingCallbacks = null;
        var markerName;
        if (ReactFeatureFlags.logTopLevelRenders) {
          var namedComponent = component;
          if (component._currentElement.props === component._renderedComponent._currentElement) {
            namedComponent = component._renderedComponent;
          }
          markerName = 'React update: ' + namedComponent.getName();
          console.time(markerName);
        }
        ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction, updateBatchNumber);
        if (markerName) {
          console.timeEnd(markerName);
        }
        if (callbacks) {
          for (var j = 0; j < callbacks.length; j++) {
            transaction.callbackQueue.enqueue(callbacks[j], component.getPublicInstance());
          }
        }
      }
    }
    var flushBatchedUpdates = function() {
      while (dirtyComponents.length || asapEnqueued) {
        if (dirtyComponents.length) {
          var transaction = ReactUpdatesFlushTransaction.getPooled();
          transaction.perform(runBatchedUpdates, null, transaction);
          ReactUpdatesFlushTransaction.release(transaction);
        }
        if (asapEnqueued) {
          asapEnqueued = false;
          var queue = asapCallbackQueue;
          asapCallbackQueue = CallbackQueue.getPooled();
          queue.notifyAll();
          CallbackQueue.release(queue);
        }
      }
    };
    function enqueueUpdate(component) {
      ensureInjected();
      if (!batchingStrategy.isBatchingUpdates) {
        batchingStrategy.batchedUpdates(enqueueUpdate, component);
        return;
      }
      dirtyComponents.push(component);
      if (component._updateBatchNumber == null) {
        component._updateBatchNumber = updateBatchNumber + 1;
      }
    }
    function asap(callback, context) {
      !batchingStrategy.isBatchingUpdates ? "production" !== 'production' ? invariant(false, 'ReactUpdates.asap: Can\'t enqueue an asap callback in a context whereupdates are not being batched.') : _prodInvariant('125') : void 0;
      asapCallbackQueue.enqueue(callback, context);
      asapEnqueued = true;
    }
    var ReactUpdatesInjection = {
      injectReconcileTransaction: function(ReconcileTransaction) {
        !ReconcileTransaction ? "production" !== 'production' ? invariant(false, 'ReactUpdates: must provide a reconcile transaction class') : _prodInvariant('126') : void 0;
        ReactUpdates.ReactReconcileTransaction = ReconcileTransaction;
      },
      injectBatchingStrategy: function(_batchingStrategy) {
        !_batchingStrategy ? "production" !== 'production' ? invariant(false, 'ReactUpdates: must provide a batching strategy') : _prodInvariant('127') : void 0;
        !(typeof _batchingStrategy.batchedUpdates === 'function') ? "production" !== 'production' ? invariant(false, 'ReactUpdates: must provide a batchedUpdates() function') : _prodInvariant('128') : void 0;
        !(typeof _batchingStrategy.isBatchingUpdates === 'boolean') ? "production" !== 'production' ? invariant(false, 'ReactUpdates: must provide an isBatchingUpdates boolean attribute') : _prodInvariant('129') : void 0;
        batchingStrategy = _batchingStrategy;
      }
    };
    var ReactUpdates = {
      ReactReconcileTransaction: null,
      batchedUpdates: batchedUpdates,
      enqueueUpdate: enqueueUpdate,
      flushBatchedUpdates: flushBatchedUpdates,
      injection: ReactUpdatesInjection,
      asap: asap
    };
    module.exports = ReactUpdates;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactComponentEnvironment.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var injected = false;
    var ReactComponentEnvironment = {
      unmountIDFromEnvironment: null,
      replaceNodeWithMarkup: null,
      processChildrenUpdates: null,
      injection: {injectEnvironment: function(environment) {
          !!injected ? "production" !== 'production' ? invariant(false, 'ReactCompositeComponent: injectEnvironment() can only be called once.') : _prodInvariant('104') : void 0;
          ReactComponentEnvironment.unmountIDFromEnvironment = environment.unmountIDFromEnvironment;
          ReactComponentEnvironment.replaceNodeWithMarkup = environment.replaceNodeWithMarkup;
          ReactComponentEnvironment.processChildrenUpdates = environment.processChildrenUpdates;
          injected = true;
        }}
    };
    module.exports = ReactComponentEnvironment;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactErrorUtils.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var caughtError = null;
    function invokeGuardedCallback(name, func, a, b) {
      try {
        return func(a, b);
      } catch (x) {
        if (caughtError === null) {
          caughtError = x;
        }
        return undefined;
      }
    }
    var ReactErrorUtils = {
      invokeGuardedCallback: invokeGuardedCallback,
      invokeGuardedCallbackWithCatch: invokeGuardedCallback,
      rethrowCaughtError: function() {
        if (caughtError) {
          var error = caughtError;
          caughtError = null;
          throw error;
        }
      }
    };
    if ("production" !== 'production') {
      if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
        var fakeNode = document.createElement('react');
        ReactErrorUtils.invokeGuardedCallback = function(name, func, a, b) {
          var boundFunc = func.bind(null, a, b);
          var evtType = 'react-' + name;
          fakeNode.addEventListener(evtType, boundFunc, false);
          var evt = document.createEvent('Event');
          evt.initEvent(evtType, false, false);
          fakeNode.dispatchEvent(evt);
          fakeNode.removeEventListener(evtType, boundFunc, false);
        };
      }
    }
    module.exports = ReactErrorUtils;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactInstanceMap.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactInstanceMap = {
    remove: function(key) {
      key._reactInternalInstance = undefined;
    },
    get: function(key) {
      return key._reactInternalInstance;
    },
    has: function(key) {
      return key._reactInternalInstance !== undefined;
    },
    set: function(key, value) {
      key._reactInternalInstance = value;
    }
  };
  module.exports = ReactInstanceMap;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactNodeTypes.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var ReactNodeTypes = {
      HOST: 0,
      COMPOSITE: 1,
      EMPTY: 2,
      getType: function(node) {
        if (node === null || node === false) {
          return ReactNodeTypes.EMPTY;
        } else if (ReactElement.isValidElement(node)) {
          if (typeof node.type === 'function') {
            return ReactNodeTypes.COMPOSITE;
          } else {
            return ReactNodeTypes.HOST;
          }
        }
        !false ? "production" !== 'production' ? invariant(false, 'Unexpected node: %s', node) : _prodInvariant('26', node) : void 0;
      }
    };
    module.exports = ReactNodeTypes;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactOwner.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var ReactOwner = {
      isValidOwner: function(object) {
        return !!(object && typeof object.attachRef === 'function' && typeof object.detachRef === 'function');
      },
      addComponentAsRefTo: function(component, ref, owner) {
        !ReactOwner.isValidOwner(owner) ? "production" !== 'production' ? invariant(false, 'addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('119') : void 0;
        owner.attachRef(ref, component);
      },
      removeComponentAsRefFrom: function(component, ref, owner) {
        !ReactOwner.isValidOwner(owner) ? "production" !== 'production' ? invariant(false, 'removeComponentAsRefFrom(...): Only a ReactOwner can have refs. You might be removing a ref to a component that was not created inside a component\'s `render` method, or you have multiple copies of React loaded (details: https://fb.me/react-refs-must-have-owner).') : _prodInvariant('120') : void 0;
        var ownerPublicInstance = owner.getPublicInstance();
        if (ownerPublicInstance && ownerPublicInstance.refs[ref] === component.getPublicInstance()) {
          owner.detachRef(ref);
        }
      }
    };
    module.exports = ReactOwner;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactRef.js", ["npm:react@15.2.1/lib/ReactOwner.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactOwner = $__require('npm:react@15.2.1/lib/ReactOwner.js');
    var ReactRef = {};
    function attachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(component.getPublicInstance());
      } else {
        ReactOwner.addComponentAsRefTo(component, ref, owner);
      }
    }
    function detachRef(ref, component, owner) {
      if (typeof ref === 'function') {
        ref(null);
      } else {
        ReactOwner.removeComponentAsRefFrom(component, ref, owner);
      }
    }
    ReactRef.attachRefs = function(instance, element) {
      if (element === null || element === false) {
        return;
      }
      var ref = element.ref;
      if (ref != null) {
        attachRef(ref, instance, element._owner);
      }
    };
    ReactRef.shouldUpdateRefs = function(prevElement, nextElement) {
      var prevEmpty = prevElement === null || prevElement === false;
      var nextEmpty = nextElement === null || nextElement === false;
      return (prevEmpty || nextEmpty || nextElement._owner !== prevElement._owner || nextElement.ref !== prevElement.ref);
    };
    ReactRef.detachRefs = function(instance, element) {
      if (element === null || element === false) {
        return;
      }
      var ref = element.ref;
      if (ref != null) {
        detachRef(ref, instance, element._owner);
      }
    };
    module.exports = ReactRef;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactReconciler.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactRef.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactRef = $__require('npm:react@15.2.1/lib/ReactRef.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function attachRefs() {
      ReactRef.attachRefs(this, this._currentElement);
    }
    var ReactReconciler = {
      mountComponent: function(internalInstance, transaction, hostParent, hostContainerInfo, context) {
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onBeforeMountComponent(internalInstance._debugID, internalInstance._currentElement);
            ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID, 'mountComponent');
          }
        }
        var markup = internalInstance.mountComponent(transaction, hostParent, hostContainerInfo, context);
        if (internalInstance._currentElement && internalInstance._currentElement.ref != null) {
          transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
        }
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID, 'mountComponent');
            ReactInstrumentation.debugTool.onMountComponent(internalInstance._debugID);
          }
        }
        return markup;
      },
      getHostNode: function(internalInstance) {
        return internalInstance.getHostNode();
      },
      unmountComponent: function(internalInstance, safely) {
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID, 'unmountComponent');
          }
        }
        ReactRef.detachRefs(internalInstance, internalInstance._currentElement);
        internalInstance.unmountComponent(safely);
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID, 'unmountComponent');
            ReactInstrumentation.debugTool.onUnmountComponent(internalInstance._debugID);
          }
        }
      },
      receiveComponent: function(internalInstance, nextElement, transaction, context) {
        var prevElement = internalInstance._currentElement;
        if (nextElement === prevElement && context === internalInstance._context) {
          return;
        }
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, nextElement);
            ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID, 'receiveComponent');
          }
        }
        var refsChanged = ReactRef.shouldUpdateRefs(prevElement, nextElement);
        if (refsChanged) {
          ReactRef.detachRefs(internalInstance, prevElement);
        }
        internalInstance.receiveComponent(nextElement, transaction, context);
        if (refsChanged && internalInstance._currentElement && internalInstance._currentElement.ref != null) {
          transaction.getReactMountReady().enqueue(attachRefs, internalInstance);
        }
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID, 'receiveComponent');
            ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
          }
        }
      },
      performUpdateIfNecessary: function(internalInstance, transaction, updateBatchNumber) {
        if (internalInstance._updateBatchNumber !== updateBatchNumber) {
          !(internalInstance._updateBatchNumber == null || internalInstance._updateBatchNumber === updateBatchNumber + 1) ? "production" !== 'production' ? invariant(false, 'performUpdateIfNecessary: Unexpected batch number (current %s, pending %s)', updateBatchNumber, internalInstance._updateBatchNumber) : _prodInvariant('121', updateBatchNumber, internalInstance._updateBatchNumber) : void 0;
          return;
        }
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onBeginReconcilerTimer(internalInstance._debugID, 'performUpdateIfNecessary');
            ReactInstrumentation.debugTool.onBeforeUpdateComponent(internalInstance._debugID, internalInstance._currentElement);
          }
        }
        internalInstance.performUpdateIfNecessary(transaction);
        if ("production" !== 'production') {
          if (internalInstance._debugID !== 0) {
            ReactInstrumentation.debugTool.onEndReconcilerTimer(internalInstance._debugID, 'performUpdateIfNecessary');
            ReactInstrumentation.debugTool.onUpdateComponent(internalInstance._debugID);
          }
        }
      }
    };
    module.exports = ReactReconciler;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactCompositeComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactComponentEnvironment.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactErrorUtils.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactNodeTypes.js", "npm:react@15.2.1/lib/ReactPropTypeLocations.js", "npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/checkReactTypeSpec.js", "npm:fbjs@0.8.3/lib/emptyObject.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:react@15.2.1/lib/shouldUpdateReactComponent.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactComponentEnvironment = $__require('npm:react@15.2.1/lib/ReactComponentEnvironment.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var ReactErrorUtils = $__require('npm:react@15.2.1/lib/ReactErrorUtils.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactNodeTypes = $__require('npm:react@15.2.1/lib/ReactNodeTypes.js');
    var ReactPropTypeLocations = $__require('npm:react@15.2.1/lib/ReactPropTypeLocations.js');
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var checkReactTypeSpec = $__require('npm:react@15.2.1/lib/checkReactTypeSpec.js');
    var emptyObject = $__require('npm:fbjs@0.8.3/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var shouldUpdateReactComponent = $__require('npm:react@15.2.1/lib/shouldUpdateReactComponent.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function StatelessComponent(Component) {}
    StatelessComponent.prototype.render = function() {
      var Component = ReactInstanceMap.get(this)._currentElement.type;
      var element = Component(this.props, this.context, this.updater);
      warnIfInvalidElement(Component, element);
      return element;
    };
    function warnIfInvalidElement(Component, element) {
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(element === null || element === false || ReactElement.isValidElement(element), '%s(...): A valid React element (or null) must be returned. You may have ' + 'returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : void 0;
        "production" !== 'production' ? warning(!Component.childContextTypes, '%s(...): childContextTypes cannot be defined on a functional component.', Component.displayName || Component.name || 'Component') : void 0;
      }
    }
    function invokeComponentDidMountWithTimer() {
      var publicInstance = this._instance;
      if (this._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentDidMount');
      }
      publicInstance.componentDidMount();
      if (this._debugID !== 0) {
        ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentDidMount');
      }
    }
    function invokeComponentDidUpdateWithTimer(prevProps, prevState, prevContext) {
      var publicInstance = this._instance;
      if (this._debugID !== 0) {
        ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentDidUpdate');
      }
      publicInstance.componentDidUpdate(prevProps, prevState, prevContext);
      if (this._debugID !== 0) {
        ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentDidUpdate');
      }
    }
    function shouldConstruct(Component) {
      return Component.prototype && Component.prototype.isReactComponent;
    }
    var nextMountID = 1;
    var ReactCompositeComponentMixin = {
      construct: function(element) {
        this._currentElement = element;
        this._rootNodeID = null;
        this._instance = null;
        this._hostParent = null;
        this._hostContainerInfo = null;
        this._updateBatchNumber = null;
        this._pendingElement = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        this._renderedNodeType = null;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._topLevelWrapper = null;
        this._pendingCallbacks = null;
        this._calledComponentWillUnmount = false;
        if ("production" !== 'production') {
          this._warnedAboutRefsInRender = false;
        }
      },
      mountComponent: function(transaction, hostParent, hostContainerInfo, context) {
        this._context = context;
        this._mountOrder = nextMountID++;
        this._hostParent = hostParent;
        this._hostContainerInfo = hostContainerInfo;
        var publicProps = this._currentElement.props;
        var publicContext = this._processContext(context);
        var Component = this._currentElement.type;
        var updateQueue = transaction.getUpdateQueue();
        var inst = this._constructComponent(publicProps, publicContext, updateQueue);
        var renderedElement;
        if (!shouldConstruct(Component) && (inst == null || inst.render == null)) {
          renderedElement = inst;
          warnIfInvalidElement(Component, renderedElement);
          !(inst === null || inst === false || ReactElement.isValidElement(inst)) ? "production" !== 'production' ? invariant(false, '%s(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', Component.displayName || Component.name || 'Component') : _prodInvariant('105', Component.displayName || Component.name || 'Component') : void 0;
          inst = new StatelessComponent(Component);
        }
        if ("production" !== 'production') {
          if (inst.render == null) {
            "production" !== 'production' ? warning(false, '%s(...): No `render` method found on the returned component ' + 'instance: you may have forgotten to define `render`.', Component.displayName || Component.name || 'Component') : void 0;
          }
          var propsMutated = inst.props !== publicProps;
          var componentName = Component.displayName || Component.name || 'Component';
          "production" !== 'production' ? warning(inst.props === undefined || !propsMutated, '%s(...): When calling super() in `%s`, make sure to pass ' + 'up the same props that your component\'s constructor was passed.', componentName, componentName) : void 0;
        }
        inst.props = publicProps;
        inst.context = publicContext;
        inst.refs = emptyObject;
        inst.updater = updateQueue;
        this._instance = inst;
        ReactInstanceMap.set(inst, this);
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(!inst.getInitialState || inst.getInitialState.isReactClassApproved, 'getInitialState was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Did you mean to define a state property instead?', this.getName() || 'a component') : void 0;
          "production" !== 'production' ? warning(!inst.getDefaultProps || inst.getDefaultProps.isReactClassApproved, 'getDefaultProps was defined on %s, a plain JavaScript class. ' + 'This is only supported for classes created using React.createClass. ' + 'Use a static property to define defaultProps instead.', this.getName() || 'a component') : void 0;
          "production" !== 'production' ? warning(!inst.propTypes, 'propTypes was defined as an instance property on %s. Use a static ' + 'property to define propTypes instead.', this.getName() || 'a component') : void 0;
          "production" !== 'production' ? warning(!inst.contextTypes, 'contextTypes was defined as an instance property on %s. Use a ' + 'static property to define contextTypes instead.', this.getName() || 'a component') : void 0;
          "production" !== 'production' ? warning(typeof inst.componentShouldUpdate !== 'function', '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', this.getName() || 'A component') : void 0;
          "production" !== 'production' ? warning(typeof inst.componentDidUnmount !== 'function', '%s has a method called ' + 'componentDidUnmount(). But there is no such lifecycle method. ' + 'Did you mean componentWillUnmount()?', this.getName() || 'A component') : void 0;
          "production" !== 'production' ? warning(typeof inst.componentWillRecieveProps !== 'function', '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', this.getName() || 'A component') : void 0;
        }
        var initialState = inst.state;
        if (initialState === undefined) {
          inst.state = initialState = null;
        }
        !(typeof initialState === 'object' && !Array.isArray(initialState)) ? "production" !== 'production' ? invariant(false, '%s.state: must be set to an object or null', this.getName() || 'ReactCompositeComponent') : _prodInvariant('106', this.getName() || 'ReactCompositeComponent') : void 0;
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        var markup;
        if (inst.unstable_handleError) {
          markup = this.performInitialMountWithErrorHandling(renderedElement, hostParent, hostContainerInfo, transaction, context);
        } else {
          markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
        }
        if (inst.componentDidMount) {
          if ("production" !== 'production') {
            transaction.getReactMountReady().enqueue(invokeComponentDidMountWithTimer, this);
          } else {
            transaction.getReactMountReady().enqueue(inst.componentDidMount, inst);
          }
        }
        return markup;
      },
      _constructComponent: function(publicProps, publicContext, updateQueue) {
        if ("production" !== 'production') {
          ReactCurrentOwner.current = this;
          try {
            return this._constructComponentWithoutOwner(publicProps, publicContext, updateQueue);
          } finally {
            ReactCurrentOwner.current = null;
          }
        } else {
          return this._constructComponentWithoutOwner(publicProps, publicContext, updateQueue);
        }
      },
      _constructComponentWithoutOwner: function(publicProps, publicContext, updateQueue) {
        var Component = this._currentElement.type;
        var instanceOrElement;
        if (shouldConstruct(Component)) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'ctor');
            }
          }
          instanceOrElement = new Component(publicProps, publicContext, updateQueue);
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'ctor');
            }
          }
        } else {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'render');
            }
          }
          instanceOrElement = Component(publicProps, publicContext, updateQueue);
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'render');
            }
          }
        }
        return instanceOrElement;
      },
      performInitialMountWithErrorHandling: function(renderedElement, hostParent, hostContainerInfo, transaction, context) {
        var markup;
        var checkpoint = transaction.checkpoint();
        try {
          markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
        } catch (e) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onError();
            }
          }
          transaction.rollback(checkpoint);
          this._instance.unstable_handleError(e);
          if (this._pendingStateQueue) {
            this._instance.state = this._processPendingState(this._instance.props, this._instance.context);
          }
          checkpoint = transaction.checkpoint();
          this._renderedComponent.unmountComponent(true);
          transaction.rollback(checkpoint);
          markup = this.performInitialMount(renderedElement, hostParent, hostContainerInfo, transaction, context);
        }
        return markup;
      },
      performInitialMount: function(renderedElement, hostParent, hostContainerInfo, transaction, context) {
        var inst = this._instance;
        if (inst.componentWillMount) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentWillMount');
            }
          }
          inst.componentWillMount();
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentWillMount');
            }
          }
          if (this._pendingStateQueue) {
            inst.state = this._processPendingState(inst.props, inst.context);
          }
        }
        if (renderedElement === undefined) {
          renderedElement = this._renderValidatedComponent();
        }
        var nodeType = ReactNodeTypes.getType(renderedElement);
        this._renderedNodeType = nodeType;
        var child = this._instantiateReactComponent(renderedElement, nodeType !== ReactNodeTypes.EMPTY);
        this._renderedComponent = child;
        if ("production" !== 'production') {
          if (child._debugID !== 0 && this._debugID !== 0) {
            ReactInstrumentation.debugTool.onSetParent(child._debugID, this._debugID);
          }
        }
        var markup = ReactReconciler.mountComponent(child, transaction, hostParent, hostContainerInfo, this._processChildContext(context));
        if ("production" !== 'production') {
          if (this._debugID !== 0) {
            ReactInstrumentation.debugTool.onSetChildren(this._debugID, child._debugID !== 0 ? [child._debugID] : []);
          }
        }
        return markup;
      },
      getHostNode: function() {
        return ReactReconciler.getHostNode(this._renderedComponent);
      },
      unmountComponent: function(safely) {
        if (!this._renderedComponent) {
          return;
        }
        var inst = this._instance;
        if (inst.componentWillUnmount && !inst._calledComponentWillUnmount) {
          inst._calledComponentWillUnmount = true;
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentWillUnmount');
            }
          }
          if (safely) {
            var name = this.getName() + '.componentWillUnmount()';
            ReactErrorUtils.invokeGuardedCallback(name, inst.componentWillUnmount.bind(inst));
          } else {
            inst.componentWillUnmount();
          }
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentWillUnmount');
            }
          }
        }
        if (this._renderedComponent) {
          ReactReconciler.unmountComponent(this._renderedComponent, safely);
          this._renderedNodeType = null;
          this._renderedComponent = null;
          this._instance = null;
        }
        this._pendingStateQueue = null;
        this._pendingReplaceState = false;
        this._pendingForceUpdate = false;
        this._pendingCallbacks = null;
        this._pendingElement = null;
        this._context = null;
        this._rootNodeID = null;
        this._topLevelWrapper = null;
        ReactInstanceMap.remove(inst);
      },
      _maskContext: function(context) {
        var Component = this._currentElement.type;
        var contextTypes = Component.contextTypes;
        if (!contextTypes) {
          return emptyObject;
        }
        var maskedContext = {};
        for (var contextName in contextTypes) {
          maskedContext[contextName] = context[contextName];
        }
        return maskedContext;
      },
      _processContext: function(context) {
        var maskedContext = this._maskContext(context);
        if ("production" !== 'production') {
          var Component = this._currentElement.type;
          if (Component.contextTypes) {
            this._checkContextTypes(Component.contextTypes, maskedContext, ReactPropTypeLocations.context);
          }
        }
        return maskedContext;
      },
      _processChildContext: function(currentContext) {
        var Component = this._currentElement.type;
        var inst = this._instance;
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onBeginProcessingChildContext();
        }
        var childContext = inst.getChildContext && inst.getChildContext();
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onEndProcessingChildContext();
        }
        if (childContext) {
          !(typeof Component.childContextTypes === 'object') ? "production" !== 'production' ? invariant(false, '%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().', this.getName() || 'ReactCompositeComponent') : _prodInvariant('107', this.getName() || 'ReactCompositeComponent') : void 0;
          if ("production" !== 'production') {
            this._checkContextTypes(Component.childContextTypes, childContext, ReactPropTypeLocations.childContext);
          }
          for (var name in childContext) {
            !(name in Component.childContextTypes) ? "production" !== 'production' ? invariant(false, '%s.getChildContext(): key "%s" is not defined in childContextTypes.', this.getName() || 'ReactCompositeComponent', name) : _prodInvariant('108', this.getName() || 'ReactCompositeComponent', name) : void 0;
          }
          return _assign({}, currentContext, childContext);
        }
        return currentContext;
      },
      _checkContextTypes: function(typeSpecs, values, location) {
        checkReactTypeSpec(typeSpecs, values, location, this.getName(), null, this._debugID);
      },
      receiveComponent: function(nextElement, transaction, nextContext) {
        var prevElement = this._currentElement;
        var prevContext = this._context;
        this._pendingElement = null;
        this.updateComponent(transaction, prevElement, nextElement, prevContext, nextContext);
      },
      performUpdateIfNecessary: function(transaction) {
        if (this._pendingElement != null) {
          ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
        } else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
          this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
        } else {
          this._updateBatchNumber = null;
        }
      },
      updateComponent: function(transaction, prevParentElement, nextParentElement, prevUnmaskedContext, nextUnmaskedContext) {
        var inst = this._instance;
        !(inst != null) ? "production" !== 'production' ? invariant(false, 'Attempted to update component `%s` that has already been unmounted (or failed to mount).', this.getName() || 'ReactCompositeComponent') : _prodInvariant('136', this.getName() || 'ReactCompositeComponent') : void 0;
        var willReceive = false;
        var nextContext;
        var nextProps;
        if (this._context === nextUnmaskedContext) {
          nextContext = inst.context;
        } else {
          nextContext = this._processContext(nextUnmaskedContext);
          willReceive = true;
        }
        nextProps = nextParentElement.props;
        if (prevParentElement !== nextParentElement) {
          willReceive = true;
        }
        if (willReceive && inst.componentWillReceiveProps) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentWillReceiveProps');
            }
          }
          inst.componentWillReceiveProps(nextProps, nextContext);
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentWillReceiveProps');
            }
          }
        }
        var nextState = this._processPendingState(nextProps, nextContext);
        var shouldUpdate = true;
        if (!this._pendingForceUpdate && inst.shouldComponentUpdate) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'shouldComponentUpdate');
            }
          }
          shouldUpdate = inst.shouldComponentUpdate(nextProps, nextState, nextContext);
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'shouldComponentUpdate');
            }
          }
        }
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(shouldUpdate !== undefined, '%s.shouldComponentUpdate(): Returned undefined instead of a ' + 'boolean value. Make sure to return true or false.', this.getName() || 'ReactCompositeComponent') : void 0;
        }
        this._updateBatchNumber = null;
        if (shouldUpdate) {
          this._pendingForceUpdate = false;
          this._performComponentUpdate(nextParentElement, nextProps, nextState, nextContext, transaction, nextUnmaskedContext);
        } else {
          this._currentElement = nextParentElement;
          this._context = nextUnmaskedContext;
          inst.props = nextProps;
          inst.state = nextState;
          inst.context = nextContext;
        }
      },
      _processPendingState: function(props, context) {
        var inst = this._instance;
        var queue = this._pendingStateQueue;
        var replace = this._pendingReplaceState;
        this._pendingReplaceState = false;
        this._pendingStateQueue = null;
        if (!queue) {
          return inst.state;
        }
        if (replace && queue.length === 1) {
          return queue[0];
        }
        var nextState = _assign({}, replace ? queue[0] : inst.state);
        for (var i = replace ? 1 : 0; i < queue.length; i++) {
          var partial = queue[i];
          _assign(nextState, typeof partial === 'function' ? partial.call(inst, nextState, props, context) : partial);
        }
        return nextState;
      },
      _performComponentUpdate: function(nextElement, nextProps, nextState, nextContext, transaction, unmaskedContext) {
        var inst = this._instance;
        var hasComponentDidUpdate = Boolean(inst.componentDidUpdate);
        var prevProps;
        var prevState;
        var prevContext;
        if (hasComponentDidUpdate) {
          prevProps = inst.props;
          prevState = inst.state;
          prevContext = inst.context;
        }
        if (inst.componentWillUpdate) {
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'componentWillUpdate');
            }
          }
          inst.componentWillUpdate(nextProps, nextState, nextContext);
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'componentWillUpdate');
            }
          }
        }
        this._currentElement = nextElement;
        this._context = unmaskedContext;
        inst.props = nextProps;
        inst.state = nextState;
        inst.context = nextContext;
        this._updateRenderedComponent(transaction, unmaskedContext);
        if (hasComponentDidUpdate) {
          if ("production" !== 'production') {
            transaction.getReactMountReady().enqueue(invokeComponentDidUpdateWithTimer.bind(this, prevProps, prevState, prevContext), this);
          } else {
            transaction.getReactMountReady().enqueue(inst.componentDidUpdate.bind(inst, prevProps, prevState, prevContext), inst);
          }
        }
      },
      _updateRenderedComponent: function(transaction, context) {
        var prevComponentInstance = this._renderedComponent;
        var prevRenderedElement = prevComponentInstance._currentElement;
        var nextRenderedElement = this._renderValidatedComponent();
        if (shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
          ReactReconciler.receiveComponent(prevComponentInstance, nextRenderedElement, transaction, this._processChildContext(context));
        } else {
          var oldHostNode = ReactReconciler.getHostNode(prevComponentInstance);
          ReactReconciler.unmountComponent(prevComponentInstance, false);
          var nodeType = ReactNodeTypes.getType(nextRenderedElement);
          this._renderedNodeType = nodeType;
          var child = this._instantiateReactComponent(nextRenderedElement, nodeType !== ReactNodeTypes.EMPTY);
          this._renderedComponent = child;
          if ("production" !== 'production') {
            if (child._debugID !== 0 && this._debugID !== 0) {
              ReactInstrumentation.debugTool.onSetParent(child._debugID, this._debugID);
            }
          }
          var nextMarkup = ReactReconciler.mountComponent(child, transaction, this._hostParent, this._hostContainerInfo, this._processChildContext(context));
          if ("production" !== 'production') {
            if (this._debugID !== 0) {
              ReactInstrumentation.debugTool.onSetChildren(this._debugID, child._debugID !== 0 ? [child._debugID] : []);
            }
          }
          this._replaceNodeWithMarkup(oldHostNode, nextMarkup, prevComponentInstance);
        }
      },
      _replaceNodeWithMarkup: function(oldHostNode, nextMarkup, prevInstance) {
        ReactComponentEnvironment.replaceNodeWithMarkup(oldHostNode, nextMarkup, prevInstance);
      },
      _renderValidatedComponentWithoutOwnerOrContext: function() {
        var inst = this._instance;
        if ("production" !== 'production') {
          if (this._debugID !== 0) {
            ReactInstrumentation.debugTool.onBeginLifeCycleTimer(this._debugID, 'render');
          }
        }
        var renderedComponent = inst.render();
        if ("production" !== 'production') {
          if (this._debugID !== 0) {
            ReactInstrumentation.debugTool.onEndLifeCycleTimer(this._debugID, 'render');
          }
        }
        if ("production" !== 'production') {
          if (renderedComponent === undefined && inst.render._isMockFunction) {
            renderedComponent = null;
          }
        }
        return renderedComponent;
      },
      _renderValidatedComponent: function() {
        var renderedComponent;
        ReactCurrentOwner.current = this;
        try {
          renderedComponent = this._renderValidatedComponentWithoutOwnerOrContext();
        } finally {
          ReactCurrentOwner.current = null;
        }
        !(renderedComponent === null || renderedComponent === false || ReactElement.isValidElement(renderedComponent)) ? "production" !== 'production' ? invariant(false, '%s.render(): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object.', this.getName() || 'ReactCompositeComponent') : _prodInvariant('109', this.getName() || 'ReactCompositeComponent') : void 0;
        return renderedComponent;
      },
      attachRef: function(ref, component) {
        var inst = this.getPublicInstance();
        !(inst != null) ? "production" !== 'production' ? invariant(false, 'Stateless function components cannot have refs.') : _prodInvariant('110') : void 0;
        var publicComponentInstance = component.getPublicInstance();
        if ("production" !== 'production') {
          var componentName = component && component.getName ? component.getName() : 'a component';
          "production" !== 'production' ? warning(publicComponentInstance != null, 'Stateless function components cannot be given refs ' + '(See ref "%s" in %s created by %s). ' + 'Attempts to access this ref will fail.', ref, componentName, this.getName()) : void 0;
        }
        var refs = inst.refs === emptyObject ? inst.refs = {} : inst.refs;
        refs[ref] = publicComponentInstance;
      },
      detachRef: function(ref) {
        var refs = this.getPublicInstance().refs;
        delete refs[ref];
      },
      getName: function() {
        var type = this._currentElement.type;
        var constructor = this._instance && this._instance.constructor;
        return type.displayName || constructor && constructor.displayName || type.name || constructor && constructor.name || null;
      },
      getPublicInstance: function() {
        var inst = this._instance;
        if (inst instanceof StatelessComponent) {
          return null;
        }
        return inst;
      },
      _instantiateReactComponent: null
    };
    var ReactCompositeComponent = {Mixin: ReactCompositeComponentMixin};
    module.exports = ReactCompositeComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactEmptyComponent.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var emptyComponentFactory;
  var ReactEmptyComponentInjection = {injectEmptyComponentFactory: function(factory) {
      emptyComponentFactory = factory;
    }};
  var ReactEmptyComponent = {create: function(instantiate) {
      return emptyComponentFactory(instantiate);
    }};
  ReactEmptyComponent.injection = ReactEmptyComponentInjection;
  module.exports = ReactEmptyComponent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactHostComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var genericComponentClass = null;
    var tagToComponentClass = {};
    var textComponentClass = null;
    var ReactHostComponentInjection = {
      injectGenericComponentClass: function(componentClass) {
        genericComponentClass = componentClass;
      },
      injectTextComponentClass: function(componentClass) {
        textComponentClass = componentClass;
      },
      injectComponentClasses: function(componentClasses) {
        _assign(tagToComponentClass, componentClasses);
      }
    };
    function createInternalComponent(element) {
      !genericComponentClass ? "production" !== 'production' ? invariant(false, 'There is no registered component for the tag %s', element.type) : _prodInvariant('111', element.type) : void 0;
      return new genericComponentClass(element);
    }
    function createInstanceForText(text) {
      return new textComponentClass(text);
    }
    function isTextComponent(component) {
      return component instanceof textComponentClass;
    }
    var ReactHostComponent = {
      createInternalComponent: createInternalComponent,
      createInstanceForText: createInstanceForText,
      isTextComponent: isTextComponent,
      injection: ReactHostComponentInjection
    };
    module.exports = ReactHostComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactInvalidSetStateWarningDevTool.js", ["npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    if ("production" !== 'production') {
      var processingChildContext = false;
      var warnInvalidSetState = function() {
        "production" !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
      };
    }
    var ReactInvalidSetStateWarningDevTool = {
      onBeginProcessingChildContext: function() {
        processingChildContext = true;
      },
      onEndProcessingChildContext: function() {
        processingChildContext = false;
      },
      onSetState: function() {
        warnInvalidSetState();
      }
    };
    module.exports = ReactInvalidSetStateWarningDevTool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactHostOperationHistoryDevtool.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var history = [];
  var ReactHostOperationHistoryDevtool = {
    onHostOperation: function(debugID, type, payload) {
      history.push({
        instanceID: debugID,
        type: type,
        payload: payload
      });
    },
    clearHistory: function() {
      if (ReactHostOperationHistoryDevtool._preventClearing) {
        return;
      }
      history = [];
    },
    getHistory: function() {
      return history;
    }
  };
  module.exports = ReactHostOperationHistoryDevtool;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/performance.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
  var performance;
  if (ExecutionEnvironment.canUseDOM) {
    performance = window.performance || window.msPerformance || window.webkitPerformance;
  }
  module.exports = performance || {};
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/performanceNow.js", ["npm:fbjs@0.8.3/lib/performance.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var performance = $__require('npm:fbjs@0.8.3/lib/performance.js');
  var performanceNow;
  if (performance.now) {
    performanceNow = function performanceNow() {
      return performance.now();
    };
  } else {
    performanceNow = function performanceNow() {
      return Date.now();
    };
  }
  module.exports = performanceNow;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDebugTool.js", ["npm:react@15.2.1/lib/ReactInvalidSetStateWarningDevTool.js", "npm:react@15.2.1/lib/ReactHostOperationHistoryDevtool.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:fbjs@0.8.3/lib/performanceNow.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactInvalidSetStateWarningDevTool = $__require('npm:react@15.2.1/lib/ReactInvalidSetStateWarningDevTool.js');
    var ReactHostOperationHistoryDevtool = $__require('npm:react@15.2.1/lib/ReactHostOperationHistoryDevtool.js');
    var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var performanceNow = $__require('npm:fbjs@0.8.3/lib/performanceNow.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var eventHandlers = [];
    var handlerDoesThrowForEvent = {};
    function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
      eventHandlers.forEach(function(handler) {
        try {
          if (handler[handlerFunctionName]) {
            handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
          }
        } catch (e) {
          "production" !== 'production' ? warning(handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e + '\n' + e.stack) : void 0;
          handlerDoesThrowForEvent[handlerFunctionName] = true;
        }
      });
    }
    var isProfiling = false;
    var flushHistory = [];
    var lifeCycleTimerStack = [];
    var currentFlushNesting = 0;
    var currentFlushMeasurements = null;
    var currentFlushStartTime = null;
    var currentTimerDebugID = null;
    var currentTimerStartTime = null;
    var currentTimerNestedFlushDuration = null;
    var currentTimerType = null;
    function clearHistory() {
      ReactComponentTreeDevtool.purgeUnmountedComponents();
      ReactHostOperationHistoryDevtool.clearHistory();
    }
    function getTreeSnapshot(registeredIDs) {
      return registeredIDs.reduce(function(tree, id) {
        var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
        var parentID = ReactComponentTreeDevtool.getParentID(id);
        tree[id] = {
          displayName: ReactComponentTreeDevtool.getDisplayName(id),
          text: ReactComponentTreeDevtool.getText(id),
          updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
          childIDs: ReactComponentTreeDevtool.getChildIDs(id),
          ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
          parentID: parentID
        };
        return tree;
      }, {});
    }
    function resetMeasurements() {
      var previousStartTime = currentFlushStartTime;
      var previousMeasurements = currentFlushMeasurements || [];
      var previousOperations = ReactHostOperationHistoryDevtool.getHistory();
      if (currentFlushNesting === 0) {
        currentFlushStartTime = null;
        currentFlushMeasurements = null;
        clearHistory();
        return;
      }
      if (previousMeasurements.length || previousOperations.length) {
        var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
        flushHistory.push({
          duration: performanceNow() - previousStartTime,
          measurements: previousMeasurements || [],
          operations: previousOperations || [],
          treeSnapshot: getTreeSnapshot(registeredIDs)
        });
      }
      clearHistory();
      currentFlushStartTime = performanceNow();
      currentFlushMeasurements = [];
    }
    function checkDebugID(debugID) {
      "production" !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
    }
    function beginLifeCycleTimer(debugID, timerType) {
      if (currentFlushNesting === 0) {
        return;
      }
      "production" !== 'production' ? warning(!currentTimerType, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
      currentTimerStartTime = performanceNow();
      currentTimerNestedFlushDuration = 0;
      currentTimerDebugID = debugID;
      currentTimerType = timerType;
    }
    function endLifeCycleTimer(debugID, timerType) {
      if (currentFlushNesting === 0) {
        return;
      }
      "production" !== 'production' ? warning(currentTimerType === timerType, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
      if (isProfiling) {
        currentFlushMeasurements.push({
          timerType: timerType,
          instanceID: debugID,
          duration: performanceNow() - currentTimerStartTime - currentTimerNestedFlushDuration
        });
      }
      currentTimerStartTime = null;
      currentTimerNestedFlushDuration = null;
      currentTimerDebugID = null;
      currentTimerType = null;
    }
    function pauseCurrentLifeCycleTimer() {
      var currentTimer = {
        startTime: currentTimerStartTime,
        nestedFlushStartTime: performanceNow(),
        debugID: currentTimerDebugID,
        timerType: currentTimerType
      };
      lifeCycleTimerStack.push(currentTimer);
      currentTimerStartTime = null;
      currentTimerNestedFlushDuration = null;
      currentTimerDebugID = null;
      currentTimerType = null;
    }
    function resumeCurrentLifeCycleTimer() {
      var _lifeCycleTimerStack$ = lifeCycleTimerStack.pop();
      var startTime = _lifeCycleTimerStack$.startTime;
      var nestedFlushStartTime = _lifeCycleTimerStack$.nestedFlushStartTime;
      var debugID = _lifeCycleTimerStack$.debugID;
      var timerType = _lifeCycleTimerStack$.timerType;
      var nestedFlushDuration = performanceNow() - nestedFlushStartTime;
      currentTimerStartTime = startTime;
      currentTimerNestedFlushDuration += nestedFlushDuration;
      currentTimerDebugID = debugID;
      currentTimerType = timerType;
    }
    var ReactDebugTool = {
      addDevtool: function(devtool) {
        eventHandlers.push(devtool);
      },
      removeDevtool: function(devtool) {
        for (var i = 0; i < eventHandlers.length; i++) {
          if (eventHandlers[i] === devtool) {
            eventHandlers.splice(i, 1);
            i--;
          }
        }
      },
      isProfiling: function() {
        return isProfiling;
      },
      beginProfiling: function() {
        if (isProfiling) {
          return;
        }
        isProfiling = true;
        flushHistory.length = 0;
        resetMeasurements();
        ReactDebugTool.addDevtool(ReactHostOperationHistoryDevtool);
      },
      endProfiling: function() {
        if (!isProfiling) {
          return;
        }
        isProfiling = false;
        resetMeasurements();
        ReactDebugTool.removeDevtool(ReactHostOperationHistoryDevtool);
      },
      getFlushHistory: function() {
        return flushHistory;
      },
      onBeginFlush: function() {
        currentFlushNesting++;
        resetMeasurements();
        pauseCurrentLifeCycleTimer();
        emitEvent('onBeginFlush');
      },
      onEndFlush: function() {
        resetMeasurements();
        currentFlushNesting--;
        resumeCurrentLifeCycleTimer();
        emitEvent('onEndFlush');
      },
      onBeginLifeCycleTimer: function(debugID, timerType) {
        checkDebugID(debugID);
        emitEvent('onBeginLifeCycleTimer', debugID, timerType);
        beginLifeCycleTimer(debugID, timerType);
      },
      onEndLifeCycleTimer: function(debugID, timerType) {
        checkDebugID(debugID);
        endLifeCycleTimer(debugID, timerType);
        emitEvent('onEndLifeCycleTimer', debugID, timerType);
      },
      onBeginReconcilerTimer: function(debugID, timerType) {
        checkDebugID(debugID);
        emitEvent('onBeginReconcilerTimer', debugID, timerType);
      },
      onEndReconcilerTimer: function(debugID, timerType) {
        checkDebugID(debugID);
        emitEvent('onEndReconcilerTimer', debugID, timerType);
      },
      onError: function(debugID) {
        if (currentTimerDebugID != null) {
          endLifeCycleTimer(currentTimerDebugID, currentTimerType);
        }
        emitEvent('onError', debugID);
      },
      onBeginProcessingChildContext: function() {
        emitEvent('onBeginProcessingChildContext');
      },
      onEndProcessingChildContext: function() {
        emitEvent('onEndProcessingChildContext');
      },
      onHostOperation: function(debugID, type, payload) {
        checkDebugID(debugID);
        emitEvent('onHostOperation', debugID, type, payload);
      },
      onSetState: function() {
        emitEvent('onSetState');
      },
      onSetDisplayName: function(debugID, displayName) {
        checkDebugID(debugID);
        emitEvent('onSetDisplayName', debugID, displayName);
      },
      onSetChildren: function(debugID, childDebugIDs) {
        checkDebugID(debugID);
        childDebugIDs.forEach(checkDebugID);
        emitEvent('onSetChildren', debugID, childDebugIDs);
      },
      onSetOwner: function(debugID, ownerDebugID) {
        checkDebugID(debugID);
        emitEvent('onSetOwner', debugID, ownerDebugID);
      },
      onSetParent: function(debugID, parentDebugID) {
        checkDebugID(debugID);
        emitEvent('onSetParent', debugID, parentDebugID);
      },
      onSetText: function(debugID, text) {
        checkDebugID(debugID);
        emitEvent('onSetText', debugID, text);
      },
      onMountRootComponent: function(debugID) {
        checkDebugID(debugID);
        emitEvent('onMountRootComponent', debugID);
      },
      onBeforeMountComponent: function(debugID, element) {
        checkDebugID(debugID);
        emitEvent('onBeforeMountComponent', debugID, element);
      },
      onMountComponent: function(debugID) {
        checkDebugID(debugID);
        emitEvent('onMountComponent', debugID);
      },
      onBeforeUpdateComponent: function(debugID, element) {
        checkDebugID(debugID);
        emitEvent('onBeforeUpdateComponent', debugID, element);
      },
      onUpdateComponent: function(debugID) {
        checkDebugID(debugID);
        emitEvent('onUpdateComponent', debugID);
      },
      onUnmountComponent: function(debugID) {
        checkDebugID(debugID);
        emitEvent('onUnmountComponent', debugID);
      },
      onTestEvent: function() {
        emitEvent('onTestEvent');
      }
    };
    ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
    ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
    var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
    if (/[?&]react_perf\b/.test(url)) {
      ReactDebugTool.beginProfiling();
    }
    module.exports = ReactDebugTool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactInstrumentation.js", ["npm:react@15.2.1/lib/ReactDebugTool.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var debugTool = null;
    if ("production" !== 'production') {
      var ReactDebugTool = $__require('npm:react@15.2.1/lib/ReactDebugTool.js');
      debugTool = ReactDebugTool;
    }
    module.exports = {debugTool: debugTool};
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/instantiateReactComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactCompositeComponent.js", "npm:react@15.2.1/lib/ReactEmptyComponent.js", "npm:react@15.2.1/lib/ReactHostComponent.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactCompositeComponent = $__require('npm:react@15.2.1/lib/ReactCompositeComponent.js');
    var ReactEmptyComponent = $__require('npm:react@15.2.1/lib/ReactEmptyComponent.js');
    var ReactHostComponent = $__require('npm:react@15.2.1/lib/ReactHostComponent.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var ReactCompositeComponentWrapper = function(element) {
      this.construct(element);
    };
    _assign(ReactCompositeComponentWrapper.prototype, ReactCompositeComponent.Mixin, {_instantiateReactComponent: instantiateReactComponent});
    function getDeclarationErrorAddendum(owner) {
      if (owner) {
        var name = owner.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    function getDisplayName(instance) {
      var element = instance._currentElement;
      if (element == null) {
        return '#empty';
      } else if (typeof element === 'string' || typeof element === 'number') {
        return '#text';
      } else if (typeof element.type === 'string') {
        return element.type;
      } else if (instance.getName) {
        return instance.getName() || 'Unknown';
      } else {
        return element.type.displayName || element.type.name || 'Unknown';
      }
    }
    function isInternalComponentType(type) {
      return typeof type === 'function' && typeof type.prototype !== 'undefined' && typeof type.prototype.mountComponent === 'function' && typeof type.prototype.receiveComponent === 'function';
    }
    var nextDebugID = 1;
    function instantiateReactComponent(node, shouldHaveDebugID) {
      var instance;
      if (node === null || node === false) {
        instance = ReactEmptyComponent.create(instantiateReactComponent);
      } else if (typeof node === 'object') {
        var element = node;
        !(element && (typeof element.type === 'function' || typeof element.type === 'string')) ? "production" !== 'production' ? invariant(false, 'Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : _prodInvariant('130', element.type == null ? element.type : typeof element.type, getDeclarationErrorAddendum(element._owner)) : void 0;
        if (typeof element.type === 'string') {
          instance = ReactHostComponent.createInternalComponent(element);
        } else if (isInternalComponentType(element.type)) {
          instance = new element.type(element);
          if (!instance.getHostNode) {
            instance.getHostNode = instance.getNativeNode;
          }
        } else {
          instance = new ReactCompositeComponentWrapper(element);
        }
      } else if (typeof node === 'string' || typeof node === 'number') {
        instance = ReactHostComponent.createInstanceForText(node);
      } else {
        !false ? "production" !== 'production' ? invariant(false, 'Encountered invalid React node of type %s', typeof node) : _prodInvariant('131', typeof node) : void 0;
      }
      if ("production" !== 'production') {
        "production" !== 'production' ? warning(typeof instance.mountComponent === 'function' && typeof instance.receiveComponent === 'function' && typeof instance.getHostNode === 'function' && typeof instance.unmountComponent === 'function', 'Only React Components can be mounted.') : void 0;
      }
      instance._mountIndex = 0;
      instance._mountImage = null;
      if ("production" !== 'production') {
        if (shouldHaveDebugID) {
          var debugID = nextDebugID++;
          instance._debugID = debugID;
          var displayName = getDisplayName(instance);
          ReactInstrumentation.debugTool.onSetDisplayName(debugID, displayName);
          var owner = node && node._owner;
          if (owner) {
            ReactInstrumentation.debugTool.onSetOwner(debugID, owner._debugID);
          }
        } else {
          instance._debugID = 0;
        }
      }
      if ("production" !== 'production') {
        if (Object.preventExtensions) {
          Object.preventExtensions(instance);
        }
      }
      return instance;
    }
    module.exports = instantiateReactComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/DOMNamespaces.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DOMNamespaces = {
    html: 'http://www.w3.org/1999/xhtml',
    mathml: 'http://www.w3.org/1998/Math/MathML',
    svg: 'http://www.w3.org/2000/svg'
  };
  module.exports = DOMNamespaces;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var createMicrosoftUnsafeLocalFunction = function(func) {
    if (typeof MSApp !== 'undefined' && MSApp.execUnsafeLocalFunction) {
      return function(arg0, arg1, arg2, arg3) {
        MSApp.execUnsafeLocalFunction(function() {
          return func(arg0, arg1, arg2, arg3);
        });
      };
    } else {
      return func;
    }
  };
  module.exports = createMicrosoftUnsafeLocalFunction;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/setInnerHTML.js", ["npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "npm:react@15.2.1/lib/DOMNamespaces.js", "npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
    var DOMNamespaces = $__require('npm:react@15.2.1/lib/DOMNamespaces.js');
    var WHITESPACE_TEST = /^[ \r\n\t\f]/;
    var NONVISIBLE_TEST = /<(!--|link|noscript|meta|script|style)[ \r\n\t\f\/>]/;
    var createMicrosoftUnsafeLocalFunction = $__require('npm:react@15.2.1/lib/createMicrosoftUnsafeLocalFunction.js');
    var reusableSVGContainer;
    var setInnerHTML = createMicrosoftUnsafeLocalFunction(function(node, html) {
      if (node.namespaceURI === DOMNamespaces.svg && !('innerHTML' in node)) {
        reusableSVGContainer = reusableSVGContainer || document.createElement('div');
        reusableSVGContainer.innerHTML = '<svg>' + html + '</svg>';
        var newNodes = reusableSVGContainer.firstChild.childNodes;
        for (var i = 0; i < newNodes.length; i++) {
          node.appendChild(newNodes[i]);
        }
      } else {
        node.innerHTML = html;
      }
    });
    if (ExecutionEnvironment.canUseDOM) {
      var testElement = document.createElement('div');
      testElement.innerHTML = ' ';
      if (testElement.innerHTML === '') {
        setInnerHTML = function(node, html) {
          if (node.parentNode) {
            node.parentNode.replaceChild(node, node);
          }
          if (WHITESPACE_TEST.test(html) || html[0] === '<' && NONVISIBLE_TEST.test(html)) {
            node.innerHTML = String.fromCharCode(0xFEFF) + html;
            var textNode = node.firstChild;
            if (textNode.data.length === 1) {
              node.removeChild(textNode);
            } else {
              textNode.deleteData(0, 1);
            }
          } else {
            node.innerHTML = html;
          }
        };
      }
      testElement = null;
    }
    module.exports = setInnerHTML;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/shouldUpdateReactComponent.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function shouldUpdateReactComponent(prevElement, nextElement) {
    var prevEmpty = prevElement === null || prevElement === false;
    var nextEmpty = nextElement === null || nextElement === false;
    if (prevEmpty || nextEmpty) {
      return prevEmpty === nextEmpty;
    }
    var prevType = typeof prevElement;
    var nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }
  module.exports = shouldUpdateReactComponent;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactMount.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/DOMLazyTree.js", "npm:react@15.2.1/lib/DOMProperty.js", "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDOMContainerInfo.js", "npm:react@15.2.1/lib/ReactDOMFeatureFlags.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactFeatureFlags.js", "npm:react@15.2.1/lib/ReactInstanceMap.js", "npm:react@15.2.1/lib/ReactInstrumentation.js", "npm:react@15.2.1/lib/ReactMarkupChecksum.js", "npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/ReactUpdateQueue.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:fbjs@0.8.3/lib/emptyObject.js", "npm:react@15.2.1/lib/instantiateReactComponent.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:react@15.2.1/lib/setInnerHTML.js", "npm:react@15.2.1/lib/shouldUpdateReactComponent.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var DOMLazyTree = $__require('npm:react@15.2.1/lib/DOMLazyTree.js');
    var DOMProperty = $__require('npm:react@15.2.1/lib/DOMProperty.js');
    var ReactBrowserEventEmitter = $__require('npm:react@15.2.1/lib/ReactBrowserEventEmitter.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDOMContainerInfo = $__require('npm:react@15.2.1/lib/ReactDOMContainerInfo.js');
    var ReactDOMFeatureFlags = $__require('npm:react@15.2.1/lib/ReactDOMFeatureFlags.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var ReactFeatureFlags = $__require('npm:react@15.2.1/lib/ReactFeatureFlags.js');
    var ReactInstanceMap = $__require('npm:react@15.2.1/lib/ReactInstanceMap.js');
    var ReactInstrumentation = $__require('npm:react@15.2.1/lib/ReactInstrumentation.js');
    var ReactMarkupChecksum = $__require('npm:react@15.2.1/lib/ReactMarkupChecksum.js');
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var ReactUpdateQueue = $__require('npm:react@15.2.1/lib/ReactUpdateQueue.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var emptyObject = $__require('npm:fbjs@0.8.3/lib/emptyObject.js');
    var instantiateReactComponent = $__require('npm:react@15.2.1/lib/instantiateReactComponent.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var setInnerHTML = $__require('npm:react@15.2.1/lib/setInnerHTML.js');
    var shouldUpdateReactComponent = $__require('npm:react@15.2.1/lib/shouldUpdateReactComponent.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var ATTR_NAME = DOMProperty.ID_ATTRIBUTE_NAME;
    var ROOT_ATTR_NAME = DOMProperty.ROOT_ATTRIBUTE_NAME;
    var ELEMENT_NODE_TYPE = 1;
    var DOC_NODE_TYPE = 9;
    var DOCUMENT_FRAGMENT_NODE_TYPE = 11;
    var instancesByReactRootID = {};
    function firstDifferenceIndex(string1, string2) {
      var minLen = Math.min(string1.length, string2.length);
      for (var i = 0; i < minLen; i++) {
        if (string1.charAt(i) !== string2.charAt(i)) {
          return i;
        }
      }
      return string1.length === string2.length ? -1 : minLen;
    }
    function getReactRootElementInContainer(container) {
      if (!container) {
        return null;
      }
      if (container.nodeType === DOC_NODE_TYPE) {
        return container.documentElement;
      } else {
        return container.firstChild;
      }
    }
    function internalGetID(node) {
      return node.getAttribute && node.getAttribute(ATTR_NAME) || '';
    }
    function mountComponentIntoNode(wrapperInstance, container, transaction, shouldReuseMarkup, context) {
      var markerName;
      if (ReactFeatureFlags.logTopLevelRenders) {
        var wrappedElement = wrapperInstance._currentElement.props;
        var type = wrappedElement.type;
        markerName = 'React mount: ' + (typeof type === 'string' ? type : type.displayName || type.name);
        console.time(markerName);
      }
      var markup = ReactReconciler.mountComponent(wrapperInstance, transaction, null, ReactDOMContainerInfo(wrapperInstance, container), context);
      if (markerName) {
        console.timeEnd(markerName);
      }
      wrapperInstance._renderedComponent._topLevelWrapper = wrapperInstance;
      ReactMount._mountImageIntoNode(markup, container, wrapperInstance, shouldReuseMarkup, transaction);
    }
    function batchedMountComponentIntoNode(componentInstance, container, shouldReuseMarkup, context) {
      var transaction = ReactUpdates.ReactReconcileTransaction.getPooled(!shouldReuseMarkup && ReactDOMFeatureFlags.useCreateElement);
      transaction.perform(mountComponentIntoNode, null, componentInstance, container, transaction, shouldReuseMarkup, context);
      ReactUpdates.ReactReconcileTransaction.release(transaction);
    }
    function unmountComponentFromNode(instance, container, safely) {
      if ("production" !== 'production') {
        ReactInstrumentation.debugTool.onBeginFlush();
      }
      ReactReconciler.unmountComponent(instance, safely);
      if ("production" !== 'production') {
        ReactInstrumentation.debugTool.onEndFlush();
      }
      if (container.nodeType === DOC_NODE_TYPE) {
        container = container.documentElement;
      }
      while (container.lastChild) {
        container.removeChild(container.lastChild);
      }
    }
    function hasNonRootReactChild(container) {
      var rootEl = getReactRootElementInContainer(container);
      if (rootEl) {
        var inst = ReactDOMComponentTree.getInstanceFromNode(rootEl);
        return !!(inst && inst._hostParent);
      }
    }
    function getHostRootInstanceInContainer(container) {
      var rootEl = getReactRootElementInContainer(container);
      var prevHostInstance = rootEl && ReactDOMComponentTree.getInstanceFromNode(rootEl);
      return prevHostInstance && !prevHostInstance._hostParent ? prevHostInstance : null;
    }
    function getTopLevelWrapperInContainer(container) {
      var root = getHostRootInstanceInContainer(container);
      return root ? root._hostContainerInfo._topLevelWrapper : null;
    }
    var topLevelRootCounter = 1;
    var TopLevelWrapper = function() {
      this.rootID = topLevelRootCounter++;
    };
    TopLevelWrapper.prototype.isReactComponent = {};
    if ("production" !== 'production') {
      TopLevelWrapper.displayName = 'TopLevelWrapper';
    }
    TopLevelWrapper.prototype.render = function() {
      return this.props;
    };
    var ReactMount = {
      TopLevelWrapper: TopLevelWrapper,
      _instancesByReactRootID: instancesByReactRootID,
      scrollMonitor: function(container, renderCallback) {
        renderCallback();
      },
      _updateRootComponent: function(prevComponent, nextElement, nextContext, container, callback) {
        ReactMount.scrollMonitor(container, function() {
          ReactUpdateQueue.enqueueElementInternal(prevComponent, nextElement, nextContext);
          if (callback) {
            ReactUpdateQueue.enqueueCallbackInternal(prevComponent, callback);
          }
        });
        return prevComponent;
      },
      _renderNewRootComponent: function(nextElement, container, shouldReuseMarkup, context) {
        "production" !== 'production' ? warning(ReactCurrentOwner.current == null, '_renderNewRootComponent(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from ' + 'render is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "production" !== 'production' ? invariant(false, '_registerComponent(...): Target container is not a DOM element.') : _prodInvariant('37') : void 0;
        ReactBrowserEventEmitter.ensureScrollValueMonitoring();
        var componentInstance = instantiateReactComponent(nextElement, false);
        ReactUpdates.batchedUpdates(batchedMountComponentIntoNode, componentInstance, container, shouldReuseMarkup, context);
        var wrapperID = componentInstance._instance.rootID;
        instancesByReactRootID[wrapperID] = componentInstance;
        if ("production" !== 'production') {
          ReactInstrumentation.debugTool.onMountRootComponent(componentInstance._renderedComponent._debugID);
        }
        return componentInstance;
      },
      renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {
        !(parentComponent != null && ReactInstanceMap.has(parentComponent)) ? "production" !== 'production' ? invariant(false, 'parentComponent must be a valid React Component') : _prodInvariant('38') : void 0;
        return ReactMount._renderSubtreeIntoContainer(parentComponent, nextElement, container, callback);
      },
      _renderSubtreeIntoContainer: function(parentComponent, nextElement, container, callback) {
        ReactUpdateQueue.validateCallback(callback, 'ReactDOM.render');
        !ReactElement.isValidElement(nextElement) ? "production" !== 'production' ? invariant(false, 'ReactDOM.render(): Invalid component element.%s', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : _prodInvariant('39', typeof nextElement === 'string' ? ' Instead of passing a string like \'div\', pass ' + 'React.createElement(\'div\') or <div />.' : typeof nextElement === 'function' ? ' Instead of passing a class like Foo, pass ' + 'React.createElement(Foo) or <Foo />.' : nextElement != null && nextElement.props !== undefined ? ' This may be caused by unintentionally loading two independent ' + 'copies of React.' : '') : void 0;
        "production" !== 'production' ? warning(!container || !container.tagName || container.tagName.toUpperCase() !== 'BODY', 'render(): Rendering components directly into document.body is ' + 'discouraged, since its children are often manipulated by third-party ' + 'scripts and browser extensions. This may lead to subtle ' + 'reconciliation issues. Try rendering into a container element created ' + 'for your app.') : void 0;
        var nextWrappedElement = ReactElement(TopLevelWrapper, null, null, null, null, null, nextElement);
        var nextContext;
        if (parentComponent) {
          var parentInst = ReactInstanceMap.get(parentComponent);
          nextContext = parentInst._processChildContext(parentInst._context);
        } else {
          nextContext = emptyObject;
        }
        var prevComponent = getTopLevelWrapperInContainer(container);
        if (prevComponent) {
          var prevWrappedElement = prevComponent._currentElement;
          var prevElement = prevWrappedElement.props;
          if (shouldUpdateReactComponent(prevElement, nextElement)) {
            var publicInst = prevComponent._renderedComponent.getPublicInstance();
            var updatedCallback = callback && function() {
              callback.call(publicInst);
            };
            ReactMount._updateRootComponent(prevComponent, nextWrappedElement, nextContext, container, updatedCallback);
            return publicInst;
          } else {
            ReactMount.unmountComponentAtNode(container);
          }
        }
        var reactRootElement = getReactRootElementInContainer(container);
        var containerHasReactMarkup = reactRootElement && !!internalGetID(reactRootElement);
        var containerHasNonRootReactChild = hasNonRootReactChild(container);
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(!containerHasNonRootReactChild, 'render(...): Replacing React-rendered children with a new root ' + 'component. If you intended to update the children of this node, ' + 'you should instead have the existing children update their state ' + 'and render the new components instead of calling ReactDOM.render.') : void 0;
          if (!containerHasReactMarkup || reactRootElement.nextSibling) {
            var rootElementSibling = reactRootElement;
            while (rootElementSibling) {
              if (internalGetID(rootElementSibling)) {
                "production" !== 'production' ? warning(false, 'render(): Target node has markup rendered by React, but there ' + 'are unrelated nodes as well. This is most commonly caused by ' + 'white-space inserted around server-rendered markup.') : void 0;
                break;
              }
              rootElementSibling = rootElementSibling.nextSibling;
            }
          }
        }
        var shouldReuseMarkup = containerHasReactMarkup && !prevComponent && !containerHasNonRootReactChild;
        var component = ReactMount._renderNewRootComponent(nextWrappedElement, container, shouldReuseMarkup, nextContext)._renderedComponent.getPublicInstance();
        if (callback) {
          callback.call(component);
        }
        return component;
      },
      render: function(nextElement, container, callback) {
        return ReactMount._renderSubtreeIntoContainer(null, nextElement, container, callback);
      },
      unmountComponentAtNode: function(container) {
        "production" !== 'production' ? warning(ReactCurrentOwner.current == null, 'unmountComponentAtNode(): Render methods should be a pure function ' + 'of props and state; triggering nested component updates from render ' + 'is not allowed. If necessary, trigger nested updates in ' + 'componentDidUpdate. Check the render method of %s.', ReactCurrentOwner.current && ReactCurrentOwner.current.getName() || 'ReactCompositeComponent') : void 0;
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "production" !== 'production' ? invariant(false, 'unmountComponentAtNode(...): Target container is not a DOM element.') : _prodInvariant('40') : void 0;
        var prevComponent = getTopLevelWrapperInContainer(container);
        if (!prevComponent) {
          var containerHasNonRootReactChild = hasNonRootReactChild(container);
          var isContainerReactRoot = container.nodeType === 1 && container.hasAttribute(ROOT_ATTR_NAME);
          if ("production" !== 'production') {
            "production" !== 'production' ? warning(!containerHasNonRootReactChild, 'unmountComponentAtNode(): The node you\'re attempting to unmount ' + 'was rendered by React and is not a top-level container. %s', isContainerReactRoot ? 'You may have accidentally passed in a React root node instead ' + 'of its container.' : 'Instead, have the parent component update its state and ' + 'rerender in order to remove this component.') : void 0;
          }
          return false;
        }
        delete instancesByReactRootID[prevComponent._instance.rootID];
        ReactUpdates.batchedUpdates(unmountComponentFromNode, prevComponent, container, false);
        return true;
      },
      _mountImageIntoNode: function(markup, container, instance, shouldReuseMarkup, transaction) {
        !(container && (container.nodeType === ELEMENT_NODE_TYPE || container.nodeType === DOC_NODE_TYPE || container.nodeType === DOCUMENT_FRAGMENT_NODE_TYPE)) ? "production" !== 'production' ? invariant(false, 'mountComponentIntoNode(...): Target container is not valid.') : _prodInvariant('41') : void 0;
        if (shouldReuseMarkup) {
          var rootElement = getReactRootElementInContainer(container);
          if (ReactMarkupChecksum.canReuseMarkup(markup, rootElement)) {
            ReactDOMComponentTree.precacheNode(instance, rootElement);
            return;
          } else {
            var checksum = rootElement.getAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            rootElement.removeAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME);
            var rootMarkup = rootElement.outerHTML;
            rootElement.setAttribute(ReactMarkupChecksum.CHECKSUM_ATTR_NAME, checksum);
            var normalizedMarkup = markup;
            if ("production" !== 'production') {
              var normalizer;
              if (container.nodeType === ELEMENT_NODE_TYPE) {
                normalizer = document.createElement('div');
                normalizer.innerHTML = markup;
                normalizedMarkup = normalizer.innerHTML;
              } else {
                normalizer = document.createElement('iframe');
                document.body.appendChild(normalizer);
                normalizer.contentDocument.write(markup);
                normalizedMarkup = normalizer.contentDocument.documentElement.outerHTML;
                document.body.removeChild(normalizer);
              }
            }
            var diffIndex = firstDifferenceIndex(normalizedMarkup, rootMarkup);
            var difference = ' (client) ' + normalizedMarkup.substring(diffIndex - 20, diffIndex + 20) + '\n (server) ' + rootMarkup.substring(diffIndex - 20, diffIndex + 20);
            !(container.nodeType !== DOC_NODE_TYPE) ? "production" !== 'production' ? invariant(false, 'You\'re trying to render a component to the document using server rendering but the checksum was invalid. This usually means you rendered a different component type or props on the client from the one on the server, or your render() methods are impure. React cannot handle this case due to cross-browser quirks by rendering at the document root. You should look for environment dependent code in your components and ensure the props are the same client and server side:\n%s', difference) : _prodInvariant('42', difference) : void 0;
            if ("production" !== 'production') {
              "production" !== 'production' ? warning(false, 'React attempted to reuse markup in a container but the ' + 'checksum was invalid. This generally means that you are ' + 'using server rendering and the markup generated on the ' + 'server was not what the client was expecting. React injected ' + 'new markup to compensate which works but you have lost many ' + 'of the benefits of server rendering. Instead, figure out ' + 'why the markup being generated is different on the client ' + 'or server:\n%s', difference) : void 0;
            }
          }
        }
        !(container.nodeType !== DOC_NODE_TYPE) ? "production" !== 'production' ? invariant(false, 'You\'re trying to render a component to the document but you didn\'t use server rendering. We can\'t do this without using server rendering due to cross-browser quirks. See ReactDOMServer.renderToString() for server rendering.') : _prodInvariant('43') : void 0;
        if (transaction.useCreateElement) {
          while (container.lastChild) {
            container.removeChild(container.lastChild);
          }
          DOMLazyTree.insertTreeBefore(container, markup, null);
        } else {
          setInnerHTML(container, markup);
          ReactDOMComponentTree.precacheNode(instance, container.firstChild);
        }
        if ("production" !== 'production') {
          var hostNode = ReactDOMComponentTree.getInstanceFromNode(container.firstChild);
          if (hostNode._debugID !== 0) {
            ReactInstrumentation.debugTool.onHostOperation(hostNode._debugID, 'mount', markup.toString());
          }
        }
      }
    };
    module.exports = ReactMount;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/renderSubtreeIntoContainer.js", ["npm:react@15.2.1/lib/ReactMount.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactMount = $__require('npm:react@15.2.1/lib/ReactMount.js');
  module.exports = ReactMount.renderSubtreeIntoContainer;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
  var ExecutionEnvironment = {
    canUseDOM: canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen,
    isInWorker: !canUseDOM
  };
  module.exports = ExecutionEnvironment;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOM.js", ["npm:react@15.2.1/lib/ReactDOMComponentTree.js", "npm:react@15.2.1/lib/ReactDefaultInjection.js", "npm:react@15.2.1/lib/ReactMount.js", "npm:react@15.2.1/lib/ReactReconciler.js", "npm:react@15.2.1/lib/ReactUpdates.js", "npm:react@15.2.1/lib/ReactVersion.js", "npm:react@15.2.1/lib/findDOMNode.js", "npm:react@15.2.1/lib/getHostComponentFromComposite.js", "npm:react@15.2.1/lib/renderSubtreeIntoContainer.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:fbjs@0.8.3/lib/ExecutionEnvironment.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactDOMComponentTree = $__require('npm:react@15.2.1/lib/ReactDOMComponentTree.js');
    var ReactDefaultInjection = $__require('npm:react@15.2.1/lib/ReactDefaultInjection.js');
    var ReactMount = $__require('npm:react@15.2.1/lib/ReactMount.js');
    var ReactReconciler = $__require('npm:react@15.2.1/lib/ReactReconciler.js');
    var ReactUpdates = $__require('npm:react@15.2.1/lib/ReactUpdates.js');
    var ReactVersion = $__require('npm:react@15.2.1/lib/ReactVersion.js');
    var findDOMNode = $__require('npm:react@15.2.1/lib/findDOMNode.js');
    var getHostComponentFromComposite = $__require('npm:react@15.2.1/lib/getHostComponentFromComposite.js');
    var renderSubtreeIntoContainer = $__require('npm:react@15.2.1/lib/renderSubtreeIntoContainer.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    ReactDefaultInjection.inject();
    var React = {
      findDOMNode: findDOMNode,
      render: ReactMount.render,
      unmountComponentAtNode: ReactMount.unmountComponentAtNode,
      version: ReactVersion,
      unstable_batchedUpdates: ReactUpdates.batchedUpdates,
      unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject === 'function') {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
        ComponentTree: {
          getClosestInstanceFromNode: ReactDOMComponentTree.getClosestInstanceFromNode,
          getNodeFromInstance: function(inst) {
            if (inst._renderedComponent) {
              inst = getHostComponentFromComposite(inst);
            }
            if (inst) {
              return ReactDOMComponentTree.getNodeFromInstance(inst);
            } else {
              return null;
            }
          }
        },
        Mount: ReactMount,
        Reconciler: ReactReconciler
      });
    }
    if ("production" !== 'production') {
      var ExecutionEnvironment = $__require('npm:fbjs@0.8.3/lib/ExecutionEnvironment.js');
      if (ExecutionEnvironment.canUseDOM && window.top === window.self) {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
          if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Edge') === -1 || navigator.userAgent.indexOf('Firefox') > -1) {
            var showFileUrlMessage = window.location.protocol.indexOf('http') === -1 && navigator.userAgent.indexOf('Firefox') === -1;
            console.debug('Download the React DevTools ' + (showFileUrlMessage ? 'and use an HTTP server (instead of a file: URL) ' : '') + 'for a better development experience: ' + 'https://fb.me/react-devtools');
          }
        }
        var testFunc = function testFn() {};
        "production" !== 'production' ? warning((testFunc.name || testFunc.toString()).indexOf('testFn') !== -1, 'It looks like you\'re using a minified copy of the development build ' + 'of React. When deploying React apps to production, make sure to use ' + 'the production build which skips development warnings and is faster. ' + 'See https://fb.me/react-minification for more details.') : void 0;
        var ieCompatibilityMode = document.documentMode && document.documentMode < 8;
        "production" !== 'production' ? warning(!ieCompatibilityMode, 'Internet Explorer is running in compatibility mode; please add the ' + 'following tag to your HTML to prevent this from happening: ' + '<meta http-equiv="X-UA-Compatible" content="IE=edge" />') : void 0;
        var expectedFeatures = [Array.isArray, Array.prototype.every, Array.prototype.forEach, Array.prototype.indexOf, Array.prototype.map, Date.now, Function.prototype.bind, Object.keys, String.prototype.split, String.prototype.trim];
        for (var i = 0; i < expectedFeatures.length; i++) {
          if (!expectedFeatures[i]) {
            "production" !== 'production' ? warning(false, 'One or more ES5 shims expected by React are not available: ' + 'https://fb.me/react-warning-polyfills') : void 0;
            break;
          }
        }
      }
    }
    module.exports = React;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-dom@15.2.1/index.js", ["npm:react@15.2.1/lib/ReactDOM.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react@15.2.1/lib/ReactDOM.js');
  return module.exports;
});

System.registerDynamic("npm:react-dom@15.2.1.js", ["npm:react-dom@15.2.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react-dom@15.2.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/autoPrefix.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {set: function set(style, key, value) {
      style[key] = value;
    }};
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/CircleRipple.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:react-dom@15.2.1.js", "npm:recompose@0.20.2/shallowEqual.js", "npm:material-ui@0.15.2/utils/autoPrefix.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = $__require('npm:react-dom@15.2.1.js');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _shallowEqual = $__require('npm:recompose@0.20.2/shallowEqual.js');
  var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
  var _autoPrefix = $__require('npm:material-ui@0.15.2/utils/autoPrefix.js');
  var _autoPrefix2 = _interopRequireDefault(_autoPrefix);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var CircleRipple = function(_Component) {
    _inherits(CircleRipple, _Component);
    function CircleRipple() {
      _classCallCheck(this, CircleRipple);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(CircleRipple).apply(this, arguments));
    }
    _createClass(CircleRipple, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        return !(0, _shallowEqual2.default)(this.props, nextProps);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
      }
    }, {
      key: 'componentWillAppear',
      value: function componentWillAppear(callback) {
        this.initializeAnimation(callback);
      }
    }, {
      key: 'componentWillEnter',
      value: function componentWillEnter(callback) {
        this.initializeAnimation(callback);
      }
    }, {
      key: 'componentDidAppear',
      value: function componentDidAppear() {
        this.animate();
      }
    }, {
      key: 'componentDidEnter',
      value: function componentDidEnter() {
        this.animate();
      }
    }, {
      key: 'componentWillLeave',
      value: function componentWillLeave(callback) {
        var style = _reactDom2.default.findDOMNode(this).style;
        style.opacity = 0;
        var removeAfter = this.props.aborted ? 0 : 2000;
        this.enterTimer = setTimeout(callback, removeAfter);
      }
    }, {
      key: 'animate',
      value: function animate() {
        var style = _reactDom2.default.findDOMNode(this).style;
        var transitionValue = _transitions2.default.easeOut('2s', 'opacity') + ', ' + _transitions2.default.easeOut('1s', 'transform');
        _autoPrefix2.default.set(style, 'transition', transitionValue);
        _autoPrefix2.default.set(style, 'transform', 'scale(1)');
      }
    }, {
      key: 'initializeAnimation',
      value: function initializeAnimation(callback) {
        var style = _reactDom2.default.findDOMNode(this).style;
        style.opacity = this.props.opacity;
        _autoPrefix2.default.set(style, 'transform', 'scale(0)');
        this.leaveTimer = setTimeout(callback, 0);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var aborted = _props.aborted;
        var color = _props.color;
        var opacity = _props.opacity;
        var style = _props.style;
        var touchGenerated = _props.touchGenerated;
        var other = _objectWithoutProperties(_props, ['aborted', 'color', 'opacity', 'style', 'touchGenerated']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var mergedStyles = (0, _simpleAssign2.default)({
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          borderRadius: '50%',
          backgroundColor: color
        }, style);
        return _react2.default.createElement('div', _extends({}, other, {style: prepareStyles(mergedStyles)}));
      }
    }]);
    return CircleRipple;
  }(_react.Component);
  CircleRipple.propTypes = {
    aborted: _react.PropTypes.bool,
    color: _react.PropTypes.string,
    opacity: _react.PropTypes.number,
    style: _react.PropTypes.object,
    touchGenerated: _react.PropTypes.bool
  };
  CircleRipple.defaultProps = {
    opacity: 0.1,
    aborted: false
  };
  CircleRipple.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = CircleRipple;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/TouchRipple.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:react-dom@15.2.1.js", "npm:react-addons-transition-group@15.2.1.js", "npm:material-ui@0.15.2/utils/dom.js", "npm:material-ui@0.15.2/internal/CircleRipple.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactDom = $__require('npm:react-dom@15.2.1.js');
  var _reactDom2 = _interopRequireDefault(_reactDom);
  var _reactAddonsTransitionGroup = $__require('npm:react-addons-transition-group@15.2.1.js');
  var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);
  var _dom = $__require('npm:material-ui@0.15.2/utils/dom.js');
  var _dom2 = _interopRequireDefault(_dom);
  var _CircleRipple = $__require('npm:material-ui@0.15.2/internal/CircleRipple.js');
  var _CircleRipple2 = _interopRequireDefault(_CircleRipple);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }
  var shift = function shift(_ref) {
    var _ref2 = _toArray(_ref);
    var newArray = _ref2.slice(1);
    return newArray;
  };
  var TouchRipple = function(_Component) {
    _inherits(TouchRipple, _Component);
    function TouchRipple(props, context) {
      _classCallCheck(this, TouchRipple);
      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TouchRipple).call(this, props, context));
      _this.handleMouseDown = function(event) {
        if (event.button === 0) {
          _this.start(event, false);
        }
      };
      _this.handleMouseUp = function() {
        _this.end();
      };
      _this.handleMouseLeave = function() {
        _this.end();
      };
      _this.handleTouchStart = function(event) {
        event.stopPropagation();
        if (_this.props.abortOnScroll && event.touches) {
          _this.startListeningForScrollAbort(event);
          _this.startTime = Date.now();
        }
        _this.start(event, true);
      };
      _this.handleTouchEnd = function() {
        _this.end();
      };
      _this.handleTouchMove = function(event) {
        var timeSinceStart = Math.abs(Date.now() - _this.startTime);
        if (timeSinceStart > 300) {
          _this.stopListeningForScrollAbort();
          return;
        }
        var deltaY = Math.abs(event.touches[0].clientY - _this.firstTouchY);
        var deltaX = Math.abs(event.touches[0].clientX - _this.firstTouchX);
        if (deltaY > 6 || deltaX > 6) {
          var currentRipples = _this.state.ripples;
          var ripple = currentRipples[0];
          var abortedRipple = _react2.default.cloneElement(ripple, {aborted: true});
          currentRipples = shift(currentRipples);
          currentRipples = [].concat(_toConsumableArray(currentRipples), [abortedRipple]);
          _this.setState({ripples: currentRipples}, function() {
            _this.end();
          });
        }
      };
      _this.ignoreNextMouseDown = false;
      _this.state = {
        hasRipples: false,
        nextKey: 0,
        ripples: []
      };
      return _this;
    }
    _createClass(TouchRipple, [{
      key: 'start',
      value: function start(event, isRippleTouchGenerated) {
        var theme = this.context.muiTheme.ripple;
        if (this.ignoreNextMouseDown && !isRippleTouchGenerated) {
          this.ignoreNextMouseDown = false;
          return;
        }
        var ripples = this.state.ripples;
        ripples = [].concat(_toConsumableArray(ripples), [_react2.default.createElement(_CircleRipple2.default, {
          key: this.state.nextKey,
          style: !this.props.centerRipple ? this.getRippleStyle(event) : {},
          color: this.props.color || theme.color,
          opacity: this.props.opacity,
          touchGenerated: isRippleTouchGenerated
        })]);
        this.ignoreNextMouseDown = isRippleTouchGenerated;
        this.setState({
          hasRipples: true,
          nextKey: this.state.nextKey + 1,
          ripples: ripples
        });
      }
    }, {
      key: 'end',
      value: function end() {
        var currentRipples = this.state.ripples;
        this.setState({ripples: shift(currentRipples)});
        if (this.props.abortOnScroll) {
          this.stopListeningForScrollAbort();
        }
      }
    }, {
      key: 'startListeningForScrollAbort',
      value: function startListeningForScrollAbort(event) {
        this.firstTouchY = event.touches[0].clientY;
        this.firstTouchX = event.touches[0].clientX;
        document.body.addEventListener('touchmove', this.handleTouchMove);
      }
    }, {
      key: 'stopListeningForScrollAbort',
      value: function stopListeningForScrollAbort() {
        document.body.removeEventListener('touchmove', this.handleTouchMove);
      }
    }, {
      key: 'getRippleStyle',
      value: function getRippleStyle(event) {
        var style = {};
        var el = _reactDom2.default.findDOMNode(this);
        var elHeight = el.offsetHeight;
        var elWidth = el.offsetWidth;
        var offset = _dom2.default.offset(el);
        var isTouchEvent = event.touches && event.touches.length;
        var pageX = isTouchEvent ? event.touches[0].pageX : event.pageX;
        var pageY = isTouchEvent ? event.touches[0].pageY : event.pageY;
        var pointerX = pageX - offset.left;
        var pointerY = pageY - offset.top;
        var topLeftDiag = this.calcDiag(pointerX, pointerY);
        var topRightDiag = this.calcDiag(elWidth - pointerX, pointerY);
        var botRightDiag = this.calcDiag(elWidth - pointerX, elHeight - pointerY);
        var botLeftDiag = this.calcDiag(pointerX, elHeight - pointerY);
        var rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
        var rippleSize = rippleRadius * 2;
        var left = pointerX - rippleRadius;
        var top = pointerY - rippleRadius;
        style.height = rippleSize + 'px';
        style.width = rippleSize + 'px';
        style.top = top + 'px';
        style.left = left + 'px';
        return style;
      }
    }, {
      key: 'calcDiag',
      value: function calcDiag(a, b) {
        return Math.sqrt(a * a + b * b);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var style = _props.style;
        var _state = this.state;
        var hasRipples = _state.hasRipples;
        var ripples = _state.ripples;
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var rippleGroup = void 0;
        if (hasRipples) {
          var mergedStyles = (0, _simpleAssign2.default)({
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden'
          }, style);
          rippleGroup = _react2.default.createElement(_reactAddonsTransitionGroup2.default, {style: prepareStyles(mergedStyles)}, ripples);
        }
        return _react2.default.createElement('div', {
          onMouseUp: this.handleMouseUp,
          onMouseDown: this.handleMouseDown,
          onMouseLeave: this.handleMouseLeave,
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd
        }, rippleGroup, children);
      }
    }]);
    return TouchRipple;
  }(_react.Component);
  TouchRipple.propTypes = {
    abortOnScroll: _react.PropTypes.bool,
    centerRipple: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    color: _react.PropTypes.string,
    opacity: _react.PropTypes.number,
    style: _react.PropTypes.object
  };
  TouchRipple.defaultProps = {abortOnScroll: true};
  TouchRipple.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = TouchRipple;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/deprecatedPropType.js", ["npm:warning@3.0.0.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = deprecated;
    var _warning = $__require('npm:warning@3.0.0.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function deprecated(propType, explanation) {
      return function validate(props, propName, componentName) {
        if (props[propName] != null) {
          "production" !== "production" ? (0, _warning2.default)(false, '"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation) : void 0;
        }
        return propType(props, propName, componentName);
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/EnhancedButton.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/utils/childUtils.js", "npm:material-ui@0.15.2/utils/events.js", "npm:keycode@2.1.2.js", "npm:material-ui@0.15.2/internal/FocusRipple.js", "npm:material-ui@0.15.2/internal/TouchRipple.js", "npm:material-ui@0.15.2/utils/deprecatedPropType.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _childUtils = $__require('npm:material-ui@0.15.2/utils/childUtils.js');
  var _events = $__require('npm:material-ui@0.15.2/utils/events.js');
  var _events2 = _interopRequireDefault(_events);
  var _keycode = $__require('npm:keycode@2.1.2.js');
  var _keycode2 = _interopRequireDefault(_keycode);
  var _FocusRipple = $__require('npm:material-ui@0.15.2/internal/FocusRipple.js');
  var _FocusRipple2 = _interopRequireDefault(_FocusRipple);
  var _TouchRipple = $__require('npm:material-ui@0.15.2/internal/TouchRipple.js');
  var _TouchRipple2 = _interopRequireDefault(_TouchRipple);
  var _deprecatedPropType = $__require('npm:material-ui@0.15.2/utils/deprecatedPropType.js');
  var _deprecatedPropType2 = _interopRequireDefault(_deprecatedPropType);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var styleInjected = false;
  var listening = false;
  var tabPressed = false;
  function injectStyle() {
    if (!styleInjected) {
      var style = document.createElement('style');
      style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';
      document.body.appendChild(style);
      styleInjected = true;
    }
  }
  function listenForTabPresses() {
    if (!listening) {
      _events2.default.on(window, 'keydown', function(event) {
        tabPressed = (0, _keycode2.default)(event) === 'tab';
      });
      listening = true;
    }
  }
  var EnhancedButton = function(_Component) {
    _inherits(EnhancedButton, _Component);
    function EnhancedButton() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, EnhancedButton);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EnhancedButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {isKeyboardFocused: false}, _this.handleKeyDown = function(event) {
        if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
          if ((0, _keycode2.default)(event) === 'enter' && _this.state.isKeyboardFocused) {
            _this.handleTouchTap(event);
          }
          if ((0, _keycode2.default)(event) === 'esc' && _this.state.isKeyboardFocused) {
            _this.removeKeyboardFocus(event);
          }
        }
        _this.props.onKeyDown(event);
      }, _this.handleKeyUp = function(event) {
        if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
          if ((0, _keycode2.default)(event) === 'space' && _this.state.isKeyboardFocused) {
            _this.handleTouchTap(event);
          }
        }
        _this.props.onKeyUp(event);
      }, _this.handleBlur = function(event) {
        _this.cancelFocusTimeout();
        _this.removeKeyboardFocus(event);
        _this.props.onBlur(event);
      }, _this.handleFocus = function(event) {
        if (event)
          event.persist();
        if (!_this.props.disabled && !_this.props.disableKeyboardFocus) {
          _this.focusTimeout = setTimeout(function() {
            if (tabPressed) {
              _this.setKeyboardFocus(event);
              tabPressed = false;
            }
          }, 150);
          _this.props.onFocus(event);
        }
      }, _this.handleClick = function(event) {
        if (!_this.props.disabled) {
          tabPressed = false;
          _this.props.onClick(event);
        }
      }, _this.handleTouchTap = function(event) {
        _this.cancelFocusTimeout();
        if (!_this.props.disabled) {
          tabPressed = false;
          _this.removeKeyboardFocus(event);
          _this.props.onTouchTap(event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(EnhancedButton, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props;
        var disabled = _props.disabled;
        var disableKeyboardFocus = _props.disableKeyboardFocus;
        var keyboardFocused = _props.keyboardFocused;
        if (!disabled && keyboardFocused && !disableKeyboardFocus) {
          this.setState({isKeyboardFocused: true});
        }
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        injectStyle();
        listenForTabPresses();
        if (this.state.isKeyboardFocused) {
          this.refs.enhancedButton.focus();
          this.props.onKeyboardFocus(null, true);
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
          this.setState({isKeyboardFocused: false});
          if (nextProps.onKeyboardFocus) {
            nextProps.onKeyboardFocus(null, false);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        clearTimeout(this.focusTimeout);
      }
    }, {
      key: 'isKeyboardFocused',
      value: function isKeyboardFocused() {
        return this.state.isKeyboardFocused;
      }
    }, {
      key: 'removeKeyboardFocus',
      value: function removeKeyboardFocus(event) {
        if (this.state.isKeyboardFocused) {
          this.setState({isKeyboardFocused: false});
          this.props.onKeyboardFocus(event, false);
        }
      }
    }, {
      key: 'setKeyboardFocus',
      value: function setKeyboardFocus(event) {
        if (!this.state.isKeyboardFocused) {
          this.setState({isKeyboardFocused: true});
          this.props.onKeyboardFocus(event, true);
        }
      }
    }, {
      key: 'cancelFocusTimeout',
      value: function cancelFocusTimeout() {
        if (this.focusTimeout) {
          clearTimeout(this.focusTimeout);
          this.focusTimeout = null;
        }
      }
    }, {
      key: 'createButtonChildren',
      value: function createButtonChildren() {
        var _props2 = this.props;
        var centerRipple = _props2.centerRipple;
        var children = _props2.children;
        var disabled = _props2.disabled;
        var disableFocusRipple = _props2.disableFocusRipple;
        var disableKeyboardFocus = _props2.disableKeyboardFocus;
        var disableTouchRipple = _props2.disableTouchRipple;
        var focusRippleColor = _props2.focusRippleColor;
        var focusRippleOpacity = _props2.focusRippleOpacity;
        var touchRippleColor = _props2.touchRippleColor;
        var touchRippleOpacity = _props2.touchRippleOpacity;
        var isKeyboardFocused = this.state.isKeyboardFocused;
        var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? _react2.default.createElement(_FocusRipple2.default, {
          color: focusRippleColor,
          opacity: focusRippleOpacity,
          show: isKeyboardFocused
        }) : undefined;
        var touchRipple = !disabled && !disableTouchRipple ? _react2.default.createElement(_TouchRipple2.default, {
          centerRipple: centerRipple,
          color: touchRippleColor,
          opacity: touchRippleOpacity
        }, children) : undefined;
        return (0, _childUtils.createChildFragment)({
          focusRipple: focusRipple,
          touchRipple: touchRipple,
          children: touchRipple ? undefined : children
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props3 = this.props;
        var centerRipple = _props3.centerRipple;
        var children = _props3.children;
        var containerElement = _props3.containerElement;
        var disabled = _props3.disabled;
        var disableFocusRipple = _props3.disableFocusRipple;
        var disableKeyboardFocus = _props3.disableKeyboardFocus;
        var disableTouchRipple = _props3.disableTouchRipple;
        var focusRippleColor = _props3.focusRippleColor;
        var focusRippleOpacity = _props3.focusRippleOpacity;
        var href = _props3.href;
        var keyboardFocused = _props3.keyboardFocused;
        var linkButton = _props3.linkButton;
        var touchRippleColor = _props3.touchRippleColor;
        var touchRippleOpacity = _props3.touchRippleOpacity;
        var onBlur = _props3.onBlur;
        var onClick = _props3.onClick;
        var onFocus = _props3.onFocus;
        var onKeyUp = _props3.onKeyUp;
        var onKeyDown = _props3.onKeyDown;
        var onKeyboardFocus = _props3.onKeyboardFocus;
        var onTouchTap = _props3.onTouchTap;
        var style = _props3.style;
        var tabIndex = _props3.tabIndex;
        var type = _props3.type;
        var other = _objectWithoutProperties(_props3, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'href', 'keyboardFocused', 'linkButton', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onClick', 'onFocus', 'onKeyUp', 'onKeyDown', 'onKeyboardFocus', 'onTouchTap', 'style', 'tabIndex', 'type']);
        var _context$muiTheme = this.context.muiTheme;
        var prepareStyles = _context$muiTheme.prepareStyles;
        var enhancedButton = _context$muiTheme.enhancedButton;
        var mergedStyles = (0, _simpleAssign2.default)({
          border: 10,
          boxSizing: 'border-box',
          display: 'inline-block',
          fontFamily: this.context.muiTheme.baseTheme.fontFamily,
          WebkitTapHighlightColor: enhancedButton.tapHighlightColor,
          cursor: disabled ? 'default' : 'pointer',
          textDecoration: 'none',
          margin: 0,
          padding: 0,
          outline: 'none',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          transform: disableTouchRipple && disableFocusRipple ? null : 'translate3d(0, 0, 0)',
          verticalAlign: href ? 'middle' : null
        }, style);
        if (!mergedStyles.backgroundColor && !mergedStyles.background) {
          mergedStyles.background = 'none';
        }
        if (disabled && href) {
          return _react2.default.createElement('span', _extends({}, other, {style: mergedStyles}), children);
        }
        var buttonProps = _extends({}, other, {
          style: prepareStyles(mergedStyles),
          ref: 'enhancedButton',
          disabled: disabled,
          href: href,
          onBlur: this.handleBlur,
          onClick: this.handleClick,
          onFocus: this.handleFocus,
          onKeyUp: this.handleKeyUp,
          onKeyDown: this.handleKeyDown,
          onTouchTap: this.handleTouchTap,
          tabIndex: tabIndex,
          type: type
        });
        var buttonChildren = this.createButtonChildren();
        if (_react2.default.isValidElement(containerElement)) {
          return _react2.default.cloneElement(containerElement, buttonProps, buttonChildren);
        }
        return _react2.default.createElement(href ? 'a' : containerElement, buttonProps, buttonChildren);
      }
    }]);
    return EnhancedButton;
  }(_react.Component);
  EnhancedButton.propTypes = {
    centerRipple: _react.PropTypes.bool,
    children: _react.PropTypes.node,
    containerElement: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    disableFocusRipple: _react.PropTypes.bool,
    disableKeyboardFocus: _react.PropTypes.bool,
    disableTouchRipple: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    focusRippleColor: _react.PropTypes.string,
    focusRippleOpacity: _react.PropTypes.number,
    href: _react.PropTypes.string,
    keyboardFocused: _react.PropTypes.bool,
    linkButton: (0, _deprecatedPropType2.default)(_react.PropTypes.bool, 'LinkButton is no longer required when the `href` property is provided.\n      It will be removed with v0.16.0.'),
    onBlur: _react.PropTypes.func,
    onClick: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onKeyDown: _react.PropTypes.func,
    onKeyUp: _react.PropTypes.func,
    onKeyboardFocus: _react.PropTypes.func,
    onMouseDown: _react.PropTypes.func,
    onMouseEnter: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onMouseUp: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchStart: _react.PropTypes.func,
    onTouchTap: _react.PropTypes.func,
    style: _react.PropTypes.object,
    tabIndex: _react.PropTypes.number,
    touchRippleColor: _react.PropTypes.string,
    touchRippleOpacity: _react.PropTypes.number,
    type: _react.PropTypes.string
  };
  EnhancedButton.defaultProps = {
    containerElement: 'button',
    onBlur: function onBlur() {},
    onClick: function onClick() {},
    onFocus: function onFocus() {},
    onKeyDown: function onKeyDown() {},
    onKeyUp: function onKeyUp() {},
    onKeyboardFocus: function onKeyboardFocus() {},
    onMouseDown: function onMouseDown() {},
    onMouseEnter: function onMouseEnter() {},
    onMouseLeave: function onMouseLeave() {},
    onMouseUp: function onMouseUp() {},
    onTouchEnd: function onTouchEnd() {},
    onTouchStart: function onTouchStart() {},
    onTouchTap: function onTouchTap() {},
    tabIndex: 0,
    type: 'button'
  };
  EnhancedButton.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = EnhancedButton;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/FontIcon/FontIcon.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function getStyles(props, context, state) {
    var color = props.color;
    var hoverColor = props.hoverColor;
    var baseTheme = context.muiTheme.baseTheme;
    var offColor = color || baseTheme.palette.textColor;
    var onColor = hoverColor || offColor;
    return {root: {
        color: state.hovered ? onColor : offColor,
        position: 'relative',
        fontSize: baseTheme.spacing.iconSize,
        display: 'inline-block',
        userSelect: 'none',
        transition: _transitions2.default.easeOut()
      }};
  }
  var FontIcon = function(_Component) {
    _inherits(FontIcon, _Component);
    function FontIcon() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, FontIcon);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FontIcon)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {hovered: false}, _this.handleMouseLeave = function(event) {
        if (_this.props.hoverColor !== undefined) {
          _this.setState({hovered: false});
        }
        if (_this.props.onMouseLeave) {
          _this.props.onMouseLeave(event);
        }
      }, _this.handleMouseEnter = function(event) {
        if (_this.props.hoverColor !== undefined) {
          _this.setState({hovered: true});
        }
        if (_this.props.onMouseEnter) {
          _this.props.onMouseEnter(event);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(FontIcon, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var hoverColor = _props.hoverColor;
        var onMouseLeave = _props.onMouseLeave;
        var onMouseEnter = _props.onMouseEnter;
        var style = _props.style;
        var other = _objectWithoutProperties(_props, ['hoverColor', 'onMouseLeave', 'onMouseEnter', 'style']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context, this.state);
        return _react2.default.createElement('span', _extends({}, other, {
          onMouseLeave: this.handleMouseLeave,
          onMouseEnter: this.handleMouseEnter,
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))
        }));
      }
    }]);
    return FontIcon;
  }(_react.Component);
  FontIcon.muiName = 'FontIcon';
  FontIcon.propTypes = {
    color: _react.PropTypes.string,
    hoverColor: _react.PropTypes.string,
    onMouseEnter: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    style: _react.PropTypes.object
  };
  FontIcon.defaultProps = {
    onMouseEnter: function onMouseEnter() {},
    onMouseLeave: function onMouseLeave() {}
  };
  FontIcon.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = FontIcon;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/FontIcon/index.js", ["npm:material-ui@0.15.2/FontIcon/FontIcon.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = undefined;
  var _FontIcon = $__require('npm:material-ui@0.15.2/FontIcon/FontIcon.js');
  var _FontIcon2 = _interopRequireDefault(_FontIcon);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _FontIcon2.default;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/internal/Tooltip.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function getStyles(props, context, state) {
    var verticalPosition = props.verticalPosition;
    var horizontalPosition = props.horizontalPosition;
    var touchMarginOffset = props.touch ? 10 : 0;
    var touchOffsetTop = props.touch ? -20 : -10;
    var offset = verticalPosition === 'bottom' ? 14 + touchMarginOffset : -14 - touchMarginOffset;
    var _context$muiTheme = context.muiTheme;
    var baseTheme = _context$muiTheme.baseTheme;
    var zIndex = _context$muiTheme.zIndex;
    var tooltip = _context$muiTheme.tooltip;
    var styles = {
      root: {
        position: 'absolute',
        fontFamily: baseTheme.fontFamily,
        fontSize: '10px',
        lineHeight: '22px',
        padding: '0 8px',
        zIndex: zIndex.tooltip,
        color: tooltip.color,
        overflow: 'hidden',
        top: -10000,
        borderRadius: 2,
        userSelect: 'none',
        opacity: 0,
        right: horizontalPosition === 'left' ? 12 : null,
        left: horizontalPosition === 'center' ? (state.offsetWidth - 48) / 2 * -1 : null,
        transition: _transitions2.default.easeOut('0ms', 'top', '450ms') + ', ' + _transitions2.default.easeOut('450ms', 'transform', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'opacity', '0ms')
      },
      label: {
        position: 'relative',
        whiteSpace: 'nowrap'
      },
      ripple: {
        position: 'absolute',
        left: horizontalPosition === 'center' ? '50%' : horizontalPosition === 'left' ? '100%' : '0%',
        top: verticalPosition === 'bottom' ? 0 : '100%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition: _transitions2.default.easeOut('0ms', 'width', '450ms') + ', ' + _transitions2.default.easeOut('0ms', 'height', '450ms') + ', ' + _transitions2.default.easeOut('450ms', 'backgroundColor', '0ms')
      },
      rootWhenShown: {
        top: verticalPosition === 'top' ? touchOffsetTop : 36,
        opacity: 0.9,
        transform: 'translate3d(0px, ' + offset + 'px, 0px)',
        transition: _transitions2.default.easeOut('0ms', 'top', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'transform', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'opacity', '0ms')
      },
      rootWhenTouched: {
        fontSize: '14px',
        lineHeight: '32px',
        padding: '0 16px'
      },
      rippleWhenShown: {
        backgroundColor: tooltip.rippleBackgroundColor,
        transition: _transitions2.default.easeOut('450ms', 'width', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'height', '0ms') + ', ' + _transitions2.default.easeOut('450ms', 'backgroundColor', '0ms')
      }
    };
    return styles;
  }
  var Tooltip = function(_Component) {
    _inherits(Tooltip, _Component);
    function Tooltip() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, Tooltip);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Tooltip)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {offsetWidth: null}, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(Tooltip, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setRippleSize();
        this.setTooltipPosition();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps() {
        this.setTooltipPosition();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.setRippleSize();
      }
    }, {
      key: 'setRippleSize',
      value: function setRippleSize() {
        var ripple = this.refs.ripple;
        var tooltip = this.refs.tooltip;
        var tooltipWidth = parseInt(tooltip.offsetWidth, 10) / (this.props.horizontalPosition === 'center' ? 2 : 1);
        var tooltipHeight = parseInt(tooltip.offsetHeight, 10);
        var rippleDiameter = Math.ceil(Math.sqrt(Math.pow(tooltipHeight, 2) + Math.pow(tooltipWidth, 2)) * 2);
        if (this.props.show) {
          ripple.style.height = rippleDiameter + 'px';
          ripple.style.width = rippleDiameter + 'px';
        } else {
          ripple.style.width = '0px';
          ripple.style.height = '0px';
        }
      }
    }, {
      key: 'setTooltipPosition',
      value: function setTooltipPosition() {
        this.setState({offsetWidth: this.refs.tooltip.offsetWidth});
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var horizontalPosition = _props.horizontalPosition;
        var label = _props.label;
        var show = _props.show;
        var touch = _props.touch;
        var verticalPosition = _props.verticalPosition;
        var other = _objectWithoutProperties(_props, ['horizontalPosition', 'label', 'show', 'touch', 'verticalPosition']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context, this.state);
        return _react2.default.createElement('div', _extends({}, other, {
          ref: 'tooltip',
          style: prepareStyles((0, _simpleAssign2.default)(styles.root, this.props.show && styles.rootWhenShown, this.props.touch && styles.rootWhenTouched, this.props.style))
        }), _react2.default.createElement('div', {
          ref: 'ripple',
          style: prepareStyles((0, _simpleAssign2.default)(styles.ripple, this.props.show && styles.rippleWhenShown))
        }), _react2.default.createElement('span', {style: prepareStyles(styles.label)}, label));
      }
    }]);
    return Tooltip;
  }(_react.Component);
  Tooltip.propTypes = {
    className: _react.PropTypes.string,
    horizontalPosition: _react.PropTypes.oneOf(['left', 'right', 'center']),
    label: _react.PropTypes.node.isRequired,
    show: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    touch: _react.PropTypes.bool,
    verticalPosition: _react.PropTypes.oneOf(['top', 'bottom'])
  };
  Tooltip.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = Tooltip;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactFragment.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactChildren.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactChildren = $__require('npm:react@15.2.1/lib/ReactChildren.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var numericPropertyRegex = /^\d+$/;
    var warnedAboutNumeric = false;
    var ReactFragment = {create: function(object) {
        if (typeof object !== 'object' || !object || Array.isArray(object)) {
          "production" !== 'production' ? warning(false, 'React.addons.createFragment only accepts a single object. Got: %s', object) : void 0;
          return object;
        }
        if (ReactElement.isValidElement(object)) {
          "production" !== 'production' ? warning(false, 'React.addons.createFragment does not accept a ReactElement ' + 'without a wrapper object.') : void 0;
          return object;
        }
        !(object.nodeType !== 1) ? "production" !== 'production' ? invariant(false, 'React.addons.createFragment(...): Encountered an invalid child; DOM elements are not valid children of React components.') : _prodInvariant('0') : void 0;
        var result = [];
        for (var key in object) {
          if ("production" !== 'production') {
            if (!warnedAboutNumeric && numericPropertyRegex.test(key)) {
              "production" !== 'production' ? warning(false, 'React.addons.createFragment(...): Child objects should have ' + 'non-numeric keys so ordering is preserved.') : void 0;
              warnedAboutNumeric = true;
            }
          }
          ReactChildren.mapIntoWithKeyPrefixInternal(object[key], result, key, emptyFunction.thatReturnsArgument);
        }
        return result;
      }};
    module.exports = ReactFragment;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-addons-create-fragment@15.2.1/index.js", ["npm:react@15.2.1/lib/ReactFragment.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react@15.2.1/lib/ReactFragment.js').create;
  return module.exports;
});

System.registerDynamic("npm:react-addons-create-fragment@15.2.1.js", ["npm:react-addons-create-fragment@15.2.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react-addons-create-fragment@15.2.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/childUtils.js", ["npm:react@15.2.1.js", "npm:react-addons-create-fragment@15.2.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.createChildFragment = createChildFragment;
  exports.extendChildren = extendChildren;
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _reactAddonsCreateFragment = $__require('npm:react-addons-create-fragment@15.2.1.js');
  var _reactAddonsCreateFragment2 = _interopRequireDefault(_reactAddonsCreateFragment);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function createChildFragment(fragments) {
    var newFragments = {};
    var validChildrenCount = 0;
    var firstKey = void 0;
    for (var key in fragments) {
      var currentChild = fragments[key];
      if (currentChild) {
        if (validChildrenCount === 0)
          firstKey = key;
        newFragments[key] = currentChild;
        validChildrenCount++;
      }
    }
    if (validChildrenCount === 0)
      return undefined;
    if (validChildrenCount === 1)
      return newFragments[firstKey];
    return (0, _reactAddonsCreateFragment2.default)(newFragments);
  }
  function extendChildren(children, extendedProps, extendedChildren) {
    return _react2.default.isValidElement(children) ? _react2.default.Children.map(children, function(child) {
      var newProps = typeof extendedProps === 'function' ? extendedProps(child) : extendedProps;
      var newChildren = typeof extendedChildren === 'function' ? extendedChildren(child) : extendedChildren ? extendedChildren : child.props.children;
      return _react2.default.cloneElement(child, newProps, newChildren);
    }) : children;
  }
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/IconButton/IconButton.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/styles/transitions.js", "npm:material-ui@0.15.2/utils/propTypes.js", "npm:material-ui@0.15.2/internal/EnhancedButton.js", "npm:material-ui@0.15.2/FontIcon/index.js", "npm:material-ui@0.15.2/internal/Tooltip.js", "npm:material-ui@0.15.2/utils/childUtils.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  var _propTypes = $__require('npm:material-ui@0.15.2/utils/propTypes.js');
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var _EnhancedButton = $__require('npm:material-ui@0.15.2/internal/EnhancedButton.js');
  var _EnhancedButton2 = _interopRequireDefault(_EnhancedButton);
  var _FontIcon = $__require('npm:material-ui@0.15.2/FontIcon/index.js');
  var _FontIcon2 = _interopRequireDefault(_FontIcon);
  var _Tooltip = $__require('npm:material-ui@0.15.2/internal/Tooltip.js');
  var _Tooltip2 = _interopRequireDefault(_Tooltip);
  var _childUtils = $__require('npm:material-ui@0.15.2/utils/childUtils.js');
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function getStyles(props, context) {
    var baseTheme = context.muiTheme.baseTheme;
    return {
      root: {
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'visible',
        transition: _transitions2.default.easeOut(),
        padding: baseTheme.spacing.iconSize / 2,
        width: baseTheme.spacing.iconSize * 2,
        height: baseTheme.spacing.iconSize * 2,
        fontSize: 0
      },
      tooltip: {boxSizing: 'border-box'},
      overlay: {
        position: 'relative',
        top: 0,
        width: '100%',
        height: '100%',
        background: baseTheme.palette.disabledColor
      },
      disabled: {
        color: baseTheme.palette.disabledColor,
        fill: baseTheme.palette.disabledColor,
        cursor: 'not-allowed'
      }
    };
  }
  var IconButton = function(_Component) {
    _inherits(IconButton, _Component);
    function IconButton() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, IconButton);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(IconButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {tooltipShown: false}, _this.handleBlur = function(event) {
        _this.hideTooltip();
        if (_this.props.onBlur)
          _this.props.onBlur(event);
      }, _this.handleFocus = function(event) {
        _this.showTooltip();
        if (_this.props.onFocus)
          _this.props.onFocus(event);
      }, _this.handleMouseLeave = function(event) {
        if (!_this.refs.button.isKeyboardFocused())
          _this.hideTooltip();
        if (_this.props.onMouseLeave)
          _this.props.onMouseLeave(event);
      }, _this.handleMouseOut = function(event) {
        if (_this.props.disabled)
          _this.hideTooltip();
        if (_this.props.onMouseOut)
          _this.props.onMouseOut(event);
      }, _this.handleMouseEnter = function(event) {
        _this.showTooltip();
        if (_this.props.onMouseEnter)
          _this.props.onMouseEnter(event);
      }, _this.handleKeyboardFocus = function(event, keyboardFocused) {
        if (keyboardFocused && !_this.props.disabled) {
          _this.showTooltip();
          if (_this.props.onFocus)
            _this.props.onFocus(event);
        } else if (!_this.state.hovered) {
          _this.hideTooltip();
          if (_this.props.onBlur)
            _this.props.onBlur(event);
        }
        if (_this.props.onKeyboardFocus) {
          _this.props.onKeyboardFocus(event, keyboardFocused);
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(IconButton, [{
      key: 'setKeyboardFocus',
      value: function setKeyboardFocus() {
        this.refs.button.setKeyboardFocus();
      }
    }, {
      key: 'showTooltip',
      value: function showTooltip() {
        if (this.props.tooltip) {
          this.setState({tooltipShown: true});
        }
      }
    }, {
      key: 'hideTooltip',
      value: function hideTooltip() {
        if (this.props.tooltip)
          this.setState({tooltipShown: false});
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props;
        var disabled = _props.disabled;
        var disableTouchRipple = _props.disableTouchRipple;
        var children = _props.children;
        var iconClassName = _props.iconClassName;
        var onKeyboardFocus = _props.onKeyboardFocus;
        var tooltip = _props.tooltip;
        var tooltipPositionProp = _props.tooltipPosition;
        var touch = _props.touch;
        var iconStyle = _props.iconStyle;
        var other = _objectWithoutProperties(_props, ['disabled', 'disableTouchRipple', 'children', 'iconClassName', 'onKeyboardFocus', 'tooltip', 'tooltipPosition', 'touch', 'iconStyle']);
        var fonticon = void 0;
        var styles = getStyles(this.props, this.context);
        var tooltipPosition = tooltipPositionProp.split('-');
        var tooltipElement = tooltip ? _react2.default.createElement(_Tooltip2.default, {
          ref: 'tooltip',
          label: tooltip,
          show: this.state.tooltipShown,
          touch: touch,
          style: (0, _simpleAssign2.default)(styles.tooltip, this.props.tooltipStyles),
          verticalPosition: tooltipPosition[0],
          horizontalPosition: tooltipPosition[1]
        }) : null;
        if (iconClassName) {
          var iconHoverColor = iconStyle.iconHoverColor;
          var iconStyleFontIcon = _objectWithoutProperties(iconStyle, ['iconHoverColor']);
          fonticon = _react2.default.createElement(_FontIcon2.default, {
            className: iconClassName,
            hoverColor: disabled ? null : iconHoverColor,
            style: (0, _simpleAssign2.default)({}, disabled && styles.disabled, iconStyleFontIcon),
            color: this.context.muiTheme.baseTheme.palette.textColor
          }, children);
        }
        var childrenStyle = disabled ? (0, _simpleAssign2.default)({}, iconStyle, styles.disabled) : iconStyle;
        return _react2.default.createElement(_EnhancedButton2.default, _extends({}, other, {
          ref: 'button',
          centerRipple: true,
          disabled: disabled,
          style: (0, _simpleAssign2.default)(styles.root, this.props.style),
          disableTouchRipple: disableTouchRipple,
          onBlur: this.handleBlur,
          onFocus: this.handleFocus,
          onMouseLeave: this.handleMouseLeave,
          onMouseEnter: this.handleMouseEnter,
          onMouseOut: this.handleMouseOut,
          onKeyboardFocus: this.handleKeyboardFocus
        }), tooltipElement, fonticon, (0, _childUtils.extendChildren)(children, {style: childrenStyle}));
      }
    }]);
    return IconButton;
  }(_react.Component);
  IconButton.muiName = 'IconButton';
  IconButton.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disableTouchRipple: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    href: _react.PropTypes.string,
    iconClassName: _react.PropTypes.string,
    iconStyle: _react.PropTypes.object,
    onBlur: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onKeyboardFocus: _react.PropTypes.func,
    onMouseEnter: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    onMouseOut: _react.PropTypes.func,
    style: _react.PropTypes.object,
    tooltip: _react.PropTypes.node,
    tooltipPosition: _propTypes2.default.cornersAndCenter,
    tooltipStyles: _react.PropTypes.object,
    touch: _react.PropTypes.bool
  };
  IconButton.defaultProps = {
    disabled: false,
    disableTouchRipple: false,
    iconStyle: {},
    tooltipPosition: 'bottom-center',
    touch: false
  };
  IconButton.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = IconButton;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/IconButton/index.js", ["npm:material-ui@0.15.2/IconButton/IconButton.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = undefined;
  var _IconButton = $__require('npm:material-ui@0.15.2/IconButton/IconButton.js');
  var _IconButton2 = _interopRequireDefault(_IconButton);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _IconButton2.default;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/utils/createEagerElementUtil.js", ["npm:react@15.2.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var createEagerElementUtil = function createEagerElementUtil(hasKey, isReferentiallyTransparent, type, props, children) {
    if (!hasKey && isReferentiallyTransparent) {
      if (children) {
        return type(_extends({}, props, {children: children}));
      }
      return type(props);
    }
    var Component = type;
    if (children) {
      return _react2.default.createElement(Component, props, children);
    }
    return _react2.default.createElement(Component, props);
  };
  exports.default = createEagerElementUtil;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/isClassComponent.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var isClassComponent = function isClassComponent(Component) {
    return Boolean(Component && Component.prototype && typeof Component.prototype.isReactComponent === 'object');
  };
  exports.default = isClassComponent;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/isReferentiallyTransparentFunctionComponent.js", ["npm:recompose@0.20.2/isClassComponent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _isClassComponent = $__require('npm:recompose@0.20.2/isClassComponent.js');
  var _isClassComponent2 = _interopRequireDefault(_isClassComponent);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var isReferentiallyTransparentFunctionComponent = function isReferentiallyTransparentFunctionComponent(Component) {
    return Boolean(typeof Component === 'function' && !(0, _isClassComponent2.default)(Component) && !Component.defaultProps && !Component.contextTypes && !Component.propTypes);
  };
  exports.default = isReferentiallyTransparentFunctionComponent;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/createEagerFactory.js", ["npm:recompose@0.20.2/utils/createEagerElementUtil.js", "npm:recompose@0.20.2/isReferentiallyTransparentFunctionComponent.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _createEagerElementUtil = $__require('npm:recompose@0.20.2/utils/createEagerElementUtil.js');
  var _createEagerElementUtil2 = _interopRequireDefault(_createEagerElementUtil);
  var _isReferentiallyTransparentFunctionComponent = $__require('npm:recompose@0.20.2/isReferentiallyTransparentFunctionComponent.js');
  var _isReferentiallyTransparentFunctionComponent2 = _interopRequireDefault(_isReferentiallyTransparentFunctionComponent);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var createFactory = function createFactory(type) {
    var isReferentiallyTransparent = (0, _isReferentiallyTransparentFunctionComponent2.default)(type);
    return function(p, c) {
      return (0, _createEagerElementUtil2.default)(false, isReferentiallyTransparent, type, p, c);
    };
  };
  exports.default = createFactory;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/shouldUpdate.js", ["npm:react@15.2.1.js", "npm:recompose@0.20.2/createHelper.js", "npm:recompose@0.20.2/createEagerFactory.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _react = $__require('npm:react@15.2.1.js');
  var _createHelper = $__require('npm:recompose@0.20.2/createHelper.js');
  var _createHelper2 = _interopRequireDefault(_createHelper);
  var _createEagerFactory = $__require('npm:recompose@0.20.2/createEagerFactory.js');
  var _createEagerFactory2 = _interopRequireDefault(_createEagerFactory);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var shouldUpdate = function shouldUpdate(test) {
    return function(BaseComponent) {
      var factory = (0, _createEagerFactory2.default)(BaseComponent);
      return function(_Component) {
        _inherits(_class, _Component);
        function _class() {
          _classCallCheck(this, _class);
          return _possibleConstructorReturn(this, _Component.apply(this, arguments));
        }
        _class.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
          return test(this.props, nextProps);
        };
        _class.prototype.render = function render() {
          return factory(this.props);
        };
        return _class;
      }(_react.Component);
    };
  };
  exports.default = (0, _createHelper2.default)(shouldUpdate, 'shouldUpdate');
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/shallowEqual.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }
  function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
      return true;
    }
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  }
  module.exports = shallowEqual;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/shallowEqual.js", ["npm:fbjs@0.8.3/lib/shallowEqual.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _shallowEqual = $__require('npm:fbjs@0.8.3/lib/shallowEqual.js');
  var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _shallowEqual2.default;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/getDisplayName.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var getDisplayName = function getDisplayName(Component) {
    if (typeof Component === 'string') {
      return Component;
    }
    if (!Component) {
      return undefined;
    }
    return Component.displayName || Component.name || 'Component';
  };
  exports.default = getDisplayName;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/wrapDisplayName.js", ["npm:recompose@0.20.2/getDisplayName.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _getDisplayName = $__require('npm:recompose@0.20.2/getDisplayName.js');
  var _getDisplayName2 = _interopRequireDefault(_getDisplayName);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
    return hocName + '(' + (0, _getDisplayName2.default)(BaseComponent) + ')';
  };
  exports.default = wrapDisplayName;
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/createHelper.js", ["npm:recompose@0.20.2/wrapDisplayName.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    exports.__esModule = true;
    var createHelper = function createHelper(func, helperName) {
      var setDisplayName = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
      var noArgs = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
      if ("production" !== 'production' && setDisplayName) {
        var _ret = function() {
          var wrapDisplayName = $__require('npm:recompose@0.20.2/wrapDisplayName.js').default;
          if (noArgs) {
            return {v: function v(BaseComponent) {
                var Component = func(BaseComponent);
                Component.displayName = wrapDisplayName(BaseComponent, helperName);
                return Component;
              }};
          }
          return {v: function v() {
              for (var _len = arguments.length,
                  args = Array(_len),
                  _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              if (args.length > func.length) {
                console.error('Too many arguments passed to ' + helperName + '(). It should called ' + ('like so: ' + helperName + '(...args)(BaseComponent).'));
              }
              return function(BaseComponent) {
                var Component = func.apply(undefined, args)(BaseComponent);
                Component.displayName = wrapDisplayName(BaseComponent, helperName);
                return Component;
              };
            }};
        }();
        if (typeof _ret === "object")
          return _ret.v;
      }
      return func;
    };
    exports.default = createHelper;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/pure.js", ["npm:recompose@0.20.2/shouldUpdate.js", "npm:recompose@0.20.2/shallowEqual.js", "npm:recompose@0.20.2/createHelper.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _shouldUpdate = $__require('npm:recompose@0.20.2/shouldUpdate.js');
  var _shouldUpdate2 = _interopRequireDefault(_shouldUpdate);
  var _shallowEqual = $__require('npm:recompose@0.20.2/shallowEqual.js');
  var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
  var _createHelper = $__require('npm:recompose@0.20.2/createHelper.js');
  var _createHelper2 = _interopRequireDefault(_createHelper);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var pure = (0, _shouldUpdate2.default)(function(props, nextProps) {
    return !(0, _shallowEqual2.default)(props, nextProps);
  });
  exports.default = (0, _createHelper2.default)(pure, 'pure', true, true);
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/SvgIcon/SvgIcon.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var SvgIcon = function(_Component) {
    _inherits(SvgIcon, _Component);
    function SvgIcon() {
      var _Object$getPrototypeO;
      var _temp,
          _this,
          _ret;
      _classCallCheck(this, SvgIcon);
      for (var _len = arguments.length,
          args = Array(_len),
          _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SvgIcon)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {hovered: false}, _this.handleMouseLeave = function(event) {
        _this.setState({hovered: false});
        _this.props.onMouseLeave(event);
      }, _this.handleMouseEnter = function(event) {
        _this.setState({hovered: true});
        _this.props.onMouseEnter(event);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    _createClass(SvgIcon, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var color = _props.color;
        var hoverColor = _props.hoverColor;
        var onMouseEnter = _props.onMouseEnter;
        var onMouseLeave = _props.onMouseLeave;
        var style = _props.style;
        var viewBox = _props.viewBox;
        var other = _objectWithoutProperties(_props, ['children', 'color', 'hoverColor', 'onMouseEnter', 'onMouseLeave', 'style', 'viewBox']);
        var _context$muiTheme = this.context.muiTheme;
        var svgIcon = _context$muiTheme.svgIcon;
        var prepareStyles = _context$muiTheme.prepareStyles;
        var offColor = color ? color : 'currentColor';
        var onColor = hoverColor ? hoverColor : offColor;
        var mergedStyles = (0, _simpleAssign2.default)({
          display: 'inline-block',
          color: svgIcon.color,
          fill: this.state.hovered ? onColor : offColor,
          height: 24,
          width: 24,
          userSelect: 'none',
          transition: _transitions2.default.easeOut()
        }, style);
        return _react2.default.createElement('svg', _extends({}, other, {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          style: prepareStyles(mergedStyles),
          viewBox: viewBox
        }), children);
      }
    }]);
    return SvgIcon;
  }(_react.Component);
  SvgIcon.muiName = 'SvgIcon';
  SvgIcon.propTypes = {
    children: _react.PropTypes.node,
    color: _react.PropTypes.string,
    hoverColor: _react.PropTypes.string,
    onMouseEnter: _react.PropTypes.func,
    onMouseLeave: _react.PropTypes.func,
    style: _react.PropTypes.object,
    viewBox: _react.PropTypes.string
  };
  SvgIcon.defaultProps = {
    onMouseEnter: function onMouseEnter() {},
    onMouseLeave: function onMouseLeave() {},
    viewBox: '0 0 24 24'
  };
  SvgIcon.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = SvgIcon;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/SvgIcon/index.js", ["npm:material-ui@0.15.2/SvgIcon/SvgIcon.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = undefined;
  var _SvgIcon = $__require('npm:material-ui@0.15.2/SvgIcon/SvgIcon.js');
  var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _SvgIcon2.default;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/svg-icons/navigation/menu.js", ["npm:react@15.2.1.js", "npm:recompose@0.20.2/pure.js", "npm:material-ui@0.15.2/SvgIcon/index.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _pure = $__require('npm:recompose@0.20.2/pure.js');
  var _pure2 = _interopRequireDefault(_pure);
  var _SvgIcon = $__require('npm:material-ui@0.15.2/SvgIcon/index.js');
  var _SvgIcon2 = _interopRequireDefault(_SvgIcon);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var NavigationMenu = function NavigationMenu(props) {
    return _react2.default.createElement(_SvgIcon2.default, props, _react2.default.createElement('path', {d: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z'}));
  };
  NavigationMenu = (0, _pure2.default)(NavigationMenu);
  NavigationMenu.displayName = 'NavigationMenu';
  NavigationMenu.muiName = 'SvgIcon';
  exports.default = NavigationMenu;
  return module.exports;
});

System.registerDynamic("npm:simple-assign@0.1.0/index.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return module.exports;
});

System.registerDynamic("npm:simple-assign@0.1.0.js", ["npm:simple-assign@0.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:simple-assign@0.1.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/transitions.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    easeOut: function easeOut(duration, property, delay, easeFunction) {
      easeFunction = easeFunction || this.easeOutFunction;
      if (property && Object.prototype.toString.call(property) === '[object Array]') {
        var transitions = '';
        for (var i = 0; i < property.length; i++) {
          if (transitions)
            transitions += ',';
          transitions += this.create(duration, property[i], delay, easeFunction);
        }
        return transitions;
      } else {
        return this.create(duration, property, delay, easeFunction);
      }
    },
    create: function create(duration, property, delay, easeFunction) {
      duration = duration || '450ms';
      property = property || 'all';
      delay = delay || '0ms';
      easeFunction = easeFunction || 'linear';
      return property + ' ' + duration + ' ' + easeFunction + ' ' + delay;
    }
  };
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/Paper/Paper.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/utils/propTypes.js", "npm:material-ui@0.15.2/styles/transitions.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
  var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
  var _react = $__require('npm:react@15.2.1.js');
  var _react2 = _interopRequireDefault(_react);
  var _propTypes = $__require('npm:material-ui@0.15.2/utils/propTypes.js');
  var _propTypes2 = _interopRequireDefault(_propTypes);
  var _transitions = $__require('npm:material-ui@0.15.2/styles/transitions.js');
  var _transitions2 = _interopRequireDefault(_transitions);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
      if (keys.indexOf(i) >= 0)
        continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i))
        continue;
      target[i] = obj[i];
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  function getStyles(props, context) {
    var rounded = props.rounded;
    var circle = props.circle;
    var transitionEnabled = props.transitionEnabled;
    var zDepth = props.zDepth;
    var _context$muiTheme = context.muiTheme;
    var baseTheme = _context$muiTheme.baseTheme;
    var paper = _context$muiTheme.paper;
    return {root: {
        color: paper.color,
        backgroundColor: paper.backgroundColor,
        transition: transitionEnabled && _transitions2.default.easeOut(),
        boxSizing: 'border-box',
        fontFamily: baseTheme.fontFamily,
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        boxShadow: paper.zDepthShadows[zDepth - 1],
        borderRadius: circle ? '50%' : rounded ? '2px' : '0px'
      }};
  }
  var Paper = function(_Component) {
    _inherits(Paper, _Component);
    function Paper() {
      _classCallCheck(this, Paper);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(Paper).apply(this, arguments));
    }
    _createClass(Paper, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var children = _props.children;
        var circle = _props.circle;
        var rounded = _props.rounded;
        var style = _props.style;
        var transitionEnabled = _props.transitionEnabled;
        var zDepth = _props.zDepth;
        var other = _objectWithoutProperties(_props, ['children', 'circle', 'rounded', 'style', 'transitionEnabled', 'zDepth']);
        var prepareStyles = this.context.muiTheme.prepareStyles;
        var styles = getStyles(this.props, this.context);
        return _react2.default.createElement('div', _extends({}, other, {style: prepareStyles((0, _simpleAssign2.default)(styles.root, style))}), children);
      }
    }]);
    return Paper;
  }(_react.Component);
  Paper.propTypes = {
    children: _react.PropTypes.node,
    circle: _react.PropTypes.bool,
    rounded: _react.PropTypes.bool,
    style: _react.PropTypes.object,
    transitionEnabled: _react.PropTypes.bool,
    zDepth: _propTypes2.default.zDepth
  };
  Paper.defaultProps = {
    circle: false,
    rounded: true,
    transitionEnabled: true,
    zDepth: 1
  };
  Paper.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = Paper;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/Paper/index.js", ["npm:material-ui@0.15.2/Paper/Paper.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = undefined;
  var _Paper = $__require('npm:material-ui@0.15.2/Paper/Paper.js');
  var _Paper2 = _interopRequireDefault(_Paper);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _Paper2.default;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/propTypes.js", ["npm:react@15.2.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _react = $__require('npm:react@15.2.1.js');
  var horizontal = _react.PropTypes.oneOf(['left', 'middle', 'right']);
  var vertical = _react.PropTypes.oneOf(['top', 'center', 'bottom']);
  exports.default = {
    corners: _react.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    horizontal: horizontal,
    vertical: vertical,
    origin: _react.PropTypes.shape({
      horizontal: horizontal,
      vertical: vertical
    }),
    cornersAndCenter: _react.PropTypes.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),
    stringOrNumber: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    zDepth: _react.PropTypes.oneOf([0, 1, 2, 3, 4, 5])
  };
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/AppBar/AppBar.js", ["npm:simple-assign@0.1.0.js", "npm:react@15.2.1.js", "npm:material-ui@0.15.2/IconButton/index.js", "npm:material-ui@0.15.2/svg-icons/navigation/menu.js", "npm:material-ui@0.15.2/Paper/index.js", "npm:material-ui@0.15.2/utils/propTypes.js", "npm:warning@3.0.0.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    exports.getStyles = getStyles;
    var _simpleAssign = $__require('npm:simple-assign@0.1.0.js');
    var _simpleAssign2 = _interopRequireDefault(_simpleAssign);
    var _react = $__require('npm:react@15.2.1.js');
    var _react2 = _interopRequireDefault(_react);
    var _IconButton = $__require('npm:material-ui@0.15.2/IconButton/index.js');
    var _IconButton2 = _interopRequireDefault(_IconButton);
    var _menu = $__require('npm:material-ui@0.15.2/svg-icons/navigation/menu.js');
    var _menu2 = _interopRequireDefault(_menu);
    var _Paper = $__require('npm:material-ui@0.15.2/Paper/index.js');
    var _Paper2 = _interopRequireDefault(_Paper);
    var _propTypes = $__require('npm:material-ui@0.15.2/utils/propTypes.js');
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _warning = $__require('npm:warning@3.0.0.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function getStyles(props, context) {
      var _context$muiTheme = context.muiTheme;
      var appBar = _context$muiTheme.appBar;
      var iconButtonSize = _context$muiTheme.button.iconButtonSize;
      var zIndex = _context$muiTheme.zIndex;
      var flatButtonSize = 36;
      var styles = {
        root: {
          position: 'relative',
          zIndex: zIndex.appBar,
          width: '100%',
          display: 'flex',
          backgroundColor: appBar.color,
          paddingLeft: appBar.padding,
          paddingRight: appBar.padding
        },
        title: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          margin: 0,
          paddingTop: 0,
          letterSpacing: 0,
          fontSize: 24,
          fontWeight: appBar.titleFontWeight,
          color: appBar.textColor,
          height: appBar.height,
          lineHeight: appBar.height + 'px'
        },
        mainElement: {
          boxFlex: 1,
          flex: '1'
        },
        iconButtonStyle: {
          marginTop: (appBar.height - iconButtonSize) / 2,
          marginRight: 8,
          marginLeft: -16
        },
        iconButtonIconStyle: {
          fill: appBar.textColor,
          color: appBar.textColor
        },
        flatButton: {
          color: appBar.textColor,
          marginTop: (iconButtonSize - flatButtonSize) / 2 + 1
        }
      };
      return styles;
    }
    var AppBar = function(_Component) {
      _inherits(AppBar, _Component);
      function AppBar() {
        var _Object$getPrototypeO;
        var _temp,
            _this,
            _ret;
        _classCallCheck(this, AppBar);
        for (var _len = arguments.length,
            args = Array(_len),
            _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(AppBar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleTouchTapLeftIconButton = function(event) {
          if (_this.props.onLeftIconButtonTouchTap) {
            _this.props.onLeftIconButtonTouchTap(event);
          }
        }, _this.handleTouchTapRightIconButton = function(event) {
          if (_this.props.onRightIconButtonTouchTap) {
            _this.props.onRightIconButtonTouchTap(event);
          }
        }, _this.handleTitleTouchTap = function(event) {
          if (_this.props.onTitleTouchTap) {
            _this.props.onTitleTouchTap(event);
          }
        }, _temp), _possibleConstructorReturn(_this, _ret);
      }
      _createClass(AppBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          "production" !== "production" ? (0, _warning2.default)(!this.props.iconElementLeft || !this.props.iconClassNameLeft, 'Properties iconElementLeft\n      and iconClassNameLeft cannot be simultaneously defined. Please use one or the other.') : void 0;
          "production" !== "production" ? (0, _warning2.default)(!this.props.iconElementRight || !this.props.iconClassNameRight, 'Properties iconElementRight\n      and iconClassNameRight cannot be simultaneously defined. Please use one or the other.') : void 0;
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props;
          var title = _props.title;
          var titleStyle = _props.titleStyle;
          var iconStyleLeft = _props.iconStyleLeft;
          var iconStyleRight = _props.iconStyleRight;
          var onTitleTouchTap = _props.onTitleTouchTap;
          var showMenuIconButton = _props.showMenuIconButton;
          var iconElementLeft = _props.iconElementLeft;
          var iconElementRight = _props.iconElementRight;
          var iconClassNameLeft = _props.iconClassNameLeft;
          var iconClassNameRight = _props.iconClassNameRight;
          var onLeftIconButtonTouchTap = _props.onLeftIconButtonTouchTap;
          var className = _props.className;
          var style = _props.style;
          var zDepth = _props.zDepth;
          var children = _props.children;
          var other = _objectWithoutProperties(_props, ['title', 'titleStyle', 'iconStyleLeft', 'iconStyleRight', 'onTitleTouchTap', 'showMenuIconButton', 'iconElementLeft', 'iconElementRight', 'iconClassNameLeft', 'iconClassNameRight', 'onLeftIconButtonTouchTap', 'className', 'style', 'zDepth', 'children']);
          var prepareStyles = this.context.muiTheme.prepareStyles;
          var styles = getStyles(this.props, this.context);
          var menuElementLeft = void 0;
          var menuElementRight = void 0;
          var titleComponent = typeof title === 'string' || title instanceof String ? 'h1' : 'div';
          var titleElement = _react2.default.createElement(titleComponent, {
            onTouchTap: this.handleTitleTouchTap,
            style: prepareStyles((0, _simpleAssign2.default)(styles.title, styles.mainElement, titleStyle))
          }, title);
          var iconLeftStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, iconStyleLeft);
          if (showMenuIconButton) {
            var iconElementLeftNode = iconElementLeft;
            if (iconElementLeft) {
              if (iconElementLeft.type.muiName === 'IconButton') {
                var iconElemLeftChildren = iconElementLeft.props.children;
                var iconButtonIconStyle = !(iconElemLeftChildren && iconElemLeftChildren.props && iconElemLeftChildren.props.color) ? styles.iconButtonIconStyle : null;
                iconElementLeftNode = _react2.default.cloneElement(iconElementLeft, {iconStyle: (0, _simpleAssign2.default)({}, iconButtonIconStyle, iconElementLeft.props.iconStyle)});
              }
              menuElementLeft = _react2.default.createElement('div', {style: prepareStyles(iconLeftStyle)}, iconElementLeftNode);
            } else {
              var child = iconClassNameLeft ? '' : _react2.default.createElement(_menu2.default, {style: (0, _simpleAssign2.default)({}, styles.iconButtonIconStyle)});
              menuElementLeft = _react2.default.createElement(_IconButton2.default, {
                style: iconLeftStyle,
                iconStyle: styles.iconButtonIconStyle,
                iconClassName: iconClassNameLeft,
                onTouchTap: this.handleTouchTapLeftIconButton
              }, child);
            }
          }
          var iconRightStyle = (0, _simpleAssign2.default)({}, styles.iconButtonStyle, {
            marginRight: -16,
            marginLeft: 'auto'
          }, iconStyleRight);
          if (iconElementRight) {
            var iconElementRightNode = iconElementRight;
            switch (iconElementRight.type.muiName) {
              case 'IconMenu':
              case 'IconButton':
                var iconElemRightChildren = iconElementRight.props.children;
                var _iconButtonIconStyle = !(iconElemRightChildren && iconElemRightChildren.props && iconElemRightChildren.props.color) ? styles.iconButtonIconStyle : null;
                iconElementRightNode = _react2.default.cloneElement(iconElementRight, {iconStyle: (0, _simpleAssign2.default)({}, _iconButtonIconStyle, iconElementRight.props.iconStyle)});
                break;
              case 'FlatButton':
                iconElementRightNode = _react2.default.cloneElement(iconElementRight, {style: (0, _simpleAssign2.default)({}, styles.flatButton, iconElementRight.props.style)});
                break;
              default:
            }
            menuElementRight = _react2.default.createElement('div', {style: prepareStyles(iconRightStyle)}, iconElementRightNode);
          } else if (iconClassNameRight) {
            menuElementRight = _react2.default.createElement(_IconButton2.default, {
              style: iconRightStyle,
              iconStyle: styles.iconButtonIconStyle,
              iconClassName: iconClassNameRight,
              onTouchTap: this.handleTouchTapRightIconButton
            });
          }
          return _react2.default.createElement(_Paper2.default, _extends({}, other, {
            rounded: false,
            className: className,
            style: (0, _simpleAssign2.default)({}, styles.root, style),
            zDepth: zDepth
          }), menuElementLeft, titleElement, menuElementRight, children);
        }
      }]);
      return AppBar;
    }(_react.Component);
    AppBar.muiName = 'AppBar';
    AppBar.propTypes = {
      children: _react.PropTypes.node,
      className: _react.PropTypes.string,
      iconClassNameLeft: _react.PropTypes.string,
      iconClassNameRight: _react.PropTypes.string,
      iconElementLeft: _react.PropTypes.element,
      iconElementRight: _react.PropTypes.element,
      iconStyleLeft: _react.PropTypes.object,
      iconStyleRight: _react.PropTypes.object,
      onLeftIconButtonTouchTap: _react.PropTypes.func,
      onRightIconButtonTouchTap: _react.PropTypes.func,
      onTitleTouchTap: _react.PropTypes.func,
      showMenuIconButton: _react.PropTypes.bool,
      style: _react.PropTypes.object,
      title: _react.PropTypes.node,
      titleStyle: _react.PropTypes.object,
      zDepth: _propTypes2.default.zDepth
    };
    AppBar.defaultProps = {
      showMenuIconButton: true,
      title: '',
      zDepth: 1
    };
    AppBar.contextTypes = {muiTheme: _react.PropTypes.object.isRequired};
    exports.default = AppBar;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/AppBar/index.js", ["npm:material-ui@0.15.2/AppBar/AppBar.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = undefined;
  var _AppBar = $__require('npm:material-ui@0.15.2/AppBar/AppBar.js');
  var _AppBar2 = _interopRequireDefault(_AppBar);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = _AppBar2.default;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/AppBar.js", ["npm:material-ui@0.15.2/AppBar/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:material-ui@0.15.2/AppBar/index.js');
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_assignMergeValue.js", ["npm:lodash@4.13.1/eq.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var eq = $__require('npm:lodash@4.13.1/eq.js');
  function assignMergeValue(object, key, value) {
    if ((value !== undefined && !eq(object[key], value)) || (typeof key == 'number' && value === undefined && !(key in object))) {
      object[key] = value;
    }
  }
  module.exports = assignMergeValue;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_stackClear.js", ["npm:lodash@4.13.1/_ListCache.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ListCache = $__require('npm:lodash@4.13.1/_ListCache.js');
  function stackClear() {
    this.__data__ = new ListCache;
  }
  module.exports = stackClear;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_stackDelete.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function stackDelete(key) {
    return this.__data__['delete'](key);
  }
  module.exports = stackDelete;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_stackGet.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  module.exports = stackGet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_stackHas.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  module.exports = stackHas;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_hashClear.js", ["npm:lodash@4.13.1/_nativeCreate.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeCreate = $__require('npm:lodash@4.13.1/_nativeCreate.js');
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  module.exports = hashClear;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_hashDelete.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  module.exports = hashDelete;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_hashGet.js", ["npm:lodash@4.13.1/_nativeCreate.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeCreate = $__require('npm:lodash@4.13.1/_nativeCreate.js');
  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }
  module.exports = hashGet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_hashHas.js", ["npm:lodash@4.13.1/_nativeCreate.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeCreate = $__require('npm:lodash@4.13.1/_nativeCreate.js');
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }
  module.exports = hashHas;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_nativeCreate.js", ["npm:lodash@4.13.1/_getNative.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js');
  var nativeCreate = getNative(Object, 'create');
  module.exports = nativeCreate;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_hashSet.js", ["npm:lodash@4.13.1/_nativeCreate.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeCreate = $__require('npm:lodash@4.13.1/_nativeCreate.js');
  var HASH_UNDEFINED = '__lodash_hash_undefined__';
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
    return this;
  }
  module.exports = hashSet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Hash.js", ["npm:lodash@4.13.1/_hashClear.js", "npm:lodash@4.13.1/_hashDelete.js", "npm:lodash@4.13.1/_hashGet.js", "npm:lodash@4.13.1/_hashHas.js", "npm:lodash@4.13.1/_hashSet.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hashClear = $__require('npm:lodash@4.13.1/_hashClear.js'),
      hashDelete = $__require('npm:lodash@4.13.1/_hashDelete.js'),
      hashGet = $__require('npm:lodash@4.13.1/_hashGet.js'),
      hashHas = $__require('npm:lodash@4.13.1/_hashHas.js'),
      hashSet = $__require('npm:lodash@4.13.1/_hashSet.js');
  function Hash(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  module.exports = Hash;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_listCacheClear.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function listCacheClear() {
    this.__data__ = [];
  }
  module.exports = listCacheClear;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_listCacheDelete.js", ["npm:lodash@4.13.1/_assocIndexOf.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assocIndexOf = $__require('npm:lodash@4.13.1/_assocIndexOf.js');
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  module.exports = listCacheDelete;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_listCacheGet.js", ["npm:lodash@4.13.1/_assocIndexOf.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assocIndexOf = $__require('npm:lodash@4.13.1/_assocIndexOf.js');
  function listCacheGet(key) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }
  module.exports = listCacheGet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_listCacheHas.js", ["npm:lodash@4.13.1/_assocIndexOf.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assocIndexOf = $__require('npm:lodash@4.13.1/_assocIndexOf.js');
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  module.exports = listCacheHas;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_assocIndexOf.js", ["npm:lodash@4.13.1/eq.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var eq = $__require('npm:lodash@4.13.1/eq.js');
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  module.exports = assocIndexOf;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_listCacheSet.js", ["npm:lodash@4.13.1/_assocIndexOf.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assocIndexOf = $__require('npm:lodash@4.13.1/_assocIndexOf.js');
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  module.exports = listCacheSet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_ListCache.js", ["npm:lodash@4.13.1/_listCacheClear.js", "npm:lodash@4.13.1/_listCacheDelete.js", "npm:lodash@4.13.1/_listCacheGet.js", "npm:lodash@4.13.1/_listCacheHas.js", "npm:lodash@4.13.1/_listCacheSet.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var listCacheClear = $__require('npm:lodash@4.13.1/_listCacheClear.js'),
      listCacheDelete = $__require('npm:lodash@4.13.1/_listCacheDelete.js'),
      listCacheGet = $__require('npm:lodash@4.13.1/_listCacheGet.js'),
      listCacheHas = $__require('npm:lodash@4.13.1/_listCacheHas.js'),
      listCacheSet = $__require('npm:lodash@4.13.1/_listCacheSet.js');
  function ListCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  module.exports = ListCache;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapCacheClear.js", ["npm:lodash@4.13.1/_Hash.js", "npm:lodash@4.13.1/_ListCache.js", "npm:lodash@4.13.1/_Map.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Hash = $__require('npm:lodash@4.13.1/_Hash.js'),
      ListCache = $__require('npm:lodash@4.13.1/_ListCache.js'),
      Map = $__require('npm:lodash@4.13.1/_Map.js');
  function mapCacheClear() {
    this.__data__ = {
      'hash': new Hash,
      'map': new (Map || ListCache),
      'string': new Hash
    };
  }
  module.exports = mapCacheClear;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapCacheDelete.js", ["npm:lodash@4.13.1/_getMapData.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getMapData = $__require('npm:lodash@4.13.1/_getMapData.js');
  function mapCacheDelete(key) {
    return getMapData(this, key)['delete'](key);
  }
  module.exports = mapCacheDelete;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapCacheGet.js", ["npm:lodash@4.13.1/_getMapData.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getMapData = $__require('npm:lodash@4.13.1/_getMapData.js');
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  module.exports = mapCacheGet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapCacheHas.js", ["npm:lodash@4.13.1/_getMapData.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getMapData = $__require('npm:lodash@4.13.1/_getMapData.js');
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  module.exports = mapCacheHas;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isKeyable.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean') ? (value !== '__proto__') : (value === null);
  }
  module.exports = isKeyable;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getMapData.js", ["npm:lodash@4.13.1/_isKeyable.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isKeyable = $__require('npm:lodash@4.13.1/_isKeyable.js');
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }
  module.exports = getMapData;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapCacheSet.js", ["npm:lodash@4.13.1/_getMapData.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getMapData = $__require('npm:lodash@4.13.1/_getMapData.js');
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  module.exports = mapCacheSet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_MapCache.js", ["npm:lodash@4.13.1/_mapCacheClear.js", "npm:lodash@4.13.1/_mapCacheDelete.js", "npm:lodash@4.13.1/_mapCacheGet.js", "npm:lodash@4.13.1/_mapCacheHas.js", "npm:lodash@4.13.1/_mapCacheSet.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var mapCacheClear = $__require('npm:lodash@4.13.1/_mapCacheClear.js'),
      mapCacheDelete = $__require('npm:lodash@4.13.1/_mapCacheDelete.js'),
      mapCacheGet = $__require('npm:lodash@4.13.1/_mapCacheGet.js'),
      mapCacheHas = $__require('npm:lodash@4.13.1/_mapCacheHas.js'),
      mapCacheSet = $__require('npm:lodash@4.13.1/_mapCacheSet.js');
  function MapCache(entries) {
    var index = -1,
        length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  module.exports = MapCache;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_stackSet.js", ["npm:lodash@4.13.1/_ListCache.js", "npm:lodash@4.13.1/_MapCache.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ListCache = $__require('npm:lodash@4.13.1/_ListCache.js'),
      MapCache = $__require('npm:lodash@4.13.1/_MapCache.js');
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
      cache = this.__data__ = new MapCache(cache.__data__);
    }
    cache.set(key, value);
    return this;
  }
  module.exports = stackSet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Stack.js", ["npm:lodash@4.13.1/_ListCache.js", "npm:lodash@4.13.1/_stackClear.js", "npm:lodash@4.13.1/_stackDelete.js", "npm:lodash@4.13.1/_stackGet.js", "npm:lodash@4.13.1/_stackHas.js", "npm:lodash@4.13.1/_stackSet.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ListCache = $__require('npm:lodash@4.13.1/_ListCache.js'),
      stackClear = $__require('npm:lodash@4.13.1/_stackClear.js'),
      stackDelete = $__require('npm:lodash@4.13.1/_stackDelete.js'),
      stackGet = $__require('npm:lodash@4.13.1/_stackGet.js'),
      stackHas = $__require('npm:lodash@4.13.1/_stackHas.js'),
      stackSet = $__require('npm:lodash@4.13.1/_stackSet.js');
  function Stack(entries) {
    this.__data__ = new ListCache(entries);
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  module.exports = Stack;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_arrayEach.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  module.exports = arrayEach;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseAssign.js", ["npm:lodash@4.13.1/_copyObject.js", "npm:lodash@4.13.1/keys.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var copyObject = $__require('npm:lodash@4.13.1/_copyObject.js'),
      keys = $__require('npm:lodash@4.13.1/keys.js');
  function baseAssign(object, source) {
    return object && copyObject(source, keys(source), object);
  }
  module.exports = baseAssign;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneBuffer.js", ["@empty"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(Buffer) {
    function cloneBuffer(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var result = new buffer.constructor(buffer.length);
      buffer.copy(result);
      return result;
    }
    module.exports = cloneBuffer;
  })($__require('@empty').Buffer);
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_copySymbols.js", ["npm:lodash@4.13.1/_copyObject.js", "npm:lodash@4.13.1/_getSymbols.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var copyObject = $__require('npm:lodash@4.13.1/_copyObject.js'),
      getSymbols = $__require('npm:lodash@4.13.1/_getSymbols.js');
  function copySymbols(source, object) {
    return copyObject(source, getSymbols(source), object);
  }
  module.exports = copySymbols;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_arrayPush.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  module.exports = arrayPush;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseGetAllKeys.js", ["npm:lodash@4.13.1/_arrayPush.js", "npm:lodash@4.13.1/isArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var arrayPush = $__require('npm:lodash@4.13.1/_arrayPush.js'),
      isArray = $__require('npm:lodash@4.13.1/isArray.js');
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  module.exports = baseGetAllKeys;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/stubArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function stubArray() {
    return [];
  }
  module.exports = stubArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getSymbols.js", ["npm:lodash@4.13.1/stubArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var stubArray = $__require('npm:lodash@4.13.1/stubArray.js');
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  function getSymbols(object) {
    return getOwnPropertySymbols(Object(object));
  }
  if (!getOwnPropertySymbols) {
    getSymbols = stubArray;
  }
  module.exports = getSymbols;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getAllKeys.js", ["npm:lodash@4.13.1/_baseGetAllKeys.js", "npm:lodash@4.13.1/_getSymbols.js", "npm:lodash@4.13.1/keys.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseGetAllKeys = $__require('npm:lodash@4.13.1/_baseGetAllKeys.js'),
      getSymbols = $__require('npm:lodash@4.13.1/_getSymbols.js'),
      keys = $__require('npm:lodash@4.13.1/keys.js');
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }
  module.exports = getAllKeys;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_DataView.js", ["npm:lodash@4.13.1/_getNative.js", "npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js'),
      root = $__require('npm:lodash@4.13.1/_root.js');
  var DataView = getNative(root, 'DataView');
  module.exports = DataView;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Map.js", ["npm:lodash@4.13.1/_getNative.js", "npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js'),
      root = $__require('npm:lodash@4.13.1/_root.js');
  var Map = getNative(root, 'Map');
  module.exports = Map;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Promise.js", ["npm:lodash@4.13.1/_getNative.js", "npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js'),
      root = $__require('npm:lodash@4.13.1/_root.js');
  var Promise = getNative(root, 'Promise');
  module.exports = Promise;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Set.js", ["npm:lodash@4.13.1/_getNative.js", "npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js'),
      root = $__require('npm:lodash@4.13.1/_root.js');
  var Set = getNative(root, 'Set');
  module.exports = Set;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_coreJsData.js", ["npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = $__require('npm:lodash@4.13.1/_root.js');
  var coreJsData = root['__core-js_shared__'];
  module.exports = coreJsData;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isMasked.js", ["npm:lodash@4.13.1/_coreJsData.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var coreJsData = $__require('npm:lodash@4.13.1/_coreJsData.js');
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }
  module.exports = isMasked;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseIsNative.js", ["npm:lodash@4.13.1/isFunction.js", "npm:lodash@4.13.1/_isHostObject.js", "npm:lodash@4.13.1/_isMasked.js", "npm:lodash@4.13.1/isObject.js", "npm:lodash@4.13.1/_toSource.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isFunction = $__require('npm:lodash@4.13.1/isFunction.js'),
      isHostObject = $__require('npm:lodash@4.13.1/_isHostObject.js'),
      isMasked = $__require('npm:lodash@4.13.1/_isMasked.js'),
      isObject = $__require('npm:lodash@4.13.1/isObject.js'),
      toSource = $__require('npm:lodash@4.13.1/_toSource.js');
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var objectProto = Object.prototype;
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  module.exports = baseIsNative;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getValue.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  module.exports = getValue;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getNative.js", ["npm:lodash@4.13.1/_baseIsNative.js", "npm:lodash@4.13.1/_getValue.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseIsNative = $__require('npm:lodash@4.13.1/_baseIsNative.js'),
      getValue = $__require('npm:lodash@4.13.1/_getValue.js');
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  module.exports = getNative;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_WeakMap.js", ["npm:lodash@4.13.1/_getNative.js", "npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getNative = $__require('npm:lodash@4.13.1/_getNative.js'),
      root = $__require('npm:lodash@4.13.1/_root.js');
  var WeakMap = getNative(root, 'WeakMap');
  module.exports = WeakMap;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_toSource.js", ["@empty"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    var funcToString = Function.prototype.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return (func + '');
        } catch (e) {}
      }
      return '';
    }
    module.exports = toSource;
  })($__require('@empty'));
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getTag.js", ["npm:lodash@4.13.1/_DataView.js", "npm:lodash@4.13.1/_Map.js", "npm:lodash@4.13.1/_Promise.js", "npm:lodash@4.13.1/_Set.js", "npm:lodash@4.13.1/_WeakMap.js", "npm:lodash@4.13.1/_toSource.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DataView = $__require('npm:lodash@4.13.1/_DataView.js'),
      Map = $__require('npm:lodash@4.13.1/_Map.js'),
      Promise = $__require('npm:lodash@4.13.1/_Promise.js'),
      Set = $__require('npm:lodash@4.13.1/_Set.js'),
      WeakMap = $__require('npm:lodash@4.13.1/_WeakMap.js'),
      toSource = $__require('npm:lodash@4.13.1/_toSource.js');
  var mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';
  var dataViewTag = '[object DataView]';
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);
  function getTag(value) {
    return objectToString.call(value);
  }
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) || (Map && getTag(new Map) != mapTag) || (Promise && getTag(Promise.resolve()) != promiseTag) || (Set && getTag(new Set) != setTag) || (WeakMap && getTag(new WeakMap) != weakMapTag)) {
    getTag = function(value) {
      var result = objectToString.call(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : undefined;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag;
          case mapCtorString:
            return mapTag;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag;
          case weakMapCtorString:
            return weakMapTag;
        }
      }
      return result;
    };
  }
  module.exports = getTag;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_initCloneArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length,
        result = array.constructor(length);
    if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  module.exports = initCloneArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneDataView.js", ["npm:lodash@4.13.1/_cloneArrayBuffer.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var cloneArrayBuffer = $__require('npm:lodash@4.13.1/_cloneArrayBuffer.js');
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  module.exports = cloneDataView;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_addMapEntry.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  module.exports = addMapEntry;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_mapToArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function mapToArray(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  module.exports = mapToArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneMap.js", ["npm:lodash@4.13.1/_addMapEntry.js", "npm:lodash@4.13.1/_arrayReduce.js", "npm:lodash@4.13.1/_mapToArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var addMapEntry = $__require('npm:lodash@4.13.1/_addMapEntry.js'),
      arrayReduce = $__require('npm:lodash@4.13.1/_arrayReduce.js'),
      mapToArray = $__require('npm:lodash@4.13.1/_mapToArray.js');
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
    return arrayReduce(array, addMapEntry, new map.constructor);
  }
  module.exports = cloneMap;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneRegExp.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  module.exports = cloneRegExp;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_addSetEntry.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function addSetEntry(set, value) {
    set.add(value);
    return set;
  }
  module.exports = addSetEntry;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_arrayReduce.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1,
        length = array ? array.length : 0;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  module.exports = arrayReduce;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_setToArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function setToArray(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  module.exports = setToArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneSet.js", ["npm:lodash@4.13.1/_addSetEntry.js", "npm:lodash@4.13.1/_arrayReduce.js", "npm:lodash@4.13.1/_setToArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var addSetEntry = $__require('npm:lodash@4.13.1/_addSetEntry.js'),
      arrayReduce = $__require('npm:lodash@4.13.1/_arrayReduce.js'),
      setToArray = $__require('npm:lodash@4.13.1/_setToArray.js');
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
    return arrayReduce(array, addSetEntry, new set.constructor);
  }
  module.exports = cloneSet;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Symbol.js", ["npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = $__require('npm:lodash@4.13.1/_root.js');
  var Symbol = root.Symbol;
  module.exports = Symbol;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneSymbol.js", ["npm:lodash@4.13.1/_Symbol.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Symbol = $__require('npm:lodash@4.13.1/_Symbol.js');
  var symbolProto = Symbol ? Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }
  module.exports = cloneSymbol;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Uint8Array.js", ["npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = $__require('npm:lodash@4.13.1/_root.js');
  var Uint8Array = root.Uint8Array;
  module.exports = Uint8Array;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneArrayBuffer.js", ["npm:lodash@4.13.1/_Uint8Array.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Uint8Array = $__require('npm:lodash@4.13.1/_Uint8Array.js');
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }
  module.exports = cloneArrayBuffer;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_cloneTypedArray.js", ["npm:lodash@4.13.1/_cloneArrayBuffer.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var cloneArrayBuffer = $__require('npm:lodash@4.13.1/_cloneArrayBuffer.js');
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  module.exports = cloneTypedArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_initCloneByTag.js", ["npm:lodash@4.13.1/_cloneArrayBuffer.js", "npm:lodash@4.13.1/_cloneDataView.js", "npm:lodash@4.13.1/_cloneMap.js", "npm:lodash@4.13.1/_cloneRegExp.js", "npm:lodash@4.13.1/_cloneSet.js", "npm:lodash@4.13.1/_cloneSymbol.js", "npm:lodash@4.13.1/_cloneTypedArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var cloneArrayBuffer = $__require('npm:lodash@4.13.1/_cloneArrayBuffer.js'),
      cloneDataView = $__require('npm:lodash@4.13.1/_cloneDataView.js'),
      cloneMap = $__require('npm:lodash@4.13.1/_cloneMap.js'),
      cloneRegExp = $__require('npm:lodash@4.13.1/_cloneRegExp.js'),
      cloneSet = $__require('npm:lodash@4.13.1/_cloneSet.js'),
      cloneSymbol = $__require('npm:lodash@4.13.1/_cloneSymbol.js'),
      cloneTypedArray = $__require('npm:lodash@4.13.1/_cloneTypedArray.js');
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  function initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return cloneDataView(object, isDeep);
      case float32Tag:
      case float64Tag:
      case int8Tag:
      case int16Tag:
      case int32Tag:
      case uint8Tag:
      case uint8ClampedTag:
      case uint16Tag:
      case uint32Tag:
        return cloneTypedArray(object, isDeep);
      case mapTag:
        return cloneMap(object, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return cloneRegExp(object);
      case setTag:
        return cloneSet(object, isDeep, cloneFunc);
      case symbolTag:
        return cloneSymbol(object);
    }
  }
  module.exports = initCloneByTag;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseCreate.js", ["npm:lodash@4.13.1/isObject.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObject = $__require('npm:lodash@4.13.1/isObject.js');
  var objectCreate = Object.create;
  function baseCreate(proto) {
    return isObject(proto) ? objectCreate(proto) : {};
  }
  module.exports = baseCreate;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_initCloneObject.js", ["npm:lodash@4.13.1/_baseCreate.js", "npm:lodash@4.13.1/_getPrototype.js", "npm:lodash@4.13.1/_isPrototype.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseCreate = $__require('npm:lodash@4.13.1/_baseCreate.js'),
      getPrototype = $__require('npm:lodash@4.13.1/_getPrototype.js'),
      isPrototype = $__require('npm:lodash@4.13.1/_isPrototype.js');
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !isPrototype(object)) ? baseCreate(getPrototype(object)) : {};
  }
  module.exports = initCloneObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/stubFalse.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function stubFalse() {
    return false;
  }
  module.exports = stubFalse;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isBuffer.js", ["npm:lodash@4.13.1/_root.js", "npm:lodash@4.13.1/stubFalse.js", "@empty"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(Buffer) {
    var root = $__require('npm:lodash@4.13.1/_root.js'),
        stubFalse = $__require('npm:lodash@4.13.1/stubFalse.js');
    var freeExports = typeof exports == 'object' && exports;
    var freeModule = freeExports && typeof module == 'object' && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : undefined;
    var isBuffer = !Buffer ? stubFalse : function(value) {
      return value instanceof Buffer;
    };
    module.exports = isBuffer;
  })($__require('@empty').Buffer);
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseHas.js", ["npm:lodash@4.13.1/_getPrototype.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getPrototype = $__require('npm:lodash@4.13.1/_getPrototype.js');
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function baseHas(object, key) {
    return object != null && (hasOwnProperty.call(object, key) || (typeof object == 'object' && key in object && getPrototype(object) === null));
  }
  module.exports = baseHas;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseKeys.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeKeys = Object.keys;
  function baseKeys(object) {
    return nativeKeys(Object(object));
  }
  module.exports = baseKeys;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/keys.js", ["npm:lodash@4.13.1/_baseHas.js", "npm:lodash@4.13.1/_baseKeys.js", "npm:lodash@4.13.1/_indexKeys.js", "npm:lodash@4.13.1/isArrayLike.js", "npm:lodash@4.13.1/_isIndex.js", "npm:lodash@4.13.1/_isPrototype.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseHas = $__require('npm:lodash@4.13.1/_baseHas.js'),
      baseKeys = $__require('npm:lodash@4.13.1/_baseKeys.js'),
      indexKeys = $__require('npm:lodash@4.13.1/_indexKeys.js'),
      isArrayLike = $__require('npm:lodash@4.13.1/isArrayLike.js'),
      isIndex = $__require('npm:lodash@4.13.1/_isIndex.js'),
      isPrototype = $__require('npm:lodash@4.13.1/_isPrototype.js');
  function keys(object) {
    var isProto = isPrototype(object);
    if (!(isProto || isArrayLike(object))) {
      return baseKeys(object);
    }
    var indexes = indexKeys(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;
    for (var key in object) {
      if (baseHas(object, key) && !(skipIndexes && (key == 'length' || isIndex(key, length))) && !(isProto && key == 'constructor')) {
        result.push(key);
      }
    }
    return result;
  }
  module.exports = keys;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseClone.js", ["npm:lodash@4.13.1/_Stack.js", "npm:lodash@4.13.1/_arrayEach.js", "npm:lodash@4.13.1/_assignValue.js", "npm:lodash@4.13.1/_baseAssign.js", "npm:lodash@4.13.1/_cloneBuffer.js", "npm:lodash@4.13.1/_copyArray.js", "npm:lodash@4.13.1/_copySymbols.js", "npm:lodash@4.13.1/_getAllKeys.js", "npm:lodash@4.13.1/_getTag.js", "npm:lodash@4.13.1/_initCloneArray.js", "npm:lodash@4.13.1/_initCloneByTag.js", "npm:lodash@4.13.1/_initCloneObject.js", "npm:lodash@4.13.1/isArray.js", "npm:lodash@4.13.1/isBuffer.js", "npm:lodash@4.13.1/_isHostObject.js", "npm:lodash@4.13.1/isObject.js", "npm:lodash@4.13.1/keys.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Stack = $__require('npm:lodash@4.13.1/_Stack.js'),
      arrayEach = $__require('npm:lodash@4.13.1/_arrayEach.js'),
      assignValue = $__require('npm:lodash@4.13.1/_assignValue.js'),
      baseAssign = $__require('npm:lodash@4.13.1/_baseAssign.js'),
      cloneBuffer = $__require('npm:lodash@4.13.1/_cloneBuffer.js'),
      copyArray = $__require('npm:lodash@4.13.1/_copyArray.js'),
      copySymbols = $__require('npm:lodash@4.13.1/_copySymbols.js'),
      getAllKeys = $__require('npm:lodash@4.13.1/_getAllKeys.js'),
      getTag = $__require('npm:lodash@4.13.1/_getTag.js'),
      initCloneArray = $__require('npm:lodash@4.13.1/_initCloneArray.js'),
      initCloneByTag = $__require('npm:lodash@4.13.1/_initCloneByTag.js'),
      initCloneObject = $__require('npm:lodash@4.13.1/_initCloneObject.js'),
      isArray = $__require('npm:lodash@4.13.1/isArray.js'),
      isBuffer = $__require('npm:lodash@4.13.1/isBuffer.js'),
      isHostObject = $__require('npm:lodash@4.13.1/_isHostObject.js'),
      isObject = $__require('npm:lodash@4.13.1/isObject.js'),
      keys = $__require('npm:lodash@4.13.1/keys.js');
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
  function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject(value)) {
      return value;
    }
    var isArr = isArray(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag(value),
          isFunc = tag == funcTag || tag == genTag;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result = initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, baseClone, isDeep);
      }
    }
    stack || (stack = new Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (!isArr) {
      var props = isFull ? getAllKeys(value) : keys(value);
    }
    arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
    });
    return result;
  }
  module.exports = baseClone;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_copyArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function copyArray(source, array) {
    var index = -1,
        length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  module.exports = copyArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_assignValue.js", ["npm:lodash@4.13.1/eq.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var eq = $__require('npm:lodash@4.13.1/eq.js');
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
      object[key] = value;
    }
  }
  module.exports = assignValue;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_copyObject.js", ["npm:lodash@4.13.1/_assignValue.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assignValue = $__require('npm:lodash@4.13.1/_assignValue.js');
  function copyObject(source, props, object, customizer) {
    object || (object = {});
    var index = -1,
        length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : source[key];
      assignValue(object, key, newValue);
    }
    return object;
  }
  module.exports = copyObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/toPlainObject.js", ["npm:lodash@4.13.1/_copyObject.js", "npm:lodash@4.13.1/keysIn.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var copyObject = $__require('npm:lodash@4.13.1/_copyObject.js'),
      keysIn = $__require('npm:lodash@4.13.1/keysIn.js');
  function toPlainObject(value) {
    return copyObject(value, keysIn(value));
  }
  module.exports = toPlainObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseMergeDeep.js", ["npm:lodash@4.13.1/_assignMergeValue.js", "npm:lodash@4.13.1/_baseClone.js", "npm:lodash@4.13.1/_copyArray.js", "npm:lodash@4.13.1/isArguments.js", "npm:lodash@4.13.1/isArray.js", "npm:lodash@4.13.1/isArrayLikeObject.js", "npm:lodash@4.13.1/isFunction.js", "npm:lodash@4.13.1/isObject.js", "npm:lodash@4.13.1/isPlainObject.js", "npm:lodash@4.13.1/isTypedArray.js", "npm:lodash@4.13.1/toPlainObject.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var assignMergeValue = $__require('npm:lodash@4.13.1/_assignMergeValue.js'),
      baseClone = $__require('npm:lodash@4.13.1/_baseClone.js'),
      copyArray = $__require('npm:lodash@4.13.1/_copyArray.js'),
      isArguments = $__require('npm:lodash@4.13.1/isArguments.js'),
      isArray = $__require('npm:lodash@4.13.1/isArray.js'),
      isArrayLikeObject = $__require('npm:lodash@4.13.1/isArrayLikeObject.js'),
      isFunction = $__require('npm:lodash@4.13.1/isFunction.js'),
      isObject = $__require('npm:lodash@4.13.1/isObject.js'),
      isPlainObject = $__require('npm:lodash@4.13.1/isPlainObject.js'),
      isTypedArray = $__require('npm:lodash@4.13.1/isTypedArray.js'),
      toPlainObject = $__require('npm:lodash@4.13.1/toPlainObject.js');
  function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
    var objValue = object[key],
        srcValue = source[key],
        stacked = stack.get(srcValue);
    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }
    var newValue = customizer ? customizer(objValue, srcValue, (key + ''), object, source, stack) : undefined;
    var isCommon = newValue === undefined;
    if (isCommon) {
      newValue = srcValue;
      if (isArray(srcValue) || isTypedArray(srcValue)) {
        if (isArray(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject(objValue)) {
          newValue = copyArray(objValue);
        } else {
          isCommon = false;
          newValue = baseClone(srcValue, true);
        }
      } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
        if (isArguments(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
          isCommon = false;
          newValue = baseClone(srcValue, true);
        } else {
          newValue = objValue;
        }
      } else {
        isCommon = false;
      }
    }
    stack.set(srcValue, newValue);
    if (isCommon) {
      mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    }
    stack['delete'](srcValue);
    assignMergeValue(object, key, newValue);
  }
  module.exports = baseMergeDeep;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isTypedArray.js", ["npm:lodash@4.13.1/isLength.js", "npm:lodash@4.13.1/isObjectLike.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isLength = $__require('npm:lodash@4.13.1/isLength.js'),
      isObjectLike = $__require('npm:lodash@4.13.1/isObjectLike.js');
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
  }
  module.exports = isTypedArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_checkGlobal.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function checkGlobal(value) {
    return (value && value.Object === Object) ? value : null;
  }
  module.exports = checkGlobal;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_root.js", ["npm:lodash@4.13.1/_checkGlobal.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var checkGlobal = $__require('npm:lodash@4.13.1/_checkGlobal.js');
  var freeGlobal = checkGlobal(typeof global == 'object' && global);
  var freeSelf = checkGlobal(typeof self == 'object' && self);
  var thisGlobal = checkGlobal(typeof this == 'object' && this);
  var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
  module.exports = root;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_Reflect.js", ["npm:lodash@4.13.1/_root.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root = $__require('npm:lodash@4.13.1/_root.js');
  var Reflect = root.Reflect;
  module.exports = Reflect;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_iteratorToArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function iteratorToArray(iterator) {
    var data,
        result = [];
    while (!(data = iterator.next()).done) {
      result.push(data.value);
    }
    return result;
  }
  module.exports = iteratorToArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseKeysIn.js", ["npm:lodash@4.13.1/_Reflect.js", "npm:lodash@4.13.1/_iteratorToArray.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Reflect = $__require('npm:lodash@4.13.1/_Reflect.js'),
      iteratorToArray = $__require('npm:lodash@4.13.1/_iteratorToArray.js');
  var objectProto = Object.prototype;
  var enumerate = Reflect ? Reflect.enumerate : undefined,
      propertyIsEnumerable = objectProto.propertyIsEnumerable;
  function baseKeysIn(object) {
    object = object == null ? object : Object(object);
    var result = [];
    for (var key in object) {
      result.push(key);
    }
    return result;
  }
  if (enumerate && !propertyIsEnumerable.call({'valueOf': 1}, 'valueOf')) {
    baseKeysIn = function(object) {
      return iteratorToArray(enumerate(object));
    };
  }
  module.exports = baseKeysIn;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseTimes.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  module.exports = baseTimes;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isArrayLikeObject.js", ["npm:lodash@4.13.1/isArrayLike.js", "npm:lodash@4.13.1/isObjectLike.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArrayLike = $__require('npm:lodash@4.13.1/isArrayLike.js'),
      isObjectLike = $__require('npm:lodash@4.13.1/isObjectLike.js');
  function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
  }
  module.exports = isArrayLikeObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isArguments.js", ["npm:lodash@4.13.1/isArrayLikeObject.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArrayLikeObject = $__require('npm:lodash@4.13.1/isArrayLikeObject.js');
  var argsTag = '[object Arguments]';
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectToString = objectProto.toString;
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') && (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
  }
  module.exports = isArguments;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isArray.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray = Array.isArray;
  module.exports = isArray;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isString.js", ["npm:lodash@4.13.1/isArray.js", "npm:lodash@4.13.1/isObjectLike.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray = $__require('npm:lodash@4.13.1/isArray.js'),
      isObjectLike = $__require('npm:lodash@4.13.1/isObjectLike.js');
  var stringTag = '[object String]';
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isString(value) {
    return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
  }
  module.exports = isString;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_indexKeys.js", ["npm:lodash@4.13.1/_baseTimes.js", "npm:lodash@4.13.1/isArguments.js", "npm:lodash@4.13.1/isArray.js", "npm:lodash@4.13.1/isLength.js", "npm:lodash@4.13.1/isString.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseTimes = $__require('npm:lodash@4.13.1/_baseTimes.js'),
      isArguments = $__require('npm:lodash@4.13.1/isArguments.js'),
      isArray = $__require('npm:lodash@4.13.1/isArray.js'),
      isLength = $__require('npm:lodash@4.13.1/isLength.js'),
      isString = $__require('npm:lodash@4.13.1/isString.js');
  function indexKeys(object) {
    var length = object ? object.length : undefined;
    if (isLength(length) && (isArray(object) || isString(object) || isArguments(object))) {
      return baseTimes(length, String);
    }
    return null;
  }
  module.exports = indexKeys;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isPrototype.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var objectProto = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
    return value === proto;
  }
  module.exports = isPrototype;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/keysIn.js", ["npm:lodash@4.13.1/_baseKeysIn.js", "npm:lodash@4.13.1/_indexKeys.js", "npm:lodash@4.13.1/_isIndex.js", "npm:lodash@4.13.1/_isPrototype.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseKeysIn = $__require('npm:lodash@4.13.1/_baseKeysIn.js'),
      indexKeys = $__require('npm:lodash@4.13.1/_indexKeys.js'),
      isIndex = $__require('npm:lodash@4.13.1/_isIndex.js'),
      isPrototype = $__require('npm:lodash@4.13.1/_isPrototype.js');
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  function keysIn(object) {
    var index = -1,
        isProto = isPrototype(object),
        props = baseKeysIn(object),
        propsLength = props.length,
        indexes = indexKeys(object),
        skipIndexes = !!indexes,
        result = indexes || [],
        length = result.length;
    while (++index < propsLength) {
      var key = props[index];
      if (!(skipIndexes && (key == 'length' || isIndex(key, length))) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  module.exports = keysIn;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseMerge.js", ["npm:lodash@4.13.1/_Stack.js", "npm:lodash@4.13.1/_arrayEach.js", "npm:lodash@4.13.1/_assignMergeValue.js", "npm:lodash@4.13.1/_baseMergeDeep.js", "npm:lodash@4.13.1/isArray.js", "npm:lodash@4.13.1/isObject.js", "npm:lodash@4.13.1/isTypedArray.js", "npm:lodash@4.13.1/keysIn.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Stack = $__require('npm:lodash@4.13.1/_Stack.js'),
      arrayEach = $__require('npm:lodash@4.13.1/_arrayEach.js'),
      assignMergeValue = $__require('npm:lodash@4.13.1/_assignMergeValue.js'),
      baseMergeDeep = $__require('npm:lodash@4.13.1/_baseMergeDeep.js'),
      isArray = $__require('npm:lodash@4.13.1/isArray.js'),
      isObject = $__require('npm:lodash@4.13.1/isObject.js'),
      isTypedArray = $__require('npm:lodash@4.13.1/isTypedArray.js'),
      keysIn = $__require('npm:lodash@4.13.1/keysIn.js');
  function baseMerge(object, source, srcIndex, customizer, stack) {
    if (object === source) {
      return;
    }
    if (!(isArray(source) || isTypedArray(source))) {
      var props = keysIn(source);
    }
    arrayEach(props || source, function(srcValue, key) {
      if (props) {
        key = srcValue;
        srcValue = source[key];
      }
      if (isObject(srcValue)) {
        stack || (stack = new Stack);
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(object[key], srcValue, (key + ''), object, source, stack) : undefined;
        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    });
  }
  module.exports = baseMerge;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/eq.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }
  module.exports = eq;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_baseProperty.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }
  module.exports = baseProperty;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getLength.js", ["npm:lodash@4.13.1/_baseProperty.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseProperty = $__require('npm:lodash@4.13.1/_baseProperty.js');
  var getLength = baseProperty('length');
  module.exports = getLength;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isLength.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  module.exports = isLength;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isArrayLike.js", ["npm:lodash@4.13.1/_getLength.js", "npm:lodash@4.13.1/isFunction.js", "npm:lodash@4.13.1/isLength.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getLength = $__require('npm:lodash@4.13.1/_getLength.js'),
      isFunction = $__require('npm:lodash@4.13.1/isFunction.js'),
      isLength = $__require('npm:lodash@4.13.1/isLength.js');
  function isArrayLike(value) {
    return value != null && isLength(getLength(value)) && !isFunction(value);
  }
  module.exports = isArrayLike;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isIndex.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var MAX_SAFE_INTEGER = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == 'number' || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  module.exports = isIndex;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isIterateeCall.js", ["npm:lodash@4.13.1/eq.js", "npm:lodash@4.13.1/isArrayLike.js", "npm:lodash@4.13.1/_isIndex.js", "npm:lodash@4.13.1/isObject.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var eq = $__require('npm:lodash@4.13.1/eq.js'),
      isArrayLike = $__require('npm:lodash@4.13.1/isArrayLike.js'),
      isIndex = $__require('npm:lodash@4.13.1/_isIndex.js'),
      isObject = $__require('npm:lodash@4.13.1/isObject.js');
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
      return eq(object[index], value);
    }
    return false;
  }
  module.exports = isIterateeCall;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_apply.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function apply(func, thisArg, args) {
    var length = args.length;
    switch (length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  module.exports = apply;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isFunction.js", ["npm:lodash@4.13.1/isObject.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObject = $__require('npm:lodash@4.13.1/isObject.js');
  var funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]';
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isFunction(value) {
    var tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }
  module.exports = isFunction;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isObject.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isObject(value) {
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  module.exports = isObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isSymbol.js", ["npm:lodash@4.13.1/isObjectLike.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isObjectLike = $__require('npm:lodash@4.13.1/isObjectLike.js');
  var symbolTag = '[object Symbol]';
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  function isSymbol(value) {
    return typeof value == 'symbol' || (isObjectLike(value) && objectToString.call(value) == symbolTag);
  }
  module.exports = isSymbol;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/toNumber.js", ["npm:lodash@4.13.1/isFunction.js", "npm:lodash@4.13.1/isObject.js", "npm:lodash@4.13.1/isSymbol.js", "@empty"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    var isFunction = $__require('npm:lodash@4.13.1/isFunction.js'),
        isObject = $__require('npm:lodash@4.13.1/isObject.js'),
        isSymbol = $__require('npm:lodash@4.13.1/isSymbol.js');
    var NAN = 0 / 0;
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == 'number') {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = isFunction(value.valueOf) ? value.valueOf() : value;
        value = isObject(other) ? (other + '') : other;
      }
      if (typeof value != 'string') {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, '');
      var isBinary = reIsBinary.test(value);
      return (isBinary || reIsOctal.test(value)) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : (reIsBadHex.test(value) ? NAN : +value);
    }
    module.exports = toNumber;
  })($__require('@empty'));
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/toFinite.js", ["npm:lodash@4.13.1/toNumber.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toNumber = $__require('npm:lodash@4.13.1/toNumber.js');
  var INFINITY = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }
  module.exports = toFinite;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/toInteger.js", ["npm:lodash@4.13.1/toFinite.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toFinite = $__require('npm:lodash@4.13.1/toFinite.js');
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;
    return result === result ? (remainder ? result - remainder : result) : 0;
  }
  module.exports = toInteger;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/rest.js", ["npm:lodash@4.13.1/_apply.js", "npm:lodash@4.13.1/toInteger.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var apply = $__require('npm:lodash@4.13.1/_apply.js'),
      toInteger = $__require('npm:lodash@4.13.1/toInteger.js');
  var FUNC_ERROR_TEXT = 'Expected a function';
  var nativeMax = Math.max;
  function rest(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      switch (start) {
        case 0:
          return func.call(this, array);
        case 1:
          return func.call(this, args[0], array);
        case 2:
          return func.call(this, args[0], args[1], array);
      }
      var otherArgs = Array(start + 1);
      index = -1;
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = array;
      return apply(func, this, otherArgs);
    };
  }
  module.exports = rest;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_createAssigner.js", ["npm:lodash@4.13.1/_isIterateeCall.js", "npm:lodash@4.13.1/rest.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isIterateeCall = $__require('npm:lodash@4.13.1/_isIterateeCall.js'),
      rest = $__require('npm:lodash@4.13.1/rest.js');
  function createAssigner(assigner) {
    return rest(function(object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;
      customizer = (assigner.length > 3 && typeof customizer == 'function') ? (length--, customizer) : undefined;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      object = Object(object);
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, index, customizer);
        }
      }
      return object;
    });
  }
  module.exports = createAssigner;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/merge.js", ["npm:lodash@4.13.1/_baseMerge.js", "npm:lodash@4.13.1/_createAssigner.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var baseMerge = $__require('npm:lodash@4.13.1/_baseMerge.js'),
      createAssigner = $__require('npm:lodash@4.13.1/_createAssigner.js');
  var merge = createAssigner(function(object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });
  module.exports = merge;
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/colorManipulator.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.convertColorToString = convertColorToString;
  exports.convertHexToRGB = convertHexToRGB;
  exports.decomposeColor = decomposeColor;
  exports.getContrastRatio = getContrastRatio;
  exports.getLuminance = getLuminance;
  exports.emphasize = emphasize;
  exports.fade = fade;
  exports.darken = darken;
  exports.lighten = lighten;
  function clamp(value, min, max) {
    if (value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  }
  function convertColorToString(color) {
    var type = color.type;
    var values = color.values;
    if (type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        values[i] = parseInt(values[i]);
      }
    }
    var colorString = void 0;
    if (type.indexOf('hsl') > -1) {
      colorString = color.type + '(' + values[0] + ', ' + values[1] + '%, ' + values[2] + '%';
    } else {
      colorString = color.type + '(' + values[0] + ', ' + values[1] + ', ' + values[2];
    }
    if (values.length === 4) {
      colorString += ', ' + color.values[3] + ')';
    } else {
      colorString += ')';
    }
    return colorString;
  }
  function convertHexToRGB(color) {
    if (color.length === 4) {
      var extendedColor = '#';
      for (var i = 1; i < color.length; i++) {
        extendedColor += color.charAt(i) + color.charAt(i);
      }
      color = extendedColor;
    }
    var values = {
      r: parseInt(color.substr(1, 2), 16),
      g: parseInt(color.substr(3, 2), 16),
      b: parseInt(color.substr(5, 2), 16)
    };
    return 'rgb(' + values.r + ', ' + values.g + ', ' + values.b + ')';
  }
  function decomposeColor(color) {
    if (color.charAt(0) === '#') {
      return decomposeColor(convertHexToRGB(color));
    }
    var marker = color.indexOf('(');
    var type = color.substring(0, marker);
    var values = color.substring(marker + 1, color.length - 1).split(',');
    values = values.map(function(value) {
      return parseFloat(value);
    });
    return {
      type: type,
      values: values
    };
  }
  function getContrastRatio(foreground, background) {
    var lumA = getLuminance(foreground);
    var lumB = getLuminance(background);
    var contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
    return Number(contrastRatio.toFixed(2));
  }
  function getLuminance(color) {
    color = decomposeColor(color);
    if (color.type.indexOf('rgb') > -1) {
      var rgb = color.values.map(function(val) {
        val /= 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
    } else if (color.type.indexOf('hsl') > -1) {
      return color.values[2] / 100;
    }
  }
  function emphasize(color) {
    var coefficient = arguments.length <= 1 || arguments[1] === undefined ? 0.15 : arguments[1];
    return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
  }
  function fade(color, value) {
    color = decomposeColor(color);
    value = clamp(value, 0, 1);
    if (color.type === 'rgb' || color.type === 'hsl') {
      color.type += 'a';
    }
    color.values[3] = value;
    return convertColorToString(color);
  }
  function darken(color, coefficient) {
    color = decomposeColor(color);
    coefficient = clamp(coefficient, 0, 1);
    if (color.type.indexOf('hsl') > -1) {
      color.values[2] *= 1 - coefficient;
    } else if (color.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        color.values[i] *= 1 - coefficient;
      }
    }
    return convertColorToString(color);
  }
  function lighten(color, coefficient) {
    color = decomposeColor(color);
    coefficient = clamp(coefficient, 0, 1);
    if (color.type.indexOf('hsl') > -1) {
      color.values[2] += (100 - color.values[2]) * coefficient;
    } else if (color.type.indexOf('rgb') > -1) {
      for (var i = 0; i < 3; i++) {
        color.values[i] += (255 - color.values[i]) * coefficient;
      }
    }
    return convertColorToString(color);
  }
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/spacing.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  };
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/baseThemes/lightBaseTheme.js", ["npm:material-ui@0.15.2/styles/colors.js", "npm:material-ui@0.15.2/utils/colorManipulator.js", "npm:material-ui@0.15.2/styles/spacing.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _colors = $__require('npm:material-ui@0.15.2/styles/colors.js');
  var _colorManipulator = $__require('npm:material-ui@0.15.2/utils/colorManipulator.js');
  var _spacing = $__require('npm:material-ui@0.15.2/styles/spacing.js');
  var _spacing2 = _interopRequireDefault(_spacing);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  exports.default = {
    spacing: _spacing2.default,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: _colors.cyan500,
      primary2Color: _colors.cyan700,
      primary3Color: _colors.grey400,
      accent1Color: _colors.pinkA200,
      accent2Color: _colors.grey100,
      accent3Color: _colors.grey500,
      textColor: _colors.darkBlack,
      secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
      alternateTextColor: _colors.white,
      canvasColor: _colors.white,
      borderColor: _colors.grey300,
      disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
      pickerHeaderColor: _colors.cyan500,
      clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
      shadowColor: _colors.fullBlack
    }
  };
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/zIndex.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    menu: 1000,
    appBar: 1100,
    drawerOverlay: 1200,
    drawer: 1300,
    dialogOverlay: 1400,
    dialog: 1500,
    layer: 2000,
    popover: 2100,
    snackbar: 2900,
    tooltip: 3000
  };
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/calc.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js", "npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = calc;
  var _joinPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js');
  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);
  var _isPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js');
  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function calc(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.indexOf('calc(') > -1) {
      return (0, _joinPrefixedValue2.default)(property, value, function(prefix, value) {
        return value.replace(/calc\(/g, prefix + 'calc(');
      });
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/cursor.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = cursor;
  var _joinPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js');
  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var values = {
    'zoom-in': true,
    'zoom-out': true,
    grab: true,
    grabbing: true
  };
  function cursor(property, value) {
    if (property === 'cursor' && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/flex.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flex;
  var values = {
    flex: true,
    'inline-flex': true
  };
  function flex(property, value) {
    if (property === 'display' && values[value]) {
      return {display: ['-webkit-box', '-moz-box', '-ms-' + value + 'box', '-webkit-' + value, value]};
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/sizing.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = sizing;
  var _joinPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js');
  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };
  function sizing(property, value) {
    if (properties[property] && values[value]) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  exports.default = function(property, value) {
    var replacer = arguments.length <= 2 || arguments[2] === undefined ? function(prefix, value) {
      return prefix + value;
    } : arguments[2];
    return _defineProperty({}, property, ['-webkit-', '-moz-', ''].map(function(prefix) {
      return replacer(prefix, value);
    }));
  };
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/gradient.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js", "npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = gradient;
  var _joinPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/joinPrefixedValue.js');
  var _joinPrefixedValue2 = _interopRequireDefault(_joinPrefixedValue);
  var _isPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js');
  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
  function gradient(property, value) {
    if (typeof value === 'string' && !(0, _isPrefixedValue2.default)(value) && value.match(values) !== null) {
      return (0, _joinPrefixedValue2.default)(property, value);
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(value) {
    if (Array.isArray(value))
      value = value.join(',');
    return value.match(/-webkit-|-moz-|-ms-/) !== null;
  };
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/prefixProps.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    "Webkit": {
      "transform": true,
      "transformOrigin": true,
      "transformOriginX": true,
      "transformOriginY": true,
      "backfaceVisibility": true,
      "perspective": true,
      "perspectiveOrigin": true,
      "transformStyle": true,
      "transformOriginZ": true,
      "animation": true,
      "animationDelay": true,
      "animationDirection": true,
      "animationFillMode": true,
      "animationDuration": true,
      "animationIterationCount": true,
      "animationName": true,
      "animationPlayState": true,
      "animationTimingFunction": true,
      "appearance": true,
      "userSelect": true,
      "fontKerning": true,
      "textEmphasisPosition": true,
      "textEmphasis": true,
      "textEmphasisStyle": true,
      "textEmphasisColor": true,
      "boxDecorationBreak": true,
      "clipPath": true,
      "maskImage": true,
      "maskMode": true,
      "maskRepeat": true,
      "maskPosition": true,
      "maskClip": true,
      "maskOrigin": true,
      "maskSize": true,
      "maskComposite": true,
      "mask": true,
      "maskBorderSource": true,
      "maskBorderMode": true,
      "maskBorderSlice": true,
      "maskBorderWidth": true,
      "maskBorderOutset": true,
      "maskBorderRepeat": true,
      "maskBorder": true,
      "maskType": true,
      "textDecorationStyle": true,
      "textDecorationSkip": true,
      "textDecorationLine": true,
      "textDecorationColor": true,
      "filter": true,
      "fontFeatureSettings": true,
      "breakAfter": true,
      "breakBefore": true,
      "breakInside": true,
      "columnCount": true,
      "columnFill": true,
      "columnGap": true,
      "columnRule": true,
      "columnRuleColor": true,
      "columnRuleStyle": true,
      "columnRuleWidth": true,
      "columns": true,
      "columnSpan": true,
      "columnWidth": true,
      "flex": true,
      "flexBasis": true,
      "flexDirection": true,
      "flexGrow": true,
      "flexFlow": true,
      "flexShrink": true,
      "flexWrap": true,
      "alignContent": true,
      "alignItems": true,
      "alignSelf": true,
      "justifyContent": true,
      "order": true,
      "transition": true,
      "transitionDelay": true,
      "transitionDuration": true,
      "transitionProperty": true,
      "transitionTimingFunction": true,
      "backdropFilter": true,
      "scrollSnapType": true,
      "scrollSnapPointsX": true,
      "scrollSnapPointsY": true,
      "scrollSnapDestination": true,
      "scrollSnapCoordinate": true,
      "shapeImageThreshold": true,
      "shapeImageMargin": true,
      "shapeImageOutside": true,
      "hyphens": true,
      "flowInto": true,
      "flowFrom": true,
      "regionFragment": true,
      "textSizeAdjust": true,
      "borderImage": true,
      "borderImageOutset": true,
      "borderImageRepeat": true,
      "borderImageSlice": true,
      "borderImageSource": true,
      "borderImageWidth": true,
      "tabSize": true,
      "objectFit": true,
      "objectPosition": true
    },
    "Moz": {
      "appearance": true,
      "userSelect": true,
      "boxSizing": true,
      "textAlignLast": true,
      "textDecorationStyle": true,
      "textDecorationSkip": true,
      "textDecorationLine": true,
      "textDecorationColor": true,
      "tabSize": true,
      "hyphens": true,
      "fontFeatureSettings": true,
      "breakAfter": true,
      "breakBefore": true,
      "breakInside": true,
      "columnCount": true,
      "columnFill": true,
      "columnGap": true,
      "columnRule": true,
      "columnRuleColor": true,
      "columnRuleStyle": true,
      "columnRuleWidth": true,
      "columns": true,
      "columnSpan": true,
      "columnWidth": true
    },
    "ms": {
      "flex": true,
      "flexBasis": false,
      "flexDirection": true,
      "flexGrow": false,
      "flexFlow": true,
      "flexShrink": false,
      "flexWrap": true,
      "alignContent": false,
      "alignItems": false,
      "alignSelf": false,
      "justifyContent": false,
      "order": false,
      "transform": true,
      "transformOrigin": true,
      "transformOriginX": true,
      "transformOriginY": true,
      "userSelect": true,
      "wrapFlow": true,
      "wrapThrough": true,
      "wrapMargin": true,
      "scrollSnapType": true,
      "scrollSnapPointsX": true,
      "scrollSnapPointsY": true,
      "scrollSnapDestination": true,
      "scrollSnapCoordinate": true,
      "touchAction": true,
      "hyphens": true,
      "flowInto": true,
      "flowFrom": true,
      "breakBefore": true,
      "breakAfter": true,
      "breakInside": true,
      "regionFragment": true,
      "gridTemplateColumns": true,
      "gridTemplateRows": true,
      "gridTemplateAreas": true,
      "gridTemplate": true,
      "gridAutoColumns": true,
      "gridAutoRows": true,
      "gridAutoFlow": true,
      "grid": true,
      "gridRowStart": true,
      "gridColumnStart": true,
      "gridRowEnd": true,
      "gridRow": true,
      "gridColumn": true,
      "gridColumnEnd": true,
      "gridColumnGap": true,
      "gridRowGap": true,
      "gridArea": true,
      "gridGap": true,
      "textSizeAdjust": true
    }
  };
  module.exports = exports["default"];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/transition.js", ["npm:hyphenate-style-name@1.0.1.js", "npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js", "npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js", "npm:inline-style-prefixer@2.0.1/lib/static/prefixProps.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = transition;
  var _hyphenateStyleName = $__require('npm:hyphenate-style-name@1.0.1.js');
  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);
  var _capitalizeString = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js');
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  var _isPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/isPrefixedValue.js');
  var _isPrefixedValue2 = _interopRequireDefault(_isPrefixedValue);
  var _prefixProps = $__require('npm:inline-style-prefixer@2.0.1/lib/static/prefixProps.js');
  var _prefixProps2 = _interopRequireDefault(_prefixProps);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var properties = {
    transition: true,
    transitionProperty: true,
    WebkitTransition: true,
    WebkitTransitionProperty: true
  };
  function transition(property, value) {
    if (typeof value === 'string' && properties[property]) {
      var _ref2;
      var outputValue = prefixValue(value);
      var webkitOutput = outputValue.split(/,(?![^()]*(?:\([^()]*\))?\))/g).filter(function(value) {
        return value.match(/-moz-|-ms-/) === null;
      }).join(',');
      if (property.indexOf('Webkit') > -1) {
        return _defineProperty({}, property, webkitOutput);
      }
      return _ref2 = {}, _defineProperty(_ref2, 'Webkit' + (0, _capitalizeString2.default)(property), webkitOutput), _defineProperty(_ref2, property, outputValue), _ref2;
    }
  }
  function prefixValue(value) {
    if ((0, _isPrefixedValue2.default)(value)) {
      return value;
    }
    var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
    multipleValues.forEach(function(val, index) {
      multipleValues[index] = Object.keys(_prefixProps2.default).reduce(function(out, prefix) {
        var dashCasePrefix = '-' + prefix.toLowerCase() + '-';
        Object.keys(_prefixProps2.default[prefix]).forEach(function(prop) {
          var dashCaseProperty = (0, _hyphenateStyleName2.default)(prop);
          if (val.indexOf(dashCaseProperty) > -1 && dashCaseProperty !== 'order') {
            out = val.replace(dashCaseProperty, dashCasePrefix + dashCaseProperty) + ',' + out;
          }
        });
        return out;
      }, val);
    });
    return multipleValues.join(',');
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxIE.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flexboxIE;
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };
  function flexboxIE(property, value) {
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxOld.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flexboxOld;
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var alternativeValues = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple'
  };
  var alternativeProps = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };
  function flexboxOld(property, value) {
    if (property === 'flexDirection') {
      return {
        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
      };
    }
    if (alternativeProps[property]) {
      return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/static/prefixAll.js", ["npm:inline-style-prefixer@2.0.1/lib/static/prefixProps.js", "npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/calc.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/cursor.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/flex.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/sizing.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/gradient.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/transition.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxIE.js", "npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxOld.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = prefixAll;
  var _prefixProps = $__require('npm:inline-style-prefixer@2.0.1/lib/static/prefixProps.js');
  var _prefixProps2 = _interopRequireDefault(_prefixProps);
  var _capitalizeString = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js');
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  var _calc = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/calc.js');
  var _calc2 = _interopRequireDefault(_calc);
  var _cursor = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/cursor.js');
  var _cursor2 = _interopRequireDefault(_cursor);
  var _flex = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/flex.js');
  var _flex2 = _interopRequireDefault(_flex);
  var _sizing = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/sizing.js');
  var _sizing2 = _interopRequireDefault(_sizing);
  var _gradient = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/gradient.js');
  var _gradient2 = _interopRequireDefault(_gradient);
  var _transition = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/transition.js');
  var _transition2 = _interopRequireDefault(_transition);
  var _flexboxIE = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxIE.js');
  var _flexboxIE2 = _interopRequireDefault(_flexboxIE);
  var _flexboxOld = $__require('npm:inline-style-prefixer@2.0.1/lib/static/plugins/flexboxOld.js');
  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var plugins = [_calc2.default, _cursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];
  function prefixAll(styles) {
    Object.keys(styles).forEach(function(property) {
      var value = styles[property];
      if (value instanceof Object && !Array.isArray(value)) {
        styles[property] = prefixAll(value);
      } else {
        Object.keys(_prefixProps2.default).forEach(function(prefix) {
          var properties = _prefixProps2.default[prefix];
          if (properties[property]) {
            styles[prefix + (0, _capitalizeString2.default)(property)] = value;
          }
        });
      }
    });
    Object.keys(styles).forEach(function(property) {
      [].concat(styles[property]).forEach(function(value, index) {
        plugins.forEach(function(plugin) {
          return assignStyles(styles, plugin(property, value));
        });
      });
    });
    return styles;
  }
  function assignStyles(base) {
    var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    Object.keys(extend).forEach(function(property) {
      var baseValue = base[property];
      if (Array.isArray(baseValue)) {
        [].concat(extend[property]).forEach(function(value) {
          var valueIndex = baseValue.indexOf(value);
          if (valueIndex > -1) {
            base[property].splice(valueIndex, 1);
          }
          base[property].push(value);
        });
      } else {
        base[property] = extend[property];
      }
    });
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:bowser@1.4.1/src/bowser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  "format cjs";
  !function(name, definition) {
    if (typeof module != 'undefined' && module.exports)
      module.exports = definition();
    else if (typeof define == 'function' && define.amd)
      define(definition);
    else
      this[name] = definition();
  }('bowser', function() {
    var t = true;
    function detect(ua) {
      function getFirstMatch(regex) {
        var match = ua.match(regex);
        return (match && match.length > 1 && match[1]) || '';
      }
      function getSecondMatch(regex) {
        var match = ua.match(regex);
        return (match && match.length > 1 && match[2]) || '';
      }
      var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
          likeAndroid = /like android/i.test(ua),
          android = !likeAndroid && /android/i.test(ua),
          nexusMobile = /nexus\s*[0-6]\s*/i.test(ua),
          nexusTablet = !nexusMobile && /nexus\s*[0-9]+/i.test(ua),
          chromeos = /CrOS/.test(ua),
          silk = /silk/i.test(ua),
          sailfish = /sailfish/i.test(ua),
          tizen = /tizen/i.test(ua),
          webos = /(web|hpw)os/i.test(ua),
          windowsphone = /windows phone/i.test(ua),
          windows = !windowsphone && /windows/i.test(ua),
          mac = !iosdevice && !silk && /macintosh/i.test(ua),
          linux = !android && !sailfish && !tizen && !webos && /linux/i.test(ua),
          edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
          versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
          tablet = /tablet/i.test(ua),
          mobile = !tablet && /[^-]mobi/i.test(ua),
          xbox = /xbox/i.test(ua),
          result;
      if (/opera|opr|opios/i.test(ua)) {
        result = {
          name: 'Opera',
          opera: t,
          version: versionIdentifier || getFirstMatch(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/coast/i.test(ua)) {
        result = {
          name: 'Opera Coast',
          coast: t,
          version: versionIdentifier || getFirstMatch(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/yabrowser/i.test(ua)) {
        result = {
          name: 'Yandex Browser',
          yandexbrowser: t,
          version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/ucbrowser/i.test(ua)) {
        result = {
          name: 'UC Browser',
          ucbrowser: t,
          version: getFirstMatch(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/mxios/i.test(ua)) {
        result = {
          name: 'Maxthon',
          maxthon: t,
          version: getFirstMatch(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/epiphany/i.test(ua)) {
        result = {
          name: 'Epiphany',
          epiphany: t,
          version: getFirstMatch(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/puffin/i.test(ua)) {
        result = {
          name: 'Puffin',
          puffin: t,
          version: getFirstMatch(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
        };
      } else if (/sleipnir/i.test(ua)) {
        result = {
          name: 'Sleipnir',
          sleipnir: t,
          version: getFirstMatch(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (/k-meleon/i.test(ua)) {
        result = {
          name: 'K-Meleon',
          kMeleon: t,
          version: getFirstMatch(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
        };
      } else if (windowsphone) {
        result = {
          name: 'Windows Phone',
          windowsphone: t
        };
        if (edgeVersion) {
          result.msedge = t;
          result.version = edgeVersion;
        } else {
          result.msie = t;
          result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
        }
      } else if (/msie|trident/i.test(ua)) {
        result = {
          name: 'Internet Explorer',
          msie: t,
          version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        };
      } else if (chromeos) {
        result = {
          name: 'Chrome',
          chromeos: t,
          chromeBook: t,
          chrome: t,
          version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (/chrome.+? edge/i.test(ua)) {
        result = {
          name: 'Microsoft Edge',
          msedge: t,
          version: edgeVersion
        };
      } else if (/vivaldi/i.test(ua)) {
        result = {
          name: 'Vivaldi',
          vivaldi: t,
          version: getFirstMatch(/vivaldi\/(\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (sailfish) {
        result = {
          name: 'Sailfish',
          sailfish: t,
          version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
        };
      } else if (/seamonkey\//i.test(ua)) {
        result = {
          name: 'SeaMonkey',
          seamonkey: t,
          version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
        };
      } else if (/firefox|iceweasel|fxios/i.test(ua)) {
        result = {
          name: 'Firefox',
          firefox: t,
          version: getFirstMatch(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        };
        if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
          result.firefoxos = t;
        }
      } else if (silk) {
        result = {
          name: 'Amazon Silk',
          silk: t,
          version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
        };
      } else if (/phantom/i.test(ua)) {
        result = {
          name: 'PhantomJS',
          phantom: t,
          version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
        };
      } else if (/slimerjs/i.test(ua)) {
        result = {
          name: 'SlimerJS',
          slimer: t,
          version: getFirstMatch(/slimerjs\/(\d+(\.\d+)?)/i)
        };
      } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
        result = {
          name: 'BlackBerry',
          blackberry: t,
          version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        };
      } else if (webos) {
        result = {
          name: 'WebOS',
          webos: t,
          version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
        };
        /touchpad\//i.test(ua) && (result.touchpad = t);
      } else if (/bada/i.test(ua)) {
        result = {
          name: 'Bada',
          bada: t,
          version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
        };
      } else if (tizen) {
        result = {
          name: 'Tizen',
          tizen: t,
          version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
        };
      } else if (/qupzilla/i.test(ua)) {
        result = {
          name: 'QupZilla',
          qupzilla: t,
          version: getFirstMatch(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || versionIdentifier
        };
      } else if (/chromium/i.test(ua)) {
        result = {
          name: 'Chromium',
          chromium: t,
          version: getFirstMatch(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier
        };
      } else if (/chrome|crios|crmo/i.test(ua)) {
        result = {
          name: 'Chrome',
          chrome: t,
          version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (android) {
        result = {
          name: 'Android',
          version: versionIdentifier
        };
      } else if (/safari|applewebkit/i.test(ua)) {
        result = {
          name: 'Safari',
          safari: t
        };
        if (versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (iosdevice) {
        result = {name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'};
        if (versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (/googlebot/i.test(ua)) {
        result = {
          name: 'Googlebot',
          googlebot: t,
          version: getFirstMatch(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier
        };
      } else {
        result = {
          name: getFirstMatch(/^(.*)\/(.*) /),
          version: getSecondMatch(/^(.*)\/(.*) /)
        };
      }
      if (!result.msedge && /(apple)?webkit/i.test(ua)) {
        if (/(apple)?webkit\/537\.36/i.test(ua)) {
          result.name = result.name || "Blink";
          result.blink = t;
        } else {
          result.name = result.name || "Webkit";
          result.webkit = t;
        }
        if (!result.version && versionIdentifier) {
          result.version = versionIdentifier;
        }
      } else if (!result.opera && /gecko\//i.test(ua)) {
        result.name = result.name || "Gecko";
        result.gecko = t;
        result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
      }
      if (!result.msedge && (android || result.silk)) {
        result.android = t;
      } else if (iosdevice) {
        result[iosdevice] = t;
        result.ios = t;
      } else if (mac) {
        result.mac = t;
      } else if (xbox) {
        result.xbox = t;
      } else if (windows) {
        result.windows = t;
      } else if (linux) {
        result.linux = t;
      }
      var osVersion = '';
      if (result.windowsphone) {
        osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
      } else if (iosdevice) {
        osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
        osVersion = osVersion.replace(/[_\s]/g, '.');
      } else if (android) {
        osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
      } else if (result.webos) {
        osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
      } else if (result.blackberry) {
        osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
      } else if (result.bada) {
        osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
      } else if (result.tizen) {
        osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
      }
      if (osVersion) {
        result.osversion = osVersion;
      }
      var osMajorVersion = osVersion.split('.')[0];
      if (tablet || nexusTablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile))) || result.silk) {
        result.tablet = t;
      } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || nexusMobile || result.blackberry || result.webos || result.bada) {
        result.mobile = t;
      }
      if (result.msedge || (result.msie && result.version >= 10) || (result.yandexbrowser && result.version >= 15) || (result.vivaldi && result.version >= 1.0) || (result.chrome && result.version >= 20) || (result.firefox && result.version >= 20.0) || (result.safari && result.version >= 6) || (result.opera && result.version >= 10.0) || (result.ios && result.osversion && result.osversion.split(".")[0] >= 6) || (result.blackberry && result.version >= 10.1) || (result.chromium && result.version >= 20)) {
        result.a = t;
      } else if ((result.msie && result.version < 10) || (result.chrome && result.version < 20) || (result.firefox && result.version < 20.0) || (result.safari && result.version < 6) || (result.opera && result.version < 10.0) || (result.ios && result.osversion && result.osversion.split(".")[0] < 6) || (result.chromium && result.version < 20)) {
        result.c = t;
      } else
        result.x = t;
      return result;
    }
    var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');
    bowser.test = function(browserList) {
      for (var i = 0; i < browserList.length; ++i) {
        var browserItem = browserList[i];
        if (typeof browserItem === 'string') {
          if (browserItem in bowser) {
            return true;
          }
        }
      }
      return false;
    };
    function getVersionPrecision(version) {
      return version.split(".").length;
    }
    function map(arr, iterator) {
      var result = [],
          i;
      if (Array.prototype.map) {
        return Array.prototype.map.call(arr, iterator);
      }
      for (i = 0; i < arr.length; i++) {
        result = iterator(arr[i]);
      }
      return result;
    }
    function compareVersions(versions) {
      var precision = Math.max(getVersionPrecision(versions[0]), getVersionPrecision(versions[1]));
      var chunks = map(versions, function(version) {
        var delta = precision - getVersionPrecision(version);
        version = version + new Array(delta + 1).join(".0");
        return map(version.split("."), function(chunk) {
          return new Array(20 - chunk.length).join("0") + chunk;
        }).reverse();
      });
      while (--precision >= 0) {
        if (chunks[0][precision] > chunks[1][precision]) {
          return 1;
        } else if (chunks[0][precision] === chunks[1][precision]) {
          if (precision === 0) {
            return 0;
          }
        } else {
          return -1;
        }
      }
    }
    function isUnsupportedBrowser(minVersions, strictMode, ua) {
      var _bowser = bowser;
      if (typeof strictMode === 'string') {
        ua = strictMode;
        strictMode = void(0);
      }
      if (strictMode === void(0)) {
        strictMode = false;
      }
      if (ua) {
        _bowser = detect(ua);
      }
      var version = "" + _bowser.version;
      for (var browser in minVersions) {
        if (minVersions.hasOwnProperty(browser)) {
          if (_bowser[browser]) {
            return compareVersions([version, minVersions[browser]]) < 0;
          }
        }
      }
      return strictMode;
    }
    function check(minVersions, strictMode, ua) {
      return !isUnsupportedBrowser(minVersions, strictMode, ua);
    }
    bowser.isUnsupportedBrowser = isUnsupportedBrowser;
    bowser.compareVersions = compareVersions;
    bowser.check = check;
    bowser._detect = detect;
    return bowser;
  });
  return module.exports;
});

System.registerDynamic("npm:bowser@1.4.1.js", ["npm:bowser@1.4.1/src/bowser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:bowser@1.4.1/src/bowser.js');
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/getBrowserInformation.js", ["npm:bowser@1.4.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _bowser = $__require('npm:bowser@1.4.1.js');
  var _bowser2 = _interopRequireDefault(_bowser);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var vendorPrefixes = {
    Webkit: ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen', 'chromium', 'vivaldi'],
    Moz: ['firefox', 'seamonkey', 'sailfish'],
    ms: ['msie', 'msedge']
  };
  var browsers = {
    chrome: [['chrome'], ['chromium']],
    safari: [['safari']],
    firefox: [['firefox']],
    ie: [['msie']],
    edge: [['msedge']],
    opera: [['opera'], ['vivaldi']],
    ios_saf: [['ios', 'mobile'], ['ios', 'tablet']],
    ie_mob: [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
    op_mini: [['opera', 'mobile'], ['opera', 'tablet']],
    and_uc: [['android', 'mobile'], ['android', 'tablet']],
    android: [['android', 'mobile'], ['android', 'tablet']]
  };
  exports.default = function(userAgent) {
    if (!userAgent) {
      return false;
    }
    var info = _bowser2.default._detect(userAgent);
    Object.keys(vendorPrefixes).forEach(function(prefix) {
      vendorPrefixes[prefix].forEach(function(browser) {
        if (info[browser]) {
          info.prefix = {
            inline: prefix,
            css: '-' + prefix.toLowerCase() + '-'
          };
        }
      });
    });
    var name = '';
    Object.keys(browsers).forEach(function(browser) {
      browsers[browser].forEach(function(condition) {
        var match = 0;
        condition.forEach(function(single) {
          if (info[single]) {
            match += 1;
          }
        });
        if (condition.length === match) {
          name = browser;
        }
      });
    });
    info.browser = name;
    info.version = info.version ? parseFloat(info.version) : parseInt(parseFloat(info.osversion), 10);
    if (info.browser === 'android' && info.chrome && info.version > 37) {
      info.browser = 'and_chr';
    }
    info.version = parseFloat(info.version);
    info.osversion = parseFloat(info.osversion);
    if (info.browser === 'android' && info.osversion < 5) {
      info.version = info.osversion;
    }
    return info;
  };
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedKeyframes.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(_ref) {
    var browser = _ref.browser;
    var version = _ref.version;
    var prefix = _ref.prefix;
    var prefixedKeyframes = 'keyframes';
    if (browser === 'chrome' && version < 43 || (browser === 'safari' || browser === 'ios_saf') && version < 9 || browser === 'opera' && version < 30 || browser === 'android' && version <= 4.4 || browser === 'and_uc') {
      prefixedKeyframes = prefix.css + prefixedKeyframes;
    }
    return prefixedKeyframes;
  };
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/prefixProps.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = {
    "chrome": {
      "transform": 35,
      "transformOrigin": 35,
      "transformOriginX": 35,
      "transformOriginY": 35,
      "backfaceVisibility": 35,
      "perspective": 35,
      "perspectiveOrigin": 35,
      "transformStyle": 35,
      "transformOriginZ": 35,
      "animation": 42,
      "animationDelay": 42,
      "animationDirection": 42,
      "animationFillMode": 42,
      "animationDuration": 42,
      "animationIterationCount": 42,
      "animationName": 42,
      "animationPlayState": 42,
      "animationTimingFunction": 42,
      "appearance": 54,
      "userSelect": 54,
      "fontKerning": 32,
      "textEmphasisPosition": 54,
      "textEmphasis": 54,
      "textEmphasisStyle": 54,
      "textEmphasisColor": 54,
      "boxDecorationBreak": 54,
      "clipPath": 54,
      "maskImage": 54,
      "maskMode": 54,
      "maskRepeat": 54,
      "maskPosition": 54,
      "maskClip": 54,
      "maskOrigin": 54,
      "maskSize": 54,
      "maskComposite": 54,
      "mask": 54,
      "maskBorderSource": 54,
      "maskBorderMode": 54,
      "maskBorderSlice": 54,
      "maskBorderWidth": 54,
      "maskBorderOutset": 54,
      "maskBorderRepeat": 54,
      "maskBorder": 54,
      "maskType": 54,
      "textDecorationStyle": 54,
      "textDecorationSkip": 54,
      "textDecorationLine": 54,
      "textDecorationColor": 54,
      "filter": 54,
      "fontFeatureSettings": 47,
      "breakAfter": 49,
      "breakBefore": 49,
      "breakInside": 49,
      "columnCount": 49,
      "columnFill": 49,
      "columnGap": 49,
      "columnRule": 49,
      "columnRuleColor": 49,
      "columnRuleStyle": 49,
      "columnRuleWidth": 49,
      "columns": 49,
      "columnSpan": 49,
      "columnWidth": 49
    },
    "safari": {
      "flex": 8,
      "flexBasis": 8,
      "flexDirection": 8,
      "flexGrow": 8,
      "flexFlow": 8,
      "flexShrink": 8,
      "flexWrap": 8,
      "alignContent": 8,
      "alignItems": 8,
      "alignSelf": 8,
      "justifyContent": 8,
      "order": 8,
      "transition": 6,
      "transitionDelay": 6,
      "transitionDuration": 6,
      "transitionProperty": 6,
      "transitionTimingFunction": 6,
      "transform": 8,
      "transformOrigin": 8,
      "transformOriginX": 8,
      "transformOriginY": 8,
      "backfaceVisibility": 8,
      "perspective": 8,
      "perspectiveOrigin": 8,
      "transformStyle": 8,
      "transformOriginZ": 8,
      "animation": 8,
      "animationDelay": 8,
      "animationDirection": 8,
      "animationFillMode": 8,
      "animationDuration": 8,
      "animationIterationCount": 8,
      "animationName": 8,
      "animationPlayState": 8,
      "animationTimingFunction": 8,
      "appearance": 10,
      "userSelect": 10,
      "backdropFilter": 10,
      "fontKerning": 9,
      "scrollSnapType": 10,
      "scrollSnapPointsX": 10,
      "scrollSnapPointsY": 10,
      "scrollSnapDestination": 10,
      "scrollSnapCoordinate": 10,
      "textEmphasisPosition": 7,
      "textEmphasis": 7,
      "textEmphasisStyle": 7,
      "textEmphasisColor": 7,
      "boxDecorationBreak": 10,
      "clipPath": 10,
      "maskImage": 10,
      "maskMode": 10,
      "maskRepeat": 10,
      "maskPosition": 10,
      "maskClip": 10,
      "maskOrigin": 10,
      "maskSize": 10,
      "maskComposite": 10,
      "mask": 10,
      "maskBorderSource": 10,
      "maskBorderMode": 10,
      "maskBorderSlice": 10,
      "maskBorderWidth": 10,
      "maskBorderOutset": 10,
      "maskBorderRepeat": 10,
      "maskBorder": 10,
      "maskType": 10,
      "textDecorationStyle": 10,
      "textDecorationSkip": 10,
      "textDecorationLine": 10,
      "textDecorationColor": 10,
      "shapeImageThreshold": 10,
      "shapeImageMargin": 10,
      "shapeImageOutside": 10,
      "filter": 9,
      "hyphens": 10,
      "flowInto": 10,
      "flowFrom": 10,
      "breakBefore": 8,
      "breakAfter": 8,
      "breakInside": 8,
      "regionFragment": 10,
      "columnCount": 8,
      "columnFill": 8,
      "columnGap": 8,
      "columnRule": 8,
      "columnRuleColor": 8,
      "columnRuleStyle": 8,
      "columnRuleWidth": 8,
      "columns": 8,
      "columnSpan": 8,
      "columnWidth": 8
    },
    "firefox": {
      "appearance": 50,
      "userSelect": 50,
      "boxSizing": 28,
      "textAlignLast": 48,
      "textDecorationStyle": 35,
      "textDecorationSkip": 35,
      "textDecorationLine": 35,
      "textDecorationColor": 35,
      "tabSize": 50,
      "hyphens": 42,
      "fontFeatureSettings": 33,
      "breakAfter": 50,
      "breakBefore": 50,
      "breakInside": 50,
      "columnCount": 50,
      "columnFill": 50,
      "columnGap": 50,
      "columnRule": 50,
      "columnRuleColor": 50,
      "columnRuleStyle": 50,
      "columnRuleWidth": 50,
      "columns": 50,
      "columnSpan": 50,
      "columnWidth": 50
    },
    "opera": {
      "flex": 16,
      "flexBasis": 16,
      "flexDirection": 16,
      "flexGrow": 16,
      "flexFlow": 16,
      "flexShrink": 16,
      "flexWrap": 16,
      "alignContent": 16,
      "alignItems": 16,
      "alignSelf": 16,
      "justifyContent": 16,
      "order": 16,
      "transform": 22,
      "transformOrigin": 22,
      "transformOriginX": 22,
      "transformOriginY": 22,
      "backfaceVisibility": 22,
      "perspective": 22,
      "perspectiveOrigin": 22,
      "transformStyle": 22,
      "transformOriginZ": 22,
      "animation": 29,
      "animationDelay": 29,
      "animationDirection": 29,
      "animationFillMode": 29,
      "animationDuration": 29,
      "animationIterationCount": 29,
      "animationName": 29,
      "animationPlayState": 29,
      "animationTimingFunction": 29,
      "appearance": 40,
      "userSelect": 40,
      "fontKerning": 19,
      "textEmphasisPosition": 40,
      "textEmphasis": 40,
      "textEmphasisStyle": 40,
      "textEmphasisColor": 40,
      "boxDecorationBreak": 40,
      "clipPath": 40,
      "maskImage": 40,
      "maskMode": 40,
      "maskRepeat": 40,
      "maskPosition": 40,
      "maskClip": 40,
      "maskOrigin": 40,
      "maskSize": 40,
      "maskComposite": 40,
      "mask": 40,
      "maskBorderSource": 40,
      "maskBorderMode": 40,
      "maskBorderSlice": 40,
      "maskBorderWidth": 40,
      "maskBorderOutset": 40,
      "maskBorderRepeat": 40,
      "maskBorder": 40,
      "maskType": 40,
      "textDecorationStyle": 40,
      "textDecorationSkip": 40,
      "textDecorationLine": 40,
      "textDecorationColor": 40,
      "filter": 40,
      "fontFeatureSettings": 34,
      "breakAfter": 36,
      "breakBefore": 36,
      "breakInside": 36,
      "columnCount": 36,
      "columnFill": 36,
      "columnGap": 36,
      "columnRule": 36,
      "columnRuleColor": 36,
      "columnRuleStyle": 36,
      "columnRuleWidth": 36,
      "columns": 36,
      "columnSpan": 36,
      "columnWidth": 36
    },
    "ie": {
      "flex": 10,
      "flexDirection": 10,
      "flexFlow": 10,
      "flexWrap": 10,
      "transform": 9,
      "transformOrigin": 9,
      "transformOriginX": 9,
      "transformOriginY": 9,
      "userSelect": 11,
      "wrapFlow": 11,
      "wrapThrough": 11,
      "wrapMargin": 11,
      "scrollSnapType": 11,
      "scrollSnapPointsX": 11,
      "scrollSnapPointsY": 11,
      "scrollSnapDestination": 11,
      "scrollSnapCoordinate": 11,
      "touchAction": 10,
      "hyphens": 11,
      "flowInto": 11,
      "flowFrom": 11,
      "breakBefore": 11,
      "breakAfter": 11,
      "breakInside": 11,
      "regionFragment": 11,
      "gridTemplateColumns": 11,
      "gridTemplateRows": 11,
      "gridTemplateAreas": 11,
      "gridTemplate": 11,
      "gridAutoColumns": 11,
      "gridAutoRows": 11,
      "gridAutoFlow": 11,
      "grid": 11,
      "gridRowStart": 11,
      "gridColumnStart": 11,
      "gridRowEnd": 11,
      "gridRow": 11,
      "gridColumn": 11,
      "gridColumnEnd": 11,
      "gridColumnGap": 11,
      "gridRowGap": 11,
      "gridArea": 11,
      "gridGap": 11,
      "textSizeAdjust": 11
    },
    "edge": {
      "userSelect": 14,
      "wrapFlow": 14,
      "wrapThrough": 14,
      "wrapMargin": 14,
      "scrollSnapType": 14,
      "scrollSnapPointsX": 14,
      "scrollSnapPointsY": 14,
      "scrollSnapDestination": 14,
      "scrollSnapCoordinate": 14,
      "hyphens": 14,
      "flowInto": 14,
      "flowFrom": 14,
      "breakBefore": 14,
      "breakAfter": 14,
      "breakInside": 14,
      "regionFragment": 14,
      "gridTemplateColumns": 14,
      "gridTemplateRows": 14,
      "gridTemplateAreas": 14,
      "gridTemplate": 14,
      "gridAutoColumns": 14,
      "gridAutoRows": 14,
      "gridAutoFlow": 14,
      "grid": 14,
      "gridRowStart": 14,
      "gridColumnStart": 14,
      "gridRowEnd": 14,
      "gridRow": 14,
      "gridColumn": 14,
      "gridColumnEnd": 14,
      "gridColumnGap": 14,
      "gridRowGap": 14,
      "gridArea": 14,
      "gridGap": 14
    },
    "ios_saf": {
      "flex": 8.1,
      "flexBasis": 8.1,
      "flexDirection": 8.1,
      "flexGrow": 8.1,
      "flexFlow": 8.1,
      "flexShrink": 8.1,
      "flexWrap": 8.1,
      "alignContent": 8.1,
      "alignItems": 8.1,
      "alignSelf": 8.1,
      "justifyContent": 8.1,
      "order": 8.1,
      "transition": 6,
      "transitionDelay": 6,
      "transitionDuration": 6,
      "transitionProperty": 6,
      "transitionTimingFunction": 6,
      "transform": 8.1,
      "transformOrigin": 8.1,
      "transformOriginX": 8.1,
      "transformOriginY": 8.1,
      "backfaceVisibility": 8.1,
      "perspective": 8.1,
      "perspectiveOrigin": 8.1,
      "transformStyle": 8.1,
      "transformOriginZ": 8.1,
      "animation": 8.1,
      "animationDelay": 8.1,
      "animationDirection": 8.1,
      "animationFillMode": 8.1,
      "animationDuration": 8.1,
      "animationIterationCount": 8.1,
      "animationName": 8.1,
      "animationPlayState": 8.1,
      "animationTimingFunction": 8.1,
      "appearance": 9.3,
      "userSelect": 9.3,
      "backdropFilter": 9.3,
      "fontKerning": 9.3,
      "scrollSnapType": 9.3,
      "scrollSnapPointsX": 9.3,
      "scrollSnapPointsY": 9.3,
      "scrollSnapDestination": 9.3,
      "scrollSnapCoordinate": 9.3,
      "boxDecorationBreak": 9.3,
      "clipPath": 9.3,
      "maskImage": 9.3,
      "maskMode": 9.3,
      "maskRepeat": 9.3,
      "maskPosition": 9.3,
      "maskClip": 9.3,
      "maskOrigin": 9.3,
      "maskSize": 9.3,
      "maskComposite": 9.3,
      "mask": 9.3,
      "maskBorderSource": 9.3,
      "maskBorderMode": 9.3,
      "maskBorderSlice": 9.3,
      "maskBorderWidth": 9.3,
      "maskBorderOutset": 9.3,
      "maskBorderRepeat": 9.3,
      "maskBorder": 9.3,
      "maskType": 9.3,
      "textSizeAdjust": 9.3,
      "textDecorationStyle": 9.3,
      "textDecorationSkip": 9.3,
      "textDecorationLine": 9.3,
      "textDecorationColor": 9.3,
      "shapeImageThreshold": 9.3,
      "shapeImageMargin": 9.3,
      "shapeImageOutside": 9.3,
      "filter": 9,
      "hyphens": 9.3,
      "flowInto": 9.3,
      "flowFrom": 9.3,
      "breakBefore": 8.1,
      "breakAfter": 8.1,
      "breakInside": 8.1,
      "regionFragment": 9.3,
      "columnCount": 8.1,
      "columnFill": 8.1,
      "columnGap": 8.1,
      "columnRule": 8.1,
      "columnRuleColor": 8.1,
      "columnRuleStyle": 8.1,
      "columnRuleWidth": 8.1,
      "columns": 8.1,
      "columnSpan": 8.1,
      "columnWidth": 8.1
    },
    "android": {
      "borderImage": 4.2,
      "borderImageOutset": 4.2,
      "borderImageRepeat": 4.2,
      "borderImageSlice": 4.2,
      "borderImageSource": 4.2,
      "borderImageWidth": 4.2,
      "flex": 4.2,
      "flexBasis": 4.2,
      "flexDirection": 4.2,
      "flexGrow": 4.2,
      "flexFlow": 4.2,
      "flexShrink": 4.2,
      "flexWrap": 4.2,
      "alignContent": 4.2,
      "alignItems": 4.2,
      "alignSelf": 4.2,
      "justifyContent": 4.2,
      "order": 4.2,
      "transition": 4.2,
      "transitionDelay": 4.2,
      "transitionDuration": 4.2,
      "transitionProperty": 4.2,
      "transitionTimingFunction": 4.2,
      "transform": 4.4,
      "transformOrigin": 4.4,
      "transformOriginX": 4.4,
      "transformOriginY": 4.4,
      "backfaceVisibility": 4.4,
      "perspective": 4.4,
      "perspectiveOrigin": 4.4,
      "transformStyle": 4.4,
      "transformOriginZ": 4.4,
      "animation": 4.4,
      "animationDelay": 4.4,
      "animationDirection": 4.4,
      "animationFillMode": 4.4,
      "animationDuration": 4.4,
      "animationIterationCount": 4.4,
      "animationName": 4.4,
      "animationPlayState": 4.4,
      "animationTimingFunction": 4.4,
      "appearance": 50,
      "userSelect": 50,
      "fontKerning": 4.4,
      "textEmphasisPosition": 50,
      "textEmphasis": 50,
      "textEmphasisStyle": 50,
      "textEmphasisColor": 50,
      "boxDecorationBreak": 50,
      "clipPath": 50,
      "maskImage": 50,
      "maskMode": 50,
      "maskRepeat": 50,
      "maskPosition": 50,
      "maskClip": 50,
      "maskOrigin": 50,
      "maskSize": 50,
      "maskComposite": 50,
      "mask": 50,
      "maskBorderSource": 50,
      "maskBorderMode": 50,
      "maskBorderSlice": 50,
      "maskBorderWidth": 50,
      "maskBorderOutset": 50,
      "maskBorderRepeat": 50,
      "maskBorder": 50,
      "maskType": 50,
      "filter": 50,
      "fontFeatureSettings": 4.4,
      "breakAfter": 50,
      "breakBefore": 50,
      "breakInside": 50,
      "columnCount": 50,
      "columnFill": 50,
      "columnGap": 50,
      "columnRule": 50,
      "columnRuleColor": 50,
      "columnRuleStyle": 50,
      "columnRuleWidth": 50,
      "columns": 50,
      "columnSpan": 50,
      "columnWidth": 50
    },
    "and_chr": {
      "appearance": 50,
      "userSelect": 50,
      "textEmphasisPosition": 50,
      "textEmphasis": 50,
      "textEmphasisStyle": 50,
      "textEmphasisColor": 50,
      "boxDecorationBreak": 50,
      "clipPath": 50,
      "maskImage": 50,
      "maskMode": 50,
      "maskRepeat": 50,
      "maskPosition": 50,
      "maskClip": 50,
      "maskOrigin": 50,
      "maskSize": 50,
      "maskComposite": 50,
      "mask": 50,
      "maskBorderSource": 50,
      "maskBorderMode": 50,
      "maskBorderSlice": 50,
      "maskBorderWidth": 50,
      "maskBorderOutset": 50,
      "maskBorderRepeat": 50,
      "maskBorder": 50,
      "maskType": 50,
      "textDecorationStyle": 50,
      "textDecorationSkip": 50,
      "textDecorationLine": 50,
      "textDecorationColor": 50,
      "filter": 50,
      "fontFeatureSettings": 50
    },
    "and_uc": {
      "flex": 9.9,
      "flexBasis": 9.9,
      "flexDirection": 9.9,
      "flexGrow": 9.9,
      "flexFlow": 9.9,
      "flexShrink": 9.9,
      "flexWrap": 9.9,
      "alignContent": 9.9,
      "alignItems": 9.9,
      "alignSelf": 9.9,
      "justifyContent": 9.9,
      "order": 9.9,
      "transition": 9.9,
      "transitionDelay": 9.9,
      "transitionDuration": 9.9,
      "transitionProperty": 9.9,
      "transitionTimingFunction": 9.9,
      "transform": 9.9,
      "transformOrigin": 9.9,
      "transformOriginX": 9.9,
      "transformOriginY": 9.9,
      "backfaceVisibility": 9.9,
      "perspective": 9.9,
      "perspectiveOrigin": 9.9,
      "transformStyle": 9.9,
      "transformOriginZ": 9.9,
      "animation": 9.9,
      "animationDelay": 9.9,
      "animationDirection": 9.9,
      "animationFillMode": 9.9,
      "animationDuration": 9.9,
      "animationIterationCount": 9.9,
      "animationName": 9.9,
      "animationPlayState": 9.9,
      "animationTimingFunction": 9.9,
      "appearance": 9.9,
      "userSelect": 9.9,
      "fontKerning": 9.9,
      "textEmphasisPosition": 9.9,
      "textEmphasis": 9.9,
      "textEmphasisStyle": 9.9,
      "textEmphasisColor": 9.9,
      "maskImage": 9.9,
      "maskMode": 9.9,
      "maskRepeat": 9.9,
      "maskPosition": 9.9,
      "maskClip": 9.9,
      "maskOrigin": 9.9,
      "maskSize": 9.9,
      "maskComposite": 9.9,
      "mask": 9.9,
      "maskBorderSource": 9.9,
      "maskBorderMode": 9.9,
      "maskBorderSlice": 9.9,
      "maskBorderWidth": 9.9,
      "maskBorderOutset": 9.9,
      "maskBorderRepeat": 9.9,
      "maskBorder": 9.9,
      "maskType": 9.9,
      "textSizeAdjust": 9.9,
      "filter": 9.9,
      "hyphens": 9.9,
      "flowInto": 9.9,
      "flowFrom": 9.9,
      "breakBefore": 9.9,
      "breakAfter": 9.9,
      "breakInside": 9.9,
      "regionFragment": 9.9,
      "fontFeatureSettings": 9.9,
      "columnCount": 9.9,
      "columnFill": 9.9,
      "columnGap": 9.9,
      "columnRule": 9.9,
      "columnRuleColor": 9.9,
      "columnRuleStyle": 9.9,
      "columnRuleWidth": 9.9,
      "columns": 9.9,
      "columnSpan": 9.9,
      "columnWidth": 9.9
    },
    "op_mini": {
      "borderImage": 5,
      "borderImageOutset": 5,
      "borderImageRepeat": 5,
      "borderImageSlice": 5,
      "borderImageSource": 5,
      "borderImageWidth": 5,
      "tabSize": 5,
      "objectFit": 5,
      "objectPosition": 5
    }
  };
  module.exports = exports["default"];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/calc.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = calc;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function calc(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (typeof value === 'string' && value.indexOf('calc(') > -1 && (browser === 'firefox' && version < 15 || browser === 'chrome' && version < 25 || browser === 'safari' && version < 6.1 || browser === 'ios_saf' && version < 7)) {
      return _defineProperty({}, property, (0, _getPrefixedValue2.default)(value.replace(/calc\(/g, css + 'calc('), value, keepUnprefixed));
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/zoomCursor.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = zoomCursor;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var values = {
    'zoom-in': true,
    'zoom-out': true
  };
  function zoomCursor(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (property === 'cursor' && values[value] && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
      return {cursor: (0, _getPrefixedValue2.default)(css + value, value, keepUnprefixed)};
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/grabCursor.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = grabCursor;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var values = {
    grab: true,
    grabbing: true
  };
  function grabCursor(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (property === 'cursor' && values[value] && (browser === 'firefox' || browser === 'chrome' || browser === 'safari' || browser === 'opera')) {
      return {cursor: (0, _getPrefixedValue2.default)(css + value, value, keepUnprefixed)};
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/flex.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flex;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var values = {
    flex: true,
    'inline-flex': true
  };
  function flex(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (property === 'display' && values[value] && (browser === 'chrome' && version < 29 && version > 20 || (browser === 'safari' || browser === 'ios_saf') && version < 9 && version > 6 || browser === 'opera' && (version == 15 || version == 16))) {
      return {display: (0, _getPrefixedValue2.default)(css + value, value, keepUnprefixed)};
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/sizing.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = sizing;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var properties = {
    maxHeight: true,
    maxWidth: true,
    width: true,
    height: true,
    columnWidth: true,
    minWidth: true,
    minHeight: true
  };
  var values = {
    'min-content': true,
    'max-content': true,
    'fill-available': true,
    'fit-content': true,
    'contain-floats': true
  };
  function sizing(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (properties[property] && values[value]) {
      return _defineProperty({}, property, (0, _getPrefixedValue2.default)(css + value, value, keepUnprefixed));
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/gradient.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = gradient;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var values = /linear-gradient|radial-gradient|repeating-linear-gradient|repeating-radial-gradient/;
  function gradient(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if (typeof value === 'string' && value.match(values) !== null && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
      return _defineProperty({}, property, (0, _getPrefixedValue2.default)(css + value, value, keepUnprefixed));
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:hyphenate-style-name@1.0.1/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var uppercasePattern = /[A-Z]/g;
  var msPattern = /^ms-/;
  function hyphenateStyleName(string) {
    return string.replace(uppercasePattern, '-$&').toLowerCase().replace(msPattern, '-ms-');
  }
  module.exports = hyphenateStyleName;
  return module.exports;
});

System.registerDynamic("npm:hyphenate-style-name@1.0.1.js", ["npm:hyphenate-style-name@1.0.1/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:hyphenate-style-name@1.0.1/index.js');
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  module.exports = exports["default"];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/unprefixProperty.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(property) {
    var unprefixed = property.replace(/^(ms|Webkit|Moz|O)/, '');
    return unprefixed.charAt(0).toLowerCase() + unprefixed.slice(1);
  };
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/transition.js", ["npm:hyphenate-style-name@1.0.1.js", "npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js", "npm:inline-style-prefixer@2.0.1/lib/utils/unprefixProperty.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  exports.default = transition;
  var _hyphenateStyleName = $__require('npm:hyphenate-style-name@1.0.1.js');
  var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);
  var _capitalizeString = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js');
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  var _unprefixProperty = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/unprefixProperty.js');
  var _unprefixProperty2 = _interopRequireDefault(_unprefixProperty);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var properties = {
    transition: true,
    transitionProperty: true
  };
  function transition(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var css = _ref.prefix.css;
    var requiresPrefix = _ref.requiresPrefix;
    var keepUnprefixed = _ref.keepUnprefixed;
    var unprefixedProperty = (0, _unprefixProperty2.default)(property);
    if (typeof value === 'string' && properties[unprefixedProperty]) {
      var _ret = function() {
        var requiresPrefixDashCased = Object.keys(requiresPrefix).map(function(prop) {
          return (0, _hyphenateStyleName2.default)(prop);
        });
        var multipleValues = value.split(/,(?![^()]*(?:\([^()]*\))?\))/g);
        requiresPrefixDashCased.forEach(function(prop) {
          multipleValues.forEach(function(val, index) {
            if (val.indexOf(prop) > -1 && prop !== 'order') {
              multipleValues[index] = val.replace(prop, css + prop) + (keepUnprefixed ? ',' + val : '');
            }
          });
        });
        return {v: _defineProperty({}, property, multipleValues.join(','))};
      }();
      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
        return _ret.v;
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxIE.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flexboxIE;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var alternativeValues = {
    'space-around': 'distribute',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    flex: 'flexbox',
    'inline-flex': 'inline-flexbox'
  };
  var alternativeProps = {
    alignContent: 'msFlexLinePack',
    alignSelf: 'msFlexItemAlign',
    alignItems: 'msFlexAlign',
    justifyContent: 'msFlexPack',
    order: 'msFlexOrder',
    flexGrow: 'msFlexPositive',
    flexShrink: 'msFlexNegative',
    flexBasis: 'msPreferredSize'
  };
  function flexboxIE(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var styles = _ref.styles;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if ((alternativeProps[property] || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'ie_mob' || browser === 'ie') && version == 10) {
      if (!keepUnprefixed && !Array.isArray(styles[property])) {
        delete styles[property];
      }
      if (property === 'display' && alternativeValues[value]) {
        return {display: (0, _getPrefixedValue2.default)(css + alternativeValues[value], value, keepUnprefixed)};
      }
      if (alternativeProps[property]) {
        return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
      }
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = function(prefixedValue, value, keepUnprefixed) {
    return keepUnprefixed ? [prefixedValue, value] : prefixedValue;
  };
  module.exports = exports["default"];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxOld.js", ["npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = flexboxOld;
  var _getPrefixedValue = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedValue.js');
  var _getPrefixedValue2 = _interopRequireDefault(_getPrefixedValue);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var alternativeValues = {
    'space-around': 'justify',
    'space-between': 'justify',
    'flex-start': 'start',
    'flex-end': 'end',
    'wrap-reverse': 'multiple',
    wrap: 'multiple',
    flex: 'box',
    'inline-flex': 'inline-box'
  };
  var alternativeProps = {
    alignItems: 'WebkitBoxAlign',
    justifyContent: 'WebkitBoxPack',
    flexWrap: 'WebkitBoxLines'
  };
  var otherProps = ['alignContent', 'alignSelf', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection'];
  var properties = Object.keys(alternativeProps).concat(otherProps);
  function flexboxOld(_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var styles = _ref.styles;
    var _ref$browserInfo = _ref.browserInfo;
    var browser = _ref$browserInfo.browser;
    var version = _ref$browserInfo.version;
    var css = _ref.prefix.css;
    var keepUnprefixed = _ref.keepUnprefixed;
    if ((properties.indexOf(property) > -1 || property === 'display' && typeof value === 'string' && value.indexOf('flex') > -1) && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
      if (!keepUnprefixed && !Array.isArray(styles[property])) {
        delete styles[property];
      }
      if (property === 'flexDirection') {
        return {
          WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
          WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
        };
      }
      if (property === 'display' && alternativeValues[value]) {
        return {display: (0, _getPrefixedValue2.default)(css + alternativeValues[value], value, keepUnprefixed)};
      }
      if (alternativeProps[property]) {
        return _defineProperty({}, alternativeProps[property], alternativeValues[value] || value);
      }
    }
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1/lib/Prefixer.js", ["npm:inline-style-prefixer@2.0.1/lib/static/prefixAll.js", "npm:inline-style-prefixer@2.0.1/lib/utils/getBrowserInformation.js", "npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedKeyframes.js", "npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js", "npm:inline-style-prefixer@2.0.1/lib/prefixProps.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/calc.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/zoomCursor.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/grabCursor.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/flex.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/sizing.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/gradient.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/transition.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxIE.js", "npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxOld.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _prefixAll2 = $__require('npm:inline-style-prefixer@2.0.1/lib/static/prefixAll.js');
  var _prefixAll3 = _interopRequireDefault(_prefixAll2);
  var _getBrowserInformation = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getBrowserInformation.js');
  var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);
  var _getPrefixedKeyframes = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/getPrefixedKeyframes.js');
  var _getPrefixedKeyframes2 = _interopRequireDefault(_getPrefixedKeyframes);
  var _capitalizeString = $__require('npm:inline-style-prefixer@2.0.1/lib/utils/capitalizeString.js');
  var _capitalizeString2 = _interopRequireDefault(_capitalizeString);
  var _prefixProps = $__require('npm:inline-style-prefixer@2.0.1/lib/prefixProps.js');
  var _prefixProps2 = _interopRequireDefault(_prefixProps);
  var _calc = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/calc.js');
  var _calc2 = _interopRequireDefault(_calc);
  var _zoomCursor = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/zoomCursor.js');
  var _zoomCursor2 = _interopRequireDefault(_zoomCursor);
  var _grabCursor = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/grabCursor.js');
  var _grabCursor2 = _interopRequireDefault(_grabCursor);
  var _flex = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/flex.js');
  var _flex2 = _interopRequireDefault(_flex);
  var _sizing = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/sizing.js');
  var _sizing2 = _interopRequireDefault(_sizing);
  var _gradient = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/gradient.js');
  var _gradient2 = _interopRequireDefault(_gradient);
  var _transition = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/transition.js');
  var _transition2 = _interopRequireDefault(_transition);
  var _flexboxIE = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxIE.js');
  var _flexboxIE2 = _interopRequireDefault(_flexboxIE);
  var _flexboxOld = $__require('npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxOld.js');
  var _flexboxOld2 = _interopRequireDefault(_flexboxOld);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var plugins = [_calc2.default, _zoomCursor2.default, _grabCursor2.default, _sizing2.default, _gradient2.default, _transition2.default, _flexboxIE2.default, _flexboxOld2.default, _flex2.default];
  var Prefixer = function() {
    function Prefixer() {
      var _this = this;
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      _classCallCheck(this, Prefixer);
      var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
      this._userAgent = options.userAgent || defaultUserAgent;
      this._keepUnprefixed = options.keepUnprefixed || false;
      this._browserInfo = (0, _getBrowserInformation2.default)(this._userAgent);
      if (this._browserInfo && this._browserInfo.prefix) {
        this.cssPrefix = this._browserInfo.prefix.css;
        this.jsPrefix = this._browserInfo.prefix.inline;
        this.prefixedKeyframes = (0, _getPrefixedKeyframes2.default)(this._browserInfo);
      } else {
        this._usePrefixAllFallback = true;
        return false;
      }
      var data = this._browserInfo.browser && _prefixProps2.default[this._browserInfo.browser];
      if (data) {
        this._requiresPrefix = Object.keys(data).filter(function(key) {
          return data[key] >= _this._browserInfo.version;
        }).reduce(function(result, name) {
          result[name] = true;
          return result;
        }, {});
        this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
      } else {
        this._usePrefixAllFallback = true;
      }
    }
    _createClass(Prefixer, [{
      key: 'prefix',
      value: function prefix(styles) {
        var _this2 = this;
        if (this._usePrefixAllFallback) {
          return (0, _prefixAll3.default)(styles);
        }
        if (!this._hasPropsRequiringPrefix) {
          return styles;
        }
        Object.keys(styles).forEach(function(property) {
          var value = styles[property];
          if (value instanceof Object && !Array.isArray(value)) {
            styles[property] = _this2.prefix(value);
          } else {
            if (_this2._requiresPrefix[property]) {
              styles[_this2.jsPrefix + (0, _capitalizeString2.default)(property)] = value;
              if (!_this2._keepUnprefixed) {
                delete styles[property];
              }
            }
          }
        });
        Object.keys(styles).forEach(function(property) {
          [].concat(styles[property]).forEach(function(value) {
            plugins.forEach(function(plugin) {
              assignStyles(styles, plugin({
                property: property,
                value: value,
                styles: styles,
                browserInfo: _this2._browserInfo,
                prefix: {
                  js: _this2.jsPrefix,
                  css: _this2.cssPrefix,
                  keyframes: _this2.prefixedKeyframes
                },
                keepUnprefixed: _this2._keepUnprefixed,
                requiresPrefix: _this2._requiresPrefix
              }), value, _this2._keepUnprefixed);
            });
          });
        });
        return styles;
      }
    }], [{
      key: 'prefixAll',
      value: function prefixAll(styles) {
        return (0, _prefixAll3.default)(styles);
      }
    }]);
    return Prefixer;
  }();
  exports.default = Prefixer;
  function assignStyles(base) {
    var extend = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var value = arguments[2];
    var keepUnprefixed = arguments[3];
    Object.keys(extend).forEach(function(property) {
      var baseValue = base[property];
      if (Array.isArray(baseValue)) {
        [].concat(extend[property]).forEach(function(val) {
          if (base[property].indexOf(val) === -1) {
            base[property].splice(baseValue.indexOf(value), keepUnprefixed ? 0 : 1, val);
          }
        });
      } else {
        base[property] = extend[property];
      }
    });
  }
  module.exports = exports['default'];
  return module.exports;
});

System.registerDynamic("npm:inline-style-prefixer@2.0.1.js", ["npm:inline-style-prefixer@2.0.1/lib/Prefixer.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:inline-style-prefixer@2.0.1/lib/Prefixer.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/autoprefixer.js", ["npm:inline-style-prefixer@2.0.1.js", "npm:warning@3.0.0.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    exports.default = function(muiTheme) {
      var userAgent = muiTheme.userAgent;
      if (userAgent === undefined && typeof navigator !== 'undefined') {
        userAgent = navigator.userAgent;
      }
      if (userAgent === undefined && !hasWarnedAboutUserAgent) {
        "production" !== "production" ? (0, _warning2.default)(false, 'Material-UI: userAgent should be supplied in the muiTheme context\n      for server-side rendering.') : void 0;
        hasWarnedAboutUserAgent = true;
      }
      if (userAgent === false) {
        return null;
      } else if (userAgent === 'all' || userAgent === undefined) {
        return function(style) {
          return _inlineStylePrefixer2.default.prefixAll(style);
        };
      } else {
        var _ret = function() {
          var prefixer = new _inlineStylePrefixer2.default({userAgent: userAgent});
          return {v: function v(style) {
              return prefixer.prefix(style);
            }};
        }();
        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")
          return _ret.v;
      }
    };
    var _inlineStylePrefixer = $__require('npm:inline-style-prefixer@2.0.1.js');
    var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);
    var _warning = $__require('npm:warning@3.0.0.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var hasWarnedAboutUserAgent = false;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:warning@3.0.0/browser.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var warning = function() {};
    if ("production" !== 'production') {
      warning = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.length < 10 || (/^[s\W]*$/).test(format)) {
          throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
        }
        if (!condition) {
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          if (typeof console !== 'undefined') {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {}
        }
      };
    }
    module.exports = warning;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:warning@3.0.0.js", ["npm:warning@3.0.0/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:warning@3.0.0/browser.js');
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/callOnce.js", ["npm:warning@3.0.0.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    Object.defineProperty(exports, "__esModule", {value: true});
    exports.default = callOnce;
    var _warning = $__require('npm:warning@3.0.0.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }
    var CALLED_ONCE = 'muiPrepared';
    function callOnce() {
      if ("production" !== 'production') {
        return function(style) {
          if (style[CALLED_ONCE]) {
            "production" !== "production" ? (0, _warning2.default)(false, 'You cannot call prepareStyles() on the same style object more than once.') : void 0;
          }
          style[CALLED_ONCE] = true;
          return style;
        };
      }
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/utils/rtl.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = rtl;
  var reTranslate = /((^|\s)translate(3d|X)?\()(\-?[\d]+)/;
  var reSkew = /((^|\s)skew(x|y)?\()\s*(\-?[\d]+)(deg|rad|grad)(,\s*(\-?[\d]+)(deg|rad|grad))?/;
  function rtl(muiTheme) {
    if (muiTheme.isRtl) {
      return function(style) {
        var flippedAttributes = {
          right: 'left',
          left: 'right',
          marginRight: 'marginLeft',
          marginLeft: 'marginRight',
          paddingRight: 'paddingLeft',
          paddingLeft: 'paddingRight',
          borderRight: 'borderLeft',
          borderLeft: 'borderRight'
        };
        var newStyle = {};
        Object.keys(style).forEach(function(attribute) {
          var value = style[attribute];
          var key = attribute;
          if (flippedAttributes.hasOwnProperty(attribute)) {
            key = flippedAttributes[attribute];
          }
          switch (attribute) {
            case 'float':
            case 'textAlign':
              if (value === 'right') {
                value = 'left';
              } else if (value === 'left') {
                value = 'right';
              }
              break;
            case 'direction':
              if (value === 'ltr') {
                value = 'rtl';
              } else if (value === 'rtl') {
                value = 'ltr';
              }
              break;
            case 'transform':
              if (!value)
                break;
              var matches = void 0;
              if (matches = value.match(reTranslate)) {
                value = value.replace(matches[0], matches[1] + -parseFloat(matches[4]));
              }
              if (matches = value.match(reSkew)) {
                value = value.replace(matches[0], matches[1] + -parseFloat(matches[4]) + matches[5] + matches[6] ? ', ' + (-parseFloat(matches[7]) + matches[8]) : '');
              }
              break;
            case 'transformOrigin':
              if (!value)
                break;
              if (value.indexOf('right') > -1) {
                value = value.replace('right', 'left');
              } else if (value.indexOf('left') > -1) {
                value = value.replace('left', 'right');
              }
              break;
          }
          newStyle[key] = value;
        });
        return newStyle;
      };
    }
  }
  return module.exports;
});

System.registerDynamic("npm:recompose@0.20.2/compose.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports.default = compose;
  function compose() {
    for (var _len = arguments.length,
        funcs = Array(_len),
        _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    var last = funcs[funcs.length - 1];
    return function() {
      var result = last.apply(undefined, arguments);
      for (var i = funcs.length - 2; i >= 0; i--) {
        var f = funcs[i];
        result = f(result);
      }
      return result;
    };
  }
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/typography.js", ["npm:material-ui@0.15.2/styles/colors.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _colors = $__require('npm:material-ui@0.15.2/styles/colors.js');
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  var Typography = function Typography() {
    _classCallCheck(this, Typography);
    this.textFullBlack = _colors.fullBlack;
    this.textDarkBlack = _colors.darkBlack;
    this.textLightBlack = _colors.lightBlack;
    this.textMinBlack = _colors.minBlack;
    this.textFullWhite = _colors.fullWhite;
    this.textDarkWhite = _colors.darkWhite;
    this.textLightWhite = _colors.lightWhite;
    this.fontWeightLight = 300;
    this.fontWeightNormal = 400;
    this.fontWeightMedium = 500;
    this.fontStyleButtonFontSize = 14;
  };
  exports.default = new Typography();
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/colors.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var red50 = exports.red50 = '#ffebee';
  var red100 = exports.red100 = '#ffcdd2';
  var red200 = exports.red200 = '#ef9a9a';
  var red300 = exports.red300 = '#e57373';
  var red400 = exports.red400 = '#ef5350';
  var red500 = exports.red500 = '#f44336';
  var red600 = exports.red600 = '#e53935';
  var red700 = exports.red700 = '#d32f2f';
  var red800 = exports.red800 = '#c62828';
  var red900 = exports.red900 = '#b71c1c';
  var redA100 = exports.redA100 = '#ff8a80';
  var redA200 = exports.redA200 = '#ff5252';
  var redA400 = exports.redA400 = '#ff1744';
  var redA700 = exports.redA700 = '#d50000';
  var pink50 = exports.pink50 = '#fce4ec';
  var pink100 = exports.pink100 = '#f8bbd0';
  var pink200 = exports.pink200 = '#f48fb1';
  var pink300 = exports.pink300 = '#f06292';
  var pink400 = exports.pink400 = '#ec407a';
  var pink500 = exports.pink500 = '#e91e63';
  var pink600 = exports.pink600 = '#d81b60';
  var pink700 = exports.pink700 = '#c2185b';
  var pink800 = exports.pink800 = '#ad1457';
  var pink900 = exports.pink900 = '#880e4f';
  var pinkA100 = exports.pinkA100 = '#ff80ab';
  var pinkA200 = exports.pinkA200 = '#ff4081';
  var pinkA400 = exports.pinkA400 = '#f50057';
  var pinkA700 = exports.pinkA700 = '#c51162';
  var purple50 = exports.purple50 = '#f3e5f5';
  var purple100 = exports.purple100 = '#e1bee7';
  var purple200 = exports.purple200 = '#ce93d8';
  var purple300 = exports.purple300 = '#ba68c8';
  var purple400 = exports.purple400 = '#ab47bc';
  var purple500 = exports.purple500 = '#9c27b0';
  var purple600 = exports.purple600 = '#8e24aa';
  var purple700 = exports.purple700 = '#7b1fa2';
  var purple800 = exports.purple800 = '#6a1b9a';
  var purple900 = exports.purple900 = '#4a148c';
  var purpleA100 = exports.purpleA100 = '#ea80fc';
  var purpleA200 = exports.purpleA200 = '#e040fb';
  var purpleA400 = exports.purpleA400 = '#d500f9';
  var purpleA700 = exports.purpleA700 = '#aa00ff';
  var deepPurple50 = exports.deepPurple50 = '#ede7f6';
  var deepPurple100 = exports.deepPurple100 = '#d1c4e9';
  var deepPurple200 = exports.deepPurple200 = '#b39ddb';
  var deepPurple300 = exports.deepPurple300 = '#9575cd';
  var deepPurple400 = exports.deepPurple400 = '#7e57c2';
  var deepPurple500 = exports.deepPurple500 = '#673ab7';
  var deepPurple600 = exports.deepPurple600 = '#5e35b1';
  var deepPurple700 = exports.deepPurple700 = '#512da8';
  var deepPurple800 = exports.deepPurple800 = '#4527a0';
  var deepPurple900 = exports.deepPurple900 = '#311b92';
  var deepPurpleA100 = exports.deepPurpleA100 = '#b388ff';
  var deepPurpleA200 = exports.deepPurpleA200 = '#7c4dff';
  var deepPurpleA400 = exports.deepPurpleA400 = '#651fff';
  var deepPurpleA700 = exports.deepPurpleA700 = '#6200ea';
  var indigo50 = exports.indigo50 = '#e8eaf6';
  var indigo100 = exports.indigo100 = '#c5cae9';
  var indigo200 = exports.indigo200 = '#9fa8da';
  var indigo300 = exports.indigo300 = '#7986cb';
  var indigo400 = exports.indigo400 = '#5c6bc0';
  var indigo500 = exports.indigo500 = '#3f51b5';
  var indigo600 = exports.indigo600 = '#3949ab';
  var indigo700 = exports.indigo700 = '#303f9f';
  var indigo800 = exports.indigo800 = '#283593';
  var indigo900 = exports.indigo900 = '#1a237e';
  var indigoA100 = exports.indigoA100 = '#8c9eff';
  var indigoA200 = exports.indigoA200 = '#536dfe';
  var indigoA400 = exports.indigoA400 = '#3d5afe';
  var indigoA700 = exports.indigoA700 = '#304ffe';
  var blue50 = exports.blue50 = '#e3f2fd';
  var blue100 = exports.blue100 = '#bbdefb';
  var blue200 = exports.blue200 = '#90caf9';
  var blue300 = exports.blue300 = '#64b5f6';
  var blue400 = exports.blue400 = '#42a5f5';
  var blue500 = exports.blue500 = '#2196f3';
  var blue600 = exports.blue600 = '#1e88e5';
  var blue700 = exports.blue700 = '#1976d2';
  var blue800 = exports.blue800 = '#1565c0';
  var blue900 = exports.blue900 = '#0d47a1';
  var blueA100 = exports.blueA100 = '#82b1ff';
  var blueA200 = exports.blueA200 = '#448aff';
  var blueA400 = exports.blueA400 = '#2979ff';
  var blueA700 = exports.blueA700 = '#2962ff';
  var lightBlue50 = exports.lightBlue50 = '#e1f5fe';
  var lightBlue100 = exports.lightBlue100 = '#b3e5fc';
  var lightBlue200 = exports.lightBlue200 = '#81d4fa';
  var lightBlue300 = exports.lightBlue300 = '#4fc3f7';
  var lightBlue400 = exports.lightBlue400 = '#29b6f6';
  var lightBlue500 = exports.lightBlue500 = '#03a9f4';
  var lightBlue600 = exports.lightBlue600 = '#039be5';
  var lightBlue700 = exports.lightBlue700 = '#0288d1';
  var lightBlue800 = exports.lightBlue800 = '#0277bd';
  var lightBlue900 = exports.lightBlue900 = '#01579b';
  var lightBlueA100 = exports.lightBlueA100 = '#80d8ff';
  var lightBlueA200 = exports.lightBlueA200 = '#40c4ff';
  var lightBlueA400 = exports.lightBlueA400 = '#00b0ff';
  var lightBlueA700 = exports.lightBlueA700 = '#0091ea';
  var cyan50 = exports.cyan50 = '#e0f7fa';
  var cyan100 = exports.cyan100 = '#b2ebf2';
  var cyan200 = exports.cyan200 = '#80deea';
  var cyan300 = exports.cyan300 = '#4dd0e1';
  var cyan400 = exports.cyan400 = '#26c6da';
  var cyan500 = exports.cyan500 = '#00bcd4';
  var cyan600 = exports.cyan600 = '#00acc1';
  var cyan700 = exports.cyan700 = '#0097a7';
  var cyan800 = exports.cyan800 = '#00838f';
  var cyan900 = exports.cyan900 = '#006064';
  var cyanA100 = exports.cyanA100 = '#84ffff';
  var cyanA200 = exports.cyanA200 = '#18ffff';
  var cyanA400 = exports.cyanA400 = '#00e5ff';
  var cyanA700 = exports.cyanA700 = '#00b8d4';
  var teal50 = exports.teal50 = '#e0f2f1';
  var teal100 = exports.teal100 = '#b2dfdb';
  var teal200 = exports.teal200 = '#80cbc4';
  var teal300 = exports.teal300 = '#4db6ac';
  var teal400 = exports.teal400 = '#26a69a';
  var teal500 = exports.teal500 = '#009688';
  var teal600 = exports.teal600 = '#00897b';
  var teal700 = exports.teal700 = '#00796b';
  var teal800 = exports.teal800 = '#00695c';
  var teal900 = exports.teal900 = '#004d40';
  var tealA100 = exports.tealA100 = '#a7ffeb';
  var tealA200 = exports.tealA200 = '#64ffda';
  var tealA400 = exports.tealA400 = '#1de9b6';
  var tealA700 = exports.tealA700 = '#00bfa5';
  var green50 = exports.green50 = '#e8f5e9';
  var green100 = exports.green100 = '#c8e6c9';
  var green200 = exports.green200 = '#a5d6a7';
  var green300 = exports.green300 = '#81c784';
  var green400 = exports.green400 = '#66bb6a';
  var green500 = exports.green500 = '#4caf50';
  var green600 = exports.green600 = '#43a047';
  var green700 = exports.green700 = '#388e3c';
  var green800 = exports.green800 = '#2e7d32';
  var green900 = exports.green900 = '#1b5e20';
  var greenA100 = exports.greenA100 = '#b9f6ca';
  var greenA200 = exports.greenA200 = '#69f0ae';
  var greenA400 = exports.greenA400 = '#00e676';
  var greenA700 = exports.greenA700 = '#00c853';
  var lightGreen50 = exports.lightGreen50 = '#f1f8e9';
  var lightGreen100 = exports.lightGreen100 = '#dcedc8';
  var lightGreen200 = exports.lightGreen200 = '#c5e1a5';
  var lightGreen300 = exports.lightGreen300 = '#aed581';
  var lightGreen400 = exports.lightGreen400 = '#9ccc65';
  var lightGreen500 = exports.lightGreen500 = '#8bc34a';
  var lightGreen600 = exports.lightGreen600 = '#7cb342';
  var lightGreen700 = exports.lightGreen700 = '#689f38';
  var lightGreen800 = exports.lightGreen800 = '#558b2f';
  var lightGreen900 = exports.lightGreen900 = '#33691e';
  var lightGreenA100 = exports.lightGreenA100 = '#ccff90';
  var lightGreenA200 = exports.lightGreenA200 = '#b2ff59';
  var lightGreenA400 = exports.lightGreenA400 = '#76ff03';
  var lightGreenA700 = exports.lightGreenA700 = '#64dd17';
  var lime50 = exports.lime50 = '#f9fbe7';
  var lime100 = exports.lime100 = '#f0f4c3';
  var lime200 = exports.lime200 = '#e6ee9c';
  var lime300 = exports.lime300 = '#dce775';
  var lime400 = exports.lime400 = '#d4e157';
  var lime500 = exports.lime500 = '#cddc39';
  var lime600 = exports.lime600 = '#c0ca33';
  var lime700 = exports.lime700 = '#afb42b';
  var lime800 = exports.lime800 = '#9e9d24';
  var lime900 = exports.lime900 = '#827717';
  var limeA100 = exports.limeA100 = '#f4ff81';
  var limeA200 = exports.limeA200 = '#eeff41';
  var limeA400 = exports.limeA400 = '#c6ff00';
  var limeA700 = exports.limeA700 = '#aeea00';
  var yellow50 = exports.yellow50 = '#fffde7';
  var yellow100 = exports.yellow100 = '#fff9c4';
  var yellow200 = exports.yellow200 = '#fff59d';
  var yellow300 = exports.yellow300 = '#fff176';
  var yellow400 = exports.yellow400 = '#ffee58';
  var yellow500 = exports.yellow500 = '#ffeb3b';
  var yellow600 = exports.yellow600 = '#fdd835';
  var yellow700 = exports.yellow700 = '#fbc02d';
  var yellow800 = exports.yellow800 = '#f9a825';
  var yellow900 = exports.yellow900 = '#f57f17';
  var yellowA100 = exports.yellowA100 = '#ffff8d';
  var yellowA200 = exports.yellowA200 = '#ffff00';
  var yellowA400 = exports.yellowA400 = '#ffea00';
  var yellowA700 = exports.yellowA700 = '#ffd600';
  var amber50 = exports.amber50 = '#fff8e1';
  var amber100 = exports.amber100 = '#ffecb3';
  var amber200 = exports.amber200 = '#ffe082';
  var amber300 = exports.amber300 = '#ffd54f';
  var amber400 = exports.amber400 = '#ffca28';
  var amber500 = exports.amber500 = '#ffc107';
  var amber600 = exports.amber600 = '#ffb300';
  var amber700 = exports.amber700 = '#ffa000';
  var amber800 = exports.amber800 = '#ff8f00';
  var amber900 = exports.amber900 = '#ff6f00';
  var amberA100 = exports.amberA100 = '#ffe57f';
  var amberA200 = exports.amberA200 = '#ffd740';
  var amberA400 = exports.amberA400 = '#ffc400';
  var amberA700 = exports.amberA700 = '#ffab00';
  var orange50 = exports.orange50 = '#fff3e0';
  var orange100 = exports.orange100 = '#ffe0b2';
  var orange200 = exports.orange200 = '#ffcc80';
  var orange300 = exports.orange300 = '#ffb74d';
  var orange400 = exports.orange400 = '#ffa726';
  var orange500 = exports.orange500 = '#ff9800';
  var orange600 = exports.orange600 = '#fb8c00';
  var orange700 = exports.orange700 = '#f57c00';
  var orange800 = exports.orange800 = '#ef6c00';
  var orange900 = exports.orange900 = '#e65100';
  var orangeA100 = exports.orangeA100 = '#ffd180';
  var orangeA200 = exports.orangeA200 = '#ffab40';
  var orangeA400 = exports.orangeA400 = '#ff9100';
  var orangeA700 = exports.orangeA700 = '#ff6d00';
  var deepOrange50 = exports.deepOrange50 = '#fbe9e7';
  var deepOrange100 = exports.deepOrange100 = '#ffccbc';
  var deepOrange200 = exports.deepOrange200 = '#ffab91';
  var deepOrange300 = exports.deepOrange300 = '#ff8a65';
  var deepOrange400 = exports.deepOrange400 = '#ff7043';
  var deepOrange500 = exports.deepOrange500 = '#ff5722';
  var deepOrange600 = exports.deepOrange600 = '#f4511e';
  var deepOrange700 = exports.deepOrange700 = '#e64a19';
  var deepOrange800 = exports.deepOrange800 = '#d84315';
  var deepOrange900 = exports.deepOrange900 = '#bf360c';
  var deepOrangeA100 = exports.deepOrangeA100 = '#ff9e80';
  var deepOrangeA200 = exports.deepOrangeA200 = '#ff6e40';
  var deepOrangeA400 = exports.deepOrangeA400 = '#ff3d00';
  var deepOrangeA700 = exports.deepOrangeA700 = '#dd2c00';
  var brown50 = exports.brown50 = '#efebe9';
  var brown100 = exports.brown100 = '#d7ccc8';
  var brown200 = exports.brown200 = '#bcaaa4';
  var brown300 = exports.brown300 = '#a1887f';
  var brown400 = exports.brown400 = '#8d6e63';
  var brown500 = exports.brown500 = '#795548';
  var brown600 = exports.brown600 = '#6d4c41';
  var brown700 = exports.brown700 = '#5d4037';
  var brown800 = exports.brown800 = '#4e342e';
  var brown900 = exports.brown900 = '#3e2723';
  var blueGrey50 = exports.blueGrey50 = '#eceff1';
  var blueGrey100 = exports.blueGrey100 = '#cfd8dc';
  var blueGrey200 = exports.blueGrey200 = '#b0bec5';
  var blueGrey300 = exports.blueGrey300 = '#90a4ae';
  var blueGrey400 = exports.blueGrey400 = '#78909c';
  var blueGrey500 = exports.blueGrey500 = '#607d8b';
  var blueGrey600 = exports.blueGrey600 = '#546e7a';
  var blueGrey700 = exports.blueGrey700 = '#455a64';
  var blueGrey800 = exports.blueGrey800 = '#37474f';
  var blueGrey900 = exports.blueGrey900 = '#263238';
  var grey50 = exports.grey50 = '#fafafa';
  var grey100 = exports.grey100 = '#f5f5f5';
  var grey200 = exports.grey200 = '#eeeeee';
  var grey300 = exports.grey300 = '#e0e0e0';
  var grey400 = exports.grey400 = '#bdbdbd';
  var grey500 = exports.grey500 = '#9e9e9e';
  var grey600 = exports.grey600 = '#757575';
  var grey700 = exports.grey700 = '#616161';
  var grey800 = exports.grey800 = '#424242';
  var grey900 = exports.grey900 = '#212121';
  var black = exports.black = '#000000';
  var white = exports.white = '#ffffff';
  var transparent = exports.transparent = 'rgba(0, 0, 0, 0)';
  var fullBlack = exports.fullBlack = 'rgba(0, 0, 0, 1)';
  var darkBlack = exports.darkBlack = 'rgba(0, 0, 0, 0.87)';
  var lightBlack = exports.lightBlack = 'rgba(0, 0, 0, 0.54)';
  var minBlack = exports.minBlack = 'rgba(0, 0, 0, 0.26)';
  var faintBlack = exports.faintBlack = 'rgba(0, 0, 0, 0.12)';
  var fullWhite = exports.fullWhite = 'rgba(255, 255, 255, 1)';
  var darkWhite = exports.darkWhite = 'rgba(255, 255, 255, 0.87)';
  var lightWhite = exports.lightWhite = 'rgba(255, 255, 255, 0.54)';
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/getMuiTheme.js", ["npm:lodash@4.13.1/merge.js", "npm:material-ui@0.15.2/utils/colorManipulator.js", "npm:material-ui@0.15.2/styles/baseThemes/lightBaseTheme.js", "npm:material-ui@0.15.2/styles/zIndex.js", "npm:material-ui@0.15.2/utils/autoprefixer.js", "npm:material-ui@0.15.2/utils/callOnce.js", "npm:material-ui@0.15.2/utils/rtl.js", "npm:recompose@0.20.2/compose.js", "npm:material-ui@0.15.2/styles/typography.js", "npm:material-ui@0.15.2/styles/colors.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  exports.default = getMuiTheme;
  var _merge = $__require('npm:lodash@4.13.1/merge.js');
  var _merge2 = _interopRequireDefault(_merge);
  var _colorManipulator = $__require('npm:material-ui@0.15.2/utils/colorManipulator.js');
  var _lightBaseTheme = $__require('npm:material-ui@0.15.2/styles/baseThemes/lightBaseTheme.js');
  var _lightBaseTheme2 = _interopRequireDefault(_lightBaseTheme);
  var _zIndex = $__require('npm:material-ui@0.15.2/styles/zIndex.js');
  var _zIndex2 = _interopRequireDefault(_zIndex);
  var _autoprefixer = $__require('npm:material-ui@0.15.2/utils/autoprefixer.js');
  var _autoprefixer2 = _interopRequireDefault(_autoprefixer);
  var _callOnce = $__require('npm:material-ui@0.15.2/utils/callOnce.js');
  var _callOnce2 = _interopRequireDefault(_callOnce);
  var _rtl = $__require('npm:material-ui@0.15.2/utils/rtl.js');
  var _rtl2 = _interopRequireDefault(_rtl);
  var _compose = $__require('npm:recompose@0.20.2/compose.js');
  var _compose2 = _interopRequireDefault(_compose);
  var _typography = $__require('npm:material-ui@0.15.2/styles/typography.js');
  var _typography2 = _interopRequireDefault(_typography);
  var _colors = $__require('npm:material-ui@0.15.2/styles/colors.js');
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0,
          arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    } else {
      return Array.from(arr);
    }
  }
  function getMuiTheme(muiTheme) {
    for (var _len = arguments.length,
        more = Array(_len > 1 ? _len - 1 : 0),
        _key = 1; _key < _len; _key++) {
      more[_key - 1] = arguments[_key];
    }
    muiTheme = _merge2.default.apply(undefined, [{
      zIndex: _zIndex2.default,
      isRtl: false,
      userAgent: undefined
    }, _lightBaseTheme2.default, muiTheme].concat(more));
    var _muiTheme = muiTheme;
    var spacing = _muiTheme.spacing;
    var fontFamily = _muiTheme.fontFamily;
    var palette = _muiTheme.palette;
    var baseTheme = {
      spacing: spacing,
      fontFamily: fontFamily,
      palette: palette
    };
    muiTheme = (0, _merge2.default)({
      appBar: {
        color: palette.primary1Color,
        textColor: palette.alternateTextColor,
        height: spacing.desktopKeylineIncrement,
        titleFontWeight: _typography2.default.fontWeightNormal,
        padding: spacing.desktopGutter
      },
      avatar: {
        color: palette.canvasColor,
        backgroundColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.26)
      },
      badge: {
        color: palette.alternateTextColor,
        textColor: palette.textColor,
        primaryColor: palette.accent1Color,
        primaryTextColor: palette.alternateTextColor,
        secondaryColor: palette.primary1Color,
        secondaryTextColor: palette.alternateTextColor,
        fontWeight: _typography2.default.fontWeightMedium
      },
      button: {
        height: 36,
        minWidth: 88,
        iconButtonSize: spacing.iconSize * 2
      },
      card: {
        titleColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
        subtitleColor: (0, _colorManipulator.fade)(palette.textColor, 0.54),
        fontWeight: _typography2.default.fontWeightMedium
      },
      cardMedia: {
        color: _colors.darkWhite,
        overlayContentBackground: _colors.lightBlack,
        titleColor: _colors.darkWhite,
        subtitleColor: _colors.lightWhite
      },
      cardText: {textColor: palette.textColor},
      checkbox: {
        boxColor: palette.textColor,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor
      },
      chip: {
        backgroundColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.12),
        deleteIconColor: (0, _colorManipulator.fade)(palette.textColor, 0.26),
        textColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
        fontSize: 14,
        fontWeight: _typography2.default.fontWeightNormal,
        shadow: '0 1px 6px ' + (0, _colorManipulator.fade)(palette.shadowColor, 0.12) + ',\n        0 1px 4px ' + (0, _colorManipulator.fade)(palette.shadowColor, 0.12)
      },
      datePicker: {
        color: palette.primary1Color,
        textColor: palette.alternateTextColor,
        calendarTextColor: palette.textColor,
        selectColor: palette.primary2Color,
        selectTextColor: palette.alternateTextColor,
        calendarYearBackgroundColor: _colors.white
      },
      dialog: {
        titleFontSize: 22,
        bodyFontSize: 16,
        bodyColor: (0, _colorManipulator.fade)(palette.textColor, 0.6)
      },
      dropDownMenu: {accentColor: palette.borderColor},
      enhancedButton: {tapHighlightColor: _colors.transparent},
      flatButton: {
        color: _colors.transparent,
        buttonFilterColor: '#999999',
        disabledTextColor: (0, _colorManipulator.fade)(palette.textColor, 0.3),
        textColor: palette.textColor,
        primaryTextColor: palette.primary1Color,
        secondaryTextColor: palette.accent1Color,
        fontSize: _typography2.default.fontStyleButtonFontSize,
        fontWeight: _typography2.default.fontWeightMedium
      },
      floatingActionButton: {
        buttonSize: 56,
        miniSize: 40,
        color: palette.primary1Color,
        iconColor: palette.alternateTextColor,
        secondaryColor: palette.accent1Color,
        secondaryIconColor: palette.alternateTextColor,
        disabledTextColor: palette.disabledColor,
        disabledColor: (0, _colorManipulator.emphasize)(palette.canvasColor, 0.12)
      },
      gridTile: {textColor: _colors.white},
      icon: {
        color: palette.canvasColor,
        backgroundColor: palette.primary1Color
      },
      inkBar: {backgroundColor: palette.accent1Color},
      drawer: {
        width: spacing.desktopKeylineIncrement * 4,
        color: palette.canvasColor
      },
      listItem: {
        nestedLevelDepth: 18,
        secondaryTextColor: palette.secondaryTextColor,
        leftIconColor: _colors.grey600,
        rightIconColor: _colors.grey600
      },
      menu: {
        backgroundColor: palette.canvasColor,
        containerBackgroundColor: palette.canvasColor
      },
      menuItem: {
        dataHeight: 32,
        height: 48,
        hoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.035),
        padding: spacing.desktopGutter,
        selectedTextColor: palette.accent1Color,
        rightIconDesktopFill: _colors.grey600
      },
      menuSubheader: {
        padding: spacing.desktopGutter,
        borderColor: palette.borderColor,
        textColor: palette.primary1Color
      },
      overlay: {backgroundColor: _colors.lightBlack},
      paper: {
        color: palette.textColor,
        backgroundColor: palette.canvasColor,
        zDepthShadows: [[1, 6, 0.12, 1, 4, 0.12], [3, 10, 0.16, 3, 10, 0.23], [10, 30, 0.19, 6, 10, 0.23], [14, 45, 0.25, 10, 18, 0.22], [19, 60, 0.30, 15, 20, 0.22]].map(function(d) {
          return '0 ' + d[0] + 'px ' + d[1] + 'px ' + (0, _colorManipulator.fade)(palette.shadowColor, d[2]) + ',\n         0 ' + d[3] + 'px ' + d[4] + 'px ' + (0, _colorManipulator.fade)(palette.shadowColor, d[5]);
        })
      },
      radioButton: {
        borderColor: palette.textColor,
        backgroundColor: palette.alternateTextColor,
        checkedColor: palette.primary1Color,
        requiredColor: palette.primary1Color,
        disabledColor: palette.disabledColor,
        size: 24,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor
      },
      raisedButton: {
        color: palette.alternateTextColor,
        textColor: palette.textColor,
        primaryColor: palette.primary1Color,
        primaryTextColor: palette.alternateTextColor,
        secondaryColor: palette.accent1Color,
        secondaryTextColor: palette.alternateTextColor,
        disabledColor: (0, _colorManipulator.darken)(palette.alternateTextColor, 0.1),
        disabledTextColor: (0, _colorManipulator.fade)(palette.textColor, 0.3),
        fontSize: _typography2.default.fontStyleButtonFontSize,
        fontWeight: _typography2.default.fontWeightMedium
      },
      refreshIndicator: {
        strokeColor: palette.borderColor,
        loadingStrokeColor: palette.primary1Color
      },
      ripple: {color: (0, _colorManipulator.fade)(palette.textColor, 0.87)},
      slider: {
        trackSize: 2,
        trackColor: palette.primary3Color,
        trackColorSelected: palette.accent3Color,
        handleSize: 12,
        handleSizeDisabled: 8,
        handleSizeActive: 18,
        handleColorZero: palette.primary3Color,
        handleFillColor: palette.alternateTextColor,
        selectionColor: palette.primary1Color,
        rippleColor: palette.primary1Color
      },
      snackbar: {
        textColor: palette.alternateTextColor,
        backgroundColor: palette.textColor,
        actionColor: palette.accent1Color
      },
      subheader: {
        color: (0, _colorManipulator.fade)(palette.textColor, 0.54),
        fontWeight: _typography2.default.fontWeightMedium
      },
      stepper: {
        backgroundColor: 'transparent',
        hoverBackgroundColor: (0, _colorManipulator.fade)(_colors.black, 0.06),
        iconColor: palette.primary1Color,
        hoveredIconColor: _colors.grey700,
        inactiveIconColor: _colors.grey500,
        textColor: (0, _colorManipulator.fade)(_colors.black, 0.87),
        disabledTextColor: (0, _colorManipulator.fade)(_colors.black, 0.26),
        connectorLineColor: _colors.grey400
      },
      svgIcon: {color: palette.textColor},
      table: {backgroundColor: palette.canvasColor},
      tableFooter: {
        borderColor: palette.borderColor,
        textColor: palette.accent3Color
      },
      tableHeader: {borderColor: palette.borderColor},
      tableHeaderColumn: {
        textColor: palette.accent3Color,
        height: 56,
        spacing: 24
      },
      tableRow: {
        hoverColor: palette.accent2Color,
        stripeColor: (0, _colorManipulator.fade)((0, _colorManipulator.lighten)(palette.primary1Color, 0.5), 0.4),
        selectedColor: palette.borderColor,
        textColor: palette.textColor,
        borderColor: palette.borderColor,
        height: 48
      },
      tableRowColumn: {
        height: 48,
        spacing: 24
      },
      tabs: {
        backgroundColor: palette.primary1Color,
        textColor: (0, _colorManipulator.fade)(palette.alternateTextColor, 0.7),
        selectedTextColor: palette.alternateTextColor
      },
      textField: {
        textColor: palette.textColor,
        hintColor: palette.disabledColor,
        floatingLabelColor: palette.textColor,
        disabledTextColor: palette.disabledColor,
        errorColor: _colors.red500,
        focusColor: palette.primary1Color,
        backgroundColor: 'transparent',
        borderColor: palette.borderColor
      },
      timePicker: {
        color: palette.alternateTextColor,
        textColor: palette.accent3Color,
        accentColor: palette.primary1Color,
        clockColor: palette.textColor,
        clockCircleColor: palette.clockCircleColor,
        headerColor: palette.pickerHeaderColor || palette.primary1Color,
        selectColor: palette.primary2Color,
        selectTextColor: palette.alternateTextColor
      },
      toggle: {
        thumbOnColor: palette.primary1Color,
        thumbOffColor: palette.accent2Color,
        thumbDisabledColor: palette.borderColor,
        thumbRequiredColor: palette.primary1Color,
        trackOnColor: (0, _colorManipulator.fade)(palette.primary1Color, 0.5),
        trackOffColor: palette.primary3Color,
        trackDisabledColor: palette.primary3Color,
        labelColor: palette.textColor,
        labelDisabledColor: palette.disabledColor,
        trackRequiredColor: (0, _colorManipulator.fade)(palette.primary1Color, 0.5)
      },
      toolbar: {
        color: (0, _colorManipulator.fade)(palette.textColor, 0.54),
        hoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.87),
        backgroundColor: (0, _colorManipulator.darken)(palette.accent2Color, 0.05),
        height: 56,
        titleFontSize: 20,
        iconColor: (0, _colorManipulator.fade)(palette.textColor, 0.4),
        separatorColor: (0, _colorManipulator.fade)(palette.textColor, 0.175),
        menuHoverColor: (0, _colorManipulator.fade)(palette.textColor, 0.1)
      },
      tooltip: {
        color: _colors.white,
        rippleBackgroundColor: _colors.grey700
      }
    }, muiTheme, {
      baseTheme: baseTheme,
      rawTheme: baseTheme
    });
    var transformers = [_autoprefixer2.default, _rtl2.default, _callOnce2.default].map(function(t) {
      return t(muiTheme);
    }).filter(function(t) {
      return t;
    });
    muiTheme.prepareStyles = _compose2.default.apply(undefined, _toConsumableArray(transformers));
    return muiTheme;
  }
  return module.exports;
});

System.registerDynamic("npm:material-ui@0.15.2/styles/MuiThemeProvider.js", ["npm:react@15.2.1.js", "npm:material-ui@0.15.2/styles/getMuiTheme.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  Object.defineProperty(exports, "__esModule", {value: true});
  var _createClass = function() {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function(Constructor, protoProps, staticProps) {
      if (protoProps)
        defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();
  var _react = $__require('npm:react@15.2.1.js');
  var _getMuiTheme = $__require('npm:material-ui@0.15.2/styles/getMuiTheme.js');
  var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }});
    if (superClass)
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  var MuiThemeProvider = function(_Component) {
    _inherits(MuiThemeProvider, _Component);
    function MuiThemeProvider() {
      _classCallCheck(this, MuiThemeProvider);
      return _possibleConstructorReturn(this, Object.getPrototypeOf(MuiThemeProvider).apply(this, arguments));
    }
    _createClass(MuiThemeProvider, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {muiTheme: this.props.muiTheme || (0, _getMuiTheme2.default)()};
      }
    }, {
      key: 'render',
      value: function render() {
        return this.props.children;
      }
    }]);
    return MuiThemeProvider;
  }(_react.Component);
  MuiThemeProvider.propTypes = {
    children: _react.PropTypes.element,
    muiTheme: _react.PropTypes.object
  };
  MuiThemeProvider.childContextTypes = {muiTheme: _react.PropTypes.object.isRequired};
  exports.default = MuiThemeProvider;
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/components/Provider.js", ["npm:react@15.2.1.js", "npm:react-redux@4.4.5/lib/utils/storeShape.js", "npm:react-redux@4.4.5/lib/utils/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    exports.__esModule = true;
    exports["default"] = undefined;
    var _react = $__require('npm:react@15.2.1.js');
    var _storeShape = $__require('npm:react-redux@4.4.5/lib/utils/storeShape.js');
    var _storeShape2 = _interopRequireDefault(_storeShape);
    var _warning = $__require('npm:react-redux@4.4.5/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {"default": obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var didWarnAboutReceivingStore = false;
    function warnAboutReceivingStore() {
      if (didWarnAboutReceivingStore) {
        return;
      }
      didWarnAboutReceivingStore = true;
      (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
    }
    var Provider = function(_Component) {
      _inherits(Provider, _Component);
      Provider.prototype.getChildContext = function getChildContext() {
        return {store: this.store};
      };
      function Provider(props, context) {
        _classCallCheck(this, Provider);
        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
        _this.store = props.store;
        return _this;
      }
      Provider.prototype.render = function render() {
        var children = this.props.children;
        return _react.Children.only(children);
      };
      return Provider;
    }(_react.Component);
    exports["default"] = Provider;
    if ("production" !== 'production') {
      Provider.prototype.componentWillReceiveProps = function(nextProps) {
        var store = this.store;
        var nextStore = nextProps.store;
        if (store !== nextStore) {
          warnAboutReceivingStore();
        }
      };
    }
    Provider.propTypes = {
      store: _storeShape2["default"].isRequired,
      children: _react.PropTypes.element.isRequired
    };
    Provider.childContextTypes = {store: _storeShape2["default"].isRequired};
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/PooledClass.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var oneArgumentPooler = function(copyFieldsFrom) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, copyFieldsFrom);
        return instance;
      } else {
        return new Klass(copyFieldsFrom);
      }
    };
    var twoArgumentPooler = function(a1, a2) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2);
        return instance;
      } else {
        return new Klass(a1, a2);
      }
    };
    var threeArgumentPooler = function(a1, a2, a3) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3);
        return instance;
      } else {
        return new Klass(a1, a2, a3);
      }
    };
    var fourArgumentPooler = function(a1, a2, a3, a4) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4);
      }
    };
    var fiveArgumentPooler = function(a1, a2, a3, a4, a5) {
      var Klass = this;
      if (Klass.instancePool.length) {
        var instance = Klass.instancePool.pop();
        Klass.call(instance, a1, a2, a3, a4, a5);
        return instance;
      } else {
        return new Klass(a1, a2, a3, a4, a5);
      }
    };
    var standardReleaser = function(instance) {
      var Klass = this;
      !(instance instanceof Klass) ? "production" !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
      instance.destructor();
      if (Klass.instancePool.length < Klass.poolSize) {
        Klass.instancePool.push(instance);
      }
    };
    var DEFAULT_POOL_SIZE = 10;
    var DEFAULT_POOLER = oneArgumentPooler;
    var addPoolingTo = function(CopyConstructor, pooler) {
      var NewKlass = CopyConstructor;
      NewKlass.instancePool = [];
      NewKlass.getPooled = pooler || DEFAULT_POOLER;
      if (!NewKlass.poolSize) {
        NewKlass.poolSize = DEFAULT_POOL_SIZE;
      }
      NewKlass.release = standardReleaser;
      return NewKlass;
    };
    var PooledClass = {
      addPoolingTo: addPoolingTo,
      oneArgumentPooler: oneArgumentPooler,
      twoArgumentPooler: twoArgumentPooler,
      threeArgumentPooler: threeArgumentPooler,
      fourArgumentPooler: fourArgumentPooler,
      fiveArgumentPooler: fiveArgumentPooler
    };
    module.exports = PooledClass;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/KeyEscapeUtils.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function(match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }
  function unescape(key) {
    var unescapeRegex = /(=0|=2)/g;
    var unescaperLookup = {
      '=0': '=',
      '=2': ':'
    };
    var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);
    return ('' + keySubstring).replace(unescapeRegex, function(match) {
      return unescaperLookup[match];
    });
  }
  var KeyEscapeUtils = {
    escape: escape,
    unescape: unescape
  };
  module.exports = KeyEscapeUtils;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/traverseAllChildren.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/getIteratorFn.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:react@15.2.1/lib/KeyEscapeUtils.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var getIteratorFn = $__require('npm:react@15.2.1/lib/getIteratorFn.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var KeyEscapeUtils = $__require('npm:react@15.2.1/lib/KeyEscapeUtils.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';
    var didWarnAboutMaps = false;
    function getComponentKey(component, index) {
      if (component && typeof component === 'object' && component.key != null) {
        return KeyEscapeUtils.escape(component.key);
      }
      return index.toString(36);
    }
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children;
      if (type === 'undefined' || type === 'boolean') {
        children = null;
      }
      if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
        callback(traverseContext, children, nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }
      var child;
      var nextName;
      var subtreeCount = 0;
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (iteratorFn) {
          var iterator = iteratorFn.call(children);
          var step;
          if (iteratorFn !== children.entries) {
            var ii = 0;
            while (!(step = iterator.next()).done) {
              child = step.value;
              nextName = nextNamePrefix + getComponentKey(child, ii++);
              subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
            }
          } else {
            if ("production" !== 'production') {
              "production" !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
              didWarnAboutMaps = true;
            }
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                child = entry[1];
                nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
                subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
              }
            }
          }
        } else if (type === 'object') {
          var addendum = '';
          if ("production" !== 'production') {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
            if (children._isReactElement) {
              addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
            }
            if (ReactCurrentOwner.current) {
              var name = ReactCurrentOwner.current.getName();
              if (name) {
                addendum += ' Check the render method of `' + name + '`.';
              }
            }
          }
          var childrenString = String(children);
          !false ? "production" !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
        }
      }
      return subtreeCount;
    }
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }
      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }
    module.exports = traverseAllChildren;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactChildren.js", ["npm:react@15.2.1/lib/PooledClass.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:react@15.2.1/lib/traverseAllChildren.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PooledClass = $__require('npm:react@15.2.1/lib/PooledClass.js');
  var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
  var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
  var traverseAllChildren = $__require('npm:react@15.2.1/lib/traverseAllChildren.js');
  var twoArgumentPooler = PooledClass.twoArgumentPooler;
  var fourArgumentPooler = PooledClass.fourArgumentPooler;
  var userProvidedKeyEscapeRegex = /\/+/g;
  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
  }
  function ForEachBookKeeping(forEachFunction, forEachContext) {
    this.func = forEachFunction;
    this.context = forEachContext;
    this.count = 0;
  }
  ForEachBookKeeping.prototype.destructor = function() {
    this.func = null;
    this.context = null;
    this.count = 0;
  };
  PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);
  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func;
    var context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }
    var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    ForEachBookKeeping.release(traverseContext);
  }
  function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
    this.result = mapResult;
    this.keyPrefix = keyPrefix;
    this.func = mapFunction;
    this.context = mapContext;
    this.count = 0;
  }
  MapBookKeeping.prototype.destructor = function() {
    this.result = null;
    this.keyPrefix = null;
    this.func = null;
    this.context = null;
    this.count = 0;
  };
  PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);
  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result;
    var keyPrefix = bookKeeping.keyPrefix;
    var func = bookKeeping.func;
    var context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);
    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
    } else if (mappedChild != null) {
      if (ReactElement.isValidElement(mappedChild)) {
        mappedChild = ReactElement.cloneAndReplaceKey(mappedChild, keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
      }
      result.push(mappedChild);
    }
  }
  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';
    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }
    var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    MapBookKeeping.release(traverseContext);
  }
  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  function forEachSingleChildDummy(traverseContext, child, name) {
    return null;
  }
  function countChildren(children, context) {
    return traverseAllChildren(children, forEachSingleChildDummy, null);
  }
  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
    return result;
  }
  var ReactChildren = {
    forEach: forEachChildren,
    map: mapChildren,
    mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
    count: countChildren,
    toArray: toArray
  };
  module.exports = ReactChildren;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactComponent.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactNoopUpdateQueue.js", "npm:react@15.2.1/lib/canDefineProperty.js", "npm:fbjs@0.8.3/lib/emptyObject.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactNoopUpdateQueue = $__require('npm:react@15.2.1/lib/ReactNoopUpdateQueue.js');
    var canDefineProperty = $__require('npm:react@15.2.1/lib/canDefineProperty.js');
    var emptyObject = $__require('npm:fbjs@0.8.3/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function ReactComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    ReactComponent.prototype.isReactComponent = {};
    ReactComponent.prototype.setState = function(partialState, callback) {
      !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? "production" !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
      this.updater.enqueueSetState(this, partialState);
      if (callback) {
        this.updater.enqueueCallback(this, callback, 'setState');
      }
    };
    ReactComponent.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this);
      if (callback) {
        this.updater.enqueueCallback(this, callback, 'forceUpdate');
      }
    };
    if ("production" !== 'production') {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function(methodName, info) {
        if (canDefineProperty) {
          Object.defineProperty(ReactComponent.prototype, methodName, {get: function() {
              "production" !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
              return undefined;
            }});
        }
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }
    module.exports = ReactComponent;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactNoopUpdateQueue.js", ["npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function warnNoop(publicInstance, callerName) {
      if ("production" !== 'production') {
        var constructor = publicInstance.constructor;
        "production" !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
      }
    }
    var ReactNoopUpdateQueue = {
      isMounted: function(publicInstance) {
        return false;
      },
      enqueueCallback: function(publicInstance, callback) {},
      enqueueForceUpdate: function(publicInstance) {
        warnNoop(publicInstance, 'forceUpdate');
      },
      enqueueReplaceState: function(publicInstance, completeState) {
        warnNoop(publicInstance, 'replaceState');
      },
      enqueueSetState: function(publicInstance, partialState) {
        warnNoop(publicInstance, 'setState');
      }
    };
    module.exports = ReactNoopUpdateQueue;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/emptyObject.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var emptyObject = {};
    if ("production" !== 'production') {
      Object.freeze(emptyObject);
    }
    module.exports = emptyObject;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/keyOf.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyOf = function keyOf(oneKeyObj) {
    var key;
    for (key in oneKeyObj) {
      if (!oneKeyObj.hasOwnProperty(key)) {
        continue;
      }
      return key;
    }
    return null;
  };
  module.exports = keyOf;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactClass.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactComponent.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactPropTypeLocations.js", "npm:react@15.2.1/lib/ReactPropTypeLocationNames.js", "npm:react@15.2.1/lib/ReactNoopUpdateQueue.js", "npm:fbjs@0.8.3/lib/emptyObject.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/keyMirror.js", "npm:fbjs@0.8.3/lib/keyOf.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js'),
        _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactComponent = $__require('npm:react@15.2.1/lib/ReactComponent.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var ReactPropTypeLocations = $__require('npm:react@15.2.1/lib/ReactPropTypeLocations.js');
    var ReactPropTypeLocationNames = $__require('npm:react@15.2.1/lib/ReactPropTypeLocationNames.js');
    var ReactNoopUpdateQueue = $__require('npm:react@15.2.1/lib/ReactNoopUpdateQueue.js');
    var emptyObject = $__require('npm:fbjs@0.8.3/lib/emptyObject.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var keyMirror = $__require('npm:fbjs@0.8.3/lib/keyMirror.js');
    var keyOf = $__require('npm:fbjs@0.8.3/lib/keyOf.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var MIXINS_KEY = keyOf({mixins: null});
    var SpecPolicy = keyMirror({
      DEFINE_ONCE: null,
      DEFINE_MANY: null,
      OVERRIDE_BASE: null,
      DEFINE_MANY_MERGED: null
    });
    var injectedMixins = [];
    var ReactClassInterface = {
      mixins: SpecPolicy.DEFINE_MANY,
      statics: SpecPolicy.DEFINE_MANY,
      propTypes: SpecPolicy.DEFINE_MANY,
      contextTypes: SpecPolicy.DEFINE_MANY,
      childContextTypes: SpecPolicy.DEFINE_MANY,
      getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,
      getInitialState: SpecPolicy.DEFINE_MANY_MERGED,
      getChildContext: SpecPolicy.DEFINE_MANY_MERGED,
      render: SpecPolicy.DEFINE_ONCE,
      componentWillMount: SpecPolicy.DEFINE_MANY,
      componentDidMount: SpecPolicy.DEFINE_MANY,
      componentWillReceiveProps: SpecPolicy.DEFINE_MANY,
      shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,
      componentWillUpdate: SpecPolicy.DEFINE_MANY,
      componentDidUpdate: SpecPolicy.DEFINE_MANY,
      componentWillUnmount: SpecPolicy.DEFINE_MANY,
      updateComponent: SpecPolicy.OVERRIDE_BASE
    };
    var RESERVED_SPEC_KEYS = {
      displayName: function(Constructor, displayName) {
        Constructor.displayName = displayName;
      },
      mixins: function(Constructor, mixins) {
        if (mixins) {
          for (var i = 0; i < mixins.length; i++) {
            mixSpecIntoComponent(Constructor, mixins[i]);
          }
        }
      },
      childContextTypes: function(Constructor, childContextTypes) {
        if ("production" !== 'production') {
          validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
        }
        Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
      },
      contextTypes: function(Constructor, contextTypes) {
        if ("production" !== 'production') {
          validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
        }
        Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
      },
      getDefaultProps: function(Constructor, getDefaultProps) {
        if (Constructor.getDefaultProps) {
          Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
        } else {
          Constructor.getDefaultProps = getDefaultProps;
        }
      },
      propTypes: function(Constructor, propTypes) {
        if ("production" !== 'production') {
          validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
        }
        Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
      },
      statics: function(Constructor, statics) {
        mixStaticSpecIntoComponent(Constructor, statics);
      },
      autobind: function() {}
    };
    function validateTypeDef(Constructor, typeDef, location) {
      for (var propName in typeDef) {
        if (typeDef.hasOwnProperty(propName)) {
          "production" !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
        }
      }
    }
    function validateMethodOverride(isAlreadyDefined, name) {
      var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;
      if (ReactClassMixin.hasOwnProperty(name)) {
        !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? "production" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
      }
      if (isAlreadyDefined) {
        !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? "production" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
      }
    }
    function mixSpecIntoComponent(Constructor, spec) {
      if (!spec) {
        return;
      }
      !(typeof spec !== 'function') ? "production" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
      !!ReactElement.isValidElement(spec) ? "production" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;
      var proto = Constructor.prototype;
      var autoBindPairs = proto.__reactAutoBindPairs;
      if (spec.hasOwnProperty(MIXINS_KEY)) {
        RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
      }
      for (var name in spec) {
        if (!spec.hasOwnProperty(name)) {
          continue;
        }
        if (name === MIXINS_KEY) {
          continue;
        }
        var property = spec[name];
        var isAlreadyDefined = proto.hasOwnProperty(name);
        validateMethodOverride(isAlreadyDefined, name);
        if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
          RESERVED_SPEC_KEYS[name](Constructor, property);
        } else {
          var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
          var isFunction = typeof property === 'function';
          var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;
          if (shouldAutoBind) {
            autoBindPairs.push(name, property);
            proto[name] = property;
          } else {
            if (isAlreadyDefined) {
              var specPolicy = ReactClassInterface[name];
              !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? "production" !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;
              if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
                proto[name] = createMergedResultFunction(proto[name], property);
              } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
                proto[name] = createChainedFunction(proto[name], property);
              }
            } else {
              proto[name] = property;
              if ("production" !== 'production') {
                if (typeof property === 'function' && spec.displayName) {
                  proto[name].displayName = spec.displayName + '_' + name;
                }
              }
            }
          }
        }
      }
    }
    function mixStaticSpecIntoComponent(Constructor, statics) {
      if (!statics) {
        return;
      }
      for (var name in statics) {
        var property = statics[name];
        if (!statics.hasOwnProperty(name)) {
          continue;
        }
        var isReserved = name in RESERVED_SPEC_KEYS;
        !!isReserved ? "production" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;
        var isInherited = name in Constructor;
        !!isInherited ? "production" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
        Constructor[name] = property;
      }
    }
    function mergeIntoWithNoDuplicateKeys(one, two) {
      !(one && two && typeof one === 'object' && typeof two === 'object') ? "production" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;
      for (var key in two) {
        if (two.hasOwnProperty(key)) {
          !(one[key] === undefined) ? "production" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
          one[key] = two[key];
        }
      }
      return one;
    }
    function createMergedResultFunction(one, two) {
      return function mergedResult() {
        var a = one.apply(this, arguments);
        var b = two.apply(this, arguments);
        if (a == null) {
          return b;
        } else if (b == null) {
          return a;
        }
        var c = {};
        mergeIntoWithNoDuplicateKeys(c, a);
        mergeIntoWithNoDuplicateKeys(c, b);
        return c;
      };
    }
    function createChainedFunction(one, two) {
      return function chainedFunction() {
        one.apply(this, arguments);
        two.apply(this, arguments);
      };
    }
    function bindAutoBindMethod(component, method) {
      var boundMethod = method.bind(component);
      if ("production" !== 'production') {
        boundMethod.__reactBoundContext = component;
        boundMethod.__reactBoundMethod = method;
        boundMethod.__reactBoundArguments = null;
        var componentName = component.constructor.displayName;
        var _bind = boundMethod.bind;
        boundMethod.bind = function(newThis) {
          for (var _len = arguments.length,
              args = Array(_len > 1 ? _len - 1 : 0),
              _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          if (newThis !== component && newThis !== null) {
            "production" !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
          } else if (!args.length) {
            "production" !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
            return boundMethod;
          }
          var reboundMethod = _bind.apply(boundMethod, arguments);
          reboundMethod.__reactBoundContext = component;
          reboundMethod.__reactBoundMethod = method;
          reboundMethod.__reactBoundArguments = args;
          return reboundMethod;
        };
      }
      return boundMethod;
    }
    function bindAutoBindMethods(component) {
      var pairs = component.__reactAutoBindPairs;
      for (var i = 0; i < pairs.length; i += 2) {
        var autoBindKey = pairs[i];
        var method = pairs[i + 1];
        component[autoBindKey] = bindAutoBindMethod(component, method);
      }
    }
    var ReactClassMixin = {
      replaceState: function(newState, callback) {
        this.updater.enqueueReplaceState(this, newState);
        if (callback) {
          this.updater.enqueueCallback(this, callback, 'replaceState');
        }
      },
      isMounted: function() {
        return this.updater.isMounted(this);
      }
    };
    var ReactClassComponent = function() {};
    _assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);
    var ReactClass = {
      createClass: function(spec) {
        var Constructor = function(props, context, updater) {
          if ("production" !== 'production') {
            "production" !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
          }
          if (this.__reactAutoBindPairs.length) {
            bindAutoBindMethods(this);
          }
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
          this.state = null;
          var initialState = this.getInitialState ? this.getInitialState() : null;
          if ("production" !== 'production') {
            if (initialState === undefined && this.getInitialState._isMockFunction) {
              initialState = null;
            }
          }
          !(typeof initialState === 'object' && !Array.isArray(initialState)) ? "production" !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;
          this.state = initialState;
        };
        Constructor.prototype = new ReactClassComponent();
        Constructor.prototype.constructor = Constructor;
        Constructor.prototype.__reactAutoBindPairs = [];
        injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));
        mixSpecIntoComponent(Constructor, spec);
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }
        if ("production" !== 'production') {
          if (Constructor.getDefaultProps) {
            Constructor.getDefaultProps.isReactClassApproved = {};
          }
          if (Constructor.prototype.getInitialState) {
            Constructor.prototype.getInitialState.isReactClassApproved = {};
          }
        }
        !Constructor.prototype.render ? "production" !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
          "production" !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
        }
        for (var methodName in ReactClassInterface) {
          if (!Constructor.prototype[methodName]) {
            Constructor.prototype[methodName] = null;
          }
        }
        return Constructor;
      },
      injection: {injectMixin: function(mixin) {
          injectedMixins.push(mixin);
        }}
    };
    module.exports = ReactClass;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/mapObject.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function mapObject(object, callback, context) {
    if (!object) {
      return null;
    }
    var result = {};
    for (var name in object) {
      if (hasOwnProperty.call(object, name)) {
        result[name] = callback.call(context, object[name], name, object);
      }
    }
    return result;
  }
  module.exports = mapObject;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactDOMFactories.js", ["npm:react@15.2.1/lib/ReactElement.js", "npm:fbjs@0.8.3/lib/mapObject.js", "npm:react@15.2.1/lib/ReactElementValidator.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var mapObject = $__require('npm:fbjs@0.8.3/lib/mapObject.js');
    function createDOMFactory(tag) {
      if ("production" !== 'production') {
        var ReactElementValidator = $__require('npm:react@15.2.1/lib/ReactElementValidator.js');
        return ReactElementValidator.createFactory(tag);
      }
      return ReactElement.createFactory(tag);
    }
    var ReactDOMFactories = mapObject({
      a: 'a',
      abbr: 'abbr',
      address: 'address',
      area: 'area',
      article: 'article',
      aside: 'aside',
      audio: 'audio',
      b: 'b',
      base: 'base',
      bdi: 'bdi',
      bdo: 'bdo',
      big: 'big',
      blockquote: 'blockquote',
      body: 'body',
      br: 'br',
      button: 'button',
      canvas: 'canvas',
      caption: 'caption',
      cite: 'cite',
      code: 'code',
      col: 'col',
      colgroup: 'colgroup',
      data: 'data',
      datalist: 'datalist',
      dd: 'dd',
      del: 'del',
      details: 'details',
      dfn: 'dfn',
      dialog: 'dialog',
      div: 'div',
      dl: 'dl',
      dt: 'dt',
      em: 'em',
      embed: 'embed',
      fieldset: 'fieldset',
      figcaption: 'figcaption',
      figure: 'figure',
      footer: 'footer',
      form: 'form',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      head: 'head',
      header: 'header',
      hgroup: 'hgroup',
      hr: 'hr',
      html: 'html',
      i: 'i',
      iframe: 'iframe',
      img: 'img',
      input: 'input',
      ins: 'ins',
      kbd: 'kbd',
      keygen: 'keygen',
      label: 'label',
      legend: 'legend',
      li: 'li',
      link: 'link',
      main: 'main',
      map: 'map',
      mark: 'mark',
      menu: 'menu',
      menuitem: 'menuitem',
      meta: 'meta',
      meter: 'meter',
      nav: 'nav',
      noscript: 'noscript',
      object: 'object',
      ol: 'ol',
      optgroup: 'optgroup',
      option: 'option',
      output: 'output',
      p: 'p',
      param: 'param',
      picture: 'picture',
      pre: 'pre',
      progress: 'progress',
      q: 'q',
      rp: 'rp',
      rt: 'rt',
      ruby: 'ruby',
      s: 's',
      samp: 'samp',
      script: 'script',
      section: 'section',
      select: 'select',
      small: 'small',
      source: 'source',
      span: 'span',
      strong: 'strong',
      style: 'style',
      sub: 'sub',
      summary: 'summary',
      sup: 'sup',
      table: 'table',
      tbody: 'tbody',
      td: 'td',
      textarea: 'textarea',
      tfoot: 'tfoot',
      th: 'th',
      thead: 'thead',
      time: 'time',
      title: 'title',
      tr: 'tr',
      track: 'track',
      u: 'u',
      ul: 'ul',
      'var': 'var',
      video: 'video',
      wbr: 'wbr',
      circle: 'circle',
      clipPath: 'clipPath',
      defs: 'defs',
      ellipse: 'ellipse',
      g: 'g',
      image: 'image',
      line: 'line',
      linearGradient: 'linearGradient',
      mask: 'mask',
      path: 'path',
      pattern: 'pattern',
      polygon: 'polygon',
      polyline: 'polyline',
      radialGradient: 'radialGradient',
      rect: 'rect',
      stop: 'stop',
      svg: 'svg',
      text: 'text',
      tspan: 'tspan'
    }, createDOMFactory);
    module.exports = ReactDOMFactories;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactPropTypes.js", ["npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactPropTypeLocationNames.js", "npm:fbjs@0.8.3/lib/emptyFunction.js", "npm:react@15.2.1/lib/getIteratorFn.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
  var ReactPropTypeLocationNames = $__require('npm:react@15.2.1/lib/ReactPropTypeLocationNames.js');
  var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
  var getIteratorFn = $__require('npm:react@15.2.1/lib/getIteratorFn.js');
  var ANONYMOUS = '<<anonymous>>';
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }
  function createChainableTypeChecker(validate) {
    function checkType(isRequired, props, propName, componentName, location, propFullName) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;
      if (props[propName] == null) {
        var locationName = ReactPropTypeLocationNames[location];
        if (isRequired) {
          return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }
    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }
  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        var locationName = ReactPropTypeLocationNames[location];
        var preciseType = getPreciseType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturns(null));
  }
  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var locationName = ReactPropTypeLocationNames[location];
        var propType = getPropType(propValue);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!ReactElement.isValidElement(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var locationName = ReactPropTypeLocationNames[location];
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      return createChainableTypeChecker(function() {
        return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
      });
    }
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      var valuesString = JSON.stringify(expectedValues);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      return createChainableTypeChecker(function() {
        return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
      });
    }
    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName) == null) {
          return null;
        }
      }
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }
  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        var locationName = ReactPropTypeLocationNames[location];
        return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }
  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || ReactElement.isValidElement(propValue)) {
          return true;
        }
        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }
        return true;
      default:
        return false;
    }
  }
  function isSymbol(propType, propValue) {
    if (propType === 'symbol') {
      return true;
    }
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }
    return false;
  }
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }
  module.exports = ReactPropTypes;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactVersion.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = '15.2.1';
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/onlyChild.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    function onlyChild(children) {
      !ReactElement.isValidElement(children) ? "production" !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : _prodInvariant('23') : void 0;
      return children;
    }
    module.exports = onlyChild;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:object-assign@4.1.0/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  function toObject(val) {
    if (val === null || val === undefined) {
      throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
  }
  function shouldUseNative() {
    try {
      if (!Object.assign) {
        return false;
      }
      var test1 = new String('abc');
      test1[5] = 'de';
      if (Object.getOwnPropertyNames(test1)[0] === '5') {
        return false;
      }
      var test2 = {};
      for (var i = 0; i < 10; i++) {
        test2['_' + String.fromCharCode(i)] = i;
      }
      var order2 = Object.getOwnPropertyNames(test2).map(function(n) {
        return test2[n];
      });
      if (order2.join('') !== '0123456789') {
        return false;
      }
      var test3 = {};
      'abcdefghijklmnopqrst'.split('').forEach(function(letter) {
        test3[letter] = letter;
      });
      if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }
  module.exports = shouldUseNative() ? Object.assign : function(target, source) {
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (Object.getOwnPropertySymbols) {
        symbols = Object.getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
          }
        }
      }
    }
    return to;
  };
  return module.exports;
});

System.registerDynamic("npm:object-assign@4.1.0.js", ["npm:object-assign@4.1.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:object-assign@4.1.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactElement.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:react@15.2.1/lib/canDefineProperty.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var canDefineProperty = $__require('npm:react@15.2.1/lib/canDefineProperty.js');
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown,
        specialPropRefWarningShown;
    function hasValidRef(config) {
      if ("production" !== 'production') {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }
    function hasValidKey(config) {
      if ("production" !== 'production') {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }
    var ReactElement = function(type, key, ref, self, source, owner, props) {
      var element = {
        $$typeof: REACT_ELEMENT_TYPE,
        type: type,
        key: key,
        ref: ref,
        props: props,
        _owner: owner
      };
      if ("production" !== 'production') {
        element._store = {};
        if (canDefineProperty) {
          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          });
          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
        } else {
          element._store.validated = false;
          element._self = self;
          element._source = source;
        }
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    ReactElement.createElement = function(type, config, children) {
      var propName;
      var props = {};
      var key = null;
      var ref = null;
      var self = null;
      var source = null;
      if (config != null) {
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(config.__proto__ == null || config.__proto__ === Object.prototype, 'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
        }
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }
        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      if ("production" !== 'production') {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        var warnAboutAccessingKey = function() {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            "production" !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
          }
          return undefined;
        };
        warnAboutAccessingKey.isReactWarning = true;
        var warnAboutAccessingRef = function() {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            "production" !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
          }
          return undefined;
        };
        warnAboutAccessingRef.isReactWarning = true;
        if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
          if (!props.hasOwnProperty('key')) {
            Object.defineProperty(props, 'key', {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
          if (!props.hasOwnProperty('ref')) {
            Object.defineProperty(props, 'ref', {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    };
    ReactElement.createFactory = function(type) {
      var factory = ReactElement.createElement.bind(null, type);
      factory.type = type;
      return factory;
    };
    ReactElement.cloneAndReplaceKey = function(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
      return newElement;
    };
    ReactElement.cloneElement = function(element, config, children) {
      var propName;
      var props = _assign({}, element.props);
      var key = element.key;
      var ref = element.ref;
      var self = element._self;
      var source = element._source;
      var owner = element._owner;
      if (config != null) {
        if ("production" !== 'production') {
          "production" !== 'production' ? warning(config.__proto__ == null || config.__proto__ === Object.prototype, 'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
        }
        if (hasValidRef(config)) {
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }
      return ReactElement(element.type, key, ref, self, source, owner, props);
    };
    ReactElement.isValidElement = function(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    };
    ReactElement.REACT_ELEMENT_TYPE = REACT_ELEMENT_TYPE;
    module.exports = ReactElement;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/keyMirror.js", ["npm:fbjs@0.8.3/lib/invariant.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var keyMirror = function keyMirror(obj) {
      var ret = {};
      var key;
      !(obj instanceof Object && !Array.isArray(obj)) ? "production" !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
      for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        ret[key] = key;
      }
      return ret;
    };
    module.exports = keyMirror;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactPropTypeLocations.js", ["npm:fbjs@0.8.3/lib/keyMirror.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var keyMirror = $__require('npm:fbjs@0.8.3/lib/keyMirror.js');
  var ReactPropTypeLocations = keyMirror({
    prop: null,
    context: null,
    childContext: null
  });
  module.exports = ReactPropTypeLocations;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactPropTypeLocationNames.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactPropTypeLocationNames = {};
    if ("production" !== 'production') {
      ReactPropTypeLocationNames = {
        prop: 'prop',
        context: 'context',
        childContext: 'child context'
      };
    }
    module.exports = ReactPropTypeLocationNames;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/reactProdInvariant.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function reactProdInvariant(code) {
    var argCount = arguments.length - 1;
    var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;
    for (var argIdx = 0; argIdx < argCount; argIdx++) {
      message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
    }
    message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';
    var error = new Error(message);
    error.name = 'Invariant Violation';
    error.framesToPop = 1;
    throw error;
  }
  module.exports = reactProdInvariant;
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactCurrentOwner.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReactCurrentOwner = {current: null};
  module.exports = ReactCurrentOwner;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/invariant.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    function invariant(condition, format, a, b, c, d, e, f) {
      if ("production" !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
      }
    }
    module.exports = invariant;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var tree = {};
    var unmountedIDs = {};
    var rootIDs = {};
    function updateTree(id, update) {
      if (!tree[id]) {
        tree[id] = {
          element: null,
          parentID: null,
          ownerID: null,
          text: null,
          childIDs: [],
          displayName: 'Unknown',
          isMounted: false,
          updateCount: 0
        };
      }
      update(tree[id]);
    }
    function purgeDeep(id) {
      var item = tree[id];
      if (item) {
        var childIDs = item.childIDs;
        delete tree[id];
        childIDs.forEach(purgeDeep);
      }
    }
    function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + name + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    }
    function describeID(id) {
      var name = ReactComponentTreeDevtool.getDisplayName(id);
      var element = ReactComponentTreeDevtool.getElement(id);
      var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
      var ownerName;
      if (ownerID) {
        ownerName = ReactComponentTreeDevtool.getDisplayName(ownerID);
      }
      "production" !== 'production' ? warning(element, 'ReactComponentTreeDevtool: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
      return describeComponentFrame(name, element && element._source, ownerName);
    }
    var ReactComponentTreeDevtool = {
      onSetDisplayName: function(id, displayName) {
        updateTree(id, function(item) {
          return item.displayName = displayName;
        });
      },
      onSetChildren: function(id, nextChildIDs) {
        updateTree(id, function(item) {
          item.childIDs = nextChildIDs;
          nextChildIDs.forEach(function(nextChildID) {
            var nextChild = tree[nextChildID];
            !nextChild ? "production" !== 'production' ? invariant(false, 'Expected devtool events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('68') : void 0;
            !(nextChild.displayName != null) ? "production" !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('69') : void 0;
            !(nextChild.childIDs != null || nextChild.text != null) ? "production" !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('70') : void 0;
            !nextChild.isMounted ? "production" !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
            if (nextChild.parentID == null) {
              nextChild.parentID = id;
            }
            !(nextChild.parentID === id) ? "production" !== 'production' ? invariant(false, 'Expected onSetParent() and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('72', nextChildID, nextChild.parentID, id) : void 0;
          });
        });
      },
      onSetOwner: function(id, ownerID) {
        updateTree(id, function(item) {
          return item.ownerID = ownerID;
        });
      },
      onSetParent: function(id, parentID) {
        updateTree(id, function(item) {
          return item.parentID = parentID;
        });
      },
      onSetText: function(id, text) {
        updateTree(id, function(item) {
          return item.text = text;
        });
      },
      onBeforeMountComponent: function(id, element) {
        updateTree(id, function(item) {
          return item.element = element;
        });
      },
      onBeforeUpdateComponent: function(id, element) {
        updateTree(id, function(item) {
          return item.element = element;
        });
      },
      onMountComponent: function(id) {
        updateTree(id, function(item) {
          return item.isMounted = true;
        });
      },
      onMountRootComponent: function(id) {
        rootIDs[id] = true;
      },
      onUpdateComponent: function(id) {
        updateTree(id, function(item) {
          return item.updateCount++;
        });
      },
      onUnmountComponent: function(id) {
        updateTree(id, function(item) {
          return item.isMounted = false;
        });
        unmountedIDs[id] = true;
        delete rootIDs[id];
      },
      purgeUnmountedComponents: function() {
        if (ReactComponentTreeDevtool._preventPurging) {
          return;
        }
        for (var id in unmountedIDs) {
          purgeDeep(id);
        }
        unmountedIDs = {};
      },
      isMounted: function(id) {
        var item = tree[id];
        return item ? item.isMounted : false;
      },
      getCurrentStackAddendum: function(topElement) {
        var info = '';
        if (topElement) {
          var type = topElement.type;
          var name = typeof type === 'function' ? type.displayName || type.name : type;
          var owner = topElement._owner;
          info += describeComponentFrame(name || 'Unknown', topElement._source, owner && owner.getName());
        }
        var currentOwner = ReactCurrentOwner.current;
        var id = currentOwner && currentOwner._debugID;
        info += ReactComponentTreeDevtool.getStackAddendumByID(id);
        return info;
      },
      getStackAddendumByID: function(id) {
        var info = '';
        while (id) {
          info += describeID(id);
          id = ReactComponentTreeDevtool.getParentID(id);
        }
        return info;
      },
      getChildIDs: function(id) {
        var item = tree[id];
        return item ? item.childIDs : [];
      },
      getDisplayName: function(id) {
        var item = tree[id];
        return item ? item.displayName : 'Unknown';
      },
      getElement: function(id) {
        var item = tree[id];
        return item ? item.element : null;
      },
      getOwnerID: function(id) {
        var item = tree[id];
        return item ? item.ownerID : null;
      },
      getParentID: function(id) {
        var item = tree[id];
        return item ? item.parentID : null;
      },
      getSource: function(id) {
        var item = tree[id];
        var element = item ? item.element : null;
        var source = element != null ? element._source : null;
        return source;
      },
      getText: function(id) {
        var item = tree[id];
        return item ? item.text : null;
      },
      getUpdateCount: function(id) {
        var item = tree[id];
        return item ? item.updateCount : 0;
      },
      getRootIDs: function() {
        return Object.keys(rootIDs);
      },
      getRegisteredIDs: function() {
        return Object.keys(tree);
      }
    };
    module.exports = ReactComponentTreeDevtool;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/checkReactTypeSpec.js", ["npm:react@15.2.1/lib/reactProdInvariant.js", "npm:react@15.2.1/lib/ReactPropTypeLocationNames.js", "npm:fbjs@0.8.3/lib/invariant.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _prodInvariant = $__require('npm:react@15.2.1/lib/reactProdInvariant.js');
    var ReactPropTypeLocationNames = $__require('npm:react@15.2.1/lib/ReactPropTypeLocationNames.js');
    var invariant = $__require('npm:fbjs@0.8.3/lib/invariant.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var loggedTypeFailures = {};
    function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
      for (var typeSpecName in typeSpecs) {
        if (typeSpecs.hasOwnProperty(typeSpecName)) {
          var error;
          try {
            !(typeof typeSpecs[typeSpecName] === 'function') ? "production" !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location);
          } catch (ex) {
            error = ex;
          }
          "production" !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            loggedTypeFailures[error.message] = true;
            var componentStackInfo = '';
            if ("production" !== 'production') {
              var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
              if (debugID !== null) {
                componentStackInfo = ReactComponentTreeDevtool.getStackAddendumByID(debugID);
              } else if (element !== null) {
                componentStackInfo = ReactComponentTreeDevtool.getCurrentStackAddendum(element);
              }
            }
            "production" !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
          }
        }
      }
    }
    module.exports = checkReactTypeSpec;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/canDefineProperty.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var canDefineProperty = false;
    if ("production" !== 'production') {
      try {
        Object.defineProperty({}, 'x', {get: function() {}});
        canDefineProperty = true;
      } catch (x) {}
    }
    module.exports = canDefineProperty;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/getIteratorFn.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  module.exports = getIteratorFn;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/emptyFunction.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function makeEmptyFunction(arg) {
    return function() {
      return arg;
    };
  }
  var emptyFunction = function emptyFunction() {};
  emptyFunction.thatReturns = makeEmptyFunction;
  emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
  emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
  emptyFunction.thatReturnsNull = makeEmptyFunction(null);
  emptyFunction.thatReturnsThis = function() {
    return this;
  };
  emptyFunction.thatReturnsArgument = function(arg) {
    return arg;
  };
  module.exports = emptyFunction;
  return module.exports;
});

System.registerDynamic("npm:fbjs@0.8.3/lib/warning.js", ["npm:fbjs@0.8.3/lib/emptyFunction.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var emptyFunction = $__require('npm:fbjs@0.8.3/lib/emptyFunction.js');
    var warning = emptyFunction;
    if ("production" !== 'production') {
      warning = function warning(condition, format) {
        for (var _len = arguments.length,
            args = Array(_len > 2 ? _len - 2 : 0),
            _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (format.indexOf('Failed Composite propType: ') === 0) {
          return;
        }
        if (!condition) {
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          if (typeof console !== 'undefined') {
            console.error(message);
          }
          try {
            throw new Error(message);
          } catch (x) {}
        }
      };
    }
    module.exports = warning;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/ReactElementValidator.js", ["npm:react@15.2.1/lib/ReactCurrentOwner.js", "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactPropTypeLocations.js", "npm:react@15.2.1/lib/checkReactTypeSpec.js", "npm:react@15.2.1/lib/canDefineProperty.js", "npm:react@15.2.1/lib/getIteratorFn.js", "npm:fbjs@0.8.3/lib/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var ReactCurrentOwner = $__require('npm:react@15.2.1/lib/ReactCurrentOwner.js');
    var ReactComponentTreeDevtool = $__require('npm:react@15.2.1/lib/ReactComponentTreeDevtool.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var ReactPropTypeLocations = $__require('npm:react@15.2.1/lib/ReactPropTypeLocations.js');
    var checkReactTypeSpec = $__require('npm:react@15.2.1/lib/checkReactTypeSpec.js');
    var canDefineProperty = $__require('npm:react@15.2.1/lib/canDefineProperty.js');
    var getIteratorFn = $__require('npm:react@15.2.1/lib/getIteratorFn.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = ReactCurrentOwner.current.getName();
        if (name) {
          return ' Check the render method of `' + name + '`.';
        }
      }
      return '';
    }
    var ownerHasKeyUseWarning = {};
    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();
      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = ' Check the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;
      var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});
      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (memoizer[currentComponentErrorInfo]) {
        return;
      }
      memoizer[currentComponentErrorInfo] = true;
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
      }
      "production" !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeDevtool.getCurrentStackAddendum(element)) : void 0;
    }
    function validateChildKeys(node, parentType) {
      if (typeof node !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (ReactElement.isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (ReactElement.isValidElement(node)) {
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (iteratorFn) {
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (ReactElement.isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      if (componentClass.propTypes) {
        checkReactTypeSpec(componentClass.propTypes, element.props, ReactPropTypeLocations.prop, name, element, null);
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        "production" !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
      }
    }
    var ReactElementValidator = {
      createElement: function(type, props, children) {
        var validType = typeof type === 'string' || typeof type === 'function';
        "production" !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;
        var element = ReactElement.createElement.apply(this, arguments);
        if (element == null) {
          return element;
        }
        if (validType) {
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], type);
          }
        }
        validatePropTypes(element);
        return element;
      },
      createFactory: function(type) {
        var validatedFactory = ReactElementValidator.createElement.bind(null, type);
        validatedFactory.type = type;
        if ("production" !== 'production') {
          if (canDefineProperty) {
            Object.defineProperty(validatedFactory, 'type', {
              enumerable: false,
              get: function() {
                "production" !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
                Object.defineProperty(this, 'type', {value: type});
                return type;
              }
            });
          }
        }
        return validatedFactory;
      },
      cloneElement: function(element, props, children) {
        var newElement = ReactElement.cloneElement.apply(this, arguments);
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], newElement.type);
        }
        validatePropTypes(newElement);
        return newElement;
      }
    };
    module.exports = ReactElementValidator;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/lib/React.js", ["npm:object-assign@4.1.0.js", "npm:react@15.2.1/lib/ReactChildren.js", "npm:react@15.2.1/lib/ReactComponent.js", "npm:react@15.2.1/lib/ReactClass.js", "npm:react@15.2.1/lib/ReactDOMFactories.js", "npm:react@15.2.1/lib/ReactElement.js", "npm:react@15.2.1/lib/ReactPropTypes.js", "npm:react@15.2.1/lib/ReactVersion.js", "npm:react@15.2.1/lib/onlyChild.js", "npm:fbjs@0.8.3/lib/warning.js", "npm:react@15.2.1/lib/ReactElementValidator.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _assign = $__require('npm:object-assign@4.1.0.js');
    var ReactChildren = $__require('npm:react@15.2.1/lib/ReactChildren.js');
    var ReactComponent = $__require('npm:react@15.2.1/lib/ReactComponent.js');
    var ReactClass = $__require('npm:react@15.2.1/lib/ReactClass.js');
    var ReactDOMFactories = $__require('npm:react@15.2.1/lib/ReactDOMFactories.js');
    var ReactElement = $__require('npm:react@15.2.1/lib/ReactElement.js');
    var ReactPropTypes = $__require('npm:react@15.2.1/lib/ReactPropTypes.js');
    var ReactVersion = $__require('npm:react@15.2.1/lib/ReactVersion.js');
    var onlyChild = $__require('npm:react@15.2.1/lib/onlyChild.js');
    var warning = $__require('npm:fbjs@0.8.3/lib/warning.js');
    var createElement = ReactElement.createElement;
    var createFactory = ReactElement.createFactory;
    var cloneElement = ReactElement.cloneElement;
    if ("production" !== 'production') {
      var ReactElementValidator = $__require('npm:react@15.2.1/lib/ReactElementValidator.js');
      createElement = ReactElementValidator.createElement;
      createFactory = ReactElementValidator.createFactory;
      cloneElement = ReactElementValidator.cloneElement;
    }
    var __spread = _assign;
    if ("production" !== 'production') {
      var warned = false;
      __spread = function() {
        "production" !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
        warned = true;
        return _assign.apply(null, arguments);
      };
    }
    var React = {
      Children: {
        map: ReactChildren.map,
        forEach: ReactChildren.forEach,
        count: ReactChildren.count,
        toArray: ReactChildren.toArray,
        only: onlyChild
      },
      Component: ReactComponent,
      createElement: createElement,
      cloneElement: cloneElement,
      isValidElement: ReactElement.isValidElement,
      PropTypes: ReactPropTypes,
      createClass: ReactClass.createClass,
      createFactory: createFactory,
      createMixin: function(mixin) {
        return mixin;
      },
      DOM: ReactDOMFactories,
      version: ReactVersion,
      __spread: __spread
    };
    module.exports = React;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1/react.js", ["npm:react@15.2.1/lib/React.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react@15.2.1/lib/React.js');
  return module.exports;
});

System.registerDynamic("npm:react@15.2.1.js", ["npm:react@15.2.1/react.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react@15.2.1/react.js');
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/utils/storeShape.js", ["npm:react@15.2.1.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _react = $__require('npm:react@15.2.1.js');
  exports["default"] = _react.PropTypes.shape({
    subscribe: _react.PropTypes.func.isRequired,
    dispatch: _react.PropTypes.func.isRequired,
    getState: _react.PropTypes.func.isRequired
  });
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/utils/shallowEqual.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = shallowEqual;
  function shallowEqual(objA, objB) {
    if (objA === objB) {
      return true;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
      return false;
    }
    var hasOwn = Object.prototype.hasOwnProperty;
    for (var i = 0; i < keysA.length; i++) {
      if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
      }
    }
    return true;
  }
  return module.exports;
});

System.registerDynamic("npm:symbol-observable@0.2.4/ponyfill.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function symbolObservablePonyfill(root) {
    var result;
    var Symbol = root.Symbol;
    if (typeof Symbol === 'function') {
      if (Symbol.observable) {
        result = Symbol.observable;
      } else {
        result = Symbol('observable');
        Symbol.observable = result;
      }
    } else {
      result = '@@observable';
    }
    return result;
  };
  return module.exports;
});

System.registerDynamic("npm:symbol-observable@0.2.4/index.js", ["npm:symbol-observable@0.2.4/ponyfill.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:symbol-observable@0.2.4/ponyfill.js')(global || window || this);
  return module.exports;
});

System.registerDynamic("npm:symbol-observable@0.2.4.js", ["npm:symbol-observable@0.2.4/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:symbol-observable@0.2.4/index.js');
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/createStore.js", ["npm:lodash@4.13.1/isPlainObject.js", "npm:symbol-observable@0.2.4.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports.ActionTypes = undefined;
  exports["default"] = createStore;
  var _isPlainObject = $__require('npm:lodash@4.13.1/isPlainObject.js');
  var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
  var _symbolObservable = $__require('npm:symbol-observable@0.2.4.js');
  var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  var ActionTypes = exports.ActionTypes = {INIT: '@@redux/INIT'};
  function createStore(reducer, initialState, enhancer) {
    var _ref2;
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
      enhancer = initialState;
      initialState = undefined;
    }
    if (typeof enhancer !== 'undefined') {
      if (typeof enhancer !== 'function') {
        throw new Error('Expected the enhancer to be a function.');
      }
      return enhancer(createStore)(reducer, initialState);
    }
    if (typeof reducer !== 'function') {
      throw new Error('Expected the reducer to be a function.');
    }
    var currentReducer = reducer;
    var currentState = initialState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = currentListeners.slice();
      }
    }
    function getState() {
      return currentState;
    }
    function subscribe(listener) {
      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.');
      }
      var isSubscribed = true;
      ensureCanMutateNextListeners();
      nextListeners.push(listener);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        var index = nextListeners.indexOf(listener);
        nextListeners.splice(index, 1);
      };
    }
    function dispatch(action) {
      if (!(0, _isPlainObject2["default"])(action)) {
        throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
      }
      if (typeof action.type === 'undefined') {
        throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
      }
      if (isDispatching) {
        throw new Error('Reducers may not dispatch actions.');
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      var listeners = currentListeners = nextListeners;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== 'function') {
        throw new Error('Expected the nextReducer to be a function.');
      }
      currentReducer = nextReducer;
      dispatch({type: ActionTypes.INIT});
    }
    function observable() {
      var _ref;
      var outerSubscribe = subscribe;
      return _ref = {subscribe: function subscribe(observer) {
          if (typeof observer !== 'object') {
            throw new TypeError('Expected the observer to be an object.');
          }
          function observeState() {
            if (observer.next) {
              observer.next(getState());
            }
          }
          observeState();
          var unsubscribe = outerSubscribe(observeState);
          return {unsubscribe: unsubscribe};
        }}, _ref[_symbolObservable2["default"]] = function() {
        return this;
      }, _ref;
    }
    dispatch({type: ActionTypes.INIT});
    return _ref2 = {
      dispatch: dispatch,
      subscribe: subscribe,
      getState: getState,
      replaceReducer: replaceReducer
    }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
  }
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/combineReducers.js", ["npm:redux@3.5.2/lib/createStore.js", "npm:lodash@4.13.1/isPlainObject.js", "npm:redux@3.5.2/lib/utils/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    exports.__esModule = true;
    exports["default"] = combineReducers;
    var _createStore = $__require('npm:redux@3.5.2/lib/createStore.js');
    var _isPlainObject = $__require('npm:lodash@4.13.1/isPlainObject.js');
    var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
    var _warning = $__require('npm:redux@3.5.2/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {"default": obj};
    }
    function getUndefinedStateErrorMessage(key, action) {
      var actionType = action && action.type;
      var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
      return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
    }
    function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
      var reducerKeys = Object.keys(reducers);
      var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';
      if (reducerKeys.length === 0) {
        return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
      }
      if (!(0, _isPlainObject2["default"])(inputState)) {
        return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
      }
      var unexpectedKeys = Object.keys(inputState).filter(function(key) {
        return !reducers.hasOwnProperty(key);
      });
      if (unexpectedKeys.length > 0) {
        return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
      }
    }
    function assertReducerSanity(reducers) {
      Object.keys(reducers).forEach(function(key) {
        var reducer = reducers[key];
        var initialState = reducer(undefined, {type: _createStore.ActionTypes.INIT});
        if (typeof initialState === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
        }
        var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
        if (typeof reducer(undefined, {type: type}) === 'undefined') {
          throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
        }
      });
    }
    function combineReducers(reducers) {
      var reducerKeys = Object.keys(reducers);
      var finalReducers = {};
      for (var i = 0; i < reducerKeys.length; i++) {
        var key = reducerKeys[i];
        if (typeof reducers[key] === 'function') {
          finalReducers[key] = reducers[key];
        }
      }
      var finalReducerKeys = Object.keys(finalReducers);
      var sanityError;
      try {
        assertReducerSanity(finalReducers);
      } catch (e) {
        sanityError = e;
      }
      return function combination() {
        var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
        var action = arguments[1];
        if (sanityError) {
          throw sanityError;
        }
        if ("production" !== 'production') {
          var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
          if (warningMessage) {
            (0, _warning2["default"])(warningMessage);
          }
        }
        var hasChanged = false;
        var nextState = {};
        for (var i = 0; i < finalReducerKeys.length; i++) {
          var key = finalReducerKeys[i];
          var reducer = finalReducers[key];
          var previousStateForKey = state[key];
          var nextStateForKey = reducer(previousStateForKey, action);
          if (typeof nextStateForKey === 'undefined') {
            var errorMessage = getUndefinedStateErrorMessage(key, action);
            throw new Error(errorMessage);
          }
          nextState[key] = nextStateForKey;
          hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        }
        return hasChanged ? nextState : state;
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/bindActionCreators.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = bindActionCreators;
  function bindActionCreator(actionCreator, dispatch) {
    return function() {
      return dispatch(actionCreator.apply(undefined, arguments));
    };
  }
  function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
      return bindActionCreator(actionCreators, dispatch);
    }
    if (typeof actionCreators !== 'object' || actionCreators === null) {
      throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
    }
    var keys = Object.keys(actionCreators);
    var boundActionCreators = {};
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var actionCreator = actionCreators[key];
      if (typeof actionCreator === 'function') {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
    return boundActionCreators;
  }
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/applyMiddleware.js", ["npm:redux@3.5.2/lib/compose.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  var _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  exports["default"] = applyMiddleware;
  var _compose = $__require('npm:redux@3.5.2/lib/compose.js');
  var _compose2 = _interopRequireDefault(_compose);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  function applyMiddleware() {
    for (var _len = arguments.length,
        middlewares = Array(_len),
        _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }
    return function(createStore) {
      return function(reducer, initialState, enhancer) {
        var store = createStore(reducer, initialState, enhancer);
        var _dispatch = store.dispatch;
        var chain = [];
        var middlewareAPI = {
          getState: store.getState,
          dispatch: function dispatch(action) {
            return _dispatch(action);
          }
        };
        chain = middlewares.map(function(middleware) {
          return middleware(middlewareAPI);
        });
        _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);
        return _extends({}, store, {dispatch: _dispatch});
      };
    };
  }
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/compose.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = compose;
  function compose() {
    for (var _len = arguments.length,
        funcs = Array(_len),
        _key = 0; _key < _len; _key++) {
      funcs[_key] = arguments[_key];
    }
    if (funcs.length === 0) {
      return function(arg) {
        return arg;
      };
    } else {
      var _ret = function() {
        var last = funcs[funcs.length - 1];
        var rest = funcs.slice(0, -1);
        return {v: function v() {
            return rest.reduceRight(function(composed, f) {
              return f(composed);
            }, last.apply(undefined, arguments));
          }};
      }();
      if (typeof _ret === "object")
        return _ret.v;
    }
  }
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/utils/warning.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = warning;
  function warning(message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (e) {}
  }
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2/lib/index.js", ["npm:redux@3.5.2/lib/createStore.js", "npm:redux@3.5.2/lib/combineReducers.js", "npm:redux@3.5.2/lib/bindActionCreators.js", "npm:redux@3.5.2/lib/applyMiddleware.js", "npm:redux@3.5.2/lib/compose.js", "npm:redux@3.5.2/lib/utils/warning.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    exports.__esModule = true;
    exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
    var _createStore = $__require('npm:redux@3.5.2/lib/createStore.js');
    var _createStore2 = _interopRequireDefault(_createStore);
    var _combineReducers = $__require('npm:redux@3.5.2/lib/combineReducers.js');
    var _combineReducers2 = _interopRequireDefault(_combineReducers);
    var _bindActionCreators = $__require('npm:redux@3.5.2/lib/bindActionCreators.js');
    var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
    var _applyMiddleware = $__require('npm:redux@3.5.2/lib/applyMiddleware.js');
    var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
    var _compose = $__require('npm:redux@3.5.2/lib/compose.js');
    var _compose2 = _interopRequireDefault(_compose);
    var _warning = $__require('npm:redux@3.5.2/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {"default": obj};
    }
    function isCrushed() {}
    if ("production" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
      (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
    }
    exports.createStore = _createStore2["default"];
    exports.combineReducers = _combineReducers2["default"];
    exports.bindActionCreators = _bindActionCreators2["default"];
    exports.applyMiddleware = _applyMiddleware2["default"];
    exports.compose = _compose2["default"];
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:redux@3.5.2.js", ["npm:redux@3.5.2/lib/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:redux@3.5.2/lib/index.js');
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js", ["npm:redux@3.5.2.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = wrapActionCreators;
  var _redux = $__require('npm:redux@3.5.2.js');
  function wrapActionCreators(actionCreators) {
    return function(dispatch) {
      return (0, _redux.bindActionCreators)(actionCreators, dispatch);
    };
  }
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/utils/warning.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports["default"] = warning;
  function warning(message) {
    if (typeof console !== 'undefined' && typeof console.error === 'function') {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (e) {}
  }
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_getPrototype.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var nativeGetPrototype = Object.getPrototypeOf;
  function getPrototype(value) {
    return nativeGetPrototype(Object(value));
  }
  module.exports = getPrototype;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/_isHostObject.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != 'function') {
      try {
        result = !!(value + '');
      } catch (e) {}
    }
    return result;
  }
  module.exports = isHostObject;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isObjectLike.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  module.exports = isObjectLike;
  return module.exports;
});

System.registerDynamic("npm:lodash@4.13.1/isPlainObject.js", ["npm:lodash@4.13.1/_getPrototype.js", "npm:lodash@4.13.1/_isHostObject.js", "npm:lodash@4.13.1/isObjectLike.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var getPrototype = $__require('npm:lodash@4.13.1/_getPrototype.js'),
      isHostObject = $__require('npm:lodash@4.13.1/_isHostObject.js'),
      isObjectLike = $__require('npm:lodash@4.13.1/isObjectLike.js');
  var objectTag = '[object Object]';
  var objectProto = Object.prototype;
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  var objectToString = objectProto.toString;
  function isPlainObject(value) {
    if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
  }
  module.exports = isPlainObject;
  return module.exports;
});

System.registerDynamic("npm:hoist-non-react-statics@1.2.0/index.js", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };
  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
  };
  var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
  module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
    if (typeof sourceComponent !== 'string') {
      var keys = Object.getOwnPropertyNames(sourceComponent);
      if (isGetOwnPropertySymbolsAvailable) {
        keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
      }
      for (var i = 0; i < keys.length; ++i) {
        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
          try {
            targetComponent[keys[i]] = sourceComponent[keys[i]];
          } catch (error) {}
        }
      }
    }
    return targetComponent;
  };
  return module.exports;
});

System.registerDynamic("npm:hoist-non-react-statics@1.2.0.js", ["npm:hoist-non-react-statics@1.2.0/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:hoist-non-react-statics@1.2.0/index.js');
  return module.exports;
});

System.registerDynamic("npm:invariant@2.2.1/browser.js", ["github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var invariant = function(condition, format, a, b, c, d, e, f) {
      if ("production" !== 'production') {
        if (format === undefined) {
          throw new Error('invariant requires an error message argument');
        }
      }
      if (!condition) {
        var error;
        if (format === undefined) {
          error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
        } else {
          var args = [a, b, c, d, e, f];
          var argIndex = 0;
          error = new Error(format.replace(/%s/g, function() {
            return args[argIndex++];
          }));
          error.name = 'Invariant Violation';
        }
        error.framesToPop = 1;
        throw error;
      }
    };
    module.exports = invariant;
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:invariant@2.2.1.js", ["npm:invariant@2.2.1/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:invariant@2.2.1/browser.js');
  return module.exports;
});

System.registerDynamic("npm:process@0.11.5/browser.js", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var process = module.exports = {};
  var cachedSetTimeout;
  var cachedClearTimeout;
  (function() {
    try {
      cachedSetTimeout = setTimeout;
    } catch (e) {
      cachedSetTimeout = function() {
        throw new Error('setTimeout is not defined');
      };
    }
    try {
      cachedClearTimeout = clearTimeout;
    } catch (e) {
      cachedClearTimeout = function() {
        throw new Error('clearTimeout is not defined');
      };
    }
  }());
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    if (!draining || !currentQueue) {
      return;
    }
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      cachedSetTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  return module.exports;
});

System.registerDynamic("npm:process@0.11.5.js", ["npm:process@0.11.5/browser.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:process@0.11.5/browser.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2/index.js", ["npm:process@0.11.5.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = System._nodeRequire ? process : $__require('npm:process@0.11.5.js');
  return module.exports;
});

System.registerDynamic("github:jspm/nodelibs-process@0.1.2.js", ["github:jspm/nodelibs-process@0.1.2/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('github:jspm/nodelibs-process@0.1.2/index.js');
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/components/connect.js", ["npm:react@15.2.1.js", "npm:react-redux@4.4.5/lib/utils/storeShape.js", "npm:react-redux@4.4.5/lib/utils/shallowEqual.js", "npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js", "npm:react-redux@4.4.5/lib/utils/warning.js", "npm:lodash@4.13.1/isPlainObject.js", "npm:hoist-non-react-statics@1.2.0.js", "npm:invariant@2.2.1.js", "github:jspm/nodelibs-process@0.1.2.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(process) {
    'use strict';
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    exports.__esModule = true;
    exports["default"] = connect;
    var _react = $__require('npm:react@15.2.1.js');
    var _storeShape = $__require('npm:react-redux@4.4.5/lib/utils/storeShape.js');
    var _storeShape2 = _interopRequireDefault(_storeShape);
    var _shallowEqual = $__require('npm:react-redux@4.4.5/lib/utils/shallowEqual.js');
    var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
    var _wrapActionCreators = $__require('npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js');
    var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
    var _warning = $__require('npm:react-redux@4.4.5/lib/utils/warning.js');
    var _warning2 = _interopRequireDefault(_warning);
    var _isPlainObject = $__require('npm:lodash@4.13.1/isPlainObject.js');
    var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
    var _hoistNonReactStatics = $__require('npm:hoist-non-react-statics@1.2.0.js');
    var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
    var _invariant = $__require('npm:invariant@2.2.1.js');
    var _invariant2 = _interopRequireDefault(_invariant);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {"default": obj};
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }});
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var defaultMapStateToProps = function defaultMapStateToProps(state) {
      return {};
    };
    var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
      return {dispatch: dispatch};
    };
    var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
      return _extends({}, parentProps, stateProps, dispatchProps);
    };
    function getDisplayName(WrappedComponent) {
      return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
    var errorObject = {value: null};
    function tryCatch(fn, ctx) {
      try {
        return fn.apply(ctx);
      } catch (e) {
        errorObject.value = e;
        return errorObject;
      }
    }
    var nextVersion = 0;
    function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
      var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
      var shouldSubscribe = Boolean(mapStateToProps);
      var mapState = mapStateToProps || defaultMapStateToProps;
      var mapDispatch = undefined;
      if (typeof mapDispatchToProps === 'function') {
        mapDispatch = mapDispatchToProps;
      } else if (!mapDispatchToProps) {
        mapDispatch = defaultMapDispatchToProps;
      } else {
        mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
      }
      var finalMergeProps = mergeProps || defaultMergeProps;
      var _options$pure = options.pure;
      var pure = _options$pure === undefined ? true : _options$pure;
      var _options$withRef = options.withRef;
      var withRef = _options$withRef === undefined ? false : _options$withRef;
      var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
      var version = nextVersion++;
      return function wrapWithConnect(WrappedComponent) {
        var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
        function checkStateShape(props, methodName) {
          if (!(0, _isPlainObject2["default"])(props)) {
            (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
          }
        }
        function computeMergedProps(stateProps, dispatchProps, parentProps) {
          var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
          if ("production" !== 'production') {
            checkStateShape(mergedProps, 'mergeProps');
          }
          return mergedProps;
        }
        var Connect = function(_Component) {
          _inherits(Connect, _Component);
          Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
            return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
          };
          function Connect(props, context) {
            _classCallCheck(this, Connect);
            var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
            _this.version = version;
            _this.store = props.store || context.store;
            (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));
            var storeState = _this.store.getState();
            _this.state = {storeState: storeState};
            _this.clearCache();
            return _this;
          }
          Connect.prototype.computeStateProps = function computeStateProps(store, props) {
            if (!this.finalMapStateToProps) {
              return this.configureFinalMapState(store, props);
            }
            var state = store.getState();
            var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);
            if ("production" !== 'production') {
              checkStateShape(stateProps, 'mapStateToProps');
            }
            return stateProps;
          };
          Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
            var mappedState = mapState(store.getState(), props);
            var isFactory = typeof mappedState === 'function';
            this.finalMapStateToProps = isFactory ? mappedState : mapState;
            this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
            if (isFactory) {
              return this.computeStateProps(store, props);
            }
            if ("production" !== 'production') {
              checkStateShape(mappedState, 'mapStateToProps');
            }
            return mappedState;
          };
          Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
            if (!this.finalMapDispatchToProps) {
              return this.configureFinalMapDispatch(store, props);
            }
            var dispatch = store.dispatch;
            var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
            if ("production" !== 'production') {
              checkStateShape(dispatchProps, 'mapDispatchToProps');
            }
            return dispatchProps;
          };
          Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
            var mappedDispatch = mapDispatch(store.dispatch, props);
            var isFactory = typeof mappedDispatch === 'function';
            this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
            this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
            if (isFactory) {
              return this.computeDispatchProps(store, props);
            }
            if ("production" !== 'production') {
              checkStateShape(mappedDispatch, 'mapDispatchToProps');
            }
            return mappedDispatch;
          };
          Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
            var nextStateProps = this.computeStateProps(this.store, this.props);
            if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
              return false;
            }
            this.stateProps = nextStateProps;
            return true;
          };
          Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
            var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
            if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
              return false;
            }
            this.dispatchProps = nextDispatchProps;
            return true;
          };
          Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
            var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
            if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
              return false;
            }
            this.mergedProps = nextMergedProps;
            return true;
          };
          Connect.prototype.isSubscribed = function isSubscribed() {
            return typeof this.unsubscribe === 'function';
          };
          Connect.prototype.trySubscribe = function trySubscribe() {
            if (shouldSubscribe && !this.unsubscribe) {
              this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
              this.handleChange();
            }
          };
          Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
            if (this.unsubscribe) {
              this.unsubscribe();
              this.unsubscribe = null;
            }
          };
          Connect.prototype.componentDidMount = function componentDidMount() {
            this.trySubscribe();
          };
          Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
              this.haveOwnPropsChanged = true;
            }
          };
          Connect.prototype.componentWillUnmount = function componentWillUnmount() {
            this.tryUnsubscribe();
            this.clearCache();
          };
          Connect.prototype.clearCache = function clearCache() {
            this.dispatchProps = null;
            this.stateProps = null;
            this.mergedProps = null;
            this.haveOwnPropsChanged = true;
            this.hasStoreStateChanged = true;
            this.haveStatePropsBeenPrecalculated = false;
            this.statePropsPrecalculationError = null;
            this.renderedElement = null;
            this.finalMapDispatchToProps = null;
            this.finalMapStateToProps = null;
          };
          Connect.prototype.handleChange = function handleChange() {
            if (!this.unsubscribe) {
              return;
            }
            var storeState = this.store.getState();
            var prevStoreState = this.state.storeState;
            if (pure && prevStoreState === storeState) {
              return;
            }
            if (pure && !this.doStatePropsDependOnOwnProps) {
              var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
              if (!haveStatePropsChanged) {
                return;
              }
              if (haveStatePropsChanged === errorObject) {
                this.statePropsPrecalculationError = errorObject.value;
              }
              this.haveStatePropsBeenPrecalculated = true;
            }
            this.hasStoreStateChanged = true;
            this.setState({storeState: storeState});
          };
          Connect.prototype.getWrappedInstance = function getWrappedInstance() {
            (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
            return this.refs.wrappedInstance;
          };
          Connect.prototype.render = function render() {
            var haveOwnPropsChanged = this.haveOwnPropsChanged;
            var hasStoreStateChanged = this.hasStoreStateChanged;
            var haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated;
            var statePropsPrecalculationError = this.statePropsPrecalculationError;
            var renderedElement = this.renderedElement;
            this.haveOwnPropsChanged = false;
            this.hasStoreStateChanged = false;
            this.haveStatePropsBeenPrecalculated = false;
            this.statePropsPrecalculationError = null;
            if (statePropsPrecalculationError) {
              throw statePropsPrecalculationError;
            }
            var shouldUpdateStateProps = true;
            var shouldUpdateDispatchProps = true;
            if (pure && renderedElement) {
              shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
              shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
            }
            var haveStatePropsChanged = false;
            var haveDispatchPropsChanged = false;
            if (haveStatePropsBeenPrecalculated) {
              haveStatePropsChanged = true;
            } else if (shouldUpdateStateProps) {
              haveStatePropsChanged = this.updateStatePropsIfNeeded();
            }
            if (shouldUpdateDispatchProps) {
              haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
            }
            var haveMergedPropsChanged = true;
            if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
              haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
            } else {
              haveMergedPropsChanged = false;
            }
            if (!haveMergedPropsChanged && renderedElement) {
              return renderedElement;
            }
            if (withRef) {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {ref: 'wrappedInstance'}));
            } else {
              this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
            }
            return this.renderedElement;
          };
          return Connect;
        }(_react.Component);
        Connect.displayName = connectDisplayName;
        Connect.WrappedComponent = WrappedComponent;
        Connect.contextTypes = {store: _storeShape2["default"]};
        Connect.propTypes = {store: _storeShape2["default"]};
        if ("production" !== 'production') {
          Connect.prototype.componentWillUpdate = function componentWillUpdate() {
            if (this.version === version) {
              return;
            }
            this.version = version;
            this.trySubscribe();
            this.clearCache();
          };
        }
        return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
      };
    }
  })($__require('github:jspm/nodelibs-process@0.1.2.js'));
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5/lib/index.js", ["npm:react-redux@4.4.5/lib/components/Provider.js", "npm:react-redux@4.4.5/lib/components/connect.js"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.__esModule = true;
  exports.connect = exports.Provider = undefined;
  var _Provider = $__require('npm:react-redux@4.4.5/lib/components/Provider.js');
  var _Provider2 = _interopRequireDefault(_Provider);
  var _connect = $__require('npm:react-redux@4.4.5/lib/components/connect.js');
  var _connect2 = _interopRequireDefault(_connect);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {"default": obj};
  }
  exports.Provider = _Provider2["default"];
  exports.connect = _connect2["default"];
  return module.exports;
});

System.registerDynamic("npm:react-redux@4.4.5.js", ["npm:react-redux@4.4.5/lib/index.js"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = $__require('npm:react-redux@4.4.5/lib/index.js');
  return module.exports;
});

System.register('stem/App.js', ['npm:material-ui@0.15.2/AppBar.js', 'npm:material-ui@0.15.2/styles/MuiThemeProvider.js', 'npm:react@15.2.1.js', 'npm:react-redux@4.4.5.js'], function (_export) {
  /**
   * Main application endpoint
   *
   * 
   */

  'use strict';

  var AppBar, MuiThemeProvider, React, connect, App;
  return {
    setters: [function (_npmMaterialUi0152AppBarJs) {
      AppBar = _npmMaterialUi0152AppBarJs['default'];
    }, function (_npmMaterialUi0152StylesMuiThemeProviderJs) {
      MuiThemeProvider = _npmMaterialUi0152StylesMuiThemeProviderJs['default'];
    }, function (_npmReact1521Js) {
      React = _npmReact1521Js['default'];
    }, function (_npmReactRedux445Js) {
      connect = _npmReactRedux445Js.connect;
    }],
    execute: function () {
      App = function App() {
        return React.createElement(
          MuiThemeProvider,
          null,
          React.createElement(AppBar, null)
        );
      };

      _export('default', connect()(App));
    }
  };
});
System.register("stem/reducers.js", [], function (_export) {
  /**
   * Main reducers segment
   *
   * 
   */

  "use strict";

  _export("default", reducer);

  function reducer() {}

  return {
    setters: [],
    execute: function () {
      ;
    }
  };
});
System.register('stem/main.js', ['npm:react@15.2.1.js', 'npm:react-tap-event-plugin@1.0.0.js', 'npm:redux@3.5.2.js', 'npm:react-redux@4.4.5.js', 'npm:react-dom@15.2.1.js', 'stem/App.js', 'stem/reducers.js'], function (_export) {
  /**
   * Main client file
   *
   * 
   */

  // allow events in material-ui
  'use strict';

  var React, tapEventPlugin, createStore, Provider, ReactDOM, App, reducers;
  return {
    setters: [function (_npmReact1521Js) {
      React = _npmReact1521Js['default'];
    }, function (_npmReactTapEventPlugin100Js) {
      tapEventPlugin = _npmReactTapEventPlugin100Js['default'];
    }, function (_npmRedux352Js) {
      createStore = _npmRedux352Js.createStore;
    }, function (_npmReactRedux445Js) {
      Provider = _npmReactRedux445Js.Provider;
    }, function (_npmReactDom1521Js) {
      ReactDOM = _npmReactDom1521Js['default'];
    }, function (_stemAppJs) {
      App = _stemAppJs['default'];
    }, function (_stemReducersJs) {
      reducers = _stemReducersJs['default'];
    }],
    execute: function () {
      tapEventPlugin();

      ReactDOM.render(React.createElement(
        Provider,
        { store: createStore(reducers) },
        React.createElement(App, null)
      ), document.getElementById('root'));
    }
  };
});
//# sourceMappingURL=main.js.map