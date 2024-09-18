// lib/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Next.js API with Swagger',
    version: '1.0.0',
    description: 'API documentation for a Next.js project',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./app/api/**/*.yaml'], // Add all relevant API file paths
};

const swaggerSpec = swaggerJsdoc(options);

export function getSwaggerSpec() {
  return swaggerSpec;
}