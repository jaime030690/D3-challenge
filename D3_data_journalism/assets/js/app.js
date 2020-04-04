var csv_file = "assets/data/data.csv";

// read in csv file
d3.csv(csv_file).then(function(data) {
    console.log(data);

    var smokers = data.map(item => +item.smokes);
    var age = data.map(item => +item.age);


}).catch(error => console.log(error));