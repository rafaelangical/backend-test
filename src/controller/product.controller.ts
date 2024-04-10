import Express from "express";
import ProductModel from "../model/product.model";

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface IWhareHouse {
  locality: string;
  quantity: number;
  type: string;
}

export interface IProductCreate {
  sku: number;
  name: string;
  inventory: {
    quantity: number;
    warehouses: IWhareHouse[];
  };
  isMarketable: boolean;
}

export const listAllProducts = (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    ProductModel.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
};

export const getProduct = async (
  _req: Express.Request<{ sku: number }>,
  res: Express.Response
) => {
  try {
    const sku = Number(_req.params.sku);

    console.log({ sku });
    const product = await ProductModel.findOne({ sku }).exec();

    console.log({ product });
  } catch (error) {
    res.json({ error });
  }
};

export const deleteProduct = async (
  _req: Express.Request<{ sku: number }>,
  res: Express.Response
) => {
  try {
    const sku = _req.query.sku;

    const product = await ProductModel.findOneAndDelete({ sku });

    console.log("product deleted", product);

    if (product) {
      res.json({
        success: true,
        message: "Product deleted with success.",
      });
    }
  } catch (error) {
    res.json({ error });
  }
};

export const editProduct = async (
  _req: Express.Request<{ sku: number }>,
  res: Express.Response
) => {
  try {
    const sku = _req.query.sku;

    const filter = { sku };
    const update = {
      sku: 43264,
      name: "L'Oréal Professionnel Expert Absolut Repair Cortex Lipidium - Máscara de Reconstrução 500g",
      inventory: {
        quantity: 1,
        warehouses: [
          {
            locality: "SP",
            quantity: 110,
            type: "ECOMMERCE",
          },
          {
            locality: "MOEMA",
            quantity: 1,
            type: "PHYSICAL_STORE",
          },
        ],
      },
      isMarketable: false,
    };

    const product = await ProductModel.findOneAndUpdate(filter, update, {
      new: true,
      returnOriginal: false,
      rawResult: true,
    });

    console.log("product update", product);

    if (product) {
    }
  } catch (error) {
    res.json({ error });
  }
};

export const createProduct = async (
  _req: TypedRequestBody<IProductCreate>,
  res: Express.Response
) => {
  try {
    const sku = _req.body?.sku;

    const existingProduct = await ProductModel.findOne({ sku });

    console.log({ existingProduct });

    if (existingProduct) {
      if (existingProduct.sku) {
        console.log("aqui no existing product 1");

        return res.json({
          success: false,
          message:
            "Dois produtos são considerados iguais se os seus skus forem iguais",
        });
      }
    } else {
      const warehousesLength = _req.body.inventory.warehouses.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );

      const newProduct: IProductCreate = {
        ..._req.body,
        inventory: {
          ..._req.body.inventory,
          quantity: warehousesLength,
        },
        isMarketable: !!warehousesLength,
      };

      const product = await ProductModel.create({ newProduct });

      console.log("created product", product);

      return res.json({ success: true, product: newProduct });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};
