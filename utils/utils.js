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
    writeOutputToFile: (contents) => {
        fs.writeFile(constants.OUTPUT_FILE, contents, function (err) {
            if (err)
                return console.log(err);
            console.log('Output written to file');
        });
    }
};

module.exports = { utility };