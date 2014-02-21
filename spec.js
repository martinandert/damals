var assert  = require('assert');
var toDate  = require('to-date');
var g11n    = require('globalization');

var timeAgo = require('./');

describe('damals()', function() {
  describe('with default locale (en)', function() {
    it('reports the correct time ago in words', function() {
      assert.equal(timeAgo(new Date()),               'just now');
      assert.equal(timeAgo(toDate('0 seconds ago' )), 'just now');
      assert.equal(timeAgo(toDate('10 seconds ago')), 'just now');
      assert.equal(timeAgo(toDate('11 seconds ago')), 'less than 20 seconds ago');
      assert.equal(timeAgo(toDate('19 seconds ago')), 'less than 20 seconds ago');
      assert.equal(timeAgo(toDate('20 seconds ago')), 'half a minute ago');
      assert.equal(timeAgo(toDate('39 seconds ago')), 'half a minute ago');
      assert.equal(timeAgo(toDate('40 seconds ago')), 'less than a minute ago');
      assert.equal(timeAgo(toDate('59 seconds ago')), 'less than a minute ago');
      assert.equal(timeAgo(toDate('1 minute ago'  )), 'one minute ago');
      assert.equal(timeAgo(toDate('2 minutes ago' )), '2 minutes ago');
      assert.equal(timeAgo(toDate('44 minutes ago')), '44 minutes ago');
      assert.equal(timeAgo(toDate('45 minutes ago')), 'about one hour ago');
      assert.equal(timeAgo(toDate('89 minutes ago')), 'about one hour ago');
      assert.equal(timeAgo(toDate('90 minutes ago')), 'about 2 hours ago');
      assert.equal(timeAgo(toDate('23 hours ago'  )), 'about 23 hours ago');
      assert.equal(timeAgo(toDate('24 hours ago'  )), 'one day ago');
      assert.equal(timeAgo(toDate('41 hours ago'  )), 'one day ago');
      assert.equal(timeAgo(toDate('42 hours ago'  )), '2 days ago');
      assert.equal(timeAgo(toDate('29 days ago'   )), '29 days ago');
      assert.equal(timeAgo(toDate('30 days ago'   )), 'about one month ago');
      assert.equal(timeAgo(toDate('59 days ago'   )), 'about 2 months ago');
      assert.equal(timeAgo(toDate('60 days ago'   )), '2 months ago');
      assert.equal(timeAgo(toDate('364 days ago'  )), '12 months ago');
      assert.equal(timeAgo(toDate('365 days ago'  )), 'about one year ago');
      assert.equal(timeAgo(toDate('500 days ago'  )), 'over one year ago');
      assert.equal(timeAgo(toDate('700 days ago'  )), 'almost 2 years ago');
      assert.equal(timeAgo(toDate('2 years ago'   )), 'about 2 years ago');
      assert.equal(timeAgo(toDate('900 days ago'  )), 'over 2 years ago');
      assert.equal(timeAgo(toDate('1050 days ago' )), 'almost 3 years ago');
      assert.equal(timeAgo(toDate('3 years ago'   )), 'about 3 years ago');

      // the future is now
      assert.equal(timeAgo(toDate('42 seconds from now' )), 'just now');
      assert.equal(timeAgo(toDate('42 hours from now'   )), 'just now');

      // you can also provide the number of milliseconds since 1970/01/01
      assert.equal(timeAgo(Date.now()), 'just now');
    });
  });

  describe('with locale set to "de"', function() {
    var previousLocale;

    beforeEach(function() {
      previousLocale = g11n.setLocale('de');
    });

    afterEach(function() {
      g11n.setLocale(previousLocale);
    });

    it('still reports the correct time ago in words', function() {
      timeAgo.registerTranslations('de', require('globalization/locales/de'));
      timeAgo.registerTranslations('de', require('./locales/de'));

      assert.equal(timeAgo(new Date()),               'gerade eben');
      assert.equal(timeAgo(toDate('0 seconds ago' )), 'gerade eben');
      assert.equal(timeAgo(toDate('10 seconds ago')), 'gerade eben');
      assert.equal(timeAgo(toDate('11 seconds ago')), 'vor weniger als 20 Sekunden');
      assert.equal(timeAgo(toDate('19 seconds ago')), 'vor weniger als 20 Sekunden');
      assert.equal(timeAgo(toDate('20 seconds ago')), 'vor einer halben Minute');
      assert.equal(timeAgo(toDate('39 seconds ago')), 'vor einer halben Minute');
      assert.equal(timeAgo(toDate('40 seconds ago')), 'vor weniger als einer Minute');
      assert.equal(timeAgo(toDate('59 seconds ago')), 'vor weniger als einer Minute');
      assert.equal(timeAgo(toDate('1 minute ago'  )), 'vor einer Minute');
      assert.equal(timeAgo(toDate('2 minutes ago' )), 'vor 2 Minuten');
      assert.equal(timeAgo(toDate('44 minutes ago')), 'vor 44 Minuten');
      assert.equal(timeAgo(toDate('45 minutes ago')), 'vor ca. einer Stunde');
      assert.equal(timeAgo(toDate('89 minutes ago')), 'vor ca. einer Stunde');
      assert.equal(timeAgo(toDate('90 minutes ago')), 'vor ca. 2 Stunden');
      assert.equal(timeAgo(toDate('23 hours ago'  )), 'vor ca. 23 Stunden');
      assert.equal(timeAgo(toDate('24 hours ago'  )), 'gestern');
      assert.equal(timeAgo(toDate('41 hours ago'  )), 'gestern');
      assert.equal(timeAgo(toDate('42 hours ago'  )), 'vor 2 Tagen');
      assert.equal(timeAgo(toDate('29 days ago'   )), 'vor 29 Tagen');
      assert.equal(timeAgo(toDate('30 days ago'   )), 'vor ca. einem Monat');
      assert.equal(timeAgo(toDate('59 days ago'   )), 'vor ca. 2 Monaten');
      assert.equal(timeAgo(toDate('60 days ago'   )), 'vor 2 Monaten');
      assert.equal(timeAgo(toDate('364 days ago'  )), 'vor 12 Monaten');
      assert.equal(timeAgo(toDate('365 days ago'  )), 'vor ca. einem Jahr');
      assert.equal(timeAgo(toDate('500 days ago'  )), 'vor über einem Jahr');
      assert.equal(timeAgo(toDate('700 days ago'  )), 'vor fast 2 Jahren');
      assert.equal(timeAgo(toDate('2 years ago'   )), 'vor ca. 2 Jahren');
      assert.equal(timeAgo(toDate('900 days ago'  )), 'vor über 2 Jahren');
      assert.equal(timeAgo(toDate('1050 days ago' )), 'vor fast 3 Jahren');
      assert.equal(timeAgo(toDate('3 years ago'   )), 'vor ca. 3 Jahren');

      // the future is now
      assert.equal(timeAgo(toDate('42 seconds from now' )), 'gerade eben');
      assert.equal(timeAgo(toDate('42 hours from now'   )), 'gerade eben');

      // you can also provide the number of milliseconds since 1970/01/01
      assert.equal(timeAgo(Date.now()), 'gerade eben');
    });
  });
});
