import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const connection = async () => {
    try {
        const options = {
            useNewUrlParser: true,   // Utiliza el nuevo analizador de URL
            useUnifiedTopology: true, // Usar el nuevo motor de topología de MongoDB
            serverSelectionTimeoutMS: 5000, // Timeout para la selección de servidor (5 segundos)
            socketTimeoutMS: 30000,  // Timeout de socket (30 segundos)
            connectTimeoutMS: 30000, // Timeout para la conexión inicial (30 segundos)
          };
        await mongoose.connect(process.env.MONGODB_URI_PRODUCTION, options);
        console.log(`Conexión exitosa a MongoDB Atlas`);
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
    }
};

export default connection;
