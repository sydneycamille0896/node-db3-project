const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  const schema = await db('schemes').where('scheme_id',scheme_id).first()
  if(schema){
    next()
  } else {
    next({status: 404, message: `scheme with scheme_id ${scheme_id} not found`})
  }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  //console.log(typeof scheme_name)
  // if(scheme_name.trim().length === 0 || typeof scheme_name !== String){
    if(typeof scheme_name !== 'string'){
    next({status: 400, message: `invalid scheme_name`})
  } else {
    next()
  }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions,step_number } = req.body;
  if(instructions === undefined || !instructions || instructions === null || instructions.trim().length === 0 || typeof instructions !== 'string' || parseInt(step_number) < 1 || isNaN(parseInt(step_number))){
    next({status: 400, message: `invalid step`})
      } else {
    next()
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
