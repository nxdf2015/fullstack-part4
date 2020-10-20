

const getToken  = string => {
  console.log('++++++++++++++++++++++++',string)
  return string === undefined ? '' :string.slice(7,string.length)}

module.exports = { getToken     }