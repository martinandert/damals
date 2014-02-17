var assert  = require('assert');
var toDate  = require('to-date');
var timeAgo = require('./');

describe('damals()', function() {
  it('reports the correct time ago in words', function() {
    assert.equal(timeAgo(new Date()),               "just now");
    assert.equal(timeAgo(toDate("0 seconds ago" )), "just now");
    assert.equal(timeAgo(toDate("10 seconds ago")), "just now");
    assert.equal(timeAgo(toDate("11 seconds ago")), "less than 20 seconds ago");
    assert.equal(timeAgo(toDate("19 seconds ago")), "less than 20 seconds ago");
    assert.equal(timeAgo(toDate("20 seconds ago")), "half a minute ago");
    assert.equal(timeAgo(toDate("39 seconds ago")), "half a minute ago");
    assert.equal(timeAgo(toDate("40 seconds ago")), "less than a minute ago");
    assert.equal(timeAgo(toDate("59 seconds ago")), "less than a minute ago");
    assert.equal(timeAgo(toDate("1 minute ago"  )), "one minute ago");
    assert.equal(timeAgo(toDate("2 minutes ago" )), "2 minutes ago");
    assert.equal(timeAgo(toDate("45 minutes ago")), "45 minutes ago");
    assert.equal(timeAgo(toDate("46 minutes ago")), "about one hour ago");
    assert.equal(timeAgo(toDate("90 minutes ago")), "about one hour ago");
    assert.equal(timeAgo(toDate("91 minutes ago")), "about 2 hours ago");
    assert.equal(timeAgo(toDate("24 hours ago"  )), "about 24 hours ago");
    assert.equal(timeAgo(toDate("25 hours ago"  )), "about one day ago");
    assert.equal(timeAgo(toDate("42 hours ago"  )), "about one day ago");
    assert.equal(timeAgo(toDate("43 hours ago"  )), "2 days ago");
    assert.equal(timeAgo(toDate("25 days ago"   )), "25 days ago");
    assert.equal(timeAgo(toDate("26 days ago"   )), "about one month ago");
    assert.equal(timeAgo(toDate("40 days ago"   )), "about one month ago");
    assert.equal(timeAgo(toDate("61 days ago"   )), "2 months ago");
    assert.equal(timeAgo(toDate("365 days ago"  )), "12 months ago");
    assert.equal(timeAgo(toDate("366 days ago"  )), "about one year ago");
    assert.equal(timeAgo(toDate("500 days ago"  )), "over one year ago");
    assert.equal(timeAgo(toDate("700 days ago"  )), "almost 2 years ago");
    assert.equal(timeAgo(toDate("2 years ago"   )), "about 2 years ago");
    assert.equal(timeAgo(toDate("900 days ago"  )), "over 2 years ago");
    assert.equal(timeAgo(toDate("1050 days ago" )), "almost 3 years ago");
    assert.equal(timeAgo(toDate("3 years ago"   )), "about 3 years ago");

    // the future is now
    assert.equal(timeAgo(toDate("42 seconds from now" )), "just now");
    assert.equal(timeAgo(toDate("42 hours from now"   )), "just now");

    // you can also provide the number of milliseconds since 1970/01/01
    assert.equal(timeAgo(Date.now()), "just now");
  });

  describe('with custom configuration', function() {
    beforeEach(function() {
      timeAgo.configure({
        translations: {
          en: { about_one_month: "one moon has since then passed" },
          de: { about_one_month: "vor ungefähr einem Monat" }
        }
      });
    });

    afterEach(function() {
      timeAgo.configure(timeAgo.defaults);
    });

    it('still reports the correct time ago in words', function() {
      assert.equal(timeAgo(toDate("42 days ago")), "one moon has since then passed");
      assert.equal(timeAgo(toDate("42 days ago"), { locale: "en" }), "one moon has since then passed");
      assert.equal(timeAgo(toDate("42 days ago"), { locale: "de" }), "vor ungefähr einem Monat");
    });
  });
});
