const generateId = contacts => {
  const step = 1;
  return contacts[contacts.length - step].id + step;
};

module.exports = generateId;
