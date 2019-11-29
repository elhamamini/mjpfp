import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link, NavLink } from 'react-router-dom';

import {
  store,
  fetchDays,
  fetchMonths,
  fetchYears,
  createEvents,
  fetchEvents
} from './store.js';
import axios from 'axios';
let countForYears = 1;
let countForMonths = 1;
const nextPage = () => {
  if (countForMonths < 12) {
    countForMonths += 1;
  } else if (countForMonths === 12) {
    countForYears += 1;
    fetchYears(countForYears);
    countForMonths = 1;
  }
  fetchMonths(countForMonths);
};
const prevPage = () => {
  if (countForMonths > 1) {
    countForMonths -= 1;
  } else if (countForMonths === 1) {
    countForYears -= 1;
    fetchYears(countForYears);
    countForMonths = 12;
  }
  fetchMonths(countForMonths);
};
// const createEvent = text => {
//   console.log('44444', text);
// };

class MonthPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: ''
    };
  }
  // createEvent = text => {
  //   console.log('44444', text);
  // };
  render() {
    const { months, days, years, events } = this.props;
    console.log(events);

    return (
      <div>
        <h1>{years.num}</h1>
        <h2>{months.name}</h2>

        <div className={'grid'}>
          {days &&
            days.map(day => (
              <div key={day.id}>
                {months.name}
                {day.day}
                <form onSubmit={e => e.preventDefault()}>
                  <input
                    type={'text'}
                    onChange={e => this.setState({ value: e.target.value })}
                  />
                  <button
                    onClick={() => createEvents(this.state.value, day.id)}
                  >
                    create
                  </button>
                </form>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    fetchYears(countForYears);
    fetchMonths(countForMonths);
    fetchDays();
    fetchEvents();
  }

  render() {
    console.log(this.state.years);
    // console.log(this.state.months);
    console.log(this.state.days);
    return (
      <div>
        <button onClick={prevPage}>prev</button>
        <button onClick={nextPage}>next</button>

        <MonthPage {...this.state} />
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector('#root'));
export default App;
