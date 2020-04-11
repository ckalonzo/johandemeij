import React from "react";
import { Route, Router } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { createBrowserHistory } from "history";
import dashboard from "components/dashboard/Dashboard";
import EditPost from "components/dashboard/EditPost";
import Posts from "components/dashboard/Posts";
import Publications from "components/dashboard/Publications";
import Cds from "components/dashboard/Cds";
import MusicCatalogue from "components/dashboard/MusicCatalogue";
import Agendas from "components/dashboard/Agendas"
import Home from "components/Home"
const history = createBrowserHistory();
const SiteRouter = (props) => {

         return(
            <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
             <Switch>
                 <Route path="/dashboard/agenda" component={Agendas} />
                 <Route path="/dashboard/catalogue" component={MusicCatalogue} />
                 <Route path="/dashboard/cds" component={Cds} />
                 <Route path="/dashboard/publications" component={Publications} />
                 <Route path="/dashboard/news/edit/" component={EditPost} />
                 <Route path="/dashboard/news" component={Posts} />
                 <Route path="/dashboard/" component={dashboard} />
                 <Route path="/" component={Home} />
             </Switch>
            </Router>
         )
 
 }

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SiteRouter)
)