const expect = require('chai').expect;
const { utility } = require('../utils/utils');
const { constants } = require('../utils/constants');
const fs = require('fs');

describe('fileRead', function () {
    it('should read file line by line', function () {
       const numberOfLineInTestFile = 4;
       let numberOfLines = utility.fileRead(constants.TEST_FILE).length;
       expect(numberOfLines).to.be.equal(numberOfLineInTestFile);

    });
});


describe('writeToFile', function () {
   it('file should have same content that is to be written', function () {
       const content = "abc";
       utility.writeOutputToFile(content, constants.TESTWRITE_FILE);
       const fileContent = fs.readFileSync(constants.TESTWRITE_FILE, "utf-8");
       expect(fileContent).to.be.equal(content);
   }) ;
});