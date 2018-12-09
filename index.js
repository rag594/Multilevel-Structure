const  { utility } = require('./utils/utils');
const { constants }  = require('./utils/constants');
const { Directory } = require('./models/directory');
const { Item } = require('./models/item');
const { TreeObj } = require('./models/TreeObj');
const { performance } = require('perf_hooks');

let commands = utility.fileRead(constants.INPUT_FILE);
let treeObj = new TreeObj("root");
let t0 = performance.now();
for(let i = 0;i < commands.length;i++) {
    let commandParams = commands[i].split(" ");
    if(commandParams.length === 3) {
        switch (commandParams[0]) {
            case "create":
                if(commandParams[1] === 'dir') {
                    let directory = new Directory(commandParams[2], null);
                    treeObj.create(directory);
                } else {
                    let item = new Item(commandParams[2],null);
                    treeObj.create(item);
                }
                break;
            case "delete":
                if(commandParams[1] === 'dir' || commandParams[1] === 'item') {
                    let item = treeObj.GetObjectByName(treeObj, commandParams[2]);
                    if(item)
                        treeObj.delete(item);
                    else
                        console.log("can't delete");
                }
                break;
        }
    }
    if(commandParams.length === 4) {
        let obj = treeObj.GetObjectByName(treeObj, commandParams[3]);
        switch (commandParams[0]) {
            case "create":
                if(commandParams[1] === 'dir') {
                    if(obj && obj.type === 'dir') {
                        let directory = new Directory(commandParams[2], commandParams[3]);
                        treeObj.create(directory);
                    } else {
                        console.log(commandParams[3]," is not a directory");
                    }
                } else {
                    if(obj && obj.type === 'dir') {
                        let item = new Item(commandParams[2], commandParams[3]);
                        treeObj.create(item);
                    } else {
                        console.log(commandParams[3]," is not a directory");
                    }
                }
                break;
            case "move":
                let srcObj = treeObj.GetObjectByName(treeObj, commandParams[2]);
                if(commandParams[1] === 'dir') {
                    if(srcObj && obj && obj.type === 'dir' && srcObj.type === 'dir') {
                        let directoryA = new Directory(commandParams[2],null);
                        let directoryB = new Directory(commandParams[3],null);
                        treeObj = treeObj.move(directoryA, directoryB);
                    } else {
                        console.log(commandParams[3]," is not a directory");
                    }
                } else {
                    if(srcObj && obj && obj.type === 'dir' && srcObj.type === 'item') {
                        let item = new Item(commandParams[2], null);
                        let directory = new Directory(commandParams[3], null);
                        treeObj = treeObj.move(item, directory);
                    } else {
                        console.log(commandParams[3]," is not a directory");
                    }
                }
                break;

        }
    }
    if(commandParams.length === 6) {
        let obj = treeObj.GetObjectByName(treeObj, commandParams[3]);
        let srcObj = treeObj.GetObjectByName(treeObj, commandParams[2]);
        if(commandParams[1] === 'item') {
            if(srcObj && obj && obj.type === 'dir' && srcObj.type === 'item') {
                let itemA = new Item(commandParams[2], null);
                let itemB = new Item(commandParams[5], null);
                let directoryC = new Directory(commandParams[3],null);
                treeObj = treeObj.moveByOrder(itemA, directoryC, itemB, commandParams[4]);
            } else {
                console.log(commandParams[3]," is not a directory");
            }
        } else {
            if(srcObj && obj && obj.type === 'dir' && srcObj.type === 'item') {
                let item = new Item(commandParams[2], null);
                let directory = new Directory(commandParams[3], null);
                treeObj = treeObj.move(item, directory);
            } else {
                console.log(commandParams[3]," is not a directory");
            }
        }
        break;
    }

}

let t1 = performance.now();
console.log("Constructing multilevel structure took " + (t1 - t0) + " milliseconds.");
console.log(JSON.stringify(treeObj));
utility.writeOutputToFile(JSON.stringify(treeObj,null, 4));
