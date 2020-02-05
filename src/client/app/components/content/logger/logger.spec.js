var loggerService;
describe('logger', function() {

  beforeEach(
    module('blocks.logger')
  );

  beforeEach(inject(function(
    _logger_
  ) {
    loggerService = _logger_;
  }));

  it('should call error function',function(){
    loggerService.error('message','data','title');
  });
  it('should call warning function',function(){
    loggerService.warning('message','data','title');
  });
  it('should call info function',function(){
    loggerService.info('message','data','title');
  });


});
