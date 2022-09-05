import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Auth from './Views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './Views/Dashboard';
import ProtecedRoute from './components/routing/ProtecedRoute';
import About from './Views/About';

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/login' render={props => <Auth {...props} authRoute='login' />} />
                    <Route exact path='/register' render={props => <Auth {...props} authRoute='register' />} />
                    <ProtecedRoute exact path='/dashboard' component={Dashboard} />
                    <ProtecedRoute exact path='/about' component={About} />
                </Switch>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
