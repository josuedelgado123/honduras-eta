const Footer = () => {
  return (
    <div className="box mt-2 pt-5 pb-5">
      <div className="container">
        <div className="col-sm-12">
          <strong>Disclaimer</strong>:
          <span className="line-through">
            Los datos han sido recopilados de redes sociales, en los cuales la
            data ha estado como pública, o por visitantes del website que han
            querido compartir la información. 
          </span>
          {" "} Los datos que se están mostrando ahora son datos ficticios que se han
          puesto para demostrar el funcionamiento que tuvo la página. Los datos
          originales han sido removidos.
        </div>
        <div className="col-sm-12">
          Otros websites con información:
          <br />
          <a
            href="https://hondurastebusca.com/"
            target="_blank"
            className="links"
          >
            hondurastebusca.com
          </a>
          <br />
          <a
            href="https://app.hondurastebusca.com/full"
            target="_blank"
            className="links"
          >
            app.hondurastebusca.com
          </a>
          <br />
          <a
            href="https://linktr.ee/rescateHN"
            target="_blank"
            className="links"
          >
            app.hondurastebusca.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
