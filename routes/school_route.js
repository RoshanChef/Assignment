const express = require('express');
const { Router } = express;
const { connection } = require('../db');
const getDistanceInKm = require('../utils/degreeToKm');

const schoolRouter = Router();

// @route POST /api/v1/schoolRoute/addSchool
// @des   Addes schools in db
schoolRouter.post('/addSchool', (req, res) => {
    try {
        const { name, address, latitude, longtitude } = req.body;

        // validation of fields
        if (!name || !address || !latitude || !longtitude) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }

        const insertQuery = `
        INSERT INTO schools (name, address, latitude, longtitude) 
        VALUES (?, ?, ?, ?)
    `;
        const values = [name, address, latitude, longtitude];

        connection.query(insertQuery, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to insert school',
                    error: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: 'School added successfully',
                insertedId: result.insertId,
                result: result
            });
        });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to insert school',
            error: error.message
        });
    }
});


// @route GET /api/v1/schoolRoute/listSchools
// @des   get schools nearer to user
schoolRouter.get('/listSchools', (req, res) => {

    // user location
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (!userLat || !userLon) {
        return res.status(400).json({
            success: false,
            message: 'Latitude and longitude are required'
        });
    }

    // All schools
    const fetchQuery = `SELECT * FROM schools`;
    connection.query(fetchQuery, (err, results) => {
        if (err) {
            console.error('Error fetching schools:', err);
            return res.status(500).json({
                success: false,
                message: 'Database error',
                error: err.message
            });
        }

        // Calculate distance for each school in Km
        const schoolsWithDistance = results.map(school => {
            const distance = getDistanceInKm(userLat, userLon, school.latitude, school.longtitude);
            return { ...school, distance };
        })

        // Sort by distance (nearest first)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json({
            success: true,
            schools: schoolsWithDistance
        });

    });
})

module.exports = { schoolRouter }; 