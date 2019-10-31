'use strict';

const json = require('/MarkLogic/json/json.xqy');

var namespaces = {"es": "http://marklogic.com/entity-services", "im":"http://www.chevron.com/ads/IMPACT/" + collection};

//if CORB property "BATCH-SIZE" is greater than 1, the URI variable is
//a delimited string with default separator, ';'
const uriArray = URI.split(';')
var rows = [];
for(let uri of uriArray) {

    var instance = fn.head(fn.head(cts.doc(uri)).xpath("/es:envelope/es:instance/im:" + collection, namespaces));
    var elements = fn.head(json.transformToJsonObject(instance,json.config('full')))[collection]._children;

    // Create a CSV header and compare with the one built in pre-batch.  Throw an error if inconsistent
    var keys = "";
    keys += elements.map(function(element) {
        var key = Object.keys(element).toString().split('"').join('""');  // Escape double-quotes as ""
        if (key.match("(.*\".*|.*,.*)")) {                                // If key contains a comma or double-quote, 
            key = '"' + key + '"';                                        //   surround it with double-quotes
        }
        return key
    }).join(","); 
    if (keys == header) {
        var row = "";
        row += elements.map(function(element) {
            var key = Object.keys(element);                              // Get the values for each element
            if (element[key]["_children"]) {                             // Test for an empty element value
                var value = element[key]["_children"][0].toString().split('"').join('""');    // Escape double-quotes as ""
                if (value.match("(.*\".*|.*,.*)")) {                     // If value contains a comma or double-quote, 
                    value = '"' + value + '"';                           //   surround it with double-quotes
                }
            } else {
                var value = "";
            }
            return value
        }).join(",");
        rows.push(row);
    } else {
        throw("Inconsistent Instances in Collection.");
    }
}

Sequence.from(rows);