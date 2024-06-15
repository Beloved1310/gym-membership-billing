const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('0123456789AQWXSCZEDCVFRTGBHYNJUIKLOPaqwxszedcvfrtgbnhyujmkiolp', 17);


module.exports = (connection, Sequelize) => {
  const schema = {
    addOnId: {
      type: Sequelize.STRING,
      defaultValue: () => 'add_' + nanoid(),
      primaryKey: true,
    },
    membershipId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "Memberships",
        key: "membershipId",
      },
    },
    serviceName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    monthlyAmount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  };

  const AddOnService = connection.define("AddOnService", schema, {
    timestamps: false,
  });

  AddOnService.associate = (models) => {
    AddOnService.belongsTo(models.Membership, { foreignKey: "membershipId" });
  };

  return AddOnService;
};
