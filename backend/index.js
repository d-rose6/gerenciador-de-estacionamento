const express = require('express');
const bodyParser = require('body-parser');
// Protocolo de comunicação entre APIs e outros serviços (CORS)
const cors = require('cors');
const app = express();
const port = 8081;

// Importação dos modelos para garantir que a associação seja reconhecida
const ProprietarioModel = require('./models/Proprietario');
const VeiculoModel = require('./models/Veiculos');

// Definição do Relacionamento (Associação do Sequelize)
ProprietarioModel.hasMany(VeiculoModel, { foreignKey: 'fk_proprietario' });
VeiculoModel.belongsTo(ProprietarioModel, { foreignKey: 'fk_proprietario' });

// Importações das rotas
const proprietario = require('./controllers/ProprietarioControlls.js');
const veiculo = require('./controllers/VeiculoControlls.js');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Rota principal de teste
app.get('/', (req, res) => res.send('Estou aqui'));

// Rotas da aplicação
app.use('/proprietario', proprietario);
app.use('/veiculo', veiculo);

// Inicialização do servidor
app.listen(port, () => console.log(`Servidor rodando porta ${port}!`));