define([
  'app/helpers/proximity'
],
function (proximity) {
  describe("proximity", function() {
    it("should return the complete array if smaller than three", function() {
      expect(proximity([1], 1)).toEqual([1]);
      expect(proximity([1, 2], 1)).toEqual([1, 2]);
      expect(proximity([1, 2, 3], 1)).toEqual([1, 2, 3]);
    });

    describe("given an array with 10 numbers", function() {
      var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      it("should return an array with the two numbers that are equal or bigger than the reference and one smaller", function() {
        expect(proximity(array, 5)).toEqual([4, 5, 6]);
      });

      it("should return the first three numbers if they all are smaller or equal than the reference", function() {
        expect(proximity(array, 1)).toEqual([1, 2, 3]);
        expect(proximity(array, 2)).toEqual([1, 2, 3]);
      });

      it("should return the last three numbers if they are all smaller than the reference", function() {
        expect(proximity(array, 11)).toEqual([8, 9, 10]);
      });

      it("should return the last three numbers if the last one is equal or bigger that the reference", function() {
        expect(proximity(array, 10)).toEqual([8, 9, 10]);
      });
    });
  });
});
