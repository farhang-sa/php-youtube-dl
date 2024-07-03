import React, {useEffect, useState} from 'react' ;
import { createRoot } from "react-dom/client";
import { BsCloudDownloadFill } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsFillFolderFill } from "react-icons/bs";
import ReactLoading from 'react-loading';
import $ from 'jquery' ;
import '../styles/app.scss';

window.React = React;
window.$ = $ ;
window.baseName = typeof window.baseName !== "undefined" ? window.baseName : '/' ;

const findExt = ( fileName ) =>{
	if( typeof fileName !== 'string' )
		return 'mp4' ;
	if( fileName.endsWith('.webm' ) )
		return 'webm' ;
	return 'mp4' ;
}

const findGoodName = ( fileName ) =>{
	let filExt = findExt( fileName );
	let newName = fileName ;
	newName = newName.replaceAll( '.' + filExt , '' );
	newName = newName.replaceAll( ' ' , '_' );
	newName = newName.replace( /[^a-zA-Z0-9_.-]/g , '' ); // clean name
	newName = newName.trim( ' .' );
	return newName + '.' + filExt ;
}

const getIcons = () => {
	return {
		icoTrash : $( 'div.icon-holder-trash' ).html() ,
		icoDownload : $( 'div.icon-holder-download' ).html() ,
		icoRename : $( 'div.icon-holder-rename' ).html() ,
	}
}

const getFileView = ( fileName ) => {
	let { icoDownload , icoRename , icoTrash } = getIcons();
	let view =  '<div class="m-3 text-start">';
	view += `<span class='btn btn-md btn-danger' title="delete" onclick="window.askYtdlDelete('${fileName}');">${icoTrash}</span> `;
	view += `<span class='btn btn-md btn-info' title="rename" onclick="window.askYtdlRename('${fileName}');">${icoRename}</span> `;
	view += `<a class="btn" href='${window.baseName + fileName}' download><span class='btn btn-md btn-primary'>${icoDownload}</span> ${fileName}</a>`;
	view += "</div>" ;
	return view ;
}

const App = () => {

	const [isDownloading, setIsDownloading] = useState(false);
	const [systemMessage , setSystemMessage] = useState('' );
	const iconsStyle = {width: "1.75em", height: "1.75em", cursor: "pointer"};
	const winBinLink = 'http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' ;
	const linBinLink = 'http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux' ;

	window.askYtdlDelete = (fileName ) =>{
		let ask = confirm(`Are you sure you want to delete '${fileName}'?` );
		if( ! ask )
			return ;
		setSystemMessage( 'deleting \'' + fileName + '\'' );
		setIsDownloading( true );
		$.post( window.baseName + "api.php", {
			'link' : 'cleanfile:' + fileName
		} , function( response ) {
			setSystemMessage( response );
			setIsDownloading( false );
		});
	}

	window.askYtdlRename = (fileName ) =>{
		let filExt = findExt( fileName );
		let newName = findGoodName( fileName );
		newName = prompt( 'Enter new name with .extension' , newName );
		if( ! newName )
			return ;
		setSystemMessage( 'renaming \'' + fileName + '\'' );
		setIsDownloading( true );
		// clean name again!
		newName = newName.replaceAll( ' ' , '_' );
		newName = newName.replace( /[^a-zA-Z0-9_.-]/g , '' );
		if( ! newName.endsWith( filExt ) ){
			newName = newName.replaceAll( filExt , '' );
			newName = newName + '.' + filExt ;
		} if( newName.length === 0 )
			newName = findGoodName( fileName );
		else if( newName === filExt )
			newName = findGoodName( fileName );
		else if( newName.startsWith( '.' ) )
			newName = findGoodName( fileName );
		$.post( window.baseName + "api.php", {
			'link' : 'renamefile:' + fileName ,
			'to' : newName
		} , function( response ) {
			let newName = response.replace( 'video renamed:' , '' );
			response = getFileView( newName );
			setSystemMessage( response );
			setIsDownloading( false );
		});
	}

	const askDownload = ( action ) => {
		if( action === 'clean' || action === 'clear' ){
			let ask = confirm(`Are you sure you want to delete all video files?` );
			if( ! ask )
				return ;
		} // resume :
		let link = action ? action : $( 'input.link-input' ).val();
		setIsDownloading( true );
		$.post( window.baseName + "api.php", {
			'link' : link ,
			'quality' : $( 'select#quality' ).val()
		} , function( response ) {
			if( response === 'yt-dlp binary not prepared' ){
				response = 'yt-dlp binary files not available ( check internet )';
			} else if( response === 'Download failed' ){
				/// nothing !
			} else if( response === 'all videos deleted' ){
				/// nothing !
			} else if( response === 'video deleted' ) {
				/// nothing !
			} else if( response.startsWith('videos-list:') ){
				/// nothing !
				response = response.replaceAll('videos-list:', '' );
				if( response === '{}' )
					response = 'no videos found' ;
				else {
					let responseValues = response ;
					let html = $( "<div></div>" );
					responseValues = JSON.parse( responseValues );
					let co = 0 ;
					for( let video in responseValues )
						html.append( getFileView( video ) );
					response = html.html() ;
				}
			} else { // File Name received !
				let dll = $( '<div><a href="/' + response + '" download>' + response + '</a></div>' );
				response = dll.html() ;
			}
			setSystemMessage( response );
			setIsDownloading(false );
		});
		if( link === 'clean' )
			setSystemMessage( 'deleting video files , please wait' );
		else if( link === 'list' )
			setSystemMessage( 'listing video files , please wait' );
		else setSystemMessage( 'Download in progress , please wait' );
	}

	return (
		<div className="container">
			<div className='icon-holder-trash hidden'>
				<BsTrash3Fill/>
			</div>
			<div className='icon-holder-download hidden'>
				<BsCloudDownloadFill/>
			</div>
			<div className='icon-holder-rename hidden'>
				<BsPencilFill />
			</div>
			<div className="row">
				<div className="col-12 col-sm-2"></div>
				<div className="col-12 col-sm-8">
					<header className="col-12">
						<h4>Welcome To YouTube Downloader</h4>
					</header>
					<div className="col-12 mt-5">
						<h5>
							See this &#160;
							<a target="_blank"
							   href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md">link
							</a>&#160; for supported sites
						</h5>
					</div>
					<div className="col-12 mt-5">
						<span className="input-group">
							<select className="select me-2 ps-2 pe-2" id='quality'>
								<option value='360'>Quality 360p</option>
								<option value='480' selected="1">Quality 480p</option>
								<option value='720'>Quality 720p</option>
								<option value='1080'>Quality 1080p</option>
							</select>
							<input type="text"
								   className="form-control form-control-lg link-input"
								   placeholder="Enter link"/>
							{!isDownloading ?
								(<span className="input-group-addon p-4">
								<BsCloudDownloadFill
									onClick={() => askDownload()}
									style={iconsStyle}/>
								</span>) : (<span className="input-group-addon p-3">
								<ReactLoading type="spin" color="lightblue"
											  style={{width: "2em", height: "2em"}}/>
							</span>)}
						</span>
					</div>
					<div className="col-12 mt-5">
						<span className="btn btn-success p-3"
							  title="list all video files" style={{cursor:"pointer"}}
							  onClick={() => askDownload('list')}>
							<BsFillFolderFill style={iconsStyle}/> List All
						</span>
						<span className="btn btn-danger p-3"
							  onClick={() => askDownload('clean')}
							  title="Delete all video files" style={{cursor:"pointer"}}>
							<BsTrash3Fill style={iconsStyle}/> Delete All
						</span>
					</div>
					{systemMessage.length > 0 ? (<div className="col-12 mt-4 pt-4">
						<div className="alert alert-info system-message">
							<h5 className="m-0" dangerouslySetInnerHTML={{__html: systemMessage}}></h5>
						</div>
					</div>) : (<div></div>)}
					<footer className="col-12 mt-5 pt-2">
						<h5 className="alert alert-info">
							Note : if you are in dev mode and have low speed internet ( like me )
							<br /> download a yt-dlp binary from&#160;
							<a className="btn btn-lg btn-primary" href={winBinLink} download>windows-link</a>
							&#160; or &#160;
							<a className="btn btn-lg btn-primary" href={linBinLink} download>linux-link</a> and put it beside api
						</h5>
						<br />
						<h5>All rights are NOT reserved for <a href='https://github.com/farhang-sa' target="_blank">ME</a> </h5>
					</footer>
				</div>
			</div>
		</div>
	);
}

const root = createRoot(document.getElementById('app-view'));
root.render(<App/>);