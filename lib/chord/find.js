'use strict'

var pitchSet = require('../collection/pitchSet')
var rotate = require('../collection/rotate')
var binarySet = require('../binarySet/binarySet')
var dictionary = require('./data/dictionary')

/**
 * Get the chord name(s) of a given pitches
 *
 * @param {String|Array<String>} pitches - the pitch collection
 * @return {Array<String>} an array of the chord names that has that pitches
 *
 * @example
 * find('G2 E3 C4') // => ['CM/G', 'Em#5/G']
 */
function find (pitches) {
  var set = pitchSet(pitches)
  var inversions = {}
  set.forEach(function (tonic, index) {
    inversions[tonic] = binarySet(rotate(index, set))
  })
  var results = []
  set.forEach(function (tonic) {
    results = results.concat(dictionary(function (intervals) {
      return binarySet(intervals) === inversions[tonic]
    }).map(function (name) {
      return tonic + name
    }))
  })
  return results
}

module.exports = find