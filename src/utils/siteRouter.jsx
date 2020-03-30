import React from "react";
import { Route, Router } from "react-router-dom";
import { Switch } from "react-router";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import { createBrowserHistory } from "history";
import dashboard from "components/dashboard/Dashboard";
import EditPost from "components/dashboard/EditPost";


const history = createBrowserHistory();
const SiteRouter = (props) => {

         return(
            <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
             <Switch>
                 
                 <Route path="/dashboard/edit" component={EditPost} />
                 <Route path="/dashboard/" component={dashboard} />
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