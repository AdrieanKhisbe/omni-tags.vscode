/* global suite, test */
const { expect } = require('chai');

const { simpleTagRegex } = require('../src/omni-tags/tags-definitions')
// Defines a Mocha test suite to group tests of similar kind together
suite("Tags definition", function () {

    suite("simpleTagRegex behave as expected", function () {
        const testMatch = (pattern, negate = false) =>
            test(`simpleTagRegex ${negate ? 'don\'t match' : 'match'} '${pattern}'`, () => {
                expect(pattern)[negate ? 'not' : 'to'].to.match(simpleTagRegex);
            })
        const matchs = ['§test', '§test2!', '§test:test', '§test_-_'];
        const dontMatch = ['§test:', 'abctest'];
        matchs.map(pattern => testMatch(pattern, false));
        dontMatch.map(pattern => testMatch(pattern, true));
    });
    
});