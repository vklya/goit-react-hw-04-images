import css from './message.module.scss';
import PropTypes from 'prop-types';

const Message = ({text, smile}) => (
    <p className={css.text}>
        {text} <span>{smile}</span>
    </p>
);

Message.propTypes = {
    text: PropTypes.string,
    smile: PropTypes.string,
}

export default Message;