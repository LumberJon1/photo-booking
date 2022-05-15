import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import NoMatch from './pages/NoMatch';
import Header from "./components/Header"
import Footer from "./components/Footer"

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='container'>
          <header>
            <Header />
          </header>
          <Routes>
              <Route
                path="/"
                element={<Homepage />}
              />
              <Route 
                path="/projects"
                element={<Projects />}
              />
              <Route
                path="/login"
                element={<Login />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="*"
                element={<NoMatch />}
              />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
