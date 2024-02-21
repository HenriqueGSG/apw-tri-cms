module.exports = {
  routes: [
    {
      method: "POST",
      path: "/auth-user",
      handler: "auth.loginWithToken",
      config: {
        auth: false,
      },
    },
  ],
};
