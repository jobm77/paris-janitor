import e, { Request, Response } from "express";
import { Document, User } from "../models";
import { validateDocument } from "../validators";

const createDocument = async (req: Request, res: Response) => {
    const { error, value } = validateDocument(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Document validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
  
    try {
    const { userId, url, name, content, type } = value;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newDocument = await Document.create({ userId, url, name, content, type });
    return res.status(201).json(newDocument);
  } catch (error) {
    console.error('Error in the creation of the document', error);
    return res.status(500).json({ message: 'Error while creating document' });
  }
}

const getAllDocuments = async (req: Request, res: Response) => {
  try {
    const documents = await Document.findAll();
    return res.status(200).json(documents);
  } catch (error) {
    console.error('Error while getting all documents', error);
    return res.status(500).json({ message: 'Error while getting all documents' });
  }
}

const getDocumentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    return res.status(200).json(document);
  } catch (error) {
    console.error('Error while getting document by id', error);
    return res.status(500).json({ message: 'Error while getting document by id' });
  }
}

const updateDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { url, name, content, type } = req.body;
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    document.url = url ?? document.url;
    document.name = name ?? document.name;
    document.content = content ?? document.content;
    document.type = type ?? document.type;
    await document.save();
    return res.status(200).json(document);
  } catch (error) {
    console.error('Error while updating document', error);
    return res.status(500).json({ message: 'Error while updating document' });
  }
}

const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found"});    
    }

    await document.destroy();
    return res.status(204).json({ message: "Document deleted"});
  } catch (error) {
    console.error('Error while deleting document', error);
    return res.status(500).json({ message: 'Error while deleting document' });
  }
}

export { createDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument };