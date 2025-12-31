import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Fit API",
      version: "1.0.0",
      description: "API documentation for the Fitness Tracking application",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Category: {
          type: "object",
          properties: {
            id: { type: "integer" },
            slug: { type: "string" },
            name: { type: "string" },
            exercises: {
              type: "array",
              items: { $ref: "#/components/schemas/Exercise" },
            },
          },
        },
        Exercise: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            categoryId: { type: "integer" },
          },
        },
        WorkoutRecord: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "integer" },
            exerciseId: { type: "integer" },
            reps: { type: "integer" },
            weight: { type: "number" },
            weightUnit: { type: "string" },
            sets: { type: "integer" },
            workoutTime: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("📄 Swagger docs available at http://localhost:3000/api-docs");
};
