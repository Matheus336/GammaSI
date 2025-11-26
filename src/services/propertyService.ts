import { Property, IProperty } from "../models/property";

export class PropertyService {
  async createProperty(data: Partial<IProperty>) {
    return await Property.create(data);
  }

  async getProperties() {
    return await Property.find().sort({ createdAt: -1 });
  }

  async getPropertyById(id: string) {
    return await Property.findById(id);
  }

  async updateProperty(id: string, data: Partial<IProperty>) {
    return await Property.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProperty(id: string) {
    return await Property.findByIdAndDelete(id);
  }
}

export const propertyService = new PropertyService();
