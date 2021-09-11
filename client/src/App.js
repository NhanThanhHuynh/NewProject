import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./components/Layout/Landing/index";
import Auth from "./components/views/Auth";
import AuthContextProvider from "./contexts/index";
import Dashboard from './components/views/Dashboard'
import Protectedroutes from "./components/routes/Protectedroutes";
import About from "./components/views/About";
import PostcontextProvider from './contexts/Postcontext'

function App() {
  return (
   <AuthContextProvider>
     <PostcontextProvider>
      <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route
          exact
          path="/login"
          render={(props) => <Auth {...props} authRoute="login" />}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Auth {...props} authRoute="register" />}
        />
        <Protectedroutes
          exact
          path="/dashboard"
          component ={Dashboard}
        />
        <Protectedroutes
          exact
          path="/about"
          component ={About}
        />
      </Switch>
    </Router>
    </PostcontextProvider>
   </AuthContextProvider>
  );
}

export default App;
