
import express, { Router } from "express";
import { createDocument, getAllDocuments, getDocumentById, updateDocument, deleteDocument } from "../controllers";
export const router = Router();


router.post('/', createDocument);
router.get('/', getAllDocuments);
router.get('/:id', getDocumentById);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

