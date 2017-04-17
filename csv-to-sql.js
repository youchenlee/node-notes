const fs = require('fs');
const parse = require('csv-parse');
fs.readFile('a.csv', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    parse(data, {comment: '#'}, function(err, output){
        output.forEach(function (arr){
            var template = `
insert into TABLENAME
set field0 = "${arr[0]}",
    field1="${arr[1]}",
`;
            console.log(template);
        });
    });

});
