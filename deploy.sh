chmod 777 .
rm *.js && rm *.json
rm ./.gitignore && rm ./.babelrc
mv ./dist/drawables ./drawables
mv ./dist/scripts ./scripts
mv ./dist/styles ./styles
cd ./dist
mv *.* ..
cd ..
rm -r .git
rm -r development
rm -r dist
rm *.bat
echo ----------------
echo deploy Finished
echo ----------------