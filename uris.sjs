// Get all docs in the collection specified in the COLLECTION-NAME parameter (global variable URIS)

if (URIS == "") {
	throw "No Collection Specified";
}

var uris = cts.uris(null,null,cts.collectionQuery(URIS));
if (uris.length == 0) {
	throw "No Documents in Collection: " + URIS;
}

const json = require('/MarkLogic/json/json.xqy');

var namespaces = {"es": "http://marklogic.com/entity-services", "im":"http://www.chevron.com/ads/IMPACT/" + URIS};

// Get a doc from the specified collection and then an array of the elements in its <instance> node
var instance = fn.head(cts.doc(fn.head(uris))).xpath("/es:envelope/es:instance/im:" + URIS, namespaces);
var elements = fn.head(json.transformToJsonObject(instance,json.config('full')))[URIS]._children;

// Create the CSV header from the child elements in <instance>... these should be the same as when the CSV file was loaded
// This is done here so that it can be passed to both the PRE-BATCH and PROCESS modules as part of the URI sequence
header = "";
header += elements.map(function(element) {
    var key = Object.keys(element).toString().split('"').join('""');  // Escape double-quotes as ""
    if (key.match("(.*\".*|.*,.*)")) {                                // If key contains a comma or double-quote, 
        key = '"' + key + '"';                                        //   surround it with double-quotes
    }
    return key
}).join(","); // + "\n";

fn.insertBefore(fn.insertBefore(fn.insertBefore(fn.insertBefore(uris, 0, fn.count(uris)), 0,
			  															 "PRE-BATCH-MODULE.header=" + header), 0,
			  															 "PROCESS-MODULE.header=" + header), 0,
			  															 "PROCESS-MODULE.collection=" + URIS);

