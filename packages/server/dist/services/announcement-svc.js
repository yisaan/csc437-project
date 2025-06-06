"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var announcement_svc_exports = {};
__export(announcement_svc_exports, {
  default: () => announcement_svc_default
});
module.exports = __toCommonJS(announcement_svc_exports);
var import_mongoose = require("mongoose");
const announcementSchema = new import_mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, required: true },
  // user‐chosen date
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true }
});
const AnnouncementModel = (0, import_mongoose.model)(
  "Announcement",
  announcementSchema,
  "announcements"
);
var announcement_svc_default = {
  // Create a new announcement with content, date, createdBy
  async create(content, date, createdBy) {
    const doc = await AnnouncementModel.create({ content, date, createdBy });
    return {
      content: doc.content,
      date: doc.date,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy
    };
  },
  // List all announcements, sorted descending by date
  async list() {
    const docs = await AnnouncementModel.find().sort({ date: -1 }).lean();
    return docs.map((d) => ({
      _id: d._id,
      content: d.content,
      date: d.date,
      createdAt: d.createdAt,
      createdBy: d.createdBy
    }));
  }
};
