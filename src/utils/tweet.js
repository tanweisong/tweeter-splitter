import dateUtils from "../utils/date";

export default {
  postedOn: function(value) {
    let simplifiedDate = dateUtils.formatDateTime(value);

    if (simplifiedDate.hasOwnProperty("seconds")) {
      return `Posted ${
        simplifiedDate.seconds > 1
          ? simplifiedDate.seconds + " secs ago"
          : "just now"
      }`;
    } else if (simplifiedDate.hasOwnProperty("minutes")) {
      return `Posted ${simplifiedDate.minutes} ${
        simplifiedDate.minutes > 1 ? "mins ago" : "min ago"
      }`;
    } else if (simplifiedDate.hasOwnProperty("hours")) {
      return `Posted ${simplifiedDate.hours} ${
        simplifiedDate.hours > 1 ? "hrs ago" : "hr ago"
      }`;
    }
  }
};
