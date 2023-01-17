import React, { Component } from "react";
import {connect} from "react-redux";
import styles from "../../styles/footer.module.scss"
import {Link} from "react-router-dom";

class Footer extends Component {
/*   constructor(props) {
    super(props);

    this.state = {};
  } */

  render() {
    return (
      <footer className={styles.pageFooter + ' font-small bg-light pt-4'}>
        <div className="container text-center text-md-left">
          <div className="row text-center text-md-left mt-3 pb-3">

            <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mt-3">
              <ul className="list-unstyled">
                <li>
                  <Link to={"/terms"} className="btn-floating mx-1">Obchodní podmínky</Link>
                </li>
                <li>
                  <Link to={"/gdpr"} className="btn-floating mx-1">GDPR</Link>
                </li>
                <li>
                  <Link to={"/contact_us"} className="btn-floating mx-1">Kontakt</Link>
                </li>
                <li>
                  <Link to={"/about_us"} className="btn-floating mx-1">O nás</Link>
                </li>
                <li>
                  <Link to={"/career"} className="btn-floating mx-1">Kariéra</Link>
                </li>
              </ul>
            </div>

            <div className="col-5 mx-auto mt-3 d-none d-lg-block">
              <div className="d-flex flex-column" style={{ height: 70 + '%' }}>
                <div className="p-2 mt-auto mb-auto">
                  © 2021 microbagr.tech -  Všechna práva vyhrazena
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-2 col-xl-2 mx-auto mt-3">
              <p>Sledujte nás na sociálních sítích
                Získávejte informace o nových strojích, slevách a akcích z naší půjčovny.
              </p>
              <div className="text-center text-md-right">
                <ul className="list-unstyled list-inline">
                  <li className="list-inline-item">
                    <a className={styles.icon + ' btn-floating mx-1'} href="#">
                      <i className="fab fa-facebook-f"/>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className={styles.icon + ' btn-floating mx-1'} href="#">
                      <i className="fab fa-instagram"/>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-8 mx-auto mt-3 d-block d-lg-none">
              © 2021 microbagr.tech -  Všechna práva vyhrazena
            </div>

          </div>
        </div>
      </footer>
    )
  }
}

function mapStateToProps(state: any) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Footer);