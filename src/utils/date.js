export default {
  formatDateTime: function(value) {
    if (value instanceof Date) {
      const milliseconds = value.getTime();
      const currentMS = new Date().getTime();
      let msDiff = currentMS - milliseconds;

      if (msDiff < 60000) {
        const seconds = Math.round(msDiff / 1000);

        return {
          seconds
        };
      } else if (msDiff < 3600000) {
        const minutes = Math.round(msDiff / 60000);

        return {
          minutes
        };
      } else if (msDiff < 86400000) {
        const hours = Math.round(msDiff / 3600000);

        return {
          hours
        };
      } else {
        return {
          date: `${value.getDate()}, ${this.getMonthName(
            value.getMonth()
          )} ${value.getFullYear()} `
        };
      }
    } else return String(value);
  },

  getMonthName(value, bShort = true) {
    let monthName = "";
    switch (value) {
      case 0:
        monthName = bShort ? "Jan" : "January";
        break;
      case 1:
        monthName = bShort ? "Feb" : "Feburary";
        break;
      case 2:
        monthName = bShort ? "Mar" : "March";
        break;
      case 3:
        monthName = bShort ? "Apr" : "April";
        break;
      case 4:
        monthName = bShort ? "May" : "May";
        break;
      case 5:
        monthName = bShort ? "Jun" : "June";
        break;
      case 6:
        monthName = bShort ? "Jul" : "July";
        break;
      case 7:
        monthName = bShort ? "Aug" : "August";
        break;
      case 8:
        monthName = bShort ? "Sep" : "September";
        break;
      case 9:
        monthName = bShort ? "Oct" : "October";
        break;
      case 10:
        monthName = bShort ? "Nov" : "November";
        break;
      case 11:
        monthName = bShort ? "Dec" : "December";
        break;
      default:
        break;
    }

    return monthName;
  }
};
