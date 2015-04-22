/* */ 
(function(process) {
  var fs = require("fs");
  var benchfile = process.argv[2];
  var contents = fs.readFileSync(benchfile, 'utf8');
  var name = benchfile.replace(/samples\//, '').replace(/\.md/, '');
  console.log(JSON.stringify(name) + ': ' + JSON.stringify(contents) + ',');
})(require("process"));
