import mongoose from 'mongoose';
const schema = mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

schema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export default mongoose.model('todos', schema);