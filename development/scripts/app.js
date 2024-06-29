import React from 'react' ;
import { createRoot } from "react-dom/client";
import { BsCloudDownloadFill } from "react-icons/bs";
import $ from 'jquery' ;

window.React = React;
window.$ = $ ;

const root = createRoot( document.getElementById( 'app-view' ) );
root.render(
	<div className="text-center p-5">
		<div className="container">
			<code>https://www.youtube.com/watch?v=ZQL7tL2S0oQ</code>
			<form action="/api.php" method="POST" className="input-group">
				<input type="hidden" name="hidden1" value="hideVal1"/>
				<input type="text"
					   className="form-control form-control-lg link-input"
					   placeholder="Enter link" name="link"/>
				<span className="input-group-addon p-4">
					<BsCloudDownloadFill
						style={{width: "2em", height: "2em", cursor: "pointer"}}
					/>
				</span>
			</form>
		</div>
	</div>,
);