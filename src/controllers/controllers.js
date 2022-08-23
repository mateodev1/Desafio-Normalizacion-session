import { faker } from "@faker-js/faker";
faker.locale = "es";

let productos = [];

const generateProducts = () => {
  productos = [];
  for (let i = 1; i <= 5; i++) {
    productos.push({
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      foto: faker.image.image(400, 400, true),
    });
  }
};

const getAll = (req, res) => {
  generateProducts();
  res.render("products", { productos });
};

export default { getAll };
