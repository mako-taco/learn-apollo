"use strict";

const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

var dbm;
var type;
var seed;

// inclusive rand
function inc(min, max) {
  return ~~(Math.random() * max) + min;
}

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
  for (let i = 0; i < 50; i++) {
    await db.insert(
      "items",
      ["title", "description", "stock", "price"],
      [
        lorem.generateWords(inc(1, 2)),
        lorem.generateWords(inc(10, 20)),
        inc(0, 100),
        inc(100, 100000),
      ],
    );
  }
};

exports.down = async function(db) {
  await db.runSql("DELETE FROM items");
};

exports._meta = {
  version: 1,
};
