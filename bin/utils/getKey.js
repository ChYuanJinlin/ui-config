
const getKey = (res, obj) => {
  //    console.log(res,obj);
  for (const key in obj) {
    if (key == res) {
      // console.log('obj[key]--',obj[key]);

      return obj[key]
    }
  }

}

module.exports = getKey