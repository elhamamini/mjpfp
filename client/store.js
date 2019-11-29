import axios from 'axios';
import { createStore, combineReducers } from 'redux';
const SET_YEARS = 'SET_YEARS';
const SET_MONTHS = 'SET_MONTHS';
const SET_DAYS = 'SET_DAYS';
const SET_EVENT = 'SET_EVENT';
const CREATE_EVENT = 'CREATE_EVENT';

const reducer = combineReducers({
  years: (state = [], action) => {
    if (action.type === SET_YEARS) {
      state = action.years;
    }
    return state;
  },
  months: (state = [], action) => {
    if (action.type === SET_MONTHS) {
      state = action.months;
    }
    return state;
  },
  days: (state = [], action) => {
    if (action.type === SET_DAYS) {
      state = action.days;
    }
    return state;
  },
  events: (state = [], action) => {
    if (action.type === SET_EVENT) {
      state = action.events;
    } else if (action.type === CREATE_EVENT) {
      state = [...state, action.event];
    }
    return state;
  }
});
const getYears = years => {
  return {
    type: SET_YEARS,
    years
  };
};

const fetchYears = id => {
  axios
    .get(`/api/years/${id}`)
    .then(responses => store.dispatch(getYears(responses.data)))
    .catch(e => console.log(e));
};
const getMonths = months => {
  return {
    type: SET_MONTHS,
    months
  };
};
const getEvent = event => {
  return {
    type: CREATE_EVENT,
    event
  };
};
const createEvents = text => {
  console.log(text);
  return axios
    .post('/api/events', text)
    .then(response => store.dispatch(getEvent(response.data)))
    .catch(e => console.log(e));
};
const getAllEvents = events => {
  return {
    type: SET_EVENT,
    events
  };
};
const fetchEvents = () => {
  axios
    .get('/api/events')
    .then(response => store.dispatch(getAllEvents(response.data)))
    .catch(e => console(e));
};
const fetchMonths = id => {
  axios
    .get(`/api/months/${id}`)
    .then(responses => store.dispatch(getMonths(responses.data)))
    .catch(e => console.log(e));
};
const getDays = days => {
  return {
    type: SET_DAYS,
    days
  };
};
const fetchDays = () => {
  axios
    .get('/api/days')
    .then(responses => store.dispatch(getDays(responses.data)))
    .catch(e => console.log(e));
};
const store = createStore(reducer);
export { store, fetchDays, fetchMonths, fetchYears, createEvents, fetchEvents };
