import { Router, Request, Response, NextFunction } from 'express';

interface LoginRequestBody extends Request {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('not allowed');
}

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  return res.send(`
    <form method="POST" action="login"/>
    <h2>Login</h2>
      <div>
        Email: <input name="email" />
      </div>
      <br />
      <div>
        Password : <input name="password" type="password" />
      </div>
      <br />
      <div>
        <button>Submit</button>
      </div>
    </form>
  `);
});

router.post('/login', (req: LoginRequestBody, res: Response) => {
  const { email, password } = req.body;
  if (email && password && email == 'hi@hi.com' && password == 'pass') {
    req.session = { loggedIn: true };
    res.redirect('/');
  }
});

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>Logged in 
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>Please log in  <a href="/login">Log in</a></div>
    `);
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/admin', requireAuth, (req: Request, res: Response) => {
  res.send('halloooooooooo admin');
});

export { router };
