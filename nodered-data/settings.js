module.exports = {
  uiPort: process.env.PORT || 1880,
  flowFile: "flows.json",
  flowFilePretty: true,
  userDir: __dirname,
  httpAdminRoot: "/",
  httpNodeRoot: "/",
  functionGlobalContext: {},
  exportGlobalContextKeys: false,
  logging: {
    console: {
      level: "info",
      metrics: false,
      audit: false,
    },
  },
  editorTheme: {
    tours: false,
    page: {
      title: "F054 IoT - Sala 101",
    },
    projects: {
      enabled: false,
    },
  },
};
