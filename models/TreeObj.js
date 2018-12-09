const { Directory } = require('./directory');
const { Item } = require('./item');

class TreeObj {
    constructor(name) {
        this.name = name;
        this.type = "dir";
        this.children = [];
    }

    /**
     *
     * @param root
     * @param objToAdd
     * @param dest
     * @param order
     * @returns {*}
     * @constructor
     */
    AddObjectByName(root,objToAdd, dest, order) {
        if(root.name === dest) {
            objToAdd.parent = root.name;
            if(order === null) {
                root.children.push(objToAdd);
            } else {
                root.children.splice(order, 0, objToAdd).join();
            }
            return root;
        }
        for (let k = 0;k < root.children.length; k++) {
            this.AddObjectByName(root.children[k], objToAdd, dest, order);
        }
    }

    /**
     *
     * @param parent
     * @param childNameToRemove
     * @returns {*}
     * @constructor
     */
    RemoveObjectByName(parent,childNameToRemove) {
        let self = this;
        parent.children = parent.children
            .filter(function(child){
                return child.name !== childNameToRemove
            })
            .map(function(child){
                return self.RemoveObjectByName(child, childNameToRemove)
            });
        return parent;
    }

    /**
     *
     * @param root
     * @param name
     * @returns {*}
     * @constructor
     */
    GetObjectByName(root, name) {
        if(root.name === name) {
            return root;
        }
        let cacheResult;
        for (let k = 0;k < root.children.length; k++) {
            cacheResult = this.GetObjectByName(root.children[k],name);
            if(cacheResult) {
                cacheResult.idx = k;
                cacheResult.parent = root.name;
                return cacheResult;
            }
        }
        return cacheResult;
    }

    /**
     *
     * @param type
     */
    create(type) {
        if(type instanceof Directory) {
            const temp = {};
            temp["name"] = type.src;
            temp["type"] = "dir";
            temp["children"] = [];
            if(type.src !== null && type.dest === null) {
                this.children.push(temp);
            }

            if(type.src !== null && type.dest !== null) {
                this.AddObjectByName(this, temp, type.dest, null);
            }
        }

        if(type instanceof Item) {
            const temp = {};
            temp["name"] = type.src;
            temp["type"] = "item";
            temp["children"] = [];
            if(type.src !== null && type.dest === null) {
                this.children.push(temp);
            }

            if(type.src !== null && type.dest !== null) {
                this.AddObjectByName(this, temp, type.dest, null);
            }
        }

    }

    /**
     *
     * @param type
     */
    delete(type) {

        if(type instanceof Object) {
            this.RemoveObjectByName(this, type.name);
        }
    }

    /**
     *
     * @param type
     * @param dest
     * @param order
     * @returns {TreeObj}
     */
    move(type, dest, order) {
        if(type instanceof Item && dest instanceof Directory ||
            type instanceof Directory && dest instanceof Directory) {
            let cacheObj = this.GetObjectByName(this, type.src);
            this.RemoveObjectByName(this, cacheObj.name);
            this.AddObjectByName(this,cacheObj, dest.src, null);
            return this;
        }
    }

    /**
     *
     * @param type
     * @param dest
     * @param order
     * @param orderBy
     * @returns {TreeObj}
     */
    moveByOrder(type, dest, order, orderBy) {
        if(type instanceof Item && dest instanceof Directory ||
            type instanceof Directory && dest instanceof Directory) {
            let pos;
            let srcCacheObj = this.GetObjectByName(this, type.src);
            let orderCacheObj = this.GetObjectByName(this, order.src);
            this.RemoveObjectByName(this, srcCacheObj.name);
            if(orderBy === 'after')
                pos = orderCacheObj.idx+1;
            else
                pos = orderCacheObj.idx-1;
            console.log("Pos ",pos);
            this.AddObjectByName(this,srcCacheObj, dest.src, pos);
            return this;
        }
    }
}

module.exports = { TreeObj };