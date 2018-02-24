function findAll(opt, cb) {
  let pageIndex = parseInt(opt.pageIndex, 10) || 0
  let pageSize = parseInt(opt.pageSize, 10) ? parseInt(opt.pageSize, 10) : (parseInt(opt.pageSize, 10) === 0 ? 0 : 10)
  let collection = opt.col || ''

  if (!collection) {
    return Promise.reject(new Error('No Collection Specified'))
  }

  if (pageSize) {
    return new Promise(function (resolve) {
      Subs(collection).find({}).skip((pageIndex - 1) * pageSize).limit(pageSize).exec(function (err, result) {
        if (Array.isArray(result)) {
          return resolve(result)
        }
        return resolve([])
      })
    })
  }
  return new Promise(function (resolve) {
    Subs(collection).find({}).exec(function (err, result) {
      if (Array.isArray(result)) {
        return resolve(result)
      }
      return resolve([])
    })
  })
}

module.exports = {
  findAll
}