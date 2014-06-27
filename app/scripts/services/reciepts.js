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

    // inititialization
    var reciepts = loadReciepts();

    // class methods
    return {
      addReciept: function (title, recieptdata) {
        var timestamp = new Date().getTime();
        reciepts[timestamp] = {title: title, data: recieptdata};
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
        var textZones = data.pages[0].textZones;
        var allPars = [];
        for (var t_idx in textZones) {
          var textZone = textZones[t_idx];
          //console.log(textZone);
          var paragraphs = textZone.paragraphs;
          //console.log(paragraphs.length);
          allPars = allPars.concat(paragraphs);
        }
        //return "hello";
        var nr_products = 0;

        var resultdata = [];

        for (var i = 0; i < allPars.length - 1; ++i) {
          for (var j = i + 1; j < allPars.length; ++j) {
            var par1 = allPars[i];
            var par2 = allPars[j];
            if (Math.abs(par1.t - par2.t) <= 2) {
              if (par1.lines.length == 1 && par2.lines.length == 1) {

                /*
                console.log('********************************************');
                console.log(par1.lines[0]);
                console.log(par2.lines[0]);
                console.log('********************************************');
                */
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
                  console.log('********************************************');
                  console.log('[' + l_word + ']');
                  console.log('[' + r_word + ']');
                  console.log('********************************************');
                  nr_products++;
                  /*
                  var name_regex = new RegExp("\D+");
                  var price = new RegExp("([0-9]|,)+");
                  */
                  product.name = l_word;
                  product.price = r_word;
                  resultdata.push(product);
                }
              }
            }
          }
        }
        //console.log(nr_products);
        return resultdata;
      }
    };

  });