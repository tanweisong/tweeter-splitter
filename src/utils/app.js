export default {
  isNull: function(value) {
    if (value == null) return true;
    else return false;
  },
  isNullOrEmpty: function(value) {
    if (value == null || String(value).trim() === "") return true;
    else return false;
  }
};
