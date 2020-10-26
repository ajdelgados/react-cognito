# React con AWS Cognito para autenticación de usuario

React con AWS Cognito es una publicación para mostrar como hacer la autenticación de usuario con AWS Cognito y un frontend hecho con React JS usando directamente el API de Cognito para generar los tokens necesarios y validar el usuario. Se utilizara create-react-app para crear una pequeña aplicación SPA con React y diferentes componentes de React Hooks.

[AWS Cognito](https://aws.amazon.com/cognito/) es un servicio que te permite manejar la autenticación de usuario y tiene la especial característica poder hacerla con diferentes proveedores de identidad ([Identity providers](https://en.wikipedia.org/wiki/Identity_provider)) y diferentes protocolos como  Oauth 2.0, SAML 2.0 y OpenID Connect. También tiene diferentes SDK para ser multiplataforma, entre los más importantes se encuentra el SDK para iOS y Android. En web, tienen [Amplify](https://aws.amazon.com/amplify/), pero no me gusta esa solución, recarga mucho el frontend de librerías y se debería usar para una aplicación que utilice muchos servicios de AWS, no solo Cognito.

## Prerrequisitos y consideraciones

El sistema operativo donde se desarrolló la explicación es Ubuntu 18.04. Estaremos usando algunos comandos de terminal, todos se ejecutarán con usuario simple (o usuario sin privilegios). Fueron usadas las versiones de [node](https://nodejs.org/es/about/) 12.16 y [npm](https://docs.npmjs.com/about-npm/) 6.13, las cuales se da por supuesto que han sido instaladas previamente.

Recomiendo descargar e instalar nvm para [unix, macOS o Windows Subsystem for Linux](https://github.com/nvm-sh/nvm), permitirá tener varias versiones de node y cambiarte entre ellas muy rápido.

# Iniciando el User Pool en AWS Cognito

Vamos a AWS Console y buscamos Cognito

![Búsqueda de Cognito en la consola de AWS](https://github.com/ajdelgados/react-cognito/blob/main/public/images/1-aws-search-cognito.png?raw=true)

Mostrará la pantalla de bienvenida del servicio, para esta publicación en necesario seleccionar User Pools

![Bienvenida en AWS Cognito](https://github.com/ajdelgados/react-cognito/blob/main/public/images/2-cognito-main-screen.png?raw=true)

En la pantalla Users Pools, seleccionamos Create a user pool

![Crear un User Pool](https://github.com/ajdelgados/react-cognito/blob/main/public/images/3-create-user-pool.png?raw=true)

Las siguientes pantallas serán para configurar el User Pool, para desarrollar este artículo, vamos a usar la mayoría de la opciones por defecto y solo cambiaremos las siguientes, nombrar el Pool "ajdelgados-example", seleccionar "Email address or phone number" para la pregunta cómo quieres que los usuarios inicien sesión, seleccionar "None – users will have to contact an administrator to reset their passwords" para indicar cómo el usuario podrá recuperar su cuenta y seleccionar "No verification" para indicar que atributo se debe verificar. La mayoría de los cambios en la configuración por defecto es para no configurar SNS o SES.

Lo siguiente es crear una "App clients" llamada react-spa con todas las opciones por defecto

![Crear una App Client](https://github.com/ajdelgados/react-cognito/blob/main/public/images/4-app-client.png?raw=true)

Se debe crear el dominio para el user pool, puedes usar un domino asociado a la cuenta de AWS que tenga un certificado asociado en ACM ([AWS Certificate Manager](https://aws.amazon.com/certificate-manager/)) o reservar un dominio de prefijo en AWS Cognito, para efectos de la publicación se usará un dominio de prefijo llamado "ajdelgados-example" (primero se debe verificar si está disponible y luego guardar)

![Seleccionar el dominio para el User Pool](https://github.com/ajdelgados/react-cognito/blob/main/public/images/5-user-pool-domain.png?raw=true)

Asociaremos el App client con el User Pool en App client settings y se debe seleccionar Cognito User Pool (en este apartado debería aparecer otros identity providers si se tiene otros configurados), colocar http://localhost:3000/ en Callback URL(s), http://localhost:3000/signout en Sign out URL(s), selecciona Authorization code grant, email, openid y profile

![Configuramos el App Client](https://github.com/ajdelgados/react-cognito/blob/main/public/images/6-app-client-settings.png?raw=true)

Los pasos anteriores funcionan para tener el User Pool configurado para ser llamado desde React, solo queda crear un usuario en el user Pool para hacer las pruebas.
