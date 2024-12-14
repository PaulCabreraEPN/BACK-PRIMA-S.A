import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});

const SendMailCredentials = (userMail,name, username, password,token) => {
    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: 'Tu cuenta ha sido creada en PRIMA S.A.',
        html:
        `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Hola ${name},</h2>
                <p>¡Bienvenido/a a <strong>PRIMA S.A.</strong>! Nos complace informarte que tu cuenta ha sido creada exitosamente. A continuación, te compartimos tus credenciales de acceso:</p>
                <ul>
                    <li><strong>Usuario:</strong> ${username}</li>
                    <li><strong>Contraseña:</strong> ${password}</li>
                </ul>
                <p>Para acceder a tu cuenta, visita nuestro sistema en <a href="${process.env.URL_BACK}/login" target="_blank" style="color: #4CAF50; text-decoration: none;">este enlace</a> e ingresa estas credenciales.</p>
                <h3 style="color: #4CAF50;">Importante:</h3>
                <p>Antes de iniciar sesión, necesitas confirmar tu cuenta. Haz clic en el siguiente enlace para confirmar tu correo electrónico:</p>
                <p><a href="${process.env.URL_BACK}/confirm-account/${encodeURIComponent(token)}" target="_blank" style="color: #4CAF50; text-decoration: none; font-weight: bold;">Confirmar mi cuenta</a></p>
                <h3>Por razones de seguridad:</h3>
                <ol>
                    <li>Cambia tu contraseña en el primer inicio de sesión.</li>
                    <li>No compartas esta información con nadie.</li>
                </ol>
                <p>Si tienes alguna duda o necesitas ayuda, contáctanos a través de <a href="mailto:support@prima.com" style="color: #4CAF50; text-decoration: none;">support@prima.com</a> o al <strong>(+123) 456-7890</strong>.</p>
                <p>¡Gracias por confiar en nosotros!</p>
                <p>Saludos cordiales,</p>
                <p><strong>Dev Prima</strong><br>PRIMA S.A.</p>
            </body>
        </html>
        `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('email sent: ' + info.response);
        }
    });
}


export {
    SendMailCredentials
}