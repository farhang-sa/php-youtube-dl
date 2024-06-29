@echo off
del *.js && del *.json
del *.gitignore && del *.babelrc
move ./dist/drawables ./drawables
move ./dist/scripts ./scripts
move ./dist/styles ./styles
cd dist
move *.* ..
cd ..
rmdir /S .git
rmdir /S development
rmdir /S dist
