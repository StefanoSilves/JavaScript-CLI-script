const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const filterFunction = (filePath, index, filterValue) => {
  fs.createReadStream(filePath)
    .pipe(csv({ headers: false }))
    .on('data', (data) => {
      if (data[Number(index)] === filterValue) {
        results.push(Object.values(data).join(' - '));
      }
    })
    .on('end', () => {
      console.log(results.join('\n'));
    });
};

filterFunction(process.argv[2], process.argv[3], process.argv[4]);
