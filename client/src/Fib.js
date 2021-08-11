import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({values: values.data})
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({seenIndexes: seenIndexes.data})
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index
    })
    .then( (response) => console.log("response:"+response))
    .catch( (error) => console.log("error:"+error));
          
    this.setState({index: ''})
    this.fetchIndexes();
    this.fetchValues();
  }

  renderSeenIndexes() {
    const seenIndex = this.state.seenIndexes.map(({ number })=> number).join(', ');
    return seenIndex
  }

  renderCalculatedvalues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push (
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      )
    }

    return entries;
  }

  refreshResult() {
    this.fetchIndexes();
    this.fetchValues();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input value={this.state.index}
                onChange={event => this.setState({index: event.target.value})}/>
          <button>SUBMIT</button>
        </form>
        <hr/>
        <h3>Index I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated Values:</h3>
        {this.renderCalculatedvalues()}
      </div>   
    )
  }
}

export default Fib;