// Require necessary NPM packages
const express = require('express');

// Require Mongoose Model for Resume
const Resume = require('../models/resume.model');

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /resumes
 * Description:   Get All Resumes
 */
router.get('/resumes', (req, res) => {
    Resume.find()
        // Return all Resumes as an Array
        .then((allResumes) => {
            res.status(200).json({ resumes: allResumes });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error });
        });
});

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           /resumes/5d664b8b68b4f5092aba18e9
 * Description:   Get An Resume by Resume ID
 */
router.get('/resumes/:id', (req, res) => {
    Resume.findById(req.params.id)
        .then((resume) => {
            if (resume) {
                res.status(200).json({ resume });
            } else {
                // If we couldn't find a document with the matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID doesn\'t match any documents'
                    }
                });
            }
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error });
        })
});

/**
* Action:       CREATE
* Method:       POST
* URI:          /resumes
* Description:  Create a new Resume
*/
router.post('/resumes', (req, res) => {
    Resume.create(req.body.resume)
        // On a successful `create` action, respond with 201
        // HTTP status and the content of the new resume.
        .then((newResume) => {
            res.status(201).json({ resume: newResume });
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error });
        });
});

/**
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /resumes/5d664b8b68b4f5092aba18e9
 * Description: Update An Resume by Resume ID
 */
router.patch('/resumes/:id', (req, res) => {
    Resume.findById(req.params.id)
        .then((resume) => {
            if (resume) {
                // Pass the result of Mongoose's `.update` method to the next `.then`
                return resume.update(req.body.resume);
            } else {
                // If we couldn't find a document with the matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID doesn\'t match any documents'
                    }
                });
            }
        })
        .then(() => {
            // If the update succeeded, return 204 and no JSON
            res.status(204).end();
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error });
        });
});

/**
* Action:       DESTROY
* Method:       DELETE
* URI:          /resumes/5d664b8b68b4f5092aba18e9
* Description:  Delete An Resume by Resume ID
*/
router.delete('/resumes/:id', (req, res) => {
    Resume.findById(req.params.id)
        .then((resume) => {
            if (resume) {
                // Pass the result of Mongoose's `.delete` method to the next `.then`
                return resume.remove();
            } else {
                // If we couldn't find a document with the matching ID
                res.status(404).json({
                    error: {
                        name: 'DocumentNotFoundError',
                        message: 'The provided ID Doesn\'t match any documents'
                    }
                });
            }
        })
        .then(() => {
            // If the deletion succeeded, return 204 and no JSON
            res.status(204).end();
        })
        // Catch any errors that might occur
        .catch((error) => {
            res.status(500).json({ error });
        });
});

// Export the Router so we can use it in the server.js file
module.exports = router;