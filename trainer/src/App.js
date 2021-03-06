import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Video from './pages/Video'
import NotFound from './pages/NotFound';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/AlertModal';
import { AuthContext } from './components/Auth';
import Admin from './pages/Admin';


const options = {
  timeout: 3000,
};

const PrivateRoute = ({isAdmin}) => {
  return(
    !isAdmin ? <Redirect to="/" component={ Home } /> : <Route exact path="/admin" component={ Admin } />
  )
}
const  UserOnlyRoute = ({currentUser}) => {
  return(
    !currentUser? <Redirect to="/" component={ Home } /> : <Route exact path="/video" component={ Video } />
  )
}

function App() {

  const  {currentUser} = useContext(AuthContext)
  const isAdmin = currentUser === null? false : currentUser.email === 'admin@gmail.com' ? true : false 


  return (
    <div>

      <Router>
          <AlertProvider template={AlertTemplate}  {...options}>  
            <Layout>
              <Switch>
                <Route exact path="/" component={ Home } />
                <Route exact path="/contact" component={ Contact } />
                <Route exact path="/register" component={ Register } />
                <Route exact path="/login" component={ Login } />
                <Route exact path="/us" component={ About } />
                <UserOnlyRoute path="/video" currentUser={currentUser} />
                <PrivateRoute path='/admin' isAdmin={isAdmin}/>
                <Route path="*" component={ NotFound } />
              </Switch>
            </Layout>
          </AlertProvider>
        </Router>  

    </div>
  );
}

export default App;