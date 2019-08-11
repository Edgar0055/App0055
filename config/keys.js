const $process = require('process');
const mongoURI = $process.env.MONGODB || 'mongodb+srv://Edgar:edgar2000.r@edgardb-cotcg.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    mongoURI: mongoURI,
    jwt: 'dev-jwt'
}