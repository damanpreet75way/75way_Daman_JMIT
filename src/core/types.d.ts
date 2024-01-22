
declare namespace Express {
    export interface Request {
        user?: import('./types').User
    }
    export interface Response {
        user?: import('./types').User;
    }
  }