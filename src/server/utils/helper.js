const getType = element => Object.prototype.toString.call(element);

function isEmpty(element) {
  if (
    // undefined
    typeof element === 'undefined'
    // Empty string
    || (typeof element === 'string' && element.trim().length === 0)
    // null
    || getType(element) === '[object Null]'
    // Empty object
    || (getType(element) === '[object Object]' && !Object.keys(element).length)
    // Empty array
    || (getType(element) === '[object Array]' && !element.length)
  ) {
    return true;
  }

  return false;
}

module.exports = {
  isEmpty
};
