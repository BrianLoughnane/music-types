describe('keyboardData', function() {
	beforeEach(module('myApp'));

	it('should return an array', 
	inject(function (keyboardData) {
		expect(Array.isArray(keyboardData)).toBe(true);
	}));

	it('array should have 5 objects', 
	inject(function (keyboardData) {
		expect(keyboardData.length).toEqual(5);
	}));

	it('objects should have properties "rowNumber" and "keys"',
	inject(function (keyboardData) {
		keyboardData.forEach(function (row) {
			expect(row.hasOwnProperty('rowNumber')).toBe(true);
			expect(row.hasOwnProperty('keys')).toBe(true);
		});
	}));
})