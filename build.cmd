SETLOCAL ENABLEEXTENSIONS
@REM don't watch the sausage being made
ECHO OFF



enyo pack --P --clean



adb push build/ /usr/palm/applications/com.micro-tech.calculator
adb shell luna-send -n 1 luna://com.palm.applicationManager/rescan {}
ECHO.
ECHO.
echo Press ENTER to execute the command
pause > nul