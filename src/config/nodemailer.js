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

const SendMailCredentials = (userMail,name, username, password) => {
    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: 'Tu cuenta ha sido creada en PRIMA S.A.',
        text: `
        Hola ${name},

        ¡Bienvenido/a a PRIMA S.A.! Nos complace informarte que tu cuenta ha sido creada exitosamente. A continuación, te compartimos tus credenciales de acceso:

        - Usuario: ${username}
        - Contraseña: ${password}

        Para acceder a tu cuenta, visita nuestro sistema en ${process.env.URL_BACKENDMAIL} e ingresa estas credenciales.

        Por razones de seguridad:
        1. Cambia tu contraseña en el primer inicio de sesión.
        2. No compartas esta información con nadie.

        Si tienes alguna duda o necesitas ayuda, contáctanos a través de [CORREO_DE_SOPORTE] o al [TELÉFONO_DE_SOPORTE].

        ¡Gracias por confiar en nosotros!

        Saludos cordiales,  
        Administrador  
        PRIMA S.A.
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