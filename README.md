# React con AWS Cognito para autenticación de usuario

React con AWS Cognito es una publicación para mostrar como hacer la autenticación de usuario con AWS Cognito y un frontend hecho con React JS usando directamente el API de Cognito para generar los tokens necesarios y validar el usuario. Se utilizara create-react-app para crear una pequeña aplicación SPA con React y diferentes componentes de React Hooks.

[AWS Cognito](https://aws.amazon.com/cognito/) es un servicio que te permite manejar la autenticación de usuario y tiene la especial característica poder hacerla con diferentes proveedores de identidad ([Identity providers](https://en.wikipedia.org/wiki/Identity_provider)) y diferentes protocolos como  Oauth 2.0, SAML 2.0 y OpenID Connect. También tiene diferentes SDK para ser multiplataforma, entre los más importantes se encuentra el SDK para iOS y Android. En web, tienen [Amplify](https://aws.amazon.com/amplify/), pero no me gusta esa solución, recarga mucho el frontend de librerías y se debería usar para una aplicación que utilice muchos servicios de AWS, no solo Cognito.

## Prerrequisitos y consideraciones

El sistema operativo donde se desarrolló la explicación es Ubuntu 18.04. Estaremos usando algunos comandos de terminal, todos se ejecutarán con usuario simple (o usuario sin privilegios). Fueron usadas las versiones de [node](https://nodejs.org/es/about/) 12.16 y [npm](https://docs.npmjs.com/about-npm/) 6.13, las cuales se da por supuesto que han sido instaladas previamente.

Recomiendo descargar e instalar nvm para [unix, macOS o Windows Subsystem for Linux](https://github.com/nvm-sh/nvm), permitirá tener varias versiones de node y cambiarte entre ellas muy rápido.

# Iniciando el User Pool en AWS Cognito

Vamos a AWS Console y buscamos Cognito


