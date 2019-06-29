const target = require('.')

test('should svg an image', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc)
  expect(result).toMatchSnapshot()
})
