'use strict';

/**
 * @ngdoc service
 * @name foodNinjaApp.Reciepts
 * @description
 * # Reciepts
 * Service in the foodNinjaApp.
 */
angular.module('foodNinjaApp')
  .factory('Reciepts', function Reciepts($window) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var getLines = function (data) {
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

    var unifyLines = function (lines) {
      var ls = []
      var len = lines.length;
      var tiny = 2;
      var used = new Array(len);
      for (var i = 0; i < len; ++i)
        used[i] = false;
      for (var i = 0; i < len - 1; ++i) {
        if (!used[i]) {
          var same_line = [];
          same_line.push(lines[i]);
          //console.log("same_line", same_line);
          for (var j = i + 1; j < len; ++j) {
            if (!used[j]) {
              var line1 = lines[i];
              var line2 = lines[j];

              //check if the two lines approx. on same level
              if (Math.abs(line1.t - line2.t) <= tiny) {
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

    var getWordsByLine = function (lines) {

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
    var getProducts = function (words_by_line) {

      var prods = [];

      for (var wd_idx in words_by_line) {

        var str = words_by_line[wd_idx];
        console.log("str", str);

        var price = "";
        var name = "";

        //strip numbers at the beginning
        var init_nr = /^[0-9]*\s+/.exec(str);
        if (null != init_nr) {
          str = str.substring(init_nr[0].length);
        }

        //get price v2
        var price_match = /\s([0-9]+,[0-9]+)\s*(A|B|EUR)*$/i.exec(str);
        if (null != price_match) {
          price = price_match[1];
          str = str.substring(0, price_match.index);
          name = str;

          if (name != "") {
            //after Summe, there are no products bought to consider anymore
            //* Zu zahlen   LIDL Kassenbon
            var product = {
              "name": name,
              "price": price
            };
            prods.push(product);
            if (null != /(summe|zahlen)/gi.exec(name))
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

    // private parser methods
    
    // private methods
    function loadReciepts() {
      var lSReciepts = $window.localStorage.getItem('reciepts');
      if (!!lSReciepts) {
        return JSON.parse(lSReciepts);
      }
      return {};  
    }

    function _persistToLocalStorage() {
      $window.localStorage.setItem('reciepts', JSON.stringify(reciepts));
    }

    function _hashCode(str) {
      var hash = 0, i, chr, len;
      if (str.length == 0) return hash;
      for (i = 0, len = str.length; i < len; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };

    function productHash(products) {
      var obj = {};
      products.forEach(function(val, ind){
        obj[_hashCode(Math.random().toString())] = val;
      });
      return obj;
    };

    // inititialization
    var reciepts = loadReciepts();

    // class methods
    return {
      addReciept: function (giniId, title, products, sum) {
        var timestamp = new Date().getTime();
        reciepts[timestamp] = {giniId: giniId, title: title, products: productHash(products), sum: sum};
        _persistToLocalStorage();
        return timestamp;
      },
      getReciepts: function () {
        return angular.copy(reciepts);
      },
      getReciept: function (id) {
        return angular.copy(reciepts[id]);
      },
      updateReciept: function(id, recieptdata) {
        reciepts[id] = recieptdata;
        _persistToLocalStorage();
      },
      parseReciept: function (data) {
        var ls = getLines(data);
        //console.log("lines", ls);

        ls = unifyLines(ls);
        //console.log("unified at last", ls);

        var words_by_line = getWordsByLine(ls);
        //console.log("words by line", words_by_line);

        var products = getProducts(words_by_line);
        //console.log("products", products);
        return products;
      }
    };

  });