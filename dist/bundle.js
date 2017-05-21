(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require("./utils.js");

//----------------------------------
// New Built-In Methods
//----------------------------------
var newBuiltInMethods = {

  //----------------------------------
  // New Built-In Methods
  // - Number Type Checking
  //----------------------------------
  numberTypeChecking: function numberTypeChecking() {
    (0, _utils.group)("Number.isNaN", function () {
      (0, _utils.logf)("Number.isNaN(42) ? " + Number.isNaN(42));
      (0, _utils.logf)("Number.isNaN(NaN) ? " + Number.isNaN(NaN));
    });

    (0, _utils.group)("Number.isFinite", function () {
      (0, _utils.logf)("Number.isFinite(Infinity) ? " + Number.isFinite(Infinity));
      (0, _utils.logf)("Number.isFinite(-Infinity) ? " + Number.isFinite(-Infinity));
      (0, _utils.logf)("Number.isFinite(NaN) ? " + Number.isFinite(NaN));
      (0, _utils.logf)("Number.isFinite(123) ? " + Number.isFinite(123));
    });
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Safety Checking
  //----------------------------------
  numberSafetyChecking: function numberSafetyChecking() {
    (0, _utils.logf)("Number.isSafeInteger(42) ? " + Number.isSafeInteger(42));
    (0, _utils.logf)("Number.isSafeInteger(9007199254740992) ? " + Number.isSafeInteger(9007199254740992));
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Comparison
  //----------------------------------
  numberComparison: function numberComparison() {
    (0, _utils.logf)("Number.EPSILON === " + Number.EPSILON);
    (0, _utils.logf)("0.1 + 0.2 === 0.3 ? " + (0.1 + 0.2 === 0.3));
    (0, _utils.logf)("Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON ? " + (Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON));
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Truncation
  //----------------------------------
  numberTruncation: function numberTruncation() {
    (0, _utils.logf)("Math.trunc(42.7) === " + Math.trunc(42.7));
    (0, _utils.logf)("Math.trunc( 0.1) === " + Math.trunc(0.1));
    (0, _utils.logf)("Math.trunc(-0.1) === " + Math.trunc(-0.1));
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Sign Determination
  //----------------------------------
  numberSignDetermination: function numberSignDetermination() {
    (0, _utils.logf)("Math.sign(7) === " + Math.sign(7));
    (0, _utils.logf)("Math.sign(0) === " + Math.sign(0));
    (0, _utils.logf)("Math.sign(-0) === " + Math.sign(-0));
    (0, _utils.logf)("Math.sign(-7) === " + Math.sign(-7));
    (0, _utils.logf)("Math.sign(NaN) === " + Math.sign(NaN));
  }

};

//----------------------------------
// Promises
//----------------------------------
var promises = {
  //Promise pode estar em 1 de 4 estados:
  //1) pending (pendente): Estado inicial, que não foi realizada nem rejeitada.
  //2) fulfilled (realizada): sucesso na operação.
  //3) rejected (rejeitado):  falha na operação.
  //4) settled (estabelecida): que foi realizada ou rejeitada.

  //----------------------------------
  // Promises
  // - Promise Usage
  //----------------------------------
  promiseUsage: function promiseUsage() {
    var WAIT_TIME_IN_MS = 1000;

    var promise = new Promise(function (resolve, reject) {
      //operação assíncrona aqui
      setTimeout(function () {
        if (Math.random() < .5) {
          resolve("Você teve sorte!");
        } else {
          reject("Mais sorte da próxima vez!");
        }
      }, WAIT_TIME_IN_MS);
    });

    //usando Promise.then(), manipulando sucesso e erro direto
    promise.then(function (result) {
      return (0, _utils.logf)("\uD83D\uDC4D " + result);
    }, function (error) {
      return (0, _utils.logf)("\uD83D\uDC4E " + error);
    });

    //manipulando erro com o método "catch"
    promise.then(function (result) {
      return (0, _utils.logf)("\uD83D\uDC4D " + result);
    }).catch(function (error) {
      return (0, _utils.logf)("\uD83D\uDC4E " + error);
    });
  },

  //----------------------------------
  // Promises
  // - Promise Combination
  //----------------------------------
  promiseCombination: function promiseCombination() {

    var get = function get(url, acceptedType) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
              resolve(request.responseText);
            } else {
              reject(Error("Error retrieving information " + request.statusText));
            }
          }
        };
        request.open("GET", url, true);
        request.setRequestHeader('Accept', acceptedType);
        request.send();
      });
    };

    var getJson = function getJson(url) {
      return get(url, 'application/json');
    };
    var getXml = function getXml(url) {
      return get(url, 'application/xml');
    };

    var getAndJsonParse = function getAndJsonParse(url) {
      return getJson(url).then(JSON.parse);
    };
    var getAndXmlParse = function getAndXmlParse(url) {
      return getXml(url).then(function (xml) {
        return new DOMParser().parseFromString(xml, "text/xml");
      });
    };

    var getPosts = getAndJsonParse('https://jsonplaceholder.typicode.com/posts/1');
    var getComments = getAndJsonParse('https://jsonplaceholder.typicode.com/comments/1');
    var getUsers = getAndJsonParse('https://jsonplaceholder.typicode.com/users/1');
    var getAlbums = getAndJsonParse('https://jsonplaceholder.typicode.com/albums/1');
    var getXmlData = getAndXmlParse('http://services.odata.org/V4/Northwind/Northwind.svc/');

    var canXmlSerialize = function canXmlSerialize(object) {
      try {
        new XMLSerializer().serializeToString(object);
      } catch (e) {
        return false;
      }
      return true;
    };

    //Executando múltiplas promises com Promise.all()
    //Promise.all => Espera ate que todas as Promises estejam 'settled' (estabelecidas)

    var printItems = function printItems(results) {
      results.forEach(function (item) {
        return (0, _utils.logf)(item);
      });
      return results;
    };

    var serialize = function serialize(results) {
      return results.map(function (item) {
        return canXmlSerialize(item) ? new XMLSerializer().serializeToString(item) : JSON.stringify(item);
      });
    };

    var printWithAdditionalInfo = function printWithAdditionalInfo(_ref) {
      var _ref2 = _slicedToArray(_ref, 5),
          posts = _ref2[0],
          comments = _ref2[1],
          users = _ref2[2],
          albums = _ref2[3],
          xml = _ref2[4];

      return (0, _utils.logf)("Posts => " + posts + "\n\nComments => " + comments + "\n\nUsers => " + users + "\n\nAlbums => " + albums + "\n\nXmlData => " + xml);
    };

    var handleError = function handleError(error) {
      return (0, _utils.logf)('❌ Could not retrieve any information ' + error);
    };

    Promise.all([getPosts, getComments, getUsers, getAlbums, getXmlData]).then(printItems).then(serialize).then(printWithAdditionalInfo).catch(handleError);

    Promise.resolve();
    Promise.reject();
    Promise.race([p1, p2]).then(function (result) {
      return (0, _utils.logf)(result);
    });
  }

};

//==================================

window.onload = function () {

  var bindFunction = function bindFunction(selector, fn) {
    var link = document.querySelector(selector);
    link.href = "javascript:void(0)";
    link.onclick = function () {
      (0, _utils.clear)();
      fn();
    };
  };

  var bindList = [["#nbim-ntc", newBuiltInMethods.numberTypeChecking], ["#nbim-nsc", newBuiltInMethods.numberSafetyChecking], ["#nbim-nc", newBuiltInMethods.numberComparison], ["#nbim-nt", newBuiltInMethods.numberTruncation], ["#nbim-nsd", newBuiltInMethods.numberSignDetermination], ["#p-pu", promises.promiseUsage], ["#p-pc", promises.promiseCombination]];

  bindList.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        selector = _ref4[0],
        fn = _ref4[1];

    return bindFunction(selector, fn);
  });
};

},{"./utils.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var clear = function clear() {
  return console.clear();
};

var log = function log(msg) {
  return console.log(msg);
};

var logf = function logf(format, _values) {
  if (_values) {
    var newFormat = Object.keys(_values).reduce(function (a, v) {
      return a.replace('${' + v + '}', '${_values.' + v + '}');
    }, format);
    log(eval('`' + newFormat + '`'));
  } else {
    log(format);
  }
};

var group = function group(groupName, fn) {
  console.groupCollapsed(groupName);
  fn();
  console.groupEnd();
};

var measureTime = function measureTime(fn) {
  console.time();
  fn();
  console.timeEnd();
};

var groupAndMeasureTime = function groupAndMeasureTime(groupName, fn) {
  return group(groupName, function () {
    return measureTime(fn);
  });
};

exports.clear = clear;
exports.log = log;
exports.logf = logf;
exports.group = group;
exports.measureTime = measureTime;
exports.groupAndMeasureTime = groupAndMeasureTime;

},{}]},{},[1,2]);
