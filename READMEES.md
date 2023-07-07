Este es un proyecto [Next.js](https://nextjs.org/) arrancado con [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Empezando

## El reto

Tu reto es construir esta aplicación de reloj y conseguir que se parezca lo más posible al diseño. Utilizarás las siguientes APIs para recuperar los datos necesarios:

- [World Time API](http://worldtimeapi.org/) para establecer la hora basada en la dirección IP del visitante. Esta API también se utilizará para obtener datos adicionales, como el día del año mostrado en el estado expandido.
- IP Geolocation API](https://freegeoip.app/) para establecer la ciudad y el país debajo de la hora.
- API de citas de programación](https://programming-quotes-api.herokuapp.com/) para generar citas de programación aleatorias.
    - Si la API de citas de programación no funciona, [aquí tienes una buena API de citas alternativa](https://github.com/lukePeavey/quotable) que puedes utilizar en su lugar. No es específica de programación, pero funcionará.

Puedes utilizar las herramientas que quieras para completar el reto. Así que si tienes algo que te gustaría practicar, no dudes en intentarlo.

Tus usuarios deberían ser capaces de:

- Ver el diseño óptimo del sitio en función del tamaño de la pantalla de su dispositivo.
- Ver los estados hover de todos los elementos interactivos de la página.
- Ver la hora actual y la información sobre su ubicación en función de su dirección IP.
- Ver información adicional sobre la fecha y la hora en el estado ampliado.
- Ver el saludo y la imagen de fondo correctos en función de la hora del día en que se visita el sitio.
- Generar citas de programación aleatorias haciendo clic en el icono de actualización situado junto a la cita.

¿Quieres que te ayudemos con el reto? [Únete a nuestra comunidad de Slack](https://www.frontendmentor.io/slack) y haz preguntas en el canal **#help**.

### Comportamiento esperado

- Cambia el saludo dependiendo de la hora del día. Debería decir:
  - "Buenos días" entre las 5am y las 12pm
  - Buenas tardes" entre las 12h y las 18h
  - Buenas noches" entre las 18:00 y las 05:00.
- Cambia el icono de saludo y la imagen de fondo en función de la hora del día. Deben aparecer:
  - El icono del sol y la imagen de fondo diurna entre las 5h y las 18h.
  - El icono de la luna y la imagen de fondo nocturna entre las 18h y las 5h.
- Generar una nueva cita de programación aleatoria cada vez que se pulse el icono de actualización.