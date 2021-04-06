const db = require("../config/knex");

const listAll = async (filters) => {
  const shelters = await db
    .select(
      "*",
      db.raw(
        "(SELECT COALESCE(array_to_json(array_agg(pn.*)), '[]'::json) FROM phone_number pn where pn.shelter_id = s.shelter_id ) as phone_numbers"
      ),
      db.raw(
        "(SELECT COALESCE(array_to_json(array_agg(p.*)), '[]'::json) FROM person p where p.shelter_id = s.shelter_id ) as people"
      ),
      db.raw(
        "(SELECT COALESCE(array_to_json(array_agg(p.*)), '[]'::json) FROM product p where p.shelter_id = s.shelter_id ) as products"
      )
    )
    .from("shelter as s")
    .where((builder) => {
      if (filters.country === "usa") builder.where("department", "USA");
      if (filters.country === "hn") builder.where("department", "<>", "USA");
    })
    .orderBy("department");
  return shelters;
};

const findShelterById = async (id) => {
  const recipe = await db.select("*").from("shelter").where("shelter_id", id);
  if (recipe.length) {
    recipe[0].phone_numbers = await findPhoneNumbersByShelterId(id);
    recipe[0].people = await findPeopleByShelterId(id);
    recipe[0].products = await findProductsByShelterId(id);
  }
  return recipe;
};

const registerShelter = async (data) => {
  try {
    await db.transaction(async (trx) => {
      const { products, phone_numbers: phoneNumbers, people } = data;
      delete data.products;
      delete data.people;
      delete data.phone_numbers;
      const [registeredShelterId] = await trx("shelter")
        .insert(data)
        .returning("shelter_id");
      const phones = readAndFormatPhoneNumbers(
        phoneNumbers,
        registeredShelterId
      );
      const finalPeople = readAndFormatPeople(people, registeredShelterId);
      const finalProducts = readAndFormatProducts(
        products,
        registeredShelterId
      );
      await trx.insert(finalPeople).into("person");
      await trx.insert(finalProducts).into("product");
      await trx.insert(phones).into("phone_number");
    });
  } catch (error) {
    throw error;
  }
};

const updateShelterData = async (data, id) => {
  try {
    await db.transaction(async (trx) => {
      const { products, phone_numbers: phoneNumbers, people } = data;
      delete data.products;
      delete data.people;
      delete data.phone_numbers;
      await trx("shelter").update(data).where("shelter_id", id);
      await trx("product").where("shelter_id", id).del();
      await trx("phone_number").where("shelter_id", id).del();
      await trx("person").where("shelter_id", id).del();
      const phones = readAndFormatPhoneNumbers(phoneNumbers, id);
      const finalPeople = readAndFormatPeople(people, id);
      const finalProducts = readAndFormatProducts(products, id);
      await trx.insert(finalPeople).into("person");
      await trx.insert(finalProducts).into("product");
      await trx.insert(phones).into("phone_number");
    });
  } catch (error) {
    throw error;
  }
};

const findPhoneNumbersByShelterId = async (id) => {
  const phoneNumbers = await db
    .select("number")
    .from("phone_number")
    .where("shelter_id", id);
  return phoneNumbers;
};

const findPeopleByShelterId = async (id) => {
  const people = await db.select("type").from("person").where("shelter_id", id);
  return people;
};

const findProductsByShelterId = async (id) => {
  const products = await db
    .select("name")
    .from("product")
    .where("shelter_id", id);
  return products;
};

const readAndFormatPhoneNumbers = (data, shelterId) => {
  const phonesDetail = data.map((phone) => {
    detailData = {};
    detailData.shelter_id = shelterId;
    detailData.number = phone.number;
    return detailData;
  });
  return phonesDetail;
};

const readAndFormatPeople = (data, shelterId) => {
  const peopleDetail = data.map((person) => {
    detailData = {};
    detailData.shelter_id = shelterId;
    detailData.type = person.type.toUpperCase();
    return detailData;
  });
  return peopleDetail;
};

const readAndFormatProducts = (data, shelterId) => {
  const productDetail = data.map((product) => {
    detailData = {};
    detailData.shelter_id = shelterId;
    detailData.name = product.name.toUpperCase();
    return detailData;
  });
  return productDetail;
};

module.exports = {
  listAll,
  registerShelter,
  findShelterById,
  updateShelterData
};
