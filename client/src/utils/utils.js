import * as Yup from "yup";

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "object" && Object.entries(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const wait = (duration = 1000) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });
};

export const capitalize = (s) =>
  s && s[0].toUpperCase() + s.slice(1).toLowerCase();

export const onHandleFile = (_file, _newName) => {
  const ext = _file?.name.split(".").pop();
  const newName = `${_newName}.${ext}`;
  const newFile = new File([_file], newName, {
    type: _file?.type,
  });
  return newFile;
};

export const amountFormatter = (amount) => {
  // Create a formatter for 'de-DE' locale (German), which uses '.' as thousand separator and ',' as decimal separator
  const formatter = new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // Format the number
  const formattedAmount = formatter.format(amount);

  return formattedAmount;
};

export const validationSchemaLogin = Yup.object().shape({
  mail: Yup.string().required("L'Adresse E-mail est requise."),
  password: Yup.string().required("Le Mot de passe est requis."),
});

export const validationExtension = Yup.object().shape({
  telephone: Yup.string().required("Extension's telephone is required"),
  mail: Yup.string().email("Extension's invalid e-mail"),
  address: Yup.string().required("Extension's address is required"),
});

export const validationCategory = Yup.object().shape({
  title: Yup.string().required("L'intitulé de la categorie est requise."),
  description: Yup.string(),
});

export const validationSchemaArticle = Yup.object().shape({
  category_id: Yup.string().required("La categorie est requise."),
  title: Yup.string().required("Libellé de l'article est requis."),
  price: Yup.number()
    .typeError("Veuillez saisir un nombre/chiffre relatif au Prix")
    .required("Prix Unitaire de l'article est requis.")
    .moreThan(0, "Le prix unitaire doit être superieur à 0"),
  currency: Yup.string().required("La devise relative au prix est requise."),
  threshold: Yup.number()
    .typeError("Veuillez saisir un nombre/chiffre relatif au Seuil")
    .required("Veuillez définir le seuil d'alert.")
    .moreThan(-1, "Le seuil d'alert ne peut être inferieur à 0"),
  description: Yup.string(),
});

export const validationSchemaStock = Yup.object().shape({
  article_id: Yup.string().required("L'article doit être renseigné."),
  type: Yup.string().required("Type de l'opération est requis."),
  quantity: Yup.number()
    .typeError("Veuillez saisir un nombre/chiffre relatif à la quantité")
    .required("Veuillez saisir la quantitée")
    .moreThan(0, "La quantitée ne peut être inferieur ou égale à 0"),
  description: Yup.string(),
});

export const validationSchemaOnAddToBasket = Yup.object().shape({
  article_id: Yup.string().required("L'article doit être renseigné."),
  quantity: Yup.number()
    .required("Veuillez saisir la quantitée")
    .typeError("Veuillez saisir un nombre/chiffre relatif à la quantité")
    .moreThan(0, "La quantitée ne peut être inferieur ou égale à 0"),
  discount: Yup.number()
    .typeError("Veuillez saisir un nombre/chiffre relatif au remise")
    .moreThan(-0.9, "La remise ne peut être inferieur à 0"),
});

export const validationSchemaOrder = Yup.object().shape({
  order_dates: Yup.string().required(
    "La date de la commande/vente doit être renseigné."
  ),
  order_discount: Yup.number()
    .typeError("Veuillez saisir un nombre/chiffre relatif à la remise générale")
    .moreThan(-0.9, "La remise ne peut être inferieur à 0"),
  order_pay_mode: Yup.string().required(
    "Le mode de paiement de la commande/vente doit être renseigné."
  ),
  order_status: Yup.string().required(
    "Le statut de la commande/vente doit être renseigné."
  ),
  customer: Yup.string().required("Le client doit être renseigné."),
});

export const validationSchemaCustomerOrder = Yup.object().shape({
  names: Yup.string().required("Renseignez votre noms."),
  mail: Yup.string().required("Renseignez votre adresse mail."),
  telephone: Yup.string().required("Renseignez votre numéro de téléphone."),
});

export const validationSchemaUser = Yup.object().shape({
  firstname: Yup.string().required("Veuillez renseigner le prénom."),
  lastname: Yup.string().required("Veuillez renseigner le nom."),
  gender: Yup.string().required("Veuillez renseigner le genre."),
  telephone: Yup.string().required("Veuillez renseigner le téléphone."),
  mail: Yup.string().required("Veuillez renseigner l'e-mail."),
  sys_role: Yup.string().required("Veuillez renseigner le rôle."),
});
// newsletter
export const validationSchemaNewsletter = Yup.object().shape({
  mail: Yup.string().required("Veuillez renseigner votre address e-mail."),
});
// messaging
export const validationSchemaMessage = Yup.object().shape({
  firstname: Yup.string().required("Veuillez renseigner votre prénom."),
  lastname: Yup.string().required("Veuillez renseigner votre nom."),
  subject: Yup.string().required(
    "Veuillez renseigner l'intutilé de votre message."
  ),
  message: Yup.string().required("Veuillez saisir votre message."),
});
// change password
export const validationSchemaChangePassword = Yup.object().shape({
  old_password: Yup.string().required(
    "Veuillez renseigner votre ancien mot de passe."
  ),
  new_password: Yup.string()
    .required("Veuillez renseigner votre nouveau mot de passe.")
    .min(4, "Le mot de passe doit avoir au moins 4 caractères"),
  confirm_new_password: Yup.string()
    .required("Veuillez confirmer votre nouveau de passe.")
    .oneOf(
      [Yup.ref("new_password"), null],
      "Les mot de passes doivent correspondre!"
    ),
});
