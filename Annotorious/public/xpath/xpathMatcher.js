var xpathCoordinates = function(start, end) {
  var divNums = {
    range: null,
    start: null,
    end: null
  };

  // Matches a pair of xpath start/end coordinates; e.g.
  // "/div[248]/p[2]" matches ['248', '2']
  var regex = /(?!\[)[0-9]+(?!\])*/g;
  divNums.start = start.match(regex);
  divNums.end = end.match(regex);

  //parsing integers
  for(var i = 0; i < divNums.start.length; i++) {
    divNums.start[i] = Number(divNums.start[i]);
    divNums.end[i] = Number(divNums.end[i]);
  }

  divNums.range = divNums.end[0] - divNums.start[0];

  if (divNums.range === null) {
    console.log("error parsing divs for %s and %s", start, end);
  } else {
    return divNums;
  }
};


var formatXpathsArray = function(xpathStart, xpathEnd, divNums) {
  var xpathArray = [];

  for( var i = 0; i < divNums.length; i++ ) {
    divNums[i] = Number(divNums[i]);
    console.log(divNums[i]);
  }
  console.log(divNums[1], 'divNums1', divNums[2], '2');

  for (var i = startLoop; i < endLoop + 1; i++) {
    xpathArray.push('//div[' + i + ']/');
    // console.log(xpathArray);
  }

  var pNums = extractXpathPInfo(xpathStart,xpathEnd);
  // console.log(pNums);

  xpathArray[0] += pNums[0];

  xpathArray[xpathArray.length - 1] += pNums[1];

  var formatInfo = {
    "xpaths" : xpathArray, 
    "pInfo": pNums
  };
  return formatInfo;
}

var returnAnnotations = function(xpathStart, xpathEnd, quote, annotation) {

  //Returns an object that parses the xpath coordinates and range of divs
  //xpathCoordinates("/div[248]/p[2]", "/div[250]/p[2]") returns
  //divNums = {"start": [248,2], "end": [250,2], "range":2 }
  var divNums = xpathCoordinates(xpathStart, xpathEnd);
  console.log(divNums, 'divnums');

  if(divNums.range === 0 && divNums.start[1] === divNums.end[1]) {
    console.log("%s only spans one line", quote);

    var selectText = $('body').xpath('/' + xpathStart)[0].innerHTML;
    // var copySelectText = selectText
    var highlightedText = "<strong><span class='annotated' data='" + annotation + "'>" + quote + "</span></strong>";

    $('body').xpath('/' + xpathStart)[0].innerHTML = selectText.replace(quote, highlightedText);
    return true;
  }

  //if the selection spans multiple divs
  console.log("%s spans more than one line", quote);

  return returnMultilineAnnotations(xpathStart, xpathEnd, quote, annotation, divNums);
  // return textConcat
};

var returnMultilineAnnotations = function(xpathStart, xpathEnd, quote, annotation, divNums) {
  var formatInfo = formatXpathsArray(xpathStart, xpathEnd, divNums);
  var countFirstParagraph = formatInfo.pInfo[1];
  var countLastParagraph = formatInfo.pInfo[3];
  console.log(formatInfo.xpaths.length);
  var nodeArray = [];

  for (var i = 0; i < formatInfo.xpaths.length; i++) {
    console.log("processing node %d", i)
    nodeArray.push($('body').xpath(formatInfo.xpaths[i]));

    if (nodeArray[i].hasClass('shkspr-speech-body')) {
      console.log("nodeArray %d has class shkspr-speech-body", i);

    } else if (nodeArray[i].hasClass('shkspr-speech')) {
      console.log("nodeArray %d has class shkspr-speech", i);

    } else if (nodeArray[i].hasClass('shkspr-speech-speaker')) {
      console.log("nodeArray %d has class shkspr-speech-speaker", i);

    } else if (nodeArray[i].hasClass('shkspr-stagedir')) {
      console.log("nodeArray %d has class shkspr-stagedir", i);
    }
  };
  return nodeArray;
}

returnAnnotations("/div[1]/p[1]", "/div[1]/p[1]","DUKE", "testing 1 2 3");

$('.annotated').on('hover', function(){
  console.log(this.getAttribute('data'));
});
 
// "Here, again, is the theme of reason or judgment being swayed by love-- Lysander, ironically enough, claims to have it now that he's been bewitched by fairy juice. "
// .match(/[^"](?:\s*)____???___(?:\s*)[^"]/)