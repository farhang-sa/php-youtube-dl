chmod 777 .
rm ./*.js
rm ./*.json
rm ./*.bat
rm ./.gitignore
rm ./.babelrc
mv ./dist/scripts ./scripts
mv ./dist/styles ./styles
cd ./dist
mv *.* ..
cd ..
rm -r ./.git
rm -r ./src
rm -r ./dist
chmod 777 *.php
echo ----------------
echo ----------------
echo deploy Finished
echo create a server path for this direcory
echo or put the files in a root 
echo ----------------
echo ----------------