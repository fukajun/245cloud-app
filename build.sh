#!/bin/bash
DIST_DIR=./dist
BUILD_DIR=./build

PKG_VERSION=`node -pe 'require("./package.json").version'`
APP_NAME=`node -pe 'require("./package.json").name'`

echo "version: ${PKG_VERSION}"

# Clean npm_modules, *.js, *.html ...
rm -rf ${BUILD_DIR}/*

gulp build

cp ./package.json ${BUILD_DIR}
pushd ${BUILD_DIR} && npm install --production  && popd

electron-packager ${BUILD_DIR} "${APP_NAME}" \
  --overwrite \
  --prune \
  --platform=darwin \
  --arch=x64 \
  --electron-version=1.6.6 \
  --build-version=${PKG_VERSION} \
  --icon=./icon.icns \
  --out=./${DIST_DIR}

cd ${DIST_DIR} && zip -r -y -q \
  "../${APP_NAME}-${PKG_VERSION}-darwin-x64.zip" \
  "./${APP_NAME}-darwin-x64"
