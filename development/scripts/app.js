import React, {useEffect, useState} from 'react' ;
import { createRoot } from "react-dom/client";
import { BsCloudDownloadFill } from "react-icons/bs";
import { BsTrash3Fill } from "react-icons/bs";
import { BsListCheck } from "react-icons/bs";
import ReactLoading from 'react-loading';
import $ from 'jquery' ;

window.React = React;
window.$ = $ ;

const App = () => {

	const [isDownloading, setIsDownloading] = useState(false);
	const [systemMessage , setSystemMessage] = useState('' );
	const iconsStyle = {width: "1.75em", height: "1.75em", cursor: "pointer"};
	const winBinLink = 'http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' ;
	const linBinLink = 'http://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux' ;

	window.askDelete = ( fileName ) =>{
		setSystemMessage( 'deleting \'' + fileName + '\'' );
		setIsDownloading( true );
		$.post( window.baseName + "api.php", {
			'link' : 'cleanfile:' + fileName
		} , function( response ) {
			setSystemMessage( response );
			setIsDownloading( false );
		});
	}

	const askDownload = ( action ) => {
		setIsDownloading( true );
		let link = action ? action : $( 'input.link-input' ).val();
		$.post( window.baseName + "api.php", {
			'link' : link
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
					let icoTrash = $( 'div.icon-holder-trash' ).html();
					let icoDownload = $( 'div.icon-holder-download' ).html();
					for( let video in responseValues ){
						let nh = '<div class="mt-1 text-start">' + (++co ) + ". " + video + ' ';
						nh += `<a class='btn btn-md btn-primary' href='${video}' download>${icoDownload}</a> `;
						nh += `<span class='btn btn-md btn-danger' onclick="window.askDelete('${video}');">${icoTrash}</span><br /> `;
						nh += "</div>" ;
						html.append( nh );
					}
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
		<>
			<div className='icon-holder-trash hidden' style={{'display':'none'}}>
				<BsTrash3Fill/>
			</div>
			<div className='icon-holder-download hidden' style={{'display':'none'}}>
				<BsCloudDownloadFill/>
			</div>
			<div className="container">
				<header><h4>Welcome To YouTube Downloader</h4></header>
				<div className="row mt-5">
					<div className="col-12">
						<h5>
							See this &#160;
							<a target="_blank"
							   href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md">link
							</a>&#160; for supported sites
							<br/><br/>
							<BsListCheck/> list all videos - <BsTrash3Fill/> delete all videos
						</h5>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-12 col-sm-2"></div>
					<div className="col-12 col-sm-8">
						<span className="input-group">
							<span className="input-group-addon p-4">
								<BsListCheck
									onClick={() => askDownload('list')}
									style={iconsStyle}/>
							</span>
							<span className="input-group-addon p-4">
								<BsTrash3Fill
									onClick={() => askDownload('clean')}
									style={iconsStyle}/>
							</span>
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
				</div>
				{systemMessage.length > 0 ? (<div className="row p-4 mt-4 p-0">
					<div className="col-12 col-sm-2 p-0"></div>
					<div className="col-12 col-sm-8 p-0">
						<div className="alert alert-info system-message">
							<h5 className="m-0" dangerouslySetInnerHTML={{__html: systemMessage}}></h5>
						</div>
					</div>
				</div>) : (<div></div>)}
				<footer className="mt-5">
					<h5>Note : if you are in dev mode and have low speed internet ( like me ) <br />
						download yt-dlp binary from <a href={winBinLink} download>windows-link</a>&#160; or &#160;
						<a href={linBinLink} download>linux-link</a> and put it beside api
					</h5>
					<br />
					<h5>All rights NOT reserved for <a href='https://github.com/farhang-sa' target="_blank">ME</a> </h5>
				</footer>
			</div>
		</>
	);
}

const root = createRoot(document.getElementById('app-view'));
root.render(<App/>);