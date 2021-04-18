import { Request, Response } from "express";
import { Product } from "../entity/Product";
import { sonicIngest, sonicSearch } from "../services/sonic";

export function productContoller() {
  const ingest = sonicIngest();
  const search = sonicSearch();

  async function create(req: Request, res: Response) {
    const { descricao, tags } = req.body;

    const product = Product.create({
      descricao,
      tags,
    });

    await product.save();

    await ingest.push(
      "products",
      "topico",
      `product:${product.id}`,
      `${product.descricao} ${product.tags}`,
      {
        lang: "por",
      }
    );
    return res.status(201).send(product);
  }

  async function index(req: Request, res: Response) {
    const pesquisa = req.query.pesquisa as string;
    const page = req.query.page as string;

    const offset = parseInt(page) * 2 - 2;

    if (pesquisa) {
      const uuids = await search.query("products", "topico", pesquisa, {
        lang: "por",
        limit: 2,
        offset,
      });

      const ids = uuids.map(el => el.split(":")[1]);
      const producst = await Product.findByIds(ids);
      return res.json(producst);
    }
    const producst = await Product.find();
    return res.json(producst);
  }

  async function suggest(req: Request, res: Response) {
    const pesquisa = req.query.pesquisa as string;
    const suggests = await search.suggest(
      "products",
      "topico",
      pesquisa.trim()
    );
    return res.json(suggests);
  }

  return {
    create,
    index,
    suggest,
  };
}
