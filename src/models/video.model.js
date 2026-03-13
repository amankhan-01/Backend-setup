import mongoose , { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // first import the package.

const videoSchema = new Schema(
    {
        videoFile:{
            type: String,  // copy URL from the cloudnary.
            require: true,
        },
        thumbnail:{
            type:String,  // copy URL from the cloudnary.
            require:true,
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title:{
            type:String,
            require: true,
        },
        description:{
            type:String,
            require: true,
        },
        duration:{
            type:Number,  // the duration is also passed by the URL of cloudnary.
            require:true,
        },
        view:{
            type:Number,
            default:0,
        },
        isPublished:{
            type:Boolean,
            default:true,
        }
    },
    {timestamps:true}
);

// before exporting it we use this mongoose aggregate paginate

videoSchema.plugin(mongooseAggregatePaginate) // this allow us to use middlewares in the mongoDB like pre, post etc.

export const Video = mongoose.model("Video",videoSchema);

// by GPT
// read below line to under stand plugin line
// Simple Meaning
// This line adds a plugin to your schema so that you can paginate (split) large aggregate query results into pages.
// Breaking it down
// 1️⃣ videoSchema
// This is your Mongoose schema for videos (structure of video documents in MongoDB).
// Example:
// const videoSchema = new mongoose.Schema({
//   title: String,
//   views: Number
// })
// 2️⃣ .plugin()
// plugin() is a Mongoose method used to add extra functionality to a schema.
// Think of it like installing an extension in Chrome.
// Example:
// Chrome → Install extension → New feature appears
// Mongoose Schema → Add plugin → New database feature appears
// 3️⃣ mongooseAggregatePaginate
// This plugin helps you paginate results of aggregate queries.
// Aggregate queries are like:
// Video.aggregate([
//   { $match: { views: { $gt: 1000 } } }
// ])
// If there are 10,000 results, pagination lets you show:
// Page 1 → 10 videos
// Page 2 → next 10 videos
// Page 3 → next 10 videos
// instead of loading everything at once.
// Real Life Example
// Think of YouTube search results.
// If you search "React tutorial":
// Page 1 → 20 videos
// Page 2 → next 20 videos
// Page 3 → next 20 videos
// That page system is pagination.
// This plugin helps you do the same thing when using MongoDB aggregate queries.
// In One Line
// videoSchema.plugin(mongooseAggregatePaginate)
// ➡️ Adds pagination support for aggregate queries in the videoSchema.