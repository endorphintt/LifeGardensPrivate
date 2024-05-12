'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Files', 'date', {
            type: Sequelize.STRING,
            allowNull: false,
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('Files', 'date', {
            type: Sequelize.DATE,
            allowNull: false,
        })
    },
}
