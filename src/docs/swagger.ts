const specs = {
  swagger: '2.0',
  info: {
    title: 'API de Integrac',
    description: '',
    version: '1.0'
  },
  produces: ['application/json'],
  paths: {
    '/api/example': {
      post: {
        'x-swagger-router-controller': 'home',
        operationId: 'create-envelope',
        tags: ['Envelope'],
        description: 'Create envelope and generate access link',
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Object example',
            required: true,
            schema: {
              $ref: '#/definitions/Example'
            }
          },
          {
            in: 'header',
            name: 'Secret-Key',
            schema: {
              type: 'string'
            },
            required: true
          }
        ],
        responses: {
          200: {
            description: 'Successful operation',
            schema: {
              $ref: '#/definitions/ResponseExample'
            }
          }
        }
      }
    }
  },
  definitions: {
    Example: {
      type: 'object',
      properties: {
        templateId: { type: 'string', example: 'af4d76e1-b2c0-4707-9023-12880e64b31f' }
      }
    },
    ResponseExample: {
      type: 'object',
      properties: {
        envelopeId: { type: 'string', example: '2568c00e-638a-4d8f-93ee-08da4d856b9b' },
        url: { type: 'string', example: 'https://example.com.br' }
      }
    }
  }
}

export default specs
