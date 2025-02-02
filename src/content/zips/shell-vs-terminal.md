---
title: "Shell vs Terminal"
creation_date: "Publicado: 02/02/2025"
description: "¿Qué es lo que diferencia a una shell y una terminal?"
---
# Intro
Se suelen usar los términos **terminal** y **shell** de manera intercambiable. Pero es importante saber la diferencia.

Antes la expresión "terminal" se utilizaba para referirse a un dispositivo físico que permitía escribir comandos a través de un teclado y ver los resultados en pantalla. Algo así como esto:

![Terminal](https://pbs.twimg.com/media/GcHZW2UWUAA6mFk?format=jpg&name=4096x4096)

Hoy por hoy la expresión "terminal" se refiere en realidad a un **emulador de terminal**, es decir, una emulación en software de aquellos dispositivos de antaño.

Emuladores de terminal hay muchos, pero lo que determina cuáles comandos son válidos y cuáles no es lo que se conoce como **shell**.

La **terminal** o **emulador de terminal** permite recibir comandos e imprimir los resultados de dichos comandos en la pantalla de tu PC, pero la **shell** es quien *se encarga de ejecutarlos*.

En resumidas cuentas, la **shell** se encarga de:
1. Leer los comandos que ingresas via teclado
2. Evaluar (ejecutar) dichos comandos
3. Imprimir los resultados de esos comandos
4. Permitirte ingresar otro comando a continuación para repetir el proceso

De hecho estos 4 pasos son lo que componen algo llamado ****REPL (Read, Evaluate, Print, Loop)****. Pero eso es cuento para otro día 😉



