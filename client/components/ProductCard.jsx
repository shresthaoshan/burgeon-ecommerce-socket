import styles from '../styles/productCard.module.css'

import Truncate from 'react-truncate'

export default function ProductCard(props) {
    const { details } = props
    return (
        <div>
            <div className={styles.productCard}>
                <h3 title={details.name} >
                    <Truncate lines={1}>
                        {details.name}
                    </Truncate>
                </h3>
                <p className={styles.brand}>
                    <span>{details.brand}</span>
                </p>
                <p className={styles.description} title={details.description}>
                    <Truncate lines={3} ellipsis="...">
                        {details.description}
                    </Truncate>
                </p>
                <p className={styles.price}>Rs.{details.price}/-</p>
                <div className={styles.controls}>
                    <button>
                        <i className="fa fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}