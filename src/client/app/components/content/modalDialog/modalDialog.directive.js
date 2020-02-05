(function () {
    'use strict';

    angular
        .module('app.modalDialog')
        .directive('ecbModalDialog', Directive);

    function Directive(ecbModalService) {
        return {
            link: function (scope, element, attrs) {
                if(ecbModalService.hasModal(attrs.id)) {
                    console.error('Duplicate Modal ', attrs.id);
                    return;
                }
                // ensure id attribute exists
                if (!attrs.id) {
                    console.error('modal must have an id');
                    return;
                }

                // move element to bottom of page (just before </body>) so it can be displayed above everything else
                element.appendTo('body');

                // close modal on background click
                if (attrs.closeOnModalClick) {
                    element.on('click', function (e) {
                        var target = $(e.target);
                        if (!target.closest('.ecb-modalDialogBody').length) {
                            scope.$evalAsync(close);
                        }
                    });
                }

                // add self (this modal instance) to the modal service so it's accessible from controllers
                var modal = {
                    id: attrs.id,
                    open: open,
                    close: close
                };
                ecbModalService.add(modal);
            
                // remove self from modal service when directive is destroyed
                scope.$on('$destroy', function() {
                    ecbModalService.remove(attrs.id);
                    element.remove();
                });                

                // open modal
                function open() {
                    element.show();
                    $('body').addClass('ecb-modalDialogOpen');
                }

                // close modal
                function close() {
                    element.hide();
                    $('body').removeClass('ecb-modalDialogOpen');
                }
            }
        };
    }
})();