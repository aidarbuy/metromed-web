import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

function getStyles(textColor, colonColor, bgColor) {
  return {
    left: {
      padding: 0,
      color: textColor,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      textAlign: 'right',
      width: '45%',
    },
    center: {
      padding: 0,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      width: '5%',
      textAlign: 'center',
      color: colonColor,
    },
    right: {
      padding: 0,
      color: textColor,
      fontSize: 'inherit',
      fontWeight: 'inherit',
      width: '45%',
      textAlign: 'left',
    }
  };
}

const hours = [
  ["Sunday", ":", "closed"],
  ["Monday &ndash; Friday", ":", "10 am to 8 pm"],
  ["Saturday", ":", "closed"]
];

class HoursOfOperation extends React.Component {
  constructor(props) {
    super(props);
    this.constructor.updateColors = this.constructor.updateColors.bind(this);
    const { textColor, colonColor, bgColor } = this.props;
    this.state = { styles: getStyles(textColor, colonColor, bgColor) };
  }

  static updateColors(textColor, colonColor, bgColor) {
    this.setState({styles: getStyles(textColor, colonColor, bgColor)});
  }

  render() {
    const { styles } = this.state;
    // const hoursRow = hours.map((row, i) => {
    //   console.debug(row)
    // });

    return (
      <Table style={{background: this.props.bgColor}}>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={styles.left}>Sunday</TableHeaderColumn>
            <TableHeaderColumn style={styles.center}>:</TableHeaderColumn>
            <TableHeaderColumn style={styles.right}>closed</TableHeaderColumn>
          </TableRow>

          <TableRow>
            <TableRowColumn style={styles.left}>Monday &ndash; Friday</TableRowColumn>
            <TableRowColumn style={styles.center}>:</TableRowColumn>
            <TableRowColumn style={styles.right}>10 am to 8 pm</TableRowColumn>
          </TableRow>

          <TableRow>
            <TableHeaderColumn style={styles.left}>Saturday</TableHeaderColumn>
            <TableHeaderColumn style={styles.center}>:</TableHeaderColumn>
            <TableHeaderColumn style={styles.right}>closed</TableHeaderColumn>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
};

export default HoursOfOperation;