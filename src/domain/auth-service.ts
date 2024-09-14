import {LoginRequest} from "../handler/validator/user-validator";
import jwt from "jsonwebtoken";
import {UserService} from "./user-service";
import {DataSource} from "typeorm";
import {User} from "../database/entity/user";


export class AuthService {

    private userService: UserService;

    constructor(private readonly db: DataSource) {
        this.userService = new UserService(this.db);
    }


    async login(loginRequest: LoginRequest): Promise<{ token: string; user: Partial<User> }> {
        const user = await this.userService.getUserByEmail(loginRequest.email);

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const correctPassword = await this.userService.comparePassword(user.password, loginRequest.password)
        if (!correctPassword) {
            throw new Error('Invalid email or password');
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined in environment variables');
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            jwtSecret,
            {expiresIn: '1h'} // Le token expire dans 1 heure
        );

        const {password, alreadyLoggedIn, ...userWithoutSensitiveInfo} = user;

        return {
            token,
            user: userWithoutSensitiveInfo,
        };
    }

    async verifyToken(token: string): Promise<boolean> {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined in environment variables');
        }

        try {
            jwt.verify(token, jwtSecret);
            return true;
        } catch (error) {
            return false;
        }
    }
}