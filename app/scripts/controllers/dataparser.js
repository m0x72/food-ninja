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
  console.log("ello", Reciepts);

  var data = Dummyreciept.data;
  //console.log(JSON.stringify(data));
  var parser = function (data) {
    /*
    var pages = data.pages;

    for (p_idx in pages) {

      page = pages[p_idx];

      var textZones = page.textZones;


    }
    */

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

    var Myunicorndata = [];

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
              Myunicorndata.push(product);
            }
          }
        }
      }
    }

    console.log(nr_products);
    Reciepts.addReciept(Myunicorndata);
    return allPars.length;

    /*
      //make unicorns here
      //console.log('my debugs');
      return {
        lines: [ 
          {
            productName: 'Einhornmilch',
            productPrice: '9999999999999.99'
          },
          {
            productName: 'Einhornmilch',
            productPrice: '9999999999999.99'
          }
        ]
      };
      */
    //   return data;
  };
  $scope.parser = parser(data);
});