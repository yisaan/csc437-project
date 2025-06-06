"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var announcements_exports = {};
__export(announcements_exports, {
  default: () => announcements_default
});
module.exports = __toCommonJS(announcements_exports);
var import_express = __toESM(require("express"));
var import_auth = require("./auth");
var import_announcement_svc = __toESM(require("../services/announcement-svc"));
const router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const all = await import_announcement_svc.default.list();
    res.status(200).json(all);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).send("Server error");
  }
});
router.post("/", import_auth.authenticateUser, async (req, res) => {
  const { content, date } = req.body;
  if (!content || typeof content !== "string" || !date || typeof date !== "string") {
    res.status(400).send("Bad request: missing content or date");
    return;
  }
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    res.status(400).send("Bad request: invalid date format");
    return;
  }
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader.split(" ")[1] || "";
  let createdBy = "anonymous";
  try {
    const jwt = require("jsonwebtoken");
    const decoded = jwt.decode(token);
    if (decoded && decoded.username) {
      createdBy = decoded.username;
    }
  } catch {
  }
  try {
    const newAnn = await import_announcement_svc.default.create(content, parsedDate, createdBy);
    res.status(201).json(newAnn);
  } catch (err) {
    console.error("Error creating announcement:", err);
    res.status(500).send("Server error");
  }
});
var announcements_default = router;
