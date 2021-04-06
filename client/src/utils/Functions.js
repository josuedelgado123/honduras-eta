//no aceptará letras
const validateOnlyNumbers = (input) => {
  let noValidos = new RegExp("^[0-9]*$"); //los valores que no quiero que acepte
  if (input.match(noValidos)) {
    return false;
  }
  return true;
};

const makeid = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export { validateOnlyNumbers, makeid };
