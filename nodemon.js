let nodemon  = require('nodemon');
let { exec } = require('child_process');

nodemon({

	// This is fake , we have Internal-PHP-Server for backend :)
  	script: 'fake-server-script.js',

  	ext: 'js jsx json css scss php' ,
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
		exec( "php -S localhost:80 -t ./dist" );
		phpServerStarted = true ;
	} console.log('> Nodemon has started');
}).on('quit', function () {
  	console.log('> Nodemon has quit');
  	process.exit();
}).on('restart', function (files) {
  	console.log('> Nodemon restarted due to: ', files);
});