import React from 'react';
import Popup from 'reactjs-popup';
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

class MonthPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: '',
      selected: false
    };
  }

  render() {
    const { months, days, years, events } = this.props;
    console.log(events);

    console.log(this.state.value);
    const yearId = years.id;
    const monthId = months.id;
    const _days = days.map(day => {
      return {
        ...day,
        events: events.filter(
          event => event.dayId === day.id && event.monthId === monthId
        )
      };
    });

    return (
      <div>
        <h1>{years.num}</h1>
        <h2>{months.name}</h2>

        <div className={'grid'}>
          {days &&
            _days.map(day => (
              <div key={day.id}>
                {months.name}
                {day.day}
                <div>
                  {day.events &&
                    day.events.map(event => <div>{event.task}</div>)}
                </div>
                <div
                  className={'squer'}
                  onClick={() => {
                    this.state.selected = true;
                  }}
                >
                  +
                </div>
                <form
                  className={this.state.selected ? '' : ''}
                  onSubmit={e => e.preventDefault()}
                >
                  <input
                    type={'text'}
                    onChange={e => this.setState({ value: e.target.value })}
                  />
                  <button onClick={() => createEvents(this.state.value)}>
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
