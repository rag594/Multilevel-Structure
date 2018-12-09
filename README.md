# Multilevel-Structure
### Prerequisites
```NodeJs```

### Setup
``` git clone https://github.com/rag594/Multilevel-Structure.git ```

``` npm install ```

### Tests
``` npm test ```

### Description

1. Entry point is ```index.js```
2. ```files``` directory contains:
   1. ```input.txt``` file where the input should be given.
   2. ```output.txt``` file where the ouput will be written to.
   other files are for testing purpose.
3. To run the code, copy your input to ```input.txt```:
   * run ```node index.js```


### Output
```json
{
    "name": "root",
    "type": "dir",
    "children": [
        {
            "name": "fruits",
            "type": "dir",
            "children": [
                {
                    "name": "green",
                    "type": "dir",
                    "children": [
                        {
                            "name": "avacado",
                            "type": "item",
                            "children": [],
                            "parent": "green"
                        }
                    ],
                    "parent": "fruits",
                    "idx": 0
                }
            ],
            "parent": "root",
            "idx": 0
        }
    ]
}
```
### Explaination
##### Output sample refrence can be taken from above.For each item or directory, following data structure is used:
```
1. name: The name of the item or directory.
2. type: Directory or item
3. children: Array of children for the corresponding type
4. parent: Parent for the child```
