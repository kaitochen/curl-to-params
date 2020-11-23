const util = require("./util");
const jsesc = require("jsesc");

const toJs = (curlCommand) => {
  const request = util.parseCurlCommand(curlCommand);
  let jsCode = {};

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
      request.data =  request.data;
    }
  }
  jsCode.url = request.url;
  // jsCode += '{\n    "url": "' + request.url + '"';
  if (request.static) {
    jsCode.static = request.static;

    // jsCode += ',\n    "static": "' + request.static + '"';
  }
  if (request.dynamic) {
    jsCode.dynamic = request.dynamic;

    // jsCode += ',\n    "dynamic": "' + request.dynamic + '"';
  }
  if (request.title) {
    jsCode.title = request.title;

    // jsCode += ',\n    "title": "' + request.title + '"';
  }
  if (request.dialog) {
    jsCode.dialog = request.dialog;

    // jsCode += ',\n    "dialog": "' + request.dialog + '"';
  }
  if (request.type) {
    jsCode.type = request.type;

    // jsCode += ',\n    "dialog": "' + request.dialog + '"';
  }
  if (request.close) {
    jsCode.close = request.close;

    // jsCode += ',\n    "close": "' + request.close + '"';
  }
  if (request.back) {
    jsCode.back = request.back;

    // jsCode += ',\n    "back": "' + request.back + '"';
  }
  if (request.refresh) {
    jsCode.refresh = request.refresh;

    // jsCode += ',\n    "refresh": "' + request.refresh + '"';
  }
  if (request.success) {
    jsCode.success = request.success;

    // jsCode += ',\n    "success": "' + request.success + '"';
  }
  if (request.fail) {
    jsCode.fail = request.fail;

    // jsCode += ',\n    "fail": "' + request.fail + '"';
  }
  // jsCode += ",\n";
  // jsCode += '    "method": "' + request.method.toUpperCase() + '"';
  jsCode.method = request.method.toUpperCase();

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
    jsCode.body = request.data
    // jsCode += ',\n    "body": ' + request.data;
  }
  if (request.context) {
    jsCode.context = request.context

    // jsCode += ',\n    "context": "' + request.context + '"';
  }
  if (request.alert) {
    jsCode.alert = request.alert
    
    // jsCode += ',\n    "alert": "' + request.alert + '"';
  }
  if (request.export) {
    jsCode.export = request.export

    // jsCode += ',\n    "export": "' + request.export + '"';
  }
  if (request["export-name"]) {
    jsCode["export-name"] = request["export-name"]

    // jsCode += ',\n    "export-name": "' + request["export-name"] + '"';
  }

  // jsCode += "\n";

  // jsCode += "}";

  return jsCode;
};

module.exports = toJs;
