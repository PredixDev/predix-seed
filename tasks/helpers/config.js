module.exports = {
  uaa: {
    clientId: 'predix-seed',
    serverUrl: 'https://etc.predix-uaa-staging.grc-apps.svc.ice.ge.com',
    defaultClientRoute: '/about',
    base64ClientCredential: 'cHJlZGl4LXNlZWQ6TTBhVzdrTmZRRndyTTZ3ZHJpV2h3bVc2ck1HQ045Q0x1cnI5VnI3elc0cz0='
  },
  proxy: {
    '/api/asset(.*)': {
      url: 'https://predix-asset-ga.grc-apps.svc.ice.ge.com/asset$1',
      instanceId: 'c8918695-f515-41e2-ba86-cdea84848cc5'
    },
    '/api/views(.*)': {
      url: 'http://px-view-service-exp.grc-apps.svc.ice.ge.com/api$1',
      instanceId: 'c8918695-f515-41e2-ba86-cdea84848cc5'
    }
  }
}