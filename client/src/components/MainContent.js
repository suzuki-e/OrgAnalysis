import React from "react";
import PropTypes from 'prop-types';
import TopPage from "../pages/top";
import UserTop from "../pages/user";
import ChannelTop from "../pages/channel";
import ChannelShow from "../pages/channel/show";
import MessageTop from "../pages/message";
import EmojiTop from "../pages/emoji";
import SettingTop from "../pages/setting";
import {Switch, Route} from "react-router-dom"

export default class MainContent extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <Switch>
        <Route exact path='/' render={props => (
          <TopPage classes={classes} {...props} />
        )}/>
        <Route exact path='/users' render={props => (
          <UserTop classes={classes} {...props}/>
        )}/>
        <Route exact path='/channels' render={props => (
          <ChannelTop classes={classes} {...props}/>
        )}/>
        <Route exact path='/channels/:id' render={props => (
          <ChannelShow classes={classes} {...props}/>
        )}/>
        <Route exact path='/messages' render={props => (
          <MessageTop classes={classes} {...props}/>
        )}/>
        <Route exact path='/emojis' render={props => (
          <EmojiTop classes={classes} {...props}/>
        )}/>
        <Route exact path='/settings' render={props => (
          <SettingTop classes={classes} {...props}/>
        )}/>
        <Route render={() => <h1>Not Found.</h1>}/>
      </Switch>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.object.isRequired,
};
