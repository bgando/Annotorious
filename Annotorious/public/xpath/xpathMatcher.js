//the xpaths are relative to the format of the page. To adjust these paths for future iterations
//of the websites, input the xpath formats to account for the difference. To use this on the raw HTML,
//simply set xpathPrefix to '/' 

var xpathPrefix = '//div[2]/div/div[2]/div[2]'
// var xpathPrefix = '/';

var xpathCoordinates = function(start, end) {
  var xpathCoords= {
    range: null,
    start: null,
    end: null
  };

  // Matches a pair of xpath start/end coordinates; e.g.
  // "/div[248]/p[2]" matches ['248', '2']
  var regex = /(?!\[)[0-9]+(?!\])*/g;
  xpathCoords.start = start.match(regex);
  xpathCoords.end = end.match(regex);

  //parsing integers
  for(var i = 0; i < xpathCoords.start.length; i++) {
    xpathCoords.start[i] = Number(xpathCoords.start[i]);
    xpathCoords.end[i] = Number(xpathCoords.end[i]);
  }

  xpathCoords.range = xpathCoords.end[0] - xpathCoords.start[0];

  if (xpathCoords.range === null) {
    console.log("error parsing divs for %s and %s", start, end);
  } else {
    return xpathCoords;
  }
};


var returnAnnotations = function(xpathStart, xpathEnd, quote, annotation) {

  var xpath = xpathPrefix;

  //Returns an object that parses the xpath coordinates and range of divs
  //xpathCoordinates("/div[248]/p[2]", "/div[250]/p[2]") returns
  //xpathCoords = {"start": [248,2], "end": [250,2], "range":2 }
  var xpathCoords= xpathCoordinates(xpathStart, xpathEnd);
  // console.log xpathCoords  xpathCoords

  if (xpathCoords.range === 0 && xpathCoords.start[1] === xpathCoords.end[1]) {
    console.log("%s only spans one line", quote);

    var selectText = $('body').xpath(xpath + xpathStart)[0].innerHTML;
    // var copySelectText = selectText
    var highlightedText = "<strong><span class='annotated' data='" + annotation + "'>" + quote + "</span></strong>";
    console.log(selectText);
    $('body').xpath(xpath + xpathStart)[0].innerHTML = selectText.replace(quote, highlightedText);
    return true;

  } else {
     //if the selection spans multiple divs
    console.log("%s spans more than one line", quote);
    var strS, strE = 9

    // var textRange = $('body').xpath("/*//div[position() >=" + xpathCoords.start[0] + "and not(position() > " + xpathCoords.end[0] + ")]");
    if  (xpathCoords.start[1] === 1) {
      strS = 4;
    } else if  (xpathCoords.end[1] === 1) {
      strE = 4
    }

    var startQuote = $('body').xpath(xpath + '/div[' + xpathCoords.start[0] + ']/p[' + xpathCoords.start[1] + ']');  
    var newQuote = "<strong><span class='annotated data'" + annotation + "'>" + quote.slice(0,strS);
    var hightlightText = startQuote[0].innerHTML.replace(quote.slice(0,strS), newQuote );
    console.log(startQuote[0].innerHTML = hightlightText);

    var endQuote = $('body').xpath(xpath + '/div[' + xpathCoords.end[0] + ']/p[' + xpathCoords.end[1] + ']');
    newQuote = quote.slice((quote.length - strE)) + "</span></strong>"
    hightlightText = endQuote[0].innerHTML.replace(quote.slice(0,strE), newQuote );
    console.log(hightlightText, "highlight")
    endQuote[0].innerHTML = hightlightText;
    return true;
  }

};


// returnAnnotations("/div[1]/p[1]", "/div[1]/p[1]","DUKE", "testing 1 2 3");


 
// "Here, again, is the theme of reason or judgment being swayed by love-- 
//Lysander, ironically enough, claims to have it now that he's been bewitched by fairy juice. "
// .match(/[^"](?:\s*)____???___(?:\s*)[^"]/)