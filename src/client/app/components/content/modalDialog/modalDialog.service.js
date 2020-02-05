/**
 * @DevContact : Keshab
 * This is a common Dialog is opened with calling open method and is closed by calling close method
 */
(function () {
    'use strict';

    angular
        .module('app.modalDialog')
        .factory('ecbModalService', Service);

    function Service() {
        var modals = [];
        var service = {};

        service.add = add;
        service.remove = remove;
        service.open = open;
        service.close = close;
        service.hasModal = hasModal

        return service;

        function add(modal) {
            // add modal to array of active modals
            modals.push(modal);
        }
        
        function remove(id) {
            var modalToRemoveIndex = null;
            modals.forEach(function(modal, index) {
                if(modal.id == id){
                    modalToRemoveIndex = index;
                }
            });
            modals.splice(modalToRemoveIndex, 1);
        }

        function open(id) {
            modals.forEach(function(modal) {
               if(modal.id == id){
                modal.open();
               }
            });
        }

        function close(id) {
            modals.forEach(function(modal) {
                if(modal.id == id){
                 modal.close();
                }
            });
        }

        function hasModal(id) {
            var hasModal = false;
            modals.forEach(function(modal) {
                if(modal.id == id){
                    hasModal = true;
                }
            });
            return hasModal;
        }
    }
})();

