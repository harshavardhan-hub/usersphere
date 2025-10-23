const { body, param } = require('express-validator');

const validateUser = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)
    .withMessage('Must be a valid phone number'),
  
  body('company')
    .optional()
    .trim(),
  
  body('address')
    .notEmpty().withMessage('Address is required')
    .isObject().withMessage('Address must be an object'),
  
  body('address.street')
    .trim()
    .notEmpty().withMessage('Street is required'),
  
  body('address.city')
    .trim()
    .notEmpty().withMessage('City is required'),
  
  body('address.zip')
    .trim()
    .notEmpty().withMessage('ZIP code is required'),
  
  body('address.geo')
    .optional()
    .isObject().withMessage('Geo must be an object'),
  
  body('address.geo.lat')
    .optional()
    .trim(),
  
  body('address.geo.lng')
    .optional()
    .trim()
];

const validateUserId = [
  param('id')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer')
];

module.exports = {
  validateUser,
  validateUserId
};
