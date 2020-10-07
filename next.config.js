module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET
  },
  async redirects() {
    return [
      {
        source: '/postagens',
        destination: '/postagens/1',
        permanent: true
      }
    ]
  }
}
