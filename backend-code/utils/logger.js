const info = (...param) => {
  return console.log(...param);
};

const error = (...param) => {
  console.error(...param);
};

module.exports = { info, error };
