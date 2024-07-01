<?php

/*
 * php yt-dlp wrapper
 * @by Farhang Saeedi
 */

set_time_limit( 300 );

// hmmm!
if( ! function_exists( 'shell_exec' ) )
    die( 'shell_exec required' );

// grab them
$ytdl_win = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";
$ytdl_lin = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux";
$dlLink = ( PHP_OS === "Linux" ) ? $ytdl_lin : $ytdl_win ;
$exFile = ( ( PHP_OS === "Linux" ) ? './' : '' ) . basename( $dlLink );

if( ! file_exists( $exFile ) ) {
    // thank god i'm ganna run this in a vps in germany :)
    // i'm in a village in iran. my net is shitty!!!
    $dlc = file_get_contents( $dlLink );
    @file_put_contents( $exFile , $dlc );
    if( PHP_OS === "Linux" ) 
        shell_exec( 'chmod 777 ' . $exFile );
} if( ! file_exists( $exFile ) )
    die( 'yt-dlp binary not prepared' );

if( ! isset( $_POST ) )
    die( 'No input' );
if( ! isset( $_POST[ 'link' ] ) )
    die( 'No link' );
$link = $_POST[ 'link' ];
$down = shell_exec(  $exFile . ' ' . $link );
$down = explode( "[download]" , $down );
if( is_array( $down ) ) foreach( $down as $intel ){
    $intel = trim( $intel , " /\\\r\n\t" );
    if( stristr( $intel , 'Destination: ' ) !== false )
        die( str_ireplace( 'Destination: ' , '' , $intel ) );
} $down = "Download failed" ;
die( $down ); ?>