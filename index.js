"use strict";

var extend   = require("extend");
var defaults = require("./defaults");
var config   = extend({}, defaults);

function configure(options) {
  return extend(true, config, options);
}

function damals(date, options) {
  options = extend(true, {}, config, options);

  var tx   = options.translations[options.locale];
  var now  = Date.now();
  var then = typeof date === "number" ? date : date.getTime();

  // the future is now
  then = Math.min(then, now);

  var min = Math.round((now - then) / 60000.0);
  var sec = Math.round((now - then) / 1000.0);

  switch (true) {
    case (min < 2):
      switch (true) {
        case (sec <= 10):
          return tx.just_now;
        case (sec < 20):
          return tx.less_than_x_seconds.replace(/%x/, 20);
        case (sec < 40):
          return tx.half_a_minute;
        case (sec < 60):
          return tx.less_than_one_minute;
        default:
          return tx.one_minute;
      }
      break;
    case (min <= 45):
      return tx.x_minutes.replace(/%x/, min);
    case (min <= 90):
      return tx.about_one_hour;
    case (min <= 1440): // 24 hours
      return tx.about_x_hours.replace(/%x/, Math.round(min / 60.0));
    case (min <= 2520): // 42 hours
      return tx.about_one_day;
    case (min <= 36000): // 25 days
      return tx.x_days.replace(/%x/, Math.round(min / 1440.0));
    case (min <= 86400): // 60 days
      var months = Math.round(min / 43200.0);

      if (months == 1) {
        return tx.about_one_month;
      } else {
        return tx.about_x_months.replace(/%x/, Math.round(min / 43200.0));
      }
      break;
    case (min <= 525600): // 365 days
      return tx.x_months.replace(/%x/, Math.round(min / 43200.0));
    default:
      var remainder = min % 525600;
      var years = Math.floor(min / 525600);

      if (remainder < 131400) {
        if (years == 1) {
          return tx.about_one_year.replace(/%x/, years);
        } else {
          return tx.about_x_years.replace(/%x/, years);
        }
      } else if (remainder < 394200) {
        if (years == 1) {
          return tx.over_one_year.replace(/%x/, years);
        } else {
          return tx.over_x_years.replace(/%x/, years);
        }
      } else {
        return tx.almost_x_years.replace(/%x/, years + 1);
      }
  }
}

module.exports            = damals;
module.exports.configure  = configure;
module.exports.defaults   = defaults;
