import React, { Component } from "react";
import CatalogItems from "../components/catalog/CatalogItems";
import MachineService from "../services/machine.service";
import ItemsDetail from "../components/catalog/ItemsDetail";
import {toast} from "react-toastify";
import styles from "../styles/itemsDetail.module.scss";

let processTimeout = null;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    /* this._isMounted = false; */
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onBackspaceFrom = this.onBackspaceFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onBackspaceTo = this.onBackspaceTo.bind(this);
    this.filter = this.filter.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.saveItemChange = this.saveItemChange.bind(this);

    this.state = {
      from: '',
      to: '',
      items: [],
      editMode: false,
      currentUser: props.currentUser,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAllMachines();
  }


  componentWillUnmount() {
    this._isMounted = false;
  }

  getAllMachines() {
    if (this._isMounted) {
      MachineService.getAllMachines().then(
        (response) => {
          console.log(response, 'RESPONSE TU');
          // Fix memory leak
          console.log(response.data)
          if (this._isMounted) {
            this.setState({
              items: response.data,
            });
          }


        },
        (error) => {
          this.setState({
            content:
                (error.response && error.response.data) ||
                error.message ||
                error.toString(),
          });
        }
    );
    }

  }

  onChangeFrom(e) {
    console.log(e);
    this.setState({
      from: e.target.value,
    });
    this.filter();
  }

  onBackspaceFrom(e) {
    console.log(e);
    if (e.keyCode === 8) {
      this.setState({
        from: '',
      });
    }
    this.filter();
  }

  onChangeTo(e) {
    console.log(e);
    this.setState({
      to: e.target.value,
    });
    this.filter();
  }

  onBackspaceTo(e) {
    console.log(e);
    if (e.keyCode === 8) {
      this.setState({
        to: '',
      });
    }
    this.filter();
  }

  filter() {
    if (this.state.from !== '' && this.state.to !== '') {
      const { dispatch } = this.props;
      const data = {
        from: this.state.from,
        to: this.state.to
      }
      MachineService.filter(data)
          .then((response) => {
            console.log('Filter response');
            console.log(response);
            this.setState({
              items: response.data,
            });
          })
          .catch(() => {
            toast.error(this.props.message);
          });
    } else {
      this.getAllMachines();
    }
  }

  onClickEdit() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  saveItemChange() {
    this.forceUpdate()
    clearTimeout(processTimeout);
    const self = this;
    processTimeout = setTimeout(() => {
      MachineService.updateMachines(self.state.items).then((response) => {
        console.log(response);
        toast.success("Dáta úspěšně aktualizované");
      }).catch(() => {
        toast.error('Error');
      })
    }, 3000);
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Zjistit dostupnost</h3>
          <form
              className="text-center"
          >
            <div className="row">
              <div className="col-6 pt-1">
                <div className="md-form">
                  <input
                      type="date"
                      id="form1"
                      name="from"
                      className="form-control"
                      value={this.state.from}
                      onChange={this.onChangeFrom}
                      onBlur={this.onChangeFrom}
                      onKeyDown={this.onBackspaceFrom}
                  />
                  <label htmlFor="form1" className={this.state.from ? 'active' : ''}>Dostupnost od</label>
                </div>
              </div>
              <div className="col-md-6 pt-1">
                <div className="md-form">
                  <input
                      type="date"
                      id="form2"
                      name="to"
                      className="form-control"
                      value={this.state.to}
                      onChange={this.onChangeTo}
                      onBlur={this.onChangeTo}
                      onKeyDown={this.onBackspaceTo}
                  />
                  <label htmlFor="form2">Dostupnost do</label>
                </div>
              </div>
            </div>
          </form>
        </header>
        <CatalogItems items={this.state.items}></CatalogItems>
        {this.state.currentUser && this.state.currentUser.roles.filter(role => role === 'ROLE_ADMIN').length > 0 ? (
            <div className="text-center">
              <button className={styles.editicon} onClick={this.onClickEdit}><i className={'fas fa-edit'}></i></button>
            </div>
        ) : (<></>)}
        <ItemsDetail items={this.state.items} editMode={this.state.editMode} saveItemChange={this.saveItemChange}></ItemsDetail>
      </div>
    );
  }
}
