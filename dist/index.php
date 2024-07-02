<?php // for adjusting the location
// where are we?
$wrw = $_SERVER[ 'SCRIPT_NAME' ];
$bas = basename( $wrw );
$wrw = str_ireplace( $bas , "" , $wrw );
?><!doctype html>
<html class="col">
    <head>
        <title>Welcome To YTDL</title>
        <meta name='charset' content='text/html; charset=UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=yes' />
        <link href="<?php print $wrw; ?>styles/bootstrap.min.css" rel='stylesheet' type='text/css' />
        <script> window.baseName = "<?php print $wrw; ?>" ; </script>
    </head>
    <body class="col">

        <div class="container text-center pt-4" id='app-view'></div>

        <script src="<?php print $wrw; ?>scripts/bootstrap.min.js"></script>
        <script src="<?php print $wrw; ?>scripts/app.bundle.js"></script>
    </body>
</html>