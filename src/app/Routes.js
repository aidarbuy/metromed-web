import React from "react";
import {
  Route,
  Redirect,
  IndexRoute,
  NotFoundRoute,
} from "react-router";

import Layout   from "./containers/Layout";
import Home     from "./routes/Home";
import About    from "./routes/About";
import Services from "./routes/Services";
import Doctors  from "./routes/Doctors";
import Doctor   from "./routes/Doctor";
import Primary  from "./routes/Primary";
import Location from "./routes/Location";
import Virtual  from "./routes/Virtual";
import Telemed  from "./routes/Telemed";
import Articles from "./routes/Articles";
import Article  from "./routes/Article";
import Gallery  from "./routes/Gallery";
import MuiTheme from "./routes/MuiTheme";
import Router   from "./routes/Router";
import Context  from "./routes/Context";
import Test     from "./routes/Test";
import Visa     from "./routes/Visa";
// import NotFound from "./routes/NotFound";

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
    <IndexRoute                 component={Home}     />
    <Route path="/about"        component={About}    />
    <Route path="/services"     component={Services} />
    <Route path="/doctors"      component={Doctors}  />
    <Route path="/doctors/:id"  component={Doctor}   />
    <Route path="/primary"      component={Primary}  />
    <Route path="/location"     component={Location} />
    <Route path="/virtual"      component={Virtual}  />
    <Route path="/telemed"      component={Telemed}  />
    <Route path="/articles"     component={Articles} />
    <Route path="/articles/:id" component={Article}  />
    <Route path="/gallery"      component={Gallery}  />
    <Route path="/mui-theme"    component={MuiTheme} />
    <Route path="/router"       component={Router}   />
    <Route path="/context"      component={Context}  />
    <Route path="/test"         component={Test}     />
    <Route path="/visa"         component={Visa}     />
  </Route>
);