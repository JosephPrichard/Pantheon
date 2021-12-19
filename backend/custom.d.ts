import { Session } from 'express-session'
import { User } from './src/modules/user/user.dto';

declare module 'express-session' {
    interface SessionData {
        user: User;
    }
}