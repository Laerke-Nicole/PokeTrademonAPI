import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Pokémon Trading API",
        version: "1.0.0",
        description: "API for trading Pokémon cards between users",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 5004}/api`
        },
        {
          url: 'https://poketrademonapi-4o29.onrender.com/api',
          description: 'Live server',
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          },
          'auth-token': {
            type: 'apiKey',
            in: 'header',
            name: 'auth-token',
          },
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    },
    apis: ["./src/routes/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
