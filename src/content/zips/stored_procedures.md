---
title: Stored Procedures
creation_date: "Publicado: 01/02/2025"
description: No escribas la misma query SQL una y otra vez
---

# Intro
Si te encontrás escribiendo la misma query SQL una y otra vez, quizás quieras considerar usar un **Stored Procedure**.

Un **Stored Procedure** o **Procedimiento Almacenado** es una serie de instrucciones SQL (procedimiento) que se pueden guardar en la base de datos (almacenado) para ser reutilizado tantas veces como sea necesario.

Así que si tenés una query que escribis muchas veces, guardala como un **SP** y luego llamala para ejecutarla. Vamos con un ejemplo muy sencillo.

Te la pasas escribiendo esto:
```sql
SELECT *
FROM Customers;
```

Guardala como **SP**:
```sql
CREATE PROCEDURE SelectAllCustomers
AS
SELECT * FROM Customers
GO;
```

Luego simplemente tenés que llamar al **SP**:
```sql
EXEC SelectAllCustomers;
```

Los **SP** también pueden recibir parámetros o inputs (entradas) que permitan modificar ligeramente su comportamiento. Imaginate que querés traerte a todos los clientes pero solo los de Londres.

```sql
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City
GO;
```

Ahora mandale mecha:
```sql
EXEC SelectAllCustomers @City = 'London';
```

Obvio el ejemplo acá propuesto es muy simple y es usado solo a fines ilustrativos. Imaginate lo que podrías lograr con una query pesada. No solo te ahorrarías escribirla repetidas veces, si le agregas parámetros podrías volverla más dinámica y la misma query podría adaptarse a diferentes escenarios.

*Nota: los ejemplos están escritos en SQL Server. Cada motor o engine tiene su propio "sabor" de SQL. La idea es aprender el concepto de SP más que la sintaxis en sí.*


