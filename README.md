📕 **Título: CineCampus**

------

**Tiempo de ejecución**: 4 Dias

**Nivel de dificultad:** ★★★★☆

### **Problematica**

CineCampus es una empresa de entretenimiento que se especializa en ofrecer una experiencia de cine completa y personalizada. La empresa desea desarrollar una aplicación web que permita a los usuarios seleccionar películas, comprar boletos y asignar asientos de manera eficiente y cómoda. La aplicación también ofrecerá opciones de descuento para usuarios con tarjeta VIP y permitirá realizar compras en línea.

### **Objetivo**

Desarrollar una serie de APIs para la aplicación web de CineCampus utilizando MongoDB como base de datos. Las APIs deberán gestionar la selección de películas, la compra de boletos, la asignación de asientos, y la implementación de descuentos para tarjetas VIP, con soporte para diferentes roles de usuario.

### **Requisitos Funcionales**

1. Selección de Películas:
   - **API para Listar Películas:** Permitir la consulta de todas las películas disponibles en el catálogo, con detalles como título, género, duración y horarios de proyección.

/*
*/

   - **API para Obtener Detalles de Película:** Permitir la consulta de información detallada sobre una película específica, incluyendo sinopsis.
2. Compra de Boletos:
   - **API para Comprar Boletos:** Permitir la compra de boletos para una película específica, incluyendo la selección de la fecha y la hora de la proyección.
   - **API para Verificar Disponibilidad de Asientos:** Permitir la consulta de la disponibilidad de asientos en una sala para una proyección específica.
3. Asignación de Asientos:
   - **API para Reservar Asientos:** Permitir la selección y reserva de asientos para una proyección específica.
   - **API para Cancelar Reserva de Asientos:** Permitir la cancelación de una reserva de asiento ya realizada.
4. Descuentos y Tarjetas VIP:
   - **API para Aplicar Descuentos:** Permitir la aplicación de descuentos en la compra de boletos para usuarios con tarjeta VIP.
   - **API para Verificar Tarjeta VIP:** Permitir la verificación de la validez de una tarjeta VIP durante el proceso de compra.
5. Roles Definidos:**Administrador:** Tiene permisos completos para gestionar el sistema, incluyendo la venta de boletos en el lugar físico. Los administradores no están involucrados en las compras en línea realizadas por los usuarios.**Usuario Estándar:** Puede comprar boletos en línea sin la intervención del administrador.**Usuario VIP:** Puede comprar boletos en línea con descuentos aplicables para titulares de tarjetas VIP.**API para Crear Usuario:** Permitir la creación de nuevos usuarios en el sistema, asignando roles y privilegios específicos (usuario estándar, usuario VIP o administrador).**API para Obtener Detalles de Usuario:** Permitir la consulta de información detallada sobre un usuario, incluyendo su rol y estado de tarjeta VIP.**API para Actualizar Rol de Usuario:** Permitir la actualización del rol de un usuario (por ejemplo, cambiar de usuario estándar a VIP, o viceversa).**API para Listar Usuarios:** Permitir la consulta de todos los usuarios del sistema, con la posibilidad de filtrar por rol (VIP, estándar o administrador).
6. Compras en Línea:
   - **API para Procesar Pagos:** Permitir el procesamiento de pagos en línea para la compra de boletos.
   - **API para Confirmación de Compra:** Enviar confirmación de la compra y los detalles del boleto al usuario.

### **Requisitos Técnicos**

- **Base de Datos:** Utilizar MongoDB para el almacenamiento de datos relacionados con películas, boletos, asientos, usuarios y roles.
- **Autenticación:** Implementar autenticación segura para el acceso a las APIs, utilizando roles de usuario para determinar los permisos y accesos (por ejemplo, usuarios VIP y usuarios estándar).
- **Autorización de Roles:** Asegurar que las APIs y las operaciones disponibles estén adecuadamente restringidas según el rol del usuario (por ejemplo, aplicar descuentos solo a usuarios VIP).
- **Documentación:** Proveer una documentación clara y completa para cada API, describiendo los endpoints, parámetros, y respuestas esperadas.
- **Recursos**
  - ![](https://i.ibb.co/SRdNPRr/draw-SQL-image-export-2024-07-25.png)

### **Rúbrica Evaluativa**

Los puntos a evaluar serán los siguientes:

### 1. Selección de Películas (20%)

- **0 puntos:** No se implementa la funcionalidad para listar películas ni obtener detalles de una película.
- **25 puntos:** La funcionalidad para listar películas o obtener detalles de una película está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para listar películas y obtener detalles de una película está implementada pero presenta errores menores o no proporciona todos los datos requeridos.
- **75 puntos:** La funcionalidad para listar películas y obtener detalles de una película está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para listar películas y obtener detalles de una película está completamente implementada, es eficiente, y proporciona toda la información requerida de manera clara.

### 2. Compra de Boletos (20%)

- **0 puntos:** No se implementa la funcionalidad para comprar boletos ni verificar la disponibilidad de asientos.
- **25 puntos:** La funcionalidad para comprar boletos o verificar la disponibilidad de asientos está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para comprar boletos y verificar la disponibilidad de asientos está implementada pero presenta errores menores o no maneja todos los casos posibles.
- **75 puntos:** La funcionalidad para comprar boletos y verificar la disponibilidad de asientos está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para comprar boletos y verificar la disponibilidad de asientos está completamente implementada, es eficiente, y maneja todos los casos posibles de manera clara.

### 3. Asignación de Asientos (20%)

- **0 puntos:** No se implementa la funcionalidad para reservar ni cancelar reservas de asientos.
- **25 puntos:** La funcionalidad para reservar o cancelar reservas de asientos está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para reservar y cancelar reservas de asientos está implementada pero presenta errores menores o no maneja todos los casos posibles.
- **75 puntos:** La funcionalidad para reservar y cancelar reservas de asientos está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para reservar y cancelar reservas de asientos está completamente implementada, es eficiente, y maneja todos los casos posibles de manera clara.

### 4. Descuentos y Tarjetas VIP (10%)

- **0 puntos:** No se implementa la funcionalidad para aplicar descuentos ni verificar la validez de tarjetas VIP.
- **25 puntos:** La funcionalidad para aplicar descuentos o verificar la validez de tarjetas VIP está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para aplicar descuentos y verificar la validez de tarjetas VIP está implementada pero presenta errores menores o no maneja todos los casos posibles.
- **75 puntos:** La funcionalidad para aplicar descuentos y verificar la validez de tarjetas VIP está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para aplicar descuentos y verificar la validez de tarjetas VIP está completamente implementada, es eficiente, y maneja todos los casos posibles de manera clara.

### 5. Gestión de Usuarios y Roles (10%)

- **0 puntos:** No se implementa la funcionalidad para gestionar usuarios ni roles.
- **25 puntos:** La funcionalidad para gestionar usuarios o roles está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para gestionar usuarios y roles está implementada pero presenta errores menores o no maneja todos los casos posibles.
- **75 puntos:** La funcionalidad para gestionar usuarios y roles está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para gestionar usuarios y roles está completamente implementada, es eficiente, y maneja todos los casos posibles de manera clara.

### 6. Compras en Línea (10%)

- **0 puntos:** No se implementa la funcionalidad para procesar pagos ni enviar confirmaciones de compra.
- **25 puntos:** La funcionalidad para procesar pagos o enviar confirmaciones de compra está parcialmente implementada, con errores significativos o faltante de características importantes.
- **50 puntos:** La funcionalidad para procesar pagos y enviar confirmaciones de compra está implementada pero presenta errores menores o no maneja todos los casos posibles.
- **75 puntos:** La funcionalidad para procesar pagos y enviar confirmaciones de compra está mayormente correcta, pero con pequeños problemas de usabilidad o eficiencia.
- **100 puntos:** La funcionalidad para procesar pagos y enviar confirmaciones de compra está completamente implementada, es eficiente, y maneja todos los casos posibles de manera clara.

### 7. Documentación y Entregables (10%)

- **0 puntos:** No se entrega la documentación requerida ni el código fuente en el repositorio de GitHub.
- **25 puntos:** La documentación o el código fuente están incompletos o presentan errores significativos.
- **50 puntos:** La documentación y el código fuente están mayormente completos, pero con algunos errores menores o faltantes.
- **75 puntos:** La documentación y el código fuente están correctos, con pequeños problemas de claridad o detalles menores faltantes.
- **100 puntos:** La documentación y el código fuente están completos, claros y bien organizados, proporcionando toda la información necesaria de manera eficiente.

### GitHub y Entrega de Proyecto

- 🚨 **Cancelación o Anulación del Proyecto** : No se entregó ningún repositorio, su visualización está oculta (o no compartida con el Trainer) o hubo adulteración después de la fecha y hora establecida para su entrega, ***Evidencia de clonación o conocido como `fork` de algún repositorio, distribución y/o copia de dicho trabajo por cualquier medio de comunicación (verbal, digital, entre otras), se asumirá como cancelación del proyecto de manera definitiva.*** 🚨
- **25 puntos**: Se creó el repositorio, pero en su rama principal no se encuentra el proyecto general ,al igual que algún archivo en relación al proyecto.
- **100 puntos**: Se creó exitosamente el repositorio, donde en su rama principal se encuentra el proyecto general y sus archivos en relación a ello, con evidencia de la participación del equipo completo de manera periódica.

