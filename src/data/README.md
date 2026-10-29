# Textos editables del sitio

Todo el texto fijo del sitio (lo que **no** viene de Sanity) vive en esta carpeta.
Para cambiar un texto, editá el JSON correspondiente y guardá: no hace falta tocar componentes.

| Archivo | Qué contiene |
| --- | --- |
| `site.json` | Datos globales: marca, logo, SEO, autor, menú, redes sociales, bloque de suscripción y footer. Aparece en **todas** las páginas. |
| `home.json` | Portada (`/`), sección por sección y en el mismo orden en que se ven. |
| `blog.json` | Páginas del blog: listado, paginación, Zips, Tags, artículos (tarjeta de autor, índice, compartir), páginas 404 y etiquetas chicas de la interfaz (`ui`). |
| `about.json` | Página About (`/about/`), incluida la grilla de experiencia. |

> Los posts, zips y tags siguen editándose en **Sanity**, como siempre. Estos archivos son solo para el texto fijo que rodea ese contenido.

## Marcas de formato

Los textos aceptan algunas marcas simples para darles el estilo del sitio:

| Escribís | Se ve como |
| --- | --- |
| `**texto**` | **negrita** |
| `^^texto^^` | texto en naranja de la marca |
| `__texto__` | palabra clave con subrayado naranja |
| `==texto==` | resaltado tipo marcador |
| `~~texto~~` | texto atenuado (gris) |
| `~texto~` | peso normal: se usa en los títulos para la parte "liviana" (ej. `"¿Para quién ~es?~"`) |
| `[texto](https://...)` | link (los externos abren en otra pestaña) |

Se pueden combinar: `**^^+250 lectores^^**` → negrita y naranja.
Si necesitás escribir uno de esos símbolos tal cual, anteponé una barra invertida: `\~`, `\*`, `\^`, `\_`, `\=`.

No hace falta (ni se puede) escribir HTML: cualquier etiqueta como `<b>` o `<script>` se muestra como texto plano. Así, un error de tipeo nunca puede romper la página.

## Variables

Algunos textos tienen huecos entre llaves que el sitio completa solo. Mantenelos tal cual:

- `{page}`, `{total}` → número de página y total de páginas
- `{tag}` → nombre del tag
- `{count}` → cantidad de tags
- `{min}` → minutos de lectura
- `{section}` → "Blog" o "Zips"

Ejemplo: `"readingTime": "{min} min de lectura"` → "4 min de lectura".

## Listas

Muchas secciones son listas (`items`, `paragraphs`, `blocks`, `pillars`, `social`...).
Podés agregar, quitar o reordenar elementos y el diseño se adapta solo (la numeración 01, 02... se calcula sola).

- **Íconos de Font Awesome** (`"icon": "fa-solid fa-globe"`): buscá el nombre en https://fontawesome.com/v6/search (versión gratuita).
- **Íconos de los pilares y extras de la portada** (`"icon": "wrench"`): `brain`, `cloud`, `wrench`, `briefcase`, `tags`, `lightning`, `notebook`, `fire`, `sprout`.
- **Manifiesto de la portada** (`manifesto.blocks`): cada bloque tiene `type`: `"text"` (párrafo normal), `"quote"` (frase naranja con barra lateral) o `"statement"` (frase grande).

## Notas

- Las claves que empiezan con `$` (`$descripcion`, `$ayuda_...`) son solo comentarios: el sitio las ignora.
- JSON es estricto: las comillas dobles dentro de un texto van escapadas (`\"`), y no puede haber una coma después del último elemento de una lista. Si algo de eso falla, el sitio no compila y el error de Astro indica el archivo y la línea.
- Las imágenes locales van en `public/` y se referencian desde la raíz, ej. `"/images/profile_pics/foto.jpg"`.

## Lo que no está en estos archivos (a propósito)

- **Rutas internas y lógica de navegación**: por ejemplo, qué link del menú se marca como activo según la URL (`src/components/NavigationLayout.astro`). Cambiarlas desde un JSON podría romper la navegación.
- **Cuatro etiquetas solo para lectores de pantalla** (no se ven en pantalla): "Publicado", "Tiempo de lectura" y "Actualizado" en `src/components/AuthorLayout.astro`, y "Abrir menú" en `src/components/NavigationLayout.astro`.

## Cambios respecto de la versión anterior

Al centralizar los textos, todo lo visible quedó idéntico. Solo cambiaron dos etiquetas de accesibilidad (no visibles): el logo ahora se anuncia como "El Ingeniero Consciente" en vez de "Inicio", y el botón de los bloques de código como "Copiar" en vez de "Copiar código".
