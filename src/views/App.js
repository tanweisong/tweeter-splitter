import React from "react";
import "../styles/App.css";
import _ from "../utils/app.js";
import tweetUtils from "../utils/tweet.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
      tweets: [],
      open: false
    };
  }

  handleChange(e) {
    this.setState({ tweet: e.currentTarget.value });
  }

  handleClose(e) {
    this.setState({
      open: false
    });
  }

  handleEnter(e) {
    if (e.which === 13) {
      this.splitMessage(new Date());

      this.setState({
        tweet: ""
      });
    }
  }

  splitMessage(postedDate) {
    const tweet = this.state.tweet;
    let tweets = this.state.tweets;
    let total = 0;
    let reindex = false;
    let messages = [];
    let addPart = true;
    let error = false;

    function breakTweetInAllowedLength(words) {
      let message = "";
      let temp = [];

      for (let index = 0; index < words.length; index++) {
        let word = words[index];

        if (word.length >= 50 && words.length > 1) {
          messages = [];
          error = true;
          break;
        }

        if (_.isNullOrEmpty(message)) {
          temp.push(word);
          message += word;
        } else {
          if ((message + " " + word).length <= 50) {
            message += " " + word;
            temp.push(word);
          } else {
            messages.push(temp);
            temp = [];
            temp.push(word);
            message = word;
          }

          if (index === words.length - 1) messages.push(temp);
        }
      }
    }

    function processAndPushWord(index) {
      let message = messages[index].slice();
      let sentence = message.join(" ");

      if (sentence.length > 50) {
        let removeWord = message.pop();

        messages[index] = message;

        let nextSentence = messages[index + 1];

        if (_.isNull(nextSentence)) {
          messages.push([]);
          nextSentence = messages[index + 1];
        }

        if (!_.isNull(nextSentence)) nextSentence.splice(0, 0, removeWord);

        processAndPushWord(index);
      }
    }

    function processMessages() {
      total = messages.length;

      for (let index = 0; index < messages.length; index++) {
        let message = messages[index];

        if (!reindex) {
          if (String(total).length !== String(messages.length).length) {
            reindex = true;
          } else {
            if (total !== messages.length) {
              reindex = true;
            }
          }
        }

        if (addPart) message.splice(0, 0, `${index + 1}/${total}`);

        messages[index] = message;

        processAndPushWord(index);
      }

      if (reindex) {
        reindexMessages();
        reindex = false;

        addPart = false;
        processMessages();
      } else {
        mergeMessages();
      }
    }

    function mergeMessages() {
      for (let index = 0; index < messages.length; index++) {
        let sentence = messages[index];
        sentence = sentence.join(" ");

        messages[index] = {
          tweet: sentence,
          postedDate: postedDate
        };
      }
    }

    function reindexMessages() {
      total = messages.length;
      for (let index = 0; index < messages.length; index++) {
        let message = messages[index].slice();

        message[0] = `${index + 1}/${total}`;

        messages[index] = message;
      }
    }

    if (!_.isNullOrEmpty(tweet)) {
      if (tweet.length <= 50) {
        tweets.splice(0, 0, { tweet: tweet, postedDate: postedDate });
        this.setState({
          tweets: tweets
        });
      } else {
        const words = tweet.split(" ");

        breakTweetInAllowedLength(words);

        processMessages();

        tweets = messages.concat(tweets);

        this.setState({
          tweets: tweets
        });
      }
    }

    if (error) {
      this.setState({
        open: true
      });
    }
  }

  render() {
    const tweets = this.state.tweets;
    const items = [];

    for (const [index, tweet] of tweets.entries()) {
      items.push(
        <ListItem key={index} className="tweet">
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  className="block"
                >
                  {tweetUtils.postedOn(tweet.postedDate)}
                </Typography>
                {tweet.tweet}
              </React.Fragment>
            }
          ></ListItemText>
        </ListItem>
      );
    }

    return (
      <div className="App">
        <main>
          <TextField
            id="tweet-input"
            label="What's happening"
            variant="outlined"
            onKeyPress={e => this.handleEnter(e)}
            onChange={e => this.handleChange(e)}
            value={this.state.tweet}
          ></TextField>
          <List>{items}</List>
          <Snackbar
            className="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={this.state.open}
            onClose={e => this.handleClose(e)}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">Not able to split message.</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={e => this.handleClose(e)}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </main>
      </div>
    );
  }
}

export default App;
