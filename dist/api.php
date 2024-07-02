<?php

/*
 * php yt-dlp wrapper
 * @by Farhang Saeedi
 */

set_time_limit( 300 );

// hmmm!
if( ! function_exists( 'shell_exec' ) )
    die( 'shell_exec required' );

function ytdl_find_extension( $fileName ){
    if( stristr( $fileName , '.' ) === false )
        return "mp4" ;
    $fileName = explode( '.' , $fileName );
    if( ! is_array( $fileName ) || count( $fileName ) <= 1 )
        return "mp4" ;
    return $fileName[ count( $fileName ) - 1 ]; // extension
}

function ytdl_make_name( $fileName ){
    $ext = ytdl_find_extension( $fileName );
    // remove extension name
    $fileName = str_ireplace( '.' . $ext , '' , $fileName ) ;
    // clean name
    $fileName = str_ireplace( ' ' , '_' , $fileName );
    return preg_replace("/[^A-Za-z0-9_.-]/", '', $fileName ) . '.' . $ext ;
}

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
$quality = isset( $_POST['quality'] ) ? $_POST['quality'] : null;
if( strtolower( $link ) === 'clear' || strtolower( $link ) === 'clean' ){
    shell_exec( $isLinux ? 'rm *.mp4' : 'del *.mp4' );
    shell_exec( $isLinux ? 'rm *.webm' : 'del *.webm' );
    die( 'all videos deleted' ) ;
} else if( stristr( $link , 'cleanfile:' ) !== false ){
    $link = str_ireplace( 'cleanfile:' , '' , $link );
    $link = shell_exec( $isLinux ? 'rm ' . $link : 'del "' . $link . '"' );
    die( 'video deleted');
} else if( stristr( $link , 'renamefile:' ) !== false ){
    // old name
    $link = str_ireplace( 'renamefile:' , '' , $link );
    // new name
    $nName = ytdl_make_name( isset( $_POST[ 'to' ] ) ? $_POST[ 'to' ] : $link );
    if( rename( $link , $nName ) ) // rename!
        die( 'video renamed:' . $nName );
    die( 'video renamed:' . $link ); // fail
 } else if( strtolower( $link ) === 'list' || strtolower( $link ) === 'videos' ){
    $scDir = scandir( '.' );
    $videos = 'videos-list:{';
    foreach( $scDir as $file )
        if( stristr( $file , '.mp4' ) || stristr( $file , '.webm' ) )
            $videos .= "\n\"" . $file . '" : "' . $file . '" ,' ;
    $videos = trim( $videos , ' ,' );
    $videos .= '}' ;
    die( $videos );
} // else :
$down = $down = $quality ? ' -S "res:'. $quality . '"' : '' ;
$down = shell_exec(  $exFile . $down . ' ' . $link );
$down = explode( "[download]" , $down );
if( is_array( $down ) ) foreach( $down as $intel ){
    $intel = trim( $intel , " /\\\r\n\t" );
    if( stristr( $intel , 'Destination:' ) !== false ){
        // get file name
        $intel = trim( str_ireplace( 'Destination:' , '' , $intel ) );
        // make new clean name
        $link = ytdl_make_name( $intel ) ;
        if( rename( $intel , $link ) ) // rename!
            die( $link );
        die( $intel );
    }
} die( 'Download failed : change quality options' ); ?>