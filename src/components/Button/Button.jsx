import css from './button.module.scss';
import PropTypes from 'prop-types';

const Button = ({ onClick, text }) => <button className={css.button} onClick={onClick}>{text}</button>;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
};

export default Button;
