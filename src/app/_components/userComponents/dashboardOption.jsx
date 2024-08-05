import styles from '../../styles/dashboardOptions.module.css'
import resources from '../../../../public/resources'
export default function dashboardOption(option) {
    let resource = new resources()
    return (
        <div className={`${styles.dashboardOptions__options}`}>
            <div className={`${styles.options__title} manrope ${option.active ? 'fontWeight700' : ''}`}>{option.title}</div>
            <img className={`${styles.options__arrow}`} src={resource.arrow.src}></img>
        </div>
    )
}