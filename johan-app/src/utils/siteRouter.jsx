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
import AgendaList from "components/AgendaList"
import MusicProfile from "components/MusicProfile"
import CdProfile from "components/CdProfile"
import NewPost from "components/dashboard/NewPost"
import DashboardEvents from "components/dashboard/DashboardEvents"
import EditEvent from "components/dashboard/EditEvent"
import NewPublication from "components/dashboard/NewPublication"
import NewCd from "components/dashboard/NewCd"
import Submissions from "components/dashboard/Submissions";
import NewAgenda from "components/dashboard/NewAgenda";
import Login from "components/dashboard/Login"
import Submission from "components/dashboard/EditSubmission"
import Contacts from "components/dashboard/Contacts"
import EditContact from "components/dashboard/EditContact"
import NewMusicCatalogue from "components/dashboard/NewMusicCatalogue"
import Locations from "components/dashboard/OrderLocations"
import NewOrderLocation from "components/dashboard/NewOrderLocation"
import ReactGA from 'react-ga';
const trackingId = 'UA-21994018-1'
ReactGA.initialize(trackingId);

const history = createBrowserHistory();
const SiteRouter = (props) => {
const loggedInUser = localStorage.getItem('user') ? localStorage.getItem('user'):[]
const isLoggedIn = loggedInUser.length > 0 ? true:false

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});
return(
<Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
<Switch>
  
  <Route path="/dashboard/events/edit/:id" component={!isLoggedIn ? Login:EditEvent} />
  <Route path="/dashboard/events" component={!isLoggedIn ? Login:DashboardEvents} />
  <Route path="/dashboard/agenda/:id" component={!isLoggedIn ? Login:NewAgenda} />
  <Route path="/dashboard/agenda" component={!isLoggedIn ? Login:Agendas} />
  <Route path="/dashboard/contact/:id" component={EditContact} />
  <Route path="/dashboard/contact" component={!isLoggedIn ? Contacts:Contacts} />
  
  <Route path="/dashboard/catalogue/:id" component={!isLoggedIn ? Login:NewMusicCatalogue} />
  <Route path="/dashboard/catalogue/new" component={!isLoggedIn ? Login:NewMusicCatalogue} />
  <Route path="/dashboard/catalogue" component={!isLoggedIn ? Login:MusicCatalogue} />
  
  <Route path="/dashboard/order/:id" component={!isLoggedIn ? Login:NewOrderLocation} />
  <Route path="/dashboard/order" component={!isLoggedIn ? Login:Locations} />

  <Route path="/dashboard/cds/edit/:id" component={!isLoggedIn ? Login:NewCd} />
  <Route path="/dashboard/cds/new" component={!isLoggedIn ? Login:NewCd} />
  <Route path="/dashboard/cds" component={!isLoggedIn ? Login:Cds} />
  <Route path="/dashboard/publications/edit/:id" component={!isLoggedIn ? Login:NewPublication} />
  <Route path="/dashboard/publications/new" component={!isLoggedIn ? Login:NewPublication} />
  <Route path="/dashboard/publications" component={!isLoggedIn ? Login:Publications} />
  <Route path="/dashboard/news/new" component={!isLoggedIn ? Login:NewPost} />
  <Route path="/dashboard/news/edit/:id" component={!isLoggedIn ? Login:EditPost} />
  <Route path="/dashboard/news" component={!isLoggedIn ? Login:Posts} />
  <Route path="/dashboard/submissions/edit/:id" component={!isLoggedIn ? Login:Submission} />
  <Route path="/dashboard/submissions" component={!isLoggedIn ? Login:Submissions} />
  <Route path="/dashboard/login" component={Login} />
  <Route path="/dashboard" component={dashboard} />
  <Route path="/order" component={Order} />
  <Route path="/rentalcatalogue" component={RentalCatalogue} />
  <Route path="/biography" component={Biography} />
  <Route path="/music/profile/:id" component={MusicProfile} />
  <Route path="/music" component={Music} />
  <Route path="/events" component={Events} />
  <Route path="/post/:id" component={Post} />
  <Route path="/agenda" component={AgendaList} />
  <Route path="/news" component={News} history={history} />
  <Route path="/cd/profile/:id" component={CdProfile} />
  <Route path="/" component={Home} history={history} />
</Switch>
</Router>
)
 
 }

const mapStateToProps = state => {
  return {
    user:state.userReducer
  };
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