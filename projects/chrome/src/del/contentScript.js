var tempEventElement;
document.addEventListener("click", function (e) {
  var xpath = getActionElementXPath(e.target);
  if (xpath === '/HTML') {
    xpath = getElementXPath(e.target);
  }
  if (xpath === null) {
    return;
  }
  var data = { type: 'click', path: xpath }
  //window.postMessage(data, "*")
  // window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
  var ele = getElementByXPath(xpath, document);
  if (ele.nodeName === "INPUT") {
    if (!ele.isSameNode(tempEventElement) && tempEventElement != null) {
      tempEventElement.removeEventListener("blur");
      ele.addEventListener("blur", (event) => {
        data = { type: 'SendKeys', path: xpath, value: event.currentTarget.value };

      });
      tempEventElement = ele;
    }
  } else if (tempEventElement === "INPUT") {
    tempEventElement.removeEventListener("blur");

  }
  if (chrome.runtime) {
    chrome.runtime.sendMessage(data, function (response) {
      console.log(response);
    });
  }
  console.log(data)
});
 
function getXPath(node) {
  if (node.hasAttribute("id")) {
    return '//' + node.tagName + '[@id="' + node.id + '"]';
  }

  if (node.hasAttribute("class")) {
    return '//' + node.tagName + '[@class="' + node.getAttribute("class") + '"]';
  }

  var old = '/' + node.tagName;
  var new_path = getXPath(node.parentNode) + old;

  return new_path;
}
function getElementXPath(node, doc) {
  if (doc == undefined) doc = document;
  var xpath = '';
  var pos, tempitem2;
  while (node !== doc.documentElement) {
    pos = 0; tempitem2 = node;
    while (tempitem2) {
      if (tempitem2.nodeType === 1 && tempitem2.nodeName === node.nodeName) { pos += 1; }
      tempitem2 = tempitem2.previousSibling;
    }
    xpath = node.nodeName + '[' + pos + ']' + '/' + xpath;
    node = node.parentNode;
  }
  xpath = '/' + doc.documentElement.nodeName + '/' + xpath;
  xpath = xpath.replace(/\/$/, '');
  return xpath;
}
var selectedActionEle = null;
function getActionElementXPath(node, doc) {
  var nodeClone = node.cloneNode(true);
  if (doc == undefined) doc = document;
  var xpath = '';
  var isFirst = true;
  var pos, tempitem2;
  while (node !== doc.documentElement) {
    pos = 0; tempitem2 = node;
    while (tempitem2) {
      if (tempitem2.nodeType === 1 && tempitem2.nodeName === node.nodeName) { pos += 1; }
      tempitem2 = tempitem2.previousSibling;
    }
    if (isFirst === true && (node.nodeName == 'A' || node.nodeName == 'BUTTON' || node.nodeName == 'SELECT')) {

      xpath = node.nodeName + '[' + pos + ']' + '/' + xpath;
      if (node.nodeName == 'SELECT' && openSelectOpen === null) {
        openSelectOpen = true;
        //return null; -> return null is bad idea because it will 
      } else if (node.nodeName == 'SELECT' && openSelectOpen === true) {

      }
      isFirst = false;
    } else if (isFirst === false) {
      xpath = node.nodeName + '[' + pos + ']' + '/' + xpath;
    }

    node = node.parentNode;
  }
  xpath = '/' + doc.documentElement.nodeName + '/' + xpath;
  xpath = xpath.replace(/\/$/, '');
  // if(xpath==='/HTML'){
  //     var retVal =confirm("Element is not action element, do you want to get not active element?");
  //            if( retVal == true ) {
  //                 return getElementXPath(nodeClone,doc);
  //              } else{
  // 			   return null;
  // 		   }
  // }
  return xpath;
}
function getElementByXPath(xPath, doc) {
  if (!doc) doc = document;
  if (doc.evaluate) return doc.evaluate(xPath, document, null, 9, null).singleNodeValue;
  // for IE
  while (xPath.charAt(0) == '/') xPath = xPath.substr(1);
  var prevElem = doc;
  var arr = xPath.split('/');
  for (var i = 0; i < arr.length; i++) {
    var step = arr[i].split(/(\w*)\[(\d*)\]/gi).filter(function (v) { return !(v == '' || v.match(/\s/gi)) }, this);
    var elem = step[0];
    var elemNum = step[1] ? step[1] - 1 : 0; // -1 since xpath is 1 based
    if (i < arr.length - 1) prevElem = prevElem.getElementsByTagName(elem)[elemNum];
    else return prevElem.getElementsByTagName(elem)[elemNum];
  }
}
function getElementByXPathCount(xPath, doc) {
  if (!doc) doc = document;
  document.evaluate("count(" + xPath + ")", doc, null, XPathResult.ANY_TYPE, null);
}