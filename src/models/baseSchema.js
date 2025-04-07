import mongoose from 'mongoose';

export const baseSchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    },
  },
  toObject: {
    virtuals: true,
  },
};

/**
 * Creates a Mongoose schema using base defaults
 * @param {Object} definition - schema fields
 * @param {Object} options - any custom schema options
 * @returns {mongoose.Schema}
 */
export const createSchema = (definition, options = {}) => {
  return new mongoose.Schema(definition, {
    ...baseSchemaOptions,
    ...options,
  });
};
