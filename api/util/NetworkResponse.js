const sendErrorResponse = (res, err) => {
  const message = err.code === 406 ? err.message : "Error en el servidor";
  res.status(400).json({ success: false, message });
};

const sendUnauthResponse = (res) => {
  const mensaje = "Su sesión ha expirado";
  res.status(403).json({ status: 403, success: false, mensaje });
};

const sendRegisteredOrUpdatedResponse = (res, message) => {
  res.status(200).json({
    success: true,
    message: message
  });
};

const sendListResponse = (res, data) => {
  res.status(200).json({
    success: true,
    data: data,
    message: data.length
      ? "Data listada correctamente"
      : "No se han encontrado registros"
  });
};

module.exports = {
  sendErrorResponse,
  sendRegisteredOrUpdatedResponse,
  sendListResponse,
  sendUnauthResponse
};
