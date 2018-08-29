//////////////////////////////// PROBLEM 1 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
1. Adding a new constructor named CenteredCenteredBorderedCell that 
creates a cell where all the lines in the cell are center-justified. 
That is, the draw method of this type of cell draws centered text 
(if there is an uneven number of padding spaces, put the extra one on either side). 
Test it by drawing a table with at least 2 rows and 2 columns with centered text. 
*/

function CenteredBorderedCell(text) {
    this.text = text.split("\n"); 
}

CenteredBorderedCell.prototype.minHeight = function () {
    return this.text.length; 
};

CenteredBorderedCell.prototype.minWidth = function () {
    return this.text.reduce(        
        function (width, element) {
            return Math.max(width, element.length);
        },
        0);
};

CenteredBorderedCell.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat1(line, " ", width - line.length));
    }
    return result;
};

var rows = [];
rows.push([new CenteredBorderedCell("Mastro's Ocean\nClub"),
    new CenteredBorderedCell("$$$$")]);
rows.push([new CenteredBorderedCell("Denny's"), new CenteredBorderedCell("$")]);

function drawTable1(rows) 
{
    var heights = rowHeights1(rows);
    var widths = colWidths1(rows);

    function drawRow(row, rowNum) 
    {
        var blocks = row.map(     
            function (cell, colNum) 
            {
                return cell.draw(widths[colNum], heights[rowNum]);
            });

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }
        ).join("\n");
    }

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }
        ).join(" ");
    }

    return rows.map(drawRow).join("\n");
}

function rowHeights1(rows) 
{
    return rows.map(      
        function (row) {
            return row.reduce( 
                function (max, cell) {
                    return Math.max(max, cell.minHeight());
                },
                0);
        });
}

function colWidths1(rows)    
{
    return rows[0].map(
        function (_, i) 
        {
            return rows.reduce(            
                function (max, row)        
                {
                    return Math.max(max, row[i].minWidth()); 
                },
            0);
        });
}

function repeat1(line, string, times) {
    var result = "";
    var padCount = 0;
    padCount = Math.floor(times / 2);

    for (var i = 0; i < padCount; i++) {
        result += string;
    }

    if (times % 2 != 0) {
        return result + line + result + string;
    }

    return result + line + result;
}

console.log("Problem 1: ");
console.log(drawTable1(rows));
console.log();

//////////////////////////////// PROBLEM 2 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*
2. Add a BorderedCell constructor that makes cells with a border. 
The top of the cell has dashes across it,
as well as the bottom. For the sides, use a "|". 
Test it by drawing a table with at least 2 rows and 2 columns.  
*/

function BorderedCell(text) {
    this.text = text.split("\n"); 
}

BorderedCell.prototype.minHeight = function () {
    return this.text.length; 
};

BorderedCell.prototype.minWidth = function () {
    return this.text.reduce(        
        function (width, element) {
            return Math.max(width, element.length);
        },
        0);
};

BorderedCell.prototype.draw = function (width, height) {
    var result = [];
    result.push(addDashes());
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push("|" + line + repeat2(" ", width - line.length) + "|");
    }
    result.push(addDashes());
    function addDashes()
    {
        var dashes = ""
        for (var i = 0; i < width + 2; i++) {
            dashes = dashes + "-";
        }
        return dashes;
    }
    return result;
};

var restaurants = [];
restaurants.push([new BorderedCell("Bucco de\nBeppo"), new BorderedCell("$$$$")]);
restaurants.push([new BorderedCell("Denny's"), new BorderedCell("$$")]);

function drawTable2(rows) 
{
    var heights = rowHeights2(rows);
    var widths = colWidths2(rows);

    function drawRow(row, rowNum) 
    {
        var blocks = row.map(     
            function (cell, colNum) 
            {
                return cell.draw(widths[colNum], heights[rowNum]);
            });

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }
        ).join("\n");
    }

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }
        ).join(" ");
    }

    return rows.map(drawRow).join("\n");
}

function rowHeights2(rows) 
{
    return rows.map(      
        function (row) {
            return row.reduce(  
                function (max, cell) {
                    return Math.max(max, cell.minHeight());
                },
                0);
        });
}

function colWidths2(rows)    
{
    return rows[0].map(
        function (_, i) 
        {
            return rows.reduce(            
                function (max, row)        
                {
                    return Math.max(max, row[i].minWidth()); 
                },
            0);
        });
}

function repeat2(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

console.log("Problem 2:");
console.log(drawTable2(restaurants));
console.log();

//////////////////////////////// PROBLEM 3 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*
Write a function that takes a row number and the main data array and 
transforms all the text for all the cells in that row to uppercase. 
You must use Array.prototype.map.  (5pts)
*/

function rowToUpper(array2d, row)
{
    var cell = 0;
    if (row == 1) {
        cell = --row;
    }
    else {
        cell = --row * 3;
    }

    function capitalize(cell)
    {
        var myArray = [];

        array2d[cell].map(function (array) {
            array.text.map(function (element) {
                myArray.push(element.toUpperCase());
            });

        });

        array2d[cell].map(function (array) {
            array.text = myArray;
        });
    }
    capitalize(cell);
    for (var i = 0; i < 2; i++) {
        capitalize(++cell);
    }
}

//////////////////////////////// PROBLEM 4 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
Write a function that takes a column number and the main data array 
and transforms all the text for all the cells in that column to uppercase. 
You must use Array.prototype.map. (5pts)
*/

function columnToUpper(array2d, column) {
    var cell = --column;

    function capitalize(cell) {
        var myArray = [];

        array2d[cell].map(function (array) {
            array.text.map(function (element) {
                myArray.push(element.toUpperCase());
            });

        });

        array2d[cell].map(function (array) {
            array.text = myArray;
        });
    }
    capitalize(cell);
    for (var i = 0; i < 2; i++) {
        cell = cell + 3;
        capitalize(cell);
    }
}

//////////////////////////////// PROBLEM 5 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/*
Write a function that takes a Person, defined in Chapter 5 of Eloquent JavaScript 
(used for the author's ancestry; make sure you include all the properties and 
define them exactly like they are defined in Chapter 5), and converts it to a 
BorderedCell by taking all the information in the person and writing each one 
on a new line (along with the property name) to be displayed in the cell. 
Create a 3x3 matrix of 9 fictional (they can repeat). 
Using Array.prototype.map, write a function that takes a matrix of Persons and 
converts it to a matrix of BorderedCells. 
Use this function to transform your 3x3 array. 
Print out a table with this information using the table code. (10pts)
*/

function drawTable5(rows) {
    var heights = rowHeights5(rows);
    var widths = colWidths5(rows);

    function drawRow(row, rowNum) {
        var blocks = row.map(
            function (cell, colNum) {
                return cell.draw(widths[colNum], heights[rowNum]);
            });

        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo);
        }
        ).join("\n");
    }

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }
        ).join(" ");
    }

    return rows.map(drawRow).join("\n");
}

function rowHeights5(rows) {
    return rows.map(
        function (row) {
            return row.reduce(
                function (max, cell) {
                    return Math.max(max, cell.minHeight());
                },
                0);
        });
}

var results = [];

BorderedCell.prototype.draw = function (width, height) {
    var result = [];
    result.push(addDashes());
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push("|" + line + repeat5(" ", width - line.length) + "|");
    }
    result.push(addDashes());
    function addDashes() {
        var dashes = ""
        for (var i = 0; i < width + 2; i++) {
            dashes = dashes + "-";
        }
        return dashes;
    }
    results.push(result);
    return result;
};

function colWidths5(rows) {
    return rows[0].map(
        function (_, i) {
            return rows.reduce(
                function (max, row) {
                    return Math.max(max, row[i].minWidth());
                },
            0);
        });
}

function repeat5(string, times) {
    var result = "";
    for (var i = 0; i < times; i++) {
        result += string;
    }
    return result;
}

var persons =
    [
        {
            "name": "Emma de Millano", "sex": "f",
            "born": 1939, "died": 2016,
            "father": "Petrus de Milliano",
            "mother": "Sophia van Damme",
        },
        {
            "name": "Carolus Haverbeke", "sex": "m",
            "born": 1945, "died": 2016,
            "father": "Carel Haverbeke",
            "mother": "Maria van Brussel"
        },
        {
            "name": "Jack Marten", "sex": "m",
            "born": 1968, "died": 2016,
            "father": "Bob Marten",
            "mother": "Lisa Marten"
        },
        {
            "name": "Bob Tabor", "sex": "m",
            "born": 1966, "died": 2016,
            "father": "Nick Tabor",
            "mother": "katy Tabor"
        },
        {
            "name": "Bill Hans", "sex": "m",
            "born": 1997, "died": 2016,
            "father": "Norman Hans",
            "mother": "Susan Hans"
        },
        {
            "name": "Emma de Millano", "sex": "f",
            "born": 1939, "died": 2016,
            "father": "Petrus de Milliano",
            "mother": "Sophia van Damme"
        },
        {
            "name": "Carolus Haverbeke", "sex": "m",
            "born": 1945, "died": 2016,
            "father": "Carel Haverbeke",
            "mother": "Maria van Brussel"
        },
        {
            "name": "Jack Marten", "sex": "m",
            "born": 1981, "died": 2016,
            "father": "Bob Marten",
            "mother": "Lisa Marten"
        },
        {
            "name": "Jack Jackson", "sex": "m",
            "born": 1999, "died": 2016,
            "father": "Nick Tabor",
            "mother": "katy Tabor"
        },
    ];

persons.forEach(function(element) {
    var string = "";
    string += "Name: " + element.name + "\n";
    string += "Sex: " + element.sex + "\n";
    string += "Born:" + element.born + "\n";
    string += "Died: " + element.died + "\n";
    string += "Father: " + element.father + "\n";
    string += "Mother: " + element.mother;
    element.description = string;
});

function clearBuffer() {
    results = [];
}

var peopleCells = [];
persons.forEach(function(element) {
    peopleCells.push([new BorderedCell(element.description)]);
});

function addCells() {
    function add(num1, num2, num3) {
        results[num1].forEach(function (element, i) {
            console.log(element.concat(" " + results[num2][i]).concat
                (" " + results[num3][i]));
        });
    }
    var counter = -1; 
    var length = results.length;
    var index = length - 1;

    while (counter < length - 2) {
        add(++counter, ++counter, ++counter);
    }
    while (counter < index) {
        results[index].forEach(function(element) {
            console.log(element);
        });
        index--;
    }

}

console.log("Problem 5");
drawTable5(peopleCells);
addCells();
console.log();

//////////////////////////////// PROBLEM 6 \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/* 
Using the functions from #3 and #4, transform the first row of the above table 
to uppercase, and the last column, and redraw. Note, if you don't do this step, 
you will not get credit for #3 and #4, for this is our way of making sure 
you implemented your functions properly. (3pts)
*/

clearBuffer();
console.log("Problem 6");
rowToUpper(peopleCells, 1);
columnToUpper(peopleCells, 3);
drawTable5(peopleCells);
addCells();
console.log();







