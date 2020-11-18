const yup = require('yup');

const getRacketModelValidSchema = yup.object().shape({
  racketCompanyId: yup.number().required().label('E3511'),
});
const insertRacketModelValidSchema = yup.object().shape({
  racket_id: yup.string().required().label('E3512'),
  id: yup.number().required().label('E3513'),
  racket_nickname: yup.string().trim().required().label('E3514'),
});

module.exports = {
  getRacketModelValidSchema,
  insertRacketModelValidSchema,
};