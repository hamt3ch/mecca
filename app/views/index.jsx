var React = require('react');

class HelloMessage extends React.Component {
  render() {
    return(
      <div>{this.props.name}</div>
    );
  }
}

module.exports = HelloMessage;
