const express = require('express');
const medicalHistoryController = require('../controllers/medicalHistory.controller');
const { authenticate } = require('../config/jwt.config'); // Import authenticate middleware

module.exports = app => {
    // Medical History routes (protected routes require authentication)
    app.post("/api/medicalHistories", authenticate, medicalHistoryController.createMedicalHistory);  // Create medical history
    app.get("/api/medicalHistories", authenticate, medicalHistoryController.getAllMedicalHistories);  // Get all medical histories
    app.get("/api/medicalHistories/:id", authenticate, medicalHistoryController.getMedicalHistoryById);  // Get one medical history by ID
    app.put('/api/medicalHistories/:id', authenticate, medicalHistoryController.updateMedicalHistory);  // Update medical history by ID
    app.delete("/api/medicalHistories/:id", authenticate, medicalHistoryController.deleteMedicalHistory);  // Delete medical history by ID
};
