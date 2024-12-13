import passwordGenerator from '../helpers/passwordGenerator.js'
import Sellers from '../models/sellers.js'
import {SendMailCredentials} from '../config/nodemailer.js';


//* Registrar un Vendedor

const registerSeller = async (req, res) => {
    //* Paso 1 -Tomar Datos del Request
    const {email,numberID,names,username} = req.body

    //* Paso 2 - Validar Datos
    //? Verifica si un campo esta vacio
    if(Object.values(req.body).includes("")) {
        return res.status(400).json({msg: "Lo sentimos, debes llenar todos los campos"})
    }
    
    //? Verifica si el email ya existe
    const verifySellerBDD = await Sellers.findOne({email})
    if(verifySellerBDD) {
        return res.status(400).json({msg: "Ya se encuentra registrado el email"})
    }

    //? Verifica si el número de cédula ya está registrado
    const verifyID = await Sellers.findOne({numberID})
    if(verifyID) {
        return res.status(400).json({msg: "Número de cédula ya se encuentra registrado"})
    }

    //? Genera una contraseña aleatoria
    let passwordGen = passwordGenerator()

    //* Paso 3 - Interactuar con BDD
    const newSeller = new Sellers(req.body)
    newSeller.password = await newSeller.encryptPassword(passwordGen)

    // Crear token
    const token = newSeller.createToken()
    SendMailCredentials(email,names,username,passwordGen)

    // Guardar en la base de datos
    await newSeller.save()

    // Enviar respuesta con el token
    res.status(201).json({
        msg: "Vendedor registrado exitosamente",
        token
    })
}


export {
    registerSeller
}