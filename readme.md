# TUS RECETAS  
**Trabajo Práctico Obligatorio**  
Aplicaciones Interactivas - 1º Cuatrimestre  2022

---

## Índice
- [Introducción](#introducción)
- [Requisitos](#requisitos)
- [Requerimientos](#requerimientos)
---

## Introducción

El trabajo práctico en cuestión consiste en el desarrollo de una aplicación web responsiva que permita gestionar recetas.  
La misma se realizó utilizando los siguientes lenguajes y librerías:
- **HTML/CSS**
- **React**
- **JavaScript**
- **NodeJS**
- **Material-UI**
- **MongoDB (NoSQL)**

Antes de comenzar con el desarrollo, se realizó un **mockup** de la página web, que se adjunta en un PDF llamado `Mockup-TusRecetas.pdf`. En él se plasmó el primer diseño pensado para el sitio y sirvió como base para iniciar el desarrollo del front-end.  
Además, se creó el siguiente logo:

---

## Requisitos

Para iniciar el proyecto, se deben cumplir los siguientes pasos:

1. **Instalar Visual Studio Code (VSC).**

2. **Configurar el back-end:**
   - Clonar el repositorio: [Tus-Recetas-Backend](https://github.com/bringol/Tus-Recetas-Backend).
   - En una nueva terminal, ejecutar:
     ```bash
     npm install
     npm run server
     ```

3. **Configurar el front-end:**
   - Clonar el repositorio: [Tus-Recetas-Frontend](https://github.com/bringol/Tus-Recetas-Frontend).
   - En una nueva terminal, ejecutar:
     ```bash
     npm install
     npm start
     ```

---

## Requerimientos

- El sistema debe permitir **buscar recetas**.
- El sistema debe permitir **filtrar recetas** por nombre, ingredientes, categoría y dificultad.
- El sistema debe permitir **consultar recetas**.
- El sistema debe permitir **registrar nuevos usuarios**.
- Los usuarios registrados pueden:
  - **Publicar nuevas recetas.**
  - **Modificar sus recetas publicadas.**
  - **Eliminar sus recetas publicadas.**
  - **Calificar recetas.**

---
# Primeros Pasos Git
** **Para tener descargar (solo se hacer una vez)** **

`git clone https://github.com/bringol/Tus-Recetas-Backend`


**Para ver cambios**

`git status`


**Para tener la versión más reciente del proyecto**

`git pull -u origin main`

**Para subir al repo [. agrega TODOS los archivos)**

1°
`git add .` 

2°
`git commit -m “[Mensaje Descriptivo]”`

3°
`git push -u origin main`



# Comandos Git

## git pull 

Cada vez que alguien envía sus cambios al repositorio remoto compartido, su repositorio local
queda desactualizado. Para volver a sincronizar su repositorio local con el repositorio remoto
recién actualizado, simplemente ejecute la operación git pull (descargo los archivos de git)


## git push  [alias] [branch]

Para comenzar a compartir los cambios con otros, debe enviarlos a un repositorio remoto con el
comando "push". Esto hará que el repositorio remoto se actualice y se sincronice con su
repositorio local (subo los archivos a git)

## git status 
 me brinda información sobre mi estado en comparación entre el local y git.

## git commit -m "info de los cambios"
 preparo los archivos que he modificado para poder subirlos al git


## git add [file]
 agrega los archivos al trackeo de git
 
 
## git reset HEAD -- src/*
 cancela los todos commits acolados sobre la carpeta src

test
 
