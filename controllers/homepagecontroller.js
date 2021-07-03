function homePageController() {
  return {
    homePage(req, res) {
      res.render("home");
    },
    login(req, res) {
      res.render("sign");
    },
    logOut(req, res) {
      req.logout();
      return res.redirect("/");
    },
  };
}

module.exports = homePageController;
