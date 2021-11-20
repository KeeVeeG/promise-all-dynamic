import PromiseAllDynamic from './lib/index.js'
import assert from 'assert'

describe('Main tests', () => {
  it('Count of results', async () => {
    const promises = []
    promises.push(
      new Promise(resolve => {
        setTimeout(() => resolve(), 100);
      }).then(() => {
        promises.push(
          new Promise(resolve => {
            setTimeout(() => resolve(), 150);
          })
        );
      }))
    promises.push(
      new Promise(resolve => {
        setTimeout(() => resolve(), 300);
      })
    );
    const result = await PromiseAllDynamic(promises)
    assert.strictEqual(3, result.length)
  })

  it('Accuracy of results', async () => {
    const promises = []
    promises.push(
      new Promise(resolve => {
        setTimeout(() => resolve(1), 100);
      }))
    promises[0].then(() => {
      promises.push(
        new Promise(resolve => {
          setTimeout(() => resolve(2), 150);
        })
      );
    })
    promises.push(
      new Promise(resolve => {
        setTimeout(() => resolve(3), 300);
      })
    );
    const result = await PromiseAllDynamic(promises)
    assert.deepStrictEqual([1, 2, 3], result.sort())
  })
})