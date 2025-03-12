import { date, type QTableProps } from "quasar";
import type { Category, ProductDto } from "../interfaces/product";

export const defaultProductDto: Required<ProductDto> = {
  name: "",
  image: "",
  category: "",
  price: 0,
  stock: 0,
};

export const categoryOptions: Category[] = ["cojines", "hombre", "mousepad"];

export const columns: QTableProps["columns"] = [
  {
    name: "_id",
    label: "ID",
    field: "_id",
    align: "center",
  },
  {
    name: "image",
    label: "Imagen",
    field: "image",
    align: "center",
  },
  {
    name: "name",
    label: "Nombre",
    field: "name",
    align: "center",
    sortable: true,
  },
  {
    name: "category",
    label: "Categoria",
    field: "category",
    align: "center",
    sortable: true,
  },
  {
    name: "price",
    label: "Precio",
    field: "price",
    align: "center",
    sortable: true,
    format: (val) =>
      new Intl.NumberFormat("es-PE", {
        style: "currency",
        currency: "PEN",
      }).format(val),
  },
  {
    name: "stock",
    label: "Stock",
    field: "stock",
    align: "center",
    sortable: true,
  },
  {
    name: "createdAt",
    label: "Fecha Creación",
    field: "createdAt",
    align: "center",
    format: (val) => date.formatDate(val, "DD/MM/YYYY HH:mm:ss"),
  },
  {
    name: "updatedAt",
    label: "Fecha Actualización",
    field: "updatedAt",
    align: "center",
    format: (val) => date.formatDate(val, "DD/MM/YYYY HH:mm:ss"),
  },
  {
    name: "actions",
    label: "Acciones",
    field: "actions",
    align: "center",
  },
];
