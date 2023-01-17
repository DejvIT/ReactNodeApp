import React, { ChangeEvent } from "react";
import ParametersTable from "../ParametersTable";
import PriceTable from "../PriceTable";
import ReservationButton from "../reservation/ReservationButton";
import styles from "../../styles/itemsDetail.module.scss";

// Types
import { Machine } from '../../types'

interface Props {
    item: Machine,
    editMode: boolean,
    onItemChange: () => void
}

const ItemDetail: React.FC<Props> = props => {

    const { item, editMode, onItemChange } = props

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        item.name = e.target.value;
        onItemChange();
    }

    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        item.description = e.target.value;
        onItemChange();
    }

    return (
    <div id={"detail-" + item.id} className="mb-8">
      <div
        className={
          styles.detailRow +
          " detailPriceRow d-flex flex-content-center w-100 mb-5"
        }
      >
        <div className={styles.detailImgWrapper}>
            {editMode ? (
                <div className="md-form">
                    <input
                        type="text"
                        id="form1"
                        name="name"
                        className="form-control"
                        value={item.name}
                        onChange={onChangeName}
                    />
                    <label htmlFor="form1">Název</label>
                </div>
            ) : (
                <h3 className="pb-2">{item.name}</h3>
            )}
          <img src={item.src} className={styles.detailImg} alt="bagr-detail" />
        </div>
        <div className={styles.detailTableWrapper + " ps-xs-0 ps-sm-4"}>
            <PriceTable item={ item } editMode={ editMode } onItemChange={ onItemChange } />
            <ReservationButton name={item.url}/>
        </div>
      </div>
      <div
        className={
          styles.detailRow +
          " detailParametersRow d-flex flex-content-center w-100 mb-5"
        }
      >
        <div className={styles.detailTableWrapper}>
          <ParametersTable parameters={item} editMode={editMode} onItemChange={onItemChange} />
        </div>
        <div className={styles.itemDescription + " ps-xs-0 ps-sm-4"}>
          <h3 className="pb-2">Popis</h3>
            {editMode ? (
                <div className="md-form">
                    <textarea
                        rows={10}
                        id="form2"
                        name="description"
                        className="form-control"
                        value={item.description}
                        onChange={onChangeDescription}
                    />
                </div>
            ) : (
                <p>{item.description}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail
