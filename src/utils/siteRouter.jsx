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
import Post from "components/Post"
import Biography from "components/Biography"
import Music from "components/Music"
import Events from "components/Events"
import Order from "components/Order"
import News from "components/News"
import RentalCatalogue from "components/RentalCatalogue";
const history = createBrowserHistory();
const SiteRouter = () => {

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
                 <Route path="/order" component={Order} />
                 <Route path="/rentalcatalogue" component={RentalCatalogue} />
                 <Route path="/biography" component={Biography} />
                 <Route path="/music" component={Music} />
                 <Route path="/events" component={Events} />
                 <Route path="/post/:id" component={Post} />
                 <Route path="/news" component={News} history={history} />
                 <Route path="/" component={Home} history={history} />
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