import React from 'react';
import { createEvents } from './store';

class Pop extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: ''
    };
  }
  render() {
    return (
      <div className={'popup'}>
        <div className={'popup_inner'}>
          <form onSubmit={e => e.preventDefault()}>
            <input
              type={'text'}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <button
              onClick={() => {
                createEvents(
                  this.state.value,
                  this.props.dayId,
                  this.props.monthId,
                  this.props.yearId
                );
                this.props.closePop();
              }}
            >
              create
            </button>
          </form>
          {/* <button onClick={this.props.closePop}>close</button> */}
        </div>
      </div>
    );
  }
}
export default Pop;
{
  /* <div>Edit</div>
          <div
            onClick={() => {
              deleteEvent(this.props.eventId);
            }}
          >
            Delete
          </div>
          <button onClick={this.props.closePopup}>close</button> */
}
