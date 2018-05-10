#!/usr/bin/env bash

GOOGLEAPIS_DEFS_REPO="https://github.com/googleapis/googleapis.git"
# PROTOINCLUDE="/usr/local/include"
SUFFIX="pb.cc"

cd "$( dirname "${BASH_SOURCE[0]}")/src/vendor"

if [ -d gens ]; then
    echo "Deleting old gens..."
    rm -rf gens
fi

if [ -d googleapis ]; then
    echo "Deleting googleapis repo..."
    rm -rf googleapis
fi

echo "Getting latest version of the Google APIs defs..."
git clone ${GOOGLEAPIS_DEFS_REPO} googleapis

echo "Generating Google APIs client libraries..."
mkdir gens
cd googleapis
# ${PROTOINCLUDE}/google/protobuf
find google -type f -name '*.proto' | sed "s/proto$$/${SUFFIX}/" | while read line; do
    echo "Generating library for '$line'..."
    grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../gens/ --grpc_out=../gens/ --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` "$line"
done

echo "Deleting remaining artifacts..."
cd ..
rm -rf googleapis

echo "Done! Google APIs definition libraries are now available in the 'vendor/gens/' folder."
