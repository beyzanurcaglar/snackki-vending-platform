export const userInputs = [
  
    {
      id:1,
      label: "Kunden ID*",
      type: "number",
      required : true,
      placeholder: "123123",
      name:"userId"
    },
    {
      id:1,
      label: "IsAdmin",
      type: "number",
      required : false,
      placeholder: "0 oder 1 (Default ist 0)",
      name:"isAdmin"
    },
    {
      id:2,
      label: "Vorname*",
      type: "text",
      required : true,
      placeholder: "John",
      name:"name"
    },  
    {
      id:3,
      label: "Nachname*",
      type: "text",
      required : true,
      placeholder: "Doe",
      name:"surname"
    },
    {
      id:4,
      label: "E-Mail*",
      type: "mail",
      required : true,
      placeholder: "john_doe@gmail.com",
      name:"email"
    },
    {
      id:5,
      label: "Telefonnummer*",
      type: "number",
      required : true,
      placeholder: "+1 234 567 89",
      name:"phone"
    },
    {
      id:6,
      label: "Adresse*",
      type: "text",
      required : true,
      placeholder: "Elton St. 216",
      name:"street"
    },
    {
      id:7,
      label: "Postleitzahl*",
      type: "number",
      required : true,
      placeholder: "10555",
      name:"postNo"
    },
    {
      id:8,
      label: "Stadt*",
      type: "text",
      required : true,
      placeholder: "Berlin",
      name:"city"
    },
    {
      id:9,
      label: "Land*",
      type: "text",
      required : true,
      placeholder: "Deutschland",
      name:"country"
    },
  
    {
      id:10,
      label: "Firmatyp*",
      type: "text",
      name:"branch",
      required : true,
    },
    {
      id:11,
      label: "Firmaname*",
      type: "text",
      name:"companyName",
      required : true,
    }


  
  ];
  
  export const productInputs = [
    {
      id:1,
      label: "Produkt ID*",
      type: "number",
      placeholder: "Produkt ID eintragen (123123)",
      name:"productId"
    },
    {
      id:2,
      label: "Produktname*",
      type: "text",
      placeholder: "Produktname eintragen",
      name:"title"
    },
    {
      id:4,
      label: "Kartoninhalt*",
      type: "number",
      placeholder: "Kartoninhalt eintragen (6)",
      name:"cartoonAmount"
    },
  ];
  