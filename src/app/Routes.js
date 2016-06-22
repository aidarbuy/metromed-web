import About     from './routes/About';
import Article   from './routes/Article';
import Articles  from './routes/Articles';
import ArtEditor from './routes/ArtEditor';
import Auth      from './routes/Auth';
import Balance   from './routes/Balance';
import Context   from './routes/Context';
import Doctor    from './routes/Doctor';
import Doctors   from './routes/Doctors';
import Gallery   from './routes/Gallery';
import Home      from './routes/Home';
import Layout    from './Layout';
import Location  from './routes/Location';
import MuiTheme  from './routes/MuiTheme';
// import NotFound  from "./routes/NotFound";
import Palette   from './routes/Palette';
import React     from "react";
import { Route, Redirect, IndexRoute, NotFoundRoute }  from "react-router";
import Router    from './routes/Router';
import Services  from './routes/Services';
import Telemed   from './routes/Telemed';
import Test      from './routes/Test';
import Virtual   from './routes/Virtual';
import Visa      from './routes/Visa';

/**
 * Routes: https://github.com/rackt/react-router/blob/master/docs/api/components/Route.md
 *
 * Routes are used to declare your view hierarchy.
 *
 * Say you go to http://material-ui.com/#/components/paper
 * The react router will search for a route named 'paper' 
 * and will recursively render its handler and its parent 
 * handler like so: Paper > Components > Master
 */

module.exports = (
  <Route path="/"               component={Layout}>
    <IndexRoute                 component={Home}      />
    <Route path="/about"        component={About}     />
    <Route path="/editor"       component={ArtEditor} />
    <Route path="/articles"     component={Articles}  />
    <Route path="/articles/:id" component={Article}   />
    <Route path="/auth"         component={Auth}      />
    <Route path="/context"      component={Context}   />
    <Route path="/balance"      component={Balance}   />
    <Route path="/doctors"      component={Doctors}   />
    <Route path="/doctors/:id"  component={Doctor}    />
    <Route path="/gallery"      component={Gallery}   />
    <Route path="/location"     component={Location}  />
    <Route path="/mui-theme"    component={MuiTheme}  />
    <Route path="/palette"      component={Palette}   />
    <Route path="/router"       component={Router}    />
    <Route path="/services"     component={Services}  />
    <Route path="/telemed"      component={Telemed}   />
    <Route path="/test"         component={Test}      />
    <Route path="/virtual"      component={Virtual}   />
    <Route path="/visa"         component={Visa}      />
  </Route>
);