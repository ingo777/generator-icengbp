describe '<%= camelModuleName %> section', ->
  beforeEach(module '<%= moduleName %>')

  it('should have a dummy test', inject ->
    expect(true).toBeTruthy()
  )
