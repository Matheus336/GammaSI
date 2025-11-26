import express from "express";
import propertyRoutes from "./src/routes/propertyRoutes";
import uploadRoutes from "./src/routes/uploadRoutes";

export const app = express();

app.use(express.json());
app.use("/properties", propertyRoutes);
app.use("/upload", uploadRoutes);
