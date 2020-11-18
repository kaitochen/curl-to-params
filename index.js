const util = require("./util");
const jsesc = require("jsesc");

const toJs = (curlCommand) => {
  const request = util.parseCurlCommand(curlCommand);
  console.log(request);
  let jsCode = "";

  if (request.data === true) {
    request.data = "";
  }
  if (request.data) {
    if (typeof request.data === "number") {
      request.data = request.data.toString();
    }
    // escape single quotes if there are any in there
    if (request.data.indexOf("'") > -1) {
      request.data = jsesc(request.data);
    }

    try {
      JSON.parse(request.data);

      if (!request.headers) {
        request.headers = {};
      }

      if (!request.headers["Content-Type"]) {
        request.headers["Content-Type"] = "application/json; charset=UTF-8";
      }

      request.data = "JSON.stringify(" + request.data + ")";
    } catch {
      request.data = '"' + request.data + '"';
    }
  }

  jsCode += '{\n    "url": "' + request.url + '"';
  if (request.static) {
    jsCode += ',\n    "static": "' + request.static + '"';
  }
  if (request.dynamic) {
    jsCode += ',\n    "dynamic": "' + request.dynamic + '"';
  }
  jsCode += ",\n";
  jsCode += '    "method": "' + request.method.toUpperCase() + '"';

  if (request.headers || request.cookies || request.auth || request.body) {
    // jsCode += ',\n'

    // // if (request.method !== 'get') {
    //   jsCode += '    "method": "' + request.method.toUpperCase() + '"'
    // // }

    if (request.headers || request.cookies || request.auth) {
      // if (request.method !== 'get') {
      jsCode += ",\n";
      // }
      jsCode += '    "headers": {\n';
      const headerCount = Object.keys(request.headers || {}).length;
      let i = 0;
      for (const headerName in request.headers) {
        jsCode +=
          '        "' + headerName + '": "' + request.headers[headerName] + '"';
        if (i < headerCount - 1 || request.cookies || request.auth) {
          jsCode += ",\n";
        }
        i++;
      }
      if (request.auth) {
        const splitAuth = request.auth.split(":");
        const user = splitAuth[0] || "";
        const password = splitAuth[1] || "";
        jsCode +=
          '        "Authorization": "Basic " + btoa("' +
          user +
          ":" +
          password +
          '")';
      }
      if (request.cookies) {
        const cookieString = util.serializeCookies(request.cookies);
        jsCode += '        "Cookie": "' + cookieString + '"';
      }

      jsCode += "\n    }";
    }
  }
  if (request.data) {
    jsCode += ',\n    "body": ' + request.data;
  }
  if (request.context) {
    jsCode += ',\n    "context": "' + request.context + '"';
  }
  if (request.alert) {
    jsCode += ',\n    "alert": "' + request.alert + '"';
  }
  if (request.export) {
    jsCode += ',\n    "export": "' + request.export + '"';
  }
  if (request["export-name"]) {
    jsCode += ',\n    "export-name": "' + request["export-name"] + '"';
  }

  jsCode += "\n";

  jsCode += "}";

  return jsCode + "\n";
};

module.exports = toJs;
