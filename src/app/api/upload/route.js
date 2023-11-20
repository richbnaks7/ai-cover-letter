import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';

export async function POST(req) {
    const formData = await req.formData();
    const uploadedFiles = formData.getAll('resume');
    let fileName = '';
    let parsedText = '';

    if (uploadedFiles && uploadedFiles.length > 0) {

        const uploadedFile = uploadedFiles[1];

        if (uploadedFile.type === 'application/pdf') {

            fileName = uuidv4();
            const tempFilePath = `/tmp/${fileName}.pdf`;
            const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
            await fs.writeFile(tempFilePath, fileBuffer);

            const pdfParser = new (PDFParser)(null, 1);

            pdfParser.on('pdfParser_dataError', (errData) =>
                console.log(errData.parserError)
            );
            const parsedTextPromise = new Promise((resolve, reject) => {
                pdfParser.on('pdfParser_dataReady', () => {
                    resolve(pdfParser.getRawTextContent());
                });
            });

            pdfParser.loadPDF(tempFilePath);

            parsedText = await parsedTextPromise;

            const response = new NextResponse(parsedText, { status: 200 });
            response.headers.set('FileName', fileName);
            return response

        } else {
            return new NextResponse('No file uploaded', { status: 400 });
        }

    } else {
        return new NextResponse('No file uploaded', { status: 400 });
    }
}
