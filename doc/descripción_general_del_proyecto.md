# Descripción General Del Proyecto

> En el primer momento al leer la letra del proyecto, me encontré con varios espacios en blanco que tuve que completar respondiendo mis propias preguntas. Por ejemplo:

1. ¿Es solo necesario desarrollar un RAG con Langchain para utilizar el playground y sus features por defecto?

2. ¿Qué lenguaje de programación utilizo para desarrollar el paso previo?

3. ¿Hay que servirlo al público (internet)?

4. ¿Es necesario desarrollar una interfaz gráfica a medida para que un usuario pueda interactuar?

5. Al momento de desplegar el servicio, ¿alcanza con hacerlo en una instancia simple o es necesario pensar en otros factores como escalado automático, balanceadores de carga, contenedores elásticos, seguridad, etc?

6. En caso que el chat tenga GUI ¿debería ser un simple widget como un chat de soporte o similar para añadir a un sitio o es un chat como ChatGPT?

7. Que nivel de seguridad debería implementar en el proyecto?

> Al momento de responder mis preguntas y rellenar los blancos, decidí poner mi toque personal pensando en un servicio que utilice tecnologias modernas, una infraestructura escalable y robusta y tratar de atender cada detalle lo mejor posible, con metas realistas limitadas al tiempo disponible.

## Respuestas a las anteriores preguntas:

1. Deicidí expandir la idea y agregar un toque personalizado al proyecto no limitándome solo a los features por defecto de Langchain. Tome esta decisión pensando en desarrollar una interfaz de usuario personalizada, por lo que eliminé las "funciones extras" y me enfoque solamente en las imprescindibles. Al mismo tiempo, teniendo en cuenta que el servicio es visible desde internet, consideré mas seguro aplicar algunas restricciones de acceso para evitar abusos.

2. Utilicé Python no solo por que es uno de mis lenguajes favoritos, sino porque considero que es el mas versátil y es muy utilizado en el ámbito de la inteligencia artificial. Adicionalmente Langchain está desarrollado en su mayoría con Python y FastAPI. Considero que si la empresa se dedica a A.I es una ventaja comenzar a desarrollar los servicios en este lenguaje de programación.

3. Concluí que exponer el servicio a internet sería lo más adecuado. Tomando las precauciones necesarias, medidas de seguridad y utilizando los componentes necesarios a nivel de infraestructura para atender la demanda de usuarios pensando en un servicio escalable.

4. Por supuesto que decidí implementar una interfaz gráfica para usuarios lo más atractiva posible y sobre todo tener en cuenta aspectos relacionados con UX para hacer la experiencia más agradable.

5. A nivel de infraestructura concluí que lo ideal sería utilizar AWS. Tambien decidí llevar este paso un poco más lejos que solo crear una instancia con todos los servicios, sino que opté por lo siguiente: 
    - Instancia EC2 mínima para la puerta de entrada con Nginx.
    - ECR para registrar los diferentes servicios en contenedores Docker. 
    - ECS para implementar un cluster de servicios con sus correspondientes contenedores.

6. Para la GUI escogí la opción de fusionar un poco de ambas opciones. Desarrollar un estilo de chat similar a ChatGPT pero efímero, como un widget de chat de soporte o atencón al cliente. Las tecnologías utilizadas son React con NextJS (TypeScript) y MaterialUI. Existen 2 vistas en la app: Vista de sign-in para autenticar a los usuarios y la vista principal con el chat. El historial del chat se guarda en la memoria temporal sin utilizar ningun tipo de bases de datos.

7. Teniendo en cuenta que el servicio se encuentra disponible en internet y además se utilizan servicios como gpt-3.5 de OpenAI y la infraestructura es escalable, fue necesario tomar algunas medidas: 
    - He decidido restringir las rutas del server (Langchain-FastAPI) y limitarlo solo a exponer un path para autenticar usuarios y otro para intercambiar los prompts del chat. 
    - Se utilizó Nginx como proxy reverso y balanceador de carga de capa 7.
    - Se añadieron encabezados de seguridad como HTST, X-Frame-Options, X-Content-Type, Referrer-Policy y aunque menos efectivo que CSP se implementó X-XSS-Protection para evitar dolores de cabeza en las políticas de CSP teniendo en cuenta que es una APP con React y hasta el momento no tiene puntos débiles relacionados con ataques de XSS.
    - Se implementó autenticación de usuarios para restringir el uso del chat.
    - El servicio es servido por HTTPS con certificados TLS versiones 1.2 y superiores autorenovables con certbot. Evitando así protocolos y conjuntos de cifrados deprecados y siguiendo los estandares de la industria.
    - Como menos importante pero relacionado con aspectos de seguridad, se han tomado medidas para evitar el filtrado de información como versiones del software utilizado y de sistema operativo mediante encabezados HTTP como "Server", "X-Powered-By" y otros.

## Objetivos deseados:

> En esta sección me gustaría describir algunos puntos y mi idea de resultado ideal que me hubiera gustado alcanzar. A falta de tiempo no he podido concretar estos puntos y opté por ser práctico para entregar el proyecto en tiempo y forma.

- Teniendo en cuenta que no es un proyecto muy grande, considero que durante el desarrollo del código pude mantener (a mi parecer) un buen nivel en varios aspectos como: 
    - Utilizar TypeScript en lugar de JavaScript para lograr un código más prolijo/organizado, legible y escalable pero sacrificando flexibilidad y velocidad para desarrollar.
    - Añadir una cantidad aceptable de tipado en Python.
    - Un órden decente/bueno en cuanto a la estructura de directorios y segmentación de módulos. 
    - Un servicio estable.
   
    Por otro lado, me hubiera gustado tener aún más atención a detalles en el orden de los directorios y descontracturar algunos archivos para organizar el código en unidades lógicas más pequeñas y especificas.

- A nivel de seguridad, considero que las medidas tomadas previamente son aceptables para este proyecto, pero se podría mejorar el nivel en varios puntos:
    - Reforzar grupos de seguridad y segmentar mejor las redes en cloud.
    - Implementar medidas anti fuerza bruta y ataques automatizados en general, como captcha, restricciones por intentos fallidos de conexión y/o WAF.
    - Tokens y medidas anti Ataques de Cross-Site-Request-Forgery (CSRF).
    - Añadido de restricciones Cross Origin Resource Sharing (CORS).

- Como algo menos importante, me hubiera gustado añadir más detalles a la configuración de la puerta de entrada (Nginx) y quizás cambiar la infraestructura existente por EKS (Kubernetes).

# Conclusión

> A nivel personal e independientemente del resultado, fue un gusto realizar el proyecto ya que disfruté bastante el proceso creativo y la resolución de problemas. Adicional a lo anterior, si bien he utilizado transformers en varias ocasiones y he consumido una buena cantidad de literatura sobre A.I por pura curiosidad y fanatismo, nunca había utilizado Langchain ni esta modalidad RAG, pero me fue satisfactorio aprender sobre el tema y poner manos a la obra. Cabe aclarar que mi experiencia con AWS es poca ya que utilizo con más frecuencia GCP (Google Cloud) pero es muy similar en la mayoría de los aspectos, por lo que no fue difícil entenderlo ni utilizarlo. En cuanto al resto, considero tener experiencia suficiente en lo que refiere a: diseño de la arquitectura, los componentes de la infraestructura, los servicios desarrollados y los lenguajes de programación utilizados. Como tambien con todos los aspectos de seguridad y redes ya que acostumbro poner a prueba la seguridad de las empresas día a día, hacer análisis de código en diferentes lenguajes y revisar la arquitectura de los ambientes de nuestros clientes en mi trabajo. 

<strong>Un placer realizar el proyecto y gracias por la oportunidad.</strong>
