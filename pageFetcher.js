const request = require('request');
const fs = require('fs');
const readline = require('readline');
const argArray = process.argv;


/**
 * 
 */
const pageFetch = function() {

  const url = argArray[2];
  const destination = argArray[3];

  request(url, (error, req, res) => {

    let content = res;
    let status = req.statusCode;
    console.log(status);
    if (status === 200) {
      if (fs.existsSync(destination)) {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question(`Would you like overwrite  ${destination} ? y/n`, (answer) => {
          if (answer === 'n') {
            // TODO: Log the answer in a database
            console.log(`Thank you for your valuable feedback: No`);
            process.exit;
          } else {
            write(destination, content);
          }
          rl.close();
        });
      } else {
        write(destination, content);
      }
    } else {
      console.log(`Invalid url, status: ${status}`);
    }
  });
}

/**
 * Helper function to write file.
 * @param {} destination 
 * @param {*} content 
 */
function write(destination, content) {
  fs.writeFile(destination, content, function(err) {

    if (err) {
      return console.log(err);
    }
    const stats = fs.statSync(destination);
    const sizeInBytes = stats.size;
    console.log(`Downloaded and saved ${sizeInBytes} bytes to ${destination} `);
  });
}

pageFetch();

module.export = { pageFetch };