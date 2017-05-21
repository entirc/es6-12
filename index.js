import { clear, group, logf } from './utils.js'

//----------------------------------
// New Built-In Methods
//----------------------------------
let newBuiltInMethods = {

  //----------------------------------
  // New Built-In Methods
  // - Number Type Checking
  //----------------------------------
  numberTypeChecking: () => {
    group("Number.isNaN", () => {
      logf(`Number.isNaN(42) ? ${Number.isNaN(42)}`)
      logf(`Number.isNaN(NaN) ? ${Number.isNaN(NaN)}`)
    })

    group("Number.isFinite", () => {
      logf(`Number.isFinite(Infinity) ? ${Number.isFinite(Infinity)}`)
      logf(`Number.isFinite(-Infinity) ? ${Number.isFinite(-Infinity)}`)
      logf(`Number.isFinite(NaN) ? ${Number.isFinite(NaN)}`)
      logf(`Number.isFinite(123) ? ${Number.isFinite(123)}`)
    })
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Safety Checking
  //----------------------------------
  numberSafetyChecking: () => {
    logf(`Number.isSafeInteger(42) ? ${Number.isSafeInteger(42)}`)
    logf(`Number.isSafeInteger(9007199254740992) ? ${Number.isSafeInteger(9007199254740992)}`)
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Comparison
  //----------------------------------
  numberComparison: () => {
    logf(`Number.EPSILON === ${Number.EPSILON}`)
    logf(`0.1 + 0.2 === 0.3 ? ${0.1 + 0.2 === 0.3}`)
    logf(`Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON ? ${Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON}`)
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Truncation
  //----------------------------------
  numberTruncation: () => {
    logf(`Math.trunc(42.7) === ${Math.trunc(42.7)}`)
    logf(`Math.trunc( 0.1) === ${Math.trunc( 0.1)}`)
    logf(`Math.trunc(-0.1) === ${Math.trunc(-0.1)}`)
  },

  //----------------------------------
  // New Built-In Methods
  // - Number Sign Determination
  //----------------------------------
  numberSignDetermination: () => {
    logf(`Math.sign(7) === ${Math.sign(7)}`)
    logf(`Math.sign(0) === ${Math.sign(0)}`)
    logf(`Math.sign(-0) === ${Math.sign(-0)}`)
    logf(`Math.sign(-7) === ${Math.sign(-7)}`)
    logf(`Math.sign(NaN) === ${Math.sign(NaN)}`)
  }

}

//----------------------------------
// Promises
//----------------------------------
let promises = {
  //Promise pode estar em 1 de 4 estados:
  //1) pending (pendente): Estado inicial, que não foi realizada nem rejeitada.
  //2) fulfilled (realizada): sucesso na operação.
  //3) rejected (rejeitado):  falha na operação.
  //4) settled (estabelecida): que foi realizada ou rejeitada.

  //----------------------------------
  // Promises
  // - Promise Usage
  //----------------------------------
  promiseUsage: () => {
    const WAIT_TIME_IN_MS = 1000

    let promise = new Promise((resolve, reject) => {
      //operação assíncrona aqui
      setTimeout(() => {
        if (Math.random() < .5) {
          resolve("Você teve sorte!")
        } else {
          reject("Mais sorte da próxima vez!")
        }
      }, WAIT_TIME_IN_MS)
    })

    //usando Promise.then(), manipulando sucesso e erro direto
    promise.then((result) => logf(`👍 ${result}`), (error) => logf(`👎 ${error}`))

    //manipulando erro com o método "catch"
    promise
      .then((result) => logf(`👍 ${result}`))
      .catch((error) => logf(`👎 ${error}`))
  },

  //----------------------------------
  // Promises
  // - Promise Combination
  //----------------------------------
  promiseCombination: () => {

    let get = (url, acceptedType) => new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function() {
          if (request.readyState === XMLHttpRequest.DONE) {
             if (request.status === 200) {
               resolve(request.responseText)
             }
             else {
               reject(Error(`Error retrieving information ${request.statusText}`))
             }
          }
      }
      request.open("GET", url, true);
      request.setRequestHeader('Accept', acceptedType);
      request.send();
    })

    let getJson = (url) => get(url, 'application/json')
    let getXml  = (url) => get(url, 'application/xml')

    let getAndJsonParse = (url) => getJson(url).then(JSON.parse)
    let getAndXmlParse = (url) => getXml(url).then(xml => new DOMParser().parseFromString(xml, "text/xml"))

    let getPosts    = getAndJsonParse('https://jsonplaceholder.typicode.com/posts/1')
    let getComments = getAndJsonParse('https://jsonplaceholder.typicode.com/comments/1')
    let getUsers    = getAndJsonParse('https://jsonplaceholder.typicode.com/users/1')
    let getAlbums   = getAndJsonParse('https://jsonplaceholder.typicode.com/albums/1')
    let getXmlData  = getAndXmlParse('http://services.odata.org/V4/Northwind/Northwind.svc/')

    let canXmlSerialize = (object) => {
      try {
        new XMLSerializer().serializeToString(object)
      } catch (e) {
        return false;
      }
      return true;
    }

    //Executando múltiplas promises com Promise.all()
    //Promise.all => Espera ate que todas as Promises estejam 'settled' (estabelecidas)

    let printItems = (results) => {
      results.forEach(item => logf(item))
      return results
    }

    let serialize = (results) => results.map(item =>
      canXmlSerialize(item) ? new XMLSerializer().serializeToString(item) : JSON.stringify(item)
    )

    let printWithAdditionalInfo = ([posts, comments, users, albums, xml]) =>
      logf(`Posts => ${posts}\n\nComments => ${comments}\n\nUsers => ${users}\n\nAlbums => ${albums}\n\nXmlData => ${xml}`)

    let handleError = (error) => logf('❌ Could not retrieve any information ' + error)

    Promise.all([getPosts, getComments, getUsers, getAlbums, getXmlData])
      .then(printItems)
      .then(serialize)
      .then(printWithAdditionalInfo)
      .catch(handleError)

    Promise.resolve()
    Promise.reject()
    Promise.race([p1, p2]).then(result => logf(result))

  }

}

//==================================

window.onload = () => {

  let bindFunction = (selector, fn) => {
    let link = document.querySelector(selector)
    link.href = "javascript:void(0)"
    link.onclick = () => {
      clear()
      fn()
    }
  }

  let bindList = [
    ["#nbim-ntc",   newBuiltInMethods.numberTypeChecking],
    ["#nbim-nsc",   newBuiltInMethods.numberSafetyChecking],
    ["#nbim-nc",    newBuiltInMethods.numberComparison],
    ["#nbim-nt",    newBuiltInMethods.numberTruncation],
    ["#nbim-nsd",   newBuiltInMethods.numberSignDetermination],
    ["#p-pu",       promises.promiseUsage],
    ["#p-pc",       promises.promiseCombination]
  ]

  bindList.forEach(([selector, fn]) => bindFunction(selector, fn))

}
