export default (instance, events) => {
  if (!instance) {
    return;
  }
  Object.keys(events).forEach(key => {
    instance.on(key, events[key]);
  });
};
