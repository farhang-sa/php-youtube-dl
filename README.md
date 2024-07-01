## php-youtube-dl
A wrapper for [@yt-dlp](https://github.com/yt-dlp/) with PHP and React

## challenge : php and react ( with webpack ) in dev
This was a good practice for integrating php into react project!
App itself is easy as it gets! but mixing was good.

## How it works ( for dev ) :
<code>nodemon.js</code> is the answer. <code>npm start</code> launches the <code>nodemon.js</code>
and it will execute an empty <code>fake-server-script.js</code>. ( as we need php server not js server )
after that , it starts a <code>php-built-in-server [php -S localhost:8080 -t ./dist]</code> for serving files. so nodemon watches the files for changes ( to run webpack ) and php servs them.

## How to use :
1. <code>git clone</code> to your server
2. ### do not npm start! ( it's just for dev )
3. delete dev files and keep the product :
   - if server is windows : <code>npm run windows</code>
   - if server is linux : <code>npm run linux</code>
4. upload it any where you want and use a REAL php server
