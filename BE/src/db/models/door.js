const Sequelize = require('sequelize');

class door extends Sequelize.Model {

    static init(sequelize) {
        return super.init({
                doorId: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    primaryKey: true,
                },
                doorName: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                isOpen: { // 개방 유무(현재 상태)
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                isMonitoring: { // 감시 여부(출입 관리)
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                warning: { // 경보 상태 (이상 유무) (센서 이상 및 강제 개방 여부)
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
                openWeeks: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
                // "[0, 1, 2, 3, 4, 5, 6]" 최대 23자
                openDates: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                // "["2022-09-05", "2022-09-07"]" 최대 255자 저장 가능
                openTime: {
                    type: Sequelize.TIME,
                    allowNull: true,
                },
                closeTime: {
                    type: Sequelize.TIME,
                    allowNull: true,
                },
                latestDate: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                    defaultValue: null,
                },
            },{
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'door',
                tableName: 'door',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.door.belongsTo(db.statement, {
            foreignKey: 'staId',
            targetKey: 'staId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.door.hasMany(db.adminDoor, {
            foreignKey: 'doorId',
            sourceKey: 'doorId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.door.hasMany(db.accessRecord, {
            foreignKey: 'doorId',
            sourceKey: 'doorId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.door.hasMany(db.userAllow, {
            foreignKey: 'doorId',
            sourceKey: 'doorId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.door.hasMany(db.alertRecord, {
            foreignKey: 'doorId',
            sourceKey: 'doorId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.door.hasMany(db.smsRecord, {
            foreignKey: 'doorId',
            sourceKey: 'doorId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    }
};

module.exports = door;