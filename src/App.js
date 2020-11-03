import React from "react";

import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import PostDetail from "./components/PostDetail/PostDetail";
import CreatePost from "./components/CreatePost/CreatePost";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import "./App.scss";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="header-container">
        <Header />
      </div>
      <div className="content">
        <div className="content-container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/share" component={Home} />
            <Route path="/discuss" component={Home} />
            <Route path="/complain" component={Home} />
            <Route path="/compliment" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/createpost" component={CreatePost} />
            <Route path="/postdetail/:postId" component={PostDetail} />
          </Switch>
        </div>
      </div>
      <div className="footer">Copy © 2020 React-BBS</div>
    </div>
  );
}

export default App;
