import mongoose from 'mongoose';

/**
 * Builds a Mongoose filter from request query parameters.
 * Only includes allowed fields. Optionally cast to ObjectId or Boolean.
 *
 * @param {Object} query - req.query
 * @param {Object} options - field config { fieldName: 'objectId' | 'boolean' | 'string' }
 * @returns {Object} mongoose filter
 */
export function buildQueryFromParams(query, options = {}) {
  const filters = {};

  for (const key in query) {
    if (!options[key]) continue;

    const value = query[key];
    const type = options[key];

    if (type === 'objectId') {
      try {
        filters[key] = new mongoose.Types.ObjectId(String(value));
      } catch {
        continue; // invalid ID — skip
      }
    } else if (type === 'boolean') {
      filters[key] = value === 'true';
    } else if (type === 'string') {
      filters[key] = value;
    } else if (type === 'array') {
      filters[key] = { $in: Array.isArray(value) ? value : [value] };
    }
  }

  return filters;
}
