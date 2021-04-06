import React, { Component } from "react";
import PhoneNumbersTable from "../../components/Tables/PhoneNumbersTable";
import ProductTable from "../../components/Tables/ProductsTable";
import departments from "../../data/departmentsData";
import PeopleTable from "../../components/Tables/PeopleTable";
import { Instructions } from "./Instructions";
import { validateOnlyNumbers } from "../../utils/Functions.js";
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";
import { withAlert } from "react-alert";

// const api = "https://honduraseta.com/api";
// const api = "http://localhost:3005";

const initState = {
  shelterId: "",
  department: "cortes",
  name: "",
  city: "",
  address: "",
  contact: "",
  aproxPeople: "",
  people: [],
  products: [],
  phoneNumbers: [],
  delivery: "N",
  shelterType: "AE",
  isLoading: false,
  additionalInfo: "",
  //
  prodName: "",
  phoneNumber: "",
  personType: ""
};

const readAndSetData = ([data]) => {
  const state = {
    shelterId: data.shelter_id,
    department: data.department.toLowerCase(),
    name: data.name,
    city: data.city,
    contact: data.contact,
    aproxPeople: data.aprox_people === 0 ? "" : data.aprox_people.toString(),
    people: data.people,
    address: data.address,
    products: data.products,
    phoneNumbers: data.phone_numbers,
    delivery: data.delivery,
    shelterType: data.shelter_type,
    additionalInfo: data.additional_info
  };
  return state;
};

var accionFormulario;

class ShelterForm extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
    this.cboDepartment = React.createRef();
    this.productInput = React.createRef();
    this.personTypeInput = React.createRef();
    this.phoneNumberType = React.createRef();
  }

  onChange = (e) => {
    const { alert } = this.props;
    switch (e.target.name) {
      case "aproxPeople":
        if (validateOnlyNumbers(e.target.value)) {
          alert.show("Solo puedes agregar números");
          return;
        }
        break;
      case "phoneNumber":
        if (validateOnlyNumbers(e.target.value)) {
          alert.show("Solo puedes agregar números");
          return;
        }
        break;
      default:
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    //si hay 20 departamentos es porque está la opción de todos, quitarla
    if (departments.length === 20) departments.shift();
    if (id) {
      accionFormulario = "editar";
      // mensajeBoton = "Guardar";
      this.fetchShelterData(id);
    } else {
      accionFormulario = "agregar";
    }
    this.cboDepartment.current.focus();
  }

  fetchShelterData = (id) => {
    const { alert } = this.props;
    this.setState({ isLoading: true });
    fetch("/albergue/" + id)
      .then((response) => response.json())
      .then((resp) => {
        if (resp.success) {
          this.setState(readAndSetData(resp.data));
        } else {
          alert.show(resp.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alert.error(
          "¡Ha ocurrido un error en el servidor al obtener los datos del albergue!"
        );
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const url = "/albergue";
    const method = accionFormulario === "agregar" ? "POST" : "PUT";
    this.setState({ isLoading: true });
    const { alert } = this.props;
    const {
      name,
      city,
      contact,
      aproxPeople,
      products,
      phoneNumbers,
      department,
      people,
      delivery,
      shelterType,
      shelterId,
      additionalInfo,
      address
    } = this.state;

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shelter_id: shelterId,
        name: name.toUpperCase(),
        address: address.toUpperCase(),
        department: department.toUpperCase(),
        city: city.toUpperCase(),
        contact: contact.toUpperCase(),
        people: people,
        aprox_people: aproxPeople,
        products: products,
        phone_numbers: phoneNumbers,
        delivery: delivery,
        additional_info: additionalInfo,
        shelter_type: shelterType
      })
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isLoading: false });
        if (data.success) {
          alert.success(data.message);
          const { history } = this.props;
          history.push("/admin/albergue");
          // this.setState(initState);
        } else {
          alert.show(data.message);
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        alert.error(
          "¡Ha ocurrido un error en el servidor al registrar o editar el tipo de producto!"
        );
      });
  };

  addPhoneNumber = (e) => {
    e.preventDefault();
    const { alert } = this.props;
    const { phoneNumbers, phoneNumber } = this.state;
    if (phoneNumber !== "") {
      //verificar que no esté registrado
      let data = phoneNumbers.find((num) => num.number === phoneNumber);
      if (data === undefined) {
        const phone = { number: phoneNumber };
        this.setState({
          phoneNumbers: [...phoneNumbers, phone],
          phoneNumber: ""
        });
      } else {
        alert.show("El número ya está registrado");
      }
      this.phoneNumberType.current.focus();
    } else {
      this.phoneNumberType.current.focus();
      alert.show("El campo de número está vacío");
      return;
    }
  };

  deletePerson = (e, type) => {
    e.preventDefault();
    const { people } = this.state;
    this.setState({
      people: people.filter((person) => person.type !== type)
    });
  };

  addPerson = (e) => {
    e.preventDefault();
    const { alert } = this.props;
    const { people, personType } = this.state;
    if (personType !== "") {
      //verificar que no esté registrado
      let data = people.find((person) => person.type === personType);
      if (data === undefined) {
        const type = { type: personType };
        this.setState({
          people: [...people, type],
          personType: ""
        });
      } else {
        alert.show("Ese tipo de persona ya está registrado");
      }
      this.personTypeInput.current.focus();
    } else {
      this.personTypeInput.current.focus();
      alert.show("El campo está vacío");
      return;
    }
  };

  deletePhoneNumber = (e, newNumber) => {
    e.preventDefault();
    const { phoneNumbers } = this.state;
    this.setState({
      phoneNumbers: phoneNumbers.filter((num) => num.number !== newNumber)
    });
  };

  addProduct = (e) => {
    e.preventDefault();
    const { alert } = this.props;
    const { products, prodName } = this.state;
    if (prodName !== "") {
      //verificar que no esté registrado
      let data = products.find((product) => product.name === prodName);
      if (data === undefined) {
        const product = { name: prodName };
        this.setState({
          products: [...products, product],
          prodName: ""
        });
      } else {
        alert.show("El producto ya está registrado");
      }
      this.productInput.current.focus();
    } else {
      this.productInput.current.focus();
      alert.show("El campo está vacío");
      return;
    }
  };

  deleteProduct = (e, name) => {
    e.preventDefault();
    const { products } = this.state;
    this.setState({
      products: products.filter((product) => product.name !== name)
    });
  };

  render() {
    let cboDepartments = departments.map((dep, i) => (
      <option key={i} value={dep.value}>
        {dep.name}
      </option>
    ));
    let disabled = false;
    const {
      name,
      city,
      contact,
      aproxPeople,
      products,
      department,
      prodName,
      people,
      personType,
      phoneNumbers,
      phoneNumber,
      delivery,
      shelterType,
      additionalInfo,
      isLoading,
      address
    } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="container mt-1">
        <div className="row justify-content-center box">
          <div
            className={`col-md-12 col-sm-12 align-self-center border rounded pt-1`}
          >
            <form onSubmit={this.onSubmit} className="container">
              <div className="mb-2 text-center">
                <h2>FORMULARIO DE ALBERGUES / CENTROS DE ACOPIO</h2>
              </div>
              <Instructions />
              <fieldset disabled={disabled}>
                <div className="mx-auto">
                  <div className="form-group col">
                    <label htmlFor="cboDepartment">
                      Departamento{" "}
                      <strong>
                        * Si el centro de acopio es en Estados Unidos,
                        seleccionar "USA".
                      </strong>
                    </label>
                    <select
                      required
                      id="cboDepartment"
                      className="form-control custom-select"
                      name="department"
                      onChange={this.onChange}
                      value={department}
                      ref={this.cboDepartment}
                    >
                      {cboDepartments}
                    </select>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtName">Ciudad o municipio</label>
                    <input
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      required
                      type="text"
                      className="form-control"
                      id="txtName"
                      placeholder="San Pedro Sula, Tegucigalpa ..."
                      maxLength="150"
                      name="city"
                      onChange={this.onChange}
                      value={city}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtName">Dirección</label>
                    <input
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      required
                      type="text"
                      className="form-control"
                      id="txtName"
                      placeholder="Barrio X, calle Z ..."
                      maxLength="200"
                      name="address"
                      onChange={this.onChange}
                      value={address}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtName">
                      Nombre de albergue / Nombre de centro de acopio
                    </label>
                    <input
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      required
                      type="text"
                      className="form-control"
                      id="txtName"
                      maxLength="150"
                      name="name"
                      onChange={this.onChange}
                      value={name}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtAdditionalInfo">
                      Información adicional (Fechas, Horarios, Observaciones,
                      etc)
                    </label>
                    <textarea
                      type="text"
                      className="form-control text-uppercase"
                      id="txtAdditionalInfo"
                      maxLength="200"
                      name="additionalInfo"
                      onChange={this.onChange}
                      value={additionalInfo}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtName">
                      Contacto (Persona encargada, nombre de contacto principal,
                      usuario de red social, etc):
                    </label>
                    <input
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      type="text"
                      className="form-control"
                      id="txtName"
                      maxLength="50"
                      name="contact"
                      onChange={this.onChange}
                      value={contact}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="txtName">
                      Cantidad aproximada de personas
                    </label>
                    <input
                      onKeyPress={(e) => {
                        e.key === "Enter" && e.preventDefault();
                      }}
                      type="text"
                      className="form-control"
                      id="txtName"
                      name="aproxPeople"
                      onChange={this.onChange}
                      value={aproxPeople}
                    />
                  </div>
                  <div className="form-group col">
                    ¿Es albergue o centro de acopio/grupo de apoyo?
                    <div className="form-check">
                      <input
                        onKeyPress={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        className="form-check-input"
                        type="radio"
                        name="shelterType"
                        id="typeShelter"
                        value="AE"
                        onChange={this.onChange}
                        checked={shelterType === "AE"}
                      />
                      <label className="form-check-label" htmlFor="typeShelter">
                        Albergue
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        onKeyPress={(e) => {
                          e.key === "Enter" && e.preventDefault();
                        }}
                        className="form-check-input"
                        type="radio"
                        name="shelterType"
                        id="typeGroupHouse"
                        onChange={this.onChange}
                        value="CA"
                        checked={shelterType === "CA"}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="typeGroupHouse"
                      >
                        Centro de acopio o grupo de apoyo
                      </label>
                    </div>
                  </div>
                  {shelterType === "CA" && (
                    <div className="form-group col">
                      ¿Si las personas no pueden ir a tu centro de acopio, puede
                      pasar a recogerla alguien de tu equipo a recogerla?
                      <div className="form-check">
                        <input
                          onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          className="form-check-input"
                          type="radio"
                          name="delivery"
                          id="deliveryNo"
                          value="N"
                          onChange={this.onChange}
                          checked={delivery === "N"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryNo"
                        >
                          No
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          className="form-check-input"
                          type="radio"
                          name="delivery"
                          id="deliveryYes"
                          onChange={this.onChange}
                          value="S"
                          checked={delivery === "S"}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="deliveryYes"
                        >
                          Sí
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="form-group col">
                    <label>
                      Registre los productos que más necesita (*uno por uno*)
                      (Si no han recibido donaciones, escribirlo)
                    </label>
                    <div className="form">
                      <div className="d-flex align-items-center w-100">
                        <input
                          ref={this.productInput}
                          onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          type="text"
                          className="form-control"
                          name="prodName"
                          id="prodName"
                          placeholder="Medicinas? Pañales? Etc..."
                          onChange={this.onChange}
                          value={prodName}
                        />
                        <button
                          type="button"
                          className="btn btn-primary ml-1"
                          onClick={(e) => this.addProduct(e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {products.length > 0 && (
                      <ProductTable
                        key={2}
                        products={products}
                        deleteProduct={this.deleteProduct}
                      />
                    )}
                  </div>
                  <div className="form-group col">
                    <label>Registre los números telefonicos disponibles:</label>
                    <div className="form">
                      <div className="d-flex align-items-center">
                        <input
                          ref={this.phoneNumberType}
                          onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          type="text"
                          className="form-control"
                          name="phoneNumber"
                          id="phoneNumber"
                          maxLength={department === "usa" ? 10 : 8}
                          onChange={this.onChange}
                          value={phoneNumber}
                        />
                        <button
                          type="button"
                          className="btn btn-primary ml-1"
                          onClick={(e) => this.addPhoneNumber(e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {phoneNumbers.length > 0 && (
                      <PhoneNumbersTable
                        phoneNumbers={phoneNumbers}
                        deletePhoneNumber={this.deletePhoneNumber}
                      />
                    )}
                  </div>
                  <div className="form-group col">
                    <label>Registre tipo de personas requeridas :</label>
                    <div className="form">
                      <div className="d-flex align-items-center">
                        <input
                          ref={this.personTypeInput}
                          onKeyPress={(e) => {
                            e.key === "Enter" && e.preventDefault();
                          }}
                          type="text"
                          className="form-control"
                          name="personType"
                          id="personType"
                          placeholder="doctores,
                      psicologos, etc:"
                          onChange={this.onChange}
                          value={personType}
                        />
                        <button
                          type="button"
                          className="btn btn-primary ml-1"
                          onClick={(e) => this.addPerson(e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    {people.length > 0 && (
                      <PeopleTable
                        people={people}
                        deletePerson={this.deletePerson}
                      />
                    )}
                  </div>
                  <div className="col mb-3">
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert()(ShelterForm);
