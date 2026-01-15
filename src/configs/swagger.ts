// src/config/swaggerOptions.ts
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SWAGGER_SERVER_DESC, SWAGGER_SERVER_URL } from './env.config';


const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Inventory Management API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
        servers: [
            {
                url: SWAGGER_SERVER_URL,
                description: SWAGGER_SERVER_DESC,
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
