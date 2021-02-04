import './App.css';
import React, { Component } from 'react';
import SEOCard from './components/seocard/';
import Tools from './components/tools/';
import 'react-app-polyfill/stable';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {url:'', site: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    if ( target.name === "url-text" ) {
      this.setState({url: target.value});
    }
  }

  handleSubmit(event) {
    this.setState({site: this.state.url});

    event.preventDefault();
  }

  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Validation Tools</h1>
        </header>
        <main>
          <p>
            Handy cheatsheet for some quick webpage validation tools!
          </p>

          <form onSubmit={this.handleSubmit}>
            <input type="text" aria-label="URL Input" name="url-text" onChange={this.handleChange} value={this.state.url}></input>
            <input type="submit" value="Submit"></input>
          </form>

          <Tools url={this.state.site}></Tools>
          {this.state.site ? <SEOCard key={this.state.site} url={this.state.site}></SEOCard> :<></>}
        </main>
      </div>
    )
  };
}

export default App;