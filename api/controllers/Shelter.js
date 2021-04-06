const ShelterService = require("../services/Shelter");
const {
  sendErrorResponse,
  sendRegisteredOrUpdatedResponse,
  sendListResponse
} = require("../util/NetworkResponse");

const handleMainGet = async (req, res) => {
  try {
    const filters = readFilters(req.query);
    const data = await ShelterService.listAll(filters);
    sendListResponse(res, data);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const handleGetById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ShelterService.findShelterById(id);
    sendListResponse(res, data);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const handleMainPost = async (req, res) => {
  try {
    const data = readRegisteringData(req);
    await ShelterService.registerShelter(data);
    sendRegisteredOrUpdatedResponse(
      res,
      "Albergue o casa de acoplo registrada con éxito"
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

const handleMainPut = async (req, res) => {
  try {
    const data = readRegisteringData(req);
    const { shelter_id: id } = req.body;
    await ShelterService.updateShelterData(data, id);
    sendRegisteredOrUpdatedResponse(
      res,
      "Albergue o casa de acoplo actualizada con éxito"
    );
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error);
  }
};

//utils
const readRegisteringData = (req) => {
  const data = {};
  const {
    name,
    city,
    contact,
    phone_numbers,
    products,
    aprox_people,
    people,
    department,
    shelter_type,
    delivery,
    address,
    additional_info
  } = req.body;
  data.department = department;
  data.name = name;
  data.aprox_people = aprox_people.trim() == "" ? 0 : aprox_people.trim();
  data.city = city;
  data.contact = contact;
  data.address = address;
  data.phone_numbers = phone_numbers;
  data.people = people;
  data.products = products;
  data.delivery = delivery;
  data.shelter_type = shelter_type;
  data.additional_info = additional_info;
  return data;
};

const readFilters = (data) => {
  const { country } = data;
  const filters = {};
  if (country) {
    filters["country"] = country.toLowerCase();
  }
  return filters;
};

module.exports = {
  handleMainPost,
  handleMainGet,
  handleMainPut,
  handleGetById
};
