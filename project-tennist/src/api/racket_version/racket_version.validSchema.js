const yup = require('yup');

const getRacketVersionValidSchema = yup.object().shape({
  racketCompanyId: yup.number().required().label('E3410'),
});

module.exports = {
  getRacketVersionValidSchema,
};
