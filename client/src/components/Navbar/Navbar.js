import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import bandera from "../../resources/bandera.png";

const Example = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar
        color="light"
        light
        expand="md"
        className="justify-content-between"
      >
        <Container>
          <NavbarBrand
            tag={RRNavLink}
            to="/"
            className="d-flex align-items-center no-deco-link"
          >
            <img
              style={{ width: 20, height: 20 }}
              className="mr-1"
              alt="logo"
              src={bandera}
            ></img>
            HONDURAS ETA
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="justify-content-end" isOpen={!collapsed} navbar>
            <Nav fill navbar>
              <NavItem>
                <RRNavLink to="/admin/albergue" className="no-deco-link">
                  <Button className="bg-primary rounded text-white no-deco-link w-100">
                    Agregar o modificar datos
                  </Button>
                </RRNavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className="no-deco-link text-dark"
                  href="https://app.hondurastebusca.com/full"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lista de rescatados
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="no-deco-link text-dark"
                  href="https://es.gofundme.com/mvc.php?route=homepage_norma/search&term=eta%20honduras"
                  target="_blank"
                  rel="noreferrer"
                >
                  Go Fund Me Disponibles
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Example;
