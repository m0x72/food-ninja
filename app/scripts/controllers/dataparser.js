'use strict';

/**
 * @ngdoc function
 * @name foodNinjaApp.controller:DataparserCtrl
 * @description
 * # DataparserCtrl
 * Controller of the foodNinjaApp
 */
angular.module('foodNinjaApp').controller('DataparserCtrl', function ($scope, Dummyreciept, Reciepts) {
  //leave awesomethings here! :)
  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

  var data = Dummyreciept.data;

  var getLines = function(data) {
  var ls = [];

  var pages = data.pages;  
//console.log("#pages",pages.length);
  for (var pag_idx in pages) {
    var page = pages[pag_idx];
//console.log("page",page);
    var textZones = page.textZones;
//console.log("textZones",textZones);
    for (var tZ_idx in textZones) {
      var textZone = textZones[tZ_idx];
      var paragraphs = textZone.paragraphs;
//console.log("textZone",textZone);
//console.log("paragraphs",paragraphs);
      for (var par_idx in paragraphs) {
        var paragraph = paragraphs[par_idx];
//console.log("paragraph",paragraph);
        var lines = paragraph.lines;
//console.log("lines",lines);
        for (var lin_idx in lines) {
          var line = lines[lin_idx];
//console.log("line",line);
          ls.push(line);
        }
      }
    }
  }

  return ls;
}

var unifyLines = function(lines) {
  var ls = []
  var len = lines.length;
  var tiny = 2;
  var used = new Array(len);
  for(var i=0; i<len; ++i)
    used[i] = false;
  for(var i=0; i<len-1; ++i) {
    if(!used[i]) {
      var same_line = [];
      same_line.push(lines[i]);
//console.log("same_line", same_line);
      for(var j=i+1; j<len; ++j) {
          if(!used[j]) {
            var line1 = lines[i];
            var line2 = lines[j];

            //check if the two lines approx. on same level
            if(Math.abs(line1.t-line2.t) <= tiny) {
              same_line.push(line2);
              used[i] = true;
              used[j] = true;
            }
          }
      }
    ls.push(same_line);
    }
    //moved from here
  }
 return ls;
}

var getWordsByLine = function(lines) {

// lines = [ [] ]
  var ws = [];

  for (var same_lin_idx in lines) {
    var same_lines = lines[same_lin_idx];
    var words = "";
    for (var lin_idx in same_lines) {
      var line = same_lines[lin_idx];
      var wds = line.wds;
      for (var w_idx in wds) {
        var word = wds[w_idx];
        words += ' ' + word.text;
      }
    }
    words = words.trim();
    ws.push(words);
  }
  return ws;
}


//take only (EUR, SUMME) part.
//not urgent
var getProducts = function(words_by_line) { 

  var prods = [];

  for (var wd_idx in words_by_line) {

    var str = words_by_line[wd_idx];
    console.log("str", str);

    var price = "";
    var name = "";

    //strip numbers at the beginning
    var init_nr = /^[0-9]*\s+/.exec(str);
    if(null != init_nr) {
      str = str.substring(init_nr[0].length);
    }

    //get price v2
    var price_match = /\s([0-9]+,[0-9]+)\s*(A|B|EUR)*$/i.exec(str);
    if(null != price_match) {
      price = price_match[1];
      str = str.substring(0,price_match.index);
      name = str;

      if(name != "") {
      //after Summe, there are no products bought to consider anymore
      //* Zu zahlen   LIDL Kassenbon
        var product = {
        "name" : name,
        "price": price
      };
        prods.push(product);
        if(null != /(summe|zahlen)/gi.exec(name))
          return prods;
      }
    }
/*
    //get price v1
    var price_match = /\s[0-9]+,[0-9]+\s/i.exec(str);
    if(null != price_match) {
      price = price_match[0];
      str = str.substring(0,price_match.index);
      name = str;

      if(name != "") {
        var product = {
        "name" : name,
        "price": price
      };
        prods.push(product);
      }
    }
*/
  }
  return prods;
}





  var ls = getLines(data);
  console.log("lines",ls);

  ls = unifyLines(ls);
  console.log("unified at last", ls);

  var words_by_line = getWordsByLine(ls);
  console.log("words by line", words_by_line);

  var products = getProducts(words_by_line);
  console.log("products", products);  

  var parser = function (data) {
    
    var textZones = data.pages[0].textZones;
    var allPars = [];
    for (var t_idx in textZones) {
      var textZone = textZones[t_idx];
      ////console.log(textZone);
      var paragraphs = textZone.paragraphs;
      ////console.log(paragraphs.length);
      allPars = allPars.concat(paragraphs);
    }
    //return "hello";
    var nr_products = 0;

    var Myunicorndata = [];

    for (var i = 0; i < allPars.length - 1; ++i) {
      for (var j = i + 1; j < allPars.length; ++j) {
        var par1 = allPars[i];
        var par2 = allPars[j];
        if (Math.abs(par1.t - par2.t) <= 2) {
          if (par1.lines.length == 1 && par2.lines.length == 1) {

    
//      //console.log('********************************************');
//      //console.log(par1.lines[0]);
//      //console.log(par2.lines[0]);
//      //console.log('********************************************');
      
            var l_word = "";
            var r_word = "";

            var l1 = par1.lines[0];
            var l2 = par2.lines[0];

            for (var key in l1.wds) {
              var word = l1.wds[key];
              l_word += ' ' + word.text;
            }
            var price = "";
            for (var key in l2.wds) {
              var word = l2.wds[key];
              r_word += ' ' + word.text;
            }
            var l_regex = new RegExp("\s*[0-9]+", "ig");

            var product = {

              "name": "",
              "price": 0
            };

            if (r_word[r_word.length - 1] == 'A' && l_word.match(l_regex) != null) {
/*
              //console.log('********************************************');
              //console.log('[' + l_word + ']');
              //console.log('[' + r_word + ']');
              //console.log('********************************************');
*/
              nr_products++;
              
//      var name_regex = new RegExp("\D+");
//      var price = new RegExp("([0-9]|,)+");

              product.name = l_word;
              product.price = r_word;
              Myunicorndata.push(product);
            }
          }
        }
      }
    }

//    //console.log(nr_products);
    Reciepts.addReciept(Myunicorndata);
    return allPars.length;

    //   return data;
  };
  $scope.parser = parser(data);

});


