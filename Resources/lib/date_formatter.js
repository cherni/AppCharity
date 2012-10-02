DateFormatter = (function() {
  var date = function(date_str, opts) {
    if(!date_str) { return ''; }
    var split_date = date_str.split(/\D/),
        year = split_date[0],
        month = split_date[1]-1,
        day = split_date[2],
        hour = split_date[3],
        min = split_date[4],
        sec = split_date[5],
        parsed_date = new Date(year, month, day, hour, min, sec);

    if(opts && opts.parsed) {
      parsed_date = opts.fb ? Date.parse(parsed_date) : Date.parse(date_str);
    } else if (opts && opts.formatted) {
      parsed_date = opts.fb ? parsed_date.toString().slice(0,10) : date_str.slice(0,10);
    }

    return parsed_date;
	};
	return {date : date};
})();
