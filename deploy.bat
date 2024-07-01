@echo off
del *.js
del *.json
del *.gitignore
del *.babelrc
move ./dist/scripts ./scripts
move ./dist/styles ./styles
cd ./dist
move *.* ..
cd ..
rmdir /S /Q .git
rmdir /S /Q development
rmdir /S /Q dist
del *.sh
echo ----------------
echo ----------------
echo deploy Finished
echo create a root - domain or subdomain - for this direcory
echo or put the files in a root 
echo ----------------
echo ----------------