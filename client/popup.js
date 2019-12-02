import React from 'react';
import { deleteEvent, editEvent } from './store.js';
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      show: false
    };
  }
  render() {
    return (
      <div className={'popup'}>
        <div className={'popup_inner'}>
          <div
            onClick={() => {
              this.setState({ show: true });
            }}
          >
            Edit
          </div>

          {this.state.show === true ? (
            <form onSubmit={ev => ev.preventDefault()}>
              <input
                type="text"
                onChange={ev => this.setState({ value: ev.target.value })}
              />
              <button
                onClick={() => editEvent(this.props.eventId, this.state.value)}
              >
                change
              </button>
            </form>
          ) : (
            ''
          )}
          <div
            onClick={() => {
              deleteEvent(this.props.eventId);
            }}
          >
            Delete
          </div>
          <button onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    );
  }
}
export default Popup;
