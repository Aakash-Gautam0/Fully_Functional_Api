var assert = require('assert');
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal([1, 2, 3].indexOf(2), 1);
        });
    });
});

 
describe("mocha test case", function () {
    it("value check 1", function () { 
        assert.equal([1, 2, 3].indexOf(3), 2);
    })
    it("value check 2", function () {
        assert.equal([1, 2, 3].indexOf(2), 1);
    })
})
