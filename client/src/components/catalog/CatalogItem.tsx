import { useState } from "react";
import styles from "../../styles/catalogitems.module.scss";
import AnchorLink from 'react-anchor-link-smooth-scroll'

// Types
import { Machine } from '../../types'

interface Props {
    item: Machine
}

const CatalogItem: React.FC<Props> = props => {
  const { item } = props
  const [loading, setLoading] = useState(true);
  const imageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className={styles.catalogItemWrapper}>
      <header className={styles.catalogItemHeader}>
        <span className={styles.catalogitemName}> {item.name}</span>
      </header>

      {loading && (
        <div
          className={
            styles.spinnerWrapper + " d-flex justify-content-center w-100"
          }
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div  className={styles.catalogitemImgWrapper}>
      <img
        className={styles.catalogitemImg}
        src={item.src}
        onLoad={imageLoaded}
        alt="bagr"
      />
      </div>

      <div className={styles.catalogItemFooter}>
        <span className={styles.catalogitemPriceTag}> od {item.price} KČ </span>
        <button className={styles.catalogItemBtn}>   <AnchorLink offset={"100"} href={"#detail-" + item.id}>Detail</AnchorLink> </button>
      </div>
      {item.mth && (
        <span className={styles.catalogItemMthTag}> {item.mth} </span>
      )}
    </div>
  );
};

export default CatalogItem;
