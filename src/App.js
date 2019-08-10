/*
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
// ray test touch <
import fetchIntercept from 'fetch-intercept';
// ray test touch >

import ConnectionAwareMedia from './components/ConnectionAwareMedia';
import './App.css';

const App = () => {
  // ray test touch <
  const unregister = fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        console.log('ray : [unregister request] url, config => ', url, config);
        return [url, config];
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error);
    },

    response: function (response) {
        // Modify the reponse object
        console.log('ray : [unregister response] response => ', response);
        return response;
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error);
    }
  });

  // Call fetch to see your interceptors in action.
  fetch('http://google.com');

  // Unregister your interceptor
  unregister();
  // ray test touch >
  return (
    <div className="App">
      <header className="App-header">
        <ConnectionAwareMedia />
      </header>
    </div>
  );
};

export default App;
