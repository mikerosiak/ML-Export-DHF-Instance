#!/bin/bash
DEFAULT_JVM_OPTS="-Xmx2048m"

SERVER=MyServer
PORT=8021
USERNAME=MyUser
PASSWORD=MyPassword
COLLECTION=MyCollection

java -server -cp .:marklogic-xcc-8.0.5.jar:marklogic-corb-2.3.2.jar  \
				 -DXCC-USERNAME=$USERNAME   \
				 -DXCC-PASSWORD=$PASSWORD   \
				 -DXCC-HOSTNAME=$SERVER   \
				 -DXCC-PORT=$PORT  \
				 -DOPTIONS-FILE=options.properties  \
				 -DTHREAD-COUNT=8  \
				 -DBATCH-SIZE=100  \
				 -DCOLLECTION-NAME=$COLLECTION  \
				 -DEXPORT-FILE-NAME="export.csv"  \
				 com.marklogic.developer.corb.Manager
