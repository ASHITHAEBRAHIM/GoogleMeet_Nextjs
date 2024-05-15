"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/camelcase-keys";
exports.ids = ["vendor-chunks/camelcase-keys"];
exports.modules = {

/***/ "(rsc)/./node_modules/camelcase-keys/index.js":
/*!**********************************************!*\
  !*** ./node_modules/camelcase-keys/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ camelcaseKeys)\n/* harmony export */ });\n/* harmony import */ var map_obj__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! map-obj */ \"(rsc)/./node_modules/map-obj/index.js\");\n/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ \"(rsc)/./node_modules/camelcase/index.js\");\n/* harmony import */ var quick_lru__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! quick-lru */ \"(rsc)/./node_modules/quick-lru/index.js\");\n\n\n\n\nconst has = (array, key) => array.some(element => {\n\tif (typeof element === 'string') {\n\t\treturn element === key;\n\t}\n\n\telement.lastIndex = 0;\n\n\treturn element.test(key);\n});\n\nconst cache = new quick_lru__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({maxSize: 100_000});\n\n// Reproduces behavior from `map-obj`.\nconst isObject = value =>\n\ttypeof value === 'object'\n\t\t&& value !== null\n\t\t&& !(value instanceof RegExp)\n\t\t&& !(value instanceof Error)\n\t\t&& !(value instanceof Date);\n\nconst transform = (input, options = {}) => {\n\tif (!isObject(input)) {\n\t\treturn input;\n\t}\n\n\tconst {\n\t\texclude,\n\t\tpascalCase = false,\n\t\tstopPaths,\n\t\tdeep = false,\n\t\tpreserveConsecutiveUppercase = false,\n\t} = options;\n\n\tconst stopPathsSet = new Set(stopPaths);\n\n\tconst makeMapper = parentPath => (key, value) => {\n\t\tif (deep && isObject(value)) {\n\t\t\tconst path = parentPath === undefined ? key : `${parentPath}.${key}`;\n\n\t\t\tif (!stopPathsSet.has(path)) {\n\t\t\t\tvalue = (0,map_obj__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(value, makeMapper(path));\n\t\t\t}\n\t\t}\n\n\t\tif (!(exclude && has(exclude, key))) {\n\t\t\tconst cacheKey = pascalCase ? `${key}_` : key;\n\n\t\t\tif (cache.has(cacheKey)) {\n\t\t\t\tkey = cache.get(cacheKey);\n\t\t\t} else {\n\t\t\t\tconst returnValue = (0,camelcase__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(key, {pascalCase, locale: false, preserveConsecutiveUppercase});\n\n\t\t\t\tif (key.length < 100) { // Prevent abuse\n\t\t\t\t\tcache.set(cacheKey, returnValue);\n\t\t\t\t}\n\n\t\t\t\tkey = returnValue;\n\t\t\t}\n\t\t}\n\n\t\treturn [key, value];\n\t};\n\n\treturn (0,map_obj__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(input, makeMapper(undefined));\n};\n\nfunction camelcaseKeys(input, options) {\n\tif (Array.isArray(input)) {\n\t\treturn Object.keys(input).map(key => transform(input[key], options));\n\t}\n\n\treturn transform(input, options);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvY2FtZWxjYXNlLWtleXMvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFnQztBQUNFO0FBQ0Q7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxrQkFBa0IsaURBQVEsRUFBRSxpQkFBaUI7O0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0Esb0RBQW9ELFdBQVcsR0FBRyxJQUFJOztBQUV0RTtBQUNBLFlBQVksbURBQVM7QUFDckI7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxJQUFJOztBQUV4QztBQUNBO0FBQ0EsS0FBSztBQUNMLHdCQUF3QixxREFBUyxPQUFPLHdEQUF3RDs7QUFFaEcsNEJBQTRCO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsUUFBUSxtREFBUztBQUNqQjs7QUFFZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NhbWVsY2FzZS1rZXlzL2luZGV4LmpzP2Q1MGQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1hcE9iamVjdCBmcm9tICdtYXAtb2JqJztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnY2FtZWxjYXNlJztcbmltcG9ydCBRdWlja0xydSBmcm9tICdxdWljay1scnUnO1xuXG5jb25zdCBoYXMgPSAoYXJyYXksIGtleSkgPT4gYXJyYXkuc29tZShlbGVtZW50ID0+IHtcblx0aWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBlbGVtZW50ID09PSBrZXk7XG5cdH1cblxuXHRlbGVtZW50Lmxhc3RJbmRleCA9IDA7XG5cblx0cmV0dXJuIGVsZW1lbnQudGVzdChrZXkpO1xufSk7XG5cbmNvbnN0IGNhY2hlID0gbmV3IFF1aWNrTHJ1KHttYXhTaXplOiAxMDBfMDAwfSk7XG5cbi8vIFJlcHJvZHVjZXMgYmVoYXZpb3IgZnJvbSBgbWFwLW9iamAuXG5jb25zdCBpc09iamVjdCA9IHZhbHVlID0+XG5cdHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcblx0XHQmJiB2YWx1ZSAhPT0gbnVsbFxuXHRcdCYmICEodmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApXG5cdFx0JiYgISh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKVxuXHRcdCYmICEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKTtcblxuY29uc3QgdHJhbnNmb3JtID0gKGlucHV0LCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKCFpc09iamVjdChpbnB1dCkpIHtcblx0XHRyZXR1cm4gaW5wdXQ7XG5cdH1cblxuXHRjb25zdCB7XG5cdFx0ZXhjbHVkZSxcblx0XHRwYXNjYWxDYXNlID0gZmFsc2UsXG5cdFx0c3RvcFBhdGhzLFxuXHRcdGRlZXAgPSBmYWxzZSxcblx0XHRwcmVzZXJ2ZUNvbnNlY3V0aXZlVXBwZXJjYXNlID0gZmFsc2UsXG5cdH0gPSBvcHRpb25zO1xuXG5cdGNvbnN0IHN0b3BQYXRoc1NldCA9IG5ldyBTZXQoc3RvcFBhdGhzKTtcblxuXHRjb25zdCBtYWtlTWFwcGVyID0gcGFyZW50UGF0aCA9PiAoa2V5LCB2YWx1ZSkgPT4ge1xuXHRcdGlmIChkZWVwICYmIGlzT2JqZWN0KHZhbHVlKSkge1xuXHRcdFx0Y29uc3QgcGF0aCA9IHBhcmVudFBhdGggPT09IHVuZGVmaW5lZCA/IGtleSA6IGAke3BhcmVudFBhdGh9LiR7a2V5fWA7XG5cblx0XHRcdGlmICghc3RvcFBhdGhzU2V0LmhhcyhwYXRoKSkge1xuXHRcdFx0XHR2YWx1ZSA9IG1hcE9iamVjdCh2YWx1ZSwgbWFrZU1hcHBlcihwYXRoKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCEoZXhjbHVkZSAmJiBoYXMoZXhjbHVkZSwga2V5KSkpIHtcblx0XHRcdGNvbnN0IGNhY2hlS2V5ID0gcGFzY2FsQ2FzZSA/IGAke2tleX1fYCA6IGtleTtcblxuXHRcdFx0aWYgKGNhY2hlLmhhcyhjYWNoZUtleSkpIHtcblx0XHRcdFx0a2V5ID0gY2FjaGUuZ2V0KGNhY2hlS2V5KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJldHVyblZhbHVlID0gY2FtZWxDYXNlKGtleSwge3Bhc2NhbENhc2UsIGxvY2FsZTogZmFsc2UsIHByZXNlcnZlQ29uc2VjdXRpdmVVcHBlcmNhc2V9KTtcblxuXHRcdFx0XHRpZiAoa2V5Lmxlbmd0aCA8IDEwMCkgeyAvLyBQcmV2ZW50IGFidXNlXG5cdFx0XHRcdFx0Y2FjaGUuc2V0KGNhY2hlS2V5LCByZXR1cm5WYWx1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRrZXkgPSByZXR1cm5WYWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gW2tleSwgdmFsdWVdO1xuXHR9O1xuXG5cdHJldHVybiBtYXBPYmplY3QoaW5wdXQsIG1ha2VNYXBwZXIodW5kZWZpbmVkKSk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjYW1lbGNhc2VLZXlzKGlucHV0LCBvcHRpb25zKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KGlucHV0KSkge1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyhpbnB1dCkubWFwKGtleSA9PiB0cmFuc2Zvcm0oaW5wdXRba2V5XSwgb3B0aW9ucykpO1xuXHR9XG5cblx0cmV0dXJuIHRyYW5zZm9ybShpbnB1dCwgb3B0aW9ucyk7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/camelcase-keys/index.js\n");

/***/ })

};
;