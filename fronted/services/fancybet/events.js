import fancybetStore from "@store/fancybetStore";

export const fancybetServices = {
  message: {
    router: "fancybet_events",
    data: {
      pks: fancybetStore.pks,
    },
  },
  handler: (response, callback) => {
    const callback = {
      event: (payload) => {
        const data = {
          events: payload.evnets,
        };

        fancybetStore.updateEvent(data);
      },
    };

    const behavior = {};

    const preVersion = fancybetStore.version;
    const { version } = response;

    const shouldUpdate = preVersion !== version;

    if (shouldUpdate) {
      behavior["event"] = callback["event"];
    }

    return behavior;
  },
};
