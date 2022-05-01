export const requestJson = ({body}) => !_.isEmpty(body) ? JSON.parse(body.toString()) : {};

export const requiredKeysPresent = ({request, name, requiredKeys}) => {
  if (!requiredKeys) return true;

  const missingKeys = _.difference(requiredKeys, _.keys(requestJson(request)));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return true;
  return Promise.reject(`Missing the following keys in the api request for ${name}: ${missingKeys}`);
};

export const respondWith = ({data, error}) => {
  if (error) {
    return Promise.reject(JSON.stringify(error));
  } else {
    return Promise.resolve(JSON.stringify(data));
  }
};
