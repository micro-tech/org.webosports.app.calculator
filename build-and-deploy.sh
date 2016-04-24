#!/bin/bash
## node enyo/tools/deploy.js -o deploy/org.webosports.app.calculator
enyo pack --production -d ./deploy/org.webosports.app.calculator --no-inline-css --css-outfile app.css --no-inline-js --js-outfile app.js

adb push deploy/org.webosports.app.calculator /usr/palm/applications/org.webosports.app.calculator
adb shell luna-send -n 1 luna://com.palm.applicationManager/rescan {}
read -p "Paused  Press [Enter] key to restart and End..."