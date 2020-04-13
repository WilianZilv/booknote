const yup = require('yup')

module.exports = yup.object().shape({
    username: yup.string().required().min(8),
    password: yup.string().required().min(5)
});

