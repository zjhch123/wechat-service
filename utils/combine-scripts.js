module.exports = function combineScripts (...scripts) {
  return scripts.join('\n\n');
};
