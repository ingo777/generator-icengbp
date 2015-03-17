describe '<%= camelModuleName %> section', ->
  beforeEach(module '<%= fullModuleName %>')

  it('should have a dummy test', inject ->
    expect(true).toBeTruthy()
  )
