var xmldoc = require("xmldoc");
var through2 = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var Buffer = require('buffer').Buffer;
var path = require('path');

const PLUGIN_NAME = "gulp-resx2json";
module.exports = function(opt) {
  opt = opt || {};

  // Convert XML to JSON
  var doConvert = function(file) {
    var xml = file.contents;
    var doc = new xmldoc.XmlDocument(xml);

    var resourceObject = {};
    var valueNodes = doc.childrenNamed("data");
    valueNodes.forEach(function(element) {
      var name = element.attr.name;
      var value = element.firstChild.val;
      if (element.lastChild && element.lastChild.val == 'ng')
      {
        resourceObject[name] = value;
      }
    });

    return JSON.stringify(resourceObject);
  };

  var throughCallback =  function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    if(file.isBuffer()) {
      file.contents = new Buffer(doConvert(file));
    }

    this.push(file);
    return cb();
  };

  return through2.obj(throughCallback);
};
