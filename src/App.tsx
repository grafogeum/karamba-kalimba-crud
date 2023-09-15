import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import { UserContext } from "./shared/userContext";

import { Article } from "./components/Article";
import ArticleList from "./components/ArticleList";
import Editor from "./components/Editor";
import LoginRegister from "./components/LoginRegister";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App(): JSX.Element {
  return (
    <UserContext.Provider value={{}}>
      <Router>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginRegister} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={LoginRegister} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
