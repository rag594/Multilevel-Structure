const fs  = require('fs');
const { constants } = require("./constants");

let utility = {
    str:"",
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
    writeOutputToFile: (content, filePath) => {
        utility.str= "";
        utility.printJSON(content,0);
        fs.writeFileSync(filePath, utility.str);
    },
    getIndentString: function (indent) {
        var str="";
        for (var i = 0; i < indent; i++) {
            str+="|  ";
        }
        return str;
    },
    printJSON: function(root,indent) {
        utility.str+=utility.getIndentString(indent)+"+--"+root.name+"/"+"\n";
        for(var i in root.children) {
            if(root.children[i].type === "dir")
                utility.printJSON(root.children[i], indent+1);
            else
                utility.str+=utility.getIndentString(indent+1)+"+--"+root.children[i].name+"\n";
        }
    }
};

module.exports = { utility };