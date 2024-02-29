const func = () => {};

export const handleMessage = (event) => {
  const message = JSON.parse(event.data);

  func[message.router]();
};

// {
//   fancybet_events: handler(response, options) => {}
// }
