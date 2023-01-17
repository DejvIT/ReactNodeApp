import React from "react";

// Types
import { Machine } from '../types'

interface Props {
  parameters: Machine,
  editMode: boolean;
  onItemChange: () => void;
}
type inputChange = React.ChangeEvent<HTMLInputElement>
const ParametersTable = ({ parameters, editMode, onItemChange }: Props) => {

  const onChangeManufacturer = (e:inputChange) => {
    parameters.manufacturer = e.target.value;
    onItemChange();
  }

  const onChangeType = (e:inputChange) => {
    parameters.type = e.target.value;
    onItemChange();
  }

  const onChangeWeight = (e:inputChange) => {
    parameters.weight = e.target.value;
    onItemChange();
  }

  const onChangeSizes = (e:inputChange) => {
    parameters.sizes = e.target.value;
    onItemChange();
  }

  const onChangeFuel = (e:inputChange) => {
    parameters.fuel = e.target.value;
    onItemChange();
  }

  const onChangeEngine = (e:inputChange) => {
    parameters.engine = e.target.value;
    onItemChange();
  }

  const onChangeBrakes = (e:inputChange) => {
    parameters.brakes = e.target.value;
    onItemChange();
  }

  return (
    <div className=" table-responsive">
      <h3 className="pb-2">Parametry</h3>
      <table className="table table-bordered table-hover table-striped">
        <tbody>
          <tr>
            <th scope="row">Výrobce</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form1"
                    name="manufacturer"
                    className="form-control"
                    value={parameters.manufacturer}
                    onChange={onChangeManufacturer}
                />
              ) : (
                <>{parameters.manufacturer}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Typ</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form2"
                    name="type"
                    className="form-control"
                    value={parameters.type}
                    onChange={onChangeType}
                />
              ) : (
                <>{parameters.type}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Hmotnost</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form3"
                    name="weight"
                    className="form-control"
                    value={parameters.weight}
                    onChange={onChangeWeight}
                />
              ) : (
                <>{parameters.weight}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Rozměry</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form4"
                    name="sizes"
                    className="form-control"
                    value={parameters.sizes}
                    onChange={onChangeSizes}
                />
              ) : (
                <>{parameters.sizes}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Palivo</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form5"
                    name="fuel"
                    className="form-control"
                    value={parameters.fuel}
                    onChange={onChangeFuel}
                />
              ) : (
                <>{parameters.fuel}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Motor</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form6"
                    name="engine"
                    className="form-control"
                    value={parameters.engine}
                    onChange={onChangeEngine}
                />
              ) : (
                <>{parameters.engine}</>
              )}
            </td>
          </tr>
          <tr>
            <th scope="row">Brzda</th>
            <td>
              {editMode ? (
                <input
                    type="text"
                    id="form7"
                    name="brakes"
                    className="form-control"
                    value={parameters.brakes}
                    onChange={onChangeBrakes}
                />
              ) : (
                <>{parameters.brakes}</>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ParametersTable;
