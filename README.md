# damals

Damals (German for _back then_, _at that time_) reports the approximate time ago in words from a specific past date. The project is inspired by Rails' `time_ago_in_words` helper.


## Installation

Install via npm:

```bash
% npm install damals
```


## Usage

The module exports a function which when called expects as sole argument a past date either in form of a JavaSript `Date` object or in form of an integer value holding the number of milliseconds since the Unix epoch. The function returns the approximate time ago in words.

```js
var timeAgo = require('damals');

timeAgo(Date.now())             // => "just now"
timeAgo(new Date())             // => "just now"
timeAgo(new Date("1976-12-10")) // => "about 37 years ago"
```

Side note: The future is now.


## Localization

By default, all output is in English, but you can easily change this. Damals uses the [globalization](https://github.com/martinandert/globalization) package for its translations. You can register new translations for your locale with the `registerTranslations` function:

```js
var translator = require('globalization');
var timeAgo    = require('damals');

translator.registerTranslations(timeAgo.translationScope, 'es', require('./locales/es'));
// or you can call the provided shortcut function which does the same:
timeAgo.registerTranslations('es', require('./locales/es'));

timeAgo(Date.now())   // => "just now"

// invoke this on app initialization or when the user changes her language preference
translator.locale('es');

timeAgo(Date.now())   // => "en este momento"
```

The translation data you provide as last argument to `registerTranslations` must have the same keys as specified in [the English locale file](locales/en.json).


# Built-in Translations

Apart from English, damals comes with built-in support for the German language (see [file](locales/de.json)). This is opt-in, meaning you have to manually register the translation data when needed. Luckily, damals has a helper function for this:

```js
timeAgo.registerBuiltInTranslations('de');

// which is a shortcut for calling
timeAgo.registerTranslations('de', require(damals_package_dir + '/locales/en'))

// which is again a shortcut for calling
translator.registerTranslations(timeAgo.translationScope, 'de', require(damals_package_dir + '/locales/en'))
```

Pull requests which add other locales are welcome.


## Contributing

Here's a quick guide:

1. Fork the repo and `make install`.

2. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `make test`

3. Add a test for your change. Only refactoring and documentation changes require no new tests. If you are adding functionality or are fixing a bug, we need a test!

4. Make the test pass.

5. Push to your fork and submit a pull request.


## Licence

Released under The MIT License.
