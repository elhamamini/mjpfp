import React from 'react';

import ReactDOM from 'react-dom';
import Popup from './popup.js';
// import Pop from './mainPop.js';
import { HashRouter, Route, Link, NavLink } from 'react-router-dom';

import {
  store,
  fetchDays,
  fetchMonths,
  fetchYears,
  createEvents,
  fetchEvents,
  deleteEvent
} from './store.js';
import axios from 'axios';
let hidden = 'hidden';

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
      selected: false,
      show: false,
      evId: '',
      id: '',
      showPopup: false
      // showPop: false
    };
    this.togglePopup = this.togglePopup.bind(this);
  }

  togglePopup(e) {
    console.log('****** target', e.target);
    this.setState(prevState => ({
      ...prevState,
      showPopup: !prevState.showPopup
    }));
  }
  // togglePop() {
  //   this.setState({ showPop: !this.state.showPop });
  // }
  render() {
    const { months, days, years, events } = this.props;
    console.log(this.state.selected);

    console.log(this.state.value);
    const yearId = years.id;
    console.log('year', yearId);
    const monthId = months.id;
    const _days = days.map(day => {
      return {
        ...day,
        events: events.filter(
          event => event.dayId === day.id && event.monthId === monthId
        )
      };
    });
    console.log('events', events);
    return (
      <div>
        <h1>{years.num}</h1>
        <h2>{months.name}</h2>

        <div className="grid">
          {days &&
            _days.map(day => (
              <div key={day.id}>
                {months.name}
                {day.day}
                <div>
                  {day.events &&
                    day.events.map(event => (
                      <div key={event.id} onClick={this.togglePopup}>
                        {event.task}

                        {/* {this.state.showPopup === true ? (
                          <Popup
                            eventId={event.id}
                            value={this.state.value}
                            select={this.state.selected}
                            closePopup={this.togglePopup}
                          />
                        ) : (
                          ''
                        )} */}
                      </div>
                    ))}
                </div>
                <div
                  className={'squer'}
                  // onClick={this.togglePop.bind(this)}
                  onClick={() => {
                    this.setState({
                      selected: !this.state.selected,
                      id: day.id
                    });
                  }}
                >
                  +
                </div>

                {this.state.showPopup === true ? (
                  <Popup
                    eventId={event.id}
                    value={this.state.value}
                    select={this.state.selected}
                    closePopup={this.togglePopup}
                  />
                ) : (
                  ''
                )}

                {/* {this.state.showPop ? (
                  <Pop
                    closePop={this.togglePop.bind(this)}
                    dayId={day.id}
                    monthId={monthId}
                    yearId={yearId}
                  />
                ) : (
                  ''
                )} */}
                {day.id === this.state.id && (
                  <form
                    className={this.state.selected ? '' : hidden}
                    onSubmit={e => e.preventDefault()}
                  >
                    <input
                      type={'text'}
                      onChange={e => this.setState({ value: e.target.value })}
                    />
                    <button
                      onClick={() =>
                        createEvents(this.state.value, day.id, monthId, yearId)
                      }
                    >
                      create
                    </button>
                  </form>
                )}
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
export default { App, MonthPage };
