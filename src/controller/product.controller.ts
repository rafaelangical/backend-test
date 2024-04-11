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

export const listAllProducts = async (
  _req: Express.Request,
  res: Express.Response
) => {
  try {
    const product = await ProductModel.find().lean();

    res.json({ success: true, product });
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

    const product = await ProductModel.findOne({ sku }).exec();
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
    const update = { ..._req.body };

    const product = await ProductModel.findOneAndUpdate(filter, update, {
      new: true,
    });

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

    if (existingProduct) {
      if (existingProduct) {
        res.json({
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

      const product = await ProductModel.create({ ...newProduct });

      await product.save();

      res.json({ success: true, product });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};
