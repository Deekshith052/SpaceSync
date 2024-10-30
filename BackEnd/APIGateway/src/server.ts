import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import { authorize } from './middleware/authMiddleware';

const app = express();
const PORT = 4000;

app.use(
  '/api/v1/eventSpaceBookings',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4008/api/v1/eventSpaceBookings', changeOrigin: true })
);

app.use(
  '/api/v1/eventspace',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4007/api/v1/eventspace', changeOrigin: true })
);

app.use(
  '/api/v1/feedback',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4002/api/v1/feedback', changeOrigin: true })
);

app.use(
  '/api/v1/parking/reservations',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4004/api/v1/parking/reservations', changeOrigin: true })
);

app.use(
  '/api/v1/parking/slots',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4003/api/v1/parking/slots', changeOrigin: true })
);

app.use(
  '/api/v1/users',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4001/api/v1/users', changeOrigin: true })
);

app.use(
  '/api/v1/workspacebooking',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4006/api/v1/workspacebooking', changeOrigin: true })
);

app.use(
  '/api/v1/workspace',
  // authorize as any,
  createProxyMiddleware({ target: 'http://localhost:4005/api/v1/workspace', changeOrigin: true })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});




// import express, { Request, Response } from 'express';
// import { createProxyMiddleware } from 'http-proxy-middleware';

// const app = express();
// const PORT = 4000;

// app.use(
//   '/api/v1/eventSpaceBookings',
//   createProxyMiddleware({ target: 'http://localhost:4008/api/v1/eventSpaceBookings', changeOrigin: true })
// );
// app.use(
//   '/api/v1/eventspace',
//   createProxyMiddleware({ target: 'http://localhost:4007/api/v1/eventspace', changeOrigin: true })
// );
// app.use(
//   '/api/v1/feedback',
//   createProxyMiddleware({ target: 'http://localhost:4002/api/v1/feedback', changeOrigin: true })
// );
// app.use(
//     '/api/v1/parking/reservations',
//     createProxyMiddleware({ target: 'http://localhost:4004/api/v1/parking/reservations', changeOrigin: true })
// );
// app.use(
//     '/api/v1/parking/slots',
//     createProxyMiddleware({ target: 'http://localhost:4003/api/v1/parking/slots', changeOrigin: true })
// );
// app.use(
//     '/api/v1/users',
//     createProxyMiddleware({ target: 'http://localhost:4001/api/v1/users', changeOrigin: true })
// );
// app.use(
//     '/api/v1/workspacebooking',
//     createProxyMiddleware({ target: 'http://localhost:4006/api/v1/workspacebooking', changeOrigin: true })
// );
// app.use(
//     '/api/v1/workspace',
//     createProxyMiddleware({ target: 'http://localhost:4005/api/v1/workspace', changeOrigin: true })
// );

// app.listen(PORT, () => {
//   console.log(`API Gateway running on port ${PORT}`);
// });
