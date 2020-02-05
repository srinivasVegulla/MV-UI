describe('localeSelectorService', function() {
    var expect = chai.expect,
        localeSelectorService,
        $httpBackend;

    beforeEach(function() {
        module('blocks.translator');
    });

    beforeEach(inject(function(
        _localeSelectorService_,
        _$httpBackend_) {

        localeSelectorService = _localeSelectorService_;
        $httpBackend = _$httpBackend_;

        $httpBackend
            .when('GET', '/static/default/localeConfig/localeSelector.json')
            .respond({});

    }));

    it('localeSelectorService should be defined', function() {
        expect(localeSelectorService).to.exist;
    });

    it('should resolve getLocaleFlagsData', function() {

        $httpBackend.expectGET('/static/default/localeConfig/localeSelector.json')
            .respond({});

        localeSelectorService.getLocaleFlagsData().then(function(res) {
            expect(res).to.be.defined;
        });

        $httpBackend.flush();
    });

});
