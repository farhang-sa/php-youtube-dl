chmod 777 .
rm *.js
rm *.json
rm ./.gitignore
rm ./.babelrc
mv ./dist/scripts ./scripts
mv ./dist/styles ./styles
cd ./dist
mv *.* ..
cd ..
rm -r .git
rm -r development
rm -r dist
rm *.bat
chmod 777 *.php
echo ----------------
echo ----------------
echo deploy Finished
echo create a root ( domain or subdomain ) for this direcory
echo or put the files in a root 
echo ----------------
echo ----------------