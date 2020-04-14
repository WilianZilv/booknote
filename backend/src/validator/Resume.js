const yup = require('yup')

module.exports = yup.object().shape({
    content: yup.string().required().min(8),
    subject: yup.string().required().min(5)
});

