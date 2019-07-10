const target = require('./paper-path')

describe.skip('paper-path.js', () => {
  let d

  it('should convert line #1', () => {
    d = 'd="M-6 5l3 4l5 6v5h-6l-7-8-6 5zm10-14l5 5 3 4z"'
    const result = target(d, {simplifyLines: true, reduceLines: true})
    expect(result).toMatchSnapshot()
  })

  it('should convert line #2', () => {
    d = 'd="M-6 5l3 4l5 6v5h-6q-7-8-6 5zm10-14l5 5 3 4z"'
    const result = target(d, {simplifyLines: true, reduceLines: true})
    expect(result).toMatchSnapshot()
  })
})
