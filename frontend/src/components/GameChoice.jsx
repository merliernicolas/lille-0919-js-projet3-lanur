import React from "react";
import "./style/GameChoice.scss";

class GameChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false
    };
  }

  render() {
    return (
      <div
        className="gameChoice"
        onClick={event => {
          const newClick = !this.state.click;
          this.setState({ click: newClick });
        }}
      >
        <button className={this.state.click ? "status-on" : "status-off"}>
          <img className="picture" src={this.props.picture} />
          <img className="checkbox" src="/pictures/checkboxpurple.png" />
        </button>
      </div>
    );
  }
}

export default GameChoice;
