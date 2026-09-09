import checkoutApp from '../../server/index.mjs';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
  maxDuration: 300,
};

export default checkoutApp;
