import * as Joi from 'joi';

export const validationSchema = Joi.object({
  API_URL: Joi.string().uri().required().messages({
    'any.required': 'API_URL is required and must be a valid URI.',
  }),
  PORT: Joi.number().default(3000),
  API_KEY: Joi.string().required().messages({
    'any.required': 'API_KEY is required and must be a valid 0x API key.',
  }),
  RPC_URL: Joi.string().uri().required().messages({
    'any.required': 'RPC_URL is required and must be a valid URI.',
  }),
});
