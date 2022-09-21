const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class user extends Sequelize.Model {
    validPassword(pw) {
        return bcrypt.compareSync(pw, this.userLoginPw);
    }

    static init(sequelize) {
        return super.init({
                userId: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    primaryKey: true,
                },
                userName: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                vendorId: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                company: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                position: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                phoneNum: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
                userLoginId: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    unique: true,
                },
                userLoginPw: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    set(value) {
                        this.setDataValue('userLoginPw', bcrypt.hashSync(value, saltRounds));
                    }
                },
                reason: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                enterTime: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                exitTime: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
            },{
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'user',
                tableName: 'user',
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            });
    }

    static associate(db) {
        db.user.hasMany(db.accessRecord, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
        db.user.hasMany(db.userAllow, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            onDelete: 'cascade',
            onUpdate: 'cascade',
        });
    }
};

module.exports = user;