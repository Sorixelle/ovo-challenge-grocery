module.exports = api => {
  const isTest = api.env('test')

  const envTargets = isTest
    ? {
      node: 'current'
    } : {}

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: envTargets
        }
      ],
      '@babel/preset-react'
    ]
  }
}
