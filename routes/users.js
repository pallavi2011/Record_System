const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const {upload} = require('../helpers/filehelper')



// READ (ONE)
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// READ (ALL)
router.get('/',(req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });

   
});

// CREATE
router.post('/', upload.array('files'), async (req, res) => {
          console.log(req.files)
          let filesArray = [];
          req.files.forEach(element => {
          const file = {
            fileName: element.originalname,
            filePath: element.path,
            fileSize: fileSizeFormatter(element.size, 2)
          }
            filesArray.push(file);
        });
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          title: req.body.title,
          files: filesArray
        });
        
    await newUser.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender,
          title: result.title,
          files: result.files
        }
      })
    }).catch((err) => {
        res.status(500).json({ success: false, msg: err.message });
      })

})

const fileSizeFormatter = (bytes, decimal) => {
  if(bytes === 0){
      return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

// UPDATE
router.put('/:id', upload.array('files'), async (req, res) => {
        console.log(req.files)
        let filesArray = [];
        req.files.forEach(element => {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileSize: fileSizeFormatter(element.size, 2)
        }
          filesArray.push(file);
      });
        let updatedUser = {
          name: req.body.name,
          email: req.body.email,
          age: req.body.age,
          gender: req.body.gender,
          title: req.body.title,
          files: filesArray
        };

    let id = req.params.id;
     await User.findOneAndUpdate(id, updatedUser, {runValidators: true})
    .then((oldResult) => {
     User.findById(req.params.id)
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              name: newResult.name,
              email: newResult.email,
              age: newResult.age,
              gender: newResult.gender,
              title: newResult.title,
              files: newResult.files

            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
      })
  
});
  
   


// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          name: result.name,
          email: result.email,
          age: result.age,
          gender: result.gender
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;