import {DataSource, DeleteResult, Repository, UpdateResult} from "typeorm";
import {User} from "../database/entity/user";
import {
    ChangePasswordRequest,
    ForgetPasswordRequest,
    InviteUserRequest,
    ListUserRequest,
    UpdateUserRequest
} from "../handler/validator/user-validator";
import bcrypt from 'bcrypt';
import {MailService} from "./mail-service";
import {AppDataSource} from "../database/database";

export class UserService {

    private userRepository: Repository<User>;

    constructor(private readonly db: DataSource) {
        this.userRepository = this.db.getRepository(User);
    }

    async getAllUsers(listRequest: ListUserRequest): Promise<[User[], number]> {
        try {
            const {page, limit} = listRequest;
            const skip = (page - 1) * limit;

            return await this.userRepository.findAndCount({
                skip,
                take: limit
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Could not fetch users');
        }
    }

    async getAllUsersCount(): Promise<number> {
        try {
            return await this.userRepository.count({})
        } catch (error) {
            throw new Error('Could not fetch count users');
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const user = await this.userRepository.findOne({
                where: {id}
            });

            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            return user;
        } catch (error) {
            console.error(`Error fetching user with ID ${id}:`, error);
            throw new Error('Could not fetch the user');
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {email: email}
        })
    }

    async sendInvitationToUser(inviteUserRequest: InviteUserRequest): Promise<[boolean, string]> {
        try {
            const existingUser = await this.getUserByEmail(inviteUserRequest.email);

            if (existingUser != null) {
                return [false, `A user already exists with the email address : ${inviteUserRequest.email}`];
            }

            const generatedPassword = await this.generatePassword(15);
            const hashedPassword = await this.hashPassword(generatedPassword, 10);

            const user = new User();
            user.firstName = inviteUserRequest.firstName;
            user.lastName = inviteUserRequest.lastName;
            user.email = inviteUserRequest.email;
            user.password = hashedPassword;
            user.alreadyLoggedIn = false;

            await this.userRepository.save(user);

            const mailService = new MailService(AppDataSource);
            await mailService.sendWelcomeEmail(user, generatedPassword);

            return [true, "User has been invited successfully"];
        } catch (error) {
            console.error('Error inviting user:', error);
            throw new Error('Could not invite the user');
        }
    }

    async hashPassword(password: string, saltOrRounds: number): Promise<string> {
        return await bcrypt.hash(password, saltOrRounds);
    }

    async generatePassword(length: number): Promise<string> {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!';
        let password = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }

        return password;
    }

    async updateUser(updateUserRequest: UpdateUserRequest): Promise<UpdateResult> {
        try {
            const {id, firstName, lastName, email, phoneNumber} = updateUserRequest;

            const user = await this.userRepository.findOne({where: {id}});

            if (!user) {
                throw new Error(`User with ID ${id} not found`);
            }

            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (email) user.email = email;
            if (phoneNumber || phoneNumber == "") user.phoneNumber = phoneNumber;

            return await this.userRepository.update(id, user);
        } catch (error) {
            console.error(`Error updating user with ID ${updateUserRequest.id}:`, error);
            throw new Error('Could not update the user');
        }
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        try {
            const count = await this.getAllUsersCount();
            if (count == 1) throw new Error(`Cant delete last user`);
            return await this.userRepository.delete(id);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw new Error('Could not delete the user');
        }
    }

    async comparePassword(currentPassword: string, askedPassword: string): Promise<boolean> {
        return bcrypt.compare(askedPassword, currentPassword);
    }

    async changePassword(changePasswordRequest: ChangePasswordRequest): Promise<UpdateResult> {
        try {
            const user = await this.getUserById(changePasswordRequest.id);

            if (!user) {
                throw new Error(`User with ID ${changePasswordRequest.id} not found`);
            }

            if (!await this.comparePassword(user.password, changePasswordRequest.currentPassword)) {
                throw new Error(`Current Password is not correct`);
            }

            if (changePasswordRequest.newPassword !== changePasswordRequest.confirmNewPassword) {
                throw new Error(`New Passwords do not match`);
            }

            user.password = await this.hashPassword(changePasswordRequest.newPassword, 10);
            return await this.userRepository.update(user.id, user);
        } catch (error) {
            throw new Error("Error updating password");
        }
    }

    async forgetPassword(forgetPasswordRequest: ForgetPasswordRequest): Promise<void> {
        try {
            const user = await this.getUserByEmail(forgetPasswordRequest.email);
            if (!user) return;
            const newPassword = await this.generatePassword(15);
            user.password = await this.hashPassword(newPassword, 10);
            await this.userRepository.update(user.id, user);
            const mailService = new MailService(AppDataSource);
            await mailService.sendForgetPasswordEmail(user.email, newPassword);
        } catch (error) {
            throw new Error("Error forget password");
        }
    }
}