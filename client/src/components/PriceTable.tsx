import React from "react";

// Types
import { Machine, MachinePrice } from '../types'

interface Props {
    item: Machine;
    editMode: boolean;
    onItemChange: () => void;
}

type inputChange = React.ChangeEvent<HTMLInputElement>

const PriceTable = ({ item, editMode, onItemChange }: Props) => {

    const onChangeKey = (e: inputChange, index: number) => {
        item.machine_prices[index].length = e.target.value;
        onItemChange();
    }

    const onChangeValue = (e: inputChange, index: number) => {
        item.machine_prices[index].price = parseInt(e.target.value);
        onItemChange();
    }

    const onChangeDeposit = (e: inputChange) => {
        item.deposit = parseInt(e.target.value);
        onItemChange();
    }

  return (
    <div className=" table-responsive ">
      <h3 className="pb-2">Cena</h3>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Doba půjčení</th>
            <th scope="col">Cena za den</th>
          </tr>
        </thead>
        <tbody>
        <>
            {item.machine_prices.map((value: MachinePrice, index: number) => (
              <tr key={index}>
              <td>
                  {editMode ? (
                      <input
                          type="text"
                          id={'form-key-' + index}
                          name={'price-key-' + index}
                          className="form-control"
                          value={value.length}
                          onChange={e => onChangeKey(e, index)}
                      />
                  ) : (
                      <>{value.length}</>
                  )}
              </td>
              <td>
                  {editMode ? (
                      <input
                          type="number"
                          id={'form-value-' + index}
                          name={'price-value-' + index}
                          className="form-control"
                          value={value.price}
                          onChange={e => onChangeValue(e, index)}
                      />
                  ) : (
                      <>{value.price + "Kč"}</>
                  )}
              </td>
             </tr>
            ))}
        </>
              <tr className="table-secondary" >
              <td>Záloha</td>
            <td>
                {editMode ? (
                    <input
                        type="number"
                        id={'form-deposit'}
                        name={'deposit'}
                        className="form-control"
                        value={item.deposit}
                        onChange={onChangeDeposit}
                    />
                ) : (
                    <>{item.deposit + "Kč"}</>
                )}
            </td>
             </tr>
        </tbody>
      </table>
      <span className="d-block mb-5 mb-sm-2 mb-xl-5">
        V ceně stroje není započítána cena příslušenství
      </span>

    </div>
  );
};

export default PriceTable;
