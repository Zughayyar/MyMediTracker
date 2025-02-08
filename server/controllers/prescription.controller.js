const Prescription = require('../models/prescription.model');

// Create Prescription
exports.createPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.create(req.body);
        res.status(201).json(prescription);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Prescriptions
exports.getAllPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find().populate('patient practitioner');
        res.status(200).json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get One Prescription
exports.getPrescriptionById = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('patient practitioner');
        if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
        res.status(200).json(prescription);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Prescription
exports.updatePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
        res.status(200).json(prescription);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Prescription
exports.deletePrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
