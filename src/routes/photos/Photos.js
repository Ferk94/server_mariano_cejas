const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require('axios');
const formData = require('form-data');
const imgbbUploader = require('imgbb-uploader');
const { Photo } = require("../../db");
const router = express.Router();

// const formData = require('')

const diskStorage = multer.diskStorage({
  destination: path.join(__dirname, "./images"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-monkey" + file.originalname);
  },
});

const filesUpload = multer({
  storage: diskStorage,
}).array("images");


router.get("/", (req, res, next) => {
  Photo.findAll()
    .then((photosWithStamps) => {
      var photos = photosWithStamps.map((e) => {
        return {
          id: e.id,
          name: e.name,
          ExcursionId: e.ExcursionId,
        };
      });
      res.json(photos);
    })
    .catch((err) => next(err));
});



router.get("/zip/:excursionId", async (req, res, next) => {
  try {
    const { excursionId } = req.params;

    const responsePhotos = await Photo.findAll({
      where: {
        ExcursionId: excursionId,
      },
    });

    const photos = responsePhotos.map((e) => {
      return {
        id: e.id,
        name: e.name,
        type: e.type,
        size: e.size,
        data: e.data,
        ExcursionId: e.ExcursionId,
      };
    });
    res.status(200).json(photos);
  } catch (err) {
    next(err);
  }
});



router.get("/:excursionId", async (req, res, next) => {
  try {
    const { excursionId } = req.params;
    const responsePhotos = await Photo.findAll({
      where: {
        ExcursionId: excursionId,
      },
    });

  
    
    
   const arrayData = responsePhotos.map(e => {
    console.log(e, 'cada image')
     return {
        name: e.name,
        type:e.type,
        size:e.size,
        data: e.data,
        ExcursionId: e.ExcursionId
     }
    })

 

    responsePhotos.map((e) => {
      let dir = path.join(__dirname, `./dbImages${excursionId}`);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }

      fs.writeFileSync(
        path.join(
          __dirname,
          `./dbImages${excursionId}/` + e.id + "-monkey.jpg"
        ),
        e.data
      );
    });

    
    
    // const pathImages = __dirname + '\dbImages' + excursionId + '\1-monkey.jgp'
    
    // console.log(pathImages, 'el path donde estan las imagenes')
    

    const images = fs.readdirSync(
      path.join(__dirname, `./dbImages${excursionId}/`)
    );

    res.status(200).json(images);

    function deletePhotosByTime() {
      Photo.destroy({
        where: {
          ExcursionId: excursionId,
        },
      }).then((response) => {
        fs.readdirSync(
          path.join(__dirname, `./dbImages${excursionId}`)
        ).forEach((file) => {
          const filePath = path.join(
            __dirname,
            `./dbImages${excursionId}`,
            file
          );
          return fs.unlinkSync(filePath);
        });
        fs.readdirSync(path.join(__dirname, "./images")).forEach((file) => {
          const filePath = path.join(__dirname, "./images", file);
          return fs.unlinkSync(filePath);
        });
      });
    }
    setTimeout(deletePhotosByTime, 1296000000);
  } catch (err) {
    next(err);
  }
});

router.post("/:excursionId", filesUpload, async(req, res, next) => {
  const { excursionId } = req.params;
  const photos = req.files;
  console.log(photos, 'q hay en el arreglo?')
  
    
  
    const fotos = photos.map((e) => {
      return {
        name: e.originalname,
        type: e.mimetype,
        size: e.size,
        data: fs.readFileSync(path.join(__dirname, "./images/" + e.filename)),
      };
    });
    fotos.forEach((e) => {
      return Photo.create(e)
        .then((f) => f.setExcursion(excursionId))
        .catch((err) => next(err));
    });
  
    res.json("Fotos creadas y asociadas correctamente");
  
});

router.delete('/:excursionId/:id/:name', (req, res, next) => {
  const { excursionId, id, name } = req.params;
 
  Photo.destroy({
    where: {
      id: id
    }
  })
  .then(response => {
  let file = fs.readdirSync(
      path.join(__dirname, `./dbImages${excursionId}`)
    ).find(e => e === name)
    const filePath = path.join(__dirname, `./dbImages${excursionId}`, file)
    fs.unlinkSync(filePath)
    res.json('foto eliminada correctamente')
  })
  .catch(err => next(err))
})

module.exports = router;
