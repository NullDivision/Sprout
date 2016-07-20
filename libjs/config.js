System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  depCache: {
    "npm:react@15.2.1.js": [
      "npm:react@15.2.1/react.js"
    ],
    "npm:react@15.2.1/react.js": [
      "./lib/React"
    ],
    "npm:react@15.2.1/lib/React.js": [
      "object-assign",
      "./ReactChildren",
      "./ReactComponent",
      "./ReactClass",
      "./ReactDOMFactories",
      "./ReactElement",
      "./ReactPropTypes",
      "./ReactVersion",
      "./onlyChild",
      "fbjs/lib/warning",
      "./ReactElementValidator",
      "process"
    ],
    "npm:object-assign@4.1.0.js": [
      "npm:object-assign@4.1.0/index"
    ],
    "npm:fbjs@0.8.3/lib/warning.js": [
      "./emptyFunction",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactChildren.js": [
      "./PooledClass",
      "./ReactElement",
      "fbjs/lib/emptyFunction",
      "./traverseAllChildren"
    ],
    "npm:react@15.2.1/lib/ReactComponent.js": [
      "./reactProdInvariant",
      "./ReactNoopUpdateQueue",
      "./canDefineProperty",
      "fbjs/lib/emptyObject",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactClass.js": [
      "./reactProdInvariant",
      "object-assign",
      "./ReactComponent",
      "./ReactElement",
      "./ReactPropTypeLocations",
      "./ReactPropTypeLocationNames",
      "./ReactNoopUpdateQueue",
      "fbjs/lib/emptyObject",
      "fbjs/lib/invariant",
      "fbjs/lib/keyMirror",
      "fbjs/lib/keyOf",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMFactories.js": [
      "./ReactElement",
      "fbjs/lib/mapObject",
      "./ReactElementValidator",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactElement.js": [
      "object-assign",
      "./ReactCurrentOwner",
      "fbjs/lib/warning",
      "./canDefineProperty",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactPropTypes.js": [
      "./ReactElement",
      "./ReactPropTypeLocationNames",
      "fbjs/lib/emptyFunction",
      "./getIteratorFn"
    ],
    "npm:react@15.2.1/lib/onlyChild.js": [
      "./reactProdInvariant",
      "./ReactElement",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactElementValidator.js": [
      "./ReactCurrentOwner",
      "./ReactComponentTreeDevtool",
      "./ReactElement",
      "./ReactPropTypeLocations",
      "./checkReactTypeSpec",
      "./canDefineProperty",
      "./getIteratorFn",
      "fbjs/lib/warning",
      "process"
    ],
    "github:jspm/nodelibs-process@0.1.2.js": [
      "github:jspm/nodelibs-process@0.1.2/index"
    ],
    "npm:react@15.2.1/lib/canDefineProperty.js": [
      "process"
    ],
    "npm:fbjs@0.8.3/lib/emptyObject.js": [
      "process"
    ],
    "npm:fbjs@0.8.3/lib/invariant.js": [
      "process"
    ],
    "npm:react@15.2.1/lib/ReactPropTypeLocationNames.js": [
      "process"
    ],
    "npm:fbjs@0.8.3/lib/keyMirror.js": [
      "./invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/PooledClass.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/traverseAllChildren.js": [
      "./reactProdInvariant",
      "./ReactCurrentOwner",
      "./ReactElement",
      "./getIteratorFn",
      "fbjs/lib/invariant",
      "./KeyEscapeUtils",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactNoopUpdateQueue.js": [
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactPropTypeLocations.js": [
      "fbjs/lib/keyMirror"
    ],
    "npm:react@15.2.1/lib/ReactComponentTreeDevtool.js": [
      "./reactProdInvariant",
      "./ReactCurrentOwner",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/checkReactTypeSpec.js": [
      "./reactProdInvariant",
      "./ReactPropTypeLocationNames",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "./ReactComponentTreeDevtool",
      "process"
    ],
    "github:jspm/nodelibs-process@0.1.2/index.js": [
      "process"
    ],
    "npm:process@0.11.5.js": [
      "npm:process@0.11.5/browser.js"
    ],
    "stem/main.js": [
      "react",
      "react-tap-event-plugin",
      "redux",
      "react-redux",
      "react-dom",
      "./App",
      "./reducers"
    ],
    "npm:react-tap-event-plugin@1.0.0.js": [
      "npm:react-tap-event-plugin@1.0.0/src/injectTapEventPlugin.js"
    ],
    "npm:react-redux@4.4.5.js": [
      "npm:react-redux@4.4.5/lib/index.js"
    ],
    "npm:redux@3.5.2.js": [
      "npm:redux@3.5.2/lib/index.js"
    ],
    "npm:react-dom@15.2.1.js": [
      "npm:react-dom@15.2.1/index.js"
    ],
    "stem/App.js": [
      "material-ui/AppBar",
      "material-ui/styles/MuiThemeProvider",
      "react",
      "react-redux"
    ],
    "npm:react-redux@4.4.5/lib/index.js": [
      "./components/Provider",
      "./components/connect"
    ],
    "npm:redux@3.5.2/lib/index.js": [
      "./createStore",
      "./combineReducers",
      "./bindActionCreators",
      "./applyMiddleware",
      "./compose",
      "./utils/warning",
      "process"
    ],
    "npm:react-tap-event-plugin@1.0.0/src/injectTapEventPlugin.js": [
      "fbjs/lib/invariant",
      "./defaultClickRejectionStrategy",
      "react/lib/EventPluginHub",
      "./TapEventPlugin",
      "process"
    ],
    "npm:material-ui@0.15.2/AppBar.js": [
      "./AppBar/index"
    ],
    "npm:material-ui@0.15.2/styles/MuiThemeProvider.js": [
      "react",
      "./getMuiTheme"
    ],
    "npm:react-dom@15.2.1/index.js": [
      "react/lib/ReactDOM"
    ],
    "npm:react-redux@4.4.5/lib/components/connect.js": [
      "react",
      "../utils/storeShape",
      "../utils/shallowEqual",
      "../utils/wrapActionCreators",
      "../utils/warning",
      "lodash/isPlainObject",
      "hoist-non-react-statics",
      "invariant",
      "process"
    ],
    "npm:react-redux@4.4.5/lib/components/Provider.js": [
      "react",
      "../utils/storeShape",
      "../utils/warning",
      "process"
    ],
    "npm:redux@3.5.2/lib/applyMiddleware.js": [
      "./compose"
    ],
    "npm:redux@3.5.2/lib/createStore.js": [
      "lodash/isPlainObject",
      "symbol-observable"
    ],
    "npm:redux@3.5.2/lib/combineReducers.js": [
      "./createStore",
      "lodash/isPlainObject",
      "./utils/warning",
      "process"
    ],
    "npm:fbjs@0.2.1/lib/invariant.js": [
      "process"
    ],
    "npm:react@15.2.1/lib/EventPluginHub.js": [
      "./reactProdInvariant",
      "./EventPluginRegistry",
      "./EventPluginUtils",
      "./ReactErrorUtils",
      "./accumulateInto",
      "./forEachAccumulated",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react-tap-event-plugin@1.0.0/src/TapEventPlugin.js": [
      "react/lib/EventConstants",
      "react/lib/EventPluginUtils",
      "react/lib/EventPropagators",
      "react/lib/SyntheticUIEvent",
      "./TouchEventUtils",
      "react/lib/ViewportMetrics",
      "fbjs/lib/keyOf"
    ],
    "npm:material-ui@0.15.2/AppBar/index.js": [
      "./AppBar"
    ],
    "npm:material-ui@0.15.2/styles/getMuiTheme.js": [
      "lodash/merge",
      "../utils/colorManipulator",
      "./baseThemes/lightBaseTheme",
      "./zIndex",
      "../utils/autoprefixer",
      "../utils/callOnce",
      "../utils/rtl",
      "recompose/compose",
      "./typography",
      "./colors"
    ],
    "npm:react@15.2.1/lib/ReactDOM.js": [
      "./ReactDOMComponentTree",
      "./ReactDefaultInjection",
      "./ReactMount",
      "./ReactReconciler",
      "./ReactUpdates",
      "./ReactVersion",
      "./findDOMNode",
      "./getHostComponentFromComposite",
      "./renderSubtreeIntoContainer",
      "fbjs/lib/warning",
      "fbjs/lib/ExecutionEnvironment",
      "process"
    ],
    "npm:hoist-non-react-statics@1.2.0.js": [
      "npm:hoist-non-react-statics@1.2.0/index.js"
    ],
    "npm:lodash@4.13.1/isPlainObject.js": [
      "./_getPrototype",
      "./_isHostObject",
      "./isObjectLike"
    ],
    "npm:invariant@2.2.1.js": [
      "npm:invariant@2.2.1/browser.js"
    ],
    "npm:react-redux@4.4.5/lib/utils/wrapActionCreators.js": [
      "redux"
    ],
    "npm:react-redux@4.4.5/lib/utils/storeShape.js": [
      "react"
    ],
    "npm:symbol-observable@0.2.4.js": [
      "npm:symbol-observable@0.2.4/index"
    ],
    "npm:react@15.2.1/lib/SyntheticUIEvent.js": [
      "./SyntheticEvent",
      "./getEventTarget"
    ],
    "npm:react@15.2.1/lib/ReactErrorUtils.js": [
      "process"
    ],
    "npm:react@15.2.1/lib/EventPluginRegistry.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/EventPluginUtils.js": [
      "./reactProdInvariant",
      "./EventConstants",
      "./ReactErrorUtils",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/accumulateInto.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/EventConstants.js": [
      "fbjs/lib/keyMirror"
    ],
    "npm:react@15.2.1/lib/EventPropagators.js": [
      "./EventConstants",
      "./EventPluginHub",
      "./EventPluginUtils",
      "./accumulateInto",
      "./forEachAccumulated",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/merge.js": [
      "./_baseMerge",
      "./_createAssigner"
    ],
    "npm:material-ui@0.15.2/styles/baseThemes/lightBaseTheme.js": [
      "../colors",
      "../../utils/colorManipulator",
      "../spacing"
    ],
    "npm:material-ui@0.15.2/styles/typography.js": [
      "./colors"
    ],
    "npm:material-ui@0.15.2/AppBar/AppBar.js": [
      "simple-assign",
      "react",
      "../IconButton/index",
      "../svg-icons/navigation/menu",
      "../Paper/index",
      "../utils/propTypes",
      "warning",
      "process"
    ],
    "npm:material-ui@0.15.2/utils/autoprefixer.js": [
      "inline-style-prefixer",
      "warning",
      "process"
    ],
    "npm:material-ui@0.15.2/utils/callOnce.js": [
      "warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDefaultInjection.js": [
      "./BeforeInputEventPlugin",
      "./ChangeEventPlugin",
      "./DefaultEventPluginOrder",
      "./EnterLeaveEventPlugin",
      "./HTMLDOMPropertyConfig",
      "./ReactComponentBrowserEnvironment",
      "./ReactDOMComponent",
      "./ReactDOMComponentTree",
      "./ReactDOMEmptyComponent",
      "./ReactDOMTreeTraversal",
      "./ReactDOMTextComponent",
      "./ReactDefaultBatchingStrategy",
      "./ReactEventListener",
      "./ReactInjection",
      "./ReactReconcileTransaction",
      "./SVGDOMPropertyConfig",
      "./SelectEventPlugin",
      "./SimpleEventPlugin"
    ],
    "npm:react@15.2.1/lib/getHostComponentFromComposite.js": [
      "./ReactNodeTypes"
    ],
    "npm:react@15.2.1/lib/renderSubtreeIntoContainer.js": [
      "./ReactMount"
    ],
    "npm:react@15.2.1/lib/ReactDOMComponentTree.js": [
      "./reactProdInvariant",
      "./DOMProperty",
      "./ReactDOMComponentFlags",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactUpdates.js": [
      "./reactProdInvariant",
      "object-assign",
      "./CallbackQueue",
      "./PooledClass",
      "./ReactFeatureFlags",
      "./ReactReconciler",
      "./Transaction",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/findDOMNode.js": [
      "./reactProdInvariant",
      "./ReactCurrentOwner",
      "./ReactDOMComponentTree",
      "./ReactInstanceMap",
      "./getHostComponentFromComposite",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactReconciler.js": [
      "./reactProdInvariant",
      "./ReactRef",
      "./ReactInstrumentation",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactMount.js": [
      "./reactProdInvariant",
      "./DOMLazyTree",
      "./DOMProperty",
      "./ReactBrowserEventEmitter",
      "./ReactCurrentOwner",
      "./ReactDOMComponentTree",
      "./ReactDOMContainerInfo",
      "./ReactDOMFeatureFlags",
      "./ReactElement",
      "./ReactFeatureFlags",
      "./ReactInstanceMap",
      "./ReactInstrumentation",
      "./ReactMarkupChecksum",
      "./ReactReconciler",
      "./ReactUpdateQueue",
      "./ReactUpdates",
      "fbjs/lib/emptyObject",
      "./instantiateReactComponent",
      "fbjs/lib/invariant",
      "./setInnerHTML",
      "./shouldUpdateReactComponent",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:invariant@2.2.1/browser.js": [
      "process"
    ],
    "npm:symbol-observable@0.2.4/index.js": [
      "./ponyfill"
    ],
    "npm:react@15.2.1/lib/SyntheticEvent.js": [
      "object-assign",
      "./PooledClass",
      "fbjs/lib/emptyFunction",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/_baseMerge.js": [
      "./_Stack",
      "./_arrayEach",
      "./_assignMergeValue",
      "./_baseMergeDeep",
      "./isArray",
      "./isObject",
      "./isTypedArray",
      "./keysIn"
    ],
    "npm:lodash@4.13.1/_createAssigner.js": [
      "./_isIterateeCall",
      "./rest"
    ],
    "npm:simple-assign@0.1.0.js": [
      "npm:simple-assign@0.1.0/index.js"
    ],
    "npm:material-ui@0.15.2/IconButton/index.js": [
      "./IconButton"
    ],
    "npm:material-ui@0.15.2/Paper/index.js": [
      "./Paper"
    ],
    "npm:warning@3.0.0.js": [
      "npm:warning@3.0.0/browser.js"
    ],
    "npm:inline-style-prefixer@2.0.1.js": [
      "npm:inline-style-prefixer@2.0.1/lib/Prefixer.js"
    ],
    "npm:material-ui@0.15.2/utils/propTypes.js": [
      "react"
    ],
    "npm:material-ui@0.15.2/svg-icons/navigation/menu.js": [
      "react",
      "recompose/pure",
      "../../SvgIcon/index"
    ],
    "npm:react@15.2.1/lib/HTMLDOMPropertyConfig.js": [
      "./DOMProperty"
    ],
    "npm:react@15.2.1/lib/ReactInjection.js": [
      "./DOMProperty",
      "./EventPluginHub",
      "./EventPluginUtils",
      "./ReactComponentEnvironment",
      "./ReactClass",
      "./ReactEmptyComponent",
      "./ReactBrowserEventEmitter",
      "./ReactHostComponent",
      "./ReactUpdates"
    ],
    "npm:react@15.2.1/lib/DOMLazyTree.js": [
      "./DOMNamespaces",
      "./setInnerHTML",
      "./createMicrosoftUnsafeLocalFunction",
      "./setTextContent"
    ],
    "npm:react@15.2.1/lib/ReactMarkupChecksum.js": [
      "./adler32"
    ],
    "npm:react@15.2.1/lib/ReactDOMEmptyComponent.js": [
      "object-assign",
      "./DOMLazyTree",
      "./ReactDOMComponentTree"
    ],
    "npm:react@15.2.1/lib/ReactComponentBrowserEnvironment.js": [
      "./DOMChildrenOperations",
      "./ReactDOMIDOperations",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactReconcileTransaction.js": [
      "object-assign",
      "./CallbackQueue",
      "./PooledClass",
      "./ReactBrowserEventEmitter",
      "./ReactInputSelection",
      "./ReactInstrumentation",
      "./Transaction",
      "./ReactUpdateQueue",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactRef.js": [
      "./ReactOwner",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactInstrumentation.js": [
      "./ReactDebugTool",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactBrowserEventEmitter.js": [
      "object-assign",
      "./EventConstants",
      "./EventPluginRegistry",
      "./ReactEventEmitterMixin",
      "./ViewportMetrics",
      "./getVendorPrefixedEventName",
      "./isEventSupported",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMContainerInfo.js": [
      "./validateDOMNesting",
      "process"
    ],
    "npm:react@15.2.1/lib/BeforeInputEventPlugin.js": [
      "./EventConstants",
      "./EventPropagators",
      "fbjs/lib/ExecutionEnvironment",
      "./FallbackCompositionState",
      "./SyntheticCompositionEvent",
      "./SyntheticInputEvent",
      "fbjs/lib/keyOf"
    ],
    "npm:react@15.2.1/lib/DefaultEventPluginOrder.js": [
      "fbjs/lib/keyOf"
    ],
    "npm:react@15.2.1/lib/ChangeEventPlugin.js": [
      "./EventConstants",
      "./EventPluginHub",
      "./EventPropagators",
      "fbjs/lib/ExecutionEnvironment",
      "./ReactDOMComponentTree",
      "./ReactUpdates",
      "./SyntheticEvent",
      "./getEventTarget",
      "./isEventSupported",
      "./isTextInputElement",
      "fbjs/lib/keyOf",
      "process"
    ],
    "npm:react@15.2.1/lib/EnterLeaveEventPlugin.js": [
      "./EventConstants",
      "./EventPropagators",
      "./ReactDOMComponentTree",
      "./SyntheticMouseEvent",
      "fbjs/lib/keyOf"
    ],
    "npm:react@15.2.1/lib/ReactDOMComponent.js": [
      "./reactProdInvariant",
      "object-assign",
      "./AutoFocusUtils",
      "./CSSPropertyOperations",
      "./DOMLazyTree",
      "./DOMNamespaces",
      "./DOMProperty",
      "./DOMPropertyOperations",
      "./EventConstants",
      "./EventPluginHub",
      "./EventPluginRegistry",
      "./ReactBrowserEventEmitter",
      "./ReactComponentBrowserEnvironment",
      "./ReactDOMButton",
      "./ReactDOMComponentFlags",
      "./ReactDOMComponentTree",
      "./ReactDOMInput",
      "./ReactDOMOption",
      "./ReactDOMSelect",
      "./ReactDOMTextarea",
      "./ReactInstrumentation",
      "./ReactMultiChild",
      "./ReactServerRenderingTransaction",
      "fbjs/lib/emptyFunction",
      "./escapeTextContentForBrowser",
      "fbjs/lib/invariant",
      "./isEventSupported",
      "fbjs/lib/keyOf",
      "fbjs/lib/shallowEqual",
      "./validateDOMNesting",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMTreeTraversal.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDefaultBatchingStrategy.js": [
      "object-assign",
      "./ReactUpdates",
      "./Transaction",
      "fbjs/lib/emptyFunction"
    ],
    "npm:react@15.2.1/lib/ReactEventListener.js": [
      "object-assign",
      "fbjs/lib/EventListener",
      "fbjs/lib/ExecutionEnvironment",
      "./PooledClass",
      "./ReactDOMComponentTree",
      "./ReactUpdates",
      "./getEventTarget",
      "fbjs/lib/getUnboundedScrollPosition",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMTextComponent.js": [
      "./reactProdInvariant",
      "object-assign",
      "./DOMChildrenOperations",
      "./DOMLazyTree",
      "./ReactDOMComponentTree",
      "./ReactInstrumentation",
      "./escapeTextContentForBrowser",
      "fbjs/lib/invariant",
      "./validateDOMNesting",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactNodeTypes.js": [
      "./reactProdInvariant",
      "./ReactElement",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/DOMProperty.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/SimpleEventPlugin.js": [
      "./reactProdInvariant",
      "./EventConstants",
      "fbjs/lib/EventListener",
      "./EventPropagators",
      "./ReactDOMComponentTree",
      "./SyntheticAnimationEvent",
      "./SyntheticClipboardEvent",
      "./SyntheticEvent",
      "./SyntheticFocusEvent",
      "./SyntheticKeyboardEvent",
      "./SyntheticMouseEvent",
      "./SyntheticDragEvent",
      "./SyntheticTouchEvent",
      "./SyntheticTransitionEvent",
      "./SyntheticUIEvent",
      "./SyntheticWheelEvent",
      "fbjs/lib/emptyFunction",
      "./getEventCharCode",
      "fbjs/lib/invariant",
      "fbjs/lib/keyOf",
      "process"
    ],
    "npm:react@15.2.1/lib/SelectEventPlugin.js": [
      "./EventConstants",
      "./EventPropagators",
      "fbjs/lib/ExecutionEnvironment",
      "./ReactDOMComponentTree",
      "./ReactInputSelection",
      "./SyntheticEvent",
      "fbjs/lib/getActiveElement",
      "./isTextInputElement",
      "fbjs/lib/keyOf",
      "fbjs/lib/shallowEqual"
    ],
    "npm:react@15.2.1/lib/CallbackQueue.js": [
      "./reactProdInvariant",
      "object-assign",
      "./PooledClass",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/Transaction.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactUpdateQueue.js": [
      "./reactProdInvariant",
      "./ReactCurrentOwner",
      "./ReactInstanceMap",
      "./ReactInstrumentation",
      "./ReactUpdates",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/instantiateReactComponent.js": [
      "./reactProdInvariant",
      "object-assign",
      "./ReactCompositeComponent",
      "./ReactEmptyComponent",
      "./ReactHostComponent",
      "./ReactInstrumentation",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/setInnerHTML.js": [
      "fbjs/lib/ExecutionEnvironment",
      "./DOMNamespaces",
      "./createMicrosoftUnsafeLocalFunction",
      "process"
    ],
    "npm:lodash@4.13.1/_Stack.js": [
      "./_ListCache",
      "./_stackClear",
      "./_stackDelete",
      "./_stackGet",
      "./_stackHas",
      "./_stackSet"
    ],
    "npm:lodash@4.13.1/_baseMergeDeep.js": [
      "./_assignMergeValue",
      "./_baseClone",
      "./_copyArray",
      "./isArguments",
      "./isArray",
      "./isArrayLikeObject",
      "./isFunction",
      "./isObject",
      "./isPlainObject",
      "./isTypedArray",
      "./toPlainObject"
    ],
    "npm:lodash@4.13.1/_assignMergeValue.js": [
      "./eq"
    ],
    "npm:lodash@4.13.1/isTypedArray.js": [
      "./isLength",
      "./isObjectLike"
    ],
    "npm:lodash@4.13.1/keysIn.js": [
      "./_baseKeysIn",
      "./_indexKeys",
      "./_isIndex",
      "./_isPrototype"
    ],
    "npm:lodash@4.13.1/_isIterateeCall.js": [
      "./eq",
      "./isArrayLike",
      "./_isIndex",
      "./isObject"
    ],
    "npm:lodash@4.13.1/rest.js": [
      "./_apply",
      "./toInteger"
    ],
    "npm:recompose@0.20.2/pure.js": [
      "./shouldUpdate",
      "./shallowEqual",
      "./createHelper"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/Prefixer.js": [
      "./static/prefixAll",
      "./utils/getBrowserInformation",
      "./utils/getPrefixedKeyframes",
      "./utils/capitalizeString",
      "./prefixProps",
      "./plugins/calc",
      "./plugins/zoomCursor",
      "./plugins/grabCursor",
      "./plugins/flex",
      "./plugins/sizing",
      "./plugins/gradient",
      "./plugins/transition",
      "./plugins/flexboxIE",
      "./plugins/flexboxOld"
    ],
    "npm:material-ui@0.15.2/SvgIcon/index.js": [
      "./SvgIcon"
    ],
    "npm:warning@3.0.0/browser.js": [
      "process"
    ],
    "npm:material-ui@0.15.2/Paper/Paper.js": [
      "simple-assign",
      "react",
      "../utils/propTypes",
      "../styles/transitions"
    ],
    "npm:material-ui@0.15.2/IconButton/IconButton.js": [
      "simple-assign",
      "react",
      "../styles/transitions",
      "../utils/propTypes",
      "../internal/EnhancedButton",
      "../FontIcon/index",
      "../internal/Tooltip",
      "../utils/childUtils"
    ],
    "npm:react@15.2.1/lib/ReactEventEmitterMixin.js": [
      "./EventPluginHub"
    ],
    "npm:react@15.2.1/lib/SyntheticCompositionEvent.js": [
      "./SyntheticEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticInputEvent.js": [
      "./SyntheticEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticMouseEvent.js": [
      "./SyntheticUIEvent",
      "./ViewportMetrics",
      "./getEventModifierState"
    ],
    "npm:react@15.2.1/lib/ReactDOMButton.js": [
      "./DisabledInputUtils"
    ],
    "npm:react@15.2.1/lib/SyntheticClipboardEvent.js": [
      "./SyntheticEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticFocusEvent.js": [
      "./SyntheticUIEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticDragEvent.js": [
      "./SyntheticMouseEvent"
    ],
    "npm:react@15.2.1/lib/FallbackCompositionState.js": [
      "object-assign",
      "./PooledClass",
      "./getTextContentAccessor"
    ],
    "npm:react@15.2.1/lib/DOMChildrenOperations.js": [
      "./DOMLazyTree",
      "./Danger",
      "./ReactMultiChildUpdateTypes",
      "./ReactDOMComponentTree",
      "./ReactInstrumentation",
      "./createMicrosoftUnsafeLocalFunction",
      "./setInnerHTML",
      "./setTextContent",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMIDOperations.js": [
      "./DOMChildrenOperations",
      "./ReactDOMComponentTree",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactServerRenderingTransaction.js": [
      "object-assign",
      "./PooledClass",
      "./Transaction",
      "./ReactInstrumentation",
      "./ReactServerUpdateQueue",
      "process"
    ],
    "npm:fbjs@0.8.3/lib/EventListener.js": [
      "./emptyFunction",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactComponentEnvironment.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/setTextContent.js": [
      "fbjs/lib/ExecutionEnvironment",
      "./escapeTextContentForBrowser",
      "./setInnerHTML"
    ],
    "npm:react@15.2.1/lib/ReactHostComponent.js": [
      "./reactProdInvariant",
      "object-assign",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactInputSelection.js": [
      "./ReactDOMSelection",
      "fbjs/lib/containsNode",
      "fbjs/lib/focusNode",
      "fbjs/lib/getActiveElement"
    ],
    "npm:react@15.2.1/lib/ReactOwner.js": [
      "./reactProdInvariant",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDebugTool.js": [
      "./ReactInvalidSetStateWarningDevTool",
      "./ReactHostOperationHistoryDevtool",
      "./ReactComponentTreeDevtool",
      "fbjs/lib/ExecutionEnvironment",
      "fbjs/lib/performanceNow",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/getVendorPrefixedEventName.js": [
      "fbjs/lib/ExecutionEnvironment"
    ],
    "npm:react@15.2.1/lib/isEventSupported.js": [
      "fbjs/lib/ExecutionEnvironment"
    ],
    "npm:react@15.2.1/lib/validateDOMNesting.js": [
      "object-assign",
      "fbjs/lib/emptyFunction",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/AutoFocusUtils.js": [
      "./ReactDOMComponentTree",
      "fbjs/lib/focusNode"
    ],
    "npm:react@15.2.1/lib/CSSPropertyOperations.js": [
      "./CSSProperty",
      "fbjs/lib/ExecutionEnvironment",
      "./ReactInstrumentation",
      "fbjs/lib/camelizeStyleName",
      "./dangerousStyleValue",
      "fbjs/lib/hyphenateStyleName",
      "fbjs/lib/memoizeStringOnly",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/DOMPropertyOperations.js": [
      "./DOMProperty",
      "./ReactDOMComponentTree",
      "./ReactDOMInstrumentation",
      "./ReactInstrumentation",
      "./quoteAttributeValueForBrowser",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMInput.js": [
      "./reactProdInvariant",
      "object-assign",
      "./DisabledInputUtils",
      "./DOMPropertyOperations",
      "./LinkedValueUtils",
      "./ReactDOMComponentTree",
      "./ReactUpdates",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMOption.js": [
      "object-assign",
      "./ReactChildren",
      "./ReactDOMComponentTree",
      "./ReactDOMSelect",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMSelect.js": [
      "object-assign",
      "./DisabledInputUtils",
      "./LinkedValueUtils",
      "./ReactDOMComponentTree",
      "./ReactUpdates",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMTextarea.js": [
      "./reactProdInvariant",
      "object-assign",
      "./DisabledInputUtils",
      "./LinkedValueUtils",
      "./ReactDOMComponentTree",
      "./ReactUpdates",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactMultiChild.js": [
      "./reactProdInvariant",
      "./ReactComponentEnvironment",
      "./ReactInstanceMap",
      "./ReactInstrumentation",
      "./ReactMultiChildUpdateTypes",
      "./ReactCurrentOwner",
      "./ReactReconciler",
      "./ReactChildReconciler",
      "fbjs/lib/emptyFunction",
      "./flattenChildren",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/SyntheticKeyboardEvent.js": [
      "./SyntheticUIEvent",
      "./getEventCharCode",
      "./getEventKey",
      "./getEventModifierState"
    ],
    "npm:react@15.2.1/lib/SyntheticAnimationEvent.js": [
      "./SyntheticEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticTransitionEvent.js": [
      "./SyntheticEvent"
    ],
    "npm:react@15.2.1/lib/SyntheticTouchEvent.js": [
      "./SyntheticUIEvent",
      "./getEventModifierState"
    ],
    "npm:react@15.2.1/lib/SyntheticWheelEvent.js": [
      "./SyntheticMouseEvent"
    ],
    "npm:react@15.2.1/lib/ReactCompositeComponent.js": [
      "./reactProdInvariant",
      "object-assign",
      "./ReactComponentEnvironment",
      "./ReactCurrentOwner",
      "./ReactElement",
      "./ReactErrorUtils",
      "./ReactInstanceMap",
      "./ReactInstrumentation",
      "./ReactNodeTypes",
      "./ReactPropTypeLocations",
      "./ReactReconciler",
      "./checkReactTypeSpec",
      "fbjs/lib/emptyObject",
      "fbjs/lib/invariant",
      "./shouldUpdateReactComponent",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/_ListCache.js": [
      "./_listCacheClear",
      "./_listCacheDelete",
      "./_listCacheGet",
      "./_listCacheHas",
      "./_listCacheSet"
    ],
    "npm:lodash@4.13.1/_stackClear.js": [
      "./_ListCache"
    ],
    "npm:lodash@4.13.1/_stackSet.js": [
      "./_ListCache",
      "./_MapCache"
    ],
    "npm:lodash@4.13.1/_baseClone.js": [
      "./_Stack",
      "./_arrayEach",
      "./_assignValue",
      "./_baseAssign",
      "./_cloneBuffer",
      "./_copyArray",
      "./_copySymbols",
      "./_getAllKeys",
      "./_getTag",
      "./_initCloneArray",
      "./_initCloneByTag",
      "./_initCloneObject",
      "./isArray",
      "./isBuffer",
      "./_isHostObject",
      "./isObject",
      "./keys"
    ],
    "npm:lodash@4.13.1/isArrayLikeObject.js": [
      "./isArrayLike",
      "./isObjectLike"
    ],
    "npm:lodash@4.13.1/isArguments.js": [
      "./isArrayLikeObject"
    ],
    "npm:lodash@4.13.1/isFunction.js": [
      "./isObject"
    ],
    "npm:lodash@4.13.1/toPlainObject.js": [
      "./_copyObject",
      "./keysIn"
    ],
    "npm:lodash@4.13.1/_baseKeysIn.js": [
      "./_Reflect",
      "./_iteratorToArray"
    ],
    "npm:lodash@4.13.1/_indexKeys.js": [
      "./_baseTimes",
      "./isArguments",
      "./isArray",
      "./isLength",
      "./isString"
    ],
    "npm:lodash@4.13.1/isArrayLike.js": [
      "./_getLength",
      "./isFunction",
      "./isLength"
    ],
    "npm:lodash@4.13.1/toInteger.js": [
      "./toFinite"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/prefixAll.js": [
      "./prefixProps",
      "../utils/capitalizeString",
      "./plugins/calc",
      "./plugins/cursor",
      "./plugins/flex",
      "./plugins/sizing",
      "./plugins/gradient",
      "./plugins/transition",
      "./plugins/flexboxIE",
      "./plugins/flexboxOld"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/calc.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/zoomCursor.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/grabCursor.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/flex.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/sizing.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/gradient.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxIE.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/flexboxOld.js": [
      "../utils/getPrefixedValue"
    ],
    "npm:material-ui@0.15.2/FontIcon/index.js": [
      "./FontIcon"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/utils/getBrowserInformation.js": [
      "bowser"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/plugins/transition.js": [
      "hyphenate-style-name",
      "../utils/capitalizeString",
      "../utils/unprefixProperty"
    ],
    "npm:recompose@0.20.2/shouldUpdate.js": [
      "react",
      "./createHelper",
      "./createEagerFactory"
    ],
    "npm:recompose@0.20.2/createHelper.js": [
      "./wrapDisplayName",
      "process"
    ],
    "npm:material-ui@0.15.2/SvgIcon/SvgIcon.js": [
      "simple-assign",
      "react",
      "../styles/transitions"
    ],
    "npm:material-ui@0.15.2/internal/EnhancedButton.js": [
      "simple-assign",
      "react",
      "../utils/childUtils",
      "../utils/events",
      "keycode",
      "./FocusRipple",
      "./TouchRipple",
      "../utils/deprecatedPropType"
    ],
    "npm:material-ui@0.15.2/internal/Tooltip.js": [
      "simple-assign",
      "react",
      "../styles/transitions"
    ],
    "npm:material-ui@0.15.2/utils/childUtils.js": [
      "react",
      "react-addons-create-fragment"
    ],
    "npm:recompose@0.20.2/shallowEqual.js": [
      "fbjs/lib/shallowEqual"
    ],
    "npm:fbjs@0.8.3/lib/containsNode.js": [
      "./isTextNode"
    ],
    "npm:fbjs@0.8.3/lib/performanceNow.js": [
      "./performance"
    ],
    "npm:fbjs@0.8.3/lib/camelizeStyleName.js": [
      "./camelize"
    ],
    "npm:fbjs@0.8.3/lib/hyphenateStyleName.js": [
      "./hyphenate"
    ],
    "npm:react@15.2.1/lib/quoteAttributeValueForBrowser.js": [
      "./escapeTextContentForBrowser"
    ],
    "npm:react@15.2.1/lib/ReactDOMInstrumentation.js": [
      "./ReactDOMDebugTool",
      "process"
    ],
    "npm:react@15.2.1/lib/getTextContentAccessor.js": [
      "fbjs/lib/ExecutionEnvironment"
    ],
    "npm:react@15.2.1/lib/ReactMultiChildUpdateTypes.js": [
      "fbjs/lib/keyMirror"
    ],
    "npm:react@15.2.1/lib/Danger.js": [
      "./reactProdInvariant",
      "./DOMLazyTree",
      "fbjs/lib/ExecutionEnvironment",
      "fbjs/lib/createNodesFromMarkup",
      "fbjs/lib/emptyFunction",
      "fbjs/lib/invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactServerUpdateQueue.js": [
      "./ReactUpdateQueue",
      "./Transaction",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMSelection.js": [
      "fbjs/lib/ExecutionEnvironment",
      "./getNodeForCharacterOffset",
      "./getTextContentAccessor"
    ],
    "npm:react@15.2.1/lib/ReactInvalidSetStateWarningDevTool.js": [
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/dangerousStyleValue.js": [
      "./CSSProperty",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/LinkedValueUtils.js": [
      "./reactProdInvariant",
      "./ReactPropTypes",
      "./ReactPropTypeLocations",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/flattenChildren.js": [
      "./KeyEscapeUtils",
      "./traverseAllChildren",
      "fbjs/lib/warning",
      "./ReactComponentTreeDevtool",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactChildReconciler.js": [
      "./ReactReconciler",
      "./instantiateReactComponent",
      "./KeyEscapeUtils",
      "./shouldUpdateReactComponent",
      "./traverseAllChildren",
      "fbjs/lib/warning",
      "./ReactComponentTreeDevtool",
      "process"
    ],
    "npm:react@15.2.1/lib/getEventKey.js": [
      "./getEventCharCode"
    ],
    "npm:lodash@4.13.1/_listCacheDelete.js": [
      "./_assocIndexOf"
    ],
    "npm:lodash@4.13.1/_listCacheGet.js": [
      "./_assocIndexOf"
    ],
    "npm:lodash@4.13.1/_listCacheHas.js": [
      "./_assocIndexOf"
    ],
    "npm:lodash@4.13.1/_listCacheSet.js": [
      "./_assocIndexOf"
    ],
    "npm:lodash@4.13.1/_MapCache.js": [
      "./_mapCacheClear",
      "./_mapCacheDelete",
      "./_mapCacheGet",
      "./_mapCacheHas",
      "./_mapCacheSet"
    ],
    "npm:lodash@4.13.1/_assignValue.js": [
      "./eq"
    ],
    "npm:lodash@4.13.1/_baseAssign.js": [
      "./_copyObject",
      "./keys"
    ],
    "npm:lodash@4.13.1/_cloneBuffer.js": [
      "@empty"
    ],
    "npm:lodash@4.13.1/_copySymbols.js": [
      "./_copyObject",
      "./_getSymbols"
    ],
    "npm:lodash@4.13.1/_getAllKeys.js": [
      "./_baseGetAllKeys",
      "./_getSymbols",
      "./keys"
    ],
    "npm:lodash@4.13.1/_getTag.js": [
      "./_DataView",
      "./_Map",
      "./_Promise",
      "./_Set",
      "./_WeakMap",
      "./_toSource"
    ],
    "npm:lodash@4.13.1/_initCloneByTag.js": [
      "./_cloneArrayBuffer",
      "./_cloneDataView",
      "./_cloneMap",
      "./_cloneRegExp",
      "./_cloneSet",
      "./_cloneSymbol",
      "./_cloneTypedArray"
    ],
    "npm:lodash@4.13.1/_initCloneObject.js": [
      "./_baseCreate",
      "./_getPrototype",
      "./_isPrototype"
    ],
    "npm:lodash@4.13.1/isBuffer.js": [
      "./_root",
      "./stubFalse",
      "@empty"
    ],
    "npm:lodash@4.13.1/keys.js": [
      "./_baseHas",
      "./_baseKeys",
      "./_indexKeys",
      "./isArrayLike",
      "./_isIndex",
      "./_isPrototype"
    ],
    "npm:lodash@4.13.1/_copyObject.js": [
      "./_assignValue"
    ],
    "npm:lodash@4.13.1/_Reflect.js": [
      "./_root"
    ],
    "npm:lodash@4.13.1/isString.js": [
      "./isArray",
      "./isObjectLike"
    ],
    "npm:lodash@4.13.1/_getLength.js": [
      "./_baseProperty"
    ],
    "npm:lodash@4.13.1/toFinite.js": [
      "./toNumber"
    ],
    "npm:bowser@1.4.1.js": [
      "npm:bowser@1.4.1/src/bowser.js"
    ],
    "npm:hyphenate-style-name@1.0.1.js": [
      "npm:hyphenate-style-name@1.0.1/index.js"
    ],
    "npm:keycode@2.1.2.js": [
      "npm:keycode@2.1.2/index.js"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/plugins/calc.js": [
      "../../utils/joinPrefixedValue",
      "../../utils/isPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/plugins/cursor.js": [
      "../../utils/joinPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/plugins/sizing.js": [
      "../../utils/joinPrefixedValue"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/plugins/gradient.js": [
      "../../utils/joinPrefixedValue",
      "../../utils/isPrefixedValue"
    ],
    "npm:recompose@0.20.2/createEagerFactory.js": [
      "./utils/createEagerElementUtil",
      "./isReferentiallyTransparentFunctionComponent"
    ],
    "npm:recompose@0.20.2/wrapDisplayName.js": [
      "./getDisplayName"
    ],
    "npm:react-addons-create-fragment@15.2.1.js": [
      "npm:react-addons-create-fragment@15.2.1/index.js"
    ],
    "npm:inline-style-prefixer@2.0.1/lib/static/plugins/transition.js": [
      "hyphenate-style-name",
      "../../utils/capitalizeString",
      "../../utils/isPrefixedValue",
      "../prefixProps"
    ],
    "npm:material-ui@0.15.2/FontIcon/FontIcon.js": [
      "simple-assign",
      "react",
      "../styles/transitions"
    ],
    "npm:material-ui@0.15.2/internal/TouchRipple.js": [
      "simple-assign",
      "react",
      "react-dom",
      "react-addons-transition-group",
      "../utils/dom",
      "./CircleRipple"
    ],
    "npm:material-ui@0.15.2/utils/deprecatedPropType.js": [
      "warning",
      "process"
    ],
    "npm:material-ui@0.15.2/internal/FocusRipple.js": [
      "simple-assign",
      "react",
      "react-dom",
      "recompose/shallowEqual",
      "../utils/autoPrefix",
      "../styles/transitions",
      "./ScaleIn"
    ],
    "npm:fbjs@0.8.3/lib/isTextNode.js": [
      "./isNode"
    ],
    "npm:fbjs@0.8.3/lib/performance.js": [
      "./ExecutionEnvironment"
    ],
    "npm:fbjs@0.8.3/lib/createNodesFromMarkup.js": [
      "./ExecutionEnvironment",
      "./createArrayFromMixed",
      "./getMarkupWrap",
      "./invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMDebugTool.js": [
      "./ReactDOMNullInputValuePropDevtool",
      "./ReactDOMUnknownPropertyDevtool",
      "./ReactDebugTool",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/_assocIndexOf.js": [
      "./eq"
    ],
    "npm:lodash@4.13.1/_mapCacheClear.js": [
      "./_Hash",
      "./_ListCache",
      "./_Map"
    ],
    "npm:lodash@4.13.1/_mapCacheDelete.js": [
      "./_getMapData"
    ],
    "npm:lodash@4.13.1/_mapCacheGet.js": [
      "./_getMapData"
    ],
    "npm:lodash@4.13.1/_mapCacheHas.js": [
      "./_getMapData"
    ],
    "npm:lodash@4.13.1/_mapCacheSet.js": [
      "./_getMapData"
    ],
    "npm:lodash@4.13.1/_getSymbols.js": [
      "./stubArray"
    ],
    "npm:lodash@4.13.1/_baseGetAllKeys.js": [
      "./_arrayPush",
      "./isArray"
    ],
    "npm:lodash@4.13.1/_DataView.js": [
      "./_getNative",
      "./_root"
    ],
    "npm:lodash@4.13.1/_Map.js": [
      "./_getNative",
      "./_root"
    ],
    "npm:lodash@4.13.1/_Promise.js": [
      "./_getNative",
      "./_root"
    ],
    "npm:lodash@4.13.1/_Set.js": [
      "./_getNative",
      "./_root"
    ],
    "npm:lodash@4.13.1/_WeakMap.js": [
      "./_getNative",
      "./_root"
    ],
    "npm:lodash@4.13.1/_toSource.js": [
      "@empty"
    ],
    "npm:lodash@4.13.1/_cloneArrayBuffer.js": [
      "./_Uint8Array"
    ],
    "npm:lodash@4.13.1/_cloneDataView.js": [
      "./_cloneArrayBuffer"
    ],
    "npm:lodash@4.13.1/_cloneMap.js": [
      "./_addMapEntry",
      "./_arrayReduce",
      "./_mapToArray"
    ],
    "npm:lodash@4.13.1/_cloneSet.js": [
      "./_addSetEntry",
      "./_arrayReduce",
      "./_setToArray"
    ],
    "npm:lodash@4.13.1/_cloneSymbol.js": [
      "./_Symbol"
    ],
    "npm:lodash@4.13.1/_cloneTypedArray.js": [
      "./_cloneArrayBuffer"
    ],
    "npm:lodash@4.13.1/_baseCreate.js": [
      "./isObject"
    ],
    "npm:lodash@4.13.1/_root.js": [
      "./_checkGlobal"
    ],
    "npm:lodash@4.13.1/_baseHas.js": [
      "./_getPrototype"
    ],
    "npm:lodash@4.13.1/toNumber.js": [
      "./isFunction",
      "./isObject",
      "./isSymbol",
      "@empty"
    ],
    "npm:recompose@0.20.2/isReferentiallyTransparentFunctionComponent.js": [
      "./isClassComponent"
    ],
    "npm:react-addons-transition-group@15.2.1.js": [
      "npm:react-addons-transition-group@15.2.1/index.js"
    ],
    "npm:recompose@0.20.2/utils/createEagerElementUtil.js": [
      "react"
    ],
    "npm:material-ui@0.15.2/internal/ScaleIn.js": [
      "simple-assign",
      "react",
      "react-addons-transition-group",
      "./ScaleInChild"
    ],
    "npm:react-addons-create-fragment@15.2.1/index.js": [
      "react/lib/ReactFragment"
    ],
    "npm:material-ui@0.15.2/internal/CircleRipple.js": [
      "simple-assign",
      "react",
      "react-dom",
      "recompose/shallowEqual",
      "../utils/autoPrefix",
      "../styles/transitions"
    ],
    "npm:fbjs@0.8.3/lib/createArrayFromMixed.js": [
      "./invariant",
      "process"
    ],
    "npm:fbjs@0.8.3/lib/getMarkupWrap.js": [
      "./ExecutionEnvironment",
      "./invariant",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMNullInputValuePropDevtool.js": [
      "./ReactComponentTreeDevtool",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:react@15.2.1/lib/ReactDOMUnknownPropertyDevtool.js": [
      "./DOMProperty",
      "./EventPluginRegistry",
      "./ReactComponentTreeDevtool",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/_Hash.js": [
      "./_hashClear",
      "./_hashDelete",
      "./_hashGet",
      "./_hashHas",
      "./_hashSet"
    ],
    "npm:lodash@4.13.1/_getMapData.js": [
      "./_isKeyable"
    ],
    "npm:lodash@4.13.1/_getNative.js": [
      "./_baseIsNative",
      "./_getValue"
    ],
    "npm:lodash@4.13.1/_Uint8Array.js": [
      "./_root"
    ],
    "npm:lodash@4.13.1/_Symbol.js": [
      "./_root"
    ],
    "npm:lodash@4.13.1/isSymbol.js": [
      "./isObjectLike"
    ],
    "npm:react-addons-transition-group@15.2.1/index.js": [
      "react/lib/ReactTransitionGroup"
    ],
    "npm:material-ui@0.15.2/internal/ScaleInChild.js": [
      "simple-assign",
      "react",
      "react-dom",
      "../utils/autoPrefix",
      "../styles/transitions"
    ],
    "npm:react@15.2.1/lib/ReactFragment.js": [
      "./reactProdInvariant",
      "./ReactChildren",
      "./ReactElement",
      "fbjs/lib/emptyFunction",
      "fbjs/lib/invariant",
      "fbjs/lib/warning",
      "process"
    ],
    "npm:lodash@4.13.1/_hashGet.js": [
      "./_nativeCreate"
    ],
    "npm:lodash@4.13.1/_hashClear.js": [
      "./_nativeCreate"
    ],
    "npm:lodash@4.13.1/_hashHas.js": [
      "./_nativeCreate"
    ],
    "npm:lodash@4.13.1/_hashSet.js": [
      "./_nativeCreate"
    ],
    "npm:lodash@4.13.1/_baseIsNative.js": [
      "./isFunction",
      "./_isHostObject",
      "./_isMasked",
      "./isObject",
      "./_toSource"
    ],
    "npm:react@15.2.1/lib/ReactTransitionGroup.js": [
      "object-assign",
      "./React",
      "./ReactInstanceMap",
      "./ReactTransitionChildMapping",
      "fbjs/lib/emptyFunction",
      "process"
    ],
    "npm:lodash@4.13.1/_nativeCreate.js": [
      "./_getNative"
    ],
    "npm:lodash@4.13.1/_isMasked.js": [
      "./_coreJsData"
    ],
    "npm:react@15.2.1/lib/ReactTransitionChildMapping.js": [
      "./flattenChildren",
      "process"
    ],
    "npm:lodash@4.13.1/_coreJsData.js": [
      "./_root"
    ]
  },

  map: {
    "babel": "npm:babel-core@5.8.38",
    "babel-runtime": "npm:babel-runtime@5.8.38",
    "core-js": "npm:core-js@1.2.7",
    "material-ui": "npm:material-ui@0.15.2",
    "react": "npm:react@15.2.1",
    "react-dom": "npm:react-dom@15.2.1",
    "react-redux": "npm:react-redux@4.4.5",
    "react-tap-event-plugin": "npm:react-tap-event-plugin@1.0.0",
    "redux": "npm:redux@3.5.2",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.4.1"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.6.0"
    },
    "github:jspm/nodelibs-domain@0.1.0": {
      "domain-browser": "npm:domain-browser@1.1.7"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.5"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-string_decoder@0.1.0": {
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "github:jspm/nodelibs-zlib@0.1.0": {
      "browserify-zlib": "npm:browserify-zlib@0.1.4"
    },
    "npm:asap@2.0.4": {
      "domain": "github:jspm/nodelibs-domain@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.4.1": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.38": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:browserify-zlib@0.1.4": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "pako": "npm:pako@0.2.8",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "readable-stream": "npm:readable-stream@2.1.4",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:buffer-shims@1.0.0": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:buffer@3.6.0": {
      "base64-js": "npm:base64-js@0.0.8",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "ieee754": "npm:ieee754@1.1.6",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:core-js@1.2.7": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:core-util-is@1.0.2": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:domain-browser@1.1.7": {
      "events": "github:jspm/nodelibs-events@0.1.1"
    },
    "npm:encoding@0.1.12": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "iconv-lite": "npm:iconv-lite@0.4.13"
    },
    "npm:fbjs@0.2.1": {
      "core-js": "npm:core-js@1.2.7",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "whatwg-fetch": "npm:whatwg-fetch@0.9.0"
    },
    "npm:fbjs@0.8.3": {
      "core-js": "npm:core-js@1.2.7",
      "immutable": "npm:immutable@3.8.1",
      "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "promise": "npm:promise@7.1.1",
      "ua-parser-js": "npm:ua-parser-js@0.7.10"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:iconv-lite@0.4.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "string_decoder": "github:jspm/nodelibs-string_decoder@0.1.0",
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:inline-style-prefixer@2.0.1": {
      "bowser": "npm:bowser@1.4.1",
      "hyphenate-style-name": "npm:hyphenate-style-name@1.0.1"
    },
    "npm:invariant@2.2.1": {
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:isomorphic-fetch@2.2.1": {
      "node-fetch": "npm:node-fetch@1.5.3",
      "whatwg-fetch": "npm:whatwg-fetch@1.0.0"
    },
    "npm:loose-envify@1.2.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "js-tokens": "npm:js-tokens@1.0.3",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:material-ui@0.15.2": {
      "inline-style-prefixer": "npm:inline-style-prefixer@2.0.1",
      "keycode": "npm:keycode@2.1.2",
      "lodash": "npm:lodash@4.13.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.2.1",
      "react-addons-create-fragment": "npm:react-addons-create-fragment@15.2.1",
      "react-addons-transition-group": "npm:react-addons-transition-group@15.2.1",
      "react-dom": "npm:react-dom@15.2.1",
      "react-event-listener": "npm:react-event-listener@0.2.1",
      "react-tap-event-plugin": "npm:react-tap-event-plugin@1.0.0",
      "recompose": "npm:recompose@0.20.2",
      "simple-assign": "npm:simple-assign@0.1.0",
      "warning": "npm:warning@3.0.0"
    },
    "npm:node-fetch@1.5.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "encoding": "npm:encoding@0.1.12",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "is-stream": "npm:is-stream@1.1.0",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0",
      "zlib": "github:jspm/nodelibs-zlib@0.1.0"
    },
    "npm:pako@0.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process-nextick-args@1.0.7": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.5": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:promise@7.1.1": {
      "asap": "npm:asap@2.0.4",
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:react-addons-create-fragment@15.2.1": {
      "react": "npm:react@15.2.1"
    },
    "npm:react-addons-transition-group@15.2.1": {
      "react": "npm:react@15.2.1"
    },
    "npm:react-dom@15.2.1": {
      "react": "npm:react@15.2.1"
    },
    "npm:react-event-listener@0.2.1": {
      "fbjs": "npm:fbjs@0.8.3"
    },
    "npm:react-redux@4.4.5": {
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "invariant": "npm:invariant@2.2.1",
      "lodash": "npm:lodash@4.13.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.2.1",
      "redux": "npm:redux@3.5.2"
    },
    "npm:react-tap-event-plugin@1.0.0": {
      "fbjs": "npm:fbjs@0.2.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.2.1"
    },
    "npm:react@15.2.1": {
      "fbjs": "npm:fbjs@0.8.3",
      "loose-envify": "npm:loose-envify@1.2.0",
      "object-assign": "npm:object-assign@4.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:readable-stream@1.1.14": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31"
    },
    "npm:readable-stream@2.1.4": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "buffer-shims": "npm:buffer-shims@1.0.0",
      "core-util-is": "npm:core-util-is@1.0.2",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@1.0.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "process-nextick-args": "npm:process-nextick-args@1.0.7",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util-deprecate": "npm:util-deprecate@1.0.2"
    },
    "npm:recompose@0.20.2": {
      "change-emitter": "npm:change-emitter@0.1.2",
      "fbjs": "npm:fbjs@0.8.3",
      "hoist-non-react-statics": "npm:hoist-non-react-statics@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "react": "npm:react@15.2.1",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:redux@3.5.2": {
      "lodash": "npm:lodash@4.13.1",
      "lodash-es": "npm:lodash-es@4.13.1",
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "symbol-observable": "npm:symbol-observable@0.2.4"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.14"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:ua-parser-js@0.7.10": {
      "systemjs-json": "github:systemjs/plugin-json@0.1.2"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util-deprecate@1.0.2": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    },
    "npm:warning@3.0.0": {
      "loose-envify": "npm:loose-envify@1.2.0",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
