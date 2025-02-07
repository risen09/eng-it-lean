# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.5.0](https://github.com/risen09/eng-it-lean/compare/v0.4.0...v0.5.0) (2025-02-05)

### ⚠ BREAKING CHANGES

- refactor stubs/api; change /dictionary endpoint api; add react-hook-form library; add modal component to append Words to Dictionary

### Features

- add /gigachat router middleware to check if server has access token; replace GigaChatProvider package with dist/index.js ([47bdddf](https://github.com/risen09/eng-it-lean/commit/47bdddf47b6a2b7afe745d9c1e6f1bfb381e8219))
- add author info in UnitPage ([983fe5a](https://github.com/risen09/eng-it-lean/commit/983fe5a88f776bcad26eff0ac5757a91fd23583e))
- add code block in MarkdownStyled ([7c8f3b8](https://github.com/risen09/eng-it-lean/commit/7c8f3b84e83a87216ca25f875947ca66b50df231))
- add create card component to add new word ([d9b1dd9](https://github.com/risen09/eng-it-lean/commit/d9b1dd9ef30a28bc9ee79a57b1a39e44aa896952))
- add DictionariesPage ([c77a9be](https://github.com/risen09/eng-it-lean/commit/c77a9be3e74e33a10ab80b818d944e2b6a63e415))
- add generate unit feature ([110370f](https://github.com/risen09/eng-it-lean/commit/110370f57365a23c6c8a9649c8250032e79d3fd9))
- add Login page ([bfdb872](https://github.com/risen09/eng-it-lean/commit/bfdb872f496f7ac393abd2a8107779db4c512c0d))
- add mdxeditor component to edit generated units using markdown ([4622aff](https://github.com/risen09/eng-it-lean/commit/4622aff298e3fecddfdbb660afcdf6a00c618ed7))
- add mdxeditor component to edit generated units using markdown ([a72912d](https://github.com/risen09/eng-it-lean/commit/a72912dde91410d04bcd4fb4af2e5638d9744f5c))
- add modal to add generated unit to the database; ([061ea09](https://github.com/risen09/eng-it-lean/commit/061ea09375888786e6a97bdd6678bd97d33af4c8))
- add PUT and DELETE requests to /dictionaries API endpoints ([7f8433e](https://github.com/risen09/eng-it-lean/commit/7f8433ebe219168f7b732f2480e49a4162db0840))
- add unit.edit feature value ([38ef864](https://github.com/risen09/eng-it-lean/commit/38ef864c30ff364b2f472842459abb36bd96ad7a))
- add unit.edit feature value ([1b5c9e0](https://github.com/risen09/eng-it-lean/commit/1b5c9e04c8c68b93fc2ee383960c4d08b172207a))
- add units page with the list of all units ([0172fb6](https://github.com/risen09/eng-it-lean/commit/0172fb69f17b3e6b5d929b7bfd89da006e2a6c1e))
- add user's units to AccountPage ([b0dc441](https://github.com/risen09/eng-it-lean/commit/b0dc441ced59f6ff5702ab747e3fcad37fe024b3))
- added Page with chat bot ([66bd4c3](https://github.com/risen09/eng-it-lean/commit/66bd4c314a1d9aa2d9c69fa28d573b7461f00244))
- check if unit's author is authorized user from cookies ([35070bf](https://github.com/risen09/eng-it-lean/commit/35070bf4572f8f62efff57ee1a0eccc7a7ff8cf9))
- generated unit now saves the id of the user who saved it ([5dbc2d7](https://github.com/risen09/eng-it-lean/commit/5dbc2d7336bf34fb2859584409e4d8b4ccb5cff5))
- gigachat unit creator page layout ([bc701be](https://github.com/risen09/eng-it-lean/commit/bc701be25125f84a566106aa5b59d36f26509ce5))
- refactor gigachat provider to use its API scheme, now in working state with useChat AI hook; ([89e40ae](https://github.com/risen09/eng-it-lean/commit/89e40ae6219c66ee19bc623f48d9d1233f4ecb3d))
- refactor stubs/api; change /dictionary endpoint api; add react-hook-form library; add modal component to append Words to Dictionary ([17e556e](https://github.com/risen09/eng-it-lean/commit/17e556e0b2c3d12ca53cdc8dd044288a11995420))

### Bug Fixes

- add account button to header when user is logged in ([d00831c](https://github.com/risen09/eng-it-lean/commit/d00831c65b03f4f386f489859acf6fb6be28c7a9))
- add field in account and layout ([7abc8a9](https://github.com/risen09/eng-it-lean/commit/7abc8a920706eda01b1cc314b749c458e61edcdb))
- add image kart ([c12137c](https://github.com/risen09/eng-it-lean/commit/c12137cd86f1e979935820a8e4d604cda144181a))
- add layout slider home ui bootsrap ([b957a68](https://github.com/risen09/eng-it-lean/commit/b957a689f9d0f67cf77a38963abad51d8dfbae8b))
- add layout ui bootsrap home v4 ([3a8448b](https://github.com/risen09/eng-it-lean/commit/3a8448bc714b38e9016a57ad38b8935a77726985))
- add layout ui bootsrap ui/ux ([4f15f87](https://github.com/risen09/eng-it-lean/commit/4f15f8716bc1f0ae4d90a5bd76f85d7e1dfcc748))
- add layout ui bootsrap ui/ux v1 ([4f3cfb0](https://github.com/risen09/eng-it-lean/commit/4f3cfb095ee781962331014919b51717ecd21a80))
- center markdown title; add EditUnitPage ([9c981e0](https://github.com/risen09/eng-it-lean/commit/9c981e074ec72bd0d5795c7f2d891711ef2cb7f2))
- center markdown title; add EditUnitPage ([994d307](https://github.com/risen09/eng-it-lean/commit/994d3071f88a930f31b569f07e35807ef18602be))
- change edit button to checkbox in GenerateUnitPage ([7a9b0df](https://github.com/risen09/eng-it-lean/commit/7a9b0dff7597909e3e6afd189189d06840716dd1))
- change edit button to checkbox in GenerateUnitPage ([9883206](https://github.com/risen09/eng-it-lean/commit/9883206580497eec3afcacfa3dcb6faeab1d8eb6))
- change links in headers ([d704159](https://github.com/risen09/eng-it-lean/commit/d704159449b9a483e8a0708f3c95341d9c8dd829))
- collision css styles ([d49c272](https://github.com/risen09/eng-it-lean/commit/d49c2722897251c87e5720d289f1e029a0eb4fa8))
- DictionaryPage dictionaries grid ([78093ee](https://github.com/risen09/eng-it-lean/commit/78093eec4cb8f7a91883a861fc30e38b3a1dc9e8))
- editing unit page is now fully functional; content is now saved in json file with all units ([d7c5570](https://github.com/risen09/eng-it-lean/commit/d7c55705c7e214e1391c7b52040282098ecb8e62))
- editing unit page is now fully functional; content is now saved in json file with all units ([66d4118](https://github.com/risen09/eng-it-lean/commit/66d41183eff402996ca6a9a1bbcc9419150c5b2e))
- header link to LoginPage ([ba3057c](https://github.com/risen09/eng-it-lean/commit/ba3057c374f554c6dadfb5554f04888adca8306f))
- save user's new data ([05d7d4d](https://github.com/risen09/eng-it-lean/commit/05d7d4ddf16208b36d0248c771769df76c510efe))
- typography style ([2bfee60](https://github.com/risen09/eng-it-lean/commit/2bfee60ec0447d502610ae22d757b10ffa8c0f09))
- typography style ([7d72dc5](https://github.com/risen09/eng-it-lean/commit/7d72dc542a1b5576ba42b85bf251e941d90dbd03))
- use axios fetching in gigachatProvider; rename Page to GenerateUnitPage ([de306bd](https://github.com/risen09/eng-it-lean/commit/de306bd038e1a77c3dd01acb6cd5a24dcd0e0a1e))

## [0.4.0](https://github.com/risen09/eng-it-lean/compare/v0.3.4...v0.4.0) (2025-01-29)

### Features

- add Modal to WordItem component with word's details; add user-event module for testing ([4658ce3](https://github.com/risen09/eng-it-lean/commit/4658ce3b87e5a49ddf763d41828e6b606bdcff0a))
- rewrite DictionaryPage with MDBootstrap components ([7cbe30e](https://github.com/risen09/eng-it-lean/commit/7cbe30eb81336346ec1d540c266c112e9e6884e1))

### Bug Fixes

- button style fix ([87ffe6a](https://github.com/risen09/eng-it-lean/commit/87ffe6a1fb7c6c36a1d24b714e06e1c9b12205d1))
- change markdown typography components using MDB ([365bf7e](https://github.com/risen09/eng-it-lean/commit/365bf7e1b877559322dadf165b3164e7ec0eba94))
- footer ui-kit v1 ([8528c9d](https://github.com/risen09/eng-it-lean/commit/8528c9deb30ae124f1c7ec56f5af9dd064219439))
- footer uikit v0 ([e236666](https://github.com/risen09/eng-it-lean/commit/e236666dd09544422c401b0a18f6e2952d7b30b7))
- header bootsrap ([06d4d9d](https://github.com/risen09/eng-it-lean/commit/06d4d9d0c61fcd1c96a1dad564ab4f8acfc767a8))
- layout slider ui bootsrap add in homepage ([9ac2a58](https://github.com/risen09/eng-it-lean/commit/9ac2a580c5cc38858ccc58914a419ac9d233160f))
- ui-kit v1 header ([dbbdbed](https://github.com/risen09/eng-it-lean/commit/dbbdbed8fd26ae71a2c07e4567a22f02cf242ca1))

## [0.2.0](https://github.com/risen09/eng-it-lean/compare/v0.1.3...v0.2.0) (2024-12-28)

### Features

- add 'put' and 'delete' http request to /units/ endpoint ([310ccb2](https://github.com/risen09/eng-it-lean/commit/310ccb20db6b13fff47a6b05e4a3c65bd4fb14cd))
- add /unit/:id route ([d822309](https://github.com/risen09/eng-it-lean/commit/d822309377e48437b1c2f9308583b3156fd8b240))
- add redux toolkit query for state management ([fcad54c](https://github.com/risen09/eng-it-lean/commit/fcad54cb6e88cb4658b5f84692826e034176350b))
- add Registration page ([fcab8d6](https://github.com/risen09/eng-it-lean/commit/fcab8d69657569af12b8305705e0223ec88b7e8b))

### Bug Fixes

- add link to /registrtion endpoint ([a1752a9](https://github.com/risen09/eng-it-lean/commit/a1752a912773143c7b49a0fb47aecac5b2af72ae))
- delete imports ([cf12b87](https://github.com/risen09/eng-it-lean/commit/cf12b87b66f8ef89fa6fd954b25a39fc8016a2a3))
- styles ([3805a50](https://github.com/risen09/eng-it-lean/commit/3805a50168fac1de6856d00feb3767c48d92d12f))

## [0.1.3](https://github.com/risen09/eng-it-lean/compare/v0.1.2...v0.1.3) (2024-12-20)

## [0.1.2](https://github.com/risen09/eng-it-lean/compare/v0.1.1...v0.1.2) (2024-12-18)

## [0.1.1](https://github.com/risen09/eng-it-lean/compare/v0.1.0...v0.1.1) (2024-12-18)

### Bug Fixes

- in HomePage render 'Loading...' in place of dictionaries, not in whole page ([7bc4787](https://github.com/risen09/eng-it-lean/commit/7bc4787a3e128584e8de5f56d9bf744355ed2a34))
- remove colors in header ([8e9ec7a](https://github.com/risen09/eng-it-lean/commit/8e9ec7a98daba5fc729ae48650bf0af2926e1785))

## 0.1.0 (2024-12-14)

### Features

- add interactivity to VocabularyPage by using useState hook to view details of the selected word ([f4b2ad7](https://github.com/risen09/eng-it-lean/commit/f4b2ad7396b1aa5af415dac24e5cecd73bc27e5d))
- add mock api dictionary endpoint to get specific dictionary data using ':id' parameter ([f0c877e](https://github.com/risen09/eng-it-lean/commit/f0c877ecba9e4d5b32d4236f5ce8314dd2e6be1f))
- added mock api 'dictionaries' endpoint ([ae9ee7f](https://github.com/risen09/eng-it-lean/commit/ae9ee7f605d30491accbbc2bdad3d7792c2a86f0))
- create WordDetails component to display full information about word ([9b42b4f](https://github.com/risen09/eng-it-lean/commit/9b42b4f36ec43ffb9ff5583d3855397fc6b90e63))
