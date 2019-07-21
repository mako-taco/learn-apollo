"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable("users", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    username: "string",
  });
  await db.addIndex("users", "users_username_idx", ["username"], true);

  await db.createTable("orders", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    user_id: {
      type: "int",
      foreignKey: {
        name: "orders_users_user_id_fk",
        table: "users",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: "id",
      },
    },
    timestamp: "bigint",
  });

  await db.createTable("items", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    title: { type: "string", length: 64 },
    description: { type: "string", length: 256 },
    price: "int",
    stock: "int",
  });

  await db.createTable("items_orders", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    item_id: {
      type: "int",
      foreignKey: {
        name: "items_orders_item_id_fk",
        table: "items",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: "id",
      },
    },
    order_id: {
      type: "int",
      foreignKey: {
        name: "items_orders_order_id_fk",
        table: "orders",
        rules: {
          onDelete: "CASCADE",
          onUpdate: "RESTRICT",
        },
        mapping: "id",
      },
    },
    qty: "int",
  });
};

exports.down = async function(db) {
  await db.dropTable("items_orders");
  await db.dropTable("items");
  await db.dropTable("orders");
  await db.removeIndex("users", "users_username_idx");
  await db.dropTable("users");
};

exports._meta = {
  version: 1,
};
