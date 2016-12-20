function Node(data) {
    this.data = data;
    this.sibling = null;
    this.child = null;
}

function Grid(data) {
    var node = new Node(data);
    this._root = node;
}

//Here is an example of a grid

var grid = new Grid('top left');
grid._root.sibling = new Node('second column');
grid._root.sibling.sibling = new Node('third column');
grid._root.child = new Node('second row first column');

//test nodes
// grid._root.child.sibling = new Node('second row second column');
// grid._root.child.child = new Node("third row first column");
// grid._root.child.child.sibling = new Node('third row second column');

// grid._root.child.child.sibling.child = new Node('fourth row second column');
// grid._root.child.child.sibling.child.sibling = new Node('fourth row third column');

grid._root.sibling.sibling.child = new Node('second row third column');

// grid._root.sibling.sibling.child.sibling = new Node('second row forth column');
// grid._root.sibling.sibling.child.child = new Node('third row third column');

var grid = grid._root;
var y = 1,
    x = 1;

var canvas = document.getElementById("render");
var ctx = canvas.getContext("2d");
var path = [];

//constants
var containerWidth = 120,
    containerHeight = 30,
    step = 15;

function render(grid) {

    // console.log(grid);

    //draw node
    ctx.fillStyle = "rgb(0, 191, 255)";
    ctx.fillRect(10 * x, 10 * y, containerWidth, containerHeight);

    //write data of each node
    ctx.fillStyle = "white";
    ctx.font = "11px Arial";
    ctx.fillText(grid.data, 10 * x, 10 * y + 20);

    //change position of the new node
    if (grid.child !== null) {
        //store passed nodes to the array
        path.push({
            data: grid.child.data,
            type: "child"
        });
        //write line
        ctx.moveTo(10 * x + containerWidth / 2, 10 * y + containerHeight);
        ctx.lineTo(10 * x + containerWidth / 2, 10 * (y + step));
        ctx.stroke();

        //move y-coordinate down for drawing the next node
        y += step;

        //recursively run the function with child-node
        render(grid.child);
    }
    if (grid.sibling !== null) {
        //store passed nodes to the array
        path.push({
            data: grid.sibling.data,
            type: "sibling"
        });
        //write line
        ctx.moveTo(10 * x + containerWidth, 10 * y + containerHeight / 2);
        ctx.lineTo(10 * (x + step), 10 * y + containerHeight / 2);
        ctx.stroke();

        //move x-coordinate right for drawing the next node
        x += step;

        //recursively run the function with sibling-node
        render(grid.sibling);
    }

    if (path.length > 0) {
        //Check passed nodes in the path array and delete them. 
        //After that "move back" (change x or y coordinates) if no other child or sibling nodes found
        if (path[path.length - 1]["data"] === grid.data) {
            if (Object.values(path[path.length - 1]).indexOf("child") !== -1) {
                y -= step;
            }
            else if (Object.values(path[path.length - 1]).indexOf("sibling") !== -1) {
                x -= step;
            }
            path.pop();
        }
    }
}

render(grid);
