import './Preloader.scss';
import { ReactComponent as PreloaderSVG } from '../../Dist/Preloader/Preloader.svg'

const Preloader = ({ className }) => {
  return(
    <div className={className}>
      <PreloaderSVG/>
    </div>
  )
}

export default Preloader;
