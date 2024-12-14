import passwordGenerator from '../helpers/passwordGenerator.js'
import Sellers from '../models/sellers.js'
import {SendMailCredentials} from '../config/nodemailer.js';
import usernameGenerator from '../helpers/usernameGenerator.js';
import mongoose from 'mongoose';

//*Login

//* Registrar un Vendedor
const registerSeller = async (req, res) => {
    try {
        //* Paso 1 -Tomar Datos del Request
    const {email,numberID,names} = req.body

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
    const passwordGen = passwordGenerator()
    //? Genera un usuario
    let usernameGen = usernameGenerator(names)

    //? Verificar Username
    let verifyUsername = await Sellers.findOne({ username: usernameGen });

    // Mientras el username esté en uso, genera uno nuevo
    while (verifyUsername) {
        usernameGen = usernameGenerator(names);  // Genera un nuevo username
        verifyUsername = await Sellers.findOne({ username: usernameGen });  // Verifica si ya existe
    }
    
    //* Paso 3 - Interactuar con BDD
    const newSeller = new Sellers(req.body)
    newSeller.password = await newSeller.encryptPassword(passwordGen)
    newSeller.username = usernameGen

    // Crear token
    const token = newSeller.createToken()
    SendMailCredentials(email,names,usernameGen,passwordGen,token)

    // Guardar en la base de datos
    await newSeller.save()

    // Enviar respuesta con el token
    res.status(201).json({msg: "Vendedor registrado exitosamente",})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al registrar el vendedor",error: error.message})
    }
}

//* Confirmar Registro parte Vendedor
const confirmEmail = async (req,res)=>{
    try {
        //* Paso 1 -Tomar Datos del Request
    const {token}=req.params
    
    //* Paso 2 - Validar Datos
    if(!(token)){return res.status(400).json({msg:"Lo sentimos no se puede vvalidar la cuenta"})}
    const SellerBDD = await Sellers.findOne({token})
    if(!SellerBDD){return res.status(400).json({msg:"la cuenta ya ha sido confirmada"})}
    //* Paso 3 Interactuar con BDD
    SellerBDD.token = null
    SellerBDD.confirmEmail = true
    await SellerBDD.save()
    res.status(200).json({msg:"Token confirmado, ya puedes iniciar sesión"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "Error al confirmar el registro",error: error.message})
    }
}

const seeSellers = async(req,res) => {
    try {
        const sellers = await Sellers.find()
        const response = sellers.map(seller => ({
            _id: seller._id, 
            name: seller.names,
            lastNames: seller.lastNames,
            numberID: seller.numberID,
            email: seller.email,
            username: seller.username,
            PhoneNumber: seller.PhoneNumber,
            SalesCity: seller.SalesCity,
            role: seller.role,
        }));
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los tipos', error: error.message });
    }
}

//* Buscar un vendedor por ObjectID
const searchSellerById = async (req, res) => {
    //* Paso 1 - Tomar Datos del Request
    const { id } = req.params;
    
    //* Paso 2 - Validar Datos
    if (!id) return res.status(404).json({
        msg: "Por favor ingrese un id válido"
    });

    // Validar si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({
        msg: `Lo sentimos, no existe el vendedor con el id ${id}`
    });

    //* Paso 3 - Interactuar con BDD
    try {
        const seller = await Sellers.findById(id) // Usamos findById para buscar por _id
        if (!seller) {
            return res.status(404).json({
                msg: "Vendedor no encontrado"
            });
        }
        const idSeller = {
            _id: seller._id, 
            name: seller.names,
            lastNames: seller.lastNames,
            numberID: seller.numberID,
            email: seller.email,
            username: seller.username,
            PhoneNumber: seller.PhoneNumber,
            SalesCity: seller.SalesCity,
            role: seller.role,
        }

        return res.status(200).json({ msg: idSeller });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al buscar el vendedor" });
    }
}

//* Buscar un vendedor por cedula
const searchSellerByNumberId = async (req, res) =>{
    //* Paso 1 - Tomar Datos del Request
    const { numberID } = req.body;
    
    //* Paso 2 - Validar Datos
    if (!numberID || numberID.toString().trim() === ""){
        return res.status(400).json({msg: "Lo sentimos, debes propocionar la cédula del vendedor"})
    }

    const longitud = String(numberID).length;
    if (longitud!==10){
        return res.status(400).json({msg: "Lo sentimos, formato de cédula invalido"})
    }

    try {
        //* Paso 3 - Interactuar con BDD
        const seller = await Sellers.findOne({ numberID }); 
        if (!seller) {
            return res.status(404).json({
                msg: "Vendedor no encontrado"
            });
        }

        const idSeller = {
            _id: seller._id, 
            name: seller.names,
            lastNames: seller.lastNames,
            numberID: seller.numberID,
            email: seller.email,
            username: seller.username,
            PhoneNumber: seller.PhoneNumber,
            SalesCity: seller.SalesCity,
            role: seller.role,
        }

        return res.status(200).json({ msg: idSeller });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al buscar el vendedor" });
    }
   
}

export {
    registerSeller,
    confirmEmail,
    seeSellers,
    searchSellerById,
    searchSellerByNumberId
}