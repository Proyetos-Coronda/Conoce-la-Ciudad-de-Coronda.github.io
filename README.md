# 🍓 Coronda · Capital Nacional de la Frutilla

Sitio web estático, profesional y responsive sobre la ciudad de **Coronda** (departamento
San Jerónimo, provincia de Santa Fe, Argentina). Incluye historia, la Fiesta Nacional de la
Frutilla y otros eventos, turismo, galería de imágenes, bandera y escudo oficiales, animaciones
prolijas y SEO preparado para **Google Search Console**, **Google AdSense** y **Cafecito**.

---

## 📁 Estructura

```
coronda/
├── index.html            ← todo el contenido (secciones)
├── css/styles.css        ← diseño y animaciones
├── js/main.js            ← interacciones (menú, scroll, galería)
├── assets/img/           ← bandera y favicon (locales)
├── robots.txt            ← para buscadores
├── sitemap.xml           ← mapa del sitio para Search Console
├── manifest.webmanifest  ← para instalación/móvil
├── .nojekyll             ← para que GitHub Pages sirva todo tal cual
└── README.md
```

---

## 🚀 1) Publicar en GitHub Pages

1. Creá un repositorio nuevo en GitHub (por ejemplo: `coronda`).
2. Subí **todo el contenido de esta carpeta** a la raíz del repositorio
   (podés arrastrar los archivos a la web de GitHub o usar `git`).
3. Andá a **Settings → Pages** y en *Source* elegí la rama `main` y la carpeta `/ (root)`.
4. Guardá. En unos minutos tu sitio estará en:
   `https://TU-USUARIO.github.io/coronda/`

> 💡 Si querés un dominio propio (ej. `coronda.com.ar`), compralo, conectalo desde
> **Settings → Pages → Custom domain** y actualizá las URLs que figuran más abajo.

### ⚠️ Reemplazar los marcadores

Buscá y reemplazá **`TU-USUARIO`** en estos archivos con tu usuario de GitHub (o tu dominio final):

- `index.html` → `link rel="canonical"`, `og:url` y los 4 bloques `JSON-LD` (`url`)
- `robots.txt` → línea del `Sitemap`
- `sitemap.xml` → `<loc>`

> ✅ El botón de Cafecito ya está configurado con tu cuenta (ver punto 4).

---

## 🔍 2) Google Search Console

1. Entrá a https://search.google.com/search-console y agregá tu propiedad con la opción
   **"Prefijo de URL"**, escribiendo tu URL completa (ej. `https://TU-USUARIO.github.io/coronda/`).
2. Elegí el método de verificación **"Etiqueta HTML"**. Te va a dar un código como
   `<meta name="google-site-verification" content="ABCDEF..." />`.
3. Pegalo en `index.html`, dentro del `<head>`, donde está el comentario
   `<!-- <meta name="google-site-verification" ... -->` (descomentá esa línea y poné tu código).
4. Una vez verificado, andá a **Sitemaps** y enviá:
   `https://TU-USUARIO.github.io/coronda/sitemap.xml`
5. Podés usar la herramienta **"Inspeccionar URL"** para pedir la indexación de tu página.

---

## 💰 3) Google AdSense (anuncios)

1. Creá tu cuenta en https://adsense.google.com y agregá tu sitio.
2. Cuando te aprueben, te van a dar un código de publicador del tipo `ca-pub-XXXXXXXXXXXXXXXX`.
3. En `index.html`, en el `<head>`, descomentá la línea de AdSense y poné tu ID:

   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU_ID_PUBLICADOR" crossorigin="anonymous"></script>
   ```

4. Para colocar un anuncio dentro del contenido, agregá un bloque como este donde quieras
   (por ejemplo, entre secciones):

   ```html
   <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-TU_ID_PUBLICADOR"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
   ```

> 💡 Consejo: AdSense requiere contenido original y suficiente. Este sitio ya está pensado
> para eso. Empezá con 1 o 2 anuncios y no saturen la página.

---

## ☕ 4) Cafecito (apoyo)

✅ Ya está configurado con tu cuenta: **https://cafecito.app/mateouuuzbz**

Si algún día querés cambiarlo, en `index.html` buscá el botón `Invitame un cafecito` y editá el enlace:

   ```html
   <a class="btn btn-cafecito" href="https://cafecito.app/mateouuuzbz" ...>
   ```

---

## 📅 5) Actualizar fechas de los eventos (importante cada año)

La **Fiesta Nacional de la Frutilla** se hace el **primer fin de semana de noviembre** y la
**Maratón Santa Fe–Coronda** en **febrero**. Cada año conviene actualizar:

1. En `index.html`, los bloques `JSON-LD` con `"@type": "Event"` (campos `startDate` / `endDate`).
2. Los textos visibles en la sección **Eventos** con las fechas concretas confirmadas.

---

## 🖼️ 6) Nota sobre las imágenes

- La **bandera** y el **favicon** están guardados localmente en `assets/img/`.
- Las **fotografías** se cargan desde **Wikimedia Commons** (licencias libres) y están
  atribuidas en el pie de página. Podés reemplazarlas por fotos propias: descargá la imagen a
  `assets/img/` y cambiá el `src` correspondiente en `index.html`.

---

## ✨ Personalización rápida

- **Colores**: están definidos al inicio de `css/styles.css` en las variables `:root`
  (`--red`, `--green`, `--blue`, etc.), inspirados en la bandera de Coronda.
- **Textos**: todo el contenido está en `index.html`, organizado por secciones con
  `id="..."` (historia, frutilla, eventos, turismo, galería…).
- **Animaciones**: se activan al hacer scroll (clase `.reveal`). Respetan la preferencia
  de "reducir movimiento" del usuario.

---

Hecho con ❤ y frutillas 🍓
