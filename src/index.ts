import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { toNodeHandler } from 'better-auth/node';

import { corsHandler } from './middlewares/core';
import { auth } from './lib/auth';

dotenv.config();
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.urlencoded({ extended: true }));
server.use(corsHandler);

server.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.path.includes('/auth')) {
        express.json()(req, res, next);
    } else {
        next();
    }
});

// server.all('/api/auth/*', toNodeHandler(auth));

server.get('/test', async (req: Request, res: Response) => {
    try {
        const a = await auth.api.signInSocial({
            body: {
                provider: 'apple'
            }
        })

        return res.status(200).json(a);
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
});

server.get('/ping', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'API Working' });
});

server.use((req: Request, res: Response) => {
    const error = new Error(`Either the Method or Endpoint does not exists!`);

    res.status(404).json({ message: error.message });
});

server.listen(PORT, () => console.log(`Server running on Port ${PORT}`));

module.exports = server;