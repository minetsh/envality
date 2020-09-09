/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.toEnvString = void 0;\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\nexports.toEnvString = function (env) {\n    return env.toString().replace(/^(\\/?)(.*)(\\1)[igm]*$/, '$2');\n};\nvar Envality = (function () {\n    function Envality(options, baseEnv) {\n        var _this = this;\n        this._config = {\n            base: {},\n            options: {},\n        };\n        this._config.baseEnv = baseEnv;\n        if (options) {\n            Object.keys(options).forEach(function (env) {\n                _this.set(env, options[env]);\n            });\n        }\n        if (typeof window !== 'undefined') {\n            this.env = window.location.host;\n        }\n    }\n    Envality.prototype.set = function (env, option) {\n        var o = __assign({}, option);\n        if (new RegExp(env).test(this._config.baseEnv)) {\n            utils_1.setPrototypeOf(this.base, o);\n        }\n        else {\n            utils_1.setPrototypeOf(o, this.base);\n        }\n        this._config.option = null;\n        this._config.options[env] = o;\n    };\n    Envality.prototype.put = function (env, option) {\n        if (option) {\n            var o = this.get(env);\n            if (o) {\n                utils_1.assign(o, option);\n            }\n            else {\n                this.set(env, option);\n            }\n        }\n    };\n    Envality.prototype.get = function (env) {\n        var targetEnv = env || this.env;\n        var options = this._config.options;\n        var matchEnv;\n        for (var i = 0; i < this.envs.length; i++) {\n            if (new RegExp(this.envs[i]).test(targetEnv)) {\n                matchEnv = this.envs[i];\n                break;\n            }\n        }\n        return (matchEnv && options[matchEnv]) || this.base;\n    };\n    Object.defineProperty(Envality.prototype, \"envs\", {\n        get: function () {\n            return Object.keys(this._config.options);\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Envality.prototype, \"base\", {\n        get: function () {\n            return this._config.base;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Envality.prototype, \"env\", {\n        get: function () {\n            return this._config.env;\n        },\n        set: function (env) {\n            this._config.env = env;\n            this._config.option = null;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    Object.defineProperty(Envality.prototype, \"option\", {\n        get: function () {\n            if (this._config.option) {\n                return this._config.option;\n            }\n            return (this._config.option = this.get());\n        },\n        enumerable: false,\n        configurable: true\n    });\n    return Envality;\n}());\nexports.default = Envality;\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.assign = exports.setPrototypeOf = void 0;\nexports.setPrototypeOf = function (obj, proto) {\n    if (obj.__proto__) {\n        obj.__proto__ = proto;\n        return obj;\n    }\n    else {\n        var func = function () {\n            for (var key in obj) {\n                Object.defineProperty(this, key, {\n                    value: obj[key],\n                });\n            }\n        };\n        func.prototype = proto;\n        return new func();\n    }\n};\nfunction assign(target) {\n    var sources = [];\n    for (var _i = 1; _i < arguments.length; _i++) {\n        sources[_i - 1] = arguments[_i];\n    }\n    if (target === null || target === undefined) {\n        throw new TypeError('Cannot convert undefined or null to object');\n    }\n    var to = Object(target);\n    for (var index = 1; index < arguments.length; index++) {\n        var nextSource = arguments[index];\n        if (nextSource !== null && nextSource !== undefined) {\n            for (var nextKey in nextSource) {\n                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {\n                    to[nextKey] = nextSource[nextKey];\n                }\n            }\n        }\n    }\n    return to;\n}\nexports.assign = assign;\n\n\n//# sourceURL=webpack:///./src/utils.ts?");

/***/ })

/******/ });