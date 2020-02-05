describe('Controller', function() {
    var expect = chai.expect,
        localeSelectorService,
        $rootScope,
        $controller,
        Controller,
        $scope,
        createController;

    beforeEach(function() {
        module('blocks.translator');
    });

    beforeEach(inject(function(
        _$rootScope_,
        _$controller_,
        _localeSelectorService_) {
        $scope = _$rootScope_.$new();
        $controller = _$controller_;
        localeSelectorService = _localeSelectorService_;

        createController = function() {
            return $controller('Controller', {
                '$scope': $scope
            });
        }

    }));

    it('Controller should be defined', function() {
        localeController = createController();
        expect(localeController).to.exist;
    });

    it('should call isSelected method', function() {
        localeController.isSelected('en');
    });

    it('should call checkIfEnterKeyWasPressed method', function() {
        localeController.checkIfEnterKeyWasPressed('', 'en');
    });
});
