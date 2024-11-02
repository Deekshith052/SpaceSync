/// <reference path="../@types/express.d.ts" />
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'qwertyuiopasdfghjklzxcvbnm'; // Use a secure secret in production

// Define route-to-role mapping
const routeRoles: { [key: string]: string[] } = {
  '/api/v1/eventSpaceBookings': ['admin', 'manager'],
  '/api/v1/eventspace': ['admin','manager'],
  '/api/v1/feedback': ['admin', 'employee','manager','security'],
  '/api/v1/parking/reservations': ['admin', 'manager','employee','security'],
  '/api/v1/parking/slots': ['admin','user','manager','security'],
  '/api/v1/users': ['admin','employee','manager'],
  '/api/v1/workspacebooking': ['manager','admin','employee'],
  '/api/v1/workspace': ['admin', 'manager', 'employee']
};

// Authorization middleware
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decodedToken: any = jwt.verify(token, JWT_SECRET);
    const userRole = decodedToken.role;

    const allowedRoles = routeRoles[req.originalUrl];
    if (!allowedRoles) {
      return res.status(403).json({ message: 'Forbidden: route not configured for roles' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
    }

    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};



// /// <reference path="../@types/express.d.ts" />
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'qwertyuiopasdfghjklzxcvbnm'; // Use a secure secret in production

// // Define route-to-method-to-role mapping
// const routeRoles: { [key: string]: { [method: string]: string[] } } = {
//   '/api/v1/eventSpaceBookings': {
//     GET: ['admin','manager',"employee"],
//     POST: ['admin', 'manager'],
//     DELETE: ['admin']
//   },
//   '/api/v1/eventspace': {
//     GET: ['admin', 'user'],
//     POST: ['admin'],
//     PUT: ['admin', 'manager']
//   },
//   '/api/v1/feedback': {
//     GET: ['admin', 'user'],
//     POST: ['user']
//   },
//   '/api/v1/parking/reservations': {
//     GET: ['admin', 'manager'],
//     POST: ['manager'],
//     DELETE: ['admin']
//   },
//   '/api/v1/parking/slots': {
//     GET: ['admin', 'staff'],
//     PUT: ['admin']
//   },
//   '/api/v1/users': {
//     GET: ['admin'],
//     POST: ['admin'],
//     PUT:['admin'],
//     DELETE:['admin']
//   },
//   '/api/v1/workspacebooking': {
//     GET: ['manager'],
//     POST: ['manager']
//   },
//   '/api/v1/workspace': {
//     GET: ['admin', 'manager', 'user'],
//     POST: ['admin']
//   }
// };

// // Authorization middleware
// export const authorize = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization token required' });
//   }

//   const token = authHeader.split(' ')[1];
//   try {
//     const decodedToken: any = jwt.verify(token, JWT_SECRET);
//     req.user  = decodedToken; // Attach user info to request for use in other middlewares
//     console.log(req.user);
//     console.log(req.originalUrl);
//     const endpointRoles = routeRoles[req.originalUrl];
//     if (!endpointRoles) {
//       return res.status(403).json({ message: 'Forbidden: route not configured for roles' });
//     }

//     // Get allowed roles for this method at this endpoint
//     const allowedRoles = endpointRoles[req.method];
//     if (!allowedRoles || !allowedRoles.includes(decodedToken.role)) {
//       return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
//     }

//     next();
//   } catch (error) {
//     console.error('Authorization error:', error);
//     res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };