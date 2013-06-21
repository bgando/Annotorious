$('#content').on('click', function(){
  var result = $(document).xpath("/div[95]/p[2]");
  // debugger;

  console.log(result);
});

// var divs = document.evaluate("/div[95]/p[2]", document, null, XPathResult.ANY_TYPE, null );

// var thisDiv = divs.iterateNext();

// var alertText = 'Divs in this document are:\n'

// // // end: "/div[95]/p[2]",
// // // endOffset: 273,
// // // startOffset: 253,
// // // start: "/div[95]/p[2]"
// // $(function(){
// $('#content').on('click', function(){

// console.log('click');
//   while (thisDiv) {
//   alertText += thisDiv.textContent + '\n';
//   console.log(alertText, "alertText");
//   thisDiv = divs.iterateNext();

// }
  
  // console.log($('p.shkspr-speech-body').xpath("count(ancestor::node())"), "xpath")
  // var results = evaluateXPath(div, "/div[95]/p[2]");
  // console.log(results, "on click")
  
// });

// var node-name = function() {

// }

// var evaluateXPath =function(aNode, aExpr) {
//   var xpe = aNode.ownerDocument || aNode;
//   xpe.createNSResolver(xpe.documentElement);
//   // var nsResolver = xpe.createNSResolver(aNode.ownerDocument == null ?
//     // aNode.documentElement : aNode.ownerDocument.documentElement);
//   var result = xpe.evaluate(aExpr, aNode, nsResolver, 0, null);
//   var found = [];
//   var res;
//   while (res = result.iterateNext())
//     found.push(res);
//   console.log(found);
//   return found;
// }
// });

