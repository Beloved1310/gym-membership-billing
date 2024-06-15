const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);

module.exports = (connection, Sequelize) => {
    const schema = {
        invoiceId: {
            type: Sequelize.STRING,
            defaultValue: () => 'inv_' + nanoid(),
            primaryKey: true,
        },
        membershipId: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
                model: 'Memberships',
                key: 'membershipId',
            },
        },
        invoiceDateTime: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        totalAmount: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        invoiceUID: {
            type: Sequelize.STRING,
            allowNull: false,
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

    const Invoice = connection.define('Invoice', schema, { timestamps: false });

    Invoice.associate = (models) => {
        Invoice.belongsTo(models.Membership, { foreignKey: 'membershipId' });
    };

    return Invoice;
};
