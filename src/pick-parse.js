import _ from 'lodash'
import _parse from './parse'


/**
 * Picks and parses each picked value as defined by a config object, using _.parse().
 *
 * usage:
 * ```js
 * // express route, picking and parsing a post/patch request
 * let params = _.pickParse(req.body, {
 *   'id':              'integer',
 *   'user.name':       'string',
 *   'user.admin_flag': 'boolean'
 * })
 *````
 *
 * ```javascript
 * // browser, parsing url query string
 * let params = _.pickParse($route.query, {
 *     // filters
 *     address:   'string',
 *     available: 'boolean',
 *     code:      'integer',
 *     phone:     'string',
 *     since:     'string',
 *     max:       'float',
 *     min:       'float',
 *
 *     // text search
 *     q: 'string',
 *
 *     // paging and sorting
 *     page:  'integer',
 *     sort:  'string',
 *     order: 'string'
 *   })
 * )
 * ````
 *
 * @param  {Object} object  source object
 * @param  {Object} config  config object, mapping attributes to be picked to their parsing type
 * @param  {Object} options not used
 * @return {Object}         Objeto resultado da interpretação definida
 */
function pickParse(object, config = {}, options = {}) {
  let keys = _.keys(config)
  let picked = _.pick(object, keys)

  return _.reduce(keys, (pickedAndParsed, key) => {
    let type = _.get(config, key)
    let value = _.get(picked, key)

    let parsed = _parse(value, type, options)
    _.set(pickedAndParsed, key, parsed)

    return pickedAndParsed
  }, {})
}


export default pickParse
