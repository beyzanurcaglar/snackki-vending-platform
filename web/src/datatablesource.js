import { statusLabel, periodLabel } from "./labels";
export const productColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "productId", headerName: "Produkt ID", width: 120 },
  {
    field: "title",
    headerName: "Produktname",
    width: 300,
  },
  {
    field: "desc",
    headerName: "Beschreibung",
    width: 160

  },
  {
    field: "cartoonAmount",
    headerName: "Kartoninhalt",
    width: 130
  },
];

export const userColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "isAdmin", headerName: "Admin", width: 60 },
  { field: "isActive", headerName: "Aktiv", width: 60 },
  { field: "userId", headerName: "B. ID", width: 60 },
  {
    field: "name",
    headerName: "Vorname",
    width: 100,
  },
  {
    field: "surname",
    headerName: "Nachname",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Telefonnummer",
    width: 150,
  },
  {
    field: "branch",
    headerName: "Firmentyp",
    width: 120,
  },
  {
    field: "companyName",
    headerName: "Firmenname",
    width: 130,
  },
  {
    field: "contactPerson",
    headerName: "Kontaktperson",
    width: 120,
  },


]

export const forYouColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "productId", headerName: "Produkt ID", width: 120 },
  {
    field: "title",
    headerName: "Produktname",
    width: 180,
  },
]
export const orderColumns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "orderId", headerName: "Bestell ID", width: 200 },
  { field: "userId", headerName: "Kunden ID", width: 120 },
  { field: "name", headerName: "Vorname", width: 120 },
  { field: "surname", headerName: "Nachname", width: 120 },
  { field: "orderDate", headerName: "Bestelldatum", width: 150 },
  {field:"status",headerName:"Status",width:100, valueGetter: (params) => statusLabel(params.row.status)}
]
export const automatColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "userId", headerName: "Kunden ID", width: 150 },
  { field: "brandName", headerName: "Automatenmarke", width: 200 },
  { field: "automatModelName", headerName: "Automatenmodell", width: 150 },
  { field: "automatSeriNo", headerName: "Seriennummer", width: 150 },
  { field: "automatDocument", headerName: "Dokumente", width: 250 },

]

export const automatmodelColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "automatModelName", headerName: "Automatenmodell", width: 200 },
  { field: "brandName", headerName: "Automatenmarke", width: 200 },

]

export const automatbrandColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "brandName", headerName: "Automatenmarke", width: 200 },

  
]

export const automatfilterColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "filterName", headerName: "Automatenfilter", width: 200 },
]

export const categoryColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "categoryName", headerName: "Kategoriename", width: 200 },
]

export const subcategoryColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "subcategoryName", headerName: "Unterkategoriename", width: 200 },
]


export const filterOrderColumns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Vorname", width: 170 },
  { field: "surname", headerName: "Nachname", width: 170 },
  { field: "automatId", headerName: "Automaten ID", width: 170 },
  { field: "filterName", headerName: "Filtername", width: 170 },
  { field: "periodName", headerName: "Intervall", width: 170, valueGetter: (params) => periodLabel(params.row.periodName) },
  { field: "filterChangedDate", headerName: "Filter Austauschdatum", width: 200 },
]