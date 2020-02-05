(function () {
  'use strict';
  angular
    .module('app.utility')
    .directive('fileDownload', Directive);
  
  Directive.$inject = [
  ];

  /* @ngInject */
  function Directive() {
    var directive = {
      restrict:'A',
      scope:{
          fileDownload:'=',
          fileName:'=',
      },
      link:function(scope,elem,atrs){
        scope.$watch('fileDownload',function(newValue, oldValue){
          if(newValue!=undefined && newValue!=null){
              console.debug('Downloading a new file'); 
              var isFirefox = navigator.userAgent.indexOf("Firefox") != -1;
              var isSafari = navigator.userAgent.indexOf("Safari") != -1;
              var isIE = (navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true);
              var isEdge = !isIE && !!window.StyleMedia;
              var isChrome = navigator.userAgent.indexOf("Chrome") != -1;
              var isOpera = (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1;
              //var isBlink = (isChrome || isOpera) && !!window.CSS;
            if (isFirefox || isIE || isChrome || isSafari || isEdge){
              if (isChrome || isSafari){
                  console.log('Manage Google Chrome download');
                  var url = window.URL || window.webkitURL;
                  var fileURL = url.createObjectURL(scope.fileDownload);
                  var downloadLink = angular.element('<a></a>');//create a new  <a> tag element
                  downloadLink.attr('href',fileURL);
                  downloadLink.attr('download',scope.fileName);
                  downloadLink.attr('target','_self');
                  downloadLink[0].click();//call click function
                  url.revokeObjectURL(fileURL);//revoke the object from URL
                }
              if (isIE || isEdge){
                  console.log('Manage IE download>10');
                  window.navigator.msSaveOrOpenBlob(scope.fileDownload,scope.fileName);                  }
              if(isFirefox){
                  console.log('Manage Mozilla Firefox download');
                  var url = window.URL || window.webkitURL;
                  var fileURL = url.createObjectURL(scope.fileDownload);
                  var a=elem[0];//recover the <a> tag from directive
                  a.href=fileURL;
                  a.download=scope.fileName;
                  a.target='_self';
                  a.click();//we call click function
                }
              }else{
                  alert('SORRY YOUR BROWSER IS NOT COMPATIBLE');
              }
          }
        });

      }
    }
    return directive;
  }
})();
