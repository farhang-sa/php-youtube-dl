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
		<div className="text-center p-5">
			<div className="container">
				<code>https://www.youtube.com/watch?v=LKqnKrKA1wg</code>
				<div className="row"> &#160; </div>
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
			<div className="row p-4">
				<div className="col-12 col-sm-3"></div>
				<div className="col-12 col-sm-6">
					<div className="alert alert-info system-message">
						{systemMessage}
					</div>
				</div>
			</div>
		</div>
	);
}

const root = createRoot(document.getElementById('app-view'));
root.render(<App/>);