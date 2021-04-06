import Navbar from "./components/Navbar/Navbar";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer/Footer";
import { Route, Switch } from "react-router";
import ShelterContainer from "./pages/ShelterAdmin/ShelterContainer";
import ShelterForm from "./pages/ShelterAdmin/ShelterForm";
import { Fragment } from "react";

const App = () => {
  return (
    <div className="app-wrapper">
      <Navbar />
      <div className="flex-grow-1">
        <Switch>
          <Route exact path="/" component={MainContainer} />
          <Route exact path="/admin/albergue/" component={ShelterContainer} />
          <Route exact path="/admin/albergue/nuevo" component={ShelterForm} />
          <Route
            exact
            path="/admin/albergue/editar/:id"
            component={ShelterForm}
          />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
