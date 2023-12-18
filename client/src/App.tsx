import "./App.css";
import Navigation from "./components/partials/Navigation";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";
import useAuth, { AuthProvider } from "./hooks/useAuth";

import CreateGame from "./pages/Game/CreateGame/CreateGame";
import MyGames from "./pages/Game/MyGames/MyGames";
import JoinGame from "./pages/Game/JoinGame/JoinGame";

function AuthenticatedRoute({ path, component }: RouteProps) {
  const { token, user } = useAuth();

  if (!token || !user) return <Redirect to="/login" />;

  return <Route path={path} component={component} />;
}

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navigation />
        <div className="App">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <AuthenticatedRoute path="/create-game" component={CreateGame} />
            <AuthenticatedRoute path="/my-games" component={MyGames} />
            <AuthenticatedRoute path="/join-game/:code" component={JoinGame} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
