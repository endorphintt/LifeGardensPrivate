// const { Sequelize } = require('sequelize')
// const mysql2 = require('mysql2') // Ensure you require mysql2

// module.exports = new Sequelize(
//     'h63631c_lgprivate',
//     'h63631c_taras',
//     'sorzym-4gygda-dachiT',
//     {
//         host: 'https://lifegardens.com.ua',
//         dialect: 'mysql',
//         port: 3306,
//         dialectModule: mysql2, // Explicitly set mysql2 as the dialect module
//     }
// )

const { Sequelize } = require('sequelize')
const mysql2 = require('mysql2') // Ensure you require mysql2

module.exports = new Sequelize('lg', 'root', 'fybgan-xyfzi8-jofpyV', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    dialectModule: mysql2, // Explicitly set mysql2 as the dialect module
})
