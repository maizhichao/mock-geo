const {
  override,
  overrideDevServer,
  fixBabelImports,
  addLessLoader
} = require("customize-cra");
const request = require("request-promise");
const bodyParser = require("body-parser");

const webpackConfig = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        //primary
        "@primary-color": "#3DCD58",
        "@success-color": "@primary-color",
        "@warning-color": "#FBB325",
        "@error-color": "#FF4D4D",
        "@highlight-color": "@error-color",
        "@border-radius-base": "2px",
        "@link-color": "@primary-color",
        "@info-color": "@link-color",
        "@border-color-base": "#E6E6E6",
        "@border-color-split": "@border-color-base",
        //disabled
        "@disabled-color": "#E6E6E6",
        "@disabled-bg": "#F2F2F2",
        //text
        "@heading-color": "#333333",
        "@text-color ": "#666666",
        "@text-color-secondary": "#999999",
        "@disabled-color ": "#c0c0c0",
        //font-family
        "@font-family":
          "PingFang SC, Microsoft YaHei Light, Microsoft YaHei, arial, sans-serif"
      }
    }
  })
);

const devServerConfig = config => {
  return {
    ...config,
    before: function (app, server) {
      /**
       * Set up the webpack-dev-server proxy
       * to bypass the cross origin issue.
       */
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));

      app.post("/location", (req, res) => {
        const token = req.headers.token;
        const options = {
          uri: "http://172.26.71.1:8115/api/User/location",
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Disco-Token": token
          },
          body: JSON.stringify(req.body)
        };
        console.log(options);

        request(options)
          .then(r => {
            res.send(r);
          })
          .catch(e => {
            console.error(e);
            res.send(e);
          });
      });

      app.post("/accept", (req, res) => {
        const ticketId = req.body.ticketId;
        const token = req.headers.token;
        const options = {
          uri: "http://172.26.71.1:8115/api/tickets/accept/" + ticketId,
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Disco-Token": token
          }
        };
        console.log(options);
        request(options)
          .then(r => {
            res.send(r);
          })
          .catch(e => {
            console.log(e);
            res.send(e);
          });
      });
    }
  };
};

module.exports = {
  webpack: webpackConfig,
  devServer: overrideDevServer(devServerConfig)
};
