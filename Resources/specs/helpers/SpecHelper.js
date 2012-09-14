isIPhone = true;
isAndroid = false;
isMobileweb = true;

Settings = {};

require('../factory_definitions');

Factory = function(name, props) {
	props = (props || {});
	var obj = FactoryDefinitions[name](props);
	obj.id = (obj.id || (Factory.id+=1));
	return obj;
}
Factory.id = 0;

notBlank = id;
extractText = compose(join(','), filter(notBlank), map(or('.text', '.title')), '.children');

expectThreaded = function(expectation, wait_time) {
	wait_time = (wait_time || 50);
	
	var fullExpectation = function() {
		expectation();
		asyncSpecDone();
	}

	setTimeout(fullExpectation, wait_time);
	asyncSpecWait();
}

thread = function(f){
  f();
}

// make syncronous for tests
map_p = defn(function(f, cb, xs) {
  compose(cb, map(f))(xs);
});


sleep = function(millis) {
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
}

jasmineAuthenticateUser = function(user) {
  return function(cb, params) {
    if(params.username == 'test' && params.password == 'test') {
      cb({ data: user, status: "SUCCESS", msg: "" });
    } else {
      cb({status: "FAILURE", msg: "Wrong username and/or password"});
    }
  }
}

withTimeFrozenAt = function(time, fn){
  describe('with time frozen at ' + time, function() {
    var oldDate = Date;

    beforeEach( function() {
      Date = function() {
        return new oldDate(time);
      };
    });

    afterEach(function() {
      Date = oldDate;
    });

    fn();
  });
};