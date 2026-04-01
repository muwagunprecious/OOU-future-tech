const pdfExtract = require('pdf-parse');

/**
 * Extracts text from a PDF buffer.
 */
async function extractTextFromPDF(buffer) {
    try {
        // Robust library initialization check
        let parseFunc;
        if (typeof pdfExtract === 'function') {
            parseFunc = pdfExtract;
        } else if (pdfExtract && typeof pdfExtract.default === 'function') {
            parseFunc = pdfExtract.default;
        } else if (pdfExtract && typeof pdfExtract.pdf === 'function') {
            parseFunc = pdfExtract.pdf;
        }

        if (typeof parseFunc !== 'function') {
            console.error('❌ PDF Parse Export mismatch:', {
                type: typeof pdfExtract,
                keys: pdfExtract ? Object.keys(pdfExtract) : 'null'
            });
            throw new Error('PDF parsing library exported an unexpected format.');
        }

        // Options to ensure better extraction
        const options = {
            pagerender: function(pageData) {
                return pageData.getTextContent().then(function(textContent) {
                    return textContent.items.map(i => i.str).join(' ');
                });
            }
        };

        const data = await parseFunc(buffer);
        return data.text || '';
    } catch (error) {
        console.error('❌ PDF Extraction Error:', error);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}

module.exports = { extractTextFromPDF };
