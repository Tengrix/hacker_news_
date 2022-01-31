import loading from '../assets/loading-gif-icon-9.jpg'
import s from '../../src/utils/loading.module.css'
export default function Loading(){

    return(
        <div>
            <img className={s.isLoading}  src={loading} alt=""/>
        </div>
    )
}