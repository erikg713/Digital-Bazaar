import mongoose from 'mongoose';

const purchaseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
