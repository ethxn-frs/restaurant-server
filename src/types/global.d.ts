// src/types/global.d.ts

declare module 'jsonwebtoken' {
    export interface SignOptions {
        // Ajoute ici toutes les options nécessaires pour le typage de jsonwebtoken
    }
}

declare module 'nodemailer' {
    export interface Transporter {
        // Ajoute ici toutes les options nécessaires pour le typage de nodemailer
    }
}

declare module 'bcrypt' {
    // Ajoute ici toutes les déclarations manquantes pour bcrypt
}

declare module 'express' {
    import { Request, Response, NextFunction } from 'express-serve-static-core';
    export interface Express {
        // Ajoute les déclarations spécifiques nécessaires
    }
}

declare module 'cors' {
    // Déclare ici le module cors si nécessaire
}
