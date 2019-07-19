function onOpen() {
}
function doGet() {
}
function searchPerson() {
}
function getSheetsData() {
}
function addSheet() {
}
function deleteSheet() {
}
function setActiveSheet() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "c", function() {
        return doGet;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return getSheetsData;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return addSheet;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return deleteSheet;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return setActiveSheet;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return searchPerson;
    });
    var GENERAL_DB = "https://docs.google.com/spreadsheets/d/1OG6EPZzzVq_P2KjQ6kDcsJ0YmMlwSYwcZ-Xqb4LeOFo/edit#gid=0";
    function doGet(request) {
        return filename = "index.html", HtmlService.createHtmlOutputFromFile(filename).setTitle("Encuentro Colombiano").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
        var filename;
    }
    var getSheets = function() {
        return SpreadsheetApp.getActive().getSheets();
    }, getSheetsData = function() {
        var activeSheetName = SpreadsheetApp.getActive().getSheetName();
        return getSheets().map(function(sheet, index) {
            var sheetName = sheet.getName();
            return {
                text: sheetName,
                sheetIndex: index,
                isActive: sheetName === activeSheetName
            };
        });
    }, addSheet = function(sheetTitle) {
        return SpreadsheetApp.getActive().insertSheet(sheetTitle), getSheetsData();
    }, deleteSheet = function(sheetIndex) {
        var sheets = getSheets();
        return SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]), getSheetsData();
    }, setActiveSheet = function(sheetName) {
        return SpreadsheetApp.getActive().getSheetByName(sheetName).activate(), getSheetsData();
    };
    function getPeopleRegistered() {
        return function(sheetValues, headers) {
            var headings = headers || sheetValues[0].map(String.toLowerCase), people = null;
            sheetValues && (people = sheetValues.slice(1));
            return function(people, headings) {
                return people.map(function(personAsArray) {
                    var personAsObj = {};
                    return headings.forEach(function(heading, i) {
                        personAsObj[heading] = personAsArray[i];
                    }), personAsObj;
                });
            }(people, headings);
        }(function(url, sheet) {
            var mSheet = getSheetFromSpreadSheet(url, sheet);
            if (mSheet) return mSheet.getSheetValues(1, 1, mSheet.getLastRow(), mSheet.getLastColumn());
        }(GENERAL_DB, "INSCRITOS"));
    }
    function searchPerson(cedula) {
        var person = validatePerson(cedula);
        return logFunctionOutput(searchPerson.name, person), person;
    }
    function validatePerson(cedula) {
        var inscritos = getPeopleRegistered(), result = {
            isRegistered: !1,
            index: -1,
            data: null,
            cert_asist: "",
            cert_ponen: ""
        };
        for (var person in inscritos) String(inscritos[person].cedula) === String(cedula) && (result.isRegistered = !0, 
        result.index = person, result.data = inscritos[person]);
        return logFunctionOutput(validatePerson.name, result), result.index < 0 && (result.isRegistered = !1), 
        JSON.stringify(result);
    }
    function getSheetFromSpreadSheet(url, sheet) {
        var Spreedsheet = SpreadsheetApp.openByUrl(url);
        if (url && sheet) return Spreedsheet.getSheetByName(sheet);
    }
    function logFunctionOutput(functionName, returnValue) {
        Logger.log("Function--------\x3e" + functionName), Logger.log("Value------------\x3e"), 
        Logger.log(returnValue), Logger.log("----------------------------------");
    }
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        global.onOpen = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["onOpen"], global.doGet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["c"], 
        global.searchPerson = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["f"], global.getSheetsData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["d"], 
        global.addSheet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["a"], global.deleteSheet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["b"], 
        global.setActiveSheet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["g"];
    }.call(this, __webpack_require__(2));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));