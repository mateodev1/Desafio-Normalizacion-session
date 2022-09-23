export function loginMiddleware(req, res, next) {
    // console.log(req.session.user)
    if (!req.session.user) {
      res.redirect("/login");
    } else {
      next();
    }
  }
