"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403).send('not allowed');
}
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    return res.send("\n    <form method=\"POST\" action=\"login\"/>\n    <h2>Login</h2>\n      <div>\n        Email: <input name=\"email\" />\n      </div>\n      <br />\n      <div>\n        Password : <input name=\"password\" type=\"password\" />\n      </div>\n      <br />\n      <div>\n        <button>Submit</button>\n      </div>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password && email == 'hi@hi.com' && password == 'pass') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
});
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>Logged in \n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>Please log in  <a href=\"/login\">Log in</a></div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    req.session = undefined;
    res.redirect('/');
});
router.get('/admin', requireAuth, function (req, res) {
    res.send('halloooooooooo admin');
});
