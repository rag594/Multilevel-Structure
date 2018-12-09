const fs  = require('fs');
const { constants } = require("./constants");

let utility = {
    /**
     *
     * @param filePath
     * @returns {string[]}
     */
    fileRead: (filePath) => {
        return fs.readFileSync(filePath,"utf-8").split("\n").filter(Boolean);
    },

    /**
     *
     * @param contents
     */
    writeOutputToFile: (contents, filePath) => {
        fs.writeFileSync(filePath, contents);
    }
};

module.exports = { utility };