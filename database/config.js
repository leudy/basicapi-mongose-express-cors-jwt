const mongooseDb = require('mongoose');
const basicConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
    , useCreateIndex: true
}
const dbconnect = async () => {
    try {
        mongooseDb.connect(process.env.DB_CNN, basicConfig);
        console.log('database is online')
    } catch (error) {
        throw new Error('Error al crear la conexion')
    }


}

module.exports = { dbconnect }

