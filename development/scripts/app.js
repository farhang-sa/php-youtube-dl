import React, {useEffect, useState} from 'react' ;
import { createRoot } from "react-dom/client";
import { BsCloudDownloadFill } from "react-icons/bs";
import ReactLoading from 'react-loading';
import $ from 'jquery' ;

window.React = React;
window.$ = $ ;

const App = () => {

	const [isDownloading, setIsDownloading] = useState(false);
	const [systemMessage , setSystemMessage] = useState('No Message' );

	const askDownload = () => {
		setIsDownloading( true );
		let link = $( 'input.link-input' ).val();
		$.post( "/api.php", {
			'link' : link
		} , function( response ) {
			if( response === 'yt-dlp binary not prepared' ){
				response = 'yt-dlp binary files not available ( check internet )';
			} else if( response === 'Download failed' ){
				/// nothing !
			} else { // File Name received !
				setTimeout(()=>{
					let msg = $( '.system-message' );
					let txt = msg.text();
					let dll = $( '<div><a href="/' + txt + '" download>' + txt + '</a></div>' );
					msg.html( dll.html() );
				} ,500 );
			}
			setSystemMessage( response );
			setIsDownloading(false );
		});
		setSystemMessage( 'Download in progress , please wait' );
	}

	return (
		<>
			<div className="container">
				<header><h4>Welcome To YouTube Downloader</h4></header>
				<div className="row mt-5">
					<div className="col-12">
						<h5>
							See this &#160;
							<a target="_blank"
							    href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md">link
							</a>&#160; for supported sites
						</h5>
					</div>
				</div>
				<div className="row mt-4">
					<div className="col-12 col-sm-2"></div>
					<div className="col-12 col-sm-8">
						<span className="input-group">
							<input type="hidden" name="hidden1" value="hideVal1"/>
							<input type="text"
							   className="form-control form-control-lg link-input"
							   placeholder="Enter link"/>
							{!isDownloading ?
								(<span className="input-group-addon p-4">
								<BsCloudDownloadFill
									onClick={() => askDownload()}
									style={{width: "2em", height: "2em", cursor: "pointer"}}/>
							</span>) : (<span className="input-group-addon p-3">
								<ReactLoading type="spin" color="lightblue"
									  style={{width: "2em", height: "2em"}}/>
							</span>)}
						</span>
					</div>
				</div>
				<div className="row p-4 mt-4 p-0">
					<div className="col-12 col-sm-2 p-0"></div>
					<div className="col-12 col-sm-8 p-0">
						<div className="alert alert-info system-message">
							<h5 className="m-0">{systemMessage}</h5>
						</div>
					</div>
				</div>
				<footer className="mt-4">
					<h5>All Rights NOT Reserved!</h5>
				</footer>
			</div>
		</>
	);
}

const root = createRoot(document.getElementById('app-view'));
root.render(<App/>);