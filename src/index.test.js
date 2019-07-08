const target = require('.')

test('should svg an image', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc)
  expect(result).toMatchSnapshot()
})

test('should svg an image; color=2', async () => {
  const opts = {color: 2}
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, opts)
  expect(result).toMatchSnapshot()
})

test('should svg an image; scale=1', async () => {
  const opts = {scale: 1}
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, opts)
  expect(result).toMatchSnapshot()
})

test('should svg an image; tolerance=1', async () => {
  const opts = {tolerance: 1}
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, opts)
  expect(result).toMatchSnapshot()
})

test('should svg an image; smooth=0.1', async () => {
  const opts = {smooth: 0.1}
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, opts)
  expect(result).toMatchSnapshot()
})
