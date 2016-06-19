import ArticlesCards from '../components/home/ArticlesCards';
import CallToAction from '../components/home/CallToAction';
import CustomServices from '../components/home/CustomServices';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Helmet from 'react-helmet';
import LayerSlider from '../components/home/LayerSlider';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import Testimonials from '../components/home/Testimonials';
import TopBar from '../components/home/TopBar';

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      const { toggled } = store.getState().appFooter;
      if (toggled) TopBar.updateColors();
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleTouchTap() {
    this.setState({ open: true });
  }

  render() {
    const { 
      accent1Color, alternateTextColor, canvasColor, clockCycleColor,
      primary1Color, primary2Color,
    } = this.context.muiTheme.palette;
    const standardActions = (
      <RaisedButton
        label="Ok"
        secondary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <div>
        <Helmet title="Metromed Urgent Care"
        />

        {/* Banner carousel with animated slides */}
        <LayerSlider
        />

        {/* Block with contact info and working hours */}
        <TopBar
        />

        {/* Call to action with call button */}
        <CallToAction
          textColor     = {alternateTextColor}
          paperBgColor  = {accent1Color}
          buttonBgColor = {primary1Color}
        />

        {/* Four cards with big icons */}
        <CustomServices
          hoverColor = {accent1Color}
          iconColor  = {primary1Color}
          titleColor = {primary2Color}
        />

        {/* Acticles and Testimonials blocks */}
        <div className='flex-container'>
          <div className='flex-container-half'>
            <ArticlesCards
              accentColor = {accent1Color}
              canvasColor = {canvasColor}
            />
          </div>

          <div className='flex-container-half'>
            <Testimonials
              secondaryTextColor = {clockCycleColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

Main.contextTypes = {
  store: React.PropTypes.object,
  muiTheme: React.PropTypes.object,
};

export default Main;
