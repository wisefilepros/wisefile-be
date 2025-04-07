import mongoose from 'mongoose';

export const baseSchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
  },
};

export const createSchema = (definition, options = {}) => {
  return new mongoose.Schema(definition, {
    ...baseSchemaOptions,
    ...options,
  });
};
