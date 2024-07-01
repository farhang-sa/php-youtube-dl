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
$isLinux  = PHP_OS === "Linux" ;
$ytdl_win = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe";
$ytdl_lin = "http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux";
$dlLink = ( PHP_OS === "Linux" ) ? $ytdl_lin : $ytdl_win ;
$exFile = ( $isLinux ? './' : '' ) . basename( $dlLink );

if( ! file_exists( $exFile ) ) {
    // thank god i'm ganna run this in a vps in germany :)
    // i'm in a village in iran. my net is shitty!!!
    $dlc = @file_get_contents( $dlLink );
    @file_put_contents( $exFile , $dlc );
    if( $isLinux )
        shell_exec( 'chmod 777 ' . $exFile );
} if( ! file_exists( $exFile ) )
    die( 'yt-dlp binary not prepared' );

if( ! isset( $_POST ) )
    die( 'No input' );
if( ! isset( $_POST[ 'link' ] ) )
    die( 'No link' );
$link = $_POST[ 'link' ];
if( strtolower( $link ) === 'clear' || strtolower( $link ) === 'clean' ){
    shell_exec( $isLinux ? 'rm *.mp4' : 'del *.mp4' );
    die( 'all videos deleted' ) ;
} else if( stristr( $link , 'cleanfile:' ) !== false ){
    $link = str_ireplace( 'cleanfile:' , '' , $link );
    $link = shell_exec( $isLinux ? 'rm ' . $link : 'del "' . $link . '"' );
    die( 'video deleted');
} else if( strtolower( $link ) === 'list' || strtolower( $link ) === 'videos' ){
    $scDir = scandir( '.' );
    $videos = 'videos-list:{';
    foreach( $scDir as $file )
        if( stristr( $file , '.mp4' ) )
            $videos .= "\n\"" . $file . '" : "' . $file . '" ,' ;
    $videos = trim( $videos , ' ,' );
    $videos .= '}' ;
    die( $videos );
} // else :
$down = shell_exec(  $exFile . ' ' . $link );
$down = explode( "[download]" , $down );
if( is_array( $down ) ) foreach( $down as $intel ){
    $intel = trim( $intel , " /\\\r\n\t" );
    if( stristr( $intel , 'Destination: ' ) !== false )
        die( str_ireplace( 'Destination: ' , '' , $intel ) );
} $down = 'Download failed' ;
die( $down ); ?>