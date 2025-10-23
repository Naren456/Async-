// Backend/controllers/notes.controller.js
import prisma from "../config/db.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from 'stream';

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw" }, // Use 'raw' for non-image files like PDFs
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    const readableStream = Readable.from(buffer);
    readableStream.pipe(uploadStream);
  });
};

// Controller to handle note creation with PDF upload
export const createNoteWithUpload = async (req, res) => {
  try {
    const { title, subjectCode } = req.body;
    const file = req.file; // File buffer from multer memory storage

    if (!file) {
      return res.status(400).json({ message: "No PDF file provided" });
    }
    if (!title || !subjectCode) {
      return res.status(400).json({ message: "Title and Subject Code are required" });
    }

    // Check if subject exists
    const subjectExists = await prisma.subject.findUnique({
      where: { code: subjectCode },
    });
    if (!subjectExists) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Upload file buffer to Cloudinary
    const uploadResult = await uploadToCloudinary(file.buffer);

    if (!uploadResult || !uploadResult.secure_url) {
       throw new Error('Cloudinary upload failed');
    }

    // Create Note entry in database
    const newNote = await prisma.note.create({
      data: {
        title,
        subjectCode,
        pdfUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id, // Store public_id for potential deletion
      },
    });

    res.status(201).json({ note: newNote });
  } catch (error) {
    console.error("Error creating note with upload:", error);
    res.status(500).json({ message: error.message || "Server error creating note" });
  }
};

// Controller to delete a note (including Cloudinary file)
 export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    try {
        const note = await prisma.note.findUnique({
            where: { id: noteId },
            select: { publicId: true }
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Delete from Cloudinary using publicId
        if (note.publicId) {
            await cloudinary.uploader.destroy(note.publicId, { resource_type: "raw" });
        }

        // Delete from database
        await prisma.note.delete({
            where: { id: noteId }
        });

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Server error deleting note' });
    }
};