  var extractXpathDivInfo = function(start, end) {
    var divNums = [];
    var divEnd = start.search(']');
    var divNumStart = start.slice(5,divEnd);
    divNums.push(divNumStart);

    divEnd = end.search(']');
    divNumEnd = end.slice(5, divEnd);
    divNums.push(divNumEnd);

    var divRange = divNumEnd - divNumStart;
    divNums.push(divRange);

    if (divNums.length < 2) {
      console.log("error parsing divs for %s and %s", start, end);
    } else {
      return divNums;
    }
  };

  // var highlight = function (element, start, end) { 
  //   var str = element.innerHTML;
  //   str = str.substr(0, start) +
  //   '<span class="hilite" style="color:red">' + 
  //   str.substr(start, end - start + 1) +
  //   '</span>' +
  //   str.substr(end + 1);
  //   element.innerHTML = str;
  // }

    var extractXpathPInfo = function(start, end) {
      var pNums = [];
      var firstP = start.search('p');
      pNums.push(start.slice(firstP));
      pNums.push(pRawNum(start, firstP));
      
      var lastP = end.search('p');
      pNums.push(end.slice(lastP));
      pNums.push(pRawNum(end, lastP));

      // console.log(pNums, "pnum");
      return pNums
    };

    var pRawNum = function(path, num) {
      var rawNum = path.slice((num + 2), (num + 3));
        // console.log(rawNum, "rawNum");
      return (rawNum);
    };

    var formatXpathsArray = function(xpathStart, xpathEnd, divNums) {
      var xpathArray = [];
      // console.log(divNums[1], 'divNums');

      var startLoop = parseInt(divNums[0]);
      var endLoop = parseInt(divNums[1]);

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
    console.log('running');
    
    // returns an array that follows this format [startingDiv, endingDiv, divRange]
    var divNums = extractXpathDivInfo(xpathStart, xpathEnd);
    // console.log(divNums);

    if(divNums[2] === 0) {

      var selectNode = $('body').xpath('/' + xpathStart); 
      // console.log('selectedNode: ', selectNode);

      var selectText = selectNode[0].innerHTML;

      // console.log(selectText, 'selectedText');

      var charStart = selectText.search(quote); //add regex
      var charEnd = charStart + quote.length;
      var highlightedText = "<strong><span class='annotated' data='"+ annotation + "'>" + quote + "</span></strong>"

      var newText = selectText.replace(quote, highlightedText);
      console.log(newText);

      selectNode[0].innerHTML = newText;

      // console.log(charEnd, "quote.length");
      // var test = selectNode[0].replaceData(charStart, charEnd, "YES");
      // document.write(test.nodeValue);

      // selectText.slice(charStart, charEnd).bold();

      return true;

      // highlight(selectNode, charStart, charEnd);

    } else { //if the selection spans multiple divs
       return returnMultilineAnnotations(xpathStart, xpathEnd, quote, divNums)

    }
      // return textConcat
  };

    var returnMultilineAnnotations = function(xpathStart, xpathEnd, quote, divNums) {

      var formatInfo = formatXpathsArray(xpathStart, xpathEnd, divNums);
      var xpathArray = formatInfo.xpaths;
      var countFirstP = formatInfo.pInfo[1];
      var countLastP = formatInfo.pInfo[3];
      var xpathCount = formatInfo.xpaths.length
      // console.log(xpathCount);

      var nodeArray = []

      for (var i = 0; i < xpathCount; i++) {
        console.log("processing node %d", i)
        nodeArray.push($('body').xpath(xpathArray[i]));

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

    returnAnnotations("/div[1]/p[1]", "/div[1]/p[1]","DUKE");
     
