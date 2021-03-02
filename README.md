## Getting Started

Seguindo as instruções a seguir você terá uma cópia desse módulo sendo executada em sua máquina local.

## Tools

As seguintes ferramentas devem estar instaladas em seu sistema:

- [NodeJs/NPM](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
- [YARN](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

Para evitar conflitos, favor usar as seguites versões do node e yarn:

- **Node**: 12.13.1
- **Yarn**: 1.22.5

Caso a versão instalada no node seja diferente da versão recomendada basta seguir os seguintes passos:

- _sudo yarn global add n_
- _sudo n 12.13.1_

## Bulding

- _yarn install_
- _yarn dev_

Note que o comando yarn _dev_ irá subir um docker-compose que contém uma imagem do postgres e do pg-admin. Dessa forma você não precisa se preocupar em instalar o postgres em sua máquina.

## Tests

Para executar os testes, basta usar algum dos seguintes comandos:

- _yarn test_ (para executar todos os testes unitários, funcionais, de integração e de aceitação)
- _yarn unit-test_ (para executar todos os testes unitários)
- _yarn one-unit-test <path>_ (para executar o teste unitário de um apenas um arquivo ou diretório)
- _yarn integration-test_ (para executar todos os testes de integração)
- _yarn one-integration-test <path>_ (para executar apenas um teste de integração)
