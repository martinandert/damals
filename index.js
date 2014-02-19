'use strict';

var translate = require('globalization').translate;
var translationScope = 'damals';

function damals(date) {
  var now  = Date.now();
  var then = typeof date === 'number' ? date : date.getTime();

  // the future is now
  then = Math.min(then, now);

  var minutes = Math.round((now - then) / 60000.0);
  var seconds = Math.round((now - then) / 1000.0);

  return translate.withScope(translationScope, function() {
    switch (true) {
      case (minutes < 2):
        switch (true) {
          case (seconds <= 10):
            return translate('just_now');
          case (seconds < 20):
            return translate('less_than_x_seconds_ago', { count: 20 });
          case (seconds < 40):
            return translate('half_a_minute_ago');
          case (seconds < 60):
            return translate('less_than_x_minutes_ago', { count: 1 });
          default:
            return translate('x_minutes_ago',           { count: 1 });
        }
        break;
      case (minutes < 45): // 2 mins up to 45 mins
        return translate('x_minutes_ago',       { count: minutes });
      case (minutes < 90): // 45 mins up to 90 mins
        return translate('about_x_hours_ago',   { count: 1 });
      case (minutes < 1440): // 90 mins up to 24 hours
        return translate('about_x_hours_ago',   { count: Math.round(minutes / 60.0) });
      case (minutes < 2520): // 24 hours up to 42 hours
        return translate('x_days_ago',          { count: 1 });
      case (minutes < 43200): // 42 hours up to 30 days
        return translate('x_days_ago',          { count: Math.round(minutes / 1440.0) });
      case (minutes < 86400): // 30 days up to 60 days
        return translate('about_x_months_ago',  { count: Math.round(minutes / 43200.0) });
      case (minutes < 525600): // 60 days up to 365 days
        return translate('x_months_ago',        { count: Math.round(minutes / 43200.0) });
      default:
        var remainder = minutes % 525600;
        var years = Math.floor(minutes / 525600);

        if (remainder < 131400) {
          return translate('about_x_years_ago',   { count: years });
        } else if (remainder < 394200) {
          return translate('over_x_years_ago',    { count: years });
        } else {
          return translate('almost_x_years_ago',  { count: years + 1 });
        }
    }
  });
}

function registerTranslations(locale, data) {
  translate.registerTranslations(translationScope, locale, data);
}

function registerBuiltInTranslations(locale) {
  registerTranslations(locale, require('./locales/' + locale));
}

registerBuiltInTranslations('en');

module.exports = damals;
module.exports.translationScope = translationScope;
module.exports.registerTranslations = registerTranslations;
module.exports.registerBuiltInTranslations = registerBuiltInTranslations;
