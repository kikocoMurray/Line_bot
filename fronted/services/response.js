export const handleMessage = (event) => {
  const message = JSON.parse(event.data);

  const callback = {
    heartbeat: () => {
      console.log(message);
      //
    },
    // Add more cases for different message types if needed
  };

  callback[message.router]();
};
