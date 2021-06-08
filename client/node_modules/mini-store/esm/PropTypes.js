import PropTypes from 'prop-types';
export var storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
});
