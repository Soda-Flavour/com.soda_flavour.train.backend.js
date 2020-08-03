const yup = require('yup');
const updateBasicInfoschema = yup.object().shape({
  nick: yup
    .string()
    .trim()
    .min(2)
    .matches(/[A-Za-z0-9가-힣]/)
    .label('E3010'),
  age: yup.number().max(70).required().label('E3011'),
  sex: yup
    .string()
    .trim()
    .required()
    .matches(/(male|female)/, { excludeEmptyString: false })
    .label('E3011'),
});

module.exports = {
  updateBasicInfoschema,
};
