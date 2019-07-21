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
  await db.createTable("sessions", {
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
    token: { type: "string", length: "32" },
    expires: "bigint",
  });
  await db.addIndex("sessions", "sessions_user_id_idx", ["user_id"]);
  await db.addIndex("sessions", "sessions_expires_idx", ["expires"]);
  await db.addIndex("sessions", "sessions_token_idx", ["token"]);
};

exports.down = async function(db) {
  await db.removeIndex("sessions", "sessions_token_idx");
  await db.removeIndex("sessions", "sessions_expires_idx");
  await db.removeIndex("sessions", "sessions_user_id_idx");
  await db.dropTable("sessions");
};

exports._meta = {
  version: 1,
};
