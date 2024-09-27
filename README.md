# Ticket System Api

El sistema de tickets es una plataforma integral diseñada para gestionar y facilitar la atención al cliente y la resolución de problemas de manera eficiente. Este sistema permite a los usuarios crear tickets que representan consultas, solicitudes o problemas que requieren atención por parte del equipo de soporte. A continuación se describen las características y beneficios clave del sistema:

    1. Creación de Tickets: Los usuarios pueden generar      tickets fácilmente a través de un formulario intuitivo, proporcionando detalles como el título, la descripción, y el estado del problema. Esta funcionalidad asegura que todas las solicitudes sean documentadas y asignadas adecuadamente.

    2. Filtrado y Búsqueda: Los usuarios pueden filtrar y buscar tickets por estado (abierto, en proceso, resuelto) y otros criterios, lo que facilita la gestión y revisión de sus solicitudes anteriores.

    2. Notificaciones en Tiempo Real: Utilizando WebSocket, el sistema envía notificaciones instantáneas a los usuarios cuando se realizan cambios en sus tickets. Esto incluye actualizaciones de estado, respuestas del equipo de soporte y cualquier otra comunicación relevante, mejorando la experiencia del usuario al mantenerlo informado sin necesidad de refrescar la página.

#### Main Entities
1. User
2. Ticket

* User -> Ticket System Api
  1. `User` can create `Standard` account in `Ticket System Api`


* User -> Ticket
  1. `Standard` can create own `Ticket`
  2. `Standard` can edit own `Ticket`
  3. `Standard` can get own `Ticket`
  4. `Standard` can get own `Ticket` list
  5. `Standard` can remove own `Ticket`

* User -> Ticket
  1. `Admin` can get all `Ticket` list
  2. `Admin` can answer `Ticket`
  3. `Admin` can change `Ticket` status


## Local Development
* **Docker**
   All necessary external services are described in the [./docker-compose.yml]
   * Run `docker-compose -f docker-compose.yaml up -d`
   * Stop `docker-compose -f docker-compose.yaml stop`

   Services:
   1. PostgreSQL - [Credentials](./env/local.pg.env).

* **Building**

    1. Install libraries - `yarn`
    2. Build application - `yarn build`
* **Configuring**
  
    Configuring is based on the environment variables. All environment variables must be exposed before starting the application.
    See [all environment variables](.env).

* **Running**

    * Start application - `yarn start`
    * Expose [.env](.env) and start application - `yarn start:prod`

      <details>
        <summary>
          API documentation will be available on the endpoint <i>GET <a href="http://localhost:3000/docs/" target="_blank" rel="noopener noreferrer">http://localhost:3005/docs/</a></i>
        </summary>
        <br>
      </details>

* **Running Dev**

    * Start application - `yarn start:dev`

* **Linting**

    * `yarn lint`
    