module.exports = function inject (template, ssrName, value, needStringify = false) {
  return template.replace(ssrName, needStringify ? JSON.stringify(value) : value);
};
