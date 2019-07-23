function doGet() {
}
function searchPerson() {
}
function createPonenciaFile() {
}
function registerPerson() {
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
    __webpack_require__.d(__webpack_exports__, "b", function() {
        return doGet;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return searchPerson;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return createPonenciaFile;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return registerPerson;
    });
    var ROOT_FOLDER = "ENCUENTRO COLOMBIANO", GENERAL_DB = "https://docs.google.com/spreadsheets/d/1OG6EPZzzVq_P2KjQ6kDcsJ0YmMlwSYwcZ-Xqb4LeOFo/edit#gid=0";
    function doGet(request) {
        return filename = "index.html", HtmlService.createHtmlOutputFromFile(filename).setTitle("Encuentro Colombiano").setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
        var filename;
    }
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
    function registerPerson(data) {
        var person = JSON.parse(data);
        logFunctionOutput("DATA", data), logFunctionOutput("PERSON", person);
        var inscritosSheet = getSheetFromSpreadSheet(GENERAL_DB, "INSCRITOS"), headers = inscritosSheet.getSheetValues(1, 1, 1, inscritosSheet.getLastColumn())[0];
        person.hora_registro = new Date().toLocaleDateString();
        var personValues = function(json, headers) {
            var arrayValues = new Array(headers.length), lowerHeaders = headers.map(function(item) {
                return item.toLowerCase();
            });
            for (var key in json) for (var header in lowerHeaders) logFunctionOutput("JSON TO SHEET", {
                key: json[key],
                header: lowerHeaders[header]
            }), key == String(lowerHeaders[header]) && (arrayValues[header] = "nombre" == key || "apellidos" == key ? json[key].toUpperCase() : json[key]);
            return arrayValues;
        }(person, headers);
        logFunctionOutput("personValues", personValues);
        var finalValues = personValues.map(String), nicePerson = {
            cedula: personValues[2],
            nombres: personValues[0],
            apellidos: personValues[1],
            email: personValues[3],
            pago_total: personValues[8],
            concepto_pago: personValues[7],
            dependecia: "COGESTEC 2019",
            telefono: personValues[4]
        };
        inscritosSheet.appendRow(finalValues);
        var result = {
            data: nicePerson,
            ok: !0
        };
        return logFunctionOutput(registerPerson.name, result), result;
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
    function createPersonFile(name, numdoc, data) {
        var dropbox, folders, result = {
            url: "",
            file: ""
        }, currentFolder = function(name, mainFolder) {
            var FolderFiles, folders = mainFolder.getFoldersByName("documentos"), mFolders = (FolderFiles = folders.hasNext() ? folders.next() : mainFolder.createFolder("documentos")).getFoldersByName(name);
            return mFolders.hasNext() ? mFolders.next() : FolderFiles.createFolder(name);
        }(numdoc, (dropbox = ROOT_FOLDER, (folders = DriveApp.getFoldersByName(dropbox)).hasNext() ? folders.next() : DriveApp.createFolder(dropbox))), contentType = data.substring(5, data.indexOf(";")), bytes = Utilities.base64Decode(data.substr(data.indexOf("base64,") + 7)), blob = Utilities.newBlob(bytes, contentType, file), file = currentFolder.createFile(blob);
        return file.setDescription("Subido Por " + numdoc), file.setName(numdoc + "_" + name), 
        result.url = file.getUrl(), result.file = file.getName(), result;
    }
    function createPonenciaFile(numdoc, data) {
        return createPersonFile("PONENCIA", numdoc, data);
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
        global.doGet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["b"], global.searchPerson = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["d"], 
        global.createPonenciaFile = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["a"], 
        global.registerPerson = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["c"];
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