'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' : 'data-bs-target="#xs-controllers-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' :
                                            'id="xs-controllers-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' : 'data-bs-target="#xs-injectables-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' :
                                        'id="xs-injectables-links-module-AppModule-1419dd95d9a888e3053fabd4c0b55525efba5a6af6c87cfb0485d8268a2aea21d2d37f523ad71b82d53404a2a6236041fbf10d1d4a6bedd48d432edff1d88ebc"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                            'id="xs-controllers-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' :
                                        'id="xs-injectables-links-module-AuthModule-5d1fd19e40ddb68d08edfb1e27df1088ed68f709d6121bfdd490cd8687116e4495fb2f168fc8cbe52089aefe4f70373c213020402032ab132ca8051d80c46d0e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-22ab62dd3e89aae5870177c4505f6cffad412d3fcf6b3059e704ce8fb1f47fe10666091b1a135f54a7430c75a614ba535dd4adb374a09d2483fbd3fa735e73d1"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' :
                                            'id="xs-controllers-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' :
                                        'id="xs-injectables-links-module-PostsModule-627407a00e29e41d14f15f9f12b3ad8b0db3981c8263b3449d3df7cb7fdd1b666efd956a92ce756dd8356ca88178a4cbe2ad25213f52e78bce55b0153f6ca708"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' :
                                            'id="xs-controllers-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' :
                                        'id="xs-injectables-links-module-TagsModule-5b3522d51c13620d69f18393a715feb55e25308171718f774cf773479309c90edd02fe16d599a5d77b75aaaad4e4c441361a5aefd81e3e2523419f44ca2368de"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' :
                                            'id="xs-controllers-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' :
                                        'id="xs-injectables-links-module-UsersModule-0d4b9a30f37b267bf47c2e7ae540088744ac50c4a1c13228eec421b87c4ec8eefd8bb7dedc3a341ce4a152b8d5aa0daa935c5cc37f2eb9ac491ce200563959d5"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionDto.html" data-type="entity-link" >CreatePostMetaOptionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/createTagDto.html" data-type="entity-link" >createTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/getPostsDto.html" data-type="entity-link" >getPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamsDto.html" data-type="entity-link" >GetUserParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});