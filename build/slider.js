(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueSlider"] = factory();
	else
		root["VueSlider"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sliderItem = exports.slider = undefined;

	var _slider = __webpack_require__(2);

	var _slider2 = _interopRequireDefault(_slider);

	var _sliderItem = __webpack_require__(6);

	var _sliderItem2 = _interopRequireDefault(_sliderItem);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by Administrator on 2016/8/28.
	 */

	exports.slider = _slider2.default;
	exports.sliderItem = _sliderItem2.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(3)
	__vue_script__ = __webpack_require__(4)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\slider.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(5)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./slider.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            showPoints: false,
	            pages: 0,
	            touchObj: {},
	            contStyle: '',
	            currentIndex: 0,
	            currentX: 0,
	            wrapWidth: 0,
	            childLength: 0,
	            scrolling: false,
	            timer: null
	        };
	    },


	    props: {
	        auto: {
	            type: Boolean,
	            default: true
	        },
	        showIndicators: {
	            type: Boolean,
	            default: true
	        },
	        autoInterval: {
	            type: Number,
	            default: 3000
	        }
	    },
	    methods: {
	        start: function start(e) {
	            if (this.childLength <= 1 || this.scrolling) {
	                return;
	            }
	            e.preventDefault();
	            var touch = e.touches[0];
	            this.touchObj.startX = touch.pageX;
	            this.touchObj.startY = touch.pageY;
	            this.touchObj.touchState = true;
	            this.touchObj.startDate = Date.now();
	        },
	        move: function move(e) {
	            if (!this.touchObj.touchState) {
	                return;
	            }
	            this.auto && this.stopPlay();
	            var touch = e.touches[0];
	            this.touchObj.moveX = touch.pageX - this.touchObj.startX;
	            if (Math.abs(this.touchObj.moveX) >= 5) {
	                if (this.childLength === 2) {
	                    if (this.touchObj.moveX > 0) {
	                        this.childStyle('next');
	                    } else if (this.touchObj.moveX < 0) {
	                        this.childStyle('prev');
	                    }
	                }
	                e.preventDefault();
	                this.contStyle = '-webkit-transform: translate3d(' + this.touchObj.moveX + 'px, 0, 0)';
	            }
	        },
	        end: function end(e) {
	            if (!this.touchObj.touchState) {
	                return;
	            }
	            e.preventDefault();
	            this.touchObj.touchState = false;
	            var endDate = Date.now(),
	                duration = endDate - this.touchObj.startDate,
	                direction = 0;
	            if (duration < 300 && Math.abs(this.touchObj.moveX) >= 5 || Math.abs(this.touchObj.moveX) >= this.wrapWidth / 2) {
	                direction = this.touchObj.moveX > 0 ? 1 : -1;
	                if (this.currentIndex - direction < 0) {
	                    this.currentIndex = this.childLength - 1;
	                } else if (this.currentIndex - direction >= this.childLength) {
	                    this.currentIndex = 0;
	                } else {
	                    this.currentIndex -= direction;
	                }
	            }
	            this.scrolling = true;
	            this.currentX = direction * this.wrapWidth;
	            this.contStyle = '-webkit-transform: translate3d(' + this.currentX + 'px, 0, 0);-webkit-transition: transform 300ms ease';
	        },
	        transitionEnd: function transitionEnd() {
	            this.childStyle();
	            this.contStyle = '';
	            this.scrolling = false;
	            !this.timer && this.auto && this.autoPlay();
	        },
	        childStyle: function childStyle(status) {
	            var child = this.$children;
	            for (var i = 0; i < this.childLength; i++) {
	                child[i].$el.style.zIndex = '';
	                child[i].$el.style.webkitTransform = '';
	            }
	            var prev = this.currentIndex === 0 ? this.childLength - 1 : this.currentIndex - 1,
	                next = this.currentIndex === this.childLength - 1 ? 0 : this.currentIndex + 1;
	            child[this.currentIndex].$el.style.zIndex = '2';
	            if (status == 'next') {
	                child[next].$el.style.webkitTransform = 'translate3d(100%, 0, 0)';
	            } else if (status == 'prev') {
	                child[prev].$el.style.webkitTransform = 'translate3d(-100%, 0, 0)';
	            } else {
	                child[prev].$el.style.webkitTransform = 'translate3d(-100%, 0, 0)';
	                child[next].$el.style.webkitTransform = 'translate3d(100%, 0, 0)';
	            }
	        },
	        autoPlay: function autoPlay() {
	            this.timer = setInterval(function () {
	                this.currentIndex = this.currentIndex + 1 >= this.childLength ? 0 : this.currentIndex + 1;
	                this.contStyle = '-webkit-transform: translate3d(' + -1 * this.wrapWidth + 'px, 0, 0);-webkit-transition: transform 300ms ease';
	            }.bind(this), this.autoInterval);
	        },
	        stopPlay: function stopPlay() {
	            clearInterval(this.timer);
	            this.timer = null;
	        }
	    },
	    ready: function ready() {
	        var wrapDom = this.$els.wrap,
	            child = this.$children;
	        this.wrapWidth = wrapDom.clientWidth;
	        this.childLength = child.length;
	        this.childStyle();
	        this.pages = this.childLength;

	        this.auto && this.autoPlay();
	    }
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "\n<div v-el:wrap @touchstart=\"start\" @touchmove=\"move\" @touchend=\"end\" @transitionend=\"transitionEnd\" class=\"slider-wrap\">\n    <div class=\"slider-content\" :style=\"contStyle\">\n        <slot></slot>\n    </div>\n    <div class=\"slider-points\" v-show=\"showIndicators\">\n        <span class=\"point\" v-for=\"page in pages\" :class=\"{on: $index == currentIndex}\"></span>\n    </div>\n</div>\n";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(7)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] src\\components\\slider-item.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(8)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "./slider-item.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    methods: {},
	    components: {},
	    ready: function ready() {}
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"slider-item\">\n    <slot></slot>\n</div>\n";

/***/ }
/******/ ])
});
;