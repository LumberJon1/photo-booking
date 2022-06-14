import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventForm from "./components/EventForm";
import Projects from "./pages/Projects";
import SingleEvent from "./pages/SingleEvent";
import Calendar from "./pages/Calendar";
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

// Allows the use of authentication tokens to use in HttpLink
import {setContext} from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: '/graphql',
});

// Sets the HTTP headers with the token for every HTTP request made.
// Underscore here is a placeholder for an unused required first parameter
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
      <ApolloProvider client={client}>
        <Router>
          <div className="h-screen flex flex-col items-center m-0">
            <header className="flex bg-slate-500 w-full">
              <Header />
            </header>
            <main className="h-full pb-16 z-10">
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
                    path="/addevent"
                    element={<EventForm />}
                  />
                  <Route
                    path="/event/:id"
                    element={<SingleEvent />}
                  />
                  <Route
                    path="/calendar"
                    element={<Calendar />}
                  />
                  <Route
                    path="*"
                    element={<NoMatch />}
                  />
              </Routes>
            </main>
            <footer className="fixed bottom-0 text-center text-slate-300 h-8 z-0">
              <Footer />
            </footer>
          </div>
        </Router>
      </ApolloProvider>
  );
}

export default App;
