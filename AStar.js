//This program was inspired by the
//psudoCode in the wikipedia page about
//the A* Algorithm
//Site: https://en.wikipedia.org/wiki/A*_search_algorithm
 
//The set of points currently being or could be evaluated
let openList = []
//The set of points already evaluated
let closedList = []
//Making a 2D Array
let cols = 20
let rows = 20    
let path
 
let grid = new Array(cols)
for(let i = 0; i < cols; i++){
    grid[i] = new Array(rows)
}
//Since the grid array is a reference type with
//the object Point, the properties can
//be altered using different arrays
//without causing any errors
for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
        grid[i][j] = new Point(i,j)
    }
}

let start = grid[Math.round(Math.random()*(cols-1))][Math.round(Math.random()*(rows-1))]
let end = grid[Math.round(Math.random()*(cols-1))][Math.round(Math.random()*(rows-1))]
 
while(Math.abs(Distance(start.i,start.j) - Distance(end.i,end.j)) < 20){
    start = grid[Math.round(Math.random()*(cols-1))][Math.round(Math.random()*(rows-1))]
    end = grid[Math.round(Math.random()*(cols-1))][Math.round(Math.random()*(rows-1))]
}


openList.push(start)

obstacles = []
for(let i = 0; i < 100; i++){
    obstacles.push(grid[Math.round(Math.random()*(rows-1))][Math.round(Math.random()*(cols-1))])
}
for(let i = obstacles.length-1; i >= 0; i--){
    for(let j = 0; j < obstacles.length; j++){
        if(obstacles[i] == obstacles[j] && i != j){
            obstacles[j] = grid[Math.round(Math.random()*(rows-1))][Math.round(Math.random()*(cols-1))]
        }
    }
    if(obstacles[i] == start || obstacles[i] == end){
        obstacles.splice(i)
    }
}

 
 
for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
        grid[i][j].addNeighbors()
    }
}
//The idea of creating an object for each point in a grid
//came from this site https://www.youtube.com/watch?v=aKYlikFAV4k
function Point(i,j){
    this.i = i,
    this.j = j,
    this.f_value = 0,
    this.g_value = 0,
    this.h_value = 0,
    this.neighbors = [],
    //This traces back the pathway from the end 
    //to calculate the optimal pathway
    this.cameFrom = undefined,
    this.addNeighbors = function(){
        if(i < cols - 1)
            this.neighbors.push(grid[i+1][j])
        if(i > 0)
            this.neighbors.push(grid[i-1][j])
        if(j < rows - 1)
            this.neighbors.push(grid[i][j+1])
        if(j > 0)
            this.neighbors.push(grid[i][j-1])
    }
}
function tracePath(){
    for(let a = 0; a < cols; a++){
        for(let b = 0; b < rows; b++){
            for(let c = 0; c < openList.length; c++){
                if(grid[a][b] == path[c]){
                    if(uniquePoints(a,b)){
                        document.getElementById("color" + a + "_" + b).style.backgroundColor = "blue"   
                    }
                    else{
                        document.getElementById("color" + a + b).style.backgroundColor = "blue"
                    }
                }
                if(grid[a][b] == end){
                    if(uniquePoints(a,b)){
                        document.getElementById("color" + a + "_" + b).style.backgroundColor = "blue"   
                    }
                    else{
                        document.getElementById("color" + a + b).style.backgroundColor = "blue"
                    }
                }
            }
        }
    }
}
let loop

function InObstacles(a,b){
    for(let i = 0; i < obstacles.length; i++){
        if(grid[a][b] == obstacles[i]){
            grid[a][b].neighbors = []
            return true
        }
    }
    return false
}
function uniquePoints(a,b){
    if(a == 11 && b >= 0 && b < 10){
        return true
    }
    else{
        return false
    }
}
function Start(){
    for(let a = 0; a < cols; a++){
        for(let b = 0; b < rows; b++){
            if(uniquePoints(a,b)){
                if(grid[a][b] == start){
                    document.getElementById("color" + a + "_" + b).style.backgroundColor = "blue"
                }
                if(grid[a][b] == end){
                    document.getElementById("color" + a + "_" + b).style.backgroundColor = "yellow"
                }
                if(InObstacles(a,b)){
                    document.getElementById("color" + a + "_" + b).style.backgroundColor = "black"
                }
            }
            else{
                if(grid[a][b] == start){
                    document.getElementById("color" + a + b).style.backgroundColor = "blue"
                }
                if(grid[a][b] == end){
                    document.getElementById("color" + a + b).style.backgroundColor = "yellow"
                }
                if(InObstacles(a,b)){
                    document.getElementById("color" + a + b).style.backgroundColor = "black"
                }
            }
        }
    }
    loop = setInterval(ColorChange, 100)
}
function ColorChange(){
    //if in openlist, make color green
    //if in closedlist, make color red
    for(let a = 0; a < cols; a++){
        for(let b = 0; b < rows; b++){
            for(let c = 0; c < openList.length; c++){
                if(!InObstacles(a,b) && openList[c] == grid[a][b]){
                    if(uniquePoints(a,b)){
                        document.getElementById("color" + a + "_" + b).style.backgroundColor = "green"
                        document.getElementById("color" + a + "_" + b).innerHTML = grid[a][b].f_value
                    }
                    else{
                        document.getElementById("color" + a + b).style.backgroundColor = "green"
                        document.getElementById("color" + a + b).innerHTML = grid[a][b].f_value
                    }
                }
            }
            for(let c = 0; c < closedList.length; c++){
                if(closedList.length > 0){
                    if(!InObstacles(a,b) && closedList[c] == grid[a][b]){
                        if(uniquePoints(a,b)){
                            document.getElementById("color" + a + "_" + b).style.backgroundColor = "red"
                            document.getElementById("color" + a + "_" + b).innerHTML = grid[a][b].f_value
                        }
                        else{
                            document.getElementById("color" + a + b).style.backgroundColor = "red"
                            document.getElementById("color" + a + b).innerHTML = grid[a][b].f_value
                        }
                    }
                }
            }
        }
    }
    LoopOnClick()
}
function LoopOnClick(){
    if(openList.length > 0){
        let lowestIndex = 0
        for(let i = 0; i < openList.length; i++){
            if(!InObstacles(openList[i].i, openList[i].j)){
                //Calculates the lowest f_value in the openlist
                if (openList[i].f_value < openList[lowestIndex].f_value){
                    lowestIndex = i 
                }
            }   
        }
        let current = [openList[lowestIndex]]
        for (let i = 0; i < openList.length; i++){
            if(openList[i].f_value == openList[lowestIndex].f_value && i != lowestIndex){
                current.push(openList[i])
            }
        }
        for (let i = 0; i < current.length; i++){
            closedList.push(current[i])
        }
        //deletes the point from openlist that's being evaluated
        for(let i = openList.length-1; i >= 0; i--){
            for(let j = current.length; j>=0 ; j--){
                if(openList[i] == current[j])
                    openList.splice(i,1)
            }
        }
        for (let j = 0; j < current.length; j++){
            for(let i = 0; i < current[j].neighbors.length; i++){
                let CurrentNeighbors = current[j].neighbors[i]
                if(!closedList.includes(CurrentNeighbors)){
                    let tempG_Value = CurrentNeighbors.g_value + 1
                    //Checks if there's a better pathway to the 
                    //openset currently evaluated
                    if(openList.includes(CurrentNeighbors)){
                        if(tempG_Value < CurrentNeighbors.g_value)
                            CurrentNeighbors.g_value = tempG_Value
                    }
                    //This means that the path being evaluated is
                    //currently the 'best' path
                    else{
                        CurrentNeighbors.g_value = tempG_Value
                        openList.push(CurrentNeighbors)
                    }
                    CurrentNeighbors.h_value += Distance(CurrentNeighbors.i,CurrentNeighbors.j)
                    CurrentNeighbors.f_value = CurrentNeighbors.g_value + CurrentNeighbors.h_value
                    CurrentNeighbors.cameFrom = current[j]
                }
            }
            //retrace the steps
            for(let i = 0; i < closedList.length; i++){
                if(closedList[i] == end){
                    path = []
                    let temp = current[j]
                    while(temp.cameFrom){
                        path.push(temp.cameFrom)
                        temp = temp.cameFrom
                    }
                    tracePath()
                    console.log("DONE!!!")
                    clearInterval(loop)
                }
            }   
        }    
    }
    else if(openList.length == 0){
        console.log('No solution')
        clearInterval(loop)
    }
}
function Distance(i,j){
    //Pythagoream theorem rounded to the 2nd decimal point
    return Math.round(parseFloat((Math.sqrt(Math.pow(end.j - j, 2) + Math.pow(end.i - i, 2)))))
}
