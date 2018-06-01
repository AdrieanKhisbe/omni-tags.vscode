/* global suite, test */
const { expect } = require('chai');

const { simpleTagRegex, detailTagRegex } = require('../src/omni-tags/tags-definitions')
// Defines a Mocha test suite to group tests of similar kind together
suite("Tags definition", function () {

    suite("simpleTagRegex behave as expected", function () {
        const testMatch = (pattern, negate = false) =>
            test(`simpleTagRegex ${negate ? 'don\'t match' : 'match'} '${pattern}'`, () => {
                expect(pattern)[negate ? 'not' : 'to'].to.match(simpleTagRegex);
            })
        const matchs = [
            '§test', '§test2!', '§test:test', '§test_-_',
            '¤test', '¤test2!', '¤test:test', '¤test_-_',
            '※test', '※test2!', '※test:test', '※test_-_'
        ];
        const dontMatch = ['§test:', '¤test:', '※test:', 'abctest'];

        matchs.map(pattern => testMatch(pattern, false));
        dontMatch.map(pattern => testMatch(pattern, true));
    });

    suite("detailTagRegex behave as expected", function () {
        const testMatch = (pattern, negate = false) =>
            test(`detailTagRegex ${negate ? 'don\'t match' : 'match'} '${pattern}'`, () => {
                try {
                    expect(pattern)[negate ? 'not' : 'to'].to.match(new RegExp(`^${detailTagRegex.source}$`));
                } catch (err) {
                    console.log(new RegExp(`${detailTagRegex.source}`).exec(pattern));
                    throw err;
                }
            })
        const matchs = [
            '§test: abc', '§test2: an: to:', '§test: abc \\\" \\\` \\\'', '§test: abc!',
            '¤test: abc', '¤test2: an: to:', '¤test: abc \\\" \\\` \\\'', '¤test: abc!',
            '※test: abc', '※test2: an: to:', '※test: abc \\\" \\\` \\\'', '※test: abc!'
        ];
        const dontMatch = ['§test:abc', '§test:abc!', '¤test: abc " abc', '※test: abc "', 'abctest'];

        matchs.map(pattern => testMatch(pattern, false));
        dontMatch.map(pattern => testMatch(pattern, true));
    });

});
