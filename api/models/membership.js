const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);


module.exports = (connection, Sequelize) => {
    const schema = {
        membershipId: {
            type: Sequelize.STRING,
            defaultValue: () => 'mem_' + nanoid(),
            primaryKey: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        membershipType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        startDate: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        totalAmount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isFirstMonth: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
    };

    const Membership = connection.define('Membership', schema, { timestamps: false });
    
    Membership.associate = (models) => {
        Membership.hasMany(models.AddOnService, { foreignKey: 'membershipId' });
        Membership.hasMany(models.Invoice, { foreignKey: 'membershipId' });
    };

    return Membership;
};
