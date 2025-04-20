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
  const schema = new mongoose.Schema(definition, {
    ...baseSchemaOptions,
    ...options,
  });

  // Soft delete middleware: filters out is_deleted by default
  // schema.pre(/^find/, function (next) {
  //   if (!this.getQuery().hasOwnProperty('is_deleted')) {
  //     this.where({ is_deleted: false });
  //   }
  //   next();
  // });

  return schema;
};
