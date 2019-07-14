import React  from "react";
import { Route } from "react-router-dom";
import Authorization from './components/Authorization';
import { Login, Success, Error } from './components/OAuth';
import Layout from './components/Layout';
import Home from './components/Home';
import Admin from "./components/Admin";
import RedirectOffServer from "./components/RedirectOffServer";
import Assignment from "./components/Assignment";

const routes = (
    <Layout>
        <Route exact path="/" component={(props) =>
            <Authorization
                Component={Home} {...props} />
        } />
        <Route exact path="/Admin" component={(props) =>
            <Authorization admins
                Component={Admin} {...props} />
        } />

        <Route exact path="/OAuth"
          component={Login}
        />
        <Route exact path="/OAuth/Error"
          component={Error}
        />
        <Route exact path="/OAuth/Success"
          component={Success}
        />
        <Route exact path="/Canvas"
            component={() => <RedirectOffServer target="https://iu.instructure.com/courses/1771414" />}
        />
        <Route exact path="/GitHub"
          component={() => <RedirectOffServer target="https://github.iu.edu/csci-b351-sp19" />}
        />
        <Route exact path="/Piazza"
          component={() => <RedirectOffServer target="https://piazza.com/class/jqeh2dv9h5b1q7" />}
        />

        <Route path={"/assignments/:id"} component={(props) => 
            <Authorization key={props.match.params.id}
                Component={Assignment} {...props} />
        } />

    </Layout>
);

export default routes