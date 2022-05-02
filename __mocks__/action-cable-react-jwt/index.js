const cable = {
  subscriptions: {
    create: function ({channel}) {
      return {
        received: (data) => { }
      }
    }
  }
};

export default {
  createConsumer: function(host, token) {
    return cable;
  }
}
