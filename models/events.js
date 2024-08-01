import mongoose, { models, Schema } from "mongoose"



// Define the Comment schema

  
  // Define the Event schema
  const EventSchema = new Schema({
    title: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    dateInfo: {
      date: { type: Date, required: true },
      time: { type: String, required: true }
    },
    location: { type: String, required: true },
    comments: []
  },
  { timestamps: true }
);



const CommentSchema = new Schema({
    name: { type: String, required: true },
    EventId: { type: String },
    text: { type: String },
    replies: [{
      name: { type: String, required: true },
      id: { type: String },
      text: { type: String }
    }]
  },{ timestamps: true });


  const Events = models.Event || mongoose.model('Event', EventSchema);
 
  export default Events;