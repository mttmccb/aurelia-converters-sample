/* */ 
var commonmark = require("./lib/index");
var parser = new commonmark.Parser();
var doc = parser.parse("# Hi\n\nA [link](url). ok.");
var walker = doc.walker();
var event;
var html = function(raw) {
  var node = new commonmark.Node('Html');
  node.literal = raw;
  return node;
};
while (event = walker.next()) {
  if (event.node.type === 'Link' && !event.entering) {
    var rawstart = html('<start>');
    var rawend = html('<end>');
    event.node.insertBefore(rawstart);
    var child = event.node.firstChild;
    while (child) {
      nextchild = child.next;
      event.node.insertBefore(child);
      child = nextchild;
    }
    event.node.insertBefore(rawend);
    event.node.unlink();
  }
}
var renderer = new commonmark.HtmlRenderer();
console.log(renderer.render(doc));
