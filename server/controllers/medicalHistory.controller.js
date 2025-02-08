const MedicalHistory = require('../models/medicalHistory.model');

// Create Medical History
exports.createMedicalHistory = async (req, res) => {
    try {
        const medicalHistory = await MedicalHistory.create(req.body);
        res.status(201).json(medicalHistory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Medical Histories
exports.getAllMedicalHistories = async (req, res) => {
    try {
        const histories = await MedicalHistory.find().populate('patient practitioner');
        res.status(200).json(histories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get One Medical History
exports.getMedicalHistoryById = async (req, res) => {
    try {
        const history = await MedicalHistory.findById(req.params.id).populate('patient practitioner');
        if (!history) return res.status(404).json({ error: 'Medical history not found' });
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Medical History
exports.updateMedicalHistory = async (req, res) => {
    try {
        const medicalHistory = await MedicalHistory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!medicalHistory) return res.status(404).json({ error: 'Medical history not found' });
        res.status(200).json(medicalHistory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Medical History
exports.deleteMedicalHistory = async (req, res) => {
    try {
        const history = await MedicalHistory.findByIdAndDelete(req.params.id);
        if (!history) return res.status(404).json({ error: 'Medical history not found' });
        res.status(200).json({ message: 'Medical history deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};