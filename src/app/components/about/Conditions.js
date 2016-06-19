import React from 'react';
import Table from 'material-ui/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import ListItemDivider from '../ui/ListItemDivider';

const arr = [
  'Asthma', 'Abdominal Pain', 
  'Allergic Reactions', 'Bites/Stings', 
  'Broken Bones & Sprains', 'Burns', 
  'Eye Injuries', 'Lacerations', 
  'Rashes', 'Sore Throats', 
  'Sports Injuries', 'DOT Physicals', 
  'Travel Medicine', 'Chest Pain', 
  'Occupational Health', 'and many other...'
];

var arrPaired = [];

(function() {
  for (var i = 0; i <= arr.length - 1; i += 2) {
    var pairObj = [];
    pairObj.push(arr[i])
    pairObj.push(arr[i + 1])
    arrPaired.push(pairObj)
  }
})();

export default React.createClass({
  render() {
    var rows = arrPaired.map((item, i) => {
      return (
        <TableRow key={item[0]}>
          <TableRowColumn className="conditions-tableRow">
            {item[0]}
          </TableRowColumn>
          <TableRowColumn className="conditions-tableRow">
            {item[1]}
          </TableRowColumn>
        </TableRow>
      );
    })

    var items = arr.map((item, i) => {
      return (
        <div key={i}>
          <ListItem className="conditions-tableRow">
            {item}
          </ListItem>
          <Divider/>
        </div>
      );
    });

    return (
      <div>
        <Table className="conditions-lg-xs">
          <TableBody displayRowCheckbox={false} 
            stripedRows={false}
          >{rows}
          </TableBody>
        </Table>

        <List className="conditions-xs">
          {items}
        </List>
      </div>
    )
  }
});