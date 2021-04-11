const Url = require('url-parse');

const encrypt = (givenUrl, {
  pattern
}) => {
  // mocked for initial test.
  const parsedURL = Url(givenUrl)
  const { pathname } = parsedURL
  console.log('parsedURL: ', parsedURL)
  return 'https://testapp.com/modules/provider/WTq8zYcZfaWVvMncigHqwQ=='
};

export { encrypt };
