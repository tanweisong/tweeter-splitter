import React from "react";
import { createShallow } from "@material-ui/core/test-utils";
import App from "../views/App";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Snackbar from "@material-ui/core/Snackbar";

describe("<App />", () => {
  const shallow = createShallow();

  it("renders without crashing", async () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(List)).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(0);
  });

  it("inputs 'abc 123456789012345678901234567890123456789012345678901' and nothing should be rendered", async () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state("open")).toBeFalsy();

    await wrapper.instance().handleChange({
      currentTarget: {
        value: "abc 123456789012345678901234567890123456789012345678901"
      }
    });

    await wrapper.instance().handleEnter({
      key: "Enter",
      which: 13
    });

    expect(wrapper.state("tweets")).toHaveLength(0);

    expect(wrapper.find(ListItem)).toHaveLength(0);
    expect(wrapper.state("open")).toBeTruthy();
  });

  it("inputs '12345678901234567890123456789012345678901234567890', should render 1 list item", async () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state("open")).toBeFalsy();

    await wrapper.instance().handleChange({
      currentTarget: {
        value: "12345678901234567890123456789012345678901234567890"
      }
    });

    await wrapper.instance().handleEnter({
      key: "Enter",
      which: 13
    });

    expect(wrapper.state("tweets")).toHaveLength(1);

    expect(wrapper.find(ListItem)).toHaveLength(1);
    expect(wrapper.state("open")).toBeFalsy();
  });

  it("inputs 'Test' and 1 list item is rendered", async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleChange({
      currentTarget: {
        value: "Test"
      }
    });

    expect(wrapper.state("tweet")).toEqual("Test");

    await wrapper.instance().handleEnter({
      key: "Enter",
      which: 13
    });

    const tweets = wrapper.state("tweets");

    expect(tweets).toHaveLength(1);
    expect(wrapper.find(ListItem)).toHaveLength(tweets.length);
  });

  it("inputs 'I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself.' and each part is not longer than 50 characters", async () => {
    const wrapper = shallow(<App />);

    await wrapper.instance().handleChange({
      currentTarget: {
        value:
          "I can't believe Tweeter now supports chunking my messages, so I don't have to do it myself."
      }
    });

    await wrapper.instance().handleEnter({
      key: "Enter",
      which: 13
    });

    const tweets = wrapper.state("tweets");

    expect(wrapper.find(ListItem)).toHaveLength(tweets.length);

    for (let index = 0; index < tweets.length; index++) {
      const tweet = tweets[index];

      expect(tweet.tweet.length).toBeLessThan(51);
    }
  });
});
