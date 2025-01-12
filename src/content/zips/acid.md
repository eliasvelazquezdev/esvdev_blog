---
title: Principios ACID
creation_date: "Publicado: 12/01/2025"
description: ACID es un conjunto de principios para las transacciones en una base de datos
---

# Intro
No importa el rol que tengas en IT, es importante saber sobre bases de datos. Generalmente, toda base de datos busca respetar el principio ACID. 

¿Qué significa? Te lo cuento en 2 minutos.

## El concepto de transacción
Una transacción en bases de datos es un conjunto de operaciones que se ejecutan como una unidad indivisible para llevar a cabo una tarea específica, como insertar, actualizar o eliminar datos.

Por ejemplo, si estás transfiriendo dinero entre cuentas bancarias, una transacción incluiría:
- Restar el dinero de la cuenta de origen.
- Sumarlo a la cuenta de destino.

## El concepto de ACID
**ACID (siglas para Atomicity, Consistency, Isolation, Durability)** es un conjunto de principios fundamentales que aseguran la confiabilidad y consistencia de las transacciones en una base de datos.

Veamos cada parte por separado.

- **Atomicidad**: Garantiza que todas las operaciones de una transacción se completen; si alguna parte falla, toda la transacción falla y el estado de la base de datos permanece sin cambios.
- **Consistencia**: Asegura que una transacción lleve a la base de datos de un estado válido a otro, manteniendo todas las reglas predefinidas, incluidas las restricciones y cascadas.
- **Aislamiento**: Garantiza que las transacciones se ejecuten de manera independiente entre sí. El estado intermedio de una transacción es invisible para otras transacciones.
- **Durabilidad**: Asegura que, una vez que una transacción ha sido confirmada (commit), permanezca así, incluso en caso de una falla del sistema.


## Resumiendo
1. ACID es un conjunto de principios para las transacciones en una db.
2. Atomicidad: Una transacción es "todo o nada".
3. Consistencia: Las transacciones siempre dejan la base de datos en un estado válido.
4. Aislamiento: Las transacciones no afectan ni son afectadas por otras en ejecución al mismo tiempo.
5. Durabilidad: Los cambios realizados por una transacción confirmada son permanentes, incluso ante fallos del sistema.