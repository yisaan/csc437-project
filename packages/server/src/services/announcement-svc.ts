import { Schema, model, Document, Types } from "mongoose";
import { Announcement } from "../models/announcement";

interface AnnouncementDocument extends Announcement, Document {}

// 2) Add `date` into the schema, required
const announcementSchema = new Schema<AnnouncementDocument>({
  content: { type: String, required: true },
  date:    { type: Date,   required: true }, // user‐chosen date
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
});

// 3) Model
const AnnouncementModel = model<AnnouncementDocument>(
  "Announcement",
  announcementSchema,
  "announcements"
);

// 4) Export service methods
export default {
  // Create a new announcement with content, date, createdBy
  async create(content: string, date: Date, createdBy: string): Promise<Announcement> {
    const doc = await AnnouncementModel.create({ content, date, createdBy });
    return {
      content: doc.content,
      date: doc.date,
      createdAt: doc.createdAt,
      createdBy: doc.createdBy,
    };
  },

  // List all announcements, sorted descending by date
  async list(): Promise<Announcement[]> {
    // sort by `date` (user‐chosen date) descending, or by createdAt if you prefer
    const docs = await AnnouncementModel.find().sort({ date: -1 }).lean();
    return docs.map((d) => ({
      _id: d._id,
      content: d.content,
      date: d.date,
      createdAt: d.createdAt,
      createdBy: d.createdBy,
    }));
  },
};
