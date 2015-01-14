//Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

// Create the data table.
var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Mushrooms', 4],
        ['Onions', 0.5],
        ['Zucchini', 1],
        ['Olives', 1],
        ['Garlic', 1],
        ['Pepperoni', 2]
]);

// Set chart options
var options = {'title':'How Much Pizza I Ate Last Night',
    'width':500,
    'height':400};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
chart.draw(data, options);

}

google.setOnLoadCallback(drawChartTwo);

function drawChartTwo() {

var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
        ['Rotties', 10],
        ['Pitties', 9],
        ['Labs', 6],
        ['Golden Retrievers', 7],
        ['Huskies', 9],
        ['Border Collies', 7]
]);

var options = {'title':'Coolest Dog Breeds on Scale of 1-10',
    'width':500,
    'height':400};

var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
            chart.draw(data, options);

}
