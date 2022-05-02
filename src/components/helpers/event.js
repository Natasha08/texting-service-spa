import _ from 'lodash';

export const onChange = (callback) => ({ target }) => {
  const trimmedInput = _.trim(target.value);
  const value = _.isEmpty(trimmedInput) ? '' : target.value;
  callback(value);
};

export const preventDefault = (callback, ...args) => (e) => {
  e.preventDefault();
  callback(...args);
};
