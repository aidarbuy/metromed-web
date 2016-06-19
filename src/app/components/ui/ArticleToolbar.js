import ArrowBack from 'material-ui/svg-icons/image/navigate-before';
import ArrowForward from 'material-ui/svg-icons/image/navigate-next';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import RaisedButton from 'material-ui/FlatButton';
import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

export default ({canvas, border, prev, prevBtn, label, next, nextBtn, borderTop, borderBottom}) => (
	<Toolbar noGutter={true} style={{
		background: canvas, 
		borderTop: '1px solid ' + border, 
		borderBottom: '1px solid ' + border, 
		borderTopWidth: borderTop,
		borderBottomWidth: borderBottom,
	}}>
		<ToolbarGroup firstChild={true}>
			<RaisedButton label="Previous" labelPosition="after" primary={true} disabled={prevBtn}
				icon={<ArrowBack/>} linkButton={true} href={"/articles/" + prev} 
			/>
		</ToolbarGroup>
		<ToolbarGroup>
			<RaisedButton label={label} labelPosition="after" primary={true} linkButton={true} href="/articles" />
		</ToolbarGroup>
		<ToolbarGroup lastChild={true}>
			<RaisedButton label="Next" labelPosition="before" primary={true} disabled={nextBtn} 
				icon={<ArrowForward />} linkButton={true} href={"/articles/" + next} 
			/>
		</ToolbarGroup>
	</Toolbar>
);