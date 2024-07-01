let nodemon  = require('nodemon');
let { exec } = require('child_process');

nodemon({

	// This is fake , we have Internal-PHP-Server for backend :)
  	script: 'fake-server-script.js',

  	ext: 'js jsx ts tssx json css scss php' ,
  	"ignore": [
	    ".git",
		"./nodemon.js",
		"./webpack.config.js",
	    "./dist/scripts/app.bundle.js"
	  ]
});

let  phpServerStarted = false ;

// WebPack execute command
cmd = "webpack --mode development";

nodemon.on('start', function () {
    exec( cmd , (err, stdout, stderr) => {});
	if( ! phpServerStarted ){
		exec( "php -S localhost:8080 -t ./dist" );
		phpServerStarted = true ;
	} console.log('> Nodemon has started : localhost:8080');
}).on('quit', function () {
  	console.log('> Nodemon has quit');
  	process.exit();
}).on('restart', function (files) {
  	console.log('> Nodemon restarted due to: ', files);
});