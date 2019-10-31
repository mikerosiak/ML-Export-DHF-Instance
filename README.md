# ML-Export-DHF-Instance
## Generic MarkLogic Data Hub Instance Exporter

This is a sample CoRB process that will export the instance sections of XML documents in a specified collection to a CSV file.  The instances must be in the standard DHF envelope pattern and must be a flat series of key/value pairs (hierarchical structures are not supported).  Headers are generated automatically from the element names in the instance.  If documents in the collection have inconsistent element names, an error is thrown.
  
The intent of this process is be an inverse of the MLCP load process, whereby a delimited text file is loaded, and column headers are translated to element names.  The same result could be achieved by using a TDE template and a v1/rows transformation, but that requires creating the TDE template in advance.  The CoRB process will work on any arbitrary collection, without any advance configuration.

Note:  This process assumes that the collection name is also being used as a namespace.  If not, some tweaking to the code may be necessary.  Paths and server/user information will also need to be updated to suit the implementation.

See https://github.com/marklogic-community/corb2/blob/master/README.md for information on how to use CoRB.
