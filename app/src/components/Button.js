import PropTypes from "prop-types"
import { Link } from 'react-router-dom'

const Button = ({ addClass, color, bgColor, btnName, onClick, link}) => {
    // const onClick = (e) => {
    //     console.log('button clicked');
    //     // console.log(e);
    // }
  return (
    <Link to={link}><button onClick={onClick} style={{color: color, backgroundColor : bgColor}} className={`btn ${addClass}`}>{btnName}</button></Link>
  )
}

Button.defaultProps = {
    btnName : 'Button',
    color : "orange",
}
Button.propTypes = {
    btnName : PropTypes.string,
    color : PropTypes.string.isRequired,
    onClick : PropTypes.func,
}
export default Button