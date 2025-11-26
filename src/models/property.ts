import mongoose, { Schema, Document } from "mongoose";

export interface IProperty extends Document {
  title: string;
  location: string;
  coordinates: [number, number];
  price: string;
  suite: string;
  beds: string;
  room: string;
  kitchen: string;
  baths: string;
  area: string;
  tipo: "venda" | "aluguel";
  image: string;
  description: string;
  features: string[];
  gallery: string[];
  createdAt: Date;
}

const PropertySchema = new Schema<IProperty>({
  title: { type: String, required: true },
  location: { type: String, required: true },
  coordinates: { type: [Number], default: undefined },
  price: { type: String, required: true },
  suite: String,
  beds: String,
  room: String,
  kitchen: String,
  baths: String,
  area: String,
  tipo: { type: String, enum: ["venda", "aluguel"], required: true },
  image: String,
  description: String,
  features: [String],
  gallery: [String],
  createdAt: { type: Date, default: Date.now },
});

// força o nome da collection para 'properties'
export const Property = mongoose.model<IProperty>(
  "Property",
  PropertySchema,
  "properties"
);
