import('chai').then(chai => {
    const assert = chai.assert;

    describe('check chai 1', function () {
        let age = 25;
        it('check the type of age', function () {
            assert.typeOf(age, 'number');
        })
    })

    describe('check chai 2', function () {
        let username = "Aakash Gautam";

        it('check the value', function () {
            assert.typeOf(username, 'string');
        });
    });


});