const express = require('express');
const birds_json = require('../public/nzbird.json');
const Bird = require('../models/bird');
const multer = require("multer")
const upload = multer({ dest: 'public/images/' })
const bird_controller = require('../controllers/bird_controller');

/* create a router (to export) */
const router = express.Router();

/* route the default URL: `/birds/ */
router.get('/', async (req, res) => {
  // extract the query params
  const search = req.query.search;
  const status = req.query.status;
  const sort = req.query.sort;

  // render the Pug template 'home.pug' with the filtered data
  res.render('home', {
    birds: await bird_controller.filter_bird_data(search, status, sort)
  });
})

// TODO: finish the "Create" route(s)
router.get('/create', (req, res) => {
  res.render('create_bird');
});
router.post('/create', upload.single('photo_upload'), async (req, res) => {
  console.log(req.body);
  const primary_name = req.body.primary_name;
  const english_name = req.body.english_name;
  const scientific_name = req.body.scientific_name;
  const order = req.body.order;
  const family = req.body.family;
  const other_names = req.body.other_names.split('\r\n');
  const status = req.body.status;
  const photo_credit = req.body.photo_credit;
  if (req.file !== undefined) {
    photo_source = req.file.filename;
  } else {
    photo_source = 'default.png'
  }
  const length = req.body.length;
  const weight = req.body.weight;
  await Bird.create({
    "primary_name": primary_name,
    "english_name": english_name,
    "scientific_name": scientific_name,
    "order": order,
    "family": family,
    "other_names": other_names,
    "status": status,
    "photo": {
      "credit": photo_credit,
      "source": photo_source
    },
    "size": {
      "length": {
        "value": length,
        "units": "cm"
      },
      "weight": {
        "value": weight,
        "units": "g"
      }
    }
  });
  res.redirect('/');
});

// TODO: get individual bird route(s)
router.get('/:id/', async (req, res) => {
  const id = req.params.id;
  const birds = await Bird.findById(id);
  res.render('view_bird', { bird: birds });
});

// TODO: Update bird route(s)
router.get('/:id/update', async (req, res) => {
  const id = req.params.id;
  const birds = await Bird.findById(id);
  res.render('edit', { bird: birds });
});

router.post('/:id/update', upload.single('photo_upload'), async (req, res) => {
  const id = req.params.id;
  const primary_name = req.body.primary_name;
  const english_name = req.body.english_name;
  const scientific_name = req.body.scientific_name;
  const order = req.body.order;
  const family = req.body.family;
  const other_names = req.body.other_names.split('\r\n');
  const status = req.body.status;
  const photo_credit = req.body.photo_credit;
  let photo_source = '';
  if (req.file !== undefined) {
    photo_source = req.file.filename;
  } else {
    const old = await Bird.findById(id);
    photo_source = old.photo.source;
  }
  const length = req.body.length;
  const weight = req.body.weight;
  await Bird.findByIdAndUpdate(id,
    {
      "primary_name": primary_name,
      "english_name": english_name,
      "scientific_name": scientific_name,
      "order": order,
      "family": family,
      "other_names": other_names,
      "status": status,
      "photo": {
        "credit": photo_credit,
        "source": photo_source
      },
      "size": {
        "length": {
          "value": length,
          "units": "cm"
        },
        "weight": {
          "value": weight,
          "units": "g"
        }
      }
    });
  res.redirect('/');
});

// TODO: Delete bird route(s)
router.get('/:id/delete', async (req, res) => {
  const id = req.params.id;
  await Bird.findByIdAndDelete(id);
  res.redirect('/');
});

module.exports = router; // export the router