import {User} from "../database/entity/user";
import nodemailer from "nodemailer";
import {DataSource} from "typeorm";

export class MailService {

    private db: DataSource;
    private transporter: nodemailer.Transporter;

    constructor(db: DataSource) {
        this.db = db;

        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_TRANSPORTER,
                pass: process.env.PASSWORD_TRANSPORTER,
            },
        });
    }

    async sendWelcomeEmail(user: User, password: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL,
            to: "ethanfrancois0@gmail.com",
            subject: 'Welcome to Our Service!',
            text: `Bonjour ${user.firstName},\n\nVous avez bien été inscrit. Voici vos informations :\n\nEmail : ${user.email}\nMot de passe : ${password}\n\nMerci et bienvenue !`,
            html: `<p>Bonjour <strong>${user.firstName}</strong>,</p>
                   <p>Vous avez bien été inscrit. Voici vos informations :</p>
                   <p><strong>Email :</strong> ${user.email}</p>
                   <p><strong>Mot de passe :</strong> ${password}</p>
                   <p>Merci et bienvenue !</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Could not send welcome email');
        }
    }

    async sendForgetPasswordEmail(email: string, password: string): Promise<void> {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Réinitialisation de votre mot de passe',
            text: `Bonjour, \n\nVous avez demandé à réinitialiser votre mot de passe. Voici votre nouveau mot de passe temporaire :\n\n
            Mot de passe : ${password} \n\nNous vous recommandons de modifier ce mot de passe dès que possible.\n\n
            Pour ce faire, veuillez vous connecter à votre compte et accédez à la section "Gérer mon compte" pour mettre à jour votre mot de passe.
            Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail ou contactez-nous immédiatement.\n\n
            Merci et à bientôt,\n\n L'équipe de gestion du site`,
            html: `<p>Bonjour,</p>
            <p>Vous avez demandé à réinitialiser votre mot de passe. Voici votre nouveau mot de passe temporaire :</p>
            <p><strong>Mot de passe :</strong> ${password}</p>
            <p>Nous vous recommandons de modifier ce mot de passe dès que possible. Pour ce faire, veuillez vous connecter à votre compte et accédez à la section 
            <strong>"Gérer mon compte"</strong> pour mettre à jour votre mot de passe.</p>
            <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail ou contactez-nous immédiatement.</p>
            <p>Merci et à bientôt,<br />
            L'équipe de gestion du site</p>`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Could not send forget password email');
        }
    };

}