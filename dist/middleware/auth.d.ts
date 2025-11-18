import { Request, Response, NextFunction } from 'express';
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const validateAuthorization: (userId: number, resourcePath: string, resourceMethod: string) => Promise<boolean>;
//# sourceMappingURL=auth.d.ts.map