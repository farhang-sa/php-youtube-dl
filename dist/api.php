<?php
set_time_limit( 300 );
if( ! isset( $_POST ) )
    die( 'no input' );
if( ! isset( $_POST[ 'link' ] ) )
    die( 'no link' );
$link = $_POST['link'];
$a = exec( 'ytdl ' . $link );
var_dump( $a );
?>