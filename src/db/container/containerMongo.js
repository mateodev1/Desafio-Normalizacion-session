import mongoose from "mongoose";

await mongoose.connect(
  "mongodb+srv://mateo:mateo123@cluster0.kcavv9s.mongodb.net/chat-coder?retryWrites=true&w=majority"
);

class ContainerMongo {
  constructor(nameCollection, esquema) {
    // console.log(`name collection${nameCollection}, squema : ${esquema}`);
    this.collection = mongoose.model(nameCollection, esquema);
  }
  async getAll() {
    const doc = await this.collection.find({});
    return doc;
  }
  async addObject(newProduct) {
    await this.collection.insertMany(newProduct);
  }
  async getId(idProduct) {
    const doc = await this.collection.find({ _id: idProduct });
    return doc[0];
  }
  async updateObject(product) {
    await this.collection.updateMany({ _id: product.id }, product);
    console.log(`product update : ${product._id}`);
  }
  async deleteObject(idProduct) {
    await this.collection.deleteMany({ _id: idProduct });
    console.log(`product delete: ${idProduct}`);
  }

  async updateOne(idCart, products) {
    await this.collection.updateOne({ _id: idCart }, { $set: products });
    console.log(`cart update : ${idCart}`);
  }
}

export default ContainerMongo;
