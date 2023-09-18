import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";

import { ArticleDetails } from "./components/Articles/ArticleDetails";
import ArticleList from "./components/Articles/ArticleParcel";
import Editor from "./components/Editor";
import LoginRegister from "./components/LoginRegister";
import Logout from "./components/Logout";
import { Profile } from "./components/AuthorProfile/Profile";
import Settings from "./components/Settings";
import { Navigator } from "./components/_navigation/Navigation";

function App(): JSX.Element {
  return (
    <Router>
      <Navigator />
      <Switch>
        <Route path="/editor" exact component={Editor} />
        <Route path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={LoginRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />
        {/* <Route path="/profile/:username" exact component={Profile} /> */}
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={LoginRegister} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/:slug" exact component={ArticleDetails} />
        <Route path="/" component={ArticleList} />
      </Switch>
    </Router>
  );
}

export default App;
