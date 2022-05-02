import _ from 'lodash';

const supressEnterPropagation = (event) => {
  if (event.which === 13 || event.keyCode === 13 || event.key === "Enter") {
    event.stopPropagation();
    event.preventDefault();
  }
};

export const onChange = (callback) => (event) => {
  supressEnterPropagation(event);
  const trimmedInput = _.trim(event.target.value);
  const value = _.isEmpty(trimmedInput) ? '' : event.target.value;
  callback(value);
};

export const preventDefault = (callback, ...args) => (e) => {
  e.preventDefault();
  callback(...args);
};
